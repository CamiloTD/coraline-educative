let fs = require('fs');

function read (file) {
	return new Promise ((done, err) => fs.readFile(file, (error, data) => error? err(error) : done(data)));
}

function readdir (dir) {
	return new Promise ((done, err) => fs.readdir(dir, (error, files) => error? err(error) : done(files)));
}

function stat (path) {
	return new Promise ((done, err) => fs.stat(path, (error, stat) => error? err(error) : done(stat)));	
}

exports.read = read;
exports.readdir = readdir;
exports.stat = stat;