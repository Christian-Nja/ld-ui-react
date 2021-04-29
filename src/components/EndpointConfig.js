const { PathFactory } = require("ldflex");
const { default: ComunicaEngine } = require("@ldflex/comunica");

// The JSON-LD context for resolving properties
const context = {
    "@context": {
        "@vocab": "http://xmlns.com/foaf/0.1/",
        friends: "knows",
        label: "http://www.w3.org/2000/01/rdf-schema#label",
        depiction: "depiction",
    },
};

// The query engine and its source
const queryEngine = new ComunicaEngine({
    type: "sparql",
    value: "https://arco.istc.cnr.it/visualPatterns/sparql", //<== TODO : get this dynamically
});

// The object that can create new paths
const path = new PathFactory({ context, queryEngine });

export default path;
