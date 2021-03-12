/*
usage: 海南河川公共登录注册弹窗-2020
base js:
    http://staticres.693975.com/jsCommon/jquery.min.js

funcs:
    pop_lr.init({game_id:7, gourl:'http://www.693975.com/', auto:"login", lock:false});
    pop_lr.login(); //登录
    pop_lr.reg(); //注册
    pop_lr.alert(); //错误提示

default button: //页面id注册事件
    #pop_login_btn  #pop_reg_btn  #pop_logout_btn
*/
var tw_pop_protocol = (('https:' == document.location.protocol) ? 'https:' : 'http:');
var web_api = tw_pop_protocol + "//webapi.693975.com/web/index.php";

var pop_lr = {
    init: function (options) {
        var defaults = {
            game_id: 76,
            gourl: document.location.href,
            auto: false,
            lock: true,
            login_btn: '#pop_login_btn',
            reg_btn: '#pop_reg_btn',
            logout_btn: '#pop_logout_btn',
            agent_id: 100000,
            placeid: 100000
        };

        var setting = {
            exp: {
                user: {
                    data: /^[a-zA-Z0-9_@]{6,20}$/,
                    msg: "6-20位字母、数字"
                },
                passwd: {
                    data: /^[a-zA-Z0-9`~!-@#$%^&*()_+|{}\[\];':"<>?,.\/\\]{6,20}$/,
                    msg: "6-20位字母、数字或特殊字符"
                },
                rpasswd: {
                    data: /^([\w]{6,20})$/,
                    msg: "6-20位字母、数字或特殊字符"
                },
                truename: {
                    data: /^[\u4e00-\u9fa5]{1,6}$/,
                    msg: "请输入真实姓名"
                },
                idcard: {
                    data: /(^[0-9]{17}[0-9xX]$)|(^[0-9]{15}$)/,
                    msg: "请输入身份证号"
                },
                verify: {
                    data: /^([\w]{4,6})$/,
                    msg: "请输入验证码"
                },
            },
            login: {
                tip_id: ".dialog-login .dialog-tip",
                tip_error_css: "r-dialog-tip-error",
                act_tip_id: ".dialog-login .r-dialog-act-error",
                ico_id: ".r-dialog-panel-log .r-dialog-ico",
                ico_error_css: "r-dialog-ico-error",
                ico_right_css: "r-dialog-ico-right",
                ids: {
                    user: {
                        id: "#r-username",
                        exp: 'user',
                        tip_id: 0,
                        clickOn: true,
                        addClass: true
                    },
                    passwd: {
                        id: "#r-password",
                        exp: 'passwd',
                        tip_id: 0,
                        clickOn: true,
                        addClass: true
                    },
                    verify: {
                        id: "#r-verify-code",
                        exp: 'verify',
                        tip_id: 1,
                        clickOn: false,
                        addClass: false
                    },
                }
            },
            reg: {
                tip_id: ".dialog-register .dialog-tip",
                tip_error_css: "r-dialog-tip-error",
                act_tip_id: ".dialog-register .r-dialog-act-error",
                ico_id: ".r-dialog-panel-reg .r-dialog-ico",
                ico_error_css: "r-dialog-ico-error",
                ico_right_css: "r-dialog-ico-right",
                ids: {
                    user: {
                        id: "#rr-username",
                        exp: 'user',
                        tip_id: 0,
                        clickOn: true,
                        addClass: true
                    },
                    passwd: {
                        id: "#rr-password",
                        exp: 'passwd',
                        tip_id: 0,
                        clickOn: true,
                        addClass: true
                    },
                    rpasswd: {
                        id: "#rr-rpassword",
                        exp: 'rpasswd',
                        tip_id: 0,
                        clickOn: true,
                        addClass: true
                    },
                    truename: {
                        id: "#rr-truename",
                        exp: 'truename',
                        tip_id: 0,
                        clickOn: true,
                        addClass: true
                    },
                    idcard: {
                        id: "#rr-idcard",
                        exp: 'idcard',
                        tip_id: 0,
                        clickOn: true,
                        addClass: true
                    },
                    verify: {
                        id: "#rr-safe-code",
                        exp: 'verify',
                        tip_id: 1,
                        clickOn: false,
                        addClass: false
                    },
                    protocol: {
                        id: "#r-dialog-reg-protocol",
                        exp: '',
                        tip_id: 0,
                        clickOn: false,
                        addClass: true
                    },
                }
            }
        };

        var opts = $.extend(defaults, options);
        this.opts = opts;
        this.setting = setting;
        web_api += "?session_id=" + this.get_mark();
        this._css();
        this._tpl();
        this._events();

        //自动弹
        if (this.opts.auto == "login" && !pop_lr._getcookie('login_name')) {
            pop_lr.login();
        }

        if (this.opts.auto == "reg" && !pop_lr._getcookie('login_name')) {
            pop_lr.reg();
        }
    },

    _events: function () {
        var _this = this;

        $(document).on("click", "#hasNoAccount," + _this.opts.reg_btn, function (e) {
            e.preventDefault();
            pop_lr.reg();

        }).on("click", "#hasAccount," + _this.opts.login_btn, function (e) {
            e.preventDefault();
            pop_lr.login();

        }).on("click", ".dialog-third-qq", function (e) {
            e.preventDefault();
            pop_lr._extlogin(1);

        }).on("click", ".dialog-third-wx", function (e) {
            e.preventDefault();
            pop_lr._extlogin(2);

        }).on("click", ".dialog-third-wb", function (e) {
            e.preventDefault();
            pop_lr._extlogin(3);

        }).on("click", _this.opts.logout_btn, function (e) {
            e.preventDefault();
            pop_lr.logout();

        }).on("click", ".r-dialog-close", function (e) {
            e.preventDefault();
            $('.dialog-bg').hide();
            $('.r-dialog-panel').hide();

        }).on("click", "#tj-r-btn-log", function (e) {
            e.preventDefault();
            pop_lr._login();

        }).on("click", "#sub-reg", function (e) {
            e.preventDefault();
            pop_lr._reg();

        }).on("keypress", "#r-password,#r-verify-code", function (e) {
            if (e.keyCode === 13) {
                pop_lr._login();
            }
        }).on("keypress", "#rr-password,#rr-safe-code", function (e) {
            if (e.keyCode === 13) {
                pop_lr._reg();
            }
        });

        $.each(_this["setting"]["login"]["ids"], function (key, value) {
            if (value["exp"]) {
                $(value["id"]).on("keyup", function () {
                    if (!_this["setting"]["exp"][value["exp"]]["data"].test($(value["id"]).val())) {
                        $(value["id"]).focus();
                        if (value["addClass"]) {
                            $(_this["setting"]["login"]["tip_id"]).eq(value["tip_id"]).addClass(_this["setting"]["login"]["tip_error_css"]).html(_this["setting"]["exp"][value["exp"]]["msg"]);
                        } else {
                            $(_this["setting"]["login"]["tip_id"]).eq(value["tip_id"]).html(_this["setting"]["exp"][value["exp"]]["msg"]);
                        }
                    } else {
                        $(_this["setting"]["login"]["tip_id"]).eq(value["tip_id"]).removeClass(_this["setting"]["login"]["tip_error_css"]).html('');
                    }
                });
            }
            if (value['clickOn']) {
                $(value["id"]).focus(function () {
                    this.parentNode.className = "on";
                }).blur(function () {
                    this.parentNode.className = "";
                });
            }
        });

        $.each(_this["setting"]["reg"]["ids"], function (key, value) {
            if (value["exp"]) {
                $(value["id"]).on("keyup", function () {
                    if (!_this["setting"]["exp"][value["exp"]]["data"].test($(value["id"]).val())) {
                        $(value["id"]).focus();
                        if (value["addClass"]) {
                            $(_this["setting"]["reg"]["tip_id"]).eq(value["tip_id"]).addClass(_this["setting"]["reg"]["tip_error_css"]).html(_this["setting"]["exp"][value["exp"]]["msg"]);
                        } else {
                            $(_this["setting"]["reg"]["tip_id"]).eq(value["tip_id"]).html(_this["setting"]["exp"][value["exp"]]["msg"]);
                        }
                        $(_this["setting"]["reg"]["ico_id"]).eq(value["tip_id"]).removeClass(_this["setting"]["reg"]["ico_right_css"]).addClass(_this["setting"]["reg"]["ico_error_css"]);
                    } else {
                        $(_this["setting"]["reg"]["tip_id"]).eq(value["tip_id"]).removeClass(_this["setting"]["reg"]["tip_error_css"]).html('');
                        $(_this["setting"]["reg"]["ico_id"]).eq(value["tip_id"]).removeClass(_this["setting"]["reg"]["ico_error_css"]).addClass(_this["setting"]["reg"]["ico_right_css"]);
                    }
                });
            }
            if (value['clickOn']) {
                $(value["id"]).focus(function () {
                    this.parentNode.className = "on";
                }).blur(function () {
                    this.parentNode.className = "";
                });
            }
        });
    },

    login: function () {
        $('.dialog-bg').show();
        $('.r-dialog-panel').hide();
        $('.dialog-login').show();
    },

    reg: function () {
        $('.dialog-bg').show();
        $('.r-dialog-panel').hide();
        $('.dialog-register').show();
    },

    logout: function () {
        //cookie必须清除
        _that._setcookie("PHPSESSID", '', 1);
        _that._setcookie("USER_NAME_INFO", '', 1);
        var logouturl = web_api + '&r=user/out&callback=?'
        $.getJSON(logouturl, function (res) { });
        window.location.reload();
    },

    _extlogin: function (type) {
        var _this = this;
        extlogin({
            type: type,
            game_id: _this.opts.game_id,
            agent_id: _this.opts.agent_id,
            placeid: _this.opts.placeid
        });
    },

    _chk_code: function () {
        return code_img = web_api + '&r=login/captcha&t=' + Math.random();
    },

    _login: function () {
        var _this = this;
        var _exp = _this.setting.exp;
        var _setting = _this.setting.login;

        var user = $(_setting.ids.user.id).val();
        var passwd = $(_setting.ids.passwd.id).val();
        var verify = $(_setting.ids.verify.id).val();

        //重置提示
        $(_setting.tip_id).removeClass(_setting.tip_error_css).html('');

        var checkFlag = true;
        $.each(_setting.ids, function (key, value) {
            if (value["exp"] && !_exp[value["exp"]]["data"].test($(value["id"]).val())) {
                $(value["id"]).focus();
                if (value["addClass"]) {
                    $(_setting["tip_id"]).eq(value["tip_id"]).addClass(_setting["tip_error_css"]).html(_exp[value["exp"]]["msg"]);
                } else {
                    $(_setting["tip_id"]).eq(value["tip_id"]).html(_exp[value["exp"]]["msg"]);
                }

                checkFlag = false;
                return false;
            }
        });

        if (!checkFlag) return false;

        if (!$("#r-dialog-login-protocol").is(":checked")) {
            $("#r-dialog-login-protocol").focus();
            _this.alert("请阅读注册协议并勾选同意", _setting);
            return false;
        }

        $.getJSON(web_api + '&r=login/login&username=' + encodeURIComponent(user) + '&password=' + passwd + '&code=' + verify + '&callback=?', function (data) {
            $("[name='code_img']").attr('src', pop_lr._chk_code());
            switch (data.ret) {
                case 1:
                    _this.get_user_info("登陆成功");
                    break;

                default:
                    _this.alert(data.msg, _setting);
                    break;
            }
        });
        return false;
    },

    _reg: function () {
        var _this = this;
        var _exp = _this.setting.exp;
        var _setting = _this.setting.reg;

        var user = $(_setting.ids.user.id).val();
        var passwd = $(_setting.ids.passwd.id).val();
        var rpasswd = $(_setting.ids.rpasswd.id).val();
        var truename = $(_setting.ids.truename.id).val();
        var idcard = $(_setting.ids.idcard.id).val();
        var verify = $(_setting.ids.verify.id).val();

        //重置提示
        $(_setting.tip_id).removeClass(_setting.tip_error_css).html('');
        $(_setting.ico_id).removeClass(_setting.ico_error_css).removeClass(_setting.ico_error_right);

        var checkFlag = true;
        $.each(_setting.ids, function (key, value) {
            if (value["exp"] && !_exp[value["exp"]]["data"].test($(value["id"]).val())) {
                $(value["id"]).focus();
                $(_setting["ico_id"]).eq(value["tip_id"]).addClass(_setting["ico_error_css"]);
                if (value["addClass"]) {
                    $(_setting["tip_id"]).eq(value["tip_id"]).addClass(_setting["tip_error_css"]).html(_exp[value["exp"]]["msg"]);
                } else {
                    $(_setting["tip_id"]).eq(value["tip_id"]).html(_exp[value["exp"]]["msg"]);
                }
                checkFlag = false;
                return false;
            }
        });

        if (!checkFlag) return false;

        var tmp = "";
        tmp = "rpasswd";
        if (passwd != rpasswd) {
            $(_setting["ids"][tmp]["id"]).focus();
            _this.alert("确认密码不一致", _setting);
            return false;
        }
        var isChecked = $("#r-dialog-reg-protocol").is(":checked");

        tmp = "protocol";
        var protocol = $(_setting["ids"][tmp]["id"]).is(":checked");
        if (!protocol) {
            $(_setting["ids"][tmp]["id"]).focus();
            _this.alert("请阅读注册协议并勾选同意", _setting);
            return false;
        }

        $.getJSON(web_api + '&r=reg/register-with-id-card&username=' + encodeURIComponent(user) + '&password=' + encodeURIComponent(passwd) + '&id_card=' + encodeURIComponent(idcard) + '&true_name=' + encodeURIComponent(truename) + '&code=' + verify + '&game_id=' + _this.opts.game_id + '&agent_id=' + _this.opts.agent_id + '&placeid=' + _this.opts.placeid + '&from_url=' + encodeURIComponent(window.location.href) + '&callback=?', function (data) {
            $("[name='code_img']").attr('src', pop_lr._chk_code());
            if (data.ret != 1) {
                _this.alert(data.msg, _setting);
            } else {
                _this.get_user_info("注册成功");
            }
        });
        return false;
    },

    get_user_info: function (tips) {
        _this = this;
        $.getJSON(web_api + '&r=user/state&callback=?', function (res) {
            if (res.ret != 1) {
                _this.alert(res.msg, _setting);
            } else {
                //半个小时
                _this._setcookie("USER_NAME_INFO", res.data.username, 1800);
                alert(tips);
                window.location.reload();
            }
        });
    },

    alert: function (msg, objSetting) {
        var obj = $(objSetting.act_tip_id);
        obj.css('display', 'none'); //为了下面的fadeIn
        obj.find('p').html(msg);
        obj.fadeIn(300);
        setTimeout(function () {
            $(objSetting.act_tip_id).fadeOut(300);
        }, 2000)
    },

    get_mark: function () {
        _that = this;
        var web_mark = _that._getcookie("PHPSESSID", "");
        if (web_mark == "") {
            web_mark = _that.randomString();
            _that._setcookie("PHPSESSID", web_mark, 1800)
        }
        return web_mark;
    },

    //随机字符串
    randomString: function () {
        const time_str_prefix = Math.floor((new Date()).getTime() / 1000);
        return Math.random().toString(36).slice(-8) + time_str_prefix + Math.random().toString(36).slice(-8);
    },

    //保留之前方法名
    getCookie: function (cookieName) {
        return pop_lr._getcookie(cookieName, '');
    },

    _getcookie: function (cookieName, defaultValue) {
        var arr, reg = new RegExp("(^| )" + cookieName + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2])
        }
        return defaultValue;
    },

    _setcookie: function (cookieName, cookieValue, seconds) {
        var expires = new Date();
        expires.setTime(expires.getTime() + parseInt(seconds) * 1000);
        document.cookie = escape(cookieName) + '=' + escape(cookieValue) + (seconds ? ('; expires=' + expires.toGMTString()) : "") + '; path=/; domain=' + document.domain + ';';
    },

    //保留
    $popup: function (arg1, arg2, lock) {
        var isIE = !!window.ActiveXObject,
            isIE6 = isIE && !window.XMLHttpRequest,
            isIE8 = isIE && !!document.documentMode,
            isIE7 = isIE && !isIE6 && !isIE8;
        var $arg1 = arg1;
        var $arg2 = arg2;
        var $pLeft = ($(window).width() - $($arg1).width()) / 2 + $(window).scrollLeft();
        var $pTop = ($(window).height() - $($arg1).height()) / 2 + $(window).scrollTop();
        $pTop = $pTop > 0 ? $pTop : 40;
        if (isIE6) {
            $("html,body").css("overflow", "hidden");
        }
        $("<div class='gray'></div>").appendTo($("body")).height($(document).height()).fadeTo("fast", 0.4);
        $($arg1).css({
            display: 'block',
            position: 'fixed',
            left: $pLeft,
            //top : $pTop,
            zIndex: 10000
        });
        var obj_str = $arg2 + ',' + ".gray";
        if (lock) {
            obj_str = $arg2;
        }
        $(obj_str).click(function () {
            $($arg1).hide();
            if (isIE6) {
                $("html,body").css("overflow", "")
            };
            $(".gray").fadeOut(500, cb);

            function cb() {
                $(this).remove();
            }

            return false;
        });

        //窗口大小变化时调用
        $(window).bind('scroll resize', function (event) {
            var $pLeft = ($(window).width() - $($arg1).width()) / 2 + $(window).scrollLeft();
            var $pTop = ($(window).height() - $($arg1).height()) / 2 + $(window).scrollTop();
            $($arg1).animate({
                left: $pLeft,
                //top : $pTop
            }, {
                duration: 500,
                queue: false
            })
        })
    },

    _css: function () {
        var css = '<style>#r-dialog dl,blockquote,button,code,dd,dt,fieldset,form,h2,h3,h4,h5,h6,input,legend,li,ol,p,pre,td,textarea,th,ul{margin:0;padding:0;font-family:Microsoft YaHei}#r-dialog{font-size:12px;line-height: 16px;}#r-dialog ul,li,ol{list-style:none}#r-dialog img{border:0}#r-dialog a{color:#000;text-decoration:none;cursor:pointer}#r-dialog em,i{font-style:normal}#r-dialog a:focus,input{outline:0}#r-dialog button{outline:0}#r-dialog a{outline:0;star:expression(this.onFocus=this.blur())}#r-dialog .fl{float:left}.dialog-bg{position:fixed;top:0;right:0;bottom:0;left:0;overflow:hidden;outline:0;-webkit-overflow-scrolling:touch;background-color:#000;filter:alpha(opacity=60);background-color:rgba(0,0,0,.6);z-index:99}#r-dialog .r-dialog-close{height:22px;width:22px;background:url(http://staticres.693975.com/imgCommon/dialogClose.png) no-repeat;position:absolute;top:16px;right:16px}#r-dialog .dialog-login{width:360px;height:356px;background:#fff;position:fixed;left:50%;margin-left:-180px;top:50%;margin-top:-178px;z-index:999;border-radius:4px}#r-dialog .dialog-box{height:300px;width:550px;margin:0 auto;margin-top:28px}#r-dialog .dialog-box-l{width:205px;float:left;height:300px;border-right:1px solid #eee;text-align:center;padding-right:25px}#r-dialog .dialog-dl-h3{font-size:16px;color:#2e2e2e;margin-top:15px}#r-dialog .dialog-dl-txt{color:#666;font-size:14px;margin:15px 0}#r-dialog .dialog-dl-img{width:124px;height:124px}#r-dialog .dialog-dl-az{color:#666;font-size:14px;margin-top:10px}#r-dialog .dialog-dl-az a{color:#fe5600}#r-dialog .dialog-box-r{width:318px;float:left;height:300px;position:relative}#r-dialog .dialog-box-dl{width:262px;height:300px;margin-left:44px;position:relative}#r-dialog .dialog-zh-tit{color:#2e2e2e;font-size:16px;font-weight:700;width:100%;margin-top:10px;padding-bottom:10px}#r-dialog .dialog-zh-dl{width:100%;margin-top:10px;position:relative}#r-dialog .r-dialog-tip-error{width:180px;text-align:center;color:#fe5600;font-size:12px;font-weight:700;left:50%;margin-left:-90px;top:22px;position:absolute;border-radius:3px;z-index:99}#r-dialog .r-dialog-act-error{background:#FFFBEE;border:1px solid #FECF7B;position:absolute;border-radius:3px;z-index:9;-webkit-box-shadow:#FFF6ED 0 2px 4px;-moz-box-shadow:#FFF6ED 0 2px 4px;box-shadow:#FFF6ED 0 2px 4px;text-align:center;font-weight:700;right:-25px;display:block;top:72px}#r-dialog .r-dialog-act-error p{padding:0 40px;font-size:12px;color:#fe5600;line-height:32px}#r-dialog .dialog-tolog-btn{background:#F88C0F;border:0;width:100%;height:36px;color:#fff;font-size:14px;text-align:center;border-radius:4px;cursor:pointer}#r-dialog .dialog-tolog-btn:hover{background:#F82A15}#r-dialog .dialog-autolog-box{width:100%;height:40px;line-height:40px;margin-bottom:6px}#r-dialog .dialog-autolog-box label{float:left;color:#888;cursor:pointer;line-height:40px}#r-dialog .dialog-autolog-box label input{float:left;margin-top:14px;margin-right:5px}#r-dialog .dialog-autolog-box a,.link-reg{float:right;color:#888;font-size:12px}#r-dialog .dialog-autolog-box a:hover,.link-reg:hover{color:#fe5600}#r-dialog .dialog-third{height:16px;width:100%}#r-dialog .dialog-third-p{float:left;height:16px}#r-dialog .dialog-third-p a{float:left;color:#888}#r-dialog .dialog-third-p a:hover,.sq-qr-xz a:hover,.user-face-btn a:hover{color:#333}#r-dialog .dialog-third-p i{height:16px;float:left;width:15px;background:url(//image.tanwan.com/platform/2018/img/third-ico.png) no-repeat;margin-right:2px}#r-dialog .dialog-third-p .dialog-third-qq i{background-position:0 -44px}#r-dialog .dialog-third-p .dialog-third-wx i{background-position:-22px -44px}#r-dialog .dialog-third-p .dialog-third-wb i{background-position:-41px -44px}#r-dialog .dialog-third-p span{height:16px;width:1px;background:url(//image.tanwan.com/platform/2018/img/third-s.jpg) no-repeat;float:left;margin:0 9px}#r-dialog .dialog-third-p a:hover.dialog-third-qq i{background-position:0 -62px}#r-dialog .dialog-third-p a:hover.dialog-third-wx i{background-position:-22px -62px}#r-dialog .dialog-third-p a:hover.dialog-third-wb i{background-position:-41px -62px}#r-dialog .dialog-dl-yzm{width:100%;float:left;position:relative;height:48px}#r-dialog .dialog-dl-yzm input{width:120px;background:0 0;text-indent:10px;float:left;border:1px solid #e8e8e8;height:34px;border-radius:3px}#r-dialog .dialog-dl-yzm img{float:left;height:35px}#r-dialog .dialog-dl-vt{color:red;position:absolute;right:-30px;top:17px}#r-dialog .dialog-user{text-align:left;margin-top:25px;font-size:14px;color:#2e2e2e}#r-dialog .dialog-user i{color:#fe5600}#r-dialog .dialog-bd-txt{font-size:12px;color:#888;margin-bottom:12px;text-align:left;text-indent:2em;line-height:21px;width:100%;margin-top:10px}#r-dialog .dialog-bd-img{height:161px}#r-dialog .dialog-bd-xy{color:#888;height:36px;width:100%;float:left}#r-dialog .dialog-bd-xy label{float:left}#r-dialog .dialog-bd-xy input{width:13px;height:13px;margin-top:3px;float:left;margin-right:4px}#r-dialog .dialog-bd-xy a{float:left;color:#888}#r-dialog .dialog-bd-xy a:hover{color:#FE5700}#r-dialog .dialog-box-dl.dialog-bd-zh{margin-top:44px;height:260px}#r-dialog .dialog-bd-xczs{margin-top:22px;width:100%}#r-dialog .dialog-bd-xczs a{font-size:16px;color:#fe5600;float:right}#r-dialog .dialog-bd-error{height:16px;width:100%;position:absolute;left:0;top:-28px;background:url(//image.tanwan.com/platform/2018/img/bd-error.jpg) no-repeat;color:#fe5600;font-size:12px;line-height:18px;text-indent:21px}#r-dialog .dialog-register{width:416px;height:446px;background:#fff;position:fixed;left:50%;margin-left:-208px;top:50%;margin-top:-223px;z-index:999;border-radius:4px}#r-dialog .dialog-register-box{width:262px;margin:0 auto;height:400px}#r-dialog .dialog-register-tit{width:100%;text-align:center;font-size:20px;color:#2e2e2e;margin-top:42px;margin-bottom:22px}#r-dialog .dialog-register-rt{color:#888;text-align:center;width:100%;font-size:12px;margin-top:30px}#r-dialog .dialog-register-rt a{color:#fe5600}#r-dialog .dialog-box-l .sq-qr-error{color:#3c3c3c;font-size:18px;float:left;width:128px;margin-left:16px;margin-top:100px;background:url(//image.tanwan.com/platform/2018/img/qr-ico.png) 0 -30px no-repeat;height:24px;line-height:24px;padding-left:31px}#r-dialog .dialog-box-l .sq-qr-success{color:#3c3c3c;font-size:18px;float:left;width:128px;margin-left:16px;margin-top:100px;background:url(//image.tanwan.com/platform/2018/img/qr-ico.png) no-repeat;height:24px;line-height:24px;padding-left:31px}#r-dialog .dialog-box-l .sq-qr-msg-p{font-size:14px;float:left;width:100%;color:#3c3c3c;text-align:center;padding:9px 0}#r-dialog .dialog-box-l .sq-qr-msg-p a{color:#CC690C}#r-dialog .dialog-box-l .sq-qr-msg-p a:hover{text-decoration:underline}#r-dialog .dialog-box-l .sq-qr-xz{width:100%;text-align:center}#r-dialog input:-webkit-autofill{-webkit-box-shadow:0 0 0 1000px #fff inset}#dialog-mm,#r-dialog #dialog-zh{background:url(//image.tanwan.com/platform/2018/img/dl-ico.png) no-repeat}#dialog-sfzh,#r-dialog #dialog-zsxm{background:url(//image.tanwan.com/platform/2018/img/dialog-yz.png) no-repeat}#dialog-mm,#dialog-sfzh,#dialog-zsxm,#r-dialog #dialog-zh{width:100%;border:1px solid #e8e8e8;height:34px;color:#494949;line-height:34px;border-radius:3px;margin-bottom:12px;text-indent:40px;float:left}#dialog-mm input,#dialog-sfzh input,#dialog-zsxm input,#r-dialog #dialog-zh input{border:0;line-height:34px;height:34px;width:224px;float:left;padding-left:38px;background:0 0;text-indent:0}#r-dialog #dialog-zsxm{background-position:10px 9px}#r-dialog #dialog-sfzh{background-position:10px -50px}#r-dialog #dialog-zsxm.on{background-position:10px -104px}#r-dialog #dialog-sfzh.on{background-position:10px -163px}#r-dialog #dialog-zh{background-position:9px 7px}#dialog-mm.on,#dialog-sfzh.on,#dialog-zsxm.on,#r-dialog #dialog-zh.on{outline:0;border:1px solid #494949}#r-dialog #dialog-mm{background-position:9px -41px}#r-dialog #dialog-zh.on{background-position:9px -91px}#r-dialog #dialog-mm.on{background-position:9px -139px}#r-dialog .dialog-dl-yzm input:focus{outline:0;border:1px solid #494949}#r-dialog input::-webkit-input-placeholder{color:#999}#r-dialog input:-moz-placeholder{color:#999}#r-dialog input::-moz-placeholder{color:#999}#r-dialog input:-ms-input-placeholder{color:#999}</style>';
        $('body').append(css);

    },

    _tpl: function () {
        var userProUrl = "//www.huangxiu1.com/yhxy.html";
        var secretProUrl = "//www.huangxiu1.com/yhys.html";
        var captchaUrl = web_api + "&r=login/captcha";

        var tpl = '';
        tpl += '<div class="dialog-bg"style="display:none"></div>'
        tpl += '<div class="r-dialog"id="r-dialog">'
        tpl += '<div class="r-dialog-panel dialog-login"style="display:none">'
        tpl += '<a href="javascript:;"target="_self"class="r-dialog-close"title="关闭"></a>'
        tpl += '<div class="dialog-box">'
        tpl += '<div class="dialog-box-r">'
        tpl += '<div class="dialog-box-dl">'
        tpl += '<p class="dialog-zh-tit lt" style="text-align:center;">账号登录</p>'
        tpl += '<div class="dialog-tip"></div>'
        tpl += '<div class="r-dialog-act-error"style="display:none">'
        tpl += '<p></p>'
        tpl += '</div>'
        tpl += '<div class="dialog-zh-dl lt">'
        tpl += '<p id="dialog-zh">'
        tpl += '<input type="text"name="login_account"title="帐号输入"maxlength="30"id="r-username"placeholder="手机号码">'
        tpl += '</p>'
        tpl += '<p id="dialog-mm">'
        tpl += '<input name="password"type="password"title="输入密码"maxlength="30"id="r-password"placeholder="输入密码">'
        tpl += '</p>'
        tpl += '<p class="dialog-dl-yzm">'
        tpl += '<input maxlength="4"placeholder="验证码"type="text"name="safe_code"id="r-verify-code"autocomplete="off"title="验证码"placeholder="验证码">'
        tpl += '<img name="code_img" onclick="this.src=\'' + captchaUrl + '&t=\'+Math.random()" src="' + captchaUrl + '" style="vertical-align:middle;padding-left:10px;cursor:pointer" title="点击更换">'
        tpl += '<i class="dialog-tip dialog-dl-vt"></i>'
        tpl += '</p>'
        tpl += '<p class="dialog-bd-xy">'
        tpl += '<label>'
        tpl += '<input type="checkbox" checked="true" name="autolog"id="r-dialog-login-protocol">我同意</label>'
        tpl += '<a href="./protocol.html"target="_blank" title="用户协议">《用户协议》</a>'
        // tpl += '<a href="javascript:;">及</a>'
        // tpl += '<a href="' + secretProUrl + '"target="_blank"title="隐私协议">《隐私协议》</a>'
        tpl += '</p>'
        tpl += '<button class="dialog-tolog-btn"id="tj-r-btn-log"title="马上登录">马上登录</button>'
        tpl += '</div>'
        tpl += '<p class="dialog-autolog-box fl">'
        tpl += '<a href="javascript:;"id="hasNoAccount"class="link-reg"style="color: #888;">注册帐号</a>'
        tpl += '</p>'
        tpl += '<div class="dialog-third fl"></div>'
        tpl += '</div>'
        tpl += '</div>'
        tpl += '</div>'
        tpl += '</div>'
        tpl += '<div class="r-dialog-panel dialog-register"style="display:none;height:530px">'
        tpl += '<a href="javascript:;"target="_self"class="r-dialog-close"title="关闭"></a>'
        tpl += '<div class="dialog-register-box dialog-zh-dl">'
        tpl += '<div class="dialog-tip"style="top:29px"></div>'
        tpl += '<div class="r-dialog-act-error"style="display:none">'
        tpl += '<p></p>'
        tpl += '</div>'
        tpl += '<p class="dialog-register-tit" style="text-align:center;">注册账号</p>'
        tpl += '<p id="dialog-zh">'
        tpl += '<input type="text"id="rr-username"title="帐号输入"maxlength="20"placeholder="手机号码">'
        tpl += '</p>'
        tpl += '<p id="dialog-mm">'
        tpl += '<input type="password"id="rr-password"title="输入密码"maxlength="50"placeholder="输入密码">'
        tpl += '</p>'
        tpl += '<p id="dialog-mm">'
        tpl += '<input type="password"id="rr-rpassword"title="确认密码"maxlength="50"placeholder="确认密码">'
        tpl += '</p>'
        tpl += '<p id="dialog-zsxm">'
        tpl += '<input type="text"id="rr-truename"title="真实姓名"maxlength="50"placeholder="请输入真实姓名">'
        tpl += '</p>'
        tpl += '<p id="dialog-sfzh">'
        tpl += '<input type="text"id="rr-idcard"title="身份证号"maxlength="50"placeholder="请输入身份证号码">'
        tpl += '</p>'
        tpl += '<p class="dialog-dl-yzm">'
        tpl += '<input type="text"maxlength="4"id="rr-safe-code"title="验证码"placeholder="验证码">'
        tpl += '<img name="code_img" onclick="this.src=\'' + captchaUrl + '&t=\'+Math.random()" src="' + captchaUrl + '"style="vertical-align:middle;padding-left:10px;cursor:pointer"title="点击更换">'
        tpl += '<i class="dialog-tip dialog-dl-vt"></i>'
        tpl += '</p>'
        tpl += '<p class="dialog-bd-xy">'
        tpl += '<label>'
        tpl += '<input type="checkbox" name="autolog"id="r-dialog-reg-protocol">我同意</label>'
        tpl += '<a href="./protocol.html"target="_blank"title="用户协议">《用户协议》</a>'
        // tpl += '<a href="' + userProUrl + '"target="_blank"title="用户服务协议">《用户服务协议》</a>'
        // tpl += '<a href="javascript:;">及</a>'
        // tpl += '<a href="' + secretProUrl + '"target="_blank"title="隐私协议">《隐私协议》</a>'
        tpl += '</p>'
        tpl += '<button id="sub-reg"class="dialog-tolog-btn"title="接受协议并注册">接受协议并注册</button>'
        tpl += '<p class="dialog-register-rt">'
        tpl += '已有账号，<a href="javascript:;"id="hasAccount"target="_self">立即登录</a>'
        tpl += '</p>'
        tpl += '</div>'
        tpl += '</div>'
        tpl += '</div>';

        $('body').append(tpl);
    },
}
