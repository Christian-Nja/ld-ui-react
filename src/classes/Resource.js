export default class Resource {
    constructor(uri, label, description) {
        this.uri = uri;
        this.label = label;
        this.description = description;
    }
    create({ uri, label, description }) {
        return new Resource(uri, label, description);
    }

    getUri() {
        return this.uri;
    }
    getLabel() {
        return this.label;
    }
    getDescription() {
        return this.description;
    }
}
