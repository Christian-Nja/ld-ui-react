import L from 'leaflet';

/**
 * Params used to build a leaflet icon.
 * Constructor will override default params
 */
export default class LeafletIconParams {
    /**
     * @param {Object} params a JSON object with params as attributes.
     * Params keys:
     * @param {string} iconUrl the path to iconUrl
     * @param {string} iconRetinaUrl
     * @param {*} iconAnchor
     * @param {*} popupAnchor
     * @param {*} shadowUrl
     * @param {*} shadowSize
     * @param {*} shadowAnchor
     * @param {number} iconWidth the width of the icon
     * @param {number} iconHeight the heigth of the icon
     * @param {string} className css class
     */
    constructor(params) {
        this.iconUrl = params.iconUrl;
        this.iconRetinaUrl = params.iconRetinaUrl;
        this.iconAnchor = params.iconAnchor;
        this.popupAnchor = params.popupAnchor;
        this.shadowUrl = params.shadowUrl;
        this.shadowSize = params.shadowSize;
        this.shadowAnchor = params.shadowAnchor;
        this.iconSize = new L.Point(params.iconWidth, params.iconHeight);
        this.className = params.className;
    }
}

// iconUrl: require('@fortawesome/fontawesome-free/svgs/regular/sun.svg'),
// iconRetinaUrl: require('@fortawesome/fontawesome-free/svgs/regular/sun.svg'),
// iconAnchor: null,
// popupAnchor: null,
// shadowUrl: null,
// shadowSize: null,
// shadowAnchor: null,
// iconSize: new L.Point(60, 75),
// className: 'ld-ui-div-icon'
