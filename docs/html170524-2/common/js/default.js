
/*------------------------------------------------------------------------
Common
-------------------------------------------------------------------------*/

/*------------------------------------------------------------------------
Media Type, User Agent
-------------------------------------------------------------------------*/

var uA = navigator.userAgent;

//閲覧端末??pc,tab,sp
var terminal = terminalCh();
//OS??ios,android,mac,win
var os = osCh();
//ブラウザ??edge,ie11,ie10,ie9,ie8,firefox,safari,chrome,other			
var browser = browserCh();	
//Android ver??android42,android44,android5
var androidVersion;
//表示タイプ：pc,tab,sp
var media;

function terminalCh(){
	if (uA.indexOf('iPhone') > -1) return "sp";
	if (uA.indexOf('iPod') > -1) return "sp";
	if (uA.indexOf('iPad') > -1) return "tab";
	if (uA.indexOf('Android') > -1){
		androidVersion = androidVersionCh();
		if (uA.indexOf('Mobile') > -1 && uA.indexOf('SC-01C') > -1) return "tab"; //GALAXY Tab SC-01C
		if (uA.indexOf('Mobile') > -1) return "sp";
		return "Tablet";
	}
	if (uA.indexOf("Mac") != -1) return "pc";
	if (uA.indexOf("Win") != -1) return "pc";
	return "unknown";
}
function osCh(){
	if (uA.indexOf('iPhone') > -1 || uA.indexOf('iPod') > -1 || uA.indexOf('iPad') > -1) return "ios";
	if (uA.indexOf('Android') > -1) return "android";
	if (uA.indexOf("Mac") != -1) return "mac";
	if (uA.indexOf("Win") != -1) return "win";
	return "unknown";
}
function browserCh(){
	if (uA.indexOf("Edge") != -1){
		return "edge";
	}else if (uA.indexOf("MSIE") != -1 || uA.indexOf("Trident") != -1){
		return IEversionCh();
	}else if (uA.indexOf("Firefox") != -1){
		return "firefox";
	}else {
		if(osCh() != "Android"){
			if (uA.indexOf("Safari") != -1 && uA.indexOf("Chrome") == -1){
				return "safari";
			}else if (uA.indexOf("Chrome") != -1){
				return "chrome";
			}else{
				return "other";
			}
		}else{
			if (uA.indexOf("Chrome") != -1){
				return "chrome";
			}else{
				return "other";
			}
		}
	}
}
function IEversionCh(){
	if(uA.indexOf("MSIE 11") != -1 || uA.indexOf("rv:11") != -1) return "ie11";
	if(uA.indexOf("MSIE 10") != -1) return "ie10";
	if(uA.indexOf("MSIE 9") != -1) return "ie9";
	if(uA.indexOf("MSIE 8") != -1) return "ie8";
	if(window.performance != undefined) return "ie8";
	var h = document.getElementsByTagName("head")[0];
	if(h.style.msBlockProgression != undefined) return "ie8";
	if(h.style.msInterpolationMode != undefined) return "ie7";
	if(h.style.textOverflow != undefined) return "ie6";
	return "unknown";
}
function androidVersionCh(){
	var uaLowerCase = uA.toLowerCase();
    var version = uaLowerCase.substr(uaLowerCase.indexOf('android')+8, 3);
    return version;
}


/*------------------------------------------------------------------------
Viewport
-------------------------------------------------------------------------*/

if(terminal == "tab"){ //TAB

	media = "tab";

	if(os == "android"){
	    document.querySelector("[name=viewport]").setAttribute('content','target-densitydpi=device-dpi, width=1090, user-scalable=yes');
	}else{
		document.querySelector("[name=viewport]").setAttribute('content','width=1090, user-scalable=yes');
	}

}else if(terminal == "sp"){ //SP

	media = "sp";

	if(os == "android"){
	    document.querySelector("[name=viewport]").setAttribute('content','target-densitydpi=device-dpi, width=640, user-scalable=yes');
	}else{
		document.querySelector("[name=viewport]").setAttribute('content','width=640, user-scalable=yes');
	}

}else { //PC

	media = "pc";
}


/*------------------------------------------------------------------------
Initialize
-------------------------------------------------------------------------*/

/* 端末a??2覧a???±追a??
-------------------------------------*/

j$(function(){


//PC・SPがa?かれるa?ージのSPをPCで閲覧した場合a?、強制c???≪SP表示	
if(j$("a#top").length){
	terminal = "sp";
	media = "sp";
	document.querySelector("[name=viewport]").setAttribute('content','width=640, user-scalable=yes');
}

//IE、Android バa?ジョン変換

if(browser == "ie6" || browser == "ie7" || browser == "ie8"){ //IE6,7,8
	browser = "ie8";
	
}else if(os == "android"){
	if(Number(androidVersion) < 4.3 ){ //4.2
		os = "android42";
	}else if(Number(androidVersion) < 5 ){ //4.4
		os = "android44";
	}else{ //5a?
		os = "android5";
	}
}

j$("body").addClass("terminal_"+terminal.toLowerCase());
j$("body").addClass("os_"+os.toLowerCase());
j$("body").addClass("browser_"+browser.toLowerCase());
j$("body").addClass("media_"+media);

});

j$(function(){

/* 初期動作設aR?
-------------------------------------*/

if(terminal == "tab"){ //TAB
	
	if(os == "android42" || os == "android44" || os == "android5"){ //Android
	    j$("meta[name='viewport']").attr('content','target-densitydpi=device-dpi, width=1090, user-scalable=yes');
		
	}else{ //iOS
		j$("meta[name='viewport']").attr('content','width=1090, user-scalable=yes');
	}
    
	j$('head link').each(function(){
		if(j$(this).attr("href") == "/files/user/css/sp/parts.css" || j$(this).attr("href") == "/files/user/css/sp/customize.css"){
			j$(this).attr("media","only screen and (max-width: 0px)")
		}
	});
    
    if(os != "ios"){
		if( window.matchMedia('(max-width:640px)').matches ){
			j$("body").css("zoom",window.innerWidth/640);
		}else{
			j$("body").css("zoom",window.innerWidth/1090);
		}
		setTimeout(function(){
			if( window.matchMedia('(max-width:640px)').matches ){
				j$("body").css("zoom",window.innerWidth/640);
			}else{
				j$("body").css("zoom",window.innerWidth/1090);
			}
		}, 300);
		j$(window).on("orientationchange",function(){
			if( window.matchMedia('(max-width:640px)').matches ){
				j$("body").css("zoom",window.innerWidth/640);
			}else{
				j$("body").css("zoom",window.innerWidth/1090);
			}
			setTimeout(function(){
				if( window.matchMedia('(max-width:640px)').matches ){
					j$("body").css("zoom",window.innerWidth/640);
				}else{
					j$("body").css("zoom",window.innerWidth/1090);
				}
			}, 300);
		});
	}

} else if(terminal == "sp"){ //SP
	
	if(os == "android42" || os == "android44" || os == "android5"){ //Android
    	j$("meta[name='viewport']").attr('content','target-densitydpi=device-dpi, width=640, user-scalable=yes');
    	j$("body").css("zoom",window.innerWidth/640);
    	setTimeout(function(){
	    	j$("body").css("zoom",window.innerWidth/640);
		}, 300);
		j$(window).on("orientationchange resize",function(){
	    	j$("body").css("zoom",window.innerWidth/640);
		});
		
    }else{ //iOS
    	j$("meta[name='viewport']").attr('content','width=640, user-scalable=yes');
	}

} else { //PC
	
	if(browser == "safari" || browser == "chrome"){
		var css = '<link rel="stylesheet" href="/files/user/css/font.css">';
	}else{
		var css = '<link rel="stylesheet" href="/files/user/css/font.css?'+j$.now()+'">';
	}
    j$('head link:first').after(css);
	
	j$('head link').each(function(){
		if(j$(this).attr("href") == "/files/user/css/sp/parts.css" || j$(this).attr("href") == "/files/user/css/sp/customize.css"){
			j$(this).attr("media","only screen and (max-width: 0px)")
		}
	});
}

});


/*------------------------------------------------------------------------
Common??BTN RollOver
-------------------------------------------------------------------------*/

