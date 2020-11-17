'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = void 0;

var _Node = _interopRequireDefault(require('./Node'));

var _Edge = _interopRequireDefault(require('./Edge'));

var _chromaJs = _interopRequireDefault(require('chroma-js'));

var _generics = require('../../utilities/generics');

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
   * @param {Object} [palette]
   * @memberof Graph
   */
    function Graph(nodes, edges, palette) {
        _classCallCheck(this, Graph);

        this.nodes = nodes || [];
        this.edges = edges || [];
        this.palette = palette || Graph.palettes.SPRING;
    }
    /**
   * @description Add multiple relations to the Graph
   * @author Christian Colonna
   * @date 09-11-2020
   * @param {Object[]} relations
   * @param {string} type check Graph.relType
   * @param {string} nodeShape
   * @param {number} nodeSize
   * @memberof Graph
   */


    _createClass(Graph, [{
        key: 'addRelations',
        value: function addRelations(relations, type, nodeShape, nodeSize) {
            var _this = this;

            relations.map(function (relation) {
                _this.addRelation(relation, type, nodeShape, nodeSize);
            });
        }
        /**
     * @description Add a relation to the Graph : Node_1-Edge->Node_2
     *              If nodes or edges are already in the graph they are not added
     *
     * @author Christian Colonna
     * @date 09-11-2020
     * @param {object} relation
     * @param {string} type check Graph.relType for available relations
     * @param {string} nodeShape default = CircleNode
     * @param {number} nodeSize
     * @memberof Graph
     */

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
                target: superPattern,
                label: type === Graph.relType.COMPONENT ? 'hasComponent' : 'specialization',
                style: {
                    line: {
                        width: 3,
                        color: type === Graph.relType.COMPONENT ? this.palette.compositionEdge : this.palette.specializationEdge
                    }
                }
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
     * @description Adds a list of Node to the Graph if they are not duplicates
     * @author Christian Colonna
     * @date 09-11-2020
     * @param {Node[]} nodes
     * @memberof Graph
     */

    }, {
        key: 'addNodes',
        value: function addNodes(nodes) {
            var _this2 = this;

            nodes.map(function (node) {
                return _this2.addNode(new _Node['default']({
                    id: node.id
                }));
            });
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
     * @description returns the Graph as JSON
     * @author Christian Colonna
     * @date 06-11-2020
     * @returns {Object}
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
        /**
     * @description Return node count
     * @author Christian Colonna
     * @date 10-11-2020
     * @returns {number}
     * @memberof Graph
     */

    }, {
        key: 'nodeCount',
        value: function nodeCount() {
            return this.nodes.length;
        }
        /**
     * @description Returns adjacency list for a given node
     * @author Christian Colonna
     * @date 10-11-2020
     * @param {Node} node
     * @returns {String[]} node ids
     * @memberof Graph
     */

    }, {
        key: 'getAdjacents',
        value: function getAdjacents(node) {
            var _this3 = this;

            var adjacents = [];
            this.edges.forEach(function (edge) {
                if (edge.source === node.id) {
                    adjacents.push(_this3.getNodeById(edge.target));
                } else if (edge.target === node.id) {
                    adjacents.push(_this3.getNodeById(edge.source));
                }
            });
            return adjacents;
        }
        /**
     * @description Return the degree of a node
     * @author Christian Colonna
     * @date 10-11-2020
     * @param {Node} node
     * @returns {number} node degree
     * @memberof Graph
     */

    }, {
        key: 'degree',
        value: function degree(node) {
            return this.getAdjacents(node).length;
        }
        /**
     * @description Return a node with given id
     * @author Christian Colonna
     * @date 10-11-2020
     * @param {string} id node id
     * @returns {Node}
     * @memberof Graph
     */

    }, {
        key: 'getNodeById',
        value: function getNodeById(id) {
            var FIRST_UNIQUE_NODE = 0;
            return this.nodes.filter(function (node) {
                return node.id === id;
            })[FIRST_UNIQUE_NODE];
        }
        /**
     * @description Executes BFS on Graph and if specified calls filter on every node.
     *              You can optionally define a starting node else it's got randomly
     * @author Christian Colonna
     * @date 10-11-2020
     * @param {(node, id)=>} [filter]
     * @memberof Graph
     */

    }, {
        key: 'breadthFirstSearch',
        value: function breadthFirstSearch(filter) {
            var _this4 = this;

            var visited = [];
            var fltr = (0, _generics.defineProp)(filter, function (node, id) {});
            var i = 0;

            if (this.nodes[0]) {
                this.nodes.forEach(function (node) {
                    if (!visited.includes(node.id)) {
                        (function () {
                            var queue = new _generics.Queue();
                            visited.push(node.id);
                            queue.enqueue(node);

                            while (!queue.isEmpty()) {
                                var nextNode = queue.dequeue();
                                fltr(nextNode, i);
                                i++;

                                var adjacents = _this4.getAdjacents(nextNode);

                                adjacents.forEach(function (adjacent) {
                                    if (adjacent && !visited.includes(adjacent.id)) {
                                        visited.push(adjacent.id);
                                        queue.enqueue(adjacent);
                                    }
                                });
                            }
                        })();
                    }
                });
            }
        }
        /**
     * @description Return first node matching filter condition
     * @author Christian Colonna
     * @date 10-11-2020
     * @param {(node)=>{}} filter
     * @returns {Node}
     * @memberof Graph
     */

    }, {
        key: 'getNode',
        value: function getNode(filter) {
            return this.nodes.find(function (node) {
                filter(node);
            });
        }
        /**
     * @description Return a discrete gradient of colors (length: total nodes)
     * @author Christian Colonna
     * @date 10-11-2020
     * @param {string} [color1="#fafa6e"]
     * @param {string} [color2="#2f7224"]
     * @param {string} [mode="lrgb"]
     * @returns {string[]} color palette
     * @memberof Graph
     */

    }, {
        key: 'nodeGradient',
        value: function nodeGradient() {
            var colors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.palette.gradient;
            var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'lrgb';
            return _chromaJs['default'].scale(colors).mode(mode).colors(this.nodeCount());
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

_defineProperty(Graph, 'palettes', {
    SPRING: {
        gradient: ['#fff000', '#ff8300', '#ff0000', 'green', // "#9cb400",
            '#0000c4'],
        compositionEdge: '#2185d0',
        specializationEdge: 'rgba(0,0,0,.87)'
    }
});