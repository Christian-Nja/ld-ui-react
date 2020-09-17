# ToDoS

-   (1) animate path
-   (2) query URI in a configuration file

-   (3) mockup and thinking of new visualization

-   edges, arcs | for a full control you need an algorithm
    to convert geodesic coordinates to cartesian one, calculate
    quadratic bezier control point, and revert that to geodisc coordinates
    alternatives: https://github.com/MAD-GooZe/Leaflet.Arc
    an issue: https://github.com/mad-gooze/Leaflet.Arc/issues/9
    not working well with short distance

-   spiderfying issues: https://github.com/Leaflet/Leaflet.markercluster/issues/744
    https://github.com/Leaflet/Leaflet.markercluster/issues/101
    maybe specifying maxZoom (on map?)

#Interesting libraries:

maps: deck.gl + webgl + mapboxgl
mapping: react-map-gl, deck.gl, luna.gl
charts: react-vis

https://turfjs.org/
#d3 animated path
http://zevross.com/blog/2014/09/30/use-the-amazing-d3-library-to-animate-a-path-on-a-leaflet-map/

// you can change map provider the tilelayer
// geojson.io

// var myCircle = L.circle(...).addTo(myMap).openPopup()

// map.fitBounds(myCircle.getBounds())

// events

// markers.forEach().on('mouseover', function(e) {
// e.target.setIcon(redIcon)
//})

// browser events

// map events! example: movend -> the map stop moving (print center)

// \$(document).on('click', '#button', function() {
// if (map.hasLayer(featureGroup)) {
// map.removeLayer(featureGroup)
// } else {
// featureGroup.addTo(map)
// }
// })

// a way to remove all the markers in a map featureGroup
