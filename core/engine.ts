namespace TSE {
    /**
     * game engine class
     */
    export class Engine {
        private _canvas: HTMLCanvasElement
        private _shader: Shader 
        private _buffer: WebGLBuffer

        public constructor() {
            console.log("Hello World");
        }

        // private _count: number = 0

        public start(): void {
            this._canvas = GLUtilities.initialise()
            // colour (red)
            gl.clearColor(1, 0, 0, 1)

            this.loadShaders();
            this._shader.use();

            this.createBuffer();

            this.resize();
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

            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer)
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0)
            gl.enableVertexAttribArray(0)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
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
             * This determines how much precision the GPU uses when calculating floats. levels (some devices does not support highp):
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

        // buffer is a container of data which will be pushed to te graphics card, for vertex shader
        private createBuffer(): void {
            this._buffer = gl.createBuffer();

            let vertices = [
                // x
                0, 0, 0,
                // y
                0, 0.5, 0,
                // z
                0.5, 0.5, 0
            ];
            gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer)
            gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0)
            gl.enableVertexAttribArray(0)
            // float32array was devised especially for webgl.
            // an object that takes in a bunch of numbers and converts them to 32 - bits float numbers.
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
            gl.bindBuffer(gl.ARRAY_BUFFER, undefined)
            gl.disableVertexAttribArray(0)
        }
    }
}