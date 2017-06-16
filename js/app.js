var processor = {
	doLoad: function(){
	    var _this = this;
	    var arrImg = [
	    'img/bg1.jpg',
	    'img/bg2.jpg',
	    'img/bg3.jpg',
	    'img/bg4.jpg',
	    'img/btn.png',
	    'img/meilixiangcun.png',
	    'img/txt.png',
	    'img/audio.png',
	    'img/loading.png',
	    'img/control-icon.png',
	    'img/mobile-icon.png'];
	    var total = arrImg.length, index = 0;

	    function loadImage(url, callback){
	        var img = new Image();
	        img.src = url;
	        
	        if (img.complete) {
	            callback();
	            return;
	        }
	        img.onload = function () {
	            callback();
	            return;
	        }
	        img.onerror = function () {
	            callback();
	            return;
	        }
	    }

	    function success(){
	        if(index < total){
	            index++;
	        }
	        if(index == total){
	            setTimeout(function(){
	            	$('#loading').hide();
	            	
	            	//判断微信中打开
	            	var ua = navigator.userAgent.toLowerCase();
	            	if(ua.match(/MicroMessenger/i)=="micromessenger") {
	            	    $.getScript('js/wx.js');
	            	} else {
	            	    _this.initMusic();
	            	}
	            	
	            	_this.orientation();
	            },200)
	            clearInterval(timeImage);
	        }
	    }

	    var timeImage = setInterval(function(){
	        loadImage(arrImg[index], success);
	    }, 100);
	},
	orientation: function(){
		var _this = this;
		_this.initPage();
		$(window).on('resize', function(){
			_this.initPage();
		})
	},
	sharetip: function(){
		$('#shareBtn').on('click', function(e){
			e.stopPropagation();
			$('#sharetip').addClass('active');
		});
		$('#sharetip').on('click', function(e){
			e.stopPropagation();
			$(this).removeClass('active');
		})
	},
	initPage: function(){
		var _this = this;
		_this.sharetip();

		var w = $(window).width(),
		    h = $(window).height();

		if(w<h){
			$scene = $('#scene'),
			$last = $('#last'),
		    pageH = $scene.height();

			var startY, translateX;
			$last.css({
				width: w,
				height: h,
				top: pageH-h
			})

			//自动播放
			var timer = null;
			var autoPlaying = true;
			function autoPlay(){
				$('#control').removeClass('pause');
				var distance = Number($scene.css('transform').split(',')[5].replace(')', ''));
				distance -= 1;
				progress(distance);
				// parallax(distance);
				if(Math.abs(distance) < (pageH-h)){
					timer = setTimeout(function(){
						clearTimeout(timer);
						autoPlay();
					}, 10);
				}else{
					clearTimeout(timer);
				}
			}

			//清除自动播放
			function scenePause(){
				clearTimeout(timer);
				$('#control').addClass('pause');
			}
			function progress(dis){
				var boundary = pageH-h;
				if(dis > 0){
					dis = 0;
				}
				if(dis <= -boundary){
					dis = -boundary;
					$last.addClass('active');
				}
				if(Math.abs(dis) >= boundary){
					$('#control').addClass('pause');
					scenePause();
				}
				$scene.css({
					'transform': 'translate3d(0, '+ dis +'px, 0)'
				});
				$('#progress .percent').css('height', Math.abs(dis/boundary*100)+'%');
			}
			function parallax(dis){
				var absDistance = Math.abs(dis);

				//开始出现的位置
				var bird3 = $('.bird3').position().top;
				var bird4 = $('.bird4').position().top;
				var bird5 = $('.bird5').position().top;
				var bird6 = $('.bird6').position().top;
				var bird7 = $('.bird7').position().top;
				var bird8 = $('.bird8').position().top;
				var bird9 = $('.bird9').position().top;
				var bird10 = $('.bird10').position().top;
				var bird11 = $('.bird11').position().top;
				var people1 = $('.people1').position().top;
				var people2 = $('.people2').position().top;
				var people3 = $('.people3').position().top;
				var people4 = $('.people4').position().top;
				var people5 = $('.people5').position().top;
				var people6 = $('.people6').position().top;
				var people7 = $('.people7').position().top;
				var people8 = $('.people8').position().top;
				var moon = $('.moon').position().top;

				var transX = function(pos){
					return absDistance-(pos-h);
				}
				if(absDistance > (bird3-h) && absDistance < bird3){
					$('.bird3').css({
						'transform': 'translate3d(0, '+ transX(bird3) +'%, 0)'
					})
				}
				if(absDistance > (bird4-h) && absDistance < bird4){
					$('.bird4').css({
						'transform': '0, translate3d('+ -transX(bird4) +'%, 0)'
					})
				}
				if(absDistance > (bird5-h) && absDistance < bird5){
					$('.bird5').css({
						'transform': 'translate3d(0, '+ -transX(bird5) +'%, 0)'
					})
				}
				if(absDistance > (bird6-h) && absDistance < bird6){
					$('.bird6').css({
						'transform': 'translate3d(0, '+ transX(bird6) +'%, 0)'
					})
				}
				if(absDistance > (bird7-h) && absDistance < bird7){
					$('.bird7').css({
						'transform': 'translate3d(0, '+ -transX(bird7)/5 +'%, 0)'
					})
				}
				if(absDistance > (bird8-h) && absDistance < bird8){
					$('.bird8').css({
						'transform': 'translate3d(0, '+ -transX(bird8) +'%, 0)'
					})
				}
				if(absDistance > (bird9-h) && absDistance < bird9){
					$('.bird9').css({
						'transform': 'translate3d(0, '+ transX(bird9) +'%, 0)'
					})
				}
				if(absDistance > (bird10-h) && absDistance < bird10){
					$('.bird10').css({
						'transform': 'translate3d(0, '+ transX(bird10) +'%, 0)'
					})
				}
				if(absDistance > (bird11-h) && absDistance < bird11){
					$('.bird11').css({
						'transform': 'translate3d(0, '+ -transX(bird11)/5 +'%, 0)'
					})
				}
				if(absDistance > (people1-h) && absDistance < people1){
					$('.people1').css({
						'transform': 'translate3d(0, '+ -transX(people1)/10 +'%, 0)'
					})
				}
				if(absDistance > (people2-h) && absDistance < people2){
					$('.people2').css({
						'transform': 'translate3d(0, '+ -transX(people2)/15 +'%, 0)'
					})
				}
				if(absDistance > (people3-h) && absDistance < people3){
					$('.people3').css({
						'transform': 'translate3d('+ -transX(people3)/15 +'%, 0, 0)'
					})
				}
				if(absDistance > (people4-h) && absDistance < people4){
					$('.people4').css({
						'transform': 'translate3d(0, '+ -transX(people4)/10 +'%, 0)'
					})
				}
				if(absDistance > (people5-h) && absDistance < people5){
					$('.people5').css({
						'transform': 'translate3d(0, '+ -transX(people5)/15 +'%, 0)'
					})
				}
				if(absDistance > (people6-h) && absDistance < people6){
					$('.people6').css({
						'transform': 'translate3d(0, '+ -transX(people6)/10 +'%, 0)'
					})
				}
				if(absDistance > (people7-h) && absDistance < people7){
					$('.people7').css({
						'transform': 'translate3d(0, '+ -transX(people7)/10 +'%, 0)'
					})
				}
				if(absDistance > (people8-h) && absDistance < people8){
					$('.people8').css({
						'transform': 'translate3d(0, '+ -transX(people8)/10 +'%, 0)'
					})
				}
				if(absDistance > (moon-h) && absDistance < moon){
					$('.moon').css({
						'transform': 'translate3d(0, '+ transX(moon)/2 +'%, 0)'
					})
				}
			}

			setTimeout(function(){
				autoPlay();
				//播放控制
				$('#control').on('click', function(e){
					e.stopPropagation();
					if(autoPlaying){
						scenePause();
					}else{
						$(this).removeClass('pause');
						autoPlay();
					}
					autoPlaying = !autoPlaying;
				})
			}, 2000);



			//跳过
			$('#skip').on('click', function(e){
				e.stopPropagation();
				var distance = -(pageH-h);
				$last.addClass('active');
				progress(distance);
				scenePause();
			})

			//滑动播放
			$scene.on('touchstart', function(e){
				var touch = e.touches[0];
				startY = Number(touch.pageY);
				translateX = Number($scene.css('transform').split(',')[5].replace(')', ''));
			})
			$scene.on('touchmove', function(e){
				e.preventDefault();
				scenePause();

				var touch = e.touches[0];
				var moveY = Number(touch.pageY);
				var distance = (moveY-startY)*2+translateX;
				absDistance = Math.abs(distance);
				progress(distance);
				parallax(distance);
			})
		}
	},
	initMusic: function(url){
		var $audio = $('#audio');
		var $audioParent = $audio.parent();
		$audio[0].play();
		$audioParent.on('click', function(e){
			e.stopPropagation();
		    if(!$audio[0].paused){
		        $audio[0].pause();
		        $audioParent.removeClass('on');
		    }else{
		        $audio[0].play();
		        $audioParent.addClass('on');
		    }
		})
	}
}

$(function(){
	processor.doLoad();
})
