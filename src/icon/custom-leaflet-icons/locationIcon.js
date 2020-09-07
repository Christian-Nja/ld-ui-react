import leafletIcon from '../functions/leafletIcon';
import LeafletIconParams from '../classes/LeafletIconParams';

import svg from '../uri-encoded-icons/red-marker.svg.uri.js';
console.log(svg);

const locationIconParams = new LeafletIconParams({
    iconUrl: svg,
    iconRetinaUrl: svg,
    iconWidth: 60,
    iconHeight: 75,
    className: 'ld-ui-div-icon',
});

/**
 * Marker icon
 */
const locationIcon = leafletIcon(locationIconParams);

export default locationIcon;
