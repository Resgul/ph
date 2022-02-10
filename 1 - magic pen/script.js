const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0; // для цветовой палитры

const mouse = {
  x: undefined,
  y: undefined,
};

// ширина и высота обновляется при ресайзе - это убирает растяжение
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

})

canvas.addEventListener('click', event => {
  [mouse.x, mouse.y] = [event.x, event.y];
  for(let i = 0; i < 50; i++) {
    particlesArray.push(new Particle);
  }
});

canvas.addEventListener('mousemove', event => {
  [mouse.x, mouse.y] = [event.x, event.y];
  for(let i = 0; i < 2; i++) {
    particlesArray.push(new Particle);
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = window.innerWidth * Math.random();
    // this.y = window.innerHeight * Math.random();
    // this.color = `rgb(${Math.random() * 225 + 30},${Math.random() * 225 + 30}, 255)`;
    this.color = `hsl(${hue}, 100%, 50%)`;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size >= 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    // ctx.fillStyle = `hsl(${hue}, 100%, 50%)` // меняет цвет всей анимации напротяжении всего времени движения частиц
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// function init() {
//   for (let i = 0; i < 100; i++) {
//     particlesArray.push(new Particle());
//   }
// }
// init();
// console.log(particlesArray);

function particleHandler() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[i].color;
        ctx.lineWidth = 0.2;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}


function animate() {
  ctx.clearRect(0,0, canvas.width, canvas.height); // затирание хвостов
  // ctx.fillStyle = 'rgba(0,0,0,0.02)'; // оставляет хвосты-салюты
  // ctx.fillRect(0, 0, canvas.width, canvas.height) // оставляет хвосты-салюты
  hue +=2;
  particleHandler();
  requestAnimationFrame(animate);
}
animate();