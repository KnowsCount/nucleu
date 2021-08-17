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
//# sourceMappingURL=gl.js.map