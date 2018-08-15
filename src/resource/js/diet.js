import '../css/diet.scss';
import '../css/swiper.css';

const util = require('./common/util');

const Swiper = require('./common/swiper.min');

let data = [{
    "img": "resource/img/banner.jpg",
    "url": "#1",
    "title": "1111111111111"
}]
function bindEnds(){

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
        autoplay : 5000
	});
}
function init(){
    banner();
	bindEnds();
}
init()