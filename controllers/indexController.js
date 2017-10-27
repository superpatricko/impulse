var fs = require('fs');
var exec = require('child_process').exec;

var AdmZip = require('adm-zip');
const git = require('simple-git')('./zip');
var USER = 'superpatricko@gmail.com';
var PASS = 'b)*^7edW==zp?ZZ}tJkEcyDU';
var REPO = 'gitlab.com/superpatricko/foobar'
const remote = `https://${USER}:${PASS}@${REPO}`;

exports.index = function(req, res) {
	var DEVzip = new AdmZip("./zip/DEV.zip");
	var QAzip = new AdmZip("./zip/QA.zip");

	// DEVzip.extractAllTo(/*target path*/"./zip/content", /*overwrite*/true)
	async.series({
		zero: function(cb) {
			git.raw([
				'remote',
				'add',
				'origin',
				remote
			], function() {
				console.log(0);
				cb()
			});
		},
		one: function(cb) {
			git.raw([
				'checkout',
				'master'
			], function() {
				console.log(1);
				cb()
			});
		},
		oneandhalf: function(cb) {
			DEVzip.extractAllTo( /*target path*/ "./zip/content", /*overwrite*/ true)
			console.log(1.5);
		},
		two: function(cb) {
			git.raw([
				'checkout',
				'-B',
				'DEV'
			], function() {
				console.log(2);
				cb()
			});
		},
		three: function(cb) {
			git.raw([
				'add',
				'content'
			], function() {
				console.log(3);
				cb()
			});
		},
		four: function(cb) {
			git.raw([
				'commit',
				'-m',
				'DEV'
			], function() {
				console.log(4);
				cb()
			});
		},
		five: function(cb) {
			git.raw([
				'push',
				'-uf',
				'origin',
				'DEV'
			], function() {
				console.log(5);
				cb()
			});
		}
	}, function(err, results) {
		res.send('woo');
	});

	// Git.Repository.open('pathToRepo').then(function (repo) {
	// 	// 1. git checkout master
	// 	console.log(repo);
	// 	repo.checkoutBranch("DEV").then(function () {

	// 	});
	// 	// 2. git checkout -B DEV

	// 	// 3. git add content
	// 	// 4. git commit -m "DEV"
	// 	// 5. git push -u origin dev
	// 	// 6. git checkout master

	// 	// 7. unzip and repeat for QA

	// })



	// DEVzip.extractAllTo(/*target path*/"./zip/content", /*overwrite*/true)


	// res.set('Content-Type', 'text/plain');
	// res.send("woo");
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