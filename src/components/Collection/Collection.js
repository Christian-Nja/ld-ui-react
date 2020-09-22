import React from 'react';

/**
 * css
 */
import './Collection.css';

/**
 * internal modules
 */
import Entity from './Entity';
import CONFIG from './config';

export default function Collection(props) {
    const style = props.style
        ? props.style
        : {
            collectionLabel: {
                color: 'black',
                fontSize: 20,
                textAlign: 'center',
            },
            collectionContainer: {
                borderRadius: CONFIG.style.borderRadius,
                width: CONFIG.style.containerWidth,
            },
        };

    return (
        <div>
            <h1 style={style.collectionLabel}>
                {props.entities[0].collectionLabel}
            </h1>
            <section
                className={'collection-container container'}
                style={style.collectionContainer}
            >
                {props.entities.map((entity, i) => {
                    return <Entity entity={entity} key={i}></Entity>;
                })}
            </section>
        </div>
    );
}
