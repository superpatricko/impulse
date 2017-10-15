var async = require('async');
var fs = require('fs');

// Pretty diff: https://github.com/prettydiff/prettydiff/
var jsdiff = require('diff');

exports.index = function(req, res) {
	async.parallel({
		one: function(cb) {
			fs.readFile('./zip/DEV/file1.txt', 'utf8', function read(err, data) {
				if (err) {
					cb(err);
				}
				cb(null, data);
			});

		},
		two: function(cb) {
			fs.readFile('./zip/QA/file1.txt', 'utf8', function read(err, data) {
				if (err) {
					cb(err)
				}
				cb(null, data);
			});
		}
	}, function(err, results) {
		if (err) {
			res.json(err);
			return;
		}

		var foo = jsdiff.createTwoFilesPatch("file1.txt", "file1.txt", results.one, results.two, "timestamp1", "timestamp2");
		console.log(JSON.stringify(foo)); // to show escape characters

		// text/plain to show linebreaks (i.e: \n)
		res.set('Content-Type', 'text/plain');
		res.send(foo);
	})

	// 1. Diff a pair of files (DONE)
	// 2. Diff two pairs of files
	// 3. Unzip and compare the folders
};