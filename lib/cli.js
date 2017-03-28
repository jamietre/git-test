/*eslint no-console: 0*/
var gitStatus = require('./index').gitStatus;

var opts = require('yargs')
    .alias('b', 'branch')
    .describe('b','test that the current branch is equal to the branch name specified')
    .alias('h', 'help')
    .help('h')
    .alias('s', 'status')
    .describe('s', 'just output git status')
    .argv;

var promises = [];

app(opts)


function app(opts) {
    if (opts.status) {
        promises.push(gitStatus().then(function(status) {
            console.log(status);
            return true;
        }));
        return finish();
    }

    if (opts.branch) {
        promises.push(gitStatus().then(function(status) {
            return status.branch === opts.branch;
        }));
    }

    return finish();
}

function finish() {
    Promise.all(promises).then(function(results) {
        var result = results.every(function(e) { return e === true });
        process.exit(result ? 0 : 1);
    }).catch((function(err) {
        console.log("ERROR: " + err)
        process.exit(1);
    }))
}
