"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = htmlIcon;

function htmlIcon(src, message) {
  var customClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
  return "\n            <i>\n                <img\n                    class=\"ld-ui-div-icon\"\n                    src=\"".concat(src, "\"\n                 class=\"simple-icon\"\n                ></img>\n                <p class=\"icon-description ").concat(customClass, "\">").concat(message, "</p>\n                <br />\n            </i>\n            ");
}