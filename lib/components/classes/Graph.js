'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = void 0;

var _Node = _interopRequireDefault(require('./Node'));

var _Edge = _interopRequireDefault(require('./Edge'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @description A basic graph structure to handle data structured as graphs
 * @author Christian Colonna
 * @date 06-11-2020
 * @export
 * @class Graph
 */
var Graph = /*#__PURE__*/function () {
    /**
   * Creates an instance of Graph.
   * @author Christian Colonna
   * @date 06-11-2020
   * @param {Node[]} [nodes]
   * @param {Edge[]} [edges]
   * @memberof Graph
   */
    function Graph(nodes, edges) {
        _classCallCheck(this, Graph);

        this.nodes = nodes || [];
        this.edges = edges || [];
    }

    _createClass(Graph, [{
        key: 'addRelations',
        value: function addRelations(relations, type, nodeShape, nodeSize) {
            var _this = this;

            relations.map(function (relation) {
                _this.addRelation(relation, type, nodeShape, nodeSize);
            });
        }
    }, {
        key: 'addRelation',
        value: function addRelation(relation, type, nodeShape, nodeSize) {
            var subPattern = relation[type];
            var superPattern = relation[Graph.relType.SUPER_PATTERN];
            this.addNode(new _Node['default']({
                id: subPattern,
                shape: nodeShape,
                style: {
                    nodeSize: nodeSize
                }
            }));
            this.addNode(new _Node['default']({
                id: superPattern,
                shape: nodeShape,
                style: {
                    nodeSize: nodeSize
                }
            }));
            var edgeId = ''.concat(subPattern, '->').concat(superPattern);
            this.addEdge(new _Edge['default']({
                id: edgeId,
                source: subPattern,
                target: superPattern
            }));
        }
        /**
     * @description Adds a Node to Graph if it's not duplicate
     * @author Christian Colonna
     * @date 06-11-2020
     * @param {Node} node
     * @memberof Graph
     */

    }, {
        key: 'addNode',
        value: function addNode(node) {
            if (!this.hasNode(node.id)) this.nodes.push(node);
        }
        /**
     * @description Adds an Edge to Graph if it's not duplicate
     * @author Christian Colonna
     * @date 06-11-2020
     * @param {Edge} edge
     * @memberof Graph
     */

    }, {
        key: 'addEdge',
        value: function addEdge(edge) {
            if (!this.hasEdge(edge.id)) this.edges.push(edge);
        }
        /**
     * @description Check if Graph has node with given id
     * @author Christian Colonna
     * @date 06-11-2020
     * @param {String} id
     * @returns {Node} node or undefined
     * @memberof Graph
     */

    }, {
        key: 'hasNode',
        value: function hasNode(id) {
            console.log('check hasNode');
            console.log(this.nodes.find(function (node) {
                return node.id === id;
            }));
            return this.nodes.find(function (node) {
                return node.id === id;
            });
        }
        /**
     * @description Check if Graph has edge with given id
     * @author Christian Colonna
     * @date 06-11-2020
     * @param {String} id
     * @returns {Edge} found edge or undefined
     * @memberof Graph
     */

    }, {
        key: 'hasEdge',
        value: function hasEdge(id) {
            return this.edges.find(function (edge) {
                return edge.id === id;
            });
        }
        /**
     * @description
     * @author Christian Colonna
     * @date 06-11-2020
     * @returns {Object} returns the Graph as JSON
     * @memberof Graph
     */

    }, {
        key: 'toJson',
        value: function toJson() {
            return {
                nodes: this.nodes.map(function (node) {
                    return node.toJson();
                }),
                edges: this.edges.map(function (edge) {
                    return edge.toJson();
                })
            };
        }
    }]);

    return Graph;
}();

exports['default'] = Graph;

_defineProperty(Graph, 'relType', {
    SUB: 'subPattern',
    COMPONENT: 'componentPattern',
    SUPER_PATTERN: 'pattern'
});