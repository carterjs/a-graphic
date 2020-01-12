import { AComponent } from "../AComponent";
import { svg } from "lit-html";

/**
 * A vector circle
 */
export class ACircle extends AComponent {

    x = 0;
    y = 0;
    radius = 0;

    static get observedAttributes() {
        return [
            ...super.observedAttributes,
            "x",
            "y",
            "radius"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch(name) {
            case "x":
            case "y":
            case "radius":
                this[name] = Number(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    renderSVG() {
        return svg`
            <circle 
                cx=${this.x}
                cy=${this.y}
                r=${this.radius}
                stroke=${this.stroke}
                stroke-width=${this.strokeWidth}
                fill=${this.fill}
            />
        `;
    }

    renderCanvas(context: CanvasRenderingContext2D) {
        console.log(this.fill);
        // Draw rectangle
        context.beginPath();
        context.arc(
            Number(this.x),
            Number(this.y),
            Number(this.radius),
            0,
            2*Math.PI
        );

        // Apply styles
        this.styleContext(context);
    }
}

customElements.define("a-circle", ACircle);
