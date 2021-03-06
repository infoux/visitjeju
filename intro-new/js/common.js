$(document).ready(function() {
    $("li.intro").backgroundCycle({
        imageUrls: [
            'images/background01.jpg',
            'images/background02.jpg',
            'images/background03.jpg',
            'images/background04.jpg',
            'images/background05.jpg',
            'images/background06.jpg',
            'images/background07.jpg',
            'images/background08.jpg',
            'images/background09.jpg',
            'images/background10.jpg',
            'images/background11.jpg'
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


    var bgm = new Audio('');
    if(!bgm.canPlayType('audio/mp3')) alert('브라우저가 mp3  재생을 지원하지 않습니다.');
    else {
    	var bgm_url = 'bgm.mp3';
        bgm = new Audio(bgm_url);
        bgm.addEventListener('ended',function(){this.currentTime=0;this.play();},false);
        bgm.play();
    }





    function loading() {
        $("li.intro .container").addClass("off");
        $("li.intro .container").removeClass("on");
    }
    setTimeout(loading, 3000);
        $("li.intro .container").mouseenter(function() {
        $(this).addClass("on");
        $(this).removeClass("off");
    });
    $("li.intro .container").mouseleave(function() {
        $(this).addClass("off");
        $(this).removeClass("on");
    });



$(function() {
    var i = 0

    function fadeMyContent() {
        if (i == 0) {

            $(".intro h1 p:first").fadeIn(2000).delay(3000).fadeOut(700,
                function() {
                    $(this).appendTo($(this).parent());
                    fadeMyContent();
                });

        } else {
            $(".intro h1 p:first").fadeIn(2000).delay(3000).fadeOut(700,
                function() {
                    $(this).appendTo($(this).parent());
                    fadeMyContent();
                });
        }

        i = 1
    }
    fadeMyContent();
});

});
