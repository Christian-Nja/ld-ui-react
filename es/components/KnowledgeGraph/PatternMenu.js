"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PatternMenu;

var _react = _interopRequireDefault(require("react"));

var _semanticUiReact = require("semantic-ui-react");

var _LayoutSelector = _interopRequireDefault(require("./LayoutSelector"));

var _TimeIntervalFilter = _interopRequireDefault(require("./facets/TimeIntervalFilter"));

var _ldUiHooks = require("../hooks/ld-ui-hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var menuStyle = {
  position: "absolute",
  top: 70,
  left: 20,
  zIndex: 10
};

function PatternMenu(props) {
  var _useBinaryArrayState = (0, _ldUiHooks.useBinaryArrayState)([]),
      _useBinaryArrayState2 = _slicedToArray(_useBinaryArrayState, 2),
      open = _useBinaryArrayState2[0],
      setOpen = _useBinaryArrayState2[1];

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: menuStyle
  }, /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Menu, {
    vertical: true,
    inverted: true
  }, /*#__PURE__*/_react["default"].createElement(_LayoutSelector["default"], {
    value: props.layoutHandler.name,
    onClick: function onClick(newLayout) {
      props.layoutHandler.setLayout(newLayout);
    }
  }), props.children && _react["default"].Children.toArray(props.children).map(function (child, index) {
    // return filters
    return /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Menu.Item, null, /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        cursor: "pointer"
      },
      onClick: function onClick() {
        setOpen(index);
      }
    }, child.props.title), open.includes(index) ? /*#__PURE__*/_react["default"].createElement(_semanticUiReact.Menu.Menu, null, child) : null);
  })));
}