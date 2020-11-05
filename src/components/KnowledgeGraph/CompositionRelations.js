import React from 'react';

import { getURILabel } from '../../utilities/uri';

//# define CONSTANTS
const SUB_PATTERN = 'componentPattern';
const SUPER_PATTERN = 'pattern';

export default class CompositionRelations extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.sigma);
        this.addRelations(props.sigma.graph, props.relations);
    }
    addRelations(g, relations) {
        if (relations) {
            for (const relation of relations) {
                const subPattern = relation[SUB_PATTERN];
                const superPattern = relation[SUPER_PATTERN];
                if (!g.nodes(subPattern)) {
                    let patternLabel = getURILabel(subPattern);
                    g.addNode({ id: subPattern, label: patternLabel });
                }
                if (!g.nodes(superPattern)) {
                    let patternLabel = getURILabel(superPattern);
                    g.addNode({ id: superPattern, label: patternLabel });
                }
                const edgeID = `${superPattern}->${subPattern}`;
                if (!g.edges(edgeID)) {
                    g.addEdge({
                        id: edgeID,
                        source: superPattern,
                        target: subPattern,
                        color: edgeColor,
                    });
                }
            }
        }
    }
    render() {
        return null;
    }
}

SpecializationRelations.defaultProps = {
    edgeColor: '#FFF',
    relations: null,
};
