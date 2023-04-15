export const mobileControls = {
  leftButton: document.querySelector('.left'),
  topButton: document.querySelector('.top'),
  bottomButton: document.querySelector('.bottom'),
  rightButton: document.querySelector('.right'),
  fireButton: document.querySelector('.fire'),
};

let checkDevice = navigator.userAgent;
const viewport = document.querySelector('#viewport'); 
let touch = document.querySelector('#keyboard-controls-help');



if (navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android') || 
    navigator.userAgent.match('iPad') || navigator.userAgent.match('RIM')) {
    document.body.classList.add('_touch');
    touch.style.display = 'none';
    if (window.orientation === 0) {
    viewport.setAttribute('content', 'width=900, initial-scale=0.3, max-scale=0.3, user-scalable=no');
    }
} 

document.querySelectorAll('*').forEach((e) =>{e.setAttribute('draggable', false)}); 

