var engine;
// main entry point of the app
window.onload = function () {
    engine = new TSE.Engine();
    engine.start();
};
window.onresize = function () {
    engine.resize();
};
var TSE;
(function (TSE) {
    /**
     * game engine class
     */
    var Engine = /** @class */ (function () {
        function Engine() {
            console.log("Hello World");
        }
        // private _count: number = 0
        Engine.prototype.start = function () {
            this._canvas = TSE.GLUtilities.initialise();
            // colour (red)
            TSE.gl.clearColor(1, 0, 0, 1);
            this.loadShaders();
            this._shader.use();
            this.createBuffer();
            this.resize();
            this.loop();
        };
        /**
         * @description: resizes the canvas to fit the window
         * @param {*}
         * @return {*}
         */
        Engine.prototype.resize = function () {
            if (this._canvas) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;
            }
        };
        /**
         * main loop
         */
        Engine.prototype.loop = function () {
            TSE.gl.clear(TSE.gl.COLOR_BUFFER_BIT);
            TSE.gl.bindBuffer(TSE.gl.ARRAY_BUFFER, this._buffer);
            TSE.gl.vertexAttribPointer(0, 3, TSE.gl.FLOAT, false, 0, 0);
            TSE.gl.enableVertexAttribArray(0);
            TSE.gl.drawArrays(TSE.gl.TRIANGLES, 0, 3);
            TSE.gl.drawArrays(TSE.gl.TRIANGLES, 0, 3);
            requestAnimationFrame(this.loop.bind(this));
        };
        // shader thingy
        Engine.prototype.loadShaders = function () {
            // glml
            var vertexShaderSource = "\n                attribute vec3 a_position;\n                void main() {\n                    gl_Position = vec4(a_position, 1.0);\n                }\n            ";
            /* what is precision mediump float? => https://stackoverflow.com/questions/13780609/what-does-precision-mediump-float-mean
             * This determines how much precision the GPU uses when calculating floats. levels (some devices does not support highp):
             * - `highp` for vertex positions,
             * - `mediump` for texture coordinates,
             * - `lowp` for colors.
            */
            var fragmentShaderSource = "\n                precision mediump float;\n\n                void main() {\n                    layout(location = 0) out vec4 diffuseColor;\n                }\n            ";
            this._shader = new TSE.Shader("basic", vertexShaderSource, fragmentShaderSource);
        };
        // buffer is a container of data which will be pushed to te graphics card, for vertex shader
        Engine.prototype.createBuffer = function () {
            this._buffer = TSE.gl.createBuffer();
            var vertices = [
                // x
                0, 0, 0,
                // y
                0, 0.5, 0,
                // z
                0.5, 0.5, 0
            ];
            TSE.gl.bindBuffer(TSE.gl.ARRAY_BUFFER, this._buffer);
            TSE.gl.vertexAttribPointer(0, 3, TSE.gl.FLOAT, false, 0, 0);
            TSE.gl.enableVertexAttribArray(0);
            // float32array was devised especially for webgl.
            // an object that takes in a bunch of numbers and converts them to 32 - bits float numbers.
            TSE.gl.bufferData(TSE.gl.ARRAY_BUFFER, new Float32Array(vertices), TSE.gl.STATIC_DRAW);
            TSE.gl.bindBuffer(TSE.gl.ARRAY_BUFFER, undefined);
            TSE.gl.disableVertexAttribArray(0);
        };
        return Engine;
    }());
    TSE.Engine = Engine;
})(TSE || (TSE = {}));
var TSE;
(function (TSE) {
    var GLUtilities = /** @class */ (function () {
        function GLUtilities() {
        }
        /**
         * @description: initialising a webgl. if a canvas is already defined, this function will find it; if the other way around, create it.
         * @param {String} elementId
         * @return {*}
         */
        GLUtilities.initialise = function (elementID) {
            var canvas;
            if (elementID !== undefined) {
                canvas = document.getElementById(elementID);
                if (canvas === undefined) {
                    throw new Error('cannot find a canvas element named:' + elementID);
                }
            }
            else {
                canvas = document.createElement('canvas');
                document.body.appendChild(canvas);
            }
            // check browser support
            TSE.gl = canvas.getContext('webgl');
            if (TSE.gl === undefined || TSE.gl === null) {
                // gl = canvas.getContext('experimental-webgl') // experimental-webgl is deprecated since 2019. use webgl2 or webgl instead.
                TSE.gl = canvas.getContext('webgl2');
                if (TSE.gl === undefined || TSE.gl === null) {
                    throw new Error('unable to initialise WebGL');
                }
            }
            return canvas;
        };
        return GLUtilities;
    }());
    TSE.GLUtilities = GLUtilities;
})(TSE || (TSE = {}));
var TSE;
(function (TSE) {
    var Shader = /** @class */ (function () {
        /**
         * @description: creates a shader
         * @classdesc: A shader is a program that is responsible for rendering graphical primitives on a device's
         * graphics processor. The shader is generated from a shader definition. This shader definition specifies
         * the code for processing vertices and fragments processed by the GPU. The language of the code is GLSL
         * (or more specifically ESSL, the OpenGL ES Shading Language). The shader definition also describes how
         * the PlayCanvas engine should map vertex buffer elements onto the attributes specified in the vertex
         * shader code.(https://github.com/playcanvas/engine/blob/137f6cb19fdb01caf2f936029bd76ae2fe0ce2a9/src/graphics/shader.js#L4)
         * @param {string} vertexSource source of vertex shader
         * @param {string} fragmentSource source of fragment shader
         * @return {*}
        */
        function Shader(name, vertexSource, fragmentSource) {
            // there appears to be a problem with this... one that i am not capable of fixing.
            this._name = name;
            var vertexShader = this.loadShader(vertexSource, TSE.gl.VERTEX_SHADER);
            var fragmentShader = this.loadShader(fragmentSource, TSE.gl.FRAGMENT_SHADER);
            this._program == this.createProgram;
        }
        Object.defineProperty(Shader.prototype, "name", {
            get: function () {
                return this.name;
            },
            enumerable: false,
            configurable: true
        });
        Shader.prototype.use = function () {
            TSE.gl.useProgram(this._program);
        };
        /**
         * Creates and compiles a shader.
         *
         * @param {!WebGLRenderingContext} gl The WebGL Context.
         * @param {string} shaderSource The GLSL source code for the shader.
         * @param {number} shaderType The type of shader, VERTEX_SHADER or
         *     FRAGMENT_SHADER.
         * @return {!WebGLShader} The shader.
         */
        Shader.prototype.compileShader = function (gl, shaderSource, shaderType) {
            // Create the shader object
            var shader = gl.createShader(shaderType);
            // Set the shader source code.
            gl.shaderSource(shader, shaderSource);
            // Compile the shader
            gl.compileShader(shader);
            // Check if it compiled
            var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (!success) {
                // Something went wrong during compilation; get the error
                throw ("could not compile shader:" + gl.getShaderInfoLog(shader));
            }
            return shader;
        };
        // private loadShader(gl: WebGLRenderingContext, shaderType: number, shaderSource: string): WebGLShader {
        Shader.prototype.loadShader = function (shaderType, shaderSource) {
            var shader = TSE.gl.createShader(shaderType);
            TSE.gl.shaderSource(shader, shaderSource);
            TSE.gl.compileShader(shader);
            var error = TSE.gl.getShaderInfoLog(shader);
            /* (error !== undefined) {
                throw new Error('cannot compile shader:' + error)
            } */
            if (!TSE.gl.getShaderParameter(shader, TSE.gl.COMPILE_STATUS)) {
                throw new Error("error linking shader '" + this._name + "': " + error);
            }
            return shader;
        };
        Shader.prototype.createProgram = function (vertexShader, fragmentShader) {
            this._program = TSE.gl.createProgram();
            TSE.gl.attachShader(this._program, vertexShader);
            TSE.gl.attachShader(this._program, fragmentShader);
            TSE.gl.linkProgram(this._program);
            var error = TSE.gl.getShaderInfoLog(this._program);
            if (error !== '') {
                throw new Error('cannot compile shader:' + error);
            }
        };
        return Shader;
    }());
    TSE.Shader = Shader;
})(TSE || (TSE = {}));
//# sourceMappingURL=main.js.map