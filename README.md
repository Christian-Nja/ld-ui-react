# MAP providers

You can find interesting map on TileLayer 's on: [leaflet-provider.js](http://leaflet-extras.github.io/leaflet-providers/preview/index.html)

# URI encoded icon

You can download svg icons, uri encode and embed them directly in the html file.
This is a good solution avoiding to struggle with webpack building configuration for
applications using this package.

Some day you may host icons in a separate online server and switch the iconUrl to the online one.

To encode icons you need to:

`$ npm run encode-svg`
