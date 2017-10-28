var fs = require('fs');
var exec = require('child_process').exec;
var async = require('async');

var AdmZip = require('adm-zip');
const git = require('simple-git')('./zip');
var USER = 'superpatricko@gmail.com';
var PASS = 'b)*^7edW==zp?ZZ}tJkEcyDU';
var REPO = 'gitlab.com/superpatricko/foobar'
const remote = `https://${USER}:${PASS}@${REPO}`;

exports.index = function(req, res) {
	var DEVzip = new AdmZip("./zip/DEV.zip");
	var QAzip = new AdmZip("./zip/QA.zip");

	console.log(DEVzip.getEntry('.DRV_SAPIFRSDATAHUB-DEV.INTRANET.BELL.CA_00_D44_BC_EZ12598_(Default)/IFRS_R1/SP_TAB_COUNT.hdbprocedure').isDirectory);
	mv content/.DRV_SAPIFRSDATAHUB-DEV.INTRANET.BELL.CA_00_D44_BC_EZ12598_(Default) content/foo


	res.send('foo');
	async.series({
		zero: function(cb) {
			// git.raw([
			// 	'remote',
			// 	'add',
			// 	'origin',
			// 	remote
			// ], function() {
			// 	console.log(0);
				cb();
			// });

		},
		one: function(cb) {
			git.raw([
				'checkout',
				'master'
			], function() {
				console.log(1);
				cb();
			});
		},
		oneandhalf: function(cb) {
			DEVzip.extractAllTo( /*target path*/ "./zip/content", /*overwrite*/ true)
			exec("mv content/.DRV_SAPIFRSDATAHUB-DEV.INTRANET.BELL.CA_00_D44_BC_EZ12598_(Default) content/foo", function (err, stdout, stderr) {
				console.log(1.5);
				cb();
			});
			
		},
		two: function(cb) {
			git.raw([
				'checkout',
				'-B',
				'DEV'
			], function() {
				console.log(2);
				cb();
			});
		},
		three: function(cb) {
			git.raw([
				'add',
				'content'
			], function() {
				console.log(3);
				cb();
			});
		},
		four: function(cb) {
			git.raw([
				'commit',
				'-m',
				'DEV'
			], function() {
				console.log(4);
				cb();
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
				cb();
			});
		},
		six: function (cb) {
			git.raw([
				'checkout',
				'master'
			], function() {
				console.log(6);
				cb();
			});
		},
		sixandhalf: function(cb) {
			QAzip.extractAllTo( /*target path*/ "./zip/content", /*overwrite*/ true)
			exec("mv content/..Q44_SAPIFRSDATAHUB-QA.INTRANET.BELL.CA_50_SINGLEDB_BC_EZ12598_(Default) content/foo", function (err, stdout, stderr) {
				console.log(6.5);
				cb();
			});
		},
		seven: function(cb) {
			git.raw([
				'checkout',
				'-B',
				'QA'
			], function() {
				console.log(7);
				cb();
			});
		},
		eight: function(cb) {
			git.raw([
				'add',
				'content'
			], function() {
				console.log(8);
				cb();
			});
		},
		nine: function(cb) {
			git.raw([
				'commit',
				'-m',
				'QA'
			], function() {
				console.log(9);
				cb();
			});
		},
		ten: function(cb) {
			git.raw([
				'push',
				'-uf',
				'origin',
				'QA'
			], function() {
				console.log(10);
				cb();
			});
		}
	}, function(err, results) {
		res.render('index')
	});
};