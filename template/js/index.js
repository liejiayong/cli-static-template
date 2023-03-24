JTool.onClipboard(".jBtnPopCode");
JTool.dialog.setConfig("namespace", { uiClass: "pops--green" });

/*
  个人信息
  dialogUinfo.open();
  dialogUinfo.destroy();
*/
var dialogUinfo = DialogJS.uinfo({
  async: true,
  // title: "个人信息",
  prefix: "恭喜你！获得XXX !",
  suffix: "活动结束后会有专员联系您确认信息，请留意来自“江西-南昌”的来电~",
  footer: "",
  data: [
    { label: "姓名", value: "贪玩游戏", key: "nickname", placeholder: "请输入姓名", type: "input" },
    { label: "手机", value: "", key: "tel", placeholder: "请输入手机号", type: "input" },
    {
      label: "验证码",
      value: "",
      key: "code",
      placeholder: "请输入验证码",
      type: "code",
      buttonText: "获取验证码",
      duration: 60,
    },
    { label: "地址", value: "广州市", key: "address", placeholder: "请输入收货地址", type: "input" },
  ],
  onBeforeClose: function (action, done) {
    /* 点击确认按钮逻辑 */
    if (action == "button") {
      var Loading = JTool.Loading();
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
          Loading.stop();
          JTool.showToast("点击确认");
        }, 100);
      });
    }
  },
  onMounted: function () {
    /* 初始化获取验证码按钮 */
    JTool.button.verify({
      target: ".pops__btn__ac",
      duration: 60,
      onStart: function () {
        JTool.showToast("短息发送成功");
      },
      onComplete: function () {
        JTool.showToast("可以重新获取短息啦~");
      },
    });
  },
});
/* 个人信息 end */

/*
  绑定游戏
  打开：dialogBind.open();
  销毁：dialogBind.destroy();
*/
var dialogBind = DialogJS.bind({
  async: true,
  title: "绑定游戏",
  // prefix: "恭喜获得礼包码xxx",
  suffix: "",
  footer: "温馨提示：绑定游戏后无法更换",
  data: [
    {
      id: "selectServer",
      label: "区服",
      value: "",
      key: "server",
      placeholder: "请选择区服",
      type: "select",
      data: [
        { text: "王城争霸", id: 1 },
        { text: "原始传奇", id: 2 },
        { text: "蓝月传奇", id: 3 },
        { text: "热血封神", id: 4 },
      ],
    },
    {
      id: "selectRole",
      label: "角色",
      value: "维特更斯坦",
      key: "role",
      placeholder: "请选择角色",
      type: "select",
      data: [
        { text: "爱因斯坦", id: 1 },
        { text: "维特更斯坦", id: 2 },
      ],
    },
  ],
  onBeforeClose: function (action, done) {
    /* 点击确认按钮逻辑 */
    if (action == "button") {
      var Loading = JTool.Loading();
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
          Loading.stop();
          JTool.showToast("点击确认");
        }, 100);
      });
    }
  },
  onMounted: function () {
    // 初始化select功能
    var js_select1 = $("#selectServer").select2({
      placeholder: "选择区服",
      allowClear: true,
      width: "100%",
      data: [
        { text: "王城争霸", id: 1 },
        { text: "原始传奇", id: 2 },
        { text: "蓝月传奇", id: 3 },
        { text: "热血封神", id: 4 },
      ],
    });
    // 若区服已选择过，则可初始化
    js_select1.val(2).trigger("change");

    var js_select2 = $("#selectRole").select2({
      placeholder: "选择角色",
      allowClear: true,
      width: "100%",
      data: [
        { text: "爱因斯坦", id: 1 },
        { text: "维特更斯坦", id: 2 },
      ],
    });
    // 若角色已选择过，则可初始化
    js_select2.val(2).trigger("change");

    $("#selectServer").change(function () {
      var val = $(this).val();

      // request 数据并初始化
      var js_select2 = $("#selectRole").select2({
        placeholder: "选择角色",
        allowClear: true,
        width: "100%",
        data: [
          { text: "爱因斯坦", id: 1 },
          { text: "维特更斯坦", id: 2 },
        ],
      });
      // 若角色已选择过，则可初始化
      js_select2.val(2).trigger("change");
    });
  },
});
/* 绑定游戏 end */

/* 绑定游戏 */
$(".jbtnBind").on("click", function () {
  dialogBind.open();
});
/* 填写个人信息 */
$(".jbtnUinfo").on("click", function () {
  dialogUinfo.open({ prefix: "个人信息" + Date.now() });
});

