'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = tITLPopup;

var _ldUiIcon = require('../../icon/ld-ui-icon');

function tITLPopup(content) {
    return '<div class="tITL-popup">\n                '.concat((0, _ldUiIcon.museumIcon)(''.concat(content.siteLabel, ' (').concat(content.city, ')')), '\n                ').concat((0, _ldUiIcon.timeIcon)(content.timeInterval), '\n                ').concat((0, _ldUiIcon.locationIcon)(content.locationType), '\n            </div>\n            ');
}