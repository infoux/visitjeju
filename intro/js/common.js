$(document).ready(function() {
    $("li.intro").backgroundCycle({
        imageUrls: [
            'images/background01.jpg',
            'images/background02.jpg',
            'images/background03.jpg',
            'images/background04.jpg'
        ],
        fadeSpeed: 2000,
        duration: 5000,
        backgroundSize: SCALING_MODE_COVER
    });

    $('.intro-slider').bxSlider({
        auto: false,
        pager: false,
        nextSelector: '.bx-next',
        prevSelector: '.bx-prev'
    });






});
