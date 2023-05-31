JTool.onClipboard(".jBtnPopCode");
function bindMockDelay(flag, done) {
  JTool.utils.delay(function () {
    done(flag);
    var msg = flag ? "提交成功" : "提交失败，请稍后再试~";
    JTool.showToast(msg);
  }, 1000);
}
function requestJSON(done) {
  var isFlag = [true, false][JTool.utils.getRandom(0, 1)];
  bindMockDelay(isFlag, done);
}

function DialogJS_DEMO () {
  JTool.dialog.setConfig("namespace", { uiClass: "pops--green" });

  JTool.define("tpl", function () {
    return {
      entity: function (item) {
        return JTool.utils.tagString("div", { class: "pops__grid__tr" }, [
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
              class: "pops__grid__td",
            },
            children: item.content,
          },
          {
            type: "div",
            props: {
              class: "pops__grid__td",
            },
            children: {
              type: "button",
              props: {
                class: ["pops__btn", "ico-btn-reset", "ico-pop-btn-ok", "jbtnUinfo"],
              },
              children: "填写地址",
            },
          },
        ]);
      },
      title: function (item) {
        return JTool.utils.tagString("div", { class: "pops__grid__tr" }, [
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
              class: "pops__grid__td",
            },
            children: item.content,
          },
        ]);
      },
      code: function (item) {
        return JTool.utils.tagString("div", { class: "pops__grid__tr" }, [
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
          {
            type: "div",
            props: {
              class: "pops__grid__td",
            },
            children: {
              type: "button",
              props: {
                class: ["pops__btn", "ico-btn-reset", "ico-pop-btn-ok", "jBtnPopCode"],
                attr: { "data-clipboard-text": JTool.utils.trimAll(item.content || "") },
              },
              children: "复制",
            },
          },
        ]);
      },
    };
  });
  
  /* 个人信息 */
  var dialogUinfo = DialogJS.uinfo({
    async: true,
    title: "个人信息",
    prefix: "恭喜你！获得XXX !",
    suffix: "",
    footer: "活动结束后会有专员联系您确认信息，请留意来自“江西-南昌”的来电~",
    buttonText: "确认按钮文本",
    // button:
    //   '<button role="button" onclick="callFnTest()" class="pops__btn pops__btn__ok pops__mt jpopClose">自定义确认按钮</button>',
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
      switch (action) {
        case "button":
          requestJSON(done);
          break;
        default:
          done(true);
          break;
      }
    },
    onBeforeMount: function () {
      console.log("-------dialog onBeforeMount-------");
    },
    onMounted: function () {
      console.log("-------dialog onMounted-------");
  
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
  
      // 填写个人信息
      $(".jbtnUinfo").on("click", function () {
        dialogUinfo.open({ prefix: "恭喜你!" });
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
  
  /* 绑定游戏 */
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
      switch (action) {
        case "button":
          requestJSON(done);
          break;
        default:
          done(true);
          break;
      }
    },
    onMounted: function () {
      // 初始化select功能
      var js_select1 = $("#selectServer").select2({
        placeholder: "选择区服",
        allowClear: true,
        width: "100%",
        // data: [],
      });
      // 若区服已选择过，则可初始化
      js_select1.val(2).trigger("change");
  
      var js_select2 = $("#selectRole").select2({
        placeholder: "选择角色",
        allowClear: true,
        width: "100%",
        // data: [],
      });
      // 若角色已选择过，则可初始化
      js_select2.val(2).trigger("change");
  
      $("#selectServer").change(function () {
        var val = $(this).val();
        console.log("select", val);
        // request 数据并初始化
        js_select2.val(1).trigger("change");
      });
  
      // 绑定游戏信息
      $(".jbtnBind").on("click", function () {
        dialogBind.open({ prefix: "绑定游戏" });
      });
    },
  });
  /* 绑定游戏 end */
  
  /* 我的奖励——diy模式 */
  $(".jbtnMyPrize0").on("click", function () {
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
  
    var dialogDiyRecord = DialogJS.diy({
      async: false,
      scrollable: false,
      maskClickable: true,
      target: ".jpopRecord",
      title: "我的奖励",
      message: messageHTML,
      prefix: "",
      suffix:
        '<div class="tc"><img style="width:2rem" src="http://rsj.gz.gov.cn/global/qrcode_yst.jpg"/></div>',
      footer: "温馨提示：请尽快兑换奖品以免失效",
    });
  });
  /* 我的奖励——diy模式 end */
  
  /* 我的奖励-组件_action渲染模式 */
  $(".jbtnMyPrize1").on("click", function () {
    var recordData = [
      {
        name: "实物奖品",
        content: "华为fold手机",
        keyType: "buttonUserinfo" /* 为实物奖品且需要填写个人信息时设置keyType:'buttonUserinfo' */,
      },
      {
        name: "礼品-需绑定游戏",
        content: "原始传奇神级套餐",
        keyType: "buttonBind" /* 为奖励需要绑定游戏信息时设置keyType:'buttonBind' */,
      },
      {
        name: "礼品-需弹窗打开",
        content: "原始传奇神级套餐",
        keyType: "buttonCode" /* 为需要打开兑换码弹窗时设置keyType:'buttonCode' */,
      },
      { name: "兑换码", content: "AAAA BBBB CCCC DDDD", keyType: "copy" /* 为兑换码时设置keyType:'copy' */ },
      { name: "京东礼金卡", content: "100元" },
    ];
    var dialogRecord_actionMode = DialogJS.record({
      async: false,
      scrollable: false,
      maskClickable: true,
      target: ".jpopRecord",
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
          action: "keyType",
        },
      ],
      data: recordData,
      onMounted: function () {
        /* 模态框--我的奖励-礼品查看 */
        $(".jpopRecord").on("click", ".jpopBtnCallCode", function () {
          DialogJS.code({
            direction: "vertical",
            title: "温馨提示",
            prefix: "恭喜获得华为手机",
            message: "FLFDSFDSFDFFS",
            // suffix: "",
            footer: "福利-激活码-输入礼包码-兑换",
          });
        });
        /* 模态框--我的奖励-待领取绑定游戏信息 */
        $(".jpopRecord").on("click", ".jpopBtnCallBind", function () {
          dialogBind.open({ prefix: "恭喜获得xxx" });
        });
        /* 模态框--我的奖励-填写个人信息 */
        $(".jpopRecord").on("click", ".jpopBtnCallUinfo", function () {
          dialogUinfo.open({ prefix: "恭喜获得xxx" });
        });
      },
    });
  });
  /* 我的奖励-组件_action渲染模式 end */
  
  /* 我的奖励-我的奖励-组件_render渲染模式 */
  $(".jbtnMyPrize2").on("click", function () {
    var recordData = [
      {
        name: "实物奖品",
        content: "华为fold手机",
      },
      {
        name: "礼品-需绑定游戏",
        content: "原始传奇神级套餐",
      },
      {
        name: "礼品-需弹窗打开",
        content: "原始传奇神级套餐",
      },
      { name: "兑换码", content: "AAAA BBBB CCCC DDDD" },
      { name: "京东礼金卡", content: "100元" },
    ];
    var dialogRecord_renderMode = DialogJS.record({
      async: false,
      scrollable: false,
      maskClickable: true,
      target: ".jpopRecord",
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
                retStr =
                  '<button role="button" class="ico-btn-reset pops__link jpopBtnCallUinfo">填写信息</button>';
                break;
              case "礼品-需绑定游戏":
                retStr =
                  '<button role="button" class="ico-btn-reset pops__link jpopBtnCallBind">去绑定</button>';
                break;
              case "礼品-需弹窗打开":
                retStr =
                  '<button role="button" class="ico-btn-reset pops__link jpopBtnCallCode">去领取</button>';
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
      onMounted: function () {
        /* 模态框--我的奖励-礼品查看 */
        $(".jpopRecord").on("click", ".jpopBtnCallCode", function () {
          DialogJS.code({
            direction: "vertical",
            title: "温馨提示",
            prefix: "恭喜获得华为手机",
            message: "FLFDSFDSFDFFS",
            // suffix: "",
            footer: "福利-激活码-输入礼包码-兑换",
          });
        });
        /* 模态框--我的奖励-待领取绑定游戏信息 */
        $(".jpopRecord").on("click", ".jpopBtnCallBind", function () {
          dialogBind.open({ prefix: "恭喜获得xxx" });
        });
        /* 模态框--我的奖励-填写个人信息 */
        $(".jpopRecord").on("click", ".jpopBtnCallUinfo", function () {
          dialogUinfo.open({ prefix: "恭喜获得xxx" });
        });
      },
    });
  });
  /* 我的奖励-我的奖励-组件_render渲染模式 end */
  
  
  /* 礼包码-自定义 DialogJS.diy */
  $(".jbtnCode0").on("click", function () {
    var messageHTML = "<div class=''>恭喜获得XXXX礼包码</div>";
    messageHTML += '<div class="ico-inp mauto pops__mt">请收下礼包码：AAABBBCCCDDD</div>';
    var dialogCode = DialogJS.diy({
      // showHeader: false,
      maskClickable: true,
      title: "恭喜获得礼包码",
      prefix: "恭喜获得华为手机",
      message: messageHTML,
      suffix: "福利-激活码-输入礼包码-兑换",
      footer: "请前往游戏内兑换礼包码",
    });
  });
  /* 礼包码-自定义 DialogJS.diy end */
  
  /* 礼包码-组件_vertical模式(默认模式) DialogJS.code */
  $(".jbtnCode1").on("click", function () {
    var code = "code1" + Date.now();
    var dialogCode = DialogJS.code({
      maskClickable: true,
      direction: "vertical",
      title: "温馨提示",
      prefix: "恭喜获得礼包码",
      message: code,
      // suffix: "温馨提示：请尽快兑换礼包码，避免失效",
      footer: "福利-激活码-输入礼包码-兑换",
    });
  });
  /* 礼包码-组件_vertical模式(默认模式) DialogJS.code end */
  
  /* 礼包码-组件_horizontal模式 DialogJS.code */
  $(".jbtnCode2").on("click", function () {
    var code = "code1" + Date.now();
    var dialogCode = DialogJS.code({
      maskClickable: true,
      direction: "horizontal",
      title: "温馨提示",
      prefix: "恭喜获得礼包码",
      message: code,
      // suffix: "温馨提示：请尽快兑换礼包码，避免失效",
      footer: "福利-激活码-输入礼包码-兑换",
    });
  });
  /* 礼包码-组件_horizontal模式 DialogJS.code end */
  
  /* 温馨提示 */
  $(".btn-rule").on("click", function () {
    var dialogDiy = DialogJS.diy({
      maskClickable: true,
      title: "title",
      prefix: "前缀" + Date.now(),
      message: "hello world<div style='background:white;padding:1em'>温馨提示</div>",
      suffix: "后缀" + Date.now(),
      footer: "<div>页脚</div>",
      button: '<button role="button" class="pops__btn pops__btn__ok pops__mt jpopClose">自定义按钮</button>',
      // // done(true)时弹窗关闭
      onBeforeClose: function (action) {
        return new Promise(function (resolve) {
          switch (action) {
            case "button":
              requestJSON(resolve);
              break;
            default:
              resolve(true);
              break;
          }
        });
      },
    });
  });
  /* 温馨提示 end */
}

