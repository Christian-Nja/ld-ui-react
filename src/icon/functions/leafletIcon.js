import L from 'leaflet';

import LeafletIconParams from '../classes/LeafletIconParams'

/**
 * Returns an icon to be used in Leaflet maps
 * 
 * @param {Object} params icon params {@link LeafletIconParams} 
 */
export default function leafletIcon(params) { 
    return new L.Icon(new LeafletIconParams(params))
}