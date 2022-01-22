//实例化弹幕
var dm = new danMu({
  device: 'pc', // m代表移动端弹幕,不设置或设为pc代表pc端弹幕
  stage: $('#danmuStage'),
  danMuClassName: 'danmu_item',
  comments: danmuData,
  danMuHtml: '<span>{comment}</span>',
  colors: ['#f24b77', '#d900d1', '#bc2204', '#1ca900', '#ffba34', '#bc2204', '#e100c4'],
  flyTime: 10000,
  timeInterval: 500,
  randomSort: true,
  autoplay: true,
  hSpacing: 0.2,
  leastNum: 20,
  mAnimation: 'transform',
  myDanMuPrefix: '',
  cookieExp: 1,
  cookieName: 'dm_JyLie',
});
dm.play();

// 发送弹幕
$('.btn-send').on('click', function () {
  var msg = $('.danmu-input').val();
  // 发布的信息上传到服务器，上传成功后直接push到
  danmuData.push(msg);
  // 然后调用这个方法发布信息
  dm.send(msg);
});
// 弹幕end
