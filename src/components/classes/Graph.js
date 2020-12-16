import Node from "./Node";
import Edge from "./Edge";

import chroma from "chroma-js";
import { Queue, defineProp } from "../../utilities/generics";

/**
 * @description A basic graph structure to handle data structured as graphs
 * @author Christian Colonna
 * @date 06-11-2020
 * @export
 * @class Graph
 */
export default class Graph {
    static relType = {
        // SUB: "subPattern",
        COMPONENT: "has component",
        SUPER_PATTERN: "pattern",
    };

    static palettes = {
        SPRING: {
            gradient: [
                "#fff000",
                "#ff8300",
                "#ff0000",
                "green",
                // "#9cb400",
                "#0000c4",
            ],
            compositionEdge: "#2185d0",
            specializationEdge: "rgba(0,0,0,.87)",
        },
    };

    /**
     * Creates an instance of Graph.
     * @author Christian Colonna
     * @date 06-11-2020
     * @param {Node[]} [nodes]
     * @param {Edge[]} [edges]
     * @param {Object} [palette]
     * @memberof Graph
     */
    constructor(nodes, edges, filters, palette) {
        this.nodes = nodes || [];
        this.edges = edges || [];
        this.palette = palette || Graph.palettes.SPRING;
        this.filters = filters || [];
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
    addRelations(relations, type, nodeShape, nodeSize) {
        relations.map((relation) => {
            this.addRelation(relation, type, nodeShape, nodeSize);
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
    addRelation(triple) {
        // add s
        this.addNode(triple.s);
        // add o
        this.addNode(triple.o);
        this.addEdge(triple);
    }

    /**
     * @description Adds a Node to Graph if it's not duplicate
     * @author Christian Colonna
     * @date 06-11-2020
     * @param {Node} node
     * @memberof Graph
     */
    addNode(node, shape) {
        if (!this.hasNode(node.id))
            this.nodes.push(
                new Node({
                    id: node.id,
                    shape: shape,
                    style: node.style,
                    data: node,
                })
            );
    }

    /**
     * @description Adds a list of Node to the Graph if they are not duplicates
     * @author Christian Colonna
     * @date 09-11-2020
     * @param {Node[]} nodes
     * @memberof Graph
     */
    addNodes(nodes) {
        nodes.map((node) => this.addNode(node));
    }

    /**
     * @description Adds an Edge to Graph if it's not duplicate
     * @author Christian Colonna
     * @date 06-11-2020
     * @param {Edge} edge
     * @memberof Graph
     */
    addEdge(triple) {
        const edgeId = `${triple.s.id}->${triple.o.id}`;
        if (!this.hasEdge(edgeId))
            this.edges.push(
                new Edge({
                    id: edgeId,
                    source: triple.s.id, //Graph.relType.COMPONENT ? superPattern : subPattern,
                    target: triple.o.id, //Graph.relType.COMPONENT ? subPattern : superPattern,
                    label: triple.p,
                    data: triple,
                    style: {
                        line: {
                            width: 3,
                            color:
                                triple.p === Graph.relType.COMPONENT
                                    ? this.palette.compositionEdge
                                    : this.palette.specializationEdge,
                        },
                    },
                })
            );
    }

    /**
     * @description Check if Graph has node with given id
     * @author Christian Colonna
     * @date 06-11-2020
     * @param {String} id
     * @returns {Node} node or undefined
     * @memberof Graph
     */
    hasNode(id) {
        return this.nodes.find((node) => node.id === id);
    }

    /**
     * @description Check if Graph has edge with given id
     * @author Christian Colonna
     * @date 06-11-2020
     * @param {String} id
     * @returns {Edge} found edge or undefined
     * @memberof Graph
     */
    hasEdge(id) {
        return this.edges.find((edge) => edge.id === id);
    }

    filteredNodes(removedNodes) {
        if (removedNodes.size > 0) {
            const filtered = this.nodes.filter((node) => {
                let filterValues = removedNodes.get(node.id);
                if (
                    Array.from(filterValues.values()).every((v) => {
                        return v;
                    })
                )
                    return node;
            });
            return filtered;
        } else return this.nodes;
    }

    filteredEdges(nodes) {
        const nodeIds = nodes.map((node) => {
            return node.id;
        });
        return this.edges.filter((edge) => {
            return (
                nodeIds.includes(edge.target) && nodeIds.includes(edge.source)
            );
        });
    }

    toVisual(removedNodes = []) {
        const filtered = this.filteredNodes(removedNodes);
        return {
            nodes: filtered.map((node) => {
                return node.toJson();
            }),
            edges: this.filteredEdges(filtered).map((edge) => {
                return edge.toJson();
            }),
        };
    }

    /**
     * @description returns the Graph as JSON
     * @author Christian Colonna
     * @date 06-11-2020
     * @returns {Object}
     * @memberof Graph
     */
    toJson() {
        return {
            nodes: this.nodes.map((node) => {
                return node.toJson();
            }),
            edges: this.edges.map((edge) => {
                return edge.toJson();
            }),
        };
    }

    /**
     * @description Return node count
     * @author Christian Colonna
     * @date 10-11-2020
     * @returns {number}
     * @memberof Graph
     */
    nodeCount() {
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
    getAdjacents(node) {
        const adjacents = [];
        this.edges.forEach((edge) => {
            if (edge.source === node.id) {
                adjacents.push(this.getNodeById(edge.target));
            } else if (edge.target === node.id) {
                adjacents.push(this.getNodeById(edge.source));
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
    degree(node) {
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
    getNodeById(id) {
        const FIRST_UNIQUE_NODE = 0;
        return this.nodes.filter((node) => node.id === id)[FIRST_UNIQUE_NODE];
    }

    /**
     * @description Executes BFS on Graph and if specified calls filter on every node.
     *              You can optionally define a starting node else it's got randomly
     * @author Christian Colonna
     * @date 10-11-2020
     * @param {Object} [filter] arrow function (node, id) => {}
     * @memberof Graph
     */
    breadthFirstSearch(filter) {
        let visited = [];
        let fltr = defineProp(filter, (node, id) => {});
        let i = 0;
        if (this.nodes[0]) {
            this.nodes.forEach((node) => {
                if (!visited.includes(node.id)) {
                    let queue = new Queue();
                    visited.push(node.id);
                    queue.enqueue(node);
                    while (!queue.isEmpty()) {
                        let nextNode = queue.dequeue();
                        fltr(nextNode, i);
                        i++;
                        const adjacents = this.getAdjacents(nextNode);
                        adjacents.forEach((adjacent) => {
                            if (adjacent && !visited.includes(adjacent.id)) {
                                visited.push(adjacent.id);
                                queue.enqueue(adjacent);
                            }
                        });
                    }
                }
            });
        }
    }

    /**
     * @description Return first node matching filter condition
     * @author Christian Colonna
     * @date 10-11-2020
     * @param {Object} filter arrow function () => {}
     * @returns {Node}
     * @memberof Graph
     */
    getNode(filter) {
        return this.nodes.find((node) => {
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
    nodeGradient(colors = this.palette.gradient, mode = "lrgb") {
        return chroma.scale(colors).mode(mode).colors(this.nodeCount());
    }
}
