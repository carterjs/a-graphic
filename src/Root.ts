import { Component } from "./Component";

/**
 * A custom element for vector graphics
 */
export class Root extends Component {
    /**
     * The canvas.
     * Stored to prevent unnecessary resizing
     */
    protected canvas: HTMLCanvasElement;

    /**
     * The context.
     * Saved for simplicity
     */
    protected context: CanvasRenderingContext2D;

    /**
     * The width of the virtual space
     */
    get width(): number {
        return this.inherit("width", 100, Root);
    }
    set width(width) {
        this._width = width;
        this.size();
    }
    _width?: number;

    /**
     * The height of the virtual space
     */
    get height() {
        return this.inherit("height", 100, Root);
    }
    set height(height) {
        this._height = height;
        this.size();
    }
    _height?: number;

    /**
     * The actual width of the canvas
     */
    get realWidth() {
        return this.inherit("realWidth", 100, Root);
    }
    set realWidth(realWidth) {
        this._realWidth = realWidth;
        this.size();
    }
    _realWidth?: number;

    /**
     * The height of the virtual space
     */
    get realHeight() {
        return this.inherit("realHeight", 100, Root);
    }
    set realHeight(realHeight) {
        this._realHeight = realHeight;
        this.size();
    }
    _realHeight?: number;

    /**
     * The rendering quality
     */
    get quality() {
        return this.inherit("quality", window.devicePixelRatio, Root);
    }
    set quality(quality) {
        this._quality = quality;
        this.size();
    }
    _quality?: number;

    static get observedAttributes(): string[] {
        return [
            ...super.observedAttributes,
            "space",
            "quality"
        ];
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        switch(name) {
            case "space":
                const nums = newValue.split(/[^0-9]+/);
                if(nums.length == 2) {
                    this.width = Number(nums[0]);
                    this.height = Number(nums[1]);
                } else if(nums.length == 1) {
                    this.width = this.height = Number(nums[0]);
                }
                break;
            case "quality":
                this.quality = Number(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
    }

    constructor() {
        super();
        
        // Canvas
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d")!;
    }

    connectedCallback() {
        this.update();
    }

    size() {
        const unitScale = Math.min(this.realWidth/this.width, this.realHeight/this.height);

        // Set resolution
        const width = Math.round(this.width * unitScale * this.quality);
        const height = Math.round(this.height * unitScale * this.quality);

        if(width != this.canvas.width || height != this.canvas.height) {
            this.canvas.width = width;
            this.canvas.height = height;
        } else {
            return;
        }

        // Set size
        this.canvas.style.width = Math.round(this.width * unitScale) + "px";
        this.canvas.style.height = Math.round(this.height * unitScale) + "px";

        // Final scaling
        const scale = this.quality * unitScale;
        this.context.scale(scale, scale);

        // Re-draw
        this.shouldRender = true;
    }

    update() {
        if(this.shouldRender) {
            this.render(this.context);
            this.shouldRender = false;
        }
        this.size();
        window.requestAnimationFrame(this.update.bind(this));
    }

    render(context: CanvasRenderingContext2D) {
        this.getChildren().forEach((component) => {
            component.render(context);
        });        
    }
}