j$(function(){
	
	//除外e???R
	j$("#global_navi a").each(function(){
		j$(this).addClass("rover");
	});
	j$("#footpath a").each(function(){
		j$(this).addClass("rover");
	});
	
	//汎用??a
	j$('a').on('mouseenter', function(e) {
		if(media == "pc"){
			if(!j$(this).hasClass("rover")){
				j$(this).stop().fadeTo("600",0.6);
			}
		}else{
			e.preventDefault();
		}
	});
	j$('a').on('mouseleave', function(e) {
		if(media == "pc"){
			if(!j$(this).hasClass("rover")){
				j$(this).stop().fadeTo("300",1);
			}
		}else{
			e.preventDefault();
		}
	});
	
	//汎用??input[type='submit']
	j$("input[type='submit']").on('mouseenter', function(e) {
		if(media == "pc"){
			if(!j$(this).hasClass("rover")){
				j$(this).stop().fadeTo("600",0.6);
			}
		}else{
			e.preventDefault();
		}
	});
	j$("input[type='submit']").on('mouseleave', function(e) {
		if(media == "pc"){
			if(!j$(this).hasClass("rover")){
				j$(this).stop().fadeTo("300",1);
			}
		}else{
			e.preventDefault();
		}
	});
	
	//例a??
	j$('.boxSocial ul .line').on('mouseenter', function(e) {
		if(media == "pc"){
			j$(this).stop().fadeTo("600",0.6);
		}else{
			e.preventDefault();
		}
	});
	j$('.boxSocial ul .line').on('mouseleave', function(e) {
		if(media == "pc"){
			j$(this).stop().fadeTo("600",0.6);
		}else{
			e.preventDefault();
		}
	});
});


/*------------------------------------------------------------------------
Common??PageTOP BTN
-------------------------------------------------------------------------*/

j$(function(){

j$('.btn_pagetop').on('click',function (e) {
	e.preventDefault();
	j$('body,html').animate({scrollTop: 0},{duration: 1000, easing: 'easeInOutQuart'});
	return false;
});

});


/*------------------------------------------------------------------------
Common??Anchor BTN
-------------------------------------------------------------------------*/

j$(function(){

j$('a[href^=#],area[href^=#]').not('.btn_next,.btn_prev').on("click",function(e){

	if(j$(this.hash).length){
		e.preventDefault();
		var ta = j$(this.hash);
		//var szoom = j$("html").css("zoom");
		
		if(media == "tab"){ //TAB
			var yy = ta.offset().top - 30;
	
		} else if (media == "sp"){ //SP
			var yy = ta.offset().top - 30;
			
		} else { //PC
			//var yy = target.get(0).offsetTop - 30;
			var yy = ta.offset().top - 30;
	
		}
		
		j$('html,body').animate({scrollTop: yy},{duration:1000, easing:'easeOutQuart'});
		return false;
	}
});


function onAnchorLink(){

	if(location.hash && j$(location.hash).length){
		
		if(browser == "ie8" || browser == "ie9" || browser == "ie10" || browser == "ie11" || browser == "edge"){
			var stime = 300;
		}else{
			var stime = 100;
		}
		setTimeout(function(){
			
			j$('html,body').animate({scrollTop: 0},{duration:0});
			
			var ta = j$(String(location.hash));
			//var szoom = $("body").css("zoom");
	
			if(media == "tab"){ //TAB
				var yy = ta.offset().top - 30;
	
			} else if (media == "sp"){ //SP
				var yy = ta.offset().top - 30;
				
			} else { //PC
				var yy = ta.offset().top - 30;
	
			}
			j$('html,body').animate({scrollTop: yy},{duration:1000, easing:'easeOutQuart'});
			return false;
		}, stime);
	}
}

onAnchorLink();


});


/*------------------------------------------------------------------------
Common??Footer
-------------------------------------------------------------------------*/

j$(function(){

if(media != "sp"){ //PC・TAB
	j$("#footer ul li a").tile(4);

}else{ //SP
	j$("#footer ul li a").tile(2);
}

});


/*------------------------------------------------------------------------
Common??#top_contents 表示判aR?
-------------------------------------------------------------------------*/

j$(function(){
	if(!j$("#top_contents").find("a,p,div,span,ul,ol,dl").length){
		j$("#top_contents").css("display","none");
	}

});




/*------------------------------------------------------------------------
Parts
-------------------------------------------------------------------------*/

/*------------------------------------------------------------------------
Parts??Main Slider
-------------------------------------------------------------------------*/

j$(function(){

var slider_num = j$('#top_contents .mv_slider li').length;

//TOP
//------------------------------------------------------------

if(j$("#top").length){
if(media != "sp"){ //PC・TAB
	
	j$("#top_contents .mv_slider li").imagesLoaded(function(){
	
	if(slider_num > 1){ //スライダー有効
		
		var stimer;
		
		var mvSlider = j$('#top_contents .mv_slider').bxSlider({
			minSlides: 1,
			maxSlides: 1,
			moveSlides: 1,
			slideMargin: 0,
			startSlide: 0,
			useCSS: false,
			touchEnabled: true,
			pager: true,
			infiniteLoop: true,
			onSlideBefore: function(){
				clearTimeout(stimer);
			},
			onSlideAfter: function(){
				j$('#top_contents .mv_slider a').on('mouseenter', function(e) {
					j$(this).stop(true,false).fadeTo("600",0.6);
				});
				j$('#top_contents .mv_slider a').on('mouseleave', function(e) {
					j$(this).stop(true,false).fadeTo("300",1.0);
				});
		    	stimer = setTimeout(function(){
					j$('#top_contents .bx-wrapper .bx-next').trigger("click");
				},5000);
			}
		});
		
		j$('#top_contents .btnNext').click(function(e) {
			e.preventDefault();
			j$('#top_contents .bx-wrapper .bx-next').trigger("click");
		});
		j$('#top_contents .btnPrev').click(function(e) {
			e.preventDefault();
			j$('#top_contents .bx-wrapper .bx-prev').trigger("click");
		});
		
		stimer = setTimeout(function(){
			j$('#top_contents .bx-wrapper .bx-next').trigger("click");
		},5000);
		
		
	}else{ //??枚
		var mvSlider = j$('#top_contents .mv_slider').bxSlider({
			minSlides: 1,
			maxSlides: 1,
			moveSlides: 1,
			slideMargin: 0,
			startSlide: 0,
			useCSS: false,
			touchEnabled: false,
			pager: false,
			infiniteLoop: true
		});
		
	}
	});
	
	j$(window).resize(function() {
	    mvPosFix();
	});
	
    function mvPosFix(){
	    var ml = (j$(window).width()/2)*-1;
	    
	    if(j$(window).width() >= 1224){
	    	j$("#top_contents .mv_top_01").css('margin-left',ml);
	    }else{
	    	j$("#top_contents .mv_top_01").css('margin-left','-612px');
	    }
    }
    mvPosFix();


}else{ //SP
	
	j$("#top_contents .mv_slider li").imagesLoaded(function(){
	
	if(slider_num > 1){ //スライダー有効
		
		var stimer;
		
		var mvSlider = j$('#top_contents .mv_slider').bxSlider({
			minSlides: 1,
			maxSlides: 1,
			moveSlides: 1,
			slideMargin: 0,
			startSlide: 0,
			useCSS: false,
			touchEnabled: true,
			pager: true,
			infiniteLoop: true,
			onSlideBefore: function(){
				clearTimeout(stimer);
			},
			onSlideAfter: function(){
		    	stimer = setTimeout(function(){
					j$('#top_contents .bx-wrapper .bx-next').trigger("click");
				},5000);
			}
		});
		
		j$('#top_contents .btnNext').click(function(e) {
			e.preventDefault();
			j$('#top_contents .bx-wrapper .bx-next').trigger("click");
		});
		j$('#top_contents .btnPrev').click(function(e) {
			e.preventDefault();
			j$('#top_contents .bx-wrapper .bx-prev').trigger("click");
		});
		
		stimer = setTimeout(function(){
			j$('#top_contents .bx-wrapper .bx-next').trigger("click");
		},5000);
		
		
	}else{ //??枚
		var mvSlider = j$('#top_contents .mv_slider').bxSlider({
			minSlides: 1,
			maxSlides: 1,
			moveSlides: 1,
			slideMargin: 0,
			startSlide: 0,
			useCSS: false,
			touchEnabled: false,
			pager: false,
			infiniteLoop: true
		});
		
	}
	});
}


//contens
//------------------------------------------------------------

}else {


if(media != "sp"){ //PC・TAB
	
	j$("#top_contents .mv_slider li").imagesLoaded(function(){
	
	if(slider_num > 1){ //スライダー有効
		var stimer;
		
		var mvSlider = j$('#top_contents .mv_slider').bxSlider({
			slideWidth: 526,
			minSlides: 1,
			maxSlides: 1,
			moveSlides: 1,
			slideMargin: 0,
			startSlide: 0,
			useCSS: false,
			mode: 'fade',
			speed: 800,
			touchEnabled: true,
			pager: true,
			infiniteLoop: true,
			onSlideBefore: function(){
				//j$(window).stopTime("mvSlider");
				clearTimeout(stimer);
			},
			onSlideAfter: function(){
				j$('#top_contents .mv_slider a').on('mouseenter', function(e) {
					j$(this).stop(true,false).fadeTo("600",0.6);
				});
				j$('#top_contents .mv_slider a').on('mouseleave', function(e) {
					j$(this).stop(true,false).fadeTo("300",1.0);
				});
		    	stimer = setTimeout(function(){
					j$('#top_contents .bx-wrapper .bx-next').trigger("click");
				},5000);
			}
		});
		
		
		j$('#top_contents .btnNext').click(function(e) {
			e.preventDefault();
			j$('#top_contents .bx-wrapper .bx-next').trigger("click");
		});
		j$('#top_contents .btnPrev').click(function(e) {
			e.preventDefault();
			j$('#top_contents .bx-wrapper .bx-prev').trigger("click");
		});
		
		stimer = setTimeout(function(){
			j$('#top_contents .bx-wrapper .bx-next').trigger("click");
		},5000);
		
		
	}else{ //??枚
		
		var mvSlider = j$('#top_contents .mv_slider').bxSlider({
			slideWidth: 526,
			minSlides: 1,
			maxSlides: 1,
			moveSlides: 1,
			slideMargin: 0,
			startSlide: 0,
			useCSS: false,
			mode: 'fade',
			speed: 800,
			touchEnabled: false,
			pager: false,
			infiniteLoop: true
		});
	}
	});

}else{ //SP

	
	j$("#top_contents .mv_slider li").imagesLoaded(function(){
	
	if(slider_num > 1){ //スライダー有効
		
		var stimer;
		
		var mvSlider = j$('#top_contents .mv_slider').bxSlider({
			//slideWidth: 4000,
			minSlides: 1,
			maxSlides: 1,
			moveSlides: 1,
			slideMargin: 0,
			startSlide: 0,
			useCSS: false,
			touchEnabled: true,
			pager: true,
			infiniteLoop: true,
			onSlideBefore: function(){
				//j$(window).stopTime("mvSlider");
				clearTimeout(stimer);
			},
			onSlideAfter: function(){
		    	stimer = setTimeout(function(){
					j$('#top_contents .bx-wrapper .bx-next').trigger("click");
				},5000);
			}
		});
		
		j$('#top_contents .btnNext').click(function(e) {
			e.preventDefault();
			j$('#top_contents .bx-wrapper .bx-next').trigger("click");
		});
		j$('#top_contents .btnPrev').click(function(e) {
			e.preventDefault();
			j$('#top_contents .bx-wrapper .bx-prev').trigger("click");
		});
		
		stimer = setTimeout(function(){
			j$('#top_contents .bx-wrapper .bx-next').trigger("click");
		},5000);
		
		
	}else{ //??枚
		
		var mvSlider = j$('#top_contents .mv_slider').bxSlider({
			minSlides: 1,
			maxSlides: 1,
			moveSlides: 1,
			slideMargin: 0,
			startSlide: 0,
			useCSS: false,
			touchEnabled: false,
			pager: false,
			infiniteLoop: true
		});
	}
	});
}



}

});


