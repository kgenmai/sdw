/* slick.jsのスライダー動き設定 */
$("document").ready(function(){
$('.slider-keyvisual').slick({
slidesToShow: 2.5,
swipeToSlide: true,
autoplay:true,
autoplaySpeed:3000,
speed:1500,
dots:true,
arrows:false,
vertical:false,
pauseOnHover:true,
responsive:[{
			breakpoint: 960,
			settings:{
				arrows: false,
				slidesToShow: 2.5
	  		}
		},
		{
			breakpoint: 640,
			settings:{
				slidesToShow: 2.5
			}
		}]
});
}); 
