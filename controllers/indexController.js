var fs = require('fs');
var exec = require('child_process').exec;

var AdmZip = require('adm-zip');
var Git = require("nodegit");


exports.index = function(req, res) {
	var QAzip = new AdmZip("./zip/QA.zip");
	var DEVzip = new AdmZip("./zip/DEV.zip");

	QAzip.extractAllTo(/*target path*/"./zip/QA", /*overwrite*/true)
	DEVzip.extractAllTo(/*target path*/"./zip/DEV", /*overwrite*/true)


	res.set('Content-Type', 'text/plain');
	res.send("woo");
	// 1024 = 1KB
	// exec("diff -aru zip\\DEV zip\\QA", {maxBuffer: 1024 * 100000}, function (err, stdout, stderr) {
	// 	stdout.toString();
	// });

	// 1. unzip DEV and QA into git folder


	// ALL GIT COMMANDS WILL BE IN A .gitignored FOLDER and the cwd will be the git thing
	// git checkout -B dev
	// git add DEV
	// git commit -m "dev commit"
	// git push -u origin dev

	// git checkout -B qa
	// git add QA
	// git commit -m "qa commit"
	// git push -u origin qa

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