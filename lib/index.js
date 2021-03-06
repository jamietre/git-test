
var spawn = require('child_process').spawn;

function gitStatus(clearCache) {

    if (gitStatus.promise && !clearCache) {
        return gitStatus.promise;
    }

    gitStatus.promise = runCommand("git status -s -b --porcelain").then((function(status) {
        return parseStatus(status);
    })).catch(function(err) {
        if (err.indexOf("Not a git repository")>0) {
            return parseStatus(err);
        } else {
            throw err;
        }
    })

    return gitStatus.promise;
}


// function gitLastCommit() {
//     git rev-parse --short HEAD
// }

function runCommand(cmd) {
    return new Promise(function(resolve, reject) {
        var cmds = cmd.split(' ');

        var child = spawn(cmds[0], cmds.slice(1));
        var stdout="";
        var stderr="";

        child.stdout.on('data', function(e) {
            stdout+=e;
        });

        child.stderr.on('data', function(e) {
            stderr+=e;
        });


        child.on('close', function() {
            if (!stdout && stderr) {
                reject(stderr)
            } else {
                resolve(stdout);
            }
        });
    });
}


/**
 * Parse the response from `git status -s -b --porcelain` into a 
 * structure
 * 
 * @param {string} text The status response text from git
 * @returns {any} A structure
 */
function parseStatus(text) {
    var lines = text.replace(/\r\n/g, '\n')
        .replace(/\n\n/g,'\n')
        .replace(/^\s+|\s+$/, '') // final newline
        .split('\n');

   // format ## master...origin/master [ahead 2]
   // format ## master...origin/master [behind 2]

    var branch = "";
    var offset = 0;
    var changed = false;

    if (lines.length)
    {
        if (lines.length > 1)
        {
            changed = true;
        }

        var line = lines[0];
        var pos = line.indexOf("...");
        
        if (pos >= 0) {
            branch = line.substring(3, pos);
        } else {
            branch = line.substring(3);
        }

        pos = line.indexOf("[", Math.max(pos, 0));
        if (pos >= 0) {
            offset = Number(line.substring(pos).trim().replace("ahead ", "+").replace("behind ", "-"));
        }

    }
    return {
        branch: branch,
        offset: offset,
        changed: changed
    };
}

module.exports = {
    gitStatus: gitStatus,
    parseStatus: parseStatus
}

