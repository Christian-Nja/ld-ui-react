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
import { useWindowDimensions } from '../hooks/ld-ui-hooks';

// define keys to semantically access elements
const SUB_PATTERN = 'subPattern';
const SUPER_PATTERN = 'pattern';

// globals
const containerID = 'graph-container';

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
    const [g, setGraph] = useState(new DirectedGraph());

    useEffect(() => {
        const updateG = new DirectedGraph();
        if (props.patterns.patternSpecializations) {
            // for (const specialization of props.patterns
            //     .patternSpecializations) {
            //     const subPattern = specialization[SUB_PATTERN];
            //     const superPattern = specialization[SUPER_PATTERN];
            //     if (!g.hasNode(subPattern)) {
            //         let patternLabel = extractPatternNameFromURI(subPattern);
            //         g.addNode(subPattern, {
            //             label: patternLabel,
            //         });
            //     }
            //     if (!g.hasNode(superPattern)) {
            //         let patternLabel = extractPatternNameFromURI(superPattern);
            //         g.addNode(superPattern, {
            //             label: patternLabel,
            //         });
            //     }
            //     if (!g.hasEdge(superPattern, subPattern)) {
            //         g.addEdge(superPattern, subPattern, {});
            //     }
            // }
            updateG.addNode('id0', { label: 'Tom' });
            updateG.addNode('id1', { label: 'Jerry' });
            updateG.addEdge('id0', 'id1');
        }
        console.log(updateG.asSigmaGraph());
        setGraph(updateG);
    }, [props.patterns.patternSpecializations]);

    return (
        <Sigma
            renderer="webgl"
            style={containerStyle}
            onOverNode={(e) => console.log('Mouse over node')}
            graph={g.asSigmaGraph()}
            settings={{ drawEdges: true, clone: false }}
        >
            <RelativeSize initialSize={15} />
            <RandomizeNodePositions />
        </Sigma>
    );
}

/**
 * Extract name of a pattern From URI
 * it works for '/' namespaces.
 *
 * Warning: Not working for '#' namespaces yet
 *
 * @param {String} uri pattern uri
 */
function extractPatternNameFromURI(uri) {
    const uriChunks = uri.split('/');
    return uriChunks[uriChunks.length - 1];
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
