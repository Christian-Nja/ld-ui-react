'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.getURILabel = getURILabel;

/**
 * Return label from uri removing # and / namespaces
 *
 * @param {String} uri
 */
function getURILabel(uri) {
    var property = '';
    var tmp = uri;
    var tmp2 = tmp.split('#');

    if (tmp2.length > 1) {
        property = tmp2[1];
    } else {
        tmp2 = tmp.split('/');
        property = tmp2[tmp2.length - 1];
    }

    return property;
}