/*------------------------------------------------------------------------
Parts??Main Nav 01
-------------------------------------------------------------------------*/

j$(function(){

if(media != "sp"){ //PC・TAB

j$('.media_pc .main_nav_01 .main li a').on({
'mouseenter': function(e) {
	j$(this).find(".cover").stop().fadeTo("600",0);
	j$(this).find(".btn_detail").stop().fadeTo("600",0.7);
},
'mouseleave': function(e) {
	j$(this).find(".cover").stop().fadeTo("600",0.7);
	j$(this).find(".btn_detail").stop().fadeTo("600",1);
}
});

if(browser.indexOf("ie") != -1){

j$('.main_nav_01 .main li a').each(function(){
	j$(this).after("<div class='btn_ie'></div>");
});

j$('.media_pc .main_nav_01 .main li .btn_ie').on({
'mouseenter': function(e) {
	j$(this).parent().find(".cover").stop().fadeTo("600",0);
	j$(this).parent().find(".btn_detail").stop().fadeTo("600",0.7);
},
'mouseleave': function(e) {
	j$(this).parent().find(".cover").stop().fadeTo("600",0.45);
	j$(this).parent().find(".btn_detail").stop().fadeTo("600",1);
}
});
}
}
});


/*------------------------------------------------------------------------
Parts??News Newアイコン追a????本日a?7日e??
-------------------------------------------------------------------------*/

j$(function(){

function onCheckNews() {
	var now = new Date();
	y = String(now.getFullYear());
	m = String(now.getMonth() + 1);
	d = String(now.getDate());
	
	var today = y+"/"+m+"/"+d;
	//console.log(today);
	
	if(j$('.box_news_01').length){
	j$('.box_news_01 li').each(function () {
		//開始日
		//var date1Str = $(this).find(".date").text().split(".").join("/");
		var date1Str = j$(this).find(".date").text().split("年").join("/").split("a??").join("/").split("日").join("");
		//終ao??\
		var date2Str = today;
		//NEWアイコン掲載期e??
		if(j$(this).closest('.news_index_list').length){
			var dateSpan = 14;
		} else {
			var dateSpan = 7;
		}

		//console.log(date1Str+" "+date2Str+" "+dateSpan);
		
		var date1 = new Date(date1Str);
		var date2 = new Date(date2Str);
	
		var msDiff = date2.getTime() - date1.getTime();
		var daysDiff = Math.floor(msDiff / (1000 * 60 * 60 *24));
	
		//++daysDiff;
		//console.log(daysDiff);
		if(daysDiff < dateSpan){
			j$(this).addClass("new");
			j$(this).find(".txt").after("<p class='new'><span>NEW</span></p>");
		}
		

	});
	}
	
}

onCheckNews();

});


/*------------------------------------------------------------------------
Parts??box_slider_01
-------------------------------------------------------------------------*/

j$(function(){

j$(".box_slider_01").each(function(){
	var ta = j$(this);
	var slider_num = ta.find('li').length;
	
	if(media != "sp"){ //PC・TAB
	
		ta.find('li').imagesLoaded(function(){
		
		if(slider_num > 3){ //スライダー有効
			
			var stimer;
			
			var slider = ta.find('.slider').bxSlider({
				slideWidth: 335,
				minSlides: 1,
				maxSlides: 3,
				moveSlides: 1,
				slideMargin: 0,
				startSlide: 0,
				useCSS: false,
				touchEnabled: true,
				pager: false,
				infiniteLoop: true,
				onSlideBefore: function(){
					clearTimeout(stimer);
				},
				onSlideAfter: function(){
					ta.find('.slider a').on('mouseenter', function(e) {
						j$(this).stop(true,false).fadeTo("600",0.6);
					});
					ta.find('.slider a').on('mouseleave', function(e) {
						j$(this).stop(true,false).fadeTo("300",1.0);
					});
					if(!ta.hasClass("pc_autoplay_false")){
						stimer = setTimeout(function(){
							ta.find('.bx-wrapper .bx-next').trigger("click");
						},5000);
					}
				}
			});
			
			ta.find('.btn_next').click(function(e) {
				e.preventDefault();
				ta.find('.bx-wrapper .bx-next').trigger("click");
			});
			ta.find('.btn_prev').click(function(e) {
				e.preventDefault();
				ta.find('.bx-wrapper .bx-prev').trigger("click");
			});
			
			if(!ta.hasClass("pc_autoplay_false")){
				stimer = setTimeout(function(){
					ta.find('.bx-wrapper .bx-next').trigger("click");
				},5000);
			}
			
			
		}else{ //3a??
			
			var slider = ta.find('.slider').bxSlider({
				slideWidth: 335,
				minSlides: 1,
				maxSlides: 3,
				moveSlides: 1,
				slideMargin: 0,
				startSlide: 0,
				useCSS: false,
				touchEnabled: false,
				pager: false,
				infiniteLoop: true
			});
			ta.find('.btn_next').css("display","none");
			ta.find('.btn_prev').css("display","none");
		}
		});

	}else{ //SP
		
		
		//??枚の場合a?a???枚にe??￡?
		if(slider_num == 2){
			var clone1 = ta.find('.slider li:nth-child(1)').clone();
			var clone2 = ta.find('.slider li:nth-child(2)').clone();
    		ta.find('.slider').append(clone1);
    		ta.find('.slider').append(clone2);
		}
		
		//最後a?もa?をa?頭に移a??
		var slider_last = ta.find('li').filter(":last");
		ta.find('.slider').prepend(slider_last);
		
		ta.find('li').imagesLoaded(function(){
		
		if(slider_num > 1){ //スライダー有効
			
			var stimer;
			
			var slider = ta.find('.slider').bxSlider({
				slideWidth: 502,
				minSlides: 3,
				maxSlides: 3,
				moveSlides: 1,
				slideMargin: 0,
				startSlide: 0,
				useCSS: false,
				touchEnabled: true,
				pager: false,
				infiniteLoop: true,
				onSlideBefore: function(){
					clearTimeout(stimer);
				},
				onSlideAfter: function(){
					if(!ta.hasClass("sp_autoplay_false")){
						stimer = setTimeout(function(){
							ta.find('.bx-wrapper .bx-next').trigger("click");
						},5000);
					}
				}
			});
			
			ta.find('.btn_next').click(function(e) {
				e.preventDefault();
				ta.find('.bx-wrapper .bx-next').trigger("click");
			});
			ta.find('.btn_prev').click(function(e) {
				e.preventDefault();
				ta.find('.bx-wrapper .bx-prev').trigger("click");
			});
			
			if(!ta.hasClass("sp_autoplay_false")){
				stimer = setTimeout(function(){
					ta.find('.bx-wrapper .bx-next').trigger("click");
				},5000);
			}
			
		}else{ //??枚
			
			ta.find('.slider li').css({"margin":"0 0 0 69px"});
			ta.find('.btn_next').css("display","none");
			ta.find('.btn_prev').css("display","none");
		
		}
		});
	
	}
	
});

});


