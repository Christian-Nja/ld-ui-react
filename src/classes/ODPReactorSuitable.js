// this class is more an interface
// here all the methods to make a linked data resource

import { map, filter } from "lodash";

// working with ODPReactor
export default class ODPReactorSuitable {
    constructor() {}
    onGraphinResourceNodeDoubleClick() {
        if (this.graphinProperties)
            return this.graphinProperties.graphinResourceNodeDoubleClick;
    }
    onGraphinPatternNodeDoubleClick() {
        if (this.graphinProperties) {
            return this.graphinProperties.graphinPatternNodeDoubleClick;
        }
    }
    getGraphinStyle(key) {
        if (this.graphinProperties) {
            if (key) {
                if (this.graphinProperties.style) {
                    return this.graphinProperties.style;
                }
            }
            return this.graphinProperties.style;
        }
    }
    getGraphinShape() {
        if (this.graphinProperties) {
            return this.graphinProperties.shape;
        }
    }
    // @deprecated
    getGraphinOnNodeOverTooltip() {
        if (this.graphinProperties) {
            return this.graphinProperties.onNodeOverTooltip;
        }
    }
    onListItemClick() {
        if (this.listProperties) return this.listProperties.listItemClick;
    }
    getListKeys() {
        if (this.listProperties)
            return map(this.listProperties.listKeys, (keysObject) => {
                return keysObject.id;
            });
    }
    getHeaderLabels(keyIds) {
        if (this.listProperties) {
            return map(keyIds, (keyId) => {
                const keyObjectWithIdK = filter(
                    this.listProperties.listKeys,
                    (keyObject) => {
                        return keyObject.id === keyId;
                    }
                )[0];
                return keyObjectWithIdK.label;
            });
        }
    }
    getListTitle() {
        if (this.listProperties) {
            return this.listProperties.listTitle;
        }
    }
}
