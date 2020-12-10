"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SliderFilter;

var _react = _interopRequireWildcard(require("react"));

var _reactCompoundSlider = require("react-compound-slider");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var sliderStyle = {
  margin: "5%",
  position: "relative",
  width: "90%"
};
var railStyle = {
  position: "absolute",
  width: "100%",
  height: 14,
  borderRadius: 7,
  cursor: "pointer",
  backgroundColor: "rgb(155,155,155)"
};

function SliderFilter(_ref) {
  var domain = _ref.domain,
      _ref$onFilter = _ref.onFilter,
      onFilter = _ref$onFilter === void 0 ? function (values) {} : _ref$onFilter;

  var _useState = (0, _react.useState)(domain),
      _useState2 = _slicedToArray(_useState, 2),
      values = _useState2[0],
      setValues = _useState2[1];

  var onChange = function onChange(values) {
    setValues(values);
  };

  (0, _react.useEffect)(function () {
    onFilter(values);
  }, [values]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      height: 40,
      width: "100%",
      marginTop: 20
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactCompoundSlider.Slider, {
    mode: 1,
    step: 1,
    domain: domain,
    rootStyle: sliderStyle,
    onChange: onChange,
    values: values
  }, /*#__PURE__*/_react["default"].createElement(_reactCompoundSlider.Rail, null, function (_ref2) {
    var getRailProps = _ref2.getRailProps;
    return /*#__PURE__*/_react["default"].createElement("div", _extends({
      style: railStyle
    }, getRailProps()));
  }), /*#__PURE__*/_react["default"].createElement(_reactCompoundSlider.Handles, null, function (_ref3) {
    var handles = _ref3.handles,
        getHandleProps = _ref3.getHandleProps;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "slider-handles"
    }, handles.map(function (handle) {
      return /*#__PURE__*/_react["default"].createElement(Handle, {
        key: handle.id,
        handle: handle,
        domain: domain,
        getHandleProps: getHandleProps
      });
    }));
  }), /*#__PURE__*/_react["default"].createElement(_reactCompoundSlider.Tracks, {
    left: false,
    right: false
  }, function (_ref4) {
    var tracks = _ref4.tracks,
        getTrackProps = _ref4.getTrackProps;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "slider-tracks"
    }, tracks.map(function (_ref5) {
      var id = _ref5.id,
          source = _ref5.source,
          target = _ref5.target;
      return /*#__PURE__*/_react["default"].createElement(Track, {
        key: id,
        source: source,
        target: target,
        getTrackProps: getTrackProps
      });
    }));
  }), /*#__PURE__*/_react["default"].createElement(_reactCompoundSlider.Ticks, {
    values: domain
  }, function (_ref6) {
    var ticks = _ref6.ticks;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "slider-ticks"
    }, ticks.map(function (tick) {
      return /*#__PURE__*/_react["default"].createElement(Tick, {
        key: tick.id,
        tick: tick,
        count: ticks.length
      });
    }));
  })));
} // *******************************************************
// HANDLE COMPONENT
// *******************************************************


var Handle = function Handle(_ref7) {
  var _ref7$domain = _slicedToArray(_ref7.domain, 2),
      min = _ref7$domain[0],
      max = _ref7$domain[1],
      _ref7$handle = _ref7.handle,
      id = _ref7$handle.id,
      value = _ref7$handle.value,
      percent = _ref7$handle.percent,
      getHandleProps = _ref7.getHandleProps;

  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    role: "slider",
    "aria-valuemin": min,
    "aria-valuemax": max,
    "aria-valuenow": value,
    style: {
      left: "".concat(percent, "%"),
      position: "absolute",
      marginLeft: "-11px",
      marginTop: "-6px",
      zIndex: 2,
      width: 24,
      height: 24,
      cursor: "pointer",
      borderRadius: "50%",
      boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
      backgroundColor: "#34568f"
    }
  }, getHandleProps(id)));
}; // *******************************************************
// TRACK COMPONENT
// *******************************************************


var Track = function Track(_ref8) {
  var source = _ref8.source,
      target = _ref8.target,
      getTrackProps = _ref8.getTrackProps;
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    style: {
      position: "absolute",
      height: 14,
      zIndex: 1,
      backgroundColor: "#7aa0c4",
      borderRadius: 7,
      cursor: "pointer",
      left: "".concat(source.percent, "%"),
      width: "".concat(target.percent - source.percent, "%")
    }
  }, getTrackProps()));
}; // *******************************************************
// TICK COMPONENT
// *******************************************************


var Tick = function Tick(_ref9) {
  var tick = _ref9.tick,
      count = _ref9.count;
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: "absolute",
      marginTop: 14,
      width: 1,
      height: 5,
      backgroundColor: "rgb(200,200,200)",
      left: "".concat(tick.percent, "%")
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      position: "absolute",
      marginTop: 22,
      fontSize: 10,
      textAlign: "center",
      marginLeft: "".concat(-(100 / count) / 2, "%"),
      width: "".concat(100 / count, "%"),
      left: "".concat(tick.percent, "%")
    }
  }, tick.value));
};