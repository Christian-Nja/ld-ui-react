import Resource from "../classes/Resource";

import MeasurementConverter from "./MeasurementConverter";

export default class Measurement extends Resource {
    constructor(uri, label, description, value, unit) {
        super(uri, label, description);
        this.value = value;
        this.unit = unit;
    }

    static create({ uri, label, value, description, unit }) {
        return new Measurement(uri, label, description, value, unit);
    }

    convert(newUnit) {
        const mConverter = new MeasurementConverter();
        return mConverter.convert(this, newUnit);
    }

    getValue() {
        return this.value;
    }

    getUnit() {
        return this.unit;
    }
}