/*------------------------------------------------------------------------
Parts??Print Btn
-------------------------------------------------------------------------*/

j$(function(){

j$('.btn_print').on('click', function(e) {
	e.preventDefault();
	window.print();
});

});


/*------------------------------------------------------------------------
Parts??.box_txt??画像付きa???-スa??
-------------------------------------------------------------------------*/

j$(function(){

if(media != "sp"){ //PC・TAB

j$(".box_txt").imagesLoaded(function(){

//フリーサイズ

j$(".box_txt.free .img img").each(function(){
	var ww = j$(this).width();
	
	if(!j$(this).parent("a").length){
		if(ww < 1035){
			j$(this).parent(".img").css("width",ww);
		}else{
			j$(this).parent(".img").css("width","1050px");
			j$(this).parent().parent(".float_l").css("margin","0 0 20px 0");
			j$(this).parent().parent(".float_r").css("margin","0 0 20px 0");
		}
	}else{
		if(ww < 1035){
			j$(this).parent().parent(".img").css("width",ww);
			j$(this).parent().parent(".img a").css("width",ww);
		}else{
			j$(this).parent().parent(".img").css("width","1050px");
			j$(this).parent().parent(".img a").css("width","1050px");
			j$(this).parent().parent().parent(".float_l").css("margin","0 0 20px 0");
			j$(this).parent().parent().parent(".float_r").css("margin","0 0 20px 0");
		}
	}
});

//固定サイズ

j$(".box_txt > ul").each(function(){
	if(j$(this).find("li").length == 2){
		j$(this).addClass("img_list");
		j$(this).addClass("img_2");
		if(!j$(this).hasClass("float_l") && !j$(this).hasClass("float_r")){
			j$(this).addClass("float_c");
			var ww = (j$(this).find(".img").width()*2)+10;
			j$(this).css("width",ww);
		}
	}else if(j$(this).find("li").length == 3){
		j$(this).addClass("img_list");
		j$(this).addClass("img_3");
		j$(this).removeClass("float_l");
		j$(this).removeClass("float_r");
		if(!j$(this).hasClass("float_l") && !j$(this).hasClass("float_r")){
			j$(this).addClass("float_c");
			var ww = (j$(this).find(".img").width()*3)+30;
			j$(this).css("width",ww);
		}
	}
});

//フィa????

j$(".box_txt.fit .img img").each(function(){
	if(!j$(this).parent("a").length){
		if(j$(this).parent().parent().find(".img").length == 1){
			var ww = j$(this).width();
			j$(this).parent(".img").css("width","1050px");
			j$(this).parent().parent(".float_l").css("margin","0 0 20px 0");
			j$(this).parent().parent(".float_r").css("margin","0 0 20px 0");
		}else{
			j$(this).parent().parent().removeClass("float_l");
			j$(this).parent().parent().removeClass("float_r");
			j$(this).addClass("float_c");
		}
	}else{
		if(j$(this).parent().parent().parent().find(".img").length == 1){
			var ww = j$(this).width();
			j$(this).parent().parent(".img").css("width","1050px");
			j$(this).parent().parent(".img a").css("width","1050px");
			j$(this).parent().parent().parent(".float_l").css("margin","0 0 20px 0");
			j$(this).parent().parent().parent(".float_r").css("margin","0 0 20px 0");
		}else{
			j$(this).parent().parent().parent().removeClass("float_l");
			j$(this).parent().parent().parent().removeClass("float_r");
			j$(this).parent().addClass("float_c");
		}
	}
});

});

	
}else{ //SP

//j$(".box_txt").removeClass("fix");
//j$(".box_txt").removeClass("fit");
j$(".box_txt > ul").removeClass("float_l");
j$(".box_txt > ul").removeClass("float_r");
j$(".box_txt > ul").removeClass("float_c");



}

j$(".box_txt > .txt").each(function(){
	if(j$(this).text().length == 0){
		j$(this).css("display","none");
	}
});

});


/*------------------------------------------------------------------------
Parts??.box_movie??YouTube
-------------------------------------------------------------------------*/

j$(function(){

j$(".box_movie iframe").each(function(){
	
	var bw = j$(this).attr("width");
	var bh = j$(this).attr("height");
	
	if(media != "sp"){ //PC・TAB
	
		if(bw <= 1050){
			j$(this).next(".caption").css("width",bw);
		}else{
			j$(this).next(".caption").css("width","1050px");
			var nw = 1050;
			var nh = Math.round(1050 * (bh/bw));
			j$(this).attr({"width":nw,"height":nh});
		}
		
	}else{ //SP
	
		if(bw <= 600){
			j$(this).next(".caption").css("width",bw);
		}else{
			j$(this).next(".caption").css("width","600px");
			var nw = 600;
			var nh = Math.round(600 * (bh/bw));
			j$(this).attr({"width":nw,"height":nh});
		}
	
	}
});

});


/*------------------------------------------------------------------------
Parts??.box_table
-------------------------------------------------------------------------*/

j$(function(){

if(media == "sp"){ //SP
	if(j$('.box_table.flick').length){
	j$('.box_table.flick').flickSimple({
		snap: '',
		disabled: false
	});
}

setTimeout(function(){
	if(media != "sp"){ //PC・TAB
		j$('.box_table.flick').removeClass("portrait");
		j$('.box_table.flick table').removeClass("portrait");
		j$('.box_table.flick table tbody').removeClass("portrait");
		j$('.box_table.flick').removeClass("landscape");
		j$('.box_table.flick table').removeClass("landscape");
		j$('.box_table.flick table tbody').removeClass("landscape");
		
	}else { //SP
		j$('.box_table.flick').removeClass("portrait");
		j$('.box_table.flick table').removeClass("portrait");
		j$('.box_table.flick table tbody').removeClass("portrait");
		j$('.box_table.flick').removeClass("landscape");
		j$('.box_table.flick table').removeClass("landscape");
		j$('.box_table.flick table tbody').removeClass("landscape");
		
		j$('.box_table.flick').addClass("portrait");
		j$('.box_table.flick table').addClass("portrait");
		j$('.box_table.flick table tbody').addClass("portrait");
	}
}, 500);

}
});


/*------------------------------------------------------------------------
Parts??Social BTN
-------------------------------------------------------------------------*/

j$(function(){

if(j$(".social").length){
	var og_title = j$("meta[property='og:title']").attr("content");
	var og_description = j$("meta[property='og:description']").attr("content");
	
	//facebook
	var fb_url = "http://www.facebook.com/share.php?u=" + location.href;
	j$(".social .fb a").attr("href",fb_url);
	j$(".browser_ie10 .social .fb a").addClass("rover");
	
	
	//twitter
	var tw_txt_num = 138 - ((location.href).length+4);
	if(tw_txt_num >= og_title.length + og_description.length){
		var tw_txt = "a?"+og_title +"a?"+og_description;
	}else{
		var tw_txt = ("a?"+og_title +"a?"+og_description).slice(0,(tw_txt_num-1))+"…";
	}
	var tw_url = "http://twitter.com/share?text=" + encodeURI(tw_txt) + "&url=" + encodeURI(location.href);
	j$(".social .tw a").attr("href",tw_url);
	j$(".browser_ie10 .social .tw a").addClass("rover");
	
	
	//line
	var line_url = "http://line.me/R/msg/text/?" + encodeURI(og_description) + encodeURI(location.href);
	j$(".social.btn_pc .line > a").attr("href",line_url);
	j$(".social.btn_sp .line > a").attr("href",line_url);
	
	j$('.social li.line').on({
		'mouseenter': function(e) {
			j$(this).addClass("ov");
		},
		'mouseleave': function(e) {
			j$(this).removeClass("ov");
		}
	});
	
	//google plus
	var google_url = "https://plus.google.com/share?url=" + location.href;
	j$(".social .google a").attr("href",google_url);
	j$(".browser_ie10 .social .google a").addClass("rover");
}

});


/*------------------------------------------------------------------------
Parts??.box_list_a_01
-------------------------------------------------------------------------*/

