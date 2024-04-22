document.addEventListener("DOMContentLoaded", function() {
    var userAgent = navigator.userAgent;

    // TODO: REMOVE THIS, IT IS ONLY FOR TESTING MOBILE LAYOUT
    //document.body.classList.add('mobile')
    document.body.classList.add('desktop')
    //return;

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

    // Select random background image only if the current site is on a desktop
    if (document.body.classList.contains('desktop')) {
        const backgrounds = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];

        // Path to the images directory
        const path = 'img/home/';

        // Select a random background image
        const randomImage = backgrounds[Math.floor(Math.random() * backgrounds.length)];

        // Get the .home-intro element
        const homeIntro = document.querySelector('.home-intro');

        // Set the random background image
        homeIntro.style.backgroundImage = `url('${path}${randomImage}')`;
    }
});
