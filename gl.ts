namespace TSE {
    // WebGL rendering context
    export var gl: WebGLRenderingContext
    export class GLUtilities {
        /**
         * @description: initialising a webgl. if a canvas is already defined, this function will find it; if the other way around, create it.
         * @param {String} elementId
         * @return {*}
         */
        public static initialise(elementID?: string): HTMLCanvasElement {
            let canvas: HTMLCanvasElement

            if (elementID !== undefined) {
                canvas = document.getElementById(elementID) as HTMLCanvasElement
                if (canvas === undefined) {
                    throw new Error('cannot find a canvas element named:' + elementID)
                }
            } else {
                canvas = document.createElement('canvas') as HTMLCanvasElement
                document.body.appendChild(canvas)
            }

            // check browser support
            gl = canvas.getContext('webgl')
            if (gl === undefined || gl === null) {
                // gl = canvas.getContext('experimental-webgl') // experimental-webgl is deprecated since 2019. use webgl2 or webgl instead.
                gl = canvas.getContext('webgl2')
                if (gl === undefined || gl === null) {
                    throw new Error('unable to initialise WebGL')
                }
            }
            return canvas
        }
    }
}