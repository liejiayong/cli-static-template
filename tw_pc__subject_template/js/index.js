/*
 * Description:
 * version:
 * Author: liejiayong(809206619@qq.com)
 * Date: 2020-06-29 16:25:09
 * @LastEditors: liejiayong(809206619@qq.com)
 * @LastEditTime: 2021-04-29 17:57:45
 */
var jtool = {
	disableCls: 'disable',
	activeCls: 'active',
	showTip: function (html, cls) {
		cls = cls || '#popTipNorm';
		var $tip = $('#J_tipPop');
		$tip.find(cls).html(html);
		$tip.fadeIn();
	},
	throttle: function throttle(fn, threshhold) {
		var timer = null;
		var start = Date.now();
		return function () {
			var context = this,
				arg = arguments,
				curr = Date.now();
			if (timer) clearTimeout(timer);
			if (curr - start >= threshhold) {
				fn.apply(context, arg);
				start = curr;
			} else {
				timer = setTimeout(function () {
					fn.apply(context, arg);
				}, threshhold);
			}
		};
	},
	preStyle: function preStyle(style) {
		var el = document.createElement('div');

		var vendor = (function () {
			var transformName = {
				webkit: 'webkitTransform',
				Moz: 'MozTransform',
				O: 'OTransform',
				ms: 'msTransform',
				standard: 'transform',
			};
			for (var key in transformName) {
				if (el[key] !== 'undefined') {
					return key;
				}
			}
			return false;
		})();

		if (vendor === false) {
			return false;
		}

		if (vendor === 'standard') {
			return style;
		}
		return '-' + vendor.toLowerCase() + '-' + style.toLowerCase();
	},
	getRandom: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	},
	// extend: function extend(def, nw) {
	//   for (var key in nw) {
	//     if (def[key] && nw.hasOwnProperty(key)) {
	//       def[key] = nw[key];
	//     }
	//   }
	//   return def;
	// },
	// /**
	//  * 骰子点数动画
	//  * @param {*} count 最后点数
	//  */
	// diss: function (count, cb, duration) {
	//   duration = duration || 800;
	//   var $diss = $('.btn-dot-i'),
	//     self = this;
	//   var ra, fn;
	//   fn = function () {
	//     ra = requestAnimationFrame(function () {
	//       $diss.attr('class', 'jy-btn btn-dot-i i-dot-' + self.getRandom(1, 6));
	//       fn();
	//     });
	//   };
	//   fn();
	//   setTimeout(function () {
	//     cancelAnimationFrame(ra);
	//     $diss.attr('class', 'jy-btn btn-dot-i i-dot-' + count);
	//     setTimeout(function () {
	//       cb();
	//     }, 100);
	//   }, duration);
	// },
};

// function SmoothSwing(el, range) {
//   this.el = document.querySelector(el) || null;
//   this.preX = 0;
//   this.preY = 0;
//   this.nextX = 0;
//   this.nextY = 0;
//   this.curX = 0;
//   this.curY = 0;
//   this.range = range;
// }
// SmoothSwing.prototype.setPosition = function (pos) {
//   this.nextX = pos.x;
//   this.nextY = pos.y;
//   var curX,
//     curY,
//     range = this.range;
//   curX = this.nextX - this.preX;
//   curX = curX > 0 ? range[1] : range[0];
//   curY = this.nextY - this.preY;
//   curY = curY > 0 ? range[1] : range[0];
//   this.curX = curX;
//   this.curY = curY;
//   this.preX = pos.x;
//   this.preY = pos.y;
// };
// SmoothSwing.prototype.listen = function (cb) {
//   var ever = document.body || document.documentElement,
//     t = this;
//   ever.addEventListener('mousemove', function (e) {
//     t.setPosition({ x: e.clientX, y: e.clientY });
//     var x = t.curX,
//       y = t.curY;
//     t.el.style.cssText = '-webkit-transition: all .2s;transition: all .2s;-webkit-transform:translate(' + x + 'px, ' + y + 'px)' + ';transform:translate(' + x + 'px, ' + y + 'px)';
//     console.log();
//   });
//   this.ever = ever;
// };
// SmoothSwing.prototype.remove = function (cb) {
//   this.ever.removeEventListener('mousemove', cb);
//   this.ever = null;
// };
// // 使用前需要将元素设置固定定位
// var smoothSwing = new SmoothSwing('.c-logo', [-10, 10]);
// smoothSwing.listen();

