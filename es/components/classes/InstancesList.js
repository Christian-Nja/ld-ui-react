"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @description A class to handle a list of pattern instances
 * @author Christian Colonna
 * @date 23-11-2020
 * @export
 * @class InstancesList
 */
var InstancesList = /*#__PURE__*/function () {
  /**
   * Creates an instance of InstancesList.
   * @author Christian Colonna
   * @date 23-11-2020
   * @param {Object} instancesList every array entry is a row of type { pattern: <patternURI>, instance: <instanceURI>, node: <instanceResourceURI>, type: <instanceResourceType>}
   * @memberof InstancesList
   */
  function InstancesList(instancesList) {
    _classCallCheck(this, InstancesList);

    this.list = instancesList;
  }
  /**
   * @description Returns degree of given pattern instance
   * @author Christian Colonna
   * @date 16-11-2020
   * @param {string} patternURI pattern instance uri
   * @returns {number} count nodes belonging to given pattern instance
   * @memberof PatternList
   */


  _createClass(InstancesList, [{
    key: "getPatternInstanceDegree",
    value: function getPatternInstanceDegree(instanceURI) {
      var degree = 0;
      this.list.forEach(function (instance) {
        if (instance.instance === instanceURI) degree++;
      });
      return degree;
    }
  }, {
    key: "getAggregateCount",
    value: function getAggregateCount(type, instanceURI) {
      var set = new Set();
      this.list.forEach(function (instance) {
        if (instance.instance === instanceURI && instance.type === type) if (instance.type === "https://w3id.org/arco/ontology/denotative-description/Measurement") set.add(instance.node.split("-").pop());else set.add(instance.node);
      });
      return set.size;
    }
  }]);

  return InstancesList;
}();

exports["default"] = InstancesList;