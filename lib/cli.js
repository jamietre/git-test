/*eslint no-console: 0*/

var app = require('./main').app
var gitStatus = require('./index').gitStatus;

var opts = require('yargs')
    .alias('b', 'branch')
    .describe('b','test that the current branch is equal to the branch name specified')
    .boolean('x')
    .alias('x', 'except')
    .describe('x','invert the result of the test')
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
