// Require
	// Native 
		const fs = require('fs');
		const http = require('http');
		const path = require('path');
	// External
		const Utils = require('./utils');

		const express = require('express');
		const socket_io = require('socket.io');
		const Coraline = require('coraline-core');
// Define
	let app = express();
	let server = http.Server(app);
	let io = socket_io(server);

	const PORT = +process.argv[2] || 9080
	const PUBLIC_DIR = 'public';
	const CORALINE_DIR = 'public/packages';
// Require.kmi config
	app.use(function (rq, rs, next) {
		let { url } = rq;
		let x = url.indexOf("?");
		url = url.substring(0, x === -1? url.length : x);
		if(url.substring(url.length - 4) === '.kmi') {
			rs.end(`
				<!DOCTYPE html>
				<html>
				<head>
					<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
				</head>
				<body>
					<script src="/kmi_modules/require.kmi.js"></script>

					<meta kmi-init="${url.substring(0, url.length - 4)}">
				</body>
				</html>
			`);
		} else next();
	});
// Config
	app.use(express.static(PUBLIC_DIR));

	server.listen(PORT, () => {
		console.log("Coraline-Educative is running at port :" + PORT);
	});

	let coraline_server = Coraline.createServer(io, { password: 'H1dd3n' });
// Info Server Config
	let info_io = io.of('/info');
	let coralines = {};

	async function loadCoralines () {
		coralines = {};
		let package_dirs = await Utils.readdir(CORALINE_DIR);
		let count = 0;

		for(let i=0, l=package_dirs.length;i<l;i++) {
			let dirname = package_dirs[i];
			let dir = path.join(CORALINE_DIR, dirname);
			let stats = await Utils.stat(dir);

			if(!stats.isDirectory()) continue;

			try {
				let data = JSON.parse(await Utils.read(path.join(dir, 'coraline.json')));

				coralines[dirname] = data;
				count++;
			} catch (exc) {
				console.log(exc);
			}
		}

		return count;
	}

	info_io.on('connection', (sock) => {
		sock.on('packages', (filter) => {
			if(!filter) return sock.emit('packages', coralines);
			let toSend = {};

			for(let i in coralines)
				if(coralines[i].categories.indexOf(filter) !== -1) toSend[i] = coralines[i];

			sock.emit('packages', toSend);
		});
	});
	(async () => {
		console.log("Loading coralines...");
		let count = await loadCoralines();
		console.log(count + " coralines loaded.");
	})();