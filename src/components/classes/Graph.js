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

    addRelations(relations, type, nodeShape, nodeSize) {
        relations.map((relation) => {
            this.addRelation(relation, type, nodeShape, nodeSize);
        });
    }

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
                source: subPattern,
                target: superPattern,
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
        console.log('check hasNode');
        console.log(
            this.nodes.find((node) => {
                return node.id === id;
            })
        );
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
     * @description
     * @author Christian Colonna
     * @date 06-11-2020
     * @returns {Object} returns the Graph as JSON
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
