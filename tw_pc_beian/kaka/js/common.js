$(function () {
	// 头部导航
	$('#nav li').not($('.active')).mouseenter(function () {
		$(this).addClass('hover');
		$(this).find('em').stop().animate({ 'width': '100%' }, 200);
	}).mouseleave(function () {
		$(this).removeClass('hover');
		$(this).find('em').stop().animate({ 'width': '0' }, 200);
	});

	var profile = '海南卡卡网络科技有限公司'
	document.title = profile
	$('#aboutUs').text(profile)
	$('.text-logo').text(profile)

	// footer
	// var foot = '<div class="footer_in"><p></p>';
	// foot += '<p><a href="xieyi.html">用户协议</a>丨<a href="contact.html">联系我们</a></p>'
	// foot += '<p>海南东冠网络科技有限公司&copy;2019&nbsp;&nbsp;<a style="color:#090;" target="_blank" href="jiazhang.html">家长监护工程</a></p>'
	// foot += '<p><a target="_blank" id="icp" href="http://beian.miit.gov.cn/"></a>&nbsp;	<span id="innerHTML"></span></p>'
	// foot += '</div>'

	var foot = "<p>"
		+ '<a href = "index.html" target = "_blank" > 首页</a> |'
		+ '	<a href="list.html" target="_blank">漫画中心</a> |'
		+ '<a href="protocol.html" target="_blank" class="">用户协议</a> |'
		+ '	<a href="user.html" target="_blank">用户中心</a> |'
		// + '	<a href="pay.html" target="_blank">充值</a> |'
		+ '	<a href="service.html" target="_blank">客服中心</a>'
		+ "</p>"
		+ '<p>'
		+ '<a href="./img/benan.jpg" target="_blank">公司名称: ' + profile + '</a> |'
		+ '<a href="http://www.beian.miit.gov.cn" target="_blank">ICP备案号:<span id="icp">琼ICP备20001649</span>号 </a>'
		+ '</p>'
		+ '<p>'
		+ '<a href="" target="_blank">地址：海南省澄迈县老城镇高新技术产业示范区海南生态软件园孵化楼四楼4001</a> |'
		+ '<a href="http://www.miitbeian.gov.cn/state/outPortal/loginPortal.action;jsessionid=e221w4X2OZrZanKkU-N8J1PuFiK23YQK--fMWSuLCtwwABK_BW7U!1837077880 target="_blank">12318违法网站内容举报链：www.jb.com.gov.cn </a>'
		+ '</p>'
		;


	$('#footer_box').html(foot);
	var url = window.location.host.split('.')[1],
		icp = $('#icp'),
		web = $('#innerHTML');
	console.log(url)
	switch (url) {
		case 'kkabcd': icp.text('琼ICP备20001649号-1'); web.text('www.kkabcd.com'); break;
		case 'kakacattle': icp.text('琼ICP备20001649号-4'); web.text('www.kakacattle.com'); break;
		case 'hlkkwl': icp.text('琼ICP备20001649号-3'); web.text('www.hlkkwl.com'); break;
		case 'ka卡': icp.text('琼ICP备20001649号-2'); web.text('www.ka卡.com'); break;
		default: ;
	}

	// sidebar
	var sidebarTxt = ''
		+ '<section class="clearfix service_center_container">'
		+ '<div class="title">'
		+ '  <div class="zh">客服中心</div>'
		+ '  <div class="en">service center</div>'
		+ '</div>'
		+ '<div class="content">'
		+ '  <menu>'
		+ '	<li><span class="ico"></span><b>公司名称:</b><span> ' + profile + '</span></li>'
		+ '	<li><span class="ico"></span><b>ICP备案号:</b><span><a href="http://www.beian.miit.gov.cn" target="_blank">琼ICP备20001649号</a></span></li>'
		+ '	<li><span class="ico"></span><b>地址:</b><span><a href="####"></a>海南省澄迈县老城镇高新技术产业示范区海南生态软件园孵化楼四楼4001</span>'
		+ '	</li>'
		+ '	<li><span class="ico"></span><b>电子邮箱:</b><span><a'
		+ '		  href="mailto: 634065501@qq.com">634065501@qq.com(吴小姐)</a></span></li>'
		+ '	<li><span class="ico"></span><b>联系电话:</b><span><a href="tel: 18370328806">18370328806</a></span></li>'
		+ '	<li><span class="ico"></span><b>服务时间:</b><span>9:00~18:00(周一~周六)</span></li>'
		+ '	<!-- <li><span class="ico"></span><b></b><span></span></li> -->'
		+ '  </menu>'
		+ '</div>'
		+ ' </section>'
	$('#sidebar').html($(sidebarTxt))

	// serverContent
	var serverContent = ''
		+ '<section class="clearfix service_center_container-auto">'
		+ '<div class="content">'
		+ '  <menu>'
		+ '	<li><span class="ico"></span><b>电子邮箱:</b><span><a'
		+ '		  href="mailto: 634065501@qq.com">634065501@qq.com(吴小姐)</a></span></li>'
		+ '	<li><span class="ico"></span><b>联系电话:</b><span><a href="tel: 18370328806">18370328806</a></span></li>'
		+ '	<li><span class="ico"></span><b>服务时间:</b><span>9:00~18:00(周一~周六)</span></li>'
		+ '	<!-- <li><span class="ico"></span><b></b><span></span></li> -->'
		+ '  </menu>'
		+ '</div>'
		+ ' </section>'
	$('#serverContent').html($(serverContent))

	// header
	var headHTML = '	<div class="content">'
	headHTML += '<a href="./index.html" class="text-logo">'
	headHTML += '	 <div class="logo-profile">' + profile + '</div>'
	// headHTML += '	<img class="text-logo" src="img/logo.png" /> '
	headHTML += '</a>'
	headHTML += '<nav id="main_nav">'
	headHTML += '	<a href="index.html" class="selected" style="color:white">首页</a>'
	headHTML += '	<a href="list.html" class="" style="color:white">漫画中心</a>'
	headHTML += '	<a href="protocol.html" class="" style="color:white">用户协议</a>'
	// headHTML += '	<a href="user.html" class="" style="color:white">用户中心</a>'
	// headHTML += '	<a href="pay.html" class="" style="color:white">充值</a>'
	headHTML += '	<a href="service.html" class="" style="color:white">客服中心</a>'
	headHTML += '	</nav>'
	headHTML += '<ul class="nav-auth">'
	headHTML += '	<div id="auth-stat">'
	headHTML += '		<a href="javascript:pop_lr.login();" class="btn-auth">登录</a>'
	headHTML += '		<i>/</i>'
	headHTML += '		<a href="javascript:pop_lr.reg();" class="btn-auth">注册</a>'
	headHTML += '	</div>'
	headHTML += '	<div id="auth-profile" class="profile"><span id="unickname">用户-2020</span><i>/</i><a href="javascript:;" class="btn-logout">退出</a></div>'
	headHTML += '</ul>'
	headHTML += '</div>'
	$('#header').append($(headHTML))

	pop_lr.init({
		game_id: 0,
		gourl: '//xuanhongj.com',
		auto: false,
		lock: false
	})

	var username = pop_lr._getcookie('USER_NAME_INFO')
	if (!username) {
		// pop_lr.login()
	} else {
		setTimeout(function () {
			$('#unickname').text(username)
			$('#auth-profile').fadeIn();
			$('#auth-stat').hide();
		}, 1500);
	}

	$('.btn-logout').on('click', function () {
		pop_lr.logout();
		$('#auth-stat').fadeIn();
		$('#auth-profile').hide();
	});

});
