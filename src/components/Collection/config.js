import React from 'react';

import {
    StarIcon,
    SpiralOrangeIcon,
    BlackDotIcon,
    EmptyDotIcon,
} from '../../icon/ld-ui-icon';

const DEFAULT_CONFIG = 'config1';

const themes = {
    config1: {
        itemIcon: BlackDotIcon,
        style: {
            collectionLabel: {
                color: 'black',
                fontSize: 20,
                textAlign: 'center',
            },
            collectionContainer: {
                borderRadius: '9px/8px',
                width: '50%',
                border: '1px solid rgba(0,0,0,0.15)',
                gridGap: 10,
            },
            entityImage: {
                width: 60,
                height: 60,
            },
            entityLabel: {
                color: 'black',
            },
            entityContent: {
                color: 'black',
            },
        },
    },
    config2: {
        itemIcon: BlackDotIcon,
        style: {
            collectionLabel: {
                color: 'black',
                fontSize: 20,
                textAlign: 'center',
            },
            collectionContainer: {
                borderRadius: '9px/8px',
                width: '60%',
                border: '1px solid rgba(0,0,0,0.15)',
                gridGap: '55px',
                padding: '50px',
            },
            entityImage: {
                width: 120,
                height: 120,
            },
            entityLabel: {
                color: 'black',
            },
            entityContent: {
                color: 'black',
            },
        },
    },
};

const ThemeContext = React.createContext(themes[DEFAULT_CONFIG]);

export default ThemeContext;
export { themes, DEFAULT_CONFIG };
