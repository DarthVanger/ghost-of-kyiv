let checkDevice = navigator.userAgent;
let touch = document.querySelector('#keyboard-controls-help');

if (navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android') || 
    navigator.userAgent.match('iPad') || navigator.userAgent.match('RIM')) {
    document.body.classList.add('_touch');
    touch.style.display = 'none';
} 