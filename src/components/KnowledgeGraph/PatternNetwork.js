import React from 'react';

import Graphin, { Utils } from '@antv/graphin';

import '@antv/graphin/dist/index.css'; // Don't forget to import css

/**
 * css
 */
import './PatternNetwork.css';

import Graph from '../classes/Graph';
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

    let graph = new Graph();
    if (props.patterns.patternSpecializations) {
        graph.addRelations(
            props.patterns.patternSpecializations,
            Graph.relType.SUB,
            'CircleNode',
            24
        );
    }

    if (graph.toJson()) {
        return <Graphin data={graph.toJson()}></Graphin>;
    }
}

export default PatternNetwork;
