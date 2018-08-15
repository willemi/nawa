import '../css/activity.scss';

const util = require('./common/util');

function player(me){
	me.removeClass('play');
	me.removeClass('playing');
	//me.find("i.icon").removeClass("show");
	me.find(".loader").remove();
}
let $loader = '<div class="loader"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>'
function bindEnds(){
	let $doc = $(document);
	let $prevPlay;
	$doc.on("click", ".play-btn", function(){
		let $this = $(this);
		let $li = $this.parents("li"),
			audioSrc = $this.data("src");
		if ($prevPlay) {
			if ($prevPlay[0] != $li[0]) {
				player($prevPlay);
			}
		}
		$prevPlay = $li;	
		let $audio = $('audio.mp3-player');
		if ($audio.length == 0) {
			$audio = $('<audio class="mp3-player" style="display:none"></audio>');
			$(document.body).append($audio);
		}
		let $audioGet = $audio[0];
		if ($li.hasClass('play')) {
			$audioGet.pause && $audioGet.pause();
			player($li);
		} else {
			$li.addClass('play');
			$audio.attr('src', audioSrc);

			$audioGet.play && $audioGet.play().catch(function (e) {
				console.log(e);				
			});
			
			// $audioGet.onwaiting = function(){
			// 	$li.find("i.icon").addClass("show");
			// }
			$audioGet.onplaying = function(){
				//$li.find("i.icon").removeClass("show");
				$li.addClass('playing');
				$li.append($loader)
			}
			$audioGet.onended = function(){				
				player($li);
			}
		}
	});	
	// $doc.on("click", ".video-tbn", function(){
	// 	let $this = $(this);
	// 	let $embed = $this.next("embed");
	// 	$this.hide();
	// 	$embed[0].Play();
	// })
}
function init(){
	bindEnds();
}
init()