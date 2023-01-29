let checkDevice = navigator.userAgent;
let training = document.querySelector('#training');
console.log(checkDevice);

if (navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android') || 
    navigator.userAgent.match('iPad') || navigator.userAgent.match('RIM')) {
    document.body.classList.add('_touch');
    training.style.display = 'none';
} 