/*eslint no-console: 0*/
/**
 * 
 * 
 * @param {any} deps  { gitStatus: function() { returns git status object}}
 * @param {any} opts 
 * @returns 
 */
function app(deps, opts) {
    var gitStatus = deps.gitStatus;

    var allPromises = [] 
    var promises = {
        status: (opts.status || opts.branch || opts['not-branch']) && gitStatus()
        //lastCommit: (opts['last-commit'])
    }
     
    if (opts.status) {
        allPromises.push(promises.status.then(function(status) {
            console.log(status);
            return true;  
        }));
    } 
 
    if (opts.branch) {
        allPromises.push(promises.status.then(function(status) {
            return status.branch === opts.branch; 
        }));
    }

    if (opts['not-branch']) {
        allPromises.push(promises.status.then(function(status) {
            return status.branch !== opts['not-branch'];
        }));
    }

    return finish(allPromises);
}

function finish(promises) {
    return Promise.all(promises).then(function(results) {
        return results.every(function(e) { return e === true });
    })
}

module.exports = {
    app: app
}