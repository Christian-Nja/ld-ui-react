import React from "react";

import {
    StarIcon,
    SpiralOrangeIcon,
    BlackDotIcon,
    EmptyDotIcon,
} from "../../icon/ld-ui-icon";

const DEFAULT_CONFIG = "config2";

const themes = {
    config1: {
        itemIcon: BlackDotIcon,
        style: {
            collectionLabel: {
                color: "black",
                fontSize: 20,
                textAlign: "center",
            },
            collectionContainer: {
                borderRadius: "9px/8px",
                width: "40%",
                border: "1px solid rgba(0,0,0,0.15)",
                gridGap: 10,
            },
            entityImage: {
                width: 60,
                height: 60,
            },
            entityLabel: {
                color: "black",
            },
            entityContent: {
                color: "black",
            },
        },
    },
    config2: {
        itemIcon: EmptyDotIcon,
        style: {
            collectionLabel: {
                color: "black",
                fontSize: 20,
                textAlign: "center",
            },
            collectionContainer: {
                borderRadius: "9px/8px",
                width: "60%",
                border: "1px solid rgba(0,0,0,0.15)",
                gridGap: "55px",
                padding: "50px",
            },
            entityImage: {
                width: 60,
                height: 60,
            },
            entityLabel: {
                color: "black",
            },
            entityContent: {
                color: "black",
            },
        },
    },
};

const ThemeContext = React.createContext(themes[DEFAULT_CONFIG]);

export default ThemeContext;
export { themes, DEFAULT_CONFIG };
