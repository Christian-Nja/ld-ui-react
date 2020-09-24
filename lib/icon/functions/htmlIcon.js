'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = htmlIcon;

function htmlIcon(src, message) {
    return '\n            <i>\n                <img\n                    class="ld-ui-div-icon"\n                    src="'.concat(src, '"\n                 class="simple-icon"\n                ></img>\n                <p class="icon-description">').concat(message, '</p>\n                <br />\n            </i>\n            ');
}