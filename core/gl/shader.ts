namespace TSE {
    export class Shader {
        private _name: string
        private _program: WebGLProgram
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
        public constructor(name: string, vertexSource: string, fragmentSource: string) {
            // there appears to be a problem with this... one that i am not capable of fixing.
            this._name = name
            let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER)
            let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER)

            this._program == this.createProgram
        }

        public get name(): string {
            return this.name
        }

        // private loadShader(gl: WebGLRenderingContext, shaderType: number, shaderSource: string): WebGLShader {
        private loadShader(shaderType: number, shaderSource: string): WebGLShader {
            let shader: WebGLShader = gl.createShader(shaderType)
            gl.shaderSource(shader, shaderSource)
            gl.compileShader(shader)
            let error = gl.getShaderInfoLog(shader)
            /* (error !== undefined) {
                throw new Error('cannot compile shader:' + error)
            } */
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw new Error("error linking shader '" + this._name + "': " + error);
            }

            return shader
        }

        private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
            this._program = gl.createProgram()

            gl.attachShader(this._program, vertexShader)
            gl.attachShader(this._program, fragmentShader)
            gl.linkProgram(this._program)
            let error = gl.getShaderInfoLog(this._program)
            if (error !== undefined) {
                    throw new Error('cannot compile shader:' + error)
            }
        }
    }
}