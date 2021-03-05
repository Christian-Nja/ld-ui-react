import {
    blueMarkerIcon,
    blueClusterMarkerIcon,
    redSquatMarkerIcon,
    redSquatClusterMarkerIcon,
} from "../../icon/ld-ui-icon";

const DARK_PROVIDER = 0;
const DAY_PROVIDER = 1;

const CONFIG = {
    MARKER_ICON: [blueMarkerIcon, blueClusterMarkerIcon],
    ARROW: {
        COLOR: "blue",
        HEAD_COLOR: "blue",
        FILL_COLOR: "blue",
        SIZE: "20px",
        ARROWHEAD_SIZE: 100,
    },
    POPUP: {
        OPEN: "mouseover",
        CLOSE: "mouseout",
        OPEN_CLUSTER: "clustermouseover",
    },
    MAP: [
        {
            PROVIDER:
                "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
            ATTRIBUTION:
                '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        },
        {
            PROVIDER: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            ATTRIBUTION:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
    ],
    TRANSITION_DURATION: 2000,
    DEFAULT_PROVIDER: DAY_PROVIDER,
};

export default CONFIG;
