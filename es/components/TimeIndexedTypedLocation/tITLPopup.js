"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = tITLPopup;

var _ldUiIcon = require("../../icon/ld-ui-icon");

// ${museumIcon(`${content.siteLabel} (${content.city})`)}
function tITLPopup(content) {
  return "<div class=\"tITL-popup\">\n                ".concat((0, _ldUiIcon.museumIcon)(content.culturalProperty), "\n                ").concat((0, _ldUiIcon.timeIcon)(content.timeInterval), "\n                ").concat((0, _ldUiIcon.locationIcon)("".concat(content.locationType, " (").concat(content.address, ")")), "\n            </div>\n            ");
}