/* twpop demo */

//绑定区服与生成表单
function bind() {
  var initdata = ["区服1", "区服2", "区服3", "区服4", "区服5", "区服6", "区服7", "区服8", "区服9", "区服10"];
  twpop.from({
    //type : 只支持 select text number tel  等输入类型
    list: [
      {
        name: "选择系统",
        id: "system",
        type: "select",
        data: [
          { text: "IOS", value: "ios" },
          { text: "安卓", value: "and" },
        ],
      },
      {
        name: "选择游戏",
        id: "game_type",
        type: "select",
        data: [
          { text: "王城争霸", value: 1 },
          { text: "原始传奇", value: 2 },
          { text: "蓝月传奇", value: 3 },
          { text: "热血封神", value: 4 },
        ],
      },
      { name: "选择区服", id: "server_id", type: "select" },
      { name: "选择角色", id: "role_name", type: "select" },
      { name: "手机号码", id: "tel", type: "text" },
    ],
    title: "请绑定角色",
    ready: function (val) {
      //select2 需要jq
      $("#server_id").select2({ tags: true, placeholder: "请选择区服", allowClear: false, data: initdata });
      $("#role_name").select2({ tags: true, placeholder: "请选择角色", allowClear: false, data: initdata });

      //监听选择系统
      $("#system").change(function () {
        console.log($(this).val());
      });
    },
    btns: {
      确定: function () {
        //点击确定按钮
        console.log("选择游戏为" + $("#game_type").val());
        //关闭弹窗
        twpop.close();
      },
    },
  });
}
$(".btn-bind").on("click", function () {bind()})

