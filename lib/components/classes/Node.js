'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = void 0;

var _RequiredParamChecker = _interopRequireDefault(require('./RequiredParamChecker'));

var _uri = require('../../utilities/uri');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @description A basic Node class
 * @author Christian Colonna
 * @date 06-11-2020
 * @export
 * @class Node
 */
var Node = /*#__PURE__*/function () {
    /**
   * Creates an instance of Node.
   * @author Christian Colonna
   * @date 06-11-2020
   * @param {Object} node
   * @param {String} node.id
   * @param {String} [node.label]
   * @param {Object} [node.data]
   * @param {String} [node.shape]
   * @param {String} [node.type]
   * @param {Object} [node.style]
   * @memberof Node
   */
    function Node(node) {
        _classCallCheck(this, Node);

        new _RequiredParamChecker['default']([node.id]);
        this.id = node.id;
        this.label = node.label || (0, _uri.getURILabel)(node.id);
        this.data = node.data || node.id;
        this.shape = node.shape || 'CircleNode';
        this.type = node.type || 'company';
        this.style = node.style || {
            nodeSize: 25
        };
    }
    /**
   * @description Returns the class as JSON
   * @author Christian Colonna
   * @date 06-11-2020
   * @returns {Object}
   * @memberof Node
   */


    _createClass(Node, [{
        key: 'toJson',
        value: function toJson() {
            return {
                id: this.id,
                label: this.label,
                data: this.data,
                shape: this.shape,
                type: this.type,
                style: this.style
            };
        }
    }]);

    return Node;
}();

exports['default'] = Node;