j$(function(){

if(media != "sp"){ //PC・TAB
	
	j$(".box_list_a_01").each(function(){
		var ta = j$(this);
		var num = ta.find("li").length;
		var rest = num - (Math.floor(num/4)*4)
		switch (rest){
			case 1: ta.find("ul").append("<li class='blank'></li><li class='blank'></li><li class='blank'></li>");
			break;
			case 2: ta.find("ul").append("<li class='blank'></li><li class='blank'></li>");
			break;
			case 3: ta.find("ul").append("<li class='blank'></li>");
			break;
		}
	});
	
	setTimeout(function(){
	j$(".box_list_a_01 li").imagesLoaded(function(){
	
		j$(".box_list_a_01").each(function(){
			var ta = j$(this);
			ta.find("li a .info").tile(4);
			ta.find("li").tile(4);
		});
	});
	}, 500);
	
}else{ //SP
	
	j$(".box_list_a_01").each(function(){
		var ta = j$(this);
		var num = ta.find("li").length;
		var rest = num - (Math.floor(num/2)*2)
		switch (rest){
			case 1: ta.find("ul").append("<li class='blank'></li>");
			break;
		}
	});

	j$(".box_list_a_01 li").imagesLoaded(function(){
	
		j$(".box_list_a_01").each(function(){
			var ta = j$(this);
			ta.find("li a .info").tile(2);
			ta.find("li").tile(2);
		});
	});
	
}

});


/*------------------------------------------------------------------------
Parts??.box_list_b_01
-------------------------------------------------------------------------*/

j$(function(){

if(media != "sp"){ //PC・TAB
	
	j$(".box_list_b_01").each(function(){
		var ta = j$(this);
		ta.imagesLoaded(function(){
			ta.find(".tit").tile(2);
			ta.find(".main").tile(2);
			ta.find(".sub p").tile(2);
			ta.find("li").tile(2);
		});
	});
	
}else{ //SP

}

});


/*------------------------------------------------------------------------
Parts??.box_list_slider_01??PC list、SP slider
-------------------------------------------------------------------------*/

j$(function(){

if(media != "sp"){ //PC・TAB
	j$(".box_list_slider_01").each(function(){
		var ta = j$(this);
		ta.imagesLoaded(function(){
			ta.find("li").tile(3);
		});
	});
	
}else{ //SP

	j$(".box_list_slider_01").each(function(){
		var ta = j$(this);
		var slider_num = ta.find('li').length;
		
		//??枚の場合a?a???枚にe??￡?
		if(slider_num == 2){
			var clone1 = ta.find('.slider li:nth-child(1)').clone();
			var clone2 = ta.find('.slider li:nth-child(2)').clone();
    		ta.find('.slider').append(clone1);
    		ta.find('.slider').append(clone2);
		}
	
		//最後a?もa?をa?頭に移a??
		var slider_last = ta.find('li').filter(":last");
		ta.find('.slider').prepend(slider_last);
	
		ta.find('li').imagesLoaded(function(){
			
			if(slider_num > 1){ //スライダー有効
				
				var stimer;
				var slider = ta.find('.slider').bxSlider({
					slideWidth: 600,
					minSlides: 1,
					maxSlides: 1,
					moveSlides: 1,
					slideMargin: 0,
					startSlide: 0,
					useCSS: false,
					touchEnabled: true,
					pager: true,
					infiniteLoop: true,
					onSlideBefore: function(){
						clearTimeout(stimer);
					},
					onSlideAfter: function(){
						stimer = setTimeout(function(){
							ta.find('.bx-wrapper .bx-next').trigger("click");
						},5000);
					}
				});
				
				stimer = setTimeout(function(){
					ta.find('.bx-wrapper .bx-next').trigger("click");
				},5000);
				
				
			}else{ //??枚
		
				ta.find('.slider li').css({"margin":"0 0 0 0"});
				ta.find('.btn_next').css("display","none");
				ta.find('.btn_prev').css("display","none");
				
			}
		});

	});
}

});


/*------------------------------------------------------------------------
Parts??box_recent_01 最近見たスクール・レa???1ン
-------------------------------------------------------------------------*/

j$(function(){

// .tab_recent_01

j$('.tab_recent_01').on('click', function(e) {
	e.preventDefault();
	j$(".wrapper1").css("overflow","visible");
	j$(".box_recent_01 a").removeClass("cur");
	j$(".box_recent_01 ul").removeClass("cur");
	
	j$(".box_recent_01 .btn_recent_01").addClass("cur");
	j$(".box_recent_01 .recent_01").addClass("cur");
	j$(".box_recent_01").fadeIn();
	j$(".box_recent_01 .recent_01 li a").tile(3);
	var hh = j$(window).innerHeight();
	if(hh < (336 + 10 + 10)){
		var tt = 10;
		var ss = j$(window).scrollTop() + tt;
	}else {
		var tt = Math.floor((hh - j$(".box_recent_01 .wrap > div").height())/2);
		if(tt > 60){
			var ss = j$(window).scrollTop() + tt - 60;
		}else{
			var ss = j$(window).scrollTop() + 10;
		}
	}
	j$(".box_recent_01 .wrap").css("top",ss);
});

// .tab_recent_02

j$('.tab_recent_02').on('click', function(e) {
	e.preventDefault();
	j$(".wrapper1").css("overflow","visible");
	j$(".box_recent_01 a").removeClass("cur");
	j$(".box_recent_01 ul").removeClass("cur");
	
	j$(".box_recent_01 .btn_recent_02").addClass("cur");
	j$(".box_recent_01 .recent_02").addClass("cur");
	j$(".box_recent_01").fadeIn();
	j$(".box_recent_01 .recent_02 li a").tile(3);
	var hh = j$(window).innerHeight();
	if(hh < (336 + 10 + 10)){
		var tt = 10;
		var ss = j$(window).scrollTop() + tt;
	}else {
		var tt = Math.floor((hh - j$(".box_recent_01 .wrap > div").height())/2);
		if(tt > 60){
			var ss = j$(window).scrollTop() + tt - 60;
		}else{
			var ss = j$(window).scrollTop() + 10;
		}
	}
	j$(".box_recent_01 .wrap").css("top",ss);
});

// .btn_recent_01

j$('.box_recent_01 .btn_recent_01').on('click', function(e) {
	e.preventDefault();
	j$(".box_recent_01 .cover").css({"display":"block","opacity":"1"});
	j$(".box_recent_01 .cover").delay(100).fadeOut();
	
	j$(".box_recent_01 a").removeClass("cur");
	j$(".box_recent_01 ul").removeClass("cur");
	
	j$(".box_recent_01 .btn_recent_01").addClass("cur");
	j$(".box_recent_01 .recent_01").addClass("cur");
	j$(".box_recent_01").fadeIn();
	j$(".box_recent_01 .recent_01 li a").tile(3);
});

// .btn_recent_02

j$('.box_recent_01 .btn_recent_02').on('click', function(e) {
	e.preventDefault();
	j$(".box_recent_01 .cover").css({"display":"block","opacity":"1"});
	j$(".box_recent_01 .cover").delay(100).fadeOut();
	
	j$(".box_recent_01 a").removeClass("cur");
	j$(".box_recent_01 ul").removeClass("cur");
	
	j$(".box_recent_01 .btn_recent_02").addClass("cur");
	j$(".box_recent_01 .recent_02").addClass("cur");
	j$(".box_recent_01").fadeIn();
	j$(".box_recent_01 .recent_02 li a").tile(3);
});

// .btn_close

j$('.box_recent_01 .btn_close,.box_recent_01 .bg').on('click', function(e) {
	e.preventDefault();
	j$(".wrapper1").css("overflow","hidden");
	j$(".box_recent_01").fadeOut();
});

});


/*------------------------------------------------------------------------
Contents
-------------------------------------------------------------------------*/

/*------------------------------------------------------------------------
Contents??A-01??TOP
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#top").length){
if(media != "sp"){ //PC・TAB
	
	//緊急のお知らせ 位置変更
	j$("#top_contents").before(j$("#top_contents .emergency_notice"));
	//重要なお知らせ 位置変更
	j$("#top_contents").after(j$("#top_contents .important_notice"));

	//目c????ら探a??
	j$("#lesson_search .lesson_1 li").imagesLoaded(function(){
		j$("#lesson_search .lesson_1 li").tile(4);
	});
	
	//エリアで探a??
	j$("#lesson_search .lesson_3 li").tile(2);

}else{ //SP
	
	//アコーa???￡オンa???1ライダー用調整??slider
	j$('#lesson_search .lesson_4 > div li').imagesLoaded(function(){
		setTimeout(function(){
			j$('#lesson_search .lesson_4 > div').css({"display":"none","opacity":"1"});
		}, 300);
	});
	
	//目c????ら探すa??い方からレa???1ンを探す、短期で受けられるイベントa?レa???1ンから探a??
	j$('#lesson_search .lesson_1 h3,#lesson_search .lesson_2 h3,#lesson_search .lesson_4 h3').on('click', function(e) {
		e.preventDefault();
		j$(this).toggleClass("open");
		j$(this).next("div").toggleClass("open");
		j$(this).next("div").slideToggle();
	});
	
	//エリアで探a??
	j$('#lesson_search .lesson_3 h3').on('click', function(e) {
		e.preventDefault();
		j$(this).toggleClass("open");
		j$(this).next("div").toggleClass("open");
		
		if(os == "android42" || os == "android44"){
			j$("#lesson_search .lesson_3 > div ul").slideToggle();
		}else{
			j$("#lesson_search .lesson_3 > div").slideToggle();
		}
		
	});
	
	//検索
	j$(".box_top_search_01 select").change(function(){
	    var selectVal = j$(this).val();
	    if(selectVal != ""){
	    	window.location.href = selectVal;
	    }
	});
	
}
}

});


/*------------------------------------------------------------------------
Contents??D-01??近くのスクールを探a??
-------------------------------------------------------------------------*/

