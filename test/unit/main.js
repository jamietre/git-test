var app = require('../../lib/main').app
var assert = require('assert')

describe('main', function() {
    var branch;
    var deps;
    var gitStatus = function() {
        return Promise.resolve({
            branch: branch
        })
    }

    beforeEach(function() {
        branch = null;
        deps = {
            gitStatus: gitStatus
        }
    })
    describe('app', function() {
        it('-b matches', function() {
            branch="master"
            return app(deps, { branch: 'master' }).then(function(result) {
                assert.ok(result, 'was on master branch')
            })
        })

        it("-b doesn't match", function() {
            branch="foo"
            return app(deps, { branch: 'master' }).then(function(result) {
                assert.ok(!result, 'was on master branch')
            })    
        })

        it('-x -b not matches (= pass)', function() {
            branch="foo"
            return app(deps, { except: true, branch: 'master' }).then(function(result) {
                assert.ok(result, 'was not on master branch')
            })
        })

        it('-n matches (= fail)', function() { 
            branch="master"
            return app(deps, { except: true, branch: 'master' }).then(function(result) {
                assert.ok(!result, 'was not on master branch')
            })
        })

        it('fails when no test is given', function() {
            return app(deps, {}).then(function() {
                assert.ok(false, 'should not be here')
            })
            .catch(function (err) {
                assert.ok(/No test/.test(err), 'error message was as expected')
            })
        })
    })
})