/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
const backgroundCanvas = document.getElementById('backgroundCanvas');
const backgroundCtx = backgroundCanvas.getContext('2d');
function resizeCanvas() {
  backgroundCanvas.width = collisionCanvas.width = canvas.width = window.innerWidth;
  backgroundCanvas.height = collisionCanvas.height = canvas.height = window.innerHeight;
}
resizeCanvas();

let score = 0;
let gameOver = false;
ctx.font = '50px Impact'

// ресайз окна
window.addEventListener('resize', resizeCanvas)

let ravens = [];
let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

class Raven {
  constructor() {
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.sizeModifier = (Math.random() * 0.6 + 0.4);
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = Math.random() * 4 + 3;
    this.directionY = Math.random() * 4 - 2;
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = 'images/raven.png';
    this.frame = 0;
    this.maxFrame = 4;
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * 50 + 30;
    this.randomColor = [Math.floor(20 + Math.random()*30), Math.floor(150 + Math.random()*35), Math.floor(150 + Math.random()*75)];
    this.color = `rgb( ${this.randomColor[0]}, ${this.randomColor[1]}, ${this.randomColor[2]})`;
    this.hasTrail = this.directionX > 5;
  }
  update(deltatime) {
    if (this.y < 0 || this.y > canvas.height - this.height) this.directionY *= -1;
    this.x -= this.directionX;
    this.y += this.directionY;
    if (this.x < 0 - this.width) this.markedForDeletion = true;
    this.timeSinceFlap += deltatime;
    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) this.frame = 0;
      else this.frame++;
      this.timeSinceFlap = 0;
      if (this.hasTrail) {
        for (let i = 0; i < 3; i++) {
          particles.push(new Particle(this.x, this.y, this.width, this. color));
        }
      }
    }
    if (this.x < 0 - this.width) gameOver = true;
  }
  draw() {
    collisionCtx.fillStyle = this.color;
    collisionCtx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}

let explosions = [];
class Explosion {
  constructor(x, y, size) {
    this.image = new Image();
    this.image.src = 'images/boom.png';
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.size = size;
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.sound = new Audio();
    this.sound.src = 'audio/boom.wav';
    this.timeSinceLastFrame = 0;
    this.frameInterval = 100;
    this.markedForDeletion = false;
  }
  update(deltatime) {
    if (this.frame === 0) this.sound.play();
    this.timeSinceLastFrame += deltatime;
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++;
      this.timeSinceLastFrame = 0;
      if (this.frame > 5) this.markedForDeletion = true;
    }
  }
  draw() {
    ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size * 0.25, this.size, this.size)
  }
}

let particles = [];

