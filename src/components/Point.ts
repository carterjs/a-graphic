import { Component } from "../Component";
import { property } from "../property";

/**
 * A vector point
 */
export class Point extends Component {
    /**
     * X value
     */
    @property(0)
    x?: number;

    /**
     * Y value
     */
    @property(0)
    y?: number;

    static get observedAttributes() {
        return [
            "x",
            "y"
        ];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        switch(name) {
            case "x":
            case "y":
                this[name] = Number(newValue);
                break;
        }
    }
}

customElements.define("a-point", Point);
