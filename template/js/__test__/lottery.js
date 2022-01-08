// /* 圆周旋转抽奖 by jQuery-rotate.js */
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

// /* 方形抽奖 */
// $('.btn-lottery').on('click', function () {
//   var index = jtool.getRandom(0, 11);
//   jtool.lottery(
//     index,
//     12,
//     function (index) {
//       $('.lottery-item').eq(index).addClass(jtool.activeCls).siblings().removeClass(jtool.activeCls);
//     },
//     function (index) {
//       $('.lottery-item').eq(index).addClass(jtool.activeCls).siblings().removeClass(jtool.activeCls);
//       jtool.showTip('<p>恭喜获得' + index + '</p>');
//     }
//   );
// });
