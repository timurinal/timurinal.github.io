document.addEventListener("DOMContentLoaded", function() {
    var userAgent = navigator.userAgent;

    if (/android/i.test(userAgent)) {
        document.body.classList.add('mobile');
    } else if (/iphone|ipad|ipod/i.test(userAgent)) {
        document.body.classList.add('mobile');
    } else if (/windows nt/i.test(userAgent)) {
        document.body.classList.add('desktop');
    } else if (/mac os/i.test(userAgent)) {
        document.body.classList.add('desktop');
    } else {
        document.body.classList.add('desktop');
    }
});
