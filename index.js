const http = require('http');
const path = require('path');
const express = require('express');
const socket_io = require('socket.io');
const Coraline = require('coraline-core');
const opn = require('opn');

let app = express();
let server = http.Server(app);
let io = socket_io(server);

const PORT = +process.argv[2] || 9080

app.use(function (rq, rs, next) {
	let { url } = rq;
	if(url.substring(url.length -4) === '.kmi') {
		rs.end(`
			<!DOCTYPE html>
			<html>
			<head>
			</head>
			<body>
				<script src="/kmi_modules/require.kmi.js"></script>

				<meta kmi-init="${url.substring(0, url.length - 4)}">
			</body>
			</html>
		`);
	} else next();
});

app.get('/', (rq, rs) => {
	rs.end(`
			<!DOCTYPE html>
			<html>
			<head>
			</head>
			<body>
				<script src="/kmi_modules/require.kmi.js"></script>

				<meta kmi-init="index">
			</body>
			</html>
	`);
});

app.use(express.static('public'));

server.listen(PORT, () => {
	console.log("Coraline-Educative is running at port :" + PORT);
	opn('http://localhost:' + PORT + '/');
});
Coraline.createServer(io, { password: 'H1dd3n' });