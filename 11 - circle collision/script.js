/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
let frame = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const numberOfCircles = 20;
const enemyCircles = [];

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

class MyCircle {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.radius = 40;
    this.color = `rgb(2,101,68)`
  }

  update() {
    window.addEventListener('mousemove', e => {
      this.x = e.x;
      this.y = e.y;
    })
  }

  drawDistanceLine(array) {
    array.forEach(circle => {
      let dx = this.x - circle.x;
      let dy = this.y - circle.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let sumOfRad = this.radius + circle.radius;
      
      if (distance < sumOfRad * 2.5) {
        switch (true) {
          case (distance >= sumOfRad * 2):
            ctx.strokeStyle = 'green';
            break;
          case (sumOfRad <= distance && distance < sumOfRad * 2):
            ctx.strokeStyle = 'orange';
            break;
          case (distance < sumOfRad):
            ctx.strokeStyle = 'red';
            break;
        }
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(circle.x, circle.y);
        ctx.stroke();
        ctx.closePath();
      }
    })
  }
  
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }
}

let myCircle = new MyCircle(60, 60, 40);

class EnemyCircle {
  constructor() {
    this.radius = Math.random() * 20 + 55;
    this.x = (canvas.width - this.radius * 2) * Math.random() + this.radius;
    this.y = (canvas.height - this.radius * 2) * Math.random() + this.radius;
    this.color = 'darkgray';
  }

  collisionDetect(circle) {
    let dx = this.x - circle.x;
    let dy = this.y - circle.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let sumOfRad = this.radius + circle.radius;
    
    if (distance < sumOfRad * 2.5) {
      switch (true) {
        case (distance >= sumOfRad * 2):
          ctx.strokeStyle = 'green';
          ctx.stroke();
          break;
        case (sumOfRad <= distance && distance < sumOfRad * 2):
          ctx.strokeStyle = 'orange';
          ctx.stroke();
          break;
        case (distance < sumOfRad):
          ctx.strokeStyle = 'red';
          ctx.stroke();
          this.x += dx*0.05;
          this.y += dy*0.05;
          break;
      }
    }
  }

  collisionsNormalize() {
    enemyCircles.forEach(circle => {
      let dx = this.x - circle.x;
      let dy = this.y - circle.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let sumOfRad = this.radius + circle.radius;
      if (distance < sumOfRad) {
        this.x += dx*0.01;
        this.y += dy*0.01;
      }
    })
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.closePath();
  }
}

for (let i = 0; i < numberOfCircles; i++) {
  enemyCircles.push(new EnemyCircle);
}
myCircle.update();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myCircle.draw();
  myCircle.drawDistanceLine(enemyCircles);
  
  enemyCircles.forEach(circle => {
    circle.draw();
    circle.collisionDetect(myCircle);
    circle.collisionsNormalize();
  })

  requestAnimationFrame(animate);
}
animate();