// you may import Collection
import React, { useEffect, useState } from 'react';
import {
    Sigma,
    SigmaEnableWebGL,
    RelativeSize,
    RandomizeNodePositions,
} from 'react-sigma';
import { DirectedGraph } from 'graphology';

/**
 * css
 */
import './PatternNetwork.css';

/**
 * Internal modules
 */
import PatternGraph from './PatternGraph';
import { useWindowDimensions } from '../hooks/ld-ui-hooks';

// define keys to semantically access elements
const SUB_PATTERN = 'subPattern';
const SUPER_PATTERN = 'pattern';

// globals
const containerID = 'graph-container';
const specializationEdgeColor = '#000';
const compositionEdgeColor = '#000';

export default function PatternNetwork(props) {
    const { height, width } = useWindowDimensions();
    const containerStyle = {
        height: (height * 80) / 100, // 80%
        width: width,
    };

    const simpleGraph = {
        nodes: [
            { id: 'id0', label: 'Tom' },
            { id: 'id1', label: 'Jerry' },
        ],
        edges: [{ id: 'e0', source: 'id0', target: 'id1', label: 'eat' }],
    };
    const [graph, setGraph] = useState(new DirectedGraph());

    // useEffect(() => {
    //     const g = new DirectedGraph();
    //     if (props.patterns.patternSpecializations) {
    //         addRelations(
    //             g,
    //             props.patterns.patternSpecializations,
    //             specializationEdgeColor
    //         );
    //     }
    //     if (props.patterns.patternCompositions) {
    //         addRelations(
    //             g,
    //             props.patterns.patternCompositions,
    //             compositionEdgeColor
    //         );
    //     }
    //     setGraph(g);
    // }, [props.patterns]);

    if (props.patterns.patternSpecializations)
        return (
            <Sigma
                renderer="webgl"
                style={containerStyle}
                onOverNode={(e) => console.log('Mouse over node')}
                graph={{ nodes: [], edges: [] }}
                settings={{ drawEdges: true, clone: false }}
            >
                <PatternGraph
                    relations={props.patterns.patternSpecializations}
                    edgeColor={specializationEdgeColor}
                ></PatternGraph>
                <RelativeSize initialSize={15} />
                <RandomizeNodePositions />
            </Sigma>
        );
    else return null;
}

function addRelations(g, relations, edgeColor, keys) {
    for (const relation of relations) {
        const subPattern = relation[SUB_PATTERN];
        const superPattern = relation[SUPER_PATTERN];
        if (!g.nodes(subPattern)) {
            let patternLabel = extractPatternNameFromURI(subPattern);
            g.addNode(subPattern, {
                label: patternLabel,
            });
        }
        if (!g.nodes(superPattern)) {
            let patternLabel = extractPatternNameFromURI(superPattern);
            g.addNode(superPattern, {
                label: patternLabel,
            });
        }
        if (!g.hasEdge(superPattern, subPattern)) {
            g.addEdge(superPattern, subPattern, { color: edgeColor });
        }
    }
    return g;
}

/**
 * Extension of graphology implementation
 */
DirectedGraph.prototype.sigmaNodes = function () {
    let nodes = [];
    for (const [node, attributes] of this.nodeEntries()) {
        nodes.push({ id: node, ...attributes });
    }
    return nodes;
};

DirectedGraph.prototype.sigmaEdges = function () {
    let edges = [];
    for (const [edge, attributes, source, target] of this.edgeEntries()) {
        // HERE check if attributes is a subObject and you need to pass it attributes:attributes
        edges.push({ id: edge, source: source, target: target, ...attributes });
    }
    return edges;
};

DirectedGraph.prototype.asSigmaGraph = function () {
    let g = { nodes: this.sigmaNodes(), edges: this.sigmaEdges() };
    console.log(g);
    return { nodes: this.sigmaNodes(), edges: this.sigmaEdges() };
};
