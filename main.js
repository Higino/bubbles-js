
// Start animation loop
requestAnimationFrame(function() { // Closure to set context available to animationLoop
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    if( !ctx )
        return; // There is no canvas context to display in, so nothing to do

    // TODO: Please read this to improove animation loop
    // https://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing#first-attempt
    function animationLoop() {
        // These are the steps you need to take to draw a frame:

        // 1. Clear the canvas
        // Unless the shapes you'll be drawing fill the complete canvas (for instance a backdrop image), you need to clear any shapes that have been drawn previously. The easiest way to do this is using the clearRect() method.
        // 2.  Save the canvas state
        // If you're changing any setting (such as styles, transformations, etc.) which affect the canvas state and you want to make sure the original state is used each time a frame is drawn, you need to save that original state.
        // 3. Draw animated shapes
        // The step where you do the actual frame rendering.
        // 4. Restore the canvas state
        // If you've saved the state, restore it before drawing a new frame.
        ctx.globalCompositeOperation = 'destination-over';
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.save();
        update();
        draw(ctx);
        ctx.restore();
        requestAnimationFrame(animationLoop);
    };
    return animationLoop;
}());

function update() {
    universe.forEach(function (item) {
        item.update();
    });
}

function draw(canvasContext) {
    universe.forEach(function (item) {
        item.render(canvasContext);
    });
}

