import React, { useContext } from "react";
import PropTypes from "prop-types";

import "./Collection.css";

import Entity from "./Entity";
import ThemeContext, { themes, DEFAULT_CONFIG } from "./config";

/**
 * A component to show a collection of items
 *
 * @component
 * @example
 * const collections = []
 * return <Collection collections={collections}>
 */
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

Collection.propTypes = {
    // List of class to custom style the component
    class: PropTypes.string.isRequired,
};

Collection.defaultProps = {
    class: {
        collectionLabel: "",
        collectionContainer: "",
        entityImage: "",
        entityLabel: "",
        entityContent: "",
    },
};

// * description A component to show a collection of objects
// * author Christian Colonna
// * date 09-11-2020
// * export
