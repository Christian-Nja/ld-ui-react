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
    getNeighbors(resourceURI) {
        const rawNeighbours = this.graph.neighbors(resourceURI);
        const neighbors = map(rawNeighbours, (n) => {
            return this.getResource(n);
        });
        return neighbors;
    }
    getClassesNativeToPattern(patternUri) {
        return filter(this.getNeighbors(patternUri), (patternNeighbor) => {
            return patternNeighbor.getType() === "Class";
        });
    }
    getPatternsByClassIsNativeTo(classUri) {
        return filter(this.getNeighbors(classUri), (patternNeighbor) => {
            return patternNeighbor.getType() === "Pattern";
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
    forEachClass(callback = (resourceURI, attributes) => {}) {
        const wrappedClassCallback = (resourceURI, attributes) => {
            if (attributes && attributes.type === "Class") {
                callback(resourceURI, attributes);
            }
        };
        this.graph.forEachNode(wrappedClassCallback);
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
    toVisualGraph(mobile = false) {
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
                    fillOpacity: 0.2,
                },
                stateStyles: {
                    hover: {
                        // show shadow
                        fillOpacity: 0.2,
                        shadowColor: resource.getProperty("nodeColor"),
                        shadowBlur: 10,
                    },
                    highlight: {
                        stroke: resource.getProperty("nodeColor"),
                        fill: resource.getProperty("nodeColor"),
                        shadowColor: resource.getProperty("nodeColor"),
                        shadowBlur: 0.6,
                        shadowOffsetX: 1,
                        shadowOffsetY: 1,
                    },
                    clicked: {
                        stroke: resource.getProperty("nodeColor"),
                        fill: resource.getProperty("nodeColor"),
                        fillOpacity: 0.6,
                        shadowColor: resource.getProperty("nodeColor"),
                        shadowBlur: 10,
                    },
                    active: {
                        // this when clicked a neighbour
                        stroke: resource.getProperty("nodeColor"),
                        fill: resource.getProperty("nodeColor"),
                        fillOpacity: 0.4,
                        lineWidth: 3,
                        shadowColor: resource.getProperty("nodeColor"),
                        shadowBlur: 10,
                    },
                    selected: {
                        // this when clicked the node
                        stroke: resource.getProperty("nodeColor"),
                        fill: resource.getProperty("nodeColor"),
                        fillOpacity: 0.6,
                        lineWidth: 6,
                        shadowColor: resource.getProperty("nodeColor"),
                        shadowBlur: 10,
                    },
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
        const toD3Node = (uri) => {
            const resource = this.getResource(uri);
            return {
                id: resource.getUri(),
                label: resource.getLabel(),
                color: resource.getProperty("nodeColor"),
                size: resource.getProperty("nodeSize") * 20,
                opacity: 0.8,
                strokeWidth: 1.5,
                symbolType: resource.getProperty("mobileNodeType"),
                data: this.dataMapper.toJson(resource),
            };
        };
        const toD3Edge = (uri) => {
            const property = this.getProperty(uri);
            return {
                id: property.getUri(),
                // label: property.getLabel(),
                source: this.graph.source(uri),
                target: this.graph.target(uri),
                highlightColor: property.getProperty("edgeColor"),
                renderLabel: true,
                label: property.getLabel(),
                data: this.dataMapper.toJson(property),
            };
        };

        return mobile
            ? {
                  nodes: decorateGraphNodesWithInitialPositioning(
                      map(this.getNodes(), toD3Node)
                  ),
                  links: map(this.getEdges(), toD3Edge),
              }
            : {
                  nodes: map(this.getNodes(), toGraphinNode),
                  edges: map(this.getEdges(), toGraphinEdge),
              };
    }
}

// https://github.com/anvaka/ngraph.forcelayout

/**
 * This function decorates nodes and links with positions. The motivation
 * for this function its to set `config.staticGraph` to true on the first render
 * call, and to get nodes and links statically set to their initial positions.
 * @param  {Object} nodes nodes and links with minimalist structure.
 * @return {Object} the graph where now nodes containing (x,y) coords.
 */
function decorateGraphNodesWithInitialPositioning(nodes) {
    return map(nodes, (n) => {
        return {
            ...n,
            x: n.x || Math.floor(Math.random() * 500),
            y: n.y || Math.floor(Math.random() * 500),
        };
    });
}
