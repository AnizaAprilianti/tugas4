let vs = []
function setup() {
  createCanvas(400, 400);
  v = new Vehicle(200,200);
}

function draw() {
  background(100,100,100);
  
  v.display()
  v.edges()
  v.update();
  v.wander();
  
  
}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l = 50.0;
    this.maxspeed = 2;
    this.maxforce = 0.1;
    this.wanderTheta = 0;
  }
  
  wander(){
    //let steeringforce = p5.Vector.random2D()
    //steeringforce.setMag(0.1)
    //this.applyForce(steeringforce)
    let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location)
    let wanderRadius = 40;
    noFill()
    stroke(255)
    let theta = this.wanderTheta  + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar,yBar));
    
    let debug = true 
    if (debug){
      push()  
      line( this.location.x, this.location.y, projPoint.x, projPoint.y);
        fill(255, 100, 0);
  stroke(0, 100);
  strokeWeight(3);
  ellipse(projPoint.x, projPoint.y, 62, 62, 100, 50);
  ellipse(projPoint.x, projPoint.y, 62, 62, 75, 50);
  ellipse(projPoint.x, projPoint.y, 62, 62, 50, 50);
  ellipse(projPoint.x, projPoint.y, 62, 62, 25, 50);
    }

      
      pop()
    
    let steeringforce = wanderPoint.sub(this.location);
    steeringforce.setMag(this.maxforce)
    this.applyForce(steeringforce)
    
    this.wanderTheta += random(-0.5, 0.5);
    //this.wanderTheta = this.wanderTheta + random (-0.5, 0.5)
    
    
    }
  
  seek(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
      
    }
    else{  
      desired.normalize();
      desired.mult(this.maxspeed);    
    }

    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    fill(175);
    stroke(0);
    translate(this.location.x, this.location.y)
    rotate(theta)
    triangle(0, this.l/2, 0, -this.l/2, this.l,0)
    pop();
  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }

}