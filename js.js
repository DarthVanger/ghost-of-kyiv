let checkDevice = navigator.userAgent;
console.log(checkDevice);

if (navigator.userAgent.match('iPhone') || navigator.userAgent.match('Android') || 
    navigator.userAgent.match('iPad') || navigator.userAgent.match('RIM')) {
    document.body.classList.add('_touch')
} 