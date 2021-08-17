namespace TSE {
    /**
     * game engine class
     */
    export class Engine {
        private _canvas: HTMLCanvasElement

        public constructor() {
            console.log("Hello World");
        }

        // private _count: number = 0

        public start(): void {
            this._canvas = GLUtilities.initialise()
            // colour
            gl.clearColor(1,0,0,1)
            // game looping
            this.loop();
        }

        /**
         * main loop
         */
        private loop(): void {
            gl.clear(gl.COLOR_BUFFER_BIT)
            requestAnimationFrame(this.loop.bind(this));
        }
    }
}