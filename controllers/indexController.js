var diff2html = require("diff2html").Diff2Html
var fs = require('fs');
var exec = require('child_process').exec;



exports.index = function(req, res) {
	// res.render('index', { title: 'Local Library Home' });

	// res.set('Content-Type', 'text/plain');
	// 1024 = 1KB
	exec("diff -aru zip\\DEVtest zip\\QAtest", {maxBuffer: 1024 * 100000}, function (err, stdout, stderr) {
		// res.send(diff2html.getPrettyHtml(stdout));
		res.render('index', { title: 'diffoo', content: diff2html.getPrettyHtml(stdout)})
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