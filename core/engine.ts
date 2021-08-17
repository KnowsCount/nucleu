namespace TSE {
    /**
     * game engine class
     */
    export class Engine {
        private _canvas: HTMLCanvasElement
        private _shader: Shader

        public constructor() {
            console.log("Hello World");
        }

        // private _count: number = 0

        public start(): void {
            this._canvas = GLUtilities.initialise()
            // colour (red)
            gl.clearColor(1,0,0,1)
            // game looping
            this.loop();
        }

        /**
         * @description: resizes the canvas to fit the window
         * @param {*}
         * @return {*}
         */
        public resize(): void {
            if (this._canvas) {
                this._canvas.width = window.innerWidth
                this._canvas.height = window.innerHeight
            }
        }

        /**
         * main loop
         */
        private loop(): void {
            gl.clear(gl.COLOR_BUFFER_BIT)
            requestAnimationFrame(this.loop.bind(this))
        }

        // shader thingy
        private loadShaders(): void {
            // glml
            let vertexShaderSource = `
                attribute vec3 a_position;
                void main() {
                    gl_Position = vec4(a_position, 1.0);
                }
            `
            /* what is precision mediump float? => https://stackoverflow.com/questions/13780609/what-does-precision-mediump-float-mean
             * This determines how much precision the GPU uses when calculating floats. levels:
             * - `highp` for vertex positions,
             * - `mediump` for texture coordinates,
             * - `lowp` for colors.
            */
            let fragmentShaderSource = `
                precision mediump float;

                void main() {
                    layout(location = 0) out vec4 diffuseColor;
                }
            `
            this._shader = new Shader("basic", vertexShaderSource, fragmentShaderSource)
        }
    }
}