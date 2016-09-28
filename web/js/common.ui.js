/*!
 * common.ui.js
 * 공통 UI 스크립트 모음.
 */
var gnbMenu = function() {
    var _this = this;
    var wrapper = $('#gnb');
    var cateMenu = wrapper.find('>ul>li');
    var elements = wrapper.find('a, input, button');
    var subWrap = wrapper.find('.sub');
    var isOpen = false;
    var currentIndex;
    var _setOver = function() {
        isOpen = true;
        var $parent = $(this).closest('.cate-depth1');
        $parent.addClass('active');
    };
    var _setOut = function() {
        isOpen = false;
        setTimeout(function() {
            if (isOpen == false) {
                subWrap.hide();
                cateMenu.removeClass('active')
                currentIndex = null;
            }
        }, 300);
    };
    var _setActive = function() {
        isOpen = true;
        var index = $(this).parent().index();
        if (currentIndex == index) return;
        currentIndex = index;
        subWrap.hide();
        cateMenu.removeClass('active').eq(currentIndex).find('.sub').show();
    };
    var init = function() {
        cateMenu.find('>a').on({
            'focus mouseenter': _setActive,
            'mouseleave': _setOut
        });
        elements.on({
            'focus': _setOver,
            ' blur': _setOut
        });
        subWrap.on({
            'mouseenter': _setOver,
            'mouseleave': _setOut
        });
        $(window).on('resize scroll', function() {
            var t = $(window).scrollTop();
            subWrap.css('top', 75 - t);
            // isOpen = false;
            // subWrap.hide();
            // cateMenu.removeClass('active')
            // currentIndex = null;
        })
    };
    init();
}

