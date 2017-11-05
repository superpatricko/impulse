var fs = require('fs');
var exec = require('child_process').execSync;
var async = require('async');

var AdmZip = require('adm-zip');
const git = require('simple-git')('./zip');
var USER = 'superpatricko@gmail.com';
var PASS = 'RGHRX9gXbrcnNjuhDuWtFTzK';
var REPO = 'github.com/superpatricko/impulse'
const remote = `https://${USER}:${PASS}@${REPO}`; // The remote where you want the git diffs to be located
// https://github.com/superpatricko/impulse.git

exports.index = function(req, res) {
	var DEVzip = new AdmZip("./zip/DEV.zip");
	var QAzip = new AdmZip("./zip/QA.zip");

	async.series({
		setOrigin: function(cb) {
			console.log('Setting origin...')
				// Running this comamnd assuming there is already a remote called 'origin' already set
				// If no such remote exist, use `git remote add origin REPO_NAME` before running this program
			exec('git remote set-url origin ' + REPO);
			cb();
		},
		zero: function(cb) {
			exec('rm -rf zip/content');
			console.log('0. Remove old content folder')
			cb();

		},
		one: function(cb) {
			git.raw([
				'checkout',
				'master'
			], function() {
				console.log('1. Checkout to master branch');
				cb();
			});
		},
		two: function(cb) {
			DEVzip.extractAllTo( /*target path*/ "./zip/content", /*overwrite*/ true);
			exec('mv zip/content/.DRV_SAPIFRSDATAHUB-DEV.INTRANET.BELL.CA_00_D44_BC_EZ12598_(Default) zip/content/main');
			console.log('2. Extract and rename folder');
			cb()
		},
		three: function(cb) {
			git.raw([
				'checkout',
				'-B',
				'DEV'
			], function() {
				console.log('3. Checkout to DEV branch (with -B flag)');
				cb();
			});
		},
		four: function(cb) {
			git.raw([
				'add',
				'content'
			], function() {
				console.log('4. Add content to git');
				cb();
			});
		},
		five: function(cb) {
			git.raw([
				'commit',
				'-m',
				'DEV'
			], function() {
				console.log('5. Commit DEV content');
				cb();
			});
		},
		six: function(cb) {
			git.raw([
				'push',
				'-uf',
				'origin',
				'DEV'
			], function() {
				console.log('6. Push DEV to origin');
				cb();
			});
		},
		seven: function(cb) {
			QAzip.extractAllTo( /*target path*/ "./zip/content", /*overwrite*/ true);
			exec('rm -rf zip/content/main');
			console.log('7.1. Extract and remove old content folder')
			exec('mv zip/content/.Q44_SAPIFRSDATAHUB-QA.INTRANET.BELL.CA_50_SINGLEDB_BC_EZ12598_(Default) zip/content/main');
			console.log('7.2. Move extract files to main');
			cb();
		},
		eight: function(cb) {
			git.raw([
				'checkout',
				'-B',
				'QA'
			], function() {
				console.log('8. Checkout to QA (with -B flag) from the DEV branch');
				cb();
			});
		},
		nine: function(cb) {
			git.raw([
				'add',
				'content'
			], function() {
				console.log('9. Add content to git');
				cb();
			});
		},
		ten: function(cb) {
			git.raw([
				'commit',
				'-m',
				'QA'
			], function() {
				console.log('10. Commit QA content');
				cb();
			});
		},
		eleven: function(cb) {
			git.raw([
				'push',
				'-uf',
				'origin',
				'QA'
			], function() {
				console.log('11. Push QA to origin');
				cb();
			});
		}
	}, function(err, results) {
		var result = exec('cd zip && git diff --name-only --diff-filter=M DEV..QA ', {
			maxBuffer: 1024 * 1000000
		});

		// Split into an array and filter
		result = result.toString().replace(/content\/main\//g, '/').split('\n');
		result = result.filter(function(n) {
			return n.length !== 0
		});

		console.log('Writing to txt file');
		exec('cd zip/content && git diff --name-only --diff-filter=M DEV..QA > diff.txt', {
			maxBuffer: 1024 * 1000000
		});

		// Final output
		console.log('Finished: render final result');
		res.render('index', {
			data: result,
			birthDate: new Date()
		});
	});
};

exports.view = function(req, res) {
	fs.stat('./zip/content/diff.txt', function(err, data) {
		var birthDate = new Date(data.birthtime);
		var filesChanged = exec('cd zip/content && cat diff.txt')

		// Split into an array and filter
		filesChanged = filesChanged.toString().replace(/content\/main\//g, '/').split('\n');
		filesChanged = filesChanged.filter(function(n) {
			return n.length !== 0
		});

		res.render('index', {
			birthDate: birthDate,
			data: filesChanged
		});
	});
}