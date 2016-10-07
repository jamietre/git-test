// global npm modules don't work on *nix with windows line endings on bin fileName

var eol = require('eol')
var path = require('path')
var fs = require('fs')

var fileName = path.resolve(__dirname, '../bin.js');
var data = fs.readFileSync(fileName, 'utf-8');

fs.writeFileSync(fileName, eol.lf(data), 'utf-8');
