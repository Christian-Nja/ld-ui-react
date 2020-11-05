import { getURILabel } from '../../utilities/uri';

export default class Node {
    constructor(id, label, data, shape, type, style) {
        this.id = id;
        this.label = label || getURILabel(id);
        this.data = data || id;
        this.shape = shape || 'CircleNode';
        this.type = type;
        this.style = style || { nodeSize: 25 };
    }
    toJson() {
        return {
            id: this.id,
            label: this.label,
            data: this.data,
            shape: this.shape,
            type: this.type,
            style: this.style,
        };
    }
}
