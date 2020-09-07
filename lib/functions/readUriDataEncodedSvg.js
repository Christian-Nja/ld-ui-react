'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = readUriDataEncodedSvg;

var fs = require('fs');
/**
 * Returns uri encoded svg string
 * @param {string} filepath Path to svg file
 */


function readUriDataEncodedSvg(filepath) {
    return fs.readFileSync(filepath).toString();
}