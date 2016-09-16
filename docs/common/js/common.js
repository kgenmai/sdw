/**
* jquery.matchHeight-min.js master
* http://brm.io/jquery-match-height/
* License: MIT
*/
(function(c){var n=-1,f=-1,g=function(a){return parseFloat(a)||0},r=function(a){var b=null,d=[];c(a).each(function(){var a=c(this),k=a.offset().top-g(a.css("margin-top")),l=0<d.length?d[d.length-1]:null;null===l?d.push(a):1>=Math.floor(Math.abs(b-k))?d[d.length-1]=l.add(a):d.push(a);b=k});return d},p=function(a){var b={byRow:!0,property:"height",target:null,remove:!1};if("object"===typeof a)return c.extend(b,a);"boolean"===typeof a?b.byRow=a:"remove"===a&&(b.remove=!0);return b},b=c.fn.matchHeight=
function(a){a=p(a);if(a.remove){var e=this;this.css(a.property,"");c.each(b._groups,function(a,b){b.elements=b.elements.not(e)});return this}if(1>=this.length&&!a.target)return this;b._groups.push({elements:this,options:a});b._apply(this,a);return this};b._groups=[];b._throttle=80;b._maintainScroll=!1;b._beforeUpdate=null;b._afterUpdate=null;b._apply=function(a,e){var d=p(e),h=c(a),k=[h],l=c(window).scrollTop(),f=c("html").outerHeight(!0),m=h.parents().filter(":hidden");m.each(function(){var a=c(this);
a.data("style-cache",a.attr("style"))});m.css("display","block");d.byRow&&!d.target&&(h.each(function(){var a=c(this),b=a.css("display");"inline-block"!==b&&"inline-flex"!==b&&(b="block");a.data("style-cache",a.attr("style"));a.css({display:b,"padding-top":"0","padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px"})}),k=r(h),h.each(function(){var a=c(this);a.attr("style",a.data("style-cache")||"")}));c.each(k,function(a,b){var e=c(b),
f=0;if(d.target)f=d.target.outerHeight(!1);else{if(d.byRow&&1>=e.length){e.css(d.property,"");return}e.each(function(){var a=c(this),b=a.css("display");"inline-block"!==b&&"inline-flex"!==b&&(b="block");b={display:b};b[d.property]="";a.css(b);a.outerHeight(!1)>f&&(f=a.outerHeight(!1));a.css("display","")})}e.each(function(){var a=c(this),b=0;d.target&&a.is(d.target)||("border-box"!==a.css("box-sizing")&&(b+=g(a.css("border-top-width"))+g(a.css("border-bottom-width")),b+=g(a.css("padding-top"))+g(a.css("padding-bottom"))),
a.css(d.property,f-b+"px"))})});m.each(function(){var a=c(this);a.attr("style",a.data("style-cache")||null)});b._maintainScroll&&c(window).scrollTop(l/f*c("html").outerHeight(!0));return this};b._applyDataApi=function(){var a={};c("[data-match-height], [data-mh]").each(function(){var b=c(this),d=b.attr("data-mh")||b.attr("data-match-height");a[d]=d in a?a[d].add(b):b});c.each(a,function(){this.matchHeight(!0)})};var q=function(a){b._beforeUpdate&&b._beforeUpdate(a,b._groups);c.each(b._groups,function(){b._apply(this.elements,
this.options)});b._afterUpdate&&b._afterUpdate(a,b._groups)};b._update=function(a,e){if(e&&"resize"===e.type){var d=c(window).width();if(d===n)return;n=d}a?-1===f&&(f=setTimeout(function(){q(e);f=-1},b._throttle)):q(e)};c(b._applyDataApi);c(window).bind("load",function(a){b._update(!1,a)});c(window).bind("resize orientationchange",function(a){b._update(!0,a)})})(jQuery);


/*******************************/
window.jQuery && (function ($) {
    'use strict';

    var $doc = $(document);
    var $win = $(window);

    $doc.ready(function () {
        (function () {
            var $root = $('.js-toggle');
            var isOpen = 'is-open';
            var duration = 300;

            if ($root.length <= 0) {
                return;
            }

            $root.each(function (){
                var $this = $(this);
                var $hook = $this.find('.js-toggle-hook');
                var $content = $this.find('.js-toggle-content');

                $hook.on('click', function (e) {
                    e.preventDefault();

                    if ($root.hasClass(isOpen) === true) {
                        $content.not(':animated').slideUp(duration, function () {
                            $root.removeClass(isOpen);
                        });
                    } else {
                        $content.not(':animated').slideDown(duration, function () {
                            $root.addClass(isOpen);
                        });
                    }
                });
            });
        }());
    });

    /**
     * 高さ揃え
     * @author http://brm.io/jquery-match-height/
     */
    $win.on('load', function () {
        var i;
        var len;
        var target = [
            ['.s-gnav_list', '.s-gnav_list-item'],
            ['.m-tmb_list', '> li'],
            ['.m-link_movie_list', '> li']
        ];

        for (i = 0, len = target.length; i < len; i++) {
            $(target[i][0]).find(target[i][1]).matchHeight();
        }
    });
})(window.jQuery);

