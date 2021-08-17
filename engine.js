var TSE;
(function (TSE) {
    /**
     * game engine class
     */
    var Engine = /** @class */ (function () {
        function Engine() {
            console.log("Hello World");
        }
        Engine.prototype.start = function () {
            this._canvas = TSE.GLUtilities.initialise('foo');
            // colour
            TSE.gl.clearColor(1, 0, 0, 1);
            // game looping
            this.loop();
        };
        /**
         * main loop
         */
        Engine.prototype.loop = function () {
            TSE.gl.clear(TSE.gl.COLOR_BUFFER_BIT);
            requestAnimationFrame(this.loop.bind(this));
        };
        return Engine;
    }());
    TSE.Engine = Engine;
})(TSE || (TSE = {}));
//# sourceMappingURL=engine.js.map