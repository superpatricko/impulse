var async = require('async');
var fs = require('fs');
var path = require('path');
var dir = require('node-dir');
var jsdiff = require('diff');

exports.index = function(req, res) {
	var devDirectory = "./zip/DEV";
	var totaldiff = '';

	// Get all the paths
	dir.paths(devDirectory, true, function(err, paths) {
		if (err) throw err;

		// Iterate through paths
		async.eachSeries(paths, function(sPath, pathsCb) {
			// Keep only file paths
			fs.stat(sPath, function(err, stats) {
				if (stats.isFile()) {
					// Read and compare paths
					async.parallel({
						DEV: function(devCb) {
							fs.readFile(sPath, 'utf8', function read(err, data) {
								if (err) {
									devCb(err);
									return;
								}

								devCb(null, data);
							});
						},
						QA: function(qaCb) {
							var qaPath = sPath.replace(/DEV/g, 'QA');
							fs.readFile(qaPath, 'utf8', function read(err, data) {
								if (err && err.code === 'ENOENT') {
									totaldiff += "FILE NOT FOUND IN QA: " + err.path + "\n";
									qaCb("ENOENT");
									return;
								}

								qaCb(null, data);
							})
						}
					}, function(err, results) {
						// Compare and update the totaldiff

						// ENOENT isn't an actual error in our case
						if (err === "ENOENT") {
							pathsCb();
							return;
						}

						if (err) {
							pathsCb(err);
							return;
						}

						totaldiff += jsdiff.createTwoFilesPatch(sPath, sPath.replace(/DEV/g, 'QA'), results.DEV, results.QA) + "\n";
						pathsCb();
					})
				} else {
					// have to call back if it's a directory
					pathsCb();
				}
			})

		}, function(err) {
			if (err) {
				console.log(err);
				res.json(err);
				return;
			}

			res.set('Content-Type', 'text/plain');
			res.send(totaldiff);
		})
	})
};