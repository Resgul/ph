/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;  
canvas.height = 720;  

class InputHandler {
  constructor() {
    this.keys = [];
    window.addEventListener('keydown', e => {
      if (( e.key === 'ArrowDown' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight') &&
            this.keys.indexOf(e.key) === -1) {// крутая тема - тут проверка на indexOf = -1 позволяет определить, есть ли дубль элемента в массиве
        this.keys.push(e.key)
      }
    })
    
    window.addEventListener('keyup', e => {
      if (e.key === 'ArrowDown' ||
          e.key === 'ArrowUp' ||
          e.key === 'ArrowLeft' ||
          e.key === 'ArrowRight') {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
      console.log(this.keys);
    })
  }
}

class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 200;
    this.height = 200;
    this.x = 0;
    this.y = this.gameHeight - this.height;
    this.image = document.getElementById('playerImage');
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
  }
  draw(context) {
    context.drawImage(this.image, this.frameX * this.width, this.frameY * this.width,this.width, this.height, this.x, this.y, this.width, this.height);
  }
  update(input) {
    // horizontal movement
    this.x += this.speed;
    
  }
}

class Backgrounds {

}

class Enemy {

}

function handleEnemies() {

}

function dispalyStatusText() {

}

const input = new InputHandler();
const player = new Player(canvas.width, canvas.height);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
  player.update(input);
  requestAnimationFrame(animate);
}
animate();