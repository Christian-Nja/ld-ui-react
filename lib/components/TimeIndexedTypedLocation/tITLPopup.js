'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = tITLPopup;

var _ldUiIcon = require('../../icon/ld-ui-icon');

function tITLPopup(content) {
    return '<div class="tITL-popup">\n                '.concat((0, _ldUiIcon.museumIcon)(''.concat(content.siteLabel, ' (').concat(content.city, ')')), '\n                ').concat((0, _ldUiIcon.timeIcon)(content.timeInterval), '\n            </div>\n            ');
}
/*
 * NOTE: you may change this with a Popup to make it appear with a click
 *______________________________________________________________________ */