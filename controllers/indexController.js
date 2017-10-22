var diff2html = require("diff2html").Diff2Html
var fs = require('fs');
var exec = require('child_process').exec;



exports.index = function(req, res) {
	// res.set('Content-Type', 'text/plain');
	exec("diff -aru zip\\DEVtest zip\\QAtest", function (err, stdout, stderr) {
		if (err) {
			console.log(err);
		}
		res.json(diff2html.getJsonFromDiff(stdout));
	});


	// fs.readFile("./zip/test4WithUnifiedNodeDiff", 'utf8', function read(err, data) {
	// 	if (err) {
	// 		return;
	// 	}
	// 	res.json(diff2html.getJsonFromDiff(data));

	// 	// console.log(diff2html.getJsonFromDiff(data));
	// });


	// res.set('Content-Type', 'text/plain');
	// res.send(totaldiff);
};