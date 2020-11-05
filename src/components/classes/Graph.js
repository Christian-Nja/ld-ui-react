export default class Graph {
    constructor(nodes, edges) {
        this.nodes = nodes;
        this.edges = edges;
    }
    toJson() {
        return {
            nodes: this.nodes.map((node) => {
                node.toJson();
            }),
            edges: this.edges.map((edge) => {
                edge.toJson();
            }),
        };
    }
}

/** TODO : add a method HERE that accept a relation (node->node)*/
