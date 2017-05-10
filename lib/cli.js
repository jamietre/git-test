/*eslint no-console: 0*/

var app = require('./main').app
var gitStatus = require('./index').gitStatus;

var opts = require('yargs')
    .alias('b', 'branch')
    .describe('b','test that the current branch is equal to the branch name specified')
    .alias('nb', 'not-branch')
    .describe('nb','test that the current branch is NOT equal to the branch name specified')
    .alias('h', 'help')
    .help('h')
    .alias('s', 'status')
    .describe('s', 'just output git status')
    .argv;

//var promises = [];

app({ 
        gitStatus: gitStatus
    },
    opts
).then(function(result) {
    process.exit(result ? 0 : 1);
}).catch((function(err) {
    console.log("ERROR: " + err)
    process.exit(1)
}))