j$(function(){

if(media != "sp"){ //PC・TAB
	//最近見たスクール
	j$(".box_search_01 dt,.box_search_01 dt span,.box_search_01 dd").tile(3);
	
	//エリアで探a??
	j$(".box_search_area_01 a").tile(4);

}else{ //SP

	//エリアで探a??
	j$(".box_search_area_01 .btn_accordion").click(function(e){
		e.preventDefault();
	    j$(this).next(".wrap_accordion").slideToggle();
	    j$(this).toggleClass("open");
	});
	
}

});


/*------------------------------------------------------------------------
Contents??D-02??スクール検索結果一覧
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#school_list").length){
	var search_result_num = 1;
	var search_result_max = j$(".box_search_result_01 .wrap > div").length;
	
	//もっと見る
	j$(".box_search_result_01 .btn_more").click(function(e){
		e.preventDefault();
		search_result_num += 1;
		var ta = "> div:nth-of-type("+search_result_num+")";
	    j$(this).parent().find(ta).slideDown();
	    
	    if(search_result_num == search_result_max){
			j$(this).fadeOut();    
	    }
	});
}

});


/*------------------------------------------------------------------------
Contents??E-01??スクール詳細 インフォメーション
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#school_detail").length){
if(media != "sp"){ //PC・TAB
	
}else{ //SP

	if(j$(".box_access_01").length){
		j$(".box_access_01").prepend(j$(".box_access_01").find(".map"));
		j$(".box_access_01 .week,.box_access_01 .time").tile(2);
	}
}
}

});

/*------------------------------------------------------------------------
Contents??E-04??スクール詳細 生徒さんたちの声
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#school_detail").length){

if(media != "sp"){ //PC・TAB
	
	j$(".box_voice_body_box iframe").each(function(){
		var ww = j$(this).attr("width");
		if(ww <= 1050){
			j$(this).next(".caption").css("width",ww);
		}else{
			j$(this).next(".caption").css("width","1050px");
		}
	});
	
}else{ //SP

	j$(".box_voice_head_01").on('click', function(){
		j$(this).addClass('on');
		j$(this).next('.box_voice_body').slideDown();

		j$('.box_voice_body_box img').each(function() {
			var imgW = j$(this).width();
			if( imgW > 599 ){
				j$(this).addClass('voice_wide_img');
			}
		});

		j$('.box_voice_body_box').each(function() {
			if(j$('img',this).length){
				var
					boxtit = j$('.box_voice_body_tit',this),
					boximg = j$('img',this);
				boximg.before(boxtit);
			}
		});
	});

	j$(".box_voice_close_01").on('click', function(){
		var
			p = j$(this).closest('.box_voice_01'),
			pos = p.offset().top;
		j$('.box_voice_head_01',p).removeClass('on');
		j$(this).closest('.box_voice_body').slideUp();
		j$('body,html').animate({
			scrollTop: pos
		}, 400);
	});

	j$(".box_voice_01:nth-of-type(1) .box_voice_head_01").addClass('on');
}

}

});



/*------------------------------------------------------------------------
Contents??U-01??e3???請a±?
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#form_request").length){

	j$('.form_table .form_zip span').on('click', function(){
		AjaxZip3.zip2addr('zip', '', 'addr', 'addr');
	});

	j$('.form_select_list_01').change(function() {
		j$(".form_select_label_01").html(j$('.form_select_list_01 option:selected').text());
	});
	j$('.form_select_list_02').change(function() {
		j$(".form_select_label_02").html(j$('.form_select_list_02 option:selected').text());
	});

	j$(".confirm_btn input").on('mouseenter', function(e) {
		if(media == "pc"){
			if(!j$(this).hasClass("rover")){
				j$(this).stop().fadeTo("600",0.6);
			}
		}else{
			e.preventDefault();
		}
	});
	j$(".confirm_btn input").on('mouseleave', function(e) {
		if(media == "pc"){
			if(!j$(this).hasClass("rover")){
				j$(this).stop().fadeTo("300",1);
			}
		}else{
			e.preventDefault();
		}
	});
}

});


/*------------------------------------------------------------------------
Contents?? T-01??お問い合わa??
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#form_contact").length){

	j$('.form_table .form_zip span').on('click', function(){
		AjaxZip3.zip2addr('zip', '', 'addr', 'addr');
	});

	j$(".confirm_btn input").on('mouseenter', function(e) {
		if(media == "pc"){
			if(!j$(this).hasClass("rover")){
				j$(this).stop().fadeTo("600",0.6);
			}
		}else{
			e.preventDefault();
		}
	});
	j$(".confirm_btn input").on('mouseleave', function(e) {
		if(media == "pc"){
			if(!j$(this).hasClass("rover")){
				j$(this).stop().fadeTo("300",1);
			}
		}else{
			e.preventDefault();
		}
	});
}

});


/*------------------------------------------------------------------------
Contents??J-01??シェーン英会話に通う、生徒さんたちの声
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#student_list").length){
	var student_list_num = 1;
	var student_list_max = j$(".student_list_warp > ul").length;

	//もっと見る
	j$(".student_list_more").click(function(e){
		e.preventDefault();
		student_list_num += 1;
		var ta = "> ul:nth-of-type("+student_list_num+")";
		j$(this).parent().find(ta).slideDown();

		if(student_list_num == student_list_max){
			j$(this).fadeOut();
		}
	});
if(media != "sp"){
	j$('.student_list_warp ul li a').matchHeight();
}else{ //SP
	j$('.student_list_warp li').each(function() {
		var
			studentimg = j$('.student_list_image',this),
			studentname = j$('.student_list_name',this),
			studentcourse = j$('.student_list_course',this),
			studenttxt = j$('.student_list_txt',this);
		studentimg.before(studentname);
		studentcourse.before(studenttxt);
	});
}

}

});


/*------------------------------------------------------------------------
Contents??I-01??よくあるご質a??
-------------------------------------------------------------------------*/

j$(function(){

	var count =j$(".faq_list").length;
	j$(".faq_list").each(function(i) {
		var i = i + 1;
		if( i == count ){
			j$(this).addClass('faq_last_list');
		}
	});

if(j$("#faq").length){

	j$('.faq_list dt').on('click', function(){
		j$(this).toggleClass('on');
		j$(this).next('dd').slideToggle(200);
	});

if(media != "sp"){ //PC・TAB
	
	//PC・TAB用のjsを記述
	
}else{ //SP

	//SP用のjsを記述

}

}

});


