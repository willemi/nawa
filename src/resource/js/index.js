import '../css/index.scss';
import '../css/swiper.css';

const util = require('./common/util');
const Swiper = require('./common/swiper.min');

let data = [{
    "img": "resource/img/banner_01.jpg",
    "url": "#1",
    "title": "1111111111111"
},{
    "img": "resource/img/banner_01.jpg",
    "url": "#2",
    "title": "222222222"
}]
let $section1 = $(".section1");
let $header = $("header");
let value = sessionStorage.getItem("key"); 
if(value){
	$section1.hide();
    $header.hide();
}else{
    console.log(value)
	sessionStorage.setItem("key", "value"); 
	setTimeout(function(){
		$header.hide();
		$section1.animate({
			"height": 0
		},1500)
	},5000)
}


function bindEnds(){
	let $doc = $(document);
	
	var s = document.getElementsByClassName("waper");
	document.addEventListener && document.addEventListener("scroll", function(a) {
		fixModule(s)
	}),
	document.addEventListener && document.addEventListener("DOMMouseScroll", function(a) {
		fixModule(s)
	}, !1);
	$doc.on("click", ".playBtn", function(){
		let $this = $(this),
			$video = $this.next("video").get(0);

		if($video.paused){
			$this.hide();
			$video.play();
		}
	})
}
//background
function fixModule(t) {
	for (var a = $(window).scrollTop(), s = document.documentElement.clientHeight, e = 0; e < t.length - 1; e++) {
		var i = t[e].offsetTop - 50;
		if (a + s >= i && a + s < i + s + 640) {
			var n = 160 / (i + s + 640)
			  , r = n * (a + s - i);
			$(t[e]).css("background-position", "center " + (80 - r) + "px")
		}
	}
}
function banner(){
    var html = "";
    for (let i = 0, len = data.length; i < len;i++){
		html += '<div class="swiper-slide"><a href="'+ data[i].url +'" style="background-image:url('+ data[i].img +');background-size:cover;background-position:center center;" title="'+ data[i].title +'"></a></div>';
	}
	$(".swiper-wrapper").html(html);
	seiper()	
}
function seiper(){
	var swiper = new Swiper('.swiper-container', {
		pagination: {
			el: '.swiper-pagination'
		},
		loop : true,
        autoplay : 1000
	});
}
function init(){
	banner()
	let windowH = $(window).height();
	$section1.height(windowH);
	setTimeout(function(){
		$(".totalTit").addClass("active");
	},500)
	bindEnds();
}
init()