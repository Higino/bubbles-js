// Module that randomises our universe
(function () { // Avoid functions or variable names collision with other libraries. Assumes a Universe configurations are in the global context
var Particle = require('./Particle.js');
var u = require('./util.js');
var global = this;


// A universe contains particles and has a boundaries
window.universe = [];
universe.boundary = {x: document.getElementById('canvas').width, y: document.getElementById('canvas').height}; // assumes a square starting at (0,0)


// Create particles at random coordinates with random momentum
(function scheduleParticles() { // Closure to remember interval ID and scheduling of particle creation
    var intervalId = window.setInterval(createParticle, global.MS_DELAY_BETWEEN_PARTICLES);
    function createParticle(){
            if( universe.length >= global.MAX_PARTICLES ){ // Universe reach its capacity, schedule a restart of it for the next few seconds
                window.clearInterval(intervalId);
                scheduleParticles();
                universe.length = 0;
            }
            var p = new Particle(u.getRandomIntInclusive(1, 2)/100,{x:1,y:0}, {x:1,y:1}, u.colors[u.getRandomIntInclusive(0, 4)]);
            p.position.x = u.getRandomIntInclusive(0, universe.boundary.x) || 5;
            p.position.y = u.getRandomIntInclusive(0, universe.boundary.y) || 5;
            p.velocity.x = u.getRandomIntInclusive(-1, 1) || 1;
            p.velocity.y = u.getRandomIntInclusive(-1, 1) || 1;
            universe.push(p);
    }
}());

})();