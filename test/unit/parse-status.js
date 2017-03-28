var assert = require('assert')
var parseStatus = require('../../lib/index').parseStatus


describe('parse-status', function() {
    it('changed', function() {

        var text = '## master...origin/master\n'+
'M  README.md\n'+
'M lib/cli.js\n'+
'M lib/index.js\n'+
'M package.json\n'+
'?? test/'

        var sut = parseStatus(text);
        assert.deepEqual(sut, {
            branch: 'master',
            offset: 0,
            changed: true
        })
    })
})

