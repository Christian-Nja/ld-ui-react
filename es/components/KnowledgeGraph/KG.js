"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = KG;

var _react = _interopRequireDefault(require("react"));

var _PatternMenu = _interopRequireDefault(require("./PatternMenu"));

var _ldUiHooks = require("../hooks/ld-ui-hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function KG(_ref) {
  var _ref$menu = _ref.menu,
      menu = _ref$menu === void 0 ? true : _ref$menu;
  // pass this to PatternMenu component to have a panel to switch layouts
  var layoutHandler = (0, _ldUiHooks.useLayout)();
  return /*#__PURE__*/_react["default"].createElement("div", null, "Hello World", menu ? /*#__PURE__*/_react["default"].createElement(_PatternMenu["default"], {
    layoutHandler: layoutHandler
  }) : null);
}