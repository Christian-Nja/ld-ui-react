import React from 'react';

import { getURILabel } from '../../utilities/uri';

export default class SpecializationRelations extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        this.addRelations(this.props.sigma.graph, this.props.relations);
        console.log(this.props.sigma.graph.nodes());
        console.log(this.props.sigma.graph.edges());
        this.props.sigma.refresh();
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
                        color: '#000',
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
