import React from "react";
import Entity from "./Entity";

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
export default function Collection({
    members,
    styles = {
        collectionContainerWidth: {
            width: "150%", // set this width to 120, 130, 140% to increase padding between items
        },
        collectionContainer: {
            border: "solid 1px black",
            margin: "auto",
            padding: 5,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gridGap: "10px",
            borderRadius: "9px/8px",
            border: "1px solid rgba(0,0,0,0.15)",
            gridGap: 10,
        },
        entity: {
            entityContainer: {
                textAlign: "center",
                paddingTop:
                    "100%" /* padding trick directly on the grid item */,
                boxSizing: "border-box",
                position: "relative",
            },
            entityLabel: {},
            entityContent: {
                color: "black",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexFlow: "column",
            },
            entityDepiction: {
                width: 60,
                height: 60,
                padding: 1,
                borderRadius: 9999,
                border: "solid 1px black",
            },
            entityLabel: {
                color: "black",
            },
        },
    },
    classes,
}) {
    return (
        <div>
            <section
                style={{
                    ...styles.collectionContainer,
                    ...styles.collectionContainerWidth,
                }}
            >
                {members.map((entity, i) => {
                    return (
                        <Entity
                            entity={entity}
                            key={i}
                            style={styles.entity}
                        ></Entity>
                    );
                })}
            </section>
        </div>
    );
}
