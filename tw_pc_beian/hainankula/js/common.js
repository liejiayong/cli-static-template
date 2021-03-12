$(function () {
	// 头部导航
	// $('#nav li').not($('.active')).mouseenter(function() {
	// $(this).addClass('hover');
	// $(this).find('em').stop().animate({ 'width': '100%' }, 200);
	// }).mouseleave(function() {
	// $(this).removeClass('hover');
	// $(this).find('em').stop().animate({ 'width': '0' }, 200);
	// });

	var profile = '海南酷拉网络科技有限公司',
		address = '海南省澄迈县老城镇高新技术产业示范区海南生态软件园孵化楼四楼4001',
		mhtitle = '育才教室',
		mhprofile = '抽烟、喝酒、逃课，十七岁的少女厉姗屡出昏招，只想博得忙于生意的妈妈关注，谁知适得其反，随着厉姗行事日益叛逆，母女间关系变得愈发恶劣。 一日，母亲打着缓和关系的名义，约厉姗去往一处名为“篱笆庄”的新景区渡假。在母亲的哄骗下，厉姗开坐上了那辆名为前往“旅游景点”，实则去向那所传说中可以“矫正一切青少年年不良行为的”网戒所的车……一段通往地狱的旅程开始了。 在网戒所内所谓的“治疗”期间，厉姗逐渐发现了隐藏在网戒所和篱笆庄内不为人知的黑暗秘密'
	document.title = profile
	$('#aboutUs').text(profile)
	$('.text-logo').text(profile)
	$('.profile-name').each(function () { $(this).text(profile) })

	// server
	var server = ""
		+ '<div class="boxss clearfix">'
		+ '<div style="    text-align: center;    color: #666;line-height: 50px;font-size:18px;">'
		+ '<p style=" font-size: 25px;    color: #000;">联系方式:  </p>'
		+ '施先生'
		+ '<br>'
		+ '2456000269@qq.com'
		+ '<br>'
		+ '15879326988'
		+ '</div>'
		+ '</div>'
	$('#server').html($(server))

	// footer
	var foot = '<div class="footer_in"><p></p>';
	// foot += '<p><a href="xieyi.html">用户协议</a>丨<a href="contact.html">联系我们</a></p>'
	foot += '<p>' + profile + '</p>'
	foot += '<p>地址：' + address + '</p>'
	foot += '<p><span id="icp">琼ICP备20001483号</span>&nbsp;	<span id="innerHTML">www.kulalala.com</span></p>'
	foot += '</div>'
	$('#footer_box').append(foot);
	var url = window.location.host.split('.')[1],
		icp = $('#icp'),
		web = $('#innerHTML');
	console.log(url)
	switch (url) {
		case 'kulalala': icp.text('琼ICP备20001483号-2'); web.text('www.kulalala.com'); break;
		case 'kulawl': icp.text('琼ICP备20001483号-4'); web.text('www.kulawl.com'); break;
		case 'hnkula': icp.text('琼ICP备20001483号-3'); web.text('www.hnkula.com'); break;
		case 'hainankula': icp.text('琼ICP备20001483号-1'); web.text('www.hainankula.com'); break;
		default: ;
	}

	// header
	var header = ""
		+ '<div class="web_nav_top clearfix" >'
		// + '<h1 class="logo-txt insertLogoTitle"><a id="headlogo" class="insertHttp" href="#">' + profile + '</a></h1>'
		+ '<h1 class="xiulogo insertLogoTitle"><a id="headlogo" class="insertHttp" href="#">' + profile + '</a></h1>'
		+ '<ul class="nav_list clearfix">'
		+ '	<li><a href="index.html" class="">首页</a></li>'
		+ '	<li><a href="anime.html">动漫乐园</a></li>'
		// + '		<li><a href="pay.html">充值中心</a></li>'
		+ '	<li><a href="cp.html">客服中心</a></li>'
		+ '<li><a href="xy.html">用户协议</a></li>'
		+ '	</ul>'
		+ '<ul class="nav_setup fn_right">'
		+ '<li class="userLoginBox header_login">'
		+ '<a href="login.html" class="loginbut">登录</a>'
		+ '<b class="loginLine">|</b>'
		+ '<a href="reg.html" class="loginbut">注册</a>'
		+ '</li>'
		+ '	</ul>'
		+ '</div >'
	$('#header').html($(header))

	// mhlist
	var mhlist = ""
		+ '<div class="fn_left tuiJpar_r" id="pngbox">'
		+ '<div class="boxss clearfix">'
		+ '<a class="indexAhoItem indexAhoItem1" href="yuedu.html" data-type="png" data-url="images/png/1.png">'
		+ '<div class="inners">'
		+ '<div style="background:url(images/png/1.jpg) center center no-repeat;background-size:cover;height:190px;width:100%;" class="img-fluid"></div>'
		+ '<p class="itemText"><span class="itemNamePar clearfix"><b>' + mhtitle + '</b></span></p>'
		+ '</div>'
		+ '</a>'
		+ '</div>'
		+ '</div>'
	$('#mhlist').html($(mhlist))
	$('#mhtitle').html(mhtitle)
	var mhlistbpx = ""
		+ '<div class="boxss clearfix">'
		+ '<a class="indexAhoItem indexAhoItem1" href="yuedu.html" data-type="png" data-url="images/png/1.png">'
		+ '<div class="inners">'
		+ '<div style="background:url(images/png/1.jpg) center center no-repeat;background-size:cover;height:190px;width:100%;" class="img-fluid"></div>'
		+ '<p class="itemText"><span class="itemNamePar clearfix"><b>' + mhtitle + '</b></span></p>'
		+ '</div>'
		+ '</a>'
		+ '<div style="width: 550px;'
		+ 'float: left;'
		+ 'margin-top: 12px;'
		+ 'font-size: 14px;    margin-left: 21px;'
		+ 'line-height: 30px;">'
		+ '<h3 style="    font-size: 28px;line-height: 60px;">' + mhtitle + '</h3>'
		+ '<p>简介：' + mhprofile + '</p>'
		+ '</div>'
		+ '</div>'
	$('#mhlistbpx').html($(mhlistbpx))

	// aboutUs
	var aboutUs = ""
		+ '<div class="fn_left tuiJpar_r" style="background:#fff;">'
		+ '<div class="aboutbox" style="width: 1221px;">'
		+ '<p>' + profile + '，注册地位于海南省澄迈县老城镇高新技术产业示范区海南生态软件园A17幢二层4001。</p>'
		+ '<p>技术进出口；第一类增值电信业务；第二类增值电信业务；网络文化经营；互联网平台（依法须经批准的项目，经相关部门批准后方可开展经营活动）一般项目：软件开发；动漫游戏开发；软件外包服务；数字文化创意软件开发；网络与信息安全软件开发；数字内容服务；信息技术咨询服务；广告设计、代理；广告发布（非广播电台、电视台、报刊出版单位）；广告制作；互联网数据服务；互联网安全服务；信息系统集成服务；计算机软硬件及辅助设备批发；技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广</p>'
		+ '</div>'
		+ '</div>'
	$('#aboutUs').html($(aboutUs))
});
