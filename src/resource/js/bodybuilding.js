import '../css/bodybuilding.scss';
import '../css/swiper.css';

const util = require('./common/util');

const Swiper = require('./common/swiper.min');

let data = [{
    "img": "resource/img/banner.jpg",
    "url": "#1",
    "title": "1111111111111"
},{
    "img": "resource/img/banner.jpg",
    "url": "#2",
    "title": "222222222"
}]
function bindEnds(){
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		// 获取已激活的标签页的名称
		var activeTab = $(e.target).text(); 
		// 获取前一个激活的标签页的名称
		var previousTab = $(e.relatedTarget).text();
	});
	let $buildingFixed = $(".building-fixed");
	$(".coach-ul").on("click", "li", function(){
		$buildingFixed.show();
	})
	$buildingFixed.on("click", ".close", function(){
		$buildingFixed.hide();
	})
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
    banner();
	bindEnds();
}
init()