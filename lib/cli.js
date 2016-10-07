/*eslint no-console: 0*/
var gitStatus = require('./index');
var opts = require('yargs')
    .alias('b', 'branch')
    .alias('h', 'help')
    .help('h')
    .alias('s', 'status')
    .describe('s', 'just output git status')
    .argv;

var promises = [];
var result;

app(opts)


function app(opts) {
    var result = true;
    if (opts.help) {
        promises.push(gitStatus().then(function(status) {
            result = result & status.branch === opts.branch;
        }));
        return finish();
    }

    if (opts.status) {
        promises.push(gitStatus().then(function(status) {
            console.log(status);
        }));
        return finish();
    }

    if (opts.branch) {
        promises.push(gitStatus().then(function(status) {
            result = result & status.branch === opts.branch;
        }));
    }

    return finish();
}

function finish() {
    Promise.all(promises).then(function() {
        process.exit(result ? 0 : 1);
    }).catch((function(err) {
        console.log("ERROR: " + err)
        process.exit(1);
    }))
}
