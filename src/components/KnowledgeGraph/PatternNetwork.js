import React from 'react';

import '@antv/graphin/dist/index.css'; // Don't forget to import css

/**
 * css
 */
import './PatternNetwork.css';

import { defineProp } from '../../utilities/generics';
import Patterns from './Patterns';
import PatternInstances from './PatternInstances';

export default function PatternNetwork(props) {
    const specializations = defineProp(props.patterns.specializations, []);
    const compositions = defineProp(props.patterns.compositions, []);
    const instances = defineProp(props.patterns.instances, null);

    return (
        <div>
            {instances ? (
                <PatternInstances
                    instances={instances}
                    graphContainerStyle={graphContainerStyle}
                ></PatternInstances>
            ) : (
                <Patterns
                    getInstances={props.getInstances}
                    graphContainerStyle={graphContainerStyle}
                    specializations={specializations}
                    compositions={compositions}
                ></Patterns>
            )}
        </div>
    );
}

const graphContainerStyle = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
};
