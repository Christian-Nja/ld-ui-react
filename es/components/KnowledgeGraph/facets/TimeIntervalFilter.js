"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TimeIntervalFilter;

var _react = _interopRequireWildcard(require("react"));

var _ldUiHooks = require("../../hooks/ld-ui-hooks");

var _InstanceFilter = _interopRequireDefault(require("../../classes/InstanceFilter"));

var _pondjs = require("pondjs");

var _reactTimeseriesCharts = require("react-timeseries-charts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// find min time interval / find max
// ask tick count
//
function TimeIntervalFilter(_ref) {
  var instances = _ref.instances,
      onFilter = _ref.onFilter;
  var instanceFilter = new _InstanceFilter["default"](instances);
  var timeIntervalInstances = instanceFilter.timeIntervalInstances();
  var intervals = timeIntervalInstances.map(function (instance) {
    return instanceFilter.timeIntervalInstanceEventToDate(instance);
  }); // sort order chronologically

  intervals.sort(function (a, b) {
    return a.startTime - b.startTime;
  }); //
  // Turn data into TimeSeries
  //

  var events = intervals.map(function (_ref2) {
    var startTime = _ref2.startTime,
        endTime = _ref2.endTime,
        data = _objectWithoutProperties(_ref2, ["startTime", "endTime"]);

    return new _pondjs.TimeRangeEvent(new _pondjs.TimeRange(startTime, endTime), data);
  });
  console.log("time interval");
  console.log(intervals);
  console.log(events);
  var series = new _pondjs.TimeSeries({
    name: "timeIntervals",
    events: events
  }); //
  // Render event chart
  //

  function outageEventStyleFunc(event, state) {
    var width = event.get("duration") === 0 ? 5 : null; // assign a little width even if its punctual event

    switch (state) {
      case "normal":
        return {
          fill: "#002bff",
          opacity: 1 // width: width,

        };

      case "hover":
        return {
          fill: color,
          opacity: 0.4 // width: width,

        };

      case "selected":
        return {
          fill: color,
          minWidth: 5
        };

      default: //pass

    }
  }

  var _useState = (0, _react.useState)(series.range()),
      _useState2 = _slicedToArray(_useState, 2),
      timerange = _useState2[0],
      setTimeRange = _useState2[1];

  var _useState3 = (0, _react.useState)(series.range()),
      _useState4 = _slicedToArray(_useState3, 2),
      brushrange = _useState4[0],
      setBrushRange = _useState4[1]; // Handles when the brush changes the timerange


  var handleTimeRangeChange = function handleTimeRangeChange(timerange) {
    if (timerange) {
      setBrushRange(timerange);
    } else setBrushRange(null);
  };

  var brushStyle = {
    boxShadow: "inset 0px 2px 5px -2px rgba(189, 189, 189, 0.75)",
    background: "green",
    paddingTop: 10
  };
  (0, _react.useEffect)(function () {
    var eventToViz = [];

    var _iterator = _createForOfIteratorHelper(series.events()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var event = _step.value;

        var _timerange = event.timerange();

        if (brushrange && brushrange.contains(_timerange)) {
          eventToViz.push(event.get("event").instance);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    onFilter(eventToViz);
  }, [brushrange]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-md-12"
  }, /*#__PURE__*/_react["default"].createElement(_reactTimeseriesCharts.ChartContainer, {
    width: 190,
    timeRange: timerange,
    onTimeRangeChanged: handleTimeRangeChange,
    timeAxisStyle: {
      axis: {
        fill: "none",
        stroke: "#C0C0C0",
        pointerEvents: "none"
      },
      ticks: {
        fill: "none",
        stroke: "#C0C0C0",
        pointerEvents: "none"
      },
      values: {
        fill: "none",
        stroke: "#C0C0C0",
        pointerEvents: "none"
      }
    } // format="month"
    ,
    hideTimeAxis: true,
    paddingLeft: 10,
    paddingRight: 10,
    maxTime: timerange.end(),
    minTime: timerange.begin()
  }, /*#__PURE__*/_react["default"].createElement(_reactTimeseriesCharts.ChartRow, {
    height: "50"
  }, /*#__PURE__*/_react["default"].createElement(_reactTimeseriesCharts.Brush, {
    timeRange: brushrange,
    allowSelectionClear: true,
    style: brushStyle,
    onTimeRangeChanged: handleTimeRangeChange
  }), /*#__PURE__*/_react["default"].createElement(_reactTimeseriesCharts.Charts, null, /*#__PURE__*/_react["default"].createElement(_reactTimeseriesCharts.EventChart, {
    series: series,
    size: 45,
    style: outageEventStyleFunc,
    label: function label(e) {
      return e.get("title");
    }
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      width: 175,
      backgroundColor: "green",
      height: 3,
      marginLeft: 10
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      width: 175,
      height: 3,
      marginLeft: 10
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      "float": "left",
      marginTop: 2
    }
  }, intervals[0].startTime.getFullYear()), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      "float": "right",
      marginTop: 2
    }
  }, intervals[intervals.length - 1].endTime.getFullYear()))));
}