"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _require = require("ldflex"),
    PathFactory = _require.PathFactory;

var _require2 = require("@ldflex/comunica"),
    ComunicaEngine = _require2["default"]; // The JSON-LD context for resolving properties


var context = {
  "@context": {
    "@vocab": "http://xmlns.com/foaf/0.1/",
    friends: "knows",
    label: "http://www.w3.org/2000/01/rdf-schema#label",
    depiction: "depiction"
  }
}; // The query engine and its source

var queryEngine = new ComunicaEngine({
  type: "sparql",
  value: "https://dati.beniculturali.it/sparql" //<== TODO : get this dynamically

}); // The object that can create new paths

var path = new PathFactory({
  context: context,
  queryEngine: queryEngine
});
var _default = path;
exports["default"] = _default;