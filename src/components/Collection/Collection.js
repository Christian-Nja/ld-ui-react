import React, { useContext } from 'react';

/**
 * css
 */
import './Collection.css';

/**
 * internal modules
 */
import Entity from './Entity';
import ThemeContext, { themes, DEFAULT_CONFIG } from './config';

export default function Collection(props) {
    const THEME = useContext(ThemeContext);

    return (
        <ThemeContext.Provider value={themes[DEFAULT_CONFIG]}>
            <div>
                {/* <h1
                    style={THEME.style.collectionLabel}
                    className={props.class.collectionLabel}
                >
                    {props.entities[0].collectionLabel}
                </h1> */}
                <section
                    className={`collection-container container ${props.class.collectionContainer}`}
                    style={THEME.style.collectionContainer}
                >
                    {props.entities.map((entity, i) => {
                        return (
                            <Entity
                                entity={entity}
                                key={i}
                                class={props.class}
                            ></Entity>
                        );
                    })}
                </section>
            </div>
        </ThemeContext.Provider>
    );
}

Collection.defaultProps = {
    class: {
        collectionLabel: '',
        collectionContainer: '',
        entityImage: '',
        entityLabel: '',
        entityContent: '',
    },
};
