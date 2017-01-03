

(function () { // Avoid functions or variable namess collision with otheer libraries. Assumes a Universe in the global context
    var global = this;
    global.MAX_PARTICLES = global.MAX_PARTICLES || 100; // Maximum number of particles to be draw
    global.MS_DELAY_BETWEEN_PARTICLES = global.MS_DELAY_BETWEEN_PARTICLES || 200; // Miliseconds to wait before drawing a new particle
    global.GRAVITY = global.GRAVITY || 0; // Self explanatory. Negative gravituis implies bubbles will go up

// Check that a canvas exist otherwise create it
var canvas = document.getElementById('canvas');
if( !canvas ) {
    canvas = document.createElement("canvas");
    canvas.setAttribute("width", "500");
    canvas.setAttribute("id", "canvas");
    canvas.setAttribute("height", "300");
    canvas.style.border = "1px solid black";
    document.body.appendChild(canvas);
}
// Append input fileds after 
var div = document.createElement("div");
var fieldSet = document.createElement("fieldSet");
var numBubblesElement = document.createElement("input");
numBubblesElement.value = MAX_PARTICLES;
var delayBetweenParticlesElement = document.createElement("input");
delayBetweenParticlesElement.value = MS_DELAY_BETWEEN_PARTICLES;
var gravityElement = document.createElement("input");
gravityElement.setAttribute("type" , "range");
gravityElement.setAttribute("min", "-10");
gravityElement.setAttribute("max", "10");
gravityElement.value = GRAVITY*10;
gravityElement.addEventListener("pointermove", function () {
    GRAVITY = Number(gravityElement.value/10) || 0;
    gravityLabel.innerText = "Gravity: " + GRAVITY;
});
var gravityLabel = document.createElement("label");
gravityLabel.innerText = "Gravity: " + gravityElement.value/10;

fieldSet.appendChild(delayBetweenParticlesElement);
var delayBetweenParticlesLabel = document.createElement("label");
delayBetweenParticlesLabel.innerText = " - Delay between bubbles"
fieldSet.appendChild(delayBetweenParticlesLabel);
fieldSet.appendChild(document.createElement("br"));
fieldSet.appendChild(numBubblesElement);
var numBubblesLabel = document.createElement("label");
numBubblesLabel.innerText = " - Number of bubbles"
fieldSet.appendChild(numBubblesLabel);
fieldSet.appendChild(document.createElement("br"));
fieldSet.appendChild(gravityElement);
fieldSet.appendChild(gravityLabel);
fieldSet.appendChild(document.createElement("br"));
var resetAndApply = document.createElement("button");
resetAndApply.innerText = "Reset animation and set properties";
resetAndApply.addEventListener("click", function () {
    MAX_PARTICLES = Number(numBubblesElement.value) || 2;
    MS_DELAY_BETWEEN_PARTICLES = Number(delayBetweenParticlesElement.value) || 3000;
    GRAVITY = Number(gravityElement.value/10) || 0;
    gravityLabel.innerText = "Gravity: " + GRAVITY;
    universe.length = MAX_PARTICLES; // Universe reached its end :-D. It will reset itself   
    delayBetweenParticlesElement.value = MS_DELAY_BETWEEN_PARTICLES; 
});
fieldSet.appendChild(resetAndApply);

div.appendChild(fieldSet);
document.body.appendChild(div);

(function init() {
    // Start animation loop
    requestAnimationFrame(function() { // Closure to set context available to animationLoop
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
            //ctx.globalCompositeOperation = 'lighter';
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