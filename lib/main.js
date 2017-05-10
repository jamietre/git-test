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

    // when no test is made, always fail, since it's probably a mistake

    if (allPromises.length === 0) {
        allPromises.push(Promise.reject('No test was given'))
    }

    return Promise.all(allPromises).then(function(results) {
        var result = results.every(function(e) { return e === true })
        return opts.except ? !result : result;
    })
}

module.exports = {
    app: app
}