$(".btn-myprize").on("click", function () {
  var tpl = '<li><span>礼包码:{{code}}</span><span data-clipboard-text="{{code}}" class="copy jBtnPopCode">复制</span></li>'
  var codeArr = [{ code: "FFSDFDS" }, { code: "ERRSDFDS" }, { code: "GRGDGFD" }];
  var _html = '<ul class="gift">';
  codeArr.forEach((item) => {
    _html += twpop.template(tpl, item);
  });
  _html += "</ul>";

  //插入html
  twpop.diy({
    title: "我的奖品",
    html: _html,
    class: "pop_name", //增加自定义样式名
    ready: function () {
      console.log("生成完");
    },
  });
});
function copys() {
  //返回礼包码
  var code = "FLFDSFDSFDFFS";
  twpop.alert("获得礼包为" + code, {
    title: "温馨提示",
    close: false, //去掉右上角关闭按钮
    btns: {
      复制礼包码: {
        class: "copy jBtnPopCode",
        target: "data-clipboard-text=" + code,
        back: function () {
          twpop.close("alert");
        },
      },
    },
  });
}

// 签到
$(".btn-sign").on("click", function () {
  twpop.msg("签到成功", {
    timeout: 1000, //多少秒关闭 默认3000
  });
});
// 领取
$(".btn-get").on("click", function () {
  if ($(this).hasClass('active')) return twpop.msg("抱歉，您的签到次数暂时不够");
  var code = "FLFDSFDSFDFFS";
  twpop.alert("<div class='mt-20 lh-20'><p>恭喜获得礼包码</p>" + code + "</div>", {
    title: "温馨提示",
    close: false, //去掉右上角关闭按钮
    btns: {
      复制: {
        class: "copy jBtnPopCode",
        target: "data-clipboard-text=" + code,
        back: function () {
          twpop.close("alert");
        },
      },
    },
    ready: function () {
      $(".twpop-cont").append('<div class="tc fs-24 mt-20">兑换：福利-激活码-输入礼包码-兑换</div>');
    },
  });
});

// 查看详情
$(".btn-detail").on("click", function () {
  var text = $(this).attr("data-text");
  twpop.diy({
    title: "福利X：" + text + "专属福利",
    html: $("#popDetail").html(),
    class: "pop_detail", //增加自定义样式名
    ready: function () {},
  });
});
