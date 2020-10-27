import * as d3 from 'd3';
import L from 'leaflet';
import _ from 'underscore';

const GEO_JSON_LATITUDE = 1;
const GEO_JSON_LONGITUDE = 0;

const TOP_LEFT = 0;
const BOTTOM_RIGHT = 1;

const X = 0;
const Y = 1;

/**
 * Use the function to connect points on a leaflet map
 * @example
 * let linePath = g
 *                .selectAll(".locationsLine")
 *                .data([geoJSON.features])
 *                .enter()
 *                .append("path")
 *                .attr("class", "locationsLine")
 *
 *
 * linePath.attr("d", projectLine(leafletMap));
 *
 * @param {object} map Leaflet Map @see {}
 */
export function projectLine(map) {
    return d3
        .line()
        .x(function (d) {
            return getLayerPoint(d, map).x;
        })
        .y(function (d) {
            return getLayerPoint(d, map).y;
        })
        .curve(d3.curveLinear);
}

/**
 * inputs a GeoJSON data and returns the projected leaflet svg point
 * coordinates
 *
 * @param {object} d GeoJSON Point @see {@link https://en.wikipedia.org/wiki/GeoJSON|GeoJSON}
 * @returns {object} Leaflet Point @see {@link https://leafletjs.com/reference-1.7.1.html#point|Leaflet_Point}
 */
export function getLayerPoint(d, map) {
    var x = d.geometry.coordinates[GEO_JSON_LATITUDE];
    var y = d.geometry.coordinates[GEO_JSON_LONGITUDE];
    return map.latLngToLayerPoint(new L.LatLng(x, y));
}

export function leafletTransform(transform) {
    return d3.geoPath().projection(d3.geoTransform({ point: transform }));
}

/**
 * Fit svg to canvas to contain all the points
 *
 * @param {object} svg the svg d3 canvas to fit in Leaflet map
 * @param {*} bounds bounds of all the GeoJSON points
 */
export function fitSvg(svg, bounds) {
    const widthHeightOffset = 120;
    svg.attr(
        'width',
        bounds[BOTTOM_RIGHT][X] - bounds[TOP_LEFT][X] + widthHeightOffset
    )
        .attr(
            'height',
            bounds[BOTTOM_RIGHT][Y] - bounds[TOP_LEFT][Y] + widthHeightOffset
        )
        .style('left', bounds[TOP_LEFT][X] - 50 + 'px')
        .style('top', bounds[TOP_LEFT][Y] - 50 + 'px');
}

/**
 * Check if p1 is p2 or in the square
 * with midpoint x1 and y1 and side length
 * tolerance
 *
 * @param {number[]} p1 point1 [x1, y1]
 * @param {number[]} p2 point2 [x2, y2]
 * @param {number} tolerance extends point 2 to a square of tolerance * p2, tolerance * p2
 */
export function passOver(p1, p2, tolerance = 0) {
    const x_range = _.range(
        parseInt(p2[X]) - tolerance,
        parseInt(p2[X]) + tolerance
    );
    const y_range = _.range(
        parseInt(p2[Y]) - tolerance,
        parseInt(p2[Y]) + tolerance
    );
    if (
        x_range.includes(parseInt(p1[X])) &&
        y_range.includes(parseInt(p1[Y]))
    ) {
        return true;
    } else {
        return false;
    }
}

var sqrt3 = Math.sqrt(3);

// arrow =
// export arrow {
//   draw: function(context, size) {
//     var y = -Math.sqrt(size / (sqrt3 * 3));
//     context.moveTo(0, y * 2);
//     context.lineTo(-sqrt3 * y, -y);
//     context.lineTo(sqrt3 * y, -y);
//     context.closePath();
//   }
// };
