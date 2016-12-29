
(function () { // Avoid functions or variable namess collision with otheer libraries. Assumes a Universe in the global context

(function init() {
    // Start animation loop
    requestAnimationFrame(function() { // Closure to set context available to animationLoop
        var canvas = document.getElementById('canvas');
        if( !canvas )
            return function (){}; // There is no canvas, so nothing to do
        var ctx = canvas.getContext('2d');
        if( !ctx )
            return function (){}; // There is no canvas, so nothing to do


        // TODO: Please read this to improove animation loop
        // https://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing#first-attempt
        function animationLoop() {
            // These are the steps you need to take to draw a frame:
                // 1. Clear the canvas
                // 2.  Save the canvas state
                // 3. Draw animated shapes
                // 4. Restore the canvas state
            ctx.globalCompositeOperation = 'destination-over';
            ctx.clearRect(0,0,canvas.width, canvas.height);
            ctx.save();
            universe.forEach(function (item) {
                item.update();
            });
            universe.forEach(function (item) {
                item.render(ctx);
            });
            ctx.restore();
            requestAnimationFrame(animationLoop);
        };
        return animationLoop;
    }());
})();


})();