function masonry() {
    var $grids = $('.grid');
    $grids.masonry({
        itemSelector: '.grid-item'
    });
    $grids.masonry('layout');

}

function mapData() {
    $('#mapData').bxSlider({
        auto: false,
        adaptiveHeight: true,
        pager: false
    });

}
$(document).ready(function() {
    mapData();

    // 여행일정 탭
    $('.tabs a').on('click', function() {
        var activeTab = $(this).attr('data');
        $('.tabs a').removeClass('active');
        $('div.tabData').removeClass('on');
        $('div#' + activeTab).addClass('on');
        $(this).addClass('active');

    });


    $(".photos li a.view").click(function() {
        $(".photoView").css('display', 'block');
        $('html').css('height', $(window).height());
        $('html').css('overflow', 'hidden');
    });
    $(".photoView .btn.close").click(function() {
        $(".photoView").css('display', 'none');
        $('html').css('height', 'auto');
        $('html').css('overflow', 'scroll');
    });

    $(".photoList a.view").click(function() {
        $(".photoView").css('display', 'block');
        $('html').css('height', $(window).height());
        $('html').css('overflow', 'hidden');
    });
    $(".photoView .btn.close").click(function() {
        $(".photoView").css('display', 'none');
        $('html').css('height', 'auto');
        $('html').css('overflow', 'scroll');
    });


    //Main Location
    $("button.location").click(function() {
        $("div.locationList").css("display", "block");
        $("body").bind('touchmove', function(e) {
            e.preventDefault()
        });
    });
    $("div.locationList button").click(function() {
        $("div.locationList").css("display", "none");
        $("body").unbind('touchmove');
    });
    $(".buttonGroup button.search").click(function() {
        $(".search.layer").toggle();
    });
    //Image to Background
    $(".articleList li.photo").each(function() {
        $(this).css("background", "url('" + $(this).find('img').attr("src") + "') center / cover");
    });
    //Sub Back
    $("header button.back").click(function() {
        history.go(-1);
    });
    //Sub View topImage
    if ($("body").hasClass("view")) {
        $('#subVisual').bxSlider({
            auto: true,
            controls: false,
            pager: true,
            pagerType: 'short'
        });
    }
    if ($("body").hasClass("main")) {
        var mainSlider = $('#mainHot .slider').bxSlider({
            auto: true,
            infiniteLoop: false,
            controls: false,
            pager: false,
            onSlideAfter: function() {
                var slide_count = mainSlider.getSlideCount();
                var slide_curr = mainSlider.getCurrentSlide() + 1;
                if (slide_count == slide_curr) {
                    $("#mainHot .more").addClass("on");
                } else {
                    $("#mainHot .more").removeClass("on");
                }
            }
        });
    }
    $(document).scroll(function() {
        var win_Y = 0;
        if ($("body").hasClass("view")) {
            var win_Y = $("div.info").offset().top;
        }
        var thisY = win_Y - $(window).scrollTop();
        var target1 = $("header");
        var target2 = $(".topImg")
        if (130 < (thisY)) {
            target1.removeClass('fade-background').addClass("fade-transparent");
        } else {
            target1.removeClass("fade-transparent").addClass('fade-background');
        }
        /*
        		if (414 < (thisY))
        		{
        			target2.css("height", thisY);
        		} else {
        			target2.css("height", "414px");
        		}
        */
        if ($(window).scrollTop() > 259) {
            $("nav.myPage").addClass("fixed");
        } else {
            $("nav.myPage").removeClass("fixed");
        }
    });
    $(".toggle").click(function() {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on")
        } else {
            $(this).addClass("on")
        }
    });
    jQuery.fn.center = function() {
        this.css("position", "absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
        return this;
    }
    $(".popupBtn").click(function() {
        var thisName = $(this).attr("data");
        $("div.popup").hide();
        $("div.popup." + thisName).show();
        $("div.popup." + thisName).center();
    });
    $("div.popup button.close").click(function() {
        $(this).parent().hide();
    });
    $("div.popup button.star").click(function() {
        var starValue = $(this).attr("data");
        $("div.popup button.star").removeClass("on");
        $("div.popup button.star").each(function() {
            if ($(this).attr("data") <= starValue) {
                $(this).addClass("on");
            }
        });
    });
    $("div.btnReview .write").click(function() {
        $("div.talkInput").show();
    });
    $("body.view .talkInput .btn").click(function() {
        $("div.talkInput").hide();
    });
    $("div.schedule nav.date").each(function() {
        var dayCount = $("div.schedule nav.date li").size();
        $("div.schedule nav.date li").css("width", "calc(100% / " + dayCount + ")");
    });
    $("body.myPage .dotLine").each(function() {
        var bgPosition = $("nav.date li.active a").offset().left + 23;
        $(this).css("left", bgPosition);
    });
    $("div.searchInput input").focus(function() {
        $("h3.question").css("display", "none");
    });
    // Bind the swipeleftHandler callback function to the swipe event on div.box
    $("div.talkList ul.myTalk .line").on("swipeleft", function() {
        $(this).find("a").animate({
            left: "-80",
        }, 200, function() {
            // Animation complete.
        });
    });
    $("div.talkList ul.myTalk .line").on("swiperight", function() {
        $(this).find("a").animate({
            left: "0",
        }, 200, function() {
            // Animation complete.
        });
    });
});