/*------------------------------------------------------------------------
Contents??F-01??目c????ら探a??
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#purpose_index").length){

if(media != "sp"){ //PC・TAB
	
	j$(".purpose_index_list li").tile(4);
	
}else{ //SP

	j$(".purpose_index_list li").tile(2);

}

}

});


/*------------------------------------------------------------------------
Contents??G-02??個人レa???1ン??一般??月謝制??
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#lesson_detail").length){

	j$('.lesson_details_rank .tiles').tile();
	j$('.lesson_details_icons li .lesson_details_icons_text').matchHeight();
	j$('.lesson_details_icons li').matchHeight();

if(media != "sp"){ //PC・TAB

	

}else{ //SP

	j$('.lesson_detail_btt').on('click', function(){
		j$(this).toggleClass('on');
		j$(this).next('.lesson_detail_btns').slideToggle(200);
	});


	var el = j$('.lesson_details_rank_list').html();
	j$('.lesson_details_rank').after('<div class="lesson_details_rank_list02" />');
	j$('.lesson_details_rank_list02').append(el);

	j$('.lesson_details_rank_list02 dl').tile(2);

}

}

});


/*------------------------------------------------------------------------
Contents??E-02??スクール・教室を探a??/レa???1ンのご案a?
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#school_detail .school_lesson_box").length){

	j$('.lesson_details_icons li .lesson_details_icons_text').matchHeight();
	j$('.lesson_details_icons li').matchHeight();

if(media != "sp"){ //PC・TAB
	
	//PC・TAB用のjsを記述
	
}else{ //SP

	j$(".school_lesson_box .tit_l").each(function() {
		var el = j$('.tit',this).html();
		j$(this).after('<div class="school_lesson_btt" />');
		j$(this).next('.school_lesson_btt').append(el);
	});

	j$('.school_lesson_btt').on('click', function(){
		j$(this).toggleClass('on');
		j$(this).next('.lesson_details_box01').slideToggle(200);
	});

	var count =j$(".school_lesson_box").length;
	j$(".school_lesson_box").each(function(i) {
		var i = i + 1;
		if( i == 1 ){
			j$(this).addClass('school_lesson_firstbox');
		}
		if( i == count ){
			j$(this).addClass('school_lesson_lastbox');
		}
	});

}

}

});



/*------------------------------------------------------------------------
Contents??E-03??スクール・教室を探a??/料e?s一覧
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#school_detail .school_price_wrap").length){

if(media != "sp"){ //PC・TAB
	
	//PC・TAB用のjsを記述
	
}else{ //SP

	j$(".lesson_price_talbe02").each(function() {
		var el = j$(this).prev('h3.tit_m').html();
		j$(this).prev('h3.tit_m').addClass('none');
		j$(this).before('<div class="school_price_btt" />');
		j$(this).prev('.school_price_btt').append(el);
	});

	j$('.school_price_btt').on('click', function(){
		j$(this).toggleClass('on');
		j$(this).next('.lesson_price_talbe02').slideToggle(200);
	});

	j$(".lesson_price_talbe02").each(function(i) {
		var i = i + 1;
		if( i == 1 ){
			j$(this).addClass('lesson_price_firsttalbe02');
		}
	});

}

}

});




/*------------------------------------------------------------------------
Contents??G-01??レa???1ン・料e?sのご案a?
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#lesson").length){

if(media != "sp"){ //PC・TAB
	
	j$(".lesson_pic_btn li .lesson_pic_btn_texts").matchHeight();
	
}else{ //SP

	//SP用のjsを記述

}

}

});


/*------------------------------------------------------------------------
Contents??02??シェーン英会話の講師紹a≫?
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#lecturer").length){

if(media != "sp"){ //PC・TAB
	
	//PC・TAB用のjsを記述
	
}else{ //SP

	j$('.box_lecturer_01 .box_voice_body img').each(function() {
		var
			imgh = j$(this).height(),
			imgw = j$(this).width();
		if(imgh > imgw){
			j$(this).addClass('img_over_height');
		}
	});

}

}

});


/*------------------------------------------------------------------------
Contents??J-02??シェーン英会話に通う生徒さんa?声??詳細
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#student_detail").length){

if(media != "sp"){ //PC・TAB
	
	//PC・TAB用のjsを記述
	
}else{ //SP

	j$('.box_student_detail .box_voice_body img').each(function() {
		var
			imgh = j$(this).height(),
			imgw = j$(this).width();
		if(imgh > imgw){
			j$(this).addClass('img_over_height');
		}
	});

}

}

});



/*------------------------------------------------------------------------
Contents??W-01??無料体験レa???1ンのお申込み
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#application").length){

	j$('.application_select_area').change(function() {
		j$(".application_select_ttl_area").html(j$('.application_select_area option:selected').text());
	});
	j$('.application_select_school').change(function() {
		j$(".application_select_ttl_school").html(j$('.application_select_school option:selected').text());
	});

if(media != "sp"){ //PC・TAB
	
	//PC・TAB用のjsを記述
	
}else{ //SP


	var el = j$('.flow_tit').html();
	j$('.flow_tit').after('<div class="application_flow_ttl" />');
	j$('.application_flow_ttl').append(el);


	j$('.application_flow_ttl').on('click', function(){
		j$(this).toggleClass('on');
		j$(this).next('.application_icons').slideToggle(200);
	});

	j$(".application_select dd .application_select_ttl").html('&nbsp;');



}

}

});


/*------------------------------------------------------------------------
Contents??O-01??シェーンの法人向けサービス
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#corporation").length){

	j$(".corporation_work_list li").matchHeight();

if(media != "sp"){ //PC・TAB
	
	j$(".corporation_need_txt").matchHeight();
	
}else{ //SP

	//SP用のjsを記述

}

}

});

/*------------------------------------------------------------------------
Contents??O-02??企業向けネイa???￡ブ講師派遣
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#corporation_native").length){

if(media != "sp"){ //PC・TAB
	
	j$(".lesson_pic_btn li .lesson_pic_btn_texts").matchHeight();
	
}else{ //SP

	j$('.corporation_native_elements .sp_after_pic').before(j$('.corporation_native_elements .pic'));

}

}

});

/*------------------------------------------------------------------------
Contents??O-03??講師派遣型レa???1ン
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#corporation_native_dispatch").length){

if(media != "sp"){ //PC・TAB
	
	j$(".corporation_native_dispatch_lecures .lesson_pic_btn li .lesson_pic_btn_texts").matchHeight();
	j$(".corporation_native_dispatch_shortterm .lesson_pic_btn li .lesson_pic_btn_tit").matchHeight();
	j$(".corporation_native_dispatch_shortterm .lesson_pic_btn li .lesson_pic_btn_txt").matchHeight();
	
}else{ //SP

	j$('.lesson_detail_btt').on('click', function(){
		j$(this).toggleClass('on');
		j$(this).next('.lesson_detail_btns').slideToggle(200);
	});

}

}

});

/*------------------------------------------------------------------------
Contents??O-08-2??教育機関向けネイa???￡ブ講師派遣
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#corporation_educational_infant").length){

if(media != "sp"){ //PC・TAB
	
	j$(".corporation_educational_infant_knowhow .lesson_pic_btn li .lesson_pic_btn_texts").matchHeight();
	
}else{ //SP


}

}

});

/*------------------------------------------------------------------------
Contents??C-01??お知らせ一覧
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#news").length){

	j$(".sort_category li").matchHeight();

if(media != "sp"){ //PC・TAB
	
	//PC・TAB用のjsを記述
	
}else{ //SP

	j$(".sort_category ul li:first-child span").on('click', function(){
		j$(".sort_category ul li:not(li:first-child)").slideToggle();
	});

}

}

});


/*------------------------------------------------------------------------
Contents??L-02??海外スクール 一覧
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#abroad_list").length){

	j$(".abroad_list_nav .btn").on('click', function(){
		j$(this).next('ul').slideToggle(200);
		j$(this).toggleClass('on');
	});

if(media != "sp"){ //PC・TAB
	
	j$(".abroad_list_detail_list .txt").matchHeight();
	j$(".abroad_list_detail_list li").matchHeight();
	
}else{ //SP

	j$(".abroad_list_nav_btn").on('click', function(){
		j$(".abroad_list_nav").slideToggle(200);
		j$(".abroad_list_nav_btn").toggleClass('on');
	});

}

}

});


/*------------------------------------------------------------------------
Contents??L-01??海外スクール トッa??
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#abroad").length){

if(media != "sp"){ //PC・TAB
	
	j$(".abroad_list_detail_list .txt").matchHeight();
	j$(".abroad_list_detail_list li").matchHeight();
	
}else{ //SP

	//SP用のjsを記述

}

}

});


/*------------------------------------------------------------------------
Contents??L-05??海外留学体験e≪?
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#abroad_experience").length){

if(media != "sp"){ //PC・TAB
	
	//PC・TAB用のjsを記述
	
}else{ //SP

	j$('.lesson_detail_btt').on('click', function(){
		j$(this).toggleClass('on');
		j$(this).next('.lesson_detail_btns').slideToggle(200);
	});

}

}

});



/*------------------------------------------------------------------------
Contents??ch A-01??こども英ea? トッa??
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#kids").length){

	var slider_num = j$('#kids .kids_mv_slider li').length;

	if(slider_num>1){
		j$('#kids .kids_mv_slider').bxSlider({
			pager: true,
			controls: false,
			auto: true,
			speed: 500,
			pause: 4000
		});
	}
	j$('#shape1').mapster({
		singleSelect : true,
		clickNavigate : true,
		render_highlight : { altImage : '/files/user/img/kids/top/img_reason_02.png' },
		mapKey: 'region',
		fillOpacity : 1,
	});


if(media != "sp"){ //PC・TAB
	
	//PC・TAB用のjsを記述
	
}else{ //SP

	j$('.kids_top_area #search_4 > div').hide();
}

}

});


/*------------------------------------------------------------------------
Contents??ch B-01??シェーン子ども英語を選ぶ5つのc???±
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#kids_reason").length){
	j$(".kids_top_class_map li").matchHeight();

if(media != "sp"){ //PC・TAB
	
	j$('#shape1').mapster({
		singleSelect : true,
		clickNavigate : true,
		render_highlight : { altImage : '/files/user/img/kids/reason/pic_ancs_ov.png' },
		mapKey: 'region',
		fillOpacity : 1,
	});

	j$(".reason_04_list dl").matchHeight();



}else{ //SP

	j$(".kids_reason_ancs_box.reason_anc_box#anc04 .reason_04_list dl:nth-of-type(3)").before(j$(".kids_reason_ancs_box.reason_anc_box#anc04 .reason_04_list dl:nth-of-type(4)"));

var initPhotoSwipeFromDOM = function(gallerySelector) {

    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        if(!params.hasOwnProperty('pid')) {
            return params;
        }
        params.pid = parseInt(params.pid, 10);
        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {
            index: index,

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid > 0 && hashData.gid > 0) {
        openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );
    }
};

// execute above function

window.onload = function(){
  initPhotoSwipeFromDOM(".my-gallery");
}

}

}

});


/*------------------------------------------------------------------------
Contents??ch_E-01??スクール詳細 インフォメーション
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#kids_school_detail").length){
if(media != "sp"){ //PC・TAB
	
}else{ //SP

	if(j$(".box_access_01").length){
		j$(".box_access_01").prepend(j$(".box_access_01").find(".map"));
		j$(".box_access_01 .week,.box_access_01 .time").tile(2);
	}
}
}

});


/*------------------------------------------------------------------------
Contents??ch_J-01??シェーン英会話に通う、生徒さんたちの声
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#kids_student").length){
	var student_list_num = 1;
	var student_list_max = j$(".student_list_warp > ul").length;

	//もっと見る
	j$(".student_list_more").click(function(e){
		e.preventDefault();
		student_list_num += 1;
		var ta = "> ul:nth-of-type("+student_list_num+")";
		j$(this).parent().find(ta).slideDown();

		if(student_list_num == student_list_max){
			j$(this).fadeOut();
		}
	});
if(media != "sp"){
	j$('.student_list_warp ul li a').matchHeight();
}else{ //SP
	j$('.student_list_warp li').each(function() {
		var
			studentimg = j$('.student_list_image',this),
			studentname = j$('.student_list_name',this),
			studentcourse = j$('.student_list_course',this),
			studenttxt = j$('.student_list_txt',this);
		studentimg.before(studentname);
		studentcourse.before(studenttxt);
	});
}

}

});



/*------------------------------------------------------------------------
Contents??ch_J-02??シェーン英会話に通う、生徒さんたちの声??詳細
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#kids_student_detail").length){

if(media != "sp"){ //PC・TAB
	
	//PC・TAB用のjsを記述
	
}else{ //SP

	j$('.box_student_detail .box_voice_body img').each(function() {
		var
			imgh = j$(this).height(),
			imgw = j$(this).width();
		if(imgh > imgw){
			j$(this).addClass('img_over_height');
		}
	});

}

}

});





/*------------------------------------------------------------------------
Contents??fixed_nav
-------------------------------------------------------------------------*/

