'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = void 0;

var _ldUiIcon = require('../../icon/ld-ui-icon');

var CONFIG = {
    DEPICTION: false,
    MARKER_ICON: [_ldUiIcon.blueMarkerIcon, _ldUiIcon.blueClusterMarkerIcon],
    ARROW: {
        COLOR: 'blue',
        HEAD_COLOR: 'blue',
        FILL_COLOR: 'blue',
        SIZE: '20px',
        ARROWHEAD_SIZE: 50
    },
    POPUP: {
        OPEN: 'mouseover',
        CLOSE: 'mouseout',
        OPEN_CLUSTER: 'clustermouseover'
    },
    MAP: [{
        PROVIDER: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
        ATTRIBUTION: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }, {
        PROVIDER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }],
    TRANSITION_DURATION: 10000
};
var _default = CONFIG;
exports['default'] = _default;