/* 我的奖励——默认模式 */
var recordData = [
  {
    name: "实物奖品",
    content: "华为fold手机",
    keyType: "buttonUserinfo" /* 为实物奖品且需要填写个人信息时设置keyType:'buttonUserinfo' */,
  },
  {
    name: "礼品",
    content: "原始传奇神级套餐",
    keyType: "buttonBind" /* 为奖励需要绑定游戏信息时设置keyType:'buttonBind' */,
  },
  {
    name: "礼品",
    content: "原始传奇神级套餐",
    keyType: "buttonCode" /* 为需要打开兑换码弹窗时设置keyType:'buttonCode' */,
  },
  { name: "兑换码", content: "AAAA BBBB CCCC DDDD", keyType: "copy" /* 为兑换码时设置type:'copy' */ },
  { name: "京东礼金卡", content: "100元" },
];
var dialogRecord = DialogJS.record({
  async: true,
  title: "我的奖励",
  // column的字段action的键值指定data数据中keyType的类型
  column: [
    { label: "奖品名称", prop: "name" },
    { label: "奖品内容", prop: "content", action: "keyType" },
  ],
  data: recordData,
  onBeforeClose: function (action, done) {
    /* 点击确认按钮逻辑 */
    if (action == "button") {
      var Loading = JTool.Loading();
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
          Loading.stop();
          JTool.showToast("点击确认");
        }, 0);
      });
    }
  },
});
/* 模态框--我的奖励-礼品查看 */
$(".jpopRecord").on("click", ".jpopBtnCallCode", function () {
  var dialogCode = DialogJS.code({
    title: "恭喜获得礼包码",
    message: "code" + Date.now(),
    prefix: "恭喜获得华为手机",
    // suffix: "福利-激活码-输入礼包码-兑换",
    footer: "温馨提示：请尽快兑换礼包码，避免失效",
  });
});
/* 模态框--我的奖励-待领取绑定游戏信息 */
$(".jpopRecord").on("click", ".jpopBtnCallBind", function () {
  dialogBind.open({ prefix: "" });
});
/* 模态框--我的奖励-填写个人信息 */
$(".jpopRecord").on("click", ".jpopBtnCallUinfo", function () {
  dialogUinfo.open({ prefix: "" });
});
$(".btn-myprize").on("click", function () {
  recordData.push({ name: "兑换码", content: Date.now() + "", keyType: "copy" });
  dialogRecord.open({
    title: "我的奖励",
    data: recordData,
    prefix: "",
    suffix: "",
  });
});
/* 我的奖励——默认模式 end */

/* 礼包码 */
$(".jbtnCode1").on("click", function () {
  var messageHTML = "<div class='pt-20'>恭喜获得XXXX礼包码</div>";
  messageHTML += '<div class="ico-inp mauto mt-20">请收下礼包码：AAABBBCCCDDD</div>';
  messageHTML +=
    '<button data-clipboard-text="AAABBBCCCDDD" class="mt-20 jy-btn-txt ico-btn-reset pops__btn pops__btn__ok jBtnPopCode jpopCodeConfirm">一键复制</button>';
  var dialogCode = DialogJS.diy({
    title: "恭喜获得礼包码",
    //  prefix: "恭喜获得华为手机",
    // suffix: "福利-激活码-输入礼包码-兑换",
    footer: "请前往游戏内兑换礼包码",
    message: messageHTML,
    // showHeader: false,
    showButton: false,
    onMounted: function () {
      $(".jpopCodeConfirm").on("click", function () {
        dialogCode.destroy();
      });
    },
  });
});
$(".jbtnCode").on("click", function () {
  var dialogCode = DialogJS.code({
    title: "恭喜获得礼包码",
    message: "code1" + Date.now(),
    // prefix: "恭喜获得华为手机",
    // suffix: "福利-激活码-输入礼包码-兑换",
    footer: "温馨提示：请尽快兑换礼包码，避免失效",
    onBeforeClose: function (action, done) {
      /* 点击确认按钮逻辑 */
      if (action == "button") {
        var Loading = JTool.Loading();
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
            Loading.stop();
            JTool.showToast("点击确认");
          }, 0);
        });
      }
    },
  });
});
/* 礼包码 end */

/* 温馨提示 */
$(".btn-rule").on("click", function () {
  var dialogDiy = DialogJS.diy({
    async:false,
    title: "title",
    message: "hello world<div style='background:white;padding:1em'>温馨提示</div>",
    prefix: "",
    suffix: "",
    footer: "",
    onBeforeClose: function (action, done) {
      /* 点击确认按钮逻辑 */
      if (action == "button") {
        var Loading = JTool.Loading();
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(true);
            Loading.stop();
            JTool.showToast("点击确认");
          }, 0);
        });
      }
    },
  });
});
/* 温馨提示 end */
