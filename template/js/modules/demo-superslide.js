/* 
  superslide plugin use
 */
jQuery('#hbans').slide({
  mainCell: '.bd ul',
  autoPlay: true,
  effect: 'topMarquee',
  vis: 5,
  interTime: 50,
});

//  home page
jQuery("#hnews").slide({
  triggerTime: 0, effect: "fold"
});
jQuery("#hbans").slide({ titCell: '.hd', mainCell: ".bd", autoPage: true, effect: "fade", autoPlay: true });
