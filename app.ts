var engine: TSE.Engine

// main entry point of the app
window.onload = function () {
    engine = new TSE.Engine()
    engine.start()
}

window.onresize = function () {
    engine.resize()
}