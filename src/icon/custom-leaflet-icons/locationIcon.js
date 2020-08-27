import leafletIcon from '../functions/leafletIcon';
import LeafletIconParams from '../classes/LeafletIconParams';

const locationIconParams = new LeafletIconParams({
    iconUrl: require('../images/red-marker.png'),
    iconRetinaUrl: require('../images/red-marker.png'),
    iconWidth: 60,
    iconHeight: 75,
    className: 'ld-ui-div-icon',
});

/**
 * Marker icon
 */
const locationIcon = leafletIcon(locationIconParams);

export default locationIcon;
