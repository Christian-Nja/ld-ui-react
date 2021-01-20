import RequiredParamChecker from "./RequiredParamChecker";

/**
 * @description A simple Edge class to model relation Node -> Node
 * @author Christian Colonna
 * @date 06-11-2020
 * @export
 * @class Edge
 */
export default class Edge {
    /**
     * Creates an instance of Edge.
     * @author Christian Colonna
     * @date 06-11-2020
     * @param {Object} edge
     * @param {String} edge.source
     * @param {String} edge.target
     * @param {String} [edge.id]
     * @param {String} [edge.label]
     * @param {Edge} [edge.data]
     * @param {Object} [edge.style]
     * @memberof Edge
     */
    constructor(edge) {
        new RequiredParamChecker([
            { value: edge.source, label: "edge.source" },
            { value: edge.target, label: "edge.target" },
        ]);
        const edgeId = `${edge.source}->${edge.target}`;
        this.id = edge.id || edgeId;
        this.label = edge.label;
        this.data = edge.data || edge.id;
        this.source = edge.source;
        this.target = edge.target;
        this.style = edge.style;
        this.shape = "line";
        this.size = 5;
        this.labelCfg = edge.labelCfg || {
            style: {
                stroke: "white", // White stroke for the label
                lineWidth: 5, // The line width of the stroke
                fill: "#722ed1", // The color of the text
                fontSize: 20,
            },
        };
    }

    /**
     * @description returns this Edge as JSON
     * @author Christian Colonna
     * @date 06-11-2020
     * @returns {JSON}
     * @memberof Edge
     */
    toJson() {
        return {
            id: this.id,
            label: this.label,
            data: this.data,
            source: this.source,
            target: this.target,
            style: this.style,
            labelCfg: this.labelCfg,
            shape: this.shape,
            size: this.size,
        };
    }
}
