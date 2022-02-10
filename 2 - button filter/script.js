const buttons = document.querySelectorAll('button');
const turbulence = document.querySelector('feTurbulence');
let verticalFrequency = 0.00001;
turbulence.setAttribute('baseFrequency', verticalFrequency + ' 0.00001');
const steps = 30;
const interval = 10;

buttons.forEach(button => {
  button.addEventListener('mouseover', () => {
    verticalFrequency = 0.00001;
    for (let i = 0; i < steps; i++) {
      setTimeout(() => {
        verticalFrequency += 0.0005;
        turbulence.setAttribute('baseFrequency', verticalFrequency + ' 0.00001');
      }, i * interval);
    }
    setTimeout(() => {
      verticalFrequency = 0.00001;
      turbulence.setAttribute('baseFrequency', verticalFrequency + ' 0.00001');
    }, steps * interval)
  })
})