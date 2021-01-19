import chroma from "chroma-js";

export default class ColorGenerator {
    constructor(options = {}) {
        this.gradient = options.gradient || [
            "#fff000",
            "#ff8300",
            "#ff0000",
            "green",
            // "#9cb400",
            "#0000c4",
        ];
        this.mode = options.mode || "lrgb";
        this.colorCount = options.colorCount;
    }

    *getColor() {
        let colors = chroma
            .scale(this.gradient)
            .mode(this.mode)
            .colors(this.colorCount);
        console.log("Chroma colors");
        console.log(colors);
        for (let color of colors) {
            yield color;
        }
    }
}
