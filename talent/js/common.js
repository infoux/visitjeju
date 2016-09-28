function navPos() {
    var pos = $(".toggle-menu").offset();
    $('nav#menu ul').css('left', pos.left);
}

function magWidth() {
    if ($(window).width() < 1160) {
        var mag = 0;
    } else {
        var mag = ($(window).width() - 1160) / 2;
    }

    $('.photo-list.all').css('margin-left', -mag).css('width', $(window).width());
}

function masonry() {
    var $grids = $('.grid');
    if ($(window).width() >= 1142) {
        $grids.masonry({
            itemSelector: '.grid-item',
            isFitWidth: true
        });
    } else {
        $grids.masonry({
            itemSelector: '.grid-item',
            isFitWidth: false
        });
        $grids.css('width', '100%')

    }
    $grids.masonry('layout');

}
$(function() {
    var i = 0

    function fadeMyContent() {
        if (i == 0) {

            $(".main-count li:first").fadeIn(2000).delay(3000).fadeOut(700,
                function() {
                    $(this).appendTo($(this).parent());
                    fadeMyContent();
                });

        } else {
            $(".main-count li:first").fadeIn(2000).delay(3000).fadeOut(700,
                function() {
                    $(this).appendTo($(this).parent());
                    fadeMyContent();
                });
        }

        i = 1
    }
    fadeMyContent();
});




$(document).ready(function() {
    magWidth();

    $('#header .toggle-menu').click(function() {
        $('nav#menu').toggle();
    });
    $('.grid-item a').click(function() {
        $('.photo-view').css('display', 'block');
        $('html').css('height', $(window).height());
        $('html').css('overflow', 'hidden');
    });
    $('.photo-view .btn.close').click(function() {
        $('.photo-view').css('display', 'none');
        $('html').css('height', 'auto');
        $('html').css('overflow', 'scroll');
    });
    $('nav#menu').after().click(function() {
        $('nav#menu').toggle();
        console.log('dd');
    });









});

$(window).scroll(function() {
    $('nav#menu').hide();
});
$(window).load(function() {

    navPos();
    masonry();
});

$(window).resize(function() {
    navPos();
    magWidth();
    masonry();



});
