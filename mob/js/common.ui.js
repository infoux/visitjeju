/*!
 * common.ui.js
 * 공통 UI 스크립트 모음.
 */

(function($) {
    'use strict';
    /* ========================================================================
     * Bootstrap: transition.js v3.3.6
     * http://getbootstrap.com/javascript/#transitions
     * ========================================================================
     * Copyright 2011-2016 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */

    // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
    // ============================================================
    function transitionEnd() {
        var n = document.createElement("bootstrap"),
            t = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var i in t)
            if (void 0 !== n.style[i]) return {
                end: t[i]
            };
        return !1
    }
    $.fn.emulateTransitionEnd = function(n) {
        var t = !1,
            i = this;
        $(this).one("bsTransitionEnd", function() {
            t = !0
        });
        var r = function() {
            t || $(i).trigger($.support.transition.end)
        };
        return setTimeout(r, n), this
    }, $(function() {
        $.support.transition = transitionEnd(), $.support.transition && ($.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function(n) {
                return $(n.target).is(this) ? n.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    });
})(jQuery);

// handle multiple browsers for requestAnimationFrame()
window.requestAFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        // if all else fails, use setTimeout
        function(callback) {
            return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
        };
})();

// handle multiple browsers for cancelAnimationFrame()
window.cancelAFrame = (function() {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        function(id) {
            window.clearTimeout(id);
        };
})();

/* 별점 평가 */
var starRate = function() {
    var $this = $(this);
    var $target = $this.closest('.star-rate').find('.rate');
    var count = ($this.index()) * 20;
    $target.width(count + '%').text($this.text());

}

var txtAreaIn = function() {
    $(this).siblings('.label').hide();
}
var txtAreaOut = function() {
    if (!this.value.length) {
        $(this).siblings('.label').show();
    }
}

function languageChange(clsSelect) {
    document.location = clsSelect.value;
}

$(document).ready(function() {

    /* asdie All Menu */
    $('#header > .btn-all-menu').on('click', function() {
        $('#allMenu').show().one('bsTransitionEnd', function() {
            $('#allMenu').addClass('active');
            $('body').addClass('body-hidden');
        }).emulateTransitionEnd(100);
    });
    $('#allMenu .btn-close').on('click', function() {
        $('body').removeClass('body-hidden');
        $('#allMenu').removeClass('active').one('bsTransitionEnd', function() {
            $('#allMenu').hide();
        }).emulateTransitionEnd(400);
    });

    var sideMenuList = $('#allMenu > ul > li');
    sideMenuList.on('click', '> a', function() {
        var index = $(this).parent().index();
        var select = sideMenuList.eq(index);
        var callback = function() {
            // 열릴경우에만.
            if (select.find('>a').hasClass('active')) {
                $('#allMenu').animate({
                    'scrollTop': $('#allMenu').scrollTop() + select.offset().top
                });
            }
        };
        sideMenuList.each(function(i) {
            if (i == index) {
                $(this).find('>a').toggleClass('active');
                $(this).find('>.sub').slideToggle(callback);
            } else {
                $(this).find('>a').removeClass('active');
                $(this).find('>.sub').slideUp();
            }
        })

    });


    // 별점평가.
    $(document).on('click', '.i-rate>button', starRate);

    $(document).on('focus', '.itextarea > textarea', txtAreaIn)
        .on(' blur', '.itextarea > textarea', txtAreaOut);


    // 여행일정 탭
    $('.tabs a').on('click', function() {
        var activeTab = $(this).attr('data');
        $('.tabs a').removeClass('active');
        $('div.tabData').removeClass('active');
        $('div#' + activeTab).addClass('active');
        $(this).addClass('active');
        if ($(this).find("span").hasClass("map")) {

            // mapData
            $('#mapData').bxSlider({
                auto: false,
                adaptiveHeight: true,
                pager: false
            });
        }
    });

    // 달력
    $('.btnDate').on('click', function() {
        $('div.datePicker').css('display', 'block');
    });
    $('div.datePicker .btn.close').on('click', function() {
        $('div.datePicker').removeAttr('style');
    });

    //Image to Background
    $(".sec-body .sublink li").each(function() {
        $(this).css("background", "url('" + $(this).find('img').attr("src") + "') center / cover");
    });

    //search
    $('fieldset.search input[type="text"]').focus(function() {
        $('fieldset.search').addClass('focus');
    });
    $('fieldset.search input[type="text"]').focusout(function() {
        $('fieldset.search').removeClass('focus');
    });

    $('#mapArea .btn.all').click(function() {
        $('.popup.all').toggle();

    });
    $('.mapAllList .btn.show').click(function() {

        $(this).parent().find('div.on').toggle();
        $(this).parent().find('div.off').toggle();
    });
    $('button.showStation').click(function() {
        $(this).parent().find('ul.station').toggle();

    });

    $('ul.collapse h3').click(function() {
        $(this).parent().find('dl').toggle();
    });
    $('p.toggle').click(function() {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('.line-table').removeAttr('style');
        } else {
            $(this).addClass('on');
            $('.line-table').css('display', 'table');
        }
    });

});
