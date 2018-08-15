import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

let util = {};

if (window.console) {
	let log = window.console.log;
	window.console.log = process.env.NODE_ENV == 'production' ? () => {} : log
}


function bindEvents(){
	var $doc = $(document);
	var $phoneNav = $('div.phoneNav'),
		$menus = $('.menus');
	$doc.on("click", '.menus', function(){
		var $this = $(this);
		if($this.hasClass('active'),$phoneNav.hasClass('active')){
			$this.removeClass('active');
			$phoneNav.removeClass('active');
		}
		else{
			$this.addClass('active');
			$phoneNav.addClass('active');
		}
	});
	$phoneNav.on("click", '.gb', function(){
		if($menus.hasClass('active'),$phoneNav.hasClass('active')){
			$menus.removeClass('active');
			$phoneNav.removeClass('active');
		}
		else{
			$(this).addClass('active');
			$phoneNav.addClass('active');
		}
	});
}

util.init = () => {
	bindEvents();
}
util.init();
module.exports = util