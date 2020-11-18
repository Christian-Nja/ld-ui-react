<p align="center"><img src="./docs/ld-ui-react-logo.png" /></p>
<br/>
<h2 align="center">LD-UI-React</h2>
<p align="center">A framework for Linked Data visualization</p>

<p><strong><a href="" >Reusable components to visualize linked data, learn more on website</a></srong></p>

## Description

React components for structured data visualization. Project Data on maps or visualize graph like structures.

## Demo

Add some demo

## Technologies Used

Best technologies are used to render Linked Data. Leaflet, G6, React.

## Highly Connected Data

First framework to provide special visualization for highly structured data and subgraph.

## Technical Description

### Installation

To install it just to:

`npm install ld-ui-react`

### Setup

### How To Contribute

### Status

<p style="color:red">Project is still in development some components may not work as expected</p>

## MAP providers

Every component projecting data on a map is based on Leaflet technology.
You can find interesting map on TileLayer's on: [leaflet-provider.js](http://leaflet-extras.github.io/leaflet-providers/preview/index.html) to customize your visualizations.

## URI encoded icon

You can download svg icons, uri encode and embed them directly in the html file.
This is a good solution avoiding to struggle with webpack building configuration for
applications using this package.

Some day you may host icons in a separate online server and switch the iconUrl to the online one.

To encode icons you need to:

`$ npm run encode-svg`