function pageNavigator() {
    var $element = $('#indicator');
    var $container = $('#container');
    var $menus = $element.find('ul.indicator>li>a');
    var $menusParent = $element.find('ul.indicator>li');
    var $window = $(window);
    var top = $element.offset().top;
    $window.scroll(function() {
        var t = $window.scrollTop();
        if (t >= top) {
            $element.addClass('fixed');
            $('#header').addClass('fixed');
            $container.css('padding-top', '126px');
        } else {
            $element.removeClass('fixed');
            $('#header').removeClass('fixed');
            $container.css('padding-top', '');
        }
    });
    $menus.click(function() {
        $(this).parent().toggleClass('active');
        return false;
    });
    $menusParent.on({
        'mouseleave blur': function() {
            $(this).removeClass('active');
        }
    });
}
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
var magWidth = function() {
    var mag = ($(window).width() - 1160) / 2;
    $('#themeList').css('margin-left', mag).css('margin-right', mag);
}
$(document).ready(function() {
    gnbMenu();
    $('#gnb .sub.sub01 a').on('click mouseenter', function() {
        var activeTab = $(this).attr('class');
        $('#gnb .sub.sub01 ul').removeClass();
        $('#gnb .sub.sub01 ul').addClass(activeTab);
    });
    $('> li.language>a, >li.mypage>button', 'ul.util-menu ').click(function() {
        $(this).parent().toggleClass('active');
        return false;
    });
    $('> li.language, >li.mypage', 'ul.util-menu').on({
        'mouseleave blur': function() {
            $(this).removeClass('active');
        }
    });
    $('.img-section > ul > li > a').on({
        'mouseenter focus': function() {
            var $over = $(this).find('.over');
            //    $over.css({'top': '100%'}).stop().animate({'top': 0});
            $over.css('top', '0');
        },
        'mouseleave blur': function() {
            var $over = $(this).find('.over');
            $over.css('top', '100%');
        }
    });
    // Header 검색.
    $('#header .srch-area > .btn-srch').on('click', function() {
        $('#header .srch-field').fadeIn(200);
    });
    $('#header .srch-field .close > button').on('click', function() {
        $('#header .srch-field').fadeOut();
    });
    if ($('#indicator').length) {
        pageNavigator();
    }
    // 별점평가.
    $(document).on('click mouseenter', '.i-rate>button', starRate);
    $(document).on('focus', '.itextarea > textarea', txtAreaIn).on(' blur', '.itextarea > textarea', txtAreaOut);
    // 로그인 탭
    $('.member .tabs a').on('click', function() {
        var activeTab = $(this).attr('data');
        console.log(activeTab);
        if (!activeTab) {
            history.go(-1);
        } else {
            $('.tabs a').removeClass('active');
            $('div.tabContent').removeClass('active');
            $('div#' + activeTab).addClass('active');
            $(this).addClass('active');
        }
    });
    // 지역정보 탭
    $('.area.tabs a').on('click', function() {
        var activeTab = $(this).parent().attr('class');
        $('.tabs a').removeClass('active');
        $('div.tabData').removeClass('active');
        $('div#' + activeTab).addClass('active');
        $(this).addClass('active');
    });
    // 전체지역 탭
    $('.TripAll .tabs a').on('click', function() {
        var activeTab = $(this).parent().attr('class');
        $('.tabs a').removeClass('active');
        $('div.tabData').removeClass('active');
        $('div#' + activeTab).addClass('active');
        $(this).addClass('active');
    });
    // 검색 탭
    $('.sideBox .searchTab a').on('click', function() {
        var activeTab = $(this).attr('data');
        $('.searchTab a').removeClass('active');
        $('ul.tabData').removeClass('active');
        $('ul#' + activeTab).addClass('active');
        $(this).addClass('active');
    });
    // 지도 지역선택
    $('#map01Area li a').on('click', function() {
        var activeTab = $(this).parent().attr('id');
        $('#map01Area li').removeClass('active');
        $(this).parent().addClass('active');
        $('#map01Area').attr("class", "");
        $('#map01Area').addClass(activeTab);
        $('#map01Area .mapPop').css('display', 'none');
        $('#map01Area .mapPop.' + activeTab).css('display', 'block');
    });
    $('#map02Area li a').on('click', function() {
        var activeTab = $(this).parent().attr('id');
        $('#map02Area li').removeClass('active');
        $(this).parent().addClass('active');
        $('#map02Area .mapPop').css('display', 'none');
        $('#map02Area .mapPop.' + activeTab).css('display', 'block');
    });
    // 날짜선택 달력
    $('.btn-date').on('click', function() {
        $('.datePicker').show();
    });
    $('.datePicker .close').on('click', function() {
        $('.datePicker').hide();
    });
    $('.datePicker td').on('click', function() {
        $('.datePicker td').removeClass('checked');
        $(this).addClass('checked');
    });
    $('.sub-visual .pic').each(function() {
        $(this).css("background", "url('" + $(this).find("img").attr("src") + "') no-repeat 50% 50%");
    });
    $('div.mapPage aside .result div').mouseenter(function() {
        $(this).addClass("over");
    });
    $('div.mapPage aside .result div').mouseleave(function() {
        $(this).removeClass('over');
    });
    $('div.mapPage aside .result div.off button').click(function() {
        $('div.mapPage aside .result div.on').removeAttr('style');
        $('div.mapPage aside .result div.off').removeAttr('style');
        $(this).parent().css('display', 'none');
        $(this).parent().parent().find('div.on').css('display', 'block');
    });
    $('div.mapPage aside .result div.on button').click(function() {
        $('div.mapPage aside .result div.on').removeAttr('style');
        $('div.mapPage aside .result div.off').removeAttr('style');
    });
    $('div.mapPage .btn.all').click(function() {
        $('div.mapPage .popup.all').css('display', 'block');
    });
    $('div.mapPage .popup.all .btn.close').click(function() {
        $('div.mapPage .popup.all').removeAttr("style");
    });
    $('.searchInput .btn.detail').click(function() {
        if ($('div.searchDetail').css("display") == 'none') {
            $('div.searchDetail').css('height', $("html").height() - 199).css("display", "block");
        } else {
            $('div.searchDetail').css('height', $("html").height() - 199).css("display", "none");
        }
    });
    $('.searchDetail .btn-date').click(function() {
        $('div.datePicker').css('display', 'block').css("left", $(this).offset().left);
    });
    //렌터카
    $('a.carTable').click(function() {
        $('div.hiddenTable').toggle();
        $('a.carTable span.top').toggleClass('rotate');
    });
});
