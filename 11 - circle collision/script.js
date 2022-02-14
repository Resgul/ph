/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
let frame = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const circle1 = {x: 60, y: 60, radius: 30};
const circle2 = {x: canvas.width * 0.5, y: canvas.height * 0.5, radius: 100};

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})
animate();


function moveCircle(obj) {
  window.addEventListener('mousemove' , e => {
    obj.x = e.x;
    obj.y = e.y;
  })
}

function checkCollision(circle1, circle2) {
  let dx = circle1.x - circle2.x;
  let dy = circle1.y - circle2.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  let sumOfRad = circle1.radius + circle2.radius;
  
  if (distance < sumOfRad) {
    drawDistanceLine(circle1, circle2);
    return true    
  }
  if (distance < sumOfRad * 2.5) drawDistanceLine(circle1, circle2)
}

function drawDistanceLine(circle1, circle2) {
  let [x1, y1] = [circle1.x, circle1.y];
  let [x2, y2] = [circle2.x, circle2.y];
  let dx = circle1.x - circle2.x;
  let dy = circle1.y - circle2.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  let sumOfRad = circle1.radius + circle2.radius;
  
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
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

function drawCircle(obj) {
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
}

function animate() {
  if (frame % 2 === 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle(circle1);
    drawCircle(circle2);
    checkCollision(circle1, circle2)
    moveCircle(circle1)
    if (checkCollision(circle1, circle2)) {
      ctx.lineWidth = 5;
    } else {
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'black'
    }
  }
  frame++;
  requestAnimationFrame(animate);
}