JTool.onClipboard(".jBtnPopCode");
JTool.dialog.setConfig("namespace", { uiClass: "pops--green" });
function bindMockDelay(flag, done) {
  JTool.utils.delay(function () {
    done(flag);
    var msg = flag ? "提交成功" : "提交失败，请稍后再试~";
    JTool.showToast(msg);
  }, 1000);
}

/**
  个人信息  
  打开：dialogBind.open();
  销毁：dialogBind.destroy();
**/
var dialogUinfo = DialogJS.uinfo({
  async: true,
  title: "个人信息",
  prefix: "恭喜你！获得XXX !",
  suffix: "",
  footer: "活动结束后会有专员联系您确认信息，请留意来自“江西-南昌”的来电~",
  buttonText: "确认按钮文本",
  // button:
  //   '<button role="button" aria-label="dialog confirm button" onclick="callFnTest()" class="pops__btn pops__btn__ok pops__mt jpopClose">自定义确认按钮</button>',
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
  // done(true)时弹窗关闭
  onBeforeClose: function (action, done) {
    /* 点击确认按钮逻辑 */
    if (action == "button") {
      // mock status
      var isFlag = [true, false][JTool.utils.getRandom(0, 1)];
      bindMockDelay(isFlag, done);
    } else {
      done(true);
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
  onClose: function () {
    console.log("-------dialog onClose-------");
  },
  onDestroy: function () {
    console.log("-------dialog onDestroy-------");
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
  prefix: "恭喜获得礼包码xxx",
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
      // id为唯一值
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
  // done(true)时弹窗关闭
  onBeforeClose: function (action, done) {
    /* 点击确认按钮逻辑 */
    if (action == "button") {
      bindMockDelay(true, done);
    } else {
      done(true);
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

// 填写个人信息
$(".jbtnUinfo").on("click", function () {
  dialogUinfo.open({ prefix: "个人信息" });
});

// 绑定游戏信息
$(".jbtnBind").on("click", function () {
  dialogBind.open({ prefix: "绑定游戏" });
});

/* 我的奖励——默认模式 */
var recordData = [
  {
    name: "实物奖品",
    content: "华为fold手机",
  },
  {
    name: "绑定",
    content: "原始传奇神级套餐",
  },
  {
    name: "礼品",
    content: "原始传奇神级套餐",
  },
  { name: "兑换码", content: "AAAA BBBB CCCC DDDD" },
  { name: "京东礼金卡", content: "100元" },
];
var dialogRecord = DialogJS.record({
  async: true,
  title: "我的奖励",
  prefix: "",
  suffix: "",
  footer: "温馨提示：请尽快兑换奖品以免失效~",
  showColumn: true,
  // column字段中action的键值指定data数据中keyType的类型
  column: [
    { label: "奖品名称", prop: "name" },
    {
      label: "奖品内容",
      prop: "content",
      // 设置奖品内容 或 按钮类型
      render: function (params, index) {
        var retStr = params.content;
        switch (params.name) {
          case "实物奖品":
            retStr = '<button role="button" class="ico-btn-reset pops__link jpopBtnCallUinfo">填写信息</button>';
            break;
          case "绑定":
            retStr = '<button role="button" class="ico-btn-reset pops__link jpopBtnCallBind">去绑定</button>';
            break;
          case "兑换码":
            retStr = JTool.utils.tagString(
              "div",
              {
                class: ["pops__link", "jBtnPopCode"],
                attr: {
                  role: "button",
                  "data-clipboard-text": JTool.utils.trimAll(params.content),
                },
              },
              params.content
            );
            break;
          default:
            retStr = params.content;
            break;
        }
        return retStr;
      },
    },
  ],
  data: recordData,
  // done(true)时弹窗关闭
  onBeforeClose: function (action, done) {
    /* 点击确认按钮逻辑 */
    if (action == "button") {
      bindMockDelay(true, done);
    } else {
      done(true);
    }
  },
});
// 我的奖励
$(".btn-record").on("click", function () {
  recordData.push({ name: "兑换码", content: Date.now() + "" });
  dialogRecord.open({
    title: "我的奖励",
    data: recordData,
    // prefix: "",
    // suffix: "",
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
/* 我的奖励——默认模式 */

/* 我的奖励——diy模式 */
var dialogDiyRecord = DialogJS.diy({
  async: true,
  scrollable: false,
  title: "我的奖励",
  message: "",
  prefix: "",
  suffix:
    '<div class="tc"><img style="width:2rem" src="https://image.tanwan.com/huodong/sy/2022nzhd/img/3029.png"/></div>',
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
$(".jbtnMyPrize1").on("click", function () {
  var recordTpl = [
    '<div class="pops__grid pops__grid--line">',
    '<div class="pops__grid__thead">',
    '<div class="pops__grid__tr">',
    ' <div class="pops__grid__td">奖品名称</div>',
    '<div class="pops__grid__td">奖品内容</div>',
    "</div>",
    "</div>",
    '<div class="pops__grid__tbody">{{children}}</div>',
    "",
    "</div>",
  ].join("");
  var data = [
    { name: "荣耀传奇礼包", content: "AAAA BBBB CCCC DDDD" },
    { name: "荣耀传奇礼包", content: "AAAA BBBB CCCC DDDD" },
    { name: "荣耀传奇礼包", content: "AAAA BBBB CCCC DDDD" },
    { name: "荣耀传奇礼包", content: "AAAA BBBB CCCC DDDD" },
  ];
  var messageHTML = "";
  data.forEach(function (item) {
    messageHTML += JTool.utils.tagString("div", { class: "pops__grid__tr" }, [
      {
        type: "div",
        props: {
          class: "pops__grid__td",
        },
        children: item.name,
      },
      {
        type: "div",
        props: {
          class: ["pops__grid__td", "jBtnPopCode"],
          attr: { "data-clipboard-text": JTool.utils.trimAll(item.content || "") },
        },
        children: item.content,
      },
    ]);
  });
  messageHTML = JTool.utils.tplFormat(recordTpl, { children: messageHTML });
  dialogDiyRecord.open({
    title: "我的奖励",
    prefix: "",
    suffix: "",
    message: messageHTML,
    footer: "温馨提示：请尽快兑换奖品以免失效~",
    // done(true)时弹窗关闭
    onBeforeClose: function (action, done) {
      /* 点击确认按钮逻辑 */
      if (action == "button") {
      }
      done(true);
    },
  });
});
/* 我的奖励——diy模式 end */

/* 礼包码 */
// 礼包码-自定义 DialogJS.diy
$(".jbtnCode0").on("click", function () {
  var messageHTML = "<div class=''>恭喜获得XXXX礼包码</div>";
  messageHTML += '<div class="ico-inp mauto pops__mt">请收下礼包码：AAABBBCCCDDD</div>';
  var dialogCode = DialogJS.diy({
    // showHeader: false,
    title: "恭喜获得礼包码",
    prefix: "恭喜获得华为手机",
    suffix: "福利-激活码-输入礼包码-兑换",
    message: messageHTML,
    button:
      '<button data-clipboard-text="AAABBBCCCDDD" class="pops__mt jy-btn-txt ico-btn-reset pops__btn pops__btn__ok jBtnPopCode jpopClose">自定义复制按钮</button>',
    footer: "请前往游戏内兑换礼包码",
    // done(true)时弹窗关闭
    onBeforeClose: function (action, done) {
      /* 点击确认按钮逻辑 */
      if (action == "button") {
      }
      done(true);
    },
  });
});
// 礼包码-组件_vertical模式(默认模式) DialogJS.code
$(".jbtnCode1").on("click", function () {
  var dialogCode = DialogJS.code({
    direction: "vertical",
    title: "温馨提示",
    prefix: "恭喜获得礼包码",
    message: "code1" + Date.now(),
    // suffix: "温馨提示：请尽快兑换礼包码，避免失效",
    footer: "福利-激活码-输入礼包码-兑换",
    // button:
    //   '<button role="button" aria-label="dialog confirm button" class="pops__btn pops__btn__ok pops__mt jpopClose jBtnPopCode">自定义按钮</button>',
    // done(true)时弹窗关闭
    onBeforeClose: function (action, done) {
      /* 点击确认按钮逻辑 */
      if (action == "button") {
      }
      done(true);
    },
  });
});
// 礼包码-组件_horizontal模式 DialogJS.code
$(".jbtnCode2").on("click", function () {
  var dialogCode = DialogJS.code({
    direction: "horizontal",
    title: "温馨提示",
    prefix: "恭喜获得礼包码",
    message: "code1" + Date.now(),
    // suffix: "温馨提示：请尽快兑换礼包码，避免失效",
    footer: "福利-激活码-输入礼包码-兑换",
    // button:
    //   '<button role="button" aria-label="dialog confirm button" class="pops__btn pops__btn__ok pops__mt jpopClose">自定义按钮</button>',
    // done(true)时弹窗关闭
    onBeforeClose: function (action, done) {
      /* 点击确认按钮逻辑 */
      if (action == "button") {
      }
      done(true);
    },
  });
});
/* 礼包码 end */

/* 温馨提示 */
$(".btn-rule").on("click", function () {
  var dialogDiy = DialogJS.diy({
    title: "title",
    prefix: "前缀" + Date.now(),
    message: "hello world<div style='background:white;padding:1em'>温馨提示</div>",
    suffix: "后缀" + Date.now(),
    footer: "<div>页脚</div>",
    button:
      '<button role="button" aria-label="dialog confirm button" class="pops__btn pops__btn__ok pops__mt jpopClose">自定义按钮</button>',
    // done(true)时弹窗关闭
    onBeforeClose: function (action, done) {
      /* 点击确认按钮逻辑 */
      if (action == "button") {
      }
      done(true);
    },
  });
});
/* 温馨提示 end */
