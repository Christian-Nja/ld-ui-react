export default class Edge {
    constructor(id, label, data, source, target) {
        const edgeId = `${source}->${target}`;
        this.id = id || edgeId;
        this.label = label || edgeId;
        this.data = data || edgeId;
        this.source = source;
        this.target = target;
    }
    toJson() {
        return {
            id: this.id,
            label: this.label,
            data: this.data,
            source: this.source,
            target: this.target,
        };
    }
}
