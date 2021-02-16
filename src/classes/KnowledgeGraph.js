import { MultiDirectedGraph } from "graphology";
import { map, filter } from "lodash";
import ResourceDataMapper from "./ResourceDataMapper";

/**
 * In memory abstract representation of the data available to the application
 */
export default class KnowledgeGraph {
    constructor(graph) {
        this.graph = graph || new MultiDirectedGraph();
        this.dataMapper = new ResourceDataMapper();
    }
    static create(graph) {
        return new KnowledgeGraph(graph);
    }
    addTriple(resource1, property, resource2) {
        const r1Uri = resource1.getUri();
        const r2Uri = resource2.getUri();
        this.addResource(resource1);
        this.addResource(resource2);
        if (
            this.graph.hasNode(r1Uri) &&
            this.graph.hasNode(r2Uri) &&
            !this.graph.hasEdge(r1Uri, r2Uri)
        ) {
            this.graph.addDirectedEdgeWithKey(
                property.getUri(),
                r1Uri,
                r2Uri,
                this.dataMapper.toJson(property)
            );
        }
    }
    addResource(resource) {
        if (!this.graph.hasNode(resource.getUri())) {
            this.graph.addNode(
                resource.getUri(),
                this.dataMapper.toJson(resource)
            );
        }
    }
    getResource(uri) {
        try {
            const resourceAttributes = this.graph.getNodeAttributes(uri);
            return this.dataMapper.toResource({
                ...resourceAttributes,
                uri: uri,
            });
        } catch (e) {
            return undefined;
        }
    }
    getResources() {
        const uris = this.getNodes();
        return map(uris, (uri) => {
            return this.getResource(uri);
        });
    }
    getPatterns() {
        return filter(this.getResources(), (r) => {
            return r.getType() === "Pattern";
        });
    }
    getClasses() {
        return filter(this.getResources(), (r) => {
            return r.getType() === "Class";
        });
    }
    getProperty(uri) {
        try {
            const propertyAttributes = this.graph.getEdgeAttributes(uri);
            return this.dataMapper.toResource({
                ...propertyAttributes,
                uri: uri,
            });
        } catch (e) {
            return undefined;
        }
    }
    forEachResource(callback = (resourceURI, attributes) => {}) {
        this.graph.forEachNode(callback);
    }
    forEachPattern(callback = (resourceURI, attributes) => {}) {
        const wrappedPatternCallback = (resourceURI, attributes) => {
            if (attributes && attributes.type === "Pattern") {
                callback(resourceURI, attributes);
            }
        };
        this.graph.forEachNode(wrappedPatternCallback);
    }
    getResourceProperty(uri, property) {
        return this.graph.getNodeAttribute(uri, property);
    }
    updateResourceProperty(uri, property, newProperty) {
        this.graph.updateNodeAttribute(uri, property, () => {
            return newProperty;
        });
    }
    addResourceProperty(uri, property, value) {
        this.graph.setNodeAttribute(uri, property, value);
    }
    getResourceCount() {
        return this.graph.nodes().length;
    }
    getPatternCount() {
        return this.getPatterns().length;
    }
    getNodes() {
        return this.graph.nodes();
    }
    getEdges() {
        return this.graph.edges();
    }
    removeResource(uri) {
        try {
            this.graph.dropNode(uri);
        } catch (e) {}
    }
    removeProperty(uri) {
        try {
            this.graph.dropEdge(uri);
        } catch (e) {}
    }
    copy() {
        const newGraph = this.graph.copy();
        return KnowledgeGraph.create(newGraph);
    }
    toList() {
        return this.getResources();
    }
    toVisualGraph() {
        const toGraphinNode = (uri) => {
            const resource = this.getResource(uri);
            return {
                id: resource.getUri(),
                type: resource.getProperty("nodeType"), //this invalidate graphin style
                label: resource.getLabel(), //g6 interface
                size: [
                    //g6 interface
                    resource.getProperty("nodeSize"),
                    resource.getProperty("nodeSize"),
                ],
                // g6 interface
                labelCfg: {
                    position: resource.getProperty("nodeLabelPosition"),
                    style: {
                        fontSize: resource.getProperty("nodeLabelSize"), //g6 interface
                    },
                },
                style: {
                    keyshape: {
                        size: [
                            resource.getProperty("nodeSize"),
                            resource.getProperty("nodeSize"),
                        ],
                        stroke: resource.getProperty("nodeColor"),
                        fill: resource.getProperty("nodeBorderColor"),
                    },
                    label: {
                        value: resource.getLabel(),
                        fontSize: resource.getProperty("nodeLabelSize"),
                    },
                    stroke: resource.getProperty("nodeColor"), //g6 interface
                    fill: resource.getProperty("nodeBorderColor"), //g6 interface
                    cursor: "pointer",
                },
                data: this.dataMapper.toJson(resource),
            };
        };
        const toGraphinEdge = (uri) => {
            const property = this.getProperty(uri);
            return {
                id: property.getUri(),
                // label: property.getLabel(),
                source: this.graph.source(uri),
                target: this.graph.target(uri),
                style: {
                    keyshape: {
                        lineWidth: property.getProperty("edgeWidth"),
                        stroke: property.getProperty("edgeColor"),
                    },
                    label: {
                        value: property.getLabel(),
                        fontSize: property.getProperty("edgeLabelSize"),
                        fill: property.getProperty("edgeColor"),
                    },
                },
                // style: resource.getGraphinEdgeStyle(),
                data: this.dataMapper.toJson(property),
            };
        };
        return {
            nodes: map(this.getNodes(), toGraphinNode),
            edges: map(this.getEdges(), toGraphinEdge),
        };
    }
}
