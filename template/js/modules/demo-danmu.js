//实例化弹幕
var danmuData = ["找回年轻时贪玩的你"];
var dm = new danMu({
  device: "pc", // m代表移动端弹幕,不设置或设为pc代表pc端弹幕
  stage: $("#danmuStage"),
  danMuClassName: "danmu_item",
  comments: danmuData,
  danMuHtml: "<span>{comment}</span>",
  colors: ["#f8dbae"],
  flyTime: 10000,
  timeInterval: 500,
  randomSort: true,
  autoplay: true,
  hSpacing: 0.2,
  leastNum: 20,
  mAnimation: "transform",
  myDanMuPrefix: "",
  cookieExp: 1,
  cookieName: "dm_JyLie_20221116110000",
});
dm.play();
// 发送弹幕
$("#danmuBtn").on("click", function () {
  var msg = $("#danmuInput select option:selected").val();
  // var msg = $("#danmuInput input").val();
  // setTimeout(function () {
  //   $("#danmuInput input").val("");
  // }, 30);
  // 发布的信息上传到服务器，上传成功后直接push到
  danmuData.push(msg);
  // 然后调用这个方法发布信息
  dm.send(msg);
});
// 弹幕end
