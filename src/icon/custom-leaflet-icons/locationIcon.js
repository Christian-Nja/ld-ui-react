import leafletIcon from '../functions/leafletIcon';
import LeafletIconParams from '../classes/LeafletIconParams';

import svg from '../uri-encoded-icons/red-marker.svg.uri.js';

const locationIconParams = new LeafletIconParams({
    iconUrl: svg,
    className: 'ld-ui-div-icon',
    iconAnchor: [15, 50],
});

/**
 * Marker icon
 */
const locationIcon = leafletIcon(locationIconParams);

export default locationIcon;
