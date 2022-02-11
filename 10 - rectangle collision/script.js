/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

class MyRectangle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 50 ;
    this.height = 50;
    this.speed = 15.50;
  }
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  collisionFound() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

class Enemy {
  constructor() {
    this.width = 200 ;
    this.height = 200;
    this.x = canvas.width/2 - this.width/2;
    this.y = canvas.height/2 - this.height/2;
  }
  draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  collisionFound() {
    ctx.fillStyle = 'red';
  }
}

function collisionCheck(obj1, obj2) {
  if (obj1.x > obj2.x + obj2.width ||
      obj1.x + obj1.width < obj2.x ||
      obj1.y > obj2.y + obj2.height ||
      obj1.y + obj1.height < obj2.y) {
        // obj1.draw();
      }
      else {
        obj1.collisionFound();
        let x1 = 0;
        let y1 = 0;
        let x2 = 0;
        let y2 = 0;
        
        switch (true) {
          // внутри
          case (obj1.x >= obj2.x && 
            obj1.x+obj1.width <= obj2.x+obj2.width &&
            obj1.y+obj1.height <= obj2.y+obj2.height &&
            obj1.y >= obj2.y) :
            x1 = obj1.x; 
            y1 = obj1.y;
            x2 = obj1.width;
            y2 = obj1.height;  
            break;
          // заход с левого верхнего угла
          case (obj1.x <= obj2.x &&
                obj1.x + obj1.width >= obj2.x &&
                obj1.y <= obj2.y &&
                obj1.y + obj1.height >= obj2.y) :         
            x1 = obj2.x; 
            y1 = obj2.y;
            x2 = obj1.x + obj1.width - obj2.x;
            y2 = obj1.y + obj1.height - obj2.y;  
            break;
          // пересечение с верхней гранью
          case (obj1.x >= obj2.x &&
              obj1.x + obj1.width >= obj2.x &&
              obj1.x + obj1.width <= obj2.x + obj2.width &&
              obj1.y <= obj2.y &&
              obj1.y + obj1.height >= obj2.y) :         
          x1 = obj1.x; 
          y1 = obj2.y;
          x2 = obj1.width;
          y2 = obj1.y + obj1.height - obj2.y;  
          break;
          // выход через верхний правый
          case (obj1.x >= obj2.x &&
              obj1.x <= obj2.x + obj2.width &&
              obj1.x + obj1.width >= obj2.x + obj2.width &&
              obj1.y <= obj2.y &&
              obj1.y + obj1.height >= obj2.y) :         
          x1 = obj1.x; 
          y1 = obj2.y;
          x2 = obj2.x + obj2.width - obj1.x;
          y2 = obj1.y + obj1.height - obj2.y;  
          break;
          // заход через левую грань
          case (obj1.x <= obj2.x &&
              obj1.x + obj1.width >= obj2.x &&
              obj1.y >= obj2.y &&
              obj1.y + obj1.height <= obj2.y + obj2.height) :         
          x1 = obj2.x; 
          y1 = obj1.y;
          x2 = obj1.x + obj1.width - obj2.x;
          y2 = obj1.height;
          break;
          // выход через правую грань
          case (obj1.x <= obj2.x + obj2.width &&
              obj1.x + obj1.width >= obj2.x + obj2.width &&
              obj1.y >= obj2.y &&
              obj1.y + obj1.height <= obj2.y + obj2.height) :         
          x1 = obj1.x; 
          y1 = obj1.y;
          x2 = obj2.x + obj2.width - obj1.x;
          y2 = obj1.height;
          break;
          // заход с левого нижнего угла
          case (obj1.x <= obj2.x &&
            obj1.x + obj1.width >= obj2.x &&
            obj1.y >= obj2.y &&
            obj1.y + obj1.height >= obj2.y) :         
          x1 = obj2.x; 
          y1 = obj1.y;
          x2 = obj1.x + obj1.width - obj2.x;
          y2 = obj2.y + obj2.height - obj1.y;  
          break;
          // пересечение с нижней гранью
          case (obj1.x >= obj2.x &&
              obj1.x + obj1.width >= obj2.x &&
              obj1.x + obj1.width <= obj2.x + obj2.width &&
              obj1.y >= obj2.y &&
              obj1.y + obj1.height >= obj2.y) :         
          x1 = obj1.x; 
          y1 = obj1.y;
          x2 = obj1.width;
          y2 = obj2.y + obj2.height - obj1.y;
          break;
          // выход через нижний правый
          case (obj1.x <= obj2.x + obj2.width &&              
              obj1.x + obj1.width >= obj2.x + obj2.width &&
              obj1.y <= obj2.y + obj2.height &&
              obj1.y + obj1.height >= obj2.y + obj2.height) :         
          x1 = obj1.x; 
          y1 = obj1.y;
          x2 = obj2.x + obj2.width - obj1.x;
          y2 = obj2.y + obj2.height - obj1.y;
          break;
        }
        //закраска фона
        ctx.fillStyle = 'black';
        ctx.fillRect(obj2.x, obj2.y, obj2.width, obj2.height);          
        //новый прямоуг
        ctx.fillStyle = 'gray';
        ctx.fillRect(x1, y1, x2, y2); 
        }
    }

function mouseControl() {
  window.addEventListener('mousemove', e => {
    myRect.x = e.x;
    myRect.y = e.y;
  })
}

function keyContol(obj) { 
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
      obj.x += obj.speed;
    }
    if (e.key === 'ArrowLeft') {
      obj.x -= obj.speed;
    }
    if (e.key === 'ArrowDown') {
      obj.y += obj.speed;
    }
    if (e.key === 'ArrowUp') {
      obj.y -= obj.speed;
    }
  });
}
// создание объектов
const myRect = new MyRectangle();
const enemy = new Enemy();
keyContol(myRect)
mouseControl();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myRect.draw();
  enemy.draw();
  collisionCheck(myRect, enemy);
  requestAnimationFrame(animate);
}
animate();