"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @description A class to analyze a list of pattern instances and single instance of different types
 * @author Christian Colonna
 * @date 25-11-2020
 * @export
 * @class InstanceFilter
 */
var InstanceFilter = /*#__PURE__*/function () {
  function InstanceFilter(instances) {
    _classCallCheck(this, InstanceFilter);

    this.instances = instances || [];
  }
  /**
   * @description Returns all instances having a node of type TimeInterval
   *              Usually this instances have TimeInterval pattern explicitely declared
   *              between component patterns in the key prop (context is provide by opla vocabulary).
   * @author Christian Colonna
   * @date 25-11-2020
   * @memberof InstanceFilter
   */


  _createClass(InstanceFilter, [{
    key: "timeIntervalInstances",
    value: function timeIntervalInstances() {
      return this.instances.filter(function (instance) {
        var s = new Set();
        console.log("filtered instance type");
        s.add(instance.type);
        console.log(s);
        return instance.type === "https://w3id.org/italia/onto/TI/TimeInterval"; // TODO: move to json-ld to clear this
      });
    }
    /**
     * @description Returns the event captured in an instance of time interval pattern
     *              String intervals are converted to Date
     *              This format can be feed to library such as pond.js
     * @author Christian Colonna
     * @date 25-11-2020
     * @param {Object} timeIntervalInstance
     * @param {boolean} [duration=true] add duration to the instance
     * @returns {Object}
     * @memberof InstanceFilter
     */

  }, {
    key: "timeIntervalInstanceEventToDate",
    value: function timeIntervalInstanceEventToDate(timeIntervalInstance) {
      var startTime = new Date(timeIntervalInstance.startTime);
      var endTime = new Date(timeIntervalInstance.endTime);
      var duration = startTime - endTime;
      console.log(duration);
      return {
        startTime: new Date(timeIntervalInstance.endTime),
        endTime: new Date(timeIntervalInstance.endTime),
        duration: duration,
        event: timeIntervalInstance // title : timeIntervalInstance.label
        // description : timeIntervalInstance.label

      };
    }
  }]);

  return InstanceFilter;
}();

exports["default"] = InstanceFilter;