class Particle {
  constructor(x, y, size, color) {
    this.size = size;
    this.x = x + this.size * 0.5 + Math.random() * 50 - 25;
    this.y = y + this.size * 0.33 + Math.random() * 50 - 25;
    this.radius = Math.random() * this.size * 0.1;
    this.maxRadius = Math.random() * 20 + 35;
    this.markedForDeletion = false;
    this.speedX = Math.random() * 1 + 0.5;
    this.color = color;
  }
  update() {
    this.x += this.speedX;
    this.radius += 0.3;
    if (this.radius > this.maxRadius - 5) this.markedForDeletion = true;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = 1 - this.radius / this.maxRadius;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Background {
  constructor(src, speedModifier, isUpdateble) {
    this.width = innerHeight * 1.8;
    this.height = innerHeight * 1.05;
    this.x = -200;
    this.y = -5;
    this.image = new Image();
    this.image.src = src;
    this.direction = 0;
    this.middleOfScreenX = innerWidth * 0.5;
    this.middleOfScreenY = innerHeight * 0.5;
    this.speedModifier = speedModifier;
    this.isUpdateble = isUpdateble;
  }
  update() {
    if (this.isUpdateble) {
      this.x += 0.3;
    }
    if (this.x > this.width) this.x = 0;
  }
  draw() {
    backgroundCtx.drawImage(this.image, this.x + this.direction, this.y, this.width, this.height);
    if (this.isUpdateble) {
      backgroundCtx.drawImage(this.image, this.x - this.width  + this.direction, this.y, this.width, this.height);
    } else {
      backgroundCtx.drawImage(this.image, this.x + this.width  + this.direction, this.y, this.width, this.height);
    }
  }
}

const arrayOfLayerOptions = [
  {src: 'images/layers/sky.png', speedModifier: 0, isUpdateble: false},
  {src: 'images/layers/clouds_1.png', speedModifier: 0.015, isUpdateble: true},
  {src: 'images/layers/rocks.png', speedModifier: 0.005, isUpdateble: false},
  {src: 'images/layers/clouds_2.png', speedModifier: 0, isUpdateble: true},
  {src: 'images/layers/ground_1.png', speedModifier: 0.01, isUpdateble: false},
  {src: 'images/layers/ground_2.png', speedModifier: 0.03, isUpdateble: false},
  {src: 'images/layers/ground_3.png', speedModifier: 0.10, isUpdateble: false},
  {src: 'images/layers/plant.png', speedModifier: 0.18, isUpdateble: false},
]
let layersOfBackground = [];

for (let layer of arrayOfLayerOptions) {
  layersOfBackground.push(new Background(layer.src, layer.speedModifier, layer.isUpdateble))
}

// обнаружение хитбокса по цвету пикселя 
window.addEventListener('click', e => {
  const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
  const pc = detectPixelColor.data;
  ravens.forEach(object => {
    if (object.randomColor[0] === pc[0] && 
      object.randomColor[1] === pc[1] && 
      object.randomColor[2] === pc[2]) {
      object.markedForDeletion = true;
      score++;
      if (object.hasTrail) score++; // за быстрых 2 очка+
      explosions.push(new Explosion(object.x, object.y, object.width));
    } 
  })
});

window.addEventListener('mousemove', e => {
  layersOfBackground.forEach(layer => {
    if (!layer.isUpdateble) {
      layer.x = (-e.x) * layer.speedModifier;
      layer.y = (-e.y) * layer.speedModifier * 0.2;
    }
  })
})

function drawScore() {
  resizeCanvas();
  ctx.font = '50px Impact';
  ctx.fillStyle = 'black';
  ctx.fillText('Score: ' + score, 50, 75)
  ctx.fillStyle = 'white';
  ctx.fillText('Score: ' + score, 48, 73)
}

function drawGameOver() {
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText(`GAME OVER, score: ${score}.`, canvas.width * 0.5 + 2, canvas.height * 0.5 + 2);
  ctx.fillText(`ENTER to restart`, canvas.width * 0.5 + 2, canvas.height * 0.5 + 52);
  ctx.fillStyle = 'white';
  ctx.fillText(`GAME OVER, score: ${score}.`, canvas.width * 0.5, canvas.height * 0.5)
  ctx.fillText(`ENTER to restart`, canvas.width * 0.5, canvas.height * 0.5 + 50)
  document.addEventListener('keyup', restartGame)
}

function restartGame(e) {

  if (e.key === 'Enter' && gameOver === true) {
    score = 0;
    gameOver = false;
    ravens = [];
    animate(0);
  }
}

function animate(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundCtx.clearRect(0, 0, canvas.width, canvas.height);

  // блок для запуска новых воронов с равной периодичностью внезавиимости от компа
  let deltatime = (timestamp - lastTime);
  lastTime = timestamp;
  timeToNextRaven += deltatime;
  if (timeToNextRaven > ravenInterval) {
    ravens.push(new Raven);
    timeToNextRaven = 0;
// сортировка массива по возрастанию, чтобы сначала отрисовывались маленькие, а затем большие наслаивались сверху
    ravens.sort((a,b) => a.width - b.width); 
  }
// конец блока

  drawScore();

// спред оператор позволяет сократить дублирование кода, учитывая, что методы называются одинаково, можно запускать их из одного массива
  [...particles, ...ravens, ...explosions, ...layersOfBackground].forEach(object => object.update(deltatime));
  [...particles, ...ravens, ...explosions, ...layersOfBackground].forEach(object => object.draw());
  // фильтр избавляется от объектов вылетевших за край окна
  ravens = ravens.filter(object => !object.markedForDeletion);
  explosions = explosions.filter(object => !object.markedForDeletion);
  particles = particles.filter(object => !object.markedForDeletion);
  if (!gameOver) requestAnimationFrame(animate);
  else drawGameOver();
}
animate(0);