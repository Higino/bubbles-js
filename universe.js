(function () { // Avoid functions or variable namess collision with otheer libraries. Assumes a Universe in the global context
//// Particle Object. Defines particles caracteristics. 
//// Particle is a round object with a specific velocity, mass and position coordinate
function Particle (mass, position, velocity, color) {
    this.mass = mass || 1;
    this.velocity = {x: velocity.x || 1, y: velocity.y || -1};
    this.position = {x: position.x || 10, y: position.y || 10};
    this.color = color || "#D9ABFF" //An array for the random colors
}
// Add Particle functions to Particle prototype and be carefull not to override any
(function () {
    // Apply newton second law of physic p=mv
    this.momentum || (this.momentum = function () { 
    return {x: this.mass*50*this.velocity.x, y: this.mass*50*this.velocity.y}});
    
    // Renders a particle
    this.render || (this.render = function(canvasContext) {
        canvasContext.save();
        canvasContext.fillStyle = this.color;
        canvasContext.beginPath();
        canvasContext.arc(this.position.x, 
                          this.position.y,
                          this.mass*5*100,0,2*Math.PI);
        canvasContext.fill();
        canvasContext.stroke();   
        canvasContext.restore();
    });

    //Updates particle physics
    this.update || (this.update = function () {
        // Apply newton laws of physics
        if( this.position.x > universe.boundary.x || this.position.x < 0 ) {
;            //Reflect partcile in the universe boundary
            this.velocity.x = -this.velocity.x
        }
        if( this.position.y > universe.boundary.y || this.position.y < 0 ) {
            //Reflect partcile in the universe boundary
            this.velocity.y = -this.velocity.y;
            // TODO: Think in a proper model for physics reflection near boudary. No time now and not important
            if( (this.position.y - universe.boundary.y) > 0 ) { // If position is realy close to edge make it bounce anyway
                this.position.y = universe.boundary.y; 
            }
            if( (this.position.y - universe.boundary.y) < 0 ) { // If position is realy close to edge make it bounce anyway
                this.position.y = 0;
            }
        }
        this.velocity.y = this.velocity.y + GRAVITY;
        var m = this.momentum();
        this.position.x = (this.position.x + m.x);
        this.position.y = (this.position.y + m.y);
    });
}).call(Particle.prototype);

//An array for the random colors
var colors = ["#FFABAB", "#FFDAAB", "#DDFFAB", "#ABE4FF", "#D9ABFF"];

// A universe contains particles and has a boundaries
window.universe = [];
universe.boundary = {x: document.getElementById('canvas').width, y: document.getElementById('canvas').height}; // assumes a square starting at (0,0)


// Create particles at random coordinates with random momentum
(function scheduleParticles() { // Closure to remember interval ID and scheduling of particle creation
    var intervalId = window.setInterval(createParticle, MS_DELAY_BETWEEN_PARTICLES);
    function createParticle(){
            if( universe.length >= MAX_PARTICLES ){ // Universe reach its capacity, schedule a restart of it for the next few seconds
                window.clearInterval(intervalId);
                scheduleParticles();
                universe.length = 0;
            }
            var p = new Particle(getRandomIntInclusive(1, 2)/100,{x:1,y:0}, {x:1,y:1}, colors[getRandomIntInclusive(0, 4)]);
                p.position.x = getRandomIntInclusive(0, universe.boundary.x) || 5;
                p.position.y = getRandomIntInclusive(0, universe.boundary.y) || 5;
                p.velocity.x = getRandomIntInclusive(-1, 1) || 1;
                p.velocity.y = getRandomIntInclusive(-1, 1) || 1;
                universe.push(p);
    }
}());



// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




})();