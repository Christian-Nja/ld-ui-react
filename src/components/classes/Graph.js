import Node from './Node';
import Edge from './Edge';

/**
 * @description A basic graph structure to handle data structured as graphs
 * @author Christian Colonna
 * @date 06-11-2020
 * @export
 * @class Graph
 */
export default class Graph {
    static relType = {
        SUB: 'subPattern',
        COMPONENT: 'componentPattern',
        SUPER_PATTERN: 'pattern',
    };

    /**
     * Creates an instance of Graph.
     * @author Christian Colonna
     * @date 06-11-2020
     * @param {Node[]} [nodes]
     * @param {Edge[]} [edges]
     * @memberof Graph
     */
    constructor(nodes, edges) {
        this.nodes = nodes || [];
        this.edges = edges || [];
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
    addRelation(relation, type, nodeShape, nodeSize) {
        const subPattern = relation[type];
        const superPattern = relation[Graph.relType.SUPER_PATTERN];
        this.addNode(
            new Node({
                id: subPattern,
                shape: nodeShape,
                style: { nodeSize: nodeSize },
            })
        );
        this.addNode(
            new Node({
                id: superPattern,
                shape: nodeShape,
                style: { nodeSize: nodeSize },
            })
        );
        const edgeId = `${subPattern}->${superPattern}`;
        this.addEdge(
            new Edge({
                id: edgeId,
                source: superPattern,
                target: subPattern,
            })
        );
    }

    /**
     * @description Adds a Node to Graph if it's not duplicate
     * @author Christian Colonna
     * @date 06-11-2020
     * @param {Node} node
     * @memberof Graph
     */
    addNode(node) {
        if (!this.hasNode(node.id)) this.nodes.push(node);
    }

    /**
     * @description Adds a list of Node to the Graph if they are not duplicates
     * @author Christian Colonna
     * @date 09-11-2020
     * @param {Node[]} nodes
     * @memberof Graph
     */
    addNodes(nodes) {
        nodes.map((node) =>
            this.addNode(
                new Node({
                    id: node.id,
                })
            )
        );
    }

    /**
     * @description Adds an Edge to Graph if it's not duplicate
     * @author Christian Colonna
     * @date 06-11-2020
     * @param {Edge} edge
     * @memberof Graph
     */
    addEdge(edge) {
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
}
