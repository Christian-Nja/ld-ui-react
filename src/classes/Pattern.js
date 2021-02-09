import Resource from "./Resource";

export default class Pattern extends Resource {
    constructor(uri, label, description, members) {
        super(uri, label, description);
        this.members = members;
    }
    static create({ uri, label, description, members }) {
        return new Resource(uri, label, description, members);
    }
    getMembers() {
        return this.members;
    }
}
