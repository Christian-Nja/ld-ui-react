"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PartWhole;

var _react = _interopRequireWildcard(require("react"));

var _Depiction = _interopRequireDefault(require("../Resource/Depiction"));

var _Resource = _interopRequireDefault(require("../Resource/Resource"));

var _Label = _interopRequireDefault(require("../Resource/Label"));

require("./PartWhole.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// https://codesandbox.io/s/circles-76sfz?file=/src/App.js
// https://stackoverflow.com/a/62466233/12506641

/**
 * @typedef Resource
 * @property {string} uri the id of a resource
 */

/**
 * @description
 * @author Christian Colonna
 * @date 26-11-2020
 * @export
 * @param {{ parts : Resource[], whole : Resource }} { parts, whole }
 */
function PartWhole(_ref) {
  var parts = _ref.parts,
      whole = _ref.whole,
      _ref$onResourceClick = _ref.onResourceClick,
      onResourceClick = _ref$onResourceClick === void 0 ? function (e) {
    console.log(e.target);
    console.log("click");
  } : _ref$onResourceClick;
  var circleContainer = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      depictionCount = _useState2[0],
      setDepictionCount = _useState2[1];

  (0, _react.useEffect)(function () {
    var circle = circleContainer.current;
    var circleElements = circle.querySelectorAll(".circle");
    var angle = 360 - 90;
    var dangle = 360 / circleElements.length;

    for (var i = 0; i < circleElements.length; i++) {
      var circleElement = circleElements[i];
      angle += dangle;
      circleElement.style.transform = "rotate(".concat(angle, "deg) translate(").concat(circle.clientWidth / 2, "px) rotate(-").concat(angle, "deg)");
    }
  }, [depictionCount]); //  TODO change this to redux , to many calls! Or find a pattern to optimize callings!

  var onLoadedDepiction = function onLoadedDepiction() {
    setDepictionCount(depictionCount + 1);
  };

  console.log("Parts & Whole:");
  console.log(parts);
  console.log(whole);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "circular-container",
    ref: circleContainer,
    style: wholeContainerStyle,
    classes: "center"
  }, parts.map(function (part) {
    return /*#__PURE__*/_react["default"].createElement(_Resource["default"], {
      classes: "circle",
      style: partStyle,
      onClick: function onClick() {
        onResourceClick(part.uri);
      },
      depiction: /*#__PURE__*/_react["default"].createElement(_Depiction["default"], {
        style: partStyle,
        classes: "depiction part-depiction",
        uri: part.uri,
        onLoadedDepiction: onLoadedDepiction
      }),
      label: /*#__PURE__*/_react["default"].createElement(_Label["default"], {
        uri: part.uri,
        classes: "label",
        style: labelStyle
      })
    });
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: centerStyle
  }, /*#__PURE__*/_react["default"].createElement(_Resource["default"], {
    classes: "center",
    style: centerStyle,
    onClick: function onClick() {
      onResourceClick(whole.uri);
    },
    depiction: /*#__PURE__*/_react["default"].createElement(_Depiction["default"], {
      style: centerStyle,
      classes: "depiction whole-depiction",
      uri: whole.uri,
      onLoadedDepiction: onLoadedDepiction
    }),
    label: /*#__PURE__*/_react["default"].createElement(_Label["default"], {
      uri: whole.uri,
      classes: "label",
      style: centerLabelStyle
    })
  })));
}

var partWidth = 100;
var wholeWidth = 700;
var imgWidth = 500;
var partStyle = {
  width: partWidth,
  height: partWidth
};
var wholeContainerStyle = {
  width: wholeWidth,
  height: wholeWidth
};
var centerStyle = {
  width: imgWidth,
  height: imgWidth,
  margin: "auto",

  /* top: 0; */
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
};
var labelStyle = {
  // position: "relative",
  left: -partWidth / 2,
  top: partWidth
};
var centerLabelStyle = {
  top: imgWidth - 50
};