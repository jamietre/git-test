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

        it('-nb not matches (= pass)', function() {
            branch="foo"
            return app(deps, { "not-branch": 'master' }).then(function(result) {
                assert.ok(result, 'was not on master branch')
            })
        })

        it('-nb matches (= fail)', function() { 
            branch="master"
            return app(deps, { "not-branch": 'master' }).then(function(result) {
                assert.ok(!result, 'was not on master branch')
            })
        })
    })
})