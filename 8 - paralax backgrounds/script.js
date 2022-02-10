const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 5;
// let gameFrame = 0; // для решения через связку с геймфреймом (баги со скачками при переключении)

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'images/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'images/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'images/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'images/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'images/layer-5.png';

window.addEventListener('load', () => {

  
  const slider = document.getElementById('slider');
  slider.value = gameSpeed;
  const showGameSpeed = document.getElementById('showGameSpeed');
  showGameSpeed.innerHTML = gameSpeed;
  slider.addEventListener('change', e => {
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = gameSpeed;
  })
  
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') gameSpeed = 10;
    if (e.key === 'ArrowLeft') gameSpeed = 2;
    if (e.key === 'ArrowDown') gameSpeed = 0;
    if (e.key === 'ArrowUp') {
      gameSpeed = 20;
      setTimeout(() => {
        gameSpeed = 10;
        showGameSpeed.innerHTML = gameSpeed;
      } , 500)
    }
    showGameSpeed.innerHTML = gameSpeed;
  });

  class Layer {
    constructor(image, speedModifaer) {
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 700;
      this.x2 = this.width;
      this.image = image;
      this.speedModifaer = speedModifaer;
      this.speed = speedModifaer * gameSpeed;
    }
    update() {
      this.speed = gameSpeed * this.speedModifaer;
      // this.x = gameFrame * this.speed % this.width; // для решения через связку с геймфреймом (баги со скачками при переключении)
      if (this.x <= -this.width) this.x = 0; // плавное течение анимации при переключении
      this.x = this.x - this.speed; // плавное течение анимации при переключении
    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
  }
  
  const layer1 = new Layer(backgroundLayer1, 0.2);
  const layer2 = new Layer(backgroundLayer2, 0.4);
  const layer3 = new Layer(backgroundLayer3, 0.6);
  const layer4 = new Layer(backgroundLayer4, 0.8);
  const layer5 = new Layer(backgroundLayer5, 1);
  
  const gameObjects = [layer1, layer2, layer3, layer4, layer5]
  
  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
      object.update();
      object.draw();
    })
    // gameFrame--; // для решения через связку с геймфреймом (баги со скачками при переключении)
    requestAnimationFrame(animate);
  }
  animate();
})