(function($){
    var scrollBackToTop = {"scrollDuration":"500","fadeDuration":"0.5"};

    $(function(){
        if(typeof scrollBackToTop.autoFontSize !== 'undefined' && scrollBackToTop.autoFontSize){
            $('.scroll-back-to-top-wrapper').textfill({ maxFontPixels: 36 });
        }

        $('.scroll-back-to-top-wrapper').on('click', function(e){
            e.preventDefault();
            if(typeof scrollBackToTop.scrollDuration !== 'undefined'){
                scrollToElement("body", scrollBackToTop.scrollDuration, 0);
            }
        });

        $(document).on( 'scroll', function(){

            if ($(window).scrollTop() > 100) {
                $('.scroll-back-to-top-wrapper').addClass('show');
            } else {
                $('.scroll-back-to-top-wrapper').removeClass('show');
            }
        });

        if(typeof scrollBackToTop.visibilityDuration !== 'undefined' && scrollBackToTop.visibilityDuration){
            $(window).on('scroll', function() {
                clearTimeout($.data(this, 'sbttScrollTimer'));
                $.data(this, 'sbttScrollTimer', setTimeout(function() {
                    $('.scroll-back-to-top-wrapper').removeClass('show');
                }, scrollBackToTop.visibilityDuration));
            });
        }
    });

    function scrollToElement(selector, time, verticalOffset) {
        var element, time, verticalOffset, offset, offsetTop;
        time = typeof(time) != 'undefined' ? time : 1000;
        verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
        element = $(selector);
        offset = element.offset();
        offsetTop = offset.top + verticalOffset;
        $('html, body').animate({scrollTop: offsetTop}, parseInt(time), 'linear');
    }

    function isFullyVisible(el) {

        if ( ! el.length ) {
            return false;
        }

        if ( el instanceof jQuery ) {
            el = el[0];
        }

        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while(el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
                top >= window.pageYOffset &&
                left >= window.pageXOffset &&
                (top + height) <= (window.pageYOffset + window.innerHeight) &&
                (left + width) <= (window.pageXOffset + window.innerWidth)
               );
    }

    function isPartiallyVisible(el) {

        if ( ! el.length ) {
            return false;
        }

        if ( el instanceof jQuery ) {
            el = el[0];
        }

        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while(el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
                top < (window.pageYOffset + window.innerHeight) &&
                left < (window.pageXOffset + window.innerWidth) &&
                (top + height) > window.pageYOffset &&
                (left + width) > window.pageXOffset
               );
    }
})(jQuery);


// ページ内リンクのスクロール
$(function() {
  // スクロールのオフセット値
  var offsetY = -10;
  // スクロールにかかる時間
  var time = 500;

  // ページ内リンクのみを取得
  $('a[href^=#]').click(function() {
    // 移動先となる要素を取得
    var target = $(this.hash);
    if (!target.length) return ;
    // 移動先となる値
    var targetY = (target.offset().top+offsetY)-50;
    // スクロールアニメーション
    $('html,body').animate({scrollTop: targetY}, time, 'swing');
    // ハッシュ書き換えとく
    window.history.pushState(null, null, this.hash);
    // デフォルトの処理はキャンセル
    return false;
  });
});


// クリックでモーダル表示
(function($) {
  // style
  var bgStyle = 'display: none;' +
                'width: 100%;' +
                'height: 2000px;' +
                'position: fixed;' +
                'top: 0;' +
                'left: 0;' +
                'z-index: 20000;' +
                'background: #ffffff;';

  var wrapStyle = 'display: none;' +
                  'width:' + ($(window).width() * 0.8) + 'px;' +
                  'height:' + ($(window).height() * 0.9) + 'px;' +
                  'margin: 0 0 0 -460px;' +
                  'position: fixed;' +
                  'top: 40px;' +
                  'left: 50%;' +
                  'z-index: 20001;' +
                  'background: #ffffff;';

  var btnStyle = 'display: none;' +
                 'width: 40px;' +
                 'height: 40px;' +
                 'position: fixed;' +
                 'top: 20px;' +
                 'right: 20px;' +
                 'z-index: 20002;' +
                 'background: rgba(0,0,0,0.8);' +
                 'border-radius: 50%;' +
                 'cursor: pointer;' +
                 'line-height: 40px;' +
                 'text-align: center;' +
                 'color: #ffffff';

  var html = '<div id="iframe-bg" style="' + bgStyle + '"></div>' +
             '<div id="iframe-wrap" style="' + wrapStyle + '"></div>' +
             '<div id="iframe-btn" style="' + btnStyle + '">X</div>';
  // add element
  $(html).appendTo('body');


  // click event
  $('.m-modallink').click(function () {
    var url = $(this).attr('href');
    $('#iframe-wrap').html('<iframe src="' + url + '" width="100%" height="100%" frameborder="0">');
    $('#iframe-bg').fadeTo('normal', 0.8);
    $('#iframe-wrap iframe').load(function () {
      // 呼び出し先のヘッダーとフッターを隠す
      //$(this).contents().find('#header, #footer').hide();
      $('#iframe-wrap').fadeIn();
      $('#iframe-btn').fadeIn();
    });
    return false;
  });
  $('#iframe-btn').click(function () {
    $('#iframe-bg, #iframe-btn, #iframe-wrap').fadeOut();
  });
  $('#iframe-bg').click(function () {
    $('#iframe-bg, #iframe-btn, #iframe-wrap').fadeOut();
  });
})(jQuery);