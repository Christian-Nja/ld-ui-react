import React, { useContext } from "react";
import PropTypes from "prop-types";

import "./Collection.css";

import Entity from "./Entity";
import ThemeContext, { themes, DEFAULT_CONFIG } from "./config";

/**
 * @typedef Member
 * @property {string} uri the uri of the resource
 * @property {string} label label of the resource
 */

/**
 * @description A component to render a collection of elements
 * @author Christian Colonna
 * @date 04-12-2020
 * @export
 * @param {Member[]} {members}
 * @returns {JSX.Element}
 */
export default function Collection({ members, classes }) {
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
                    className={`collection-container container ${classes.collectionContainer}`}
                    style={THEME.style.collectionContainer}
                >
                    {members.map((entity, i) => {
                        return (
                            <Entity
                                entity={entity}
                                key={i}
                                class={classes}
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
    classes: PropTypes.object.isRequired,
};

Collection.defaultProps = {
    classes: {
        collectionLabel: "",
        collectionContainer: "",
        entityImage: "",
        entityLabel: "",
        entityContent: "",
    },
};
