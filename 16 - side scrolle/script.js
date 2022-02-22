/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;  
canvas.height = 720;  

class InputHandler {
  constructor() {
    this.keys = [];
    window.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown' && this.keys.indexOf(e.key) === -1) {// крутая тема - тут проверка на indexOf = -1 позволяет определить, есть ли дубль элемента в массиве
        this.keys.push(e.key)
      }
    })
    
    window.addEventListener('keyup', e => {
      if (e.key === 'ArrowDown') {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    })
  }
}

const input = new InputHandler();

class Player {

}

class Backgrounds {

}

class Enemy {

}

function handleEnemies() {

}

function dispalyStatusText() {

}

function animate() {

}