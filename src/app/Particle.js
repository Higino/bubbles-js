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
            //Reflect partcile in the universe boundary
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
        this.velocity.y = this.velocity.y + global.GRAVITY;
        var m = this.momentum();
        this.position.x = (this.position.x + m.x);
        this.position.y = (this.position.y + m.y);
    });
}).call(Particle.prototype);

module.exports = Particle;

