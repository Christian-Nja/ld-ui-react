import React from 'react';

import Graphin, { Utils } from '@antv/graphin';

import '@antv/graphin/dist/index.css'; // Don't forget to import css

/**
 * css
 */
import './PatternNetwork.css';

import { useWindowDimensions } from '../hooks/ld-ui-hooks';
import { getURILabel } from '../../utilities/uri';

//# define CONSTANTS
const SUB_PATTERN = 'subPattern';
const SUPER_PATTERN = 'pattern';

// globals
const containerID = 'graph-container';
const specializationEdgeColor = '#000';
const compositionEdgeColor = '#000';

function PatternNetwork(props) {
    const { height, width } = useWindowDimensions();
    const containerStyle = {
        height: (height * 80) / 100, // 80%
        width: width,
    };

    console.log(props);
    const data = Utils.mock(10).circle().graphin();
    console.log(data);
    if (
        props.patterns.patternSpecializations ||
        props.patterns.patternCompositions
    ) {
        return (
            <Graphin
                data={transform(props.patterns.patternSpecializations)}
            ></Graphin>
        );
    } else {
        return null;
    }
}

export default PatternNetwork;

const transform = (relations) => {
    if (relations) {
        const nodes = [];
        const edges = [];
        relations.map((relation) => {
            const subPattern = relation[SUB_PATTERN];
            const superPattern = relation[SUPER_PATTERN];
            if (!nodes.find((node) => node.id === subPattern)) {
                nodes.push({
                    id: subPattern,
                    label: getURILabel(subPattern),
                    data: subPattern,
                    shape: 'CircleNode',
                    type: 'company',
                    style: {
                        nodeSize: 24,
                    },
                });
            }
            if (!nodes.find((node) => node.id === superPattern)) {
                nodes.push({
                    id: superPattern,
                    label: getURILabel(superPattern),
                    data: subPattern,
                    shape: 'CircleNode',
                    type: 'company',
                    style: {
                        nodeSize: 24,
                    },
                });
            }
            const edgeId = `${subPattern}->${superPattern}`;
            if (!edges.find((edge) => edge.id === edgeId)) {
                edges.push({
                    id: edgeId,
                    data: edgeId,
                    source: superPattern,
                    target: subPattern,
                });
            }
        });
        console.log({ nodes: nodes, edges: edges });
        return { nodes: nodes, edges: edges };
    }
};
