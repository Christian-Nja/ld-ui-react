'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = void 0;

var _RequiredParamChecker = _interopRequireDefault(require('./RequiredParamChecker'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @description A simple Edge class to model relation Node -> Node
 * @author Christian Colonna
 * @date 06-11-2020
 * @export
 * @class Edge
 */
var Edge = /*#__PURE__*/function () {
    /**
   * Creates an instance of Edge.
   * @author Christian Colonna
   * @date 06-11-2020
   * @param {Object} edge
   * @param {String} edge.source
   * @param {String} edge.target
   * @param {String} [edge.id]
   * @param {String} [edge.label]
   * @param {Edge} [edge.data]
   * @param {Object} [edge.style]
   * @memberof Edge
   */
    function Edge(edge) {
        _classCallCheck(this, Edge);

        new _RequiredParamChecker['default']([{
            value: edge.source,
            label: 'edge.source'
        }, {
            value: edge.target,
            label: 'edge.target'
        }]);
        var edgeId = ''.concat(edge.source, '->').concat(edge.target);
        this.id = edge.id || edgeId;
        this.label = edge.label;
        this.data = edge.data || edge.id;
        this.source = edge.source;
        this.target = edge.target;
        this.style = edge.style;
    }
    /**
   * @description returns this Edge as JSON
   * @author Christian Colonna
   * @date 06-11-2020
   * @returns {JSON}
   * @memberof Edge
   */


    _createClass(Edge, [{
        key: 'toJson',
        value: function toJson() {
            console.log({
                id: this.id,
                label: this.label,
                data: this.data,
                source: this.source,
                target: this.target,
                style: this.style
            });
            return {
                id: this.id,
                label: this.label,
                data: this.data,
                source: this.source,
                target: this.target,
                style: this.style
            };
        }
    }]);

    return Edge;
}();

exports['default'] = Edge;