j$(function(){

if(j$(".fixed_nav").length){

if(media != "sp"){ //PC・TAB
	
	//PC・TAB用のjsを記述
	
}else{ //SP

	// .tab_recent_01

	j$('.box_recent_01 .wrap > div').append('<a href="" class="btn_close type_02">CLOSE</a>');
	j$('.fixed_nav .nav_02 a').on('click', function(e) {
		e.preventDefault();
		j$(".wrapper1").css("overflow","visible");
		j$(".box_recent_01 a").removeClass("cur");
		j$(".box_recent_01 ul").removeClass("cur");
		
		j$(".box_recent_01 .btn_recent_01").addClass("cur");
		j$(".box_recent_01 .recent_01").addClass("cur");
		j$(".box_recent_01").fadeIn();
	});

	// .tab_recent_02

	j$('.fixed_nav .nav_03 a').on('click', function(e) {
		e.preventDefault();
		j$(".wrapper1").css("overflow","visible");
		j$(".box_recent_01 a").removeClass("cur");
		j$(".box_recent_01 ul").removeClass("cur");
		
		j$(".box_recent_01 .btn_recent_02").addClass("cur");
		j$(".box_recent_01 .recent_02").addClass("cur");
		j$(".box_recent_01").fadeIn();
	});

	// .btn_close
	j$(document).on('click', '.btn_close.type_02', function(e) {
		e.preventDefault();
		j$(".wrapper1").css("overflow","hidden");
		j$(".box_recent_01").fadeOut();
	});

	j$(window).on('scroll', function(){
		var
			hh = j$('#header').height(),
			sc = j$(window).scrollTop();
		if((hh+50) < sc){
			j$('.fixed_nav').addClass('open');
		} else {
			j$('.fixed_nav').removeClass('open');
		}
	});

}

}

});




/*------------------------------------------------------------------------
Contents??footer banner
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#footer .banner").length){

if(media != "sp"){ //PC・TAB
	
	j$(window).on('scroll', function(){
		var
			bh = j$('#footer .banner .wrap').outerHeight(),
			sc = j$(window).scrollTop();
		if(200 < sc){
			j$('#footer .banner').addClass('open');
		} else {
			j$('#footer .banner').removeClass('open');
		}
		j$("#footer .banner:not('.no_fixed')").height(bh);
	});
	
}else{ //SP

	//SP用のjsを記述

}

}

});


/*------------------------------------------------------------------------
Contents??B-01??シェーンを選ふa??5つのc???±
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#reason").length){

if(media != "sp"){ //PC・TAB
	
	j$(".reason_04_list dl").matchHeight();

	
}else{ //SP

	j$(".reason_04_list dl:nth-of-type(3)").before(j$(".reason_04_list dl:nth-of-type(4)"));

var initPhotoSwipeFromDOM = function(gallerySelector) {

    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes 
            if(figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if(figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML; 
            }

            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if(!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }

            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if(index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};

        if(hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }

        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        if(!params.hasOwnProperty('pid')) {
            return params;
        }
        params.pid = parseInt(params.pid, 10);
        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {
            index: index,

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }

        };

        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll( gallerySelector );

    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if(hashData.pid > 0 && hashData.gid > 0) {
        openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true );
    }
};

// execute above function

window.onload = function(){
  initPhotoSwipeFromDOM(".my-gallery");
}

}

}

});

/*------------------------------------------------------------------------
Contents??S-01??採用応募フォーa??
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#form_recruit").length){


	j$('.form_select_list_01').change(function() {
		j$(".form_select_label_01").html(j$('.form_select_list_01 option:selected').text());
	});
	j$('.form_select_list_02').change(function() {
		j$(".form_select_label_02").html(j$('.form_select_list_02 option:selected').text());
	});
	j$('.form_select_list_03').change(function() {
		j$(".form_select_label_03").html(j$('.form_select_list_03 option:selected').text());
	});

	var time = new Date();
	var year = time.getFullYear();

	//1900年まで表示
	for (var i = year; i >= 1900; i--) {
		j$('.form_select_list_01').append('<option value="' + i + '">' + i + '</option>');
	}
	//1??12の数字を生a?
	for (var i = 1; i <= 12; i++) {
		j$('.form_select_list_02').append('<option value="' + i + '">' + i + '</option>');
	}
	//1??31の数字を生a?
	for (var i = 1; i <= 31; i++) {
		j$('.form_select_list_03').append('<option value="' + i + '">' + i + '</option>');
	}


	j$(".confirm_btn input").on('mouseenter', function(e) {
		if(media == "pc"){
			if(!j$(this).hasClass("rover")){
				j$(this).stop().fadeTo("600",0.6);
			}
		}else{
			e.preventDefault();
		}
	});
	j$(".confirm_btn input").on('mouseleave', function(e) {
		if(media == "pc"){
			if(!j$(this).hasClass("rover")){
				j$(this).stop().fadeTo("300",1);
			}
		}else{
			e.preventDefault();
		}
	});
}

});


/*------------------------------------------------------------------------
Contents??N-01??シェーンのお役立ちa???± 
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#useful").length){

	j$(".useful_boxs_group .box a").matchHeight();

	var useful_box_num = 1;

	//もっと見る
	j$(".useful_boxs_more a").click(function(e){
		e.preventDefault();
		useful_box_num += 1;
		var ta = ".open_box"+useful_box_num;
		j$('.useful_boxs_wrap').find(ta).slideDown(200).addClass('end');
		console.log(ta);

		if(j$('.max.end').length){
			j$(".useful_boxs_more").fadeOut();
		}
	});

	var openbox_max = j$(".useful_boxs_group .box").length -1;
	j$(".useful_boxs_group .box").each(function(i) {
		if(i == openbox_max){
			j$(this).addClass('max');
		}
	});


if(media != "sp"){ //PC・TAB
	
	var openbox = 0;
	j$(".useful_boxs_group .box").each(function(i) {
		if((j$(this).index())%10 === 0){
			openbox += 1;
		}
		j$(this).addClass('open_box'+openbox);
	});
	
}else{ //SP

	var openbox = 0;
	j$(".useful_boxs_group .box").each(function() {
		if((j$(this).index())%14 === 0){
			openbox += 1;
		}
		j$(this).addClass('open_box'+openbox);
	});

}

}

});


/*------------------------------------------------------------------------
Contents??R-01??会社a???±
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#company").length){

if(media != "sp"){ //PC・TAB
	
	j$(".lesson_pic_btn li .lesson_pic_btn_texts").matchHeight();
	
}else{ //SP

	//SP用のjsを記述

}

}

});



/*------------------------------------------------------------------------
Contents??xxxxxxxxxxxxxxxx
-------------------------------------------------------------------------*/

j$(function(){

if(j$("#school_detail").length){

if(media != "sp"){ //PC・TAB
	
	//PC・TAB用のjsを記述
	
}else{ //SP

	//SP用のjsを記述

}

}

});