$(function () {
	$('.jy-pop_close,.jpop-cancel,.jy-pop_submit').on('click', function () {
		$(this).parents('.jy-pop').fadeOut();
	});
	// 复制激活码
	var clipboard = new ClipboardJS('.jbtnpopcopy');
	clipboard.on('success', function (e) {
		$('.jy-toast').text('复制成功').fadeIn(200).fadeOut(3500);
	});
	clipboard.on('error', function (e) {
		$('.jy-toast').text('浏览器不支持点击复制，请长按链接复制！').fadeIn(200).fadeOut(3500);
	});

	// 我的奖励 start
	// 礼包码
	$('.btn-pop-code').on('click', function () {
		$('#J_codePop').fadeIn();
	});
	// 填写信息
	$('.btn-pop-address').on('click', function () {
		$('#J_addressPop').fadeIn();
	});
	// 待领取
	$('.btn-pop-get').on('click', function () {
		$('#J_regPop').fadeIn();
	});
	// 我的奖励 end

	// pop 区服搜索 start
	$('.jy-pop_select_seek-label').on('click', function () {
		var $content = $('.jy-pop_select_seek-content');
		if ($content.hasClass('active')) {
			$content.fadeOut().removeClass('active');
		} else {
			$content.fadeIn().addClass('active');
		}
	});
	$('.jy-pop_select_seek-val').on('click', function () {
		$('.jy-pop_select_seek-content').fadeOut().removeClass('active');
	});
	// pop 区服搜索 end

	$('.btn-get').on('click', function () {
		if ($(this).hasClass(jtool.activeCls)) {
			jtool.showTip('<p>恭喜获得</p>');
		}
	});
	$('.btn-inter').on('click', function () {
		jtool.showTip('<p>我的积分：0</p>');
	});
	$('.btn-record').on('click', function () {
		$('#J_recordPop').fadeIn();
	});
	$('.btn-mygift').on('click', function () {
		$('#J_mygiftPop').fadeIn();
	});
	$('.btn-info').on('click', function () {
		$('#J_regPop').fadeIn();
	});

	// // 摇骰子
	// $('.btn-jdot').on('click', function () {
	//   var $t = $(this);
	//   if (!$t.hasClass(jtool.activeCls) || jtool.loading) return;
	//   $t.removeClass(jtool.activeCls);
	//   var dissNum = jtool.getRandom(1, 6);
	//   jtool.diss(dissNum, function () {
	//     jtool.showTip('恭喜抽到' + dissNum);
	//     $t.addClass(activeCls);
	//   });
	// });

	// //  home page
	// jQuery("#hnews").slide({
	//   triggerTime: 0, effect: "fold"
	// });
	// jQuery("#hbans").slide({ titCell: '.hd', mainCell: ".bd", autoPage: true, effect: "fade", autoPlay: true });

	// // 轮播图或滚动公告使用
	// var mySwiper = new Swiper('#rankls', {
	// 	loop: true,
	// 	autoplay: true,
	// 	initialSlide: 0,
	// 	direction: 'vertical',
	// 	slidesPerView: 7,
	// 	slidesPerGroup: 7,
	// 	observer: true,
	// 	observeParents: true,
	// });
	// function initSwiper() {
	// 	setTimeout(function () {
	// 		mySwiper.update();
	// 	}, 100);
	// }
	// initSwiper();

	// // 抽奖
	// var DEG = 360 / 12;
	// $('.btn-lottery').rotate({
	// 	bind: {
	// 		click: function () {
	// 			var count = 1;
	// 			// $.post('/act.php',{},function(){
	// 			$('.lottery-p').rotate({
	// 				angle: 0,
	// 				animateTo: 360 * 8 + (count - 1) * DEG,
	// 				duration: 3500,
	// 				center: ['50%', '50%'],
	// 				callback: function () {
	// 					jtool.showTip('恭喜');
	// 				},
	// 				step: function () {},
	// 				easing: function (x, t, b, c, d) {
	// 					return c * (t / d) + b;
	// 				},
	// 				getRotateAngle: function () {},
	// 				stopRotate: function () {},
	// 			});
	// 			// },'json');
	// 		},
	// 	},
	// });

	// // 弹幕
	// //初始的弹幕数据
	// var danmuData = ['这里是留言弹幕这里是留言弹幕这里是留言弹幕这里是留言弹幕'];

	// //实例化弹幕
	// var dm = new danMu({
	// 	device: 'pc', // m代表移动端弹幕,不设置或设为pc代表pc端弹幕
	// 	stage: $('#danmuStage'),
	// 	danMuClassName: 'danmu_item',
	// 	comments: danmuData,
	// 	danMuHtml: '<span>{comment}</span>',
	// 	colors: ['#c4aa8d'],
	// 	flyTime: 10000,
	// 	timeInterval: 800,
	// 	randomSort: false,
	// 	autoplay: true,
	// 	hSpacing: 0.2,
	// 	leastNum: 1,
	// 	mAnimation: 'transform',
	// 	myDanMuPrefix: '',
	// });
	// dm.play();

	// // 发送弹幕
	// $('.btn-msg').on('click', function () {
	// 	var msg = $('.danmu-input').val();
	// 	// 发布的信息上传到服务器，上传成功后直接push到
	// 	danmuData.push(msg);
	// 	// 然后调用这个方法发布信息
	// 	dm.send(msg);
	// });
	// // 弹幕end
});
