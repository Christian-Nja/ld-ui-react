import RequiredParamChecker from './RequiredParamChecker';
import { getURILabel } from '../../utilities/uri';

/**
 * @description A basic Node class
 * @author Christian Colonna
 * @date 06-11-2020
 * @export
 * @class Node
 */
export default class Node {
    /**
     * Creates an instance of Node.
     * @author Christian Colonna
     * @date 06-11-2020
     * @param {Object} node
     * @param {String} node.id
     * @param {String} [node.label]
     * @param {Object} [node.data]
     * @param {String} [node.shape]
     * @param {String} [node.type]
     * @param {Object} [node.style]
     * @memberof Node
     */
    constructor(node) {
        new RequiredParamChecker([node.id]);
        this.id = node.id;
        this.label = node.label || getURILabel(node.id);
        this.data = node.data || node.id;
        this.shape = node.shape || 'CircleNode';
        this.type = node.type || 'company';
        this.style = node.style || { nodeSize: 25 };
    }

    /**
     * @description Returns the class as JSON
     * @author Christian Colonna
     * @date 06-11-2020
     * @returns {Object}
     * @memberof Node
     */
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
