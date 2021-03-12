$(function () {
	// 头部导航
	// $('#nav li').not($('.active')).mouseenter(function() {
	// $(this).addClass('hover');
	// $(this).find('em').stop().animate({ 'width': '100%' }, 200);
	// }).mouseleave(function() {
	// $(this).removeClass('hover');
	// $(this).find('em').stop().animate({ 'width': '0' }, 200);
	// });

	var profile = '海南泽达总部管理有限公司',
		address = '海南省澄迈县老城镇高新技术产业示范区海南生态软件园孵化楼四楼4001',
		mhTitle = '育才教室',
		mhProfile = '抽烟、喝酒、逃课，十七岁的少女厉姗屡出昏招，只想博得忙于生意的妈妈关注，谁知适得其反，随着厉姗行事日益叛逆，母女间关系变得愈发恶劣。 一日，母亲打着缓和关系的名义，约厉姗去往一处名为“篱笆庄”的新景区渡假。在母亲的哄骗下，厉姗开坐上了那辆名为前往“旅游景点”，实则去向那所传说中可以“矫正一切青少年年不良行为的”网戒所的车……一段通往地狱的旅程开始了。 在网戒所内所谓的“治疗”期间，厉姗逐渐发现了隐藏在网戒所和篱笆庄内不为人知的黑暗秘密'
	document.title = profile
	$('#mhTitle').text(mhTitle)

	// header navbar
	var header = ""
		+ '<div class="tuijian2">'
		+ '<ul>'
		+ '<li class="tright">'
		+ '<a href="index.html" class="menu">首页</a>'
		+ '<a href="game.html" class="menu">用户协议</a>'
		+ '<a href="comic.html" class="menu">动漫</a>'
		+ '<a href="about.html" class="menu">关于我们</a>'
		+ '<a href="contact.html" class="menu">商务合作</a>'
		+ '<span> <a href="pay.html" id="pay">充值</a>'
		+ '<a href="member.html" id="pay2">会员中心</a></span>'
		+ '</li>'
		+ '<li class="tleft">'
		// + '<div class="tleftLogo"></div>'
		+ '<div class="tleftLogo"><a href="index.html">' + profile + '</a></div>'
		+ '</li>'
		+ '</ul>'
		+ '</div>'
	$('#header').html('').html($(header))

	// footer
	var foot = '<div class="footer_in"><p></p>';
	// foot += '<p><a href="xieyi.html">用户协议</a>丨<a href="contact.html">联系我们</a></p>'
	foot += '<p>' + profile + '</p>'
	foot += '<p>地址：' + address + '</p>'
	foot += '<p><span id="icp">琼ICP备20001503号-4</span>&nbsp;	<span id="innerHTML">www.zeda6.com</span></p>'
	foot += '</div>'
	$('#footer_box').append(foot);
	var url = window.location.host.split('.')[1],
		icp = $('#icp'),
		web = $('#innerHTML');
	switch (url) {
		case 'zeda6': icp.text('琼ICP备20001503号-4'); web.text('www.zeda6.com'); break;
		case 'zedags': icp.text('琼ICP备20001503号-1'); web.text('www.zedags.com'); break;
		case 'hnzeda': icp.text('琼ICP备20001503号-3'); web.text('www.hnzeda.com'); break;
		case 'zedazb': icp.text('琼ICP备20001503号-2'); web.text('www.zedazb.com'); break;
		default: ;
	}

	// 漫画
	var hmList = ""
		+ '<div class="box4">'
		+ '<a href="yuedu.html"><img src="style/images/g01.jpg" /></a>'
		+ '<span>'
		+ '动漫名称:' + mhTitle + '</b><br />'
		+ '动漫评级:★★★★<br />'
		+ mhProfile
		+ '</span>'
		+ '<hr />'
		+ '<a href="yuedu.html" class="btn04">阅读</a>'
		+ '</div>'
		+ '<div style="clear:both;display:none;"></div>'
	$('#mhBox').html($(hmList))

	var aboutUs = ""
		+ '<div>'
		+ '<img src="./style/images/g01.jpg" style="width:420px; float:left;" />'
		+ '<span style="display:block; float:left; width:550px; color:#313233"><br /><br />'
		+ '		<b>' + profile + '</b><br />'
		+ '<hr />'
		+ profile + '，注册地在海南。核心团队成员均来自于各大高校及实力厂商，拥有丰富的漫画设计及运营推广的经验。公司成立迄今，一直专注于动漫的运营和推广。秉承“专注精品，好看至尚”的理念，公司正致力于打造行业领先的一流动漫运营平台，为更多动漫迷提供更多的快乐！'
		+ '	<br />'
		+ '	<hr />'
		+ '公司地址：' + profile
		+ '	</span>'
		+ '</div>'
	$('#aboutUs').html($(aboutUs))

	// comic
	var comic = ""
		+ '<div>'
		// + '<img src="style/images/logo.png" />'
		+ '<h2>' + profile + '</h2>'
		+ profile + '，注册地在海南。核心团队成员均来自于各大高校及实力厂商，拥有丰富的漫画设计及运营推广的经验。公司成立迄今，一直专注于动漫的运营和推广。秉承“专注精品，好看至尚”的理念，公司正致力于打造行业领先的一流动漫运营平台，为更多动漫迷提供更多的快乐！'
		+ '</span>'
		+ '</div>'
	$('#comic').html($(comic))

	var contact = ""
		+ '<div>'
		// + '<img src="style/images/logo.png" style="width:420px; float:left;" />'
		// + '<span style="display:block; float:left; width:550px; color:#313233"><br /><br />'
		+ '<span style="display:block; margin: 0 auto;float:none; width:550px; color:#313233"><br /><br />'
		+ '<b>' + profile + '</b><br />'
		+ '<hr />'
		+ '梁小姐:954604221@qq.com<br />'
		+ '<hr />'
		+ '联系电话:18588669056<br />'
		+ '<hr />'
		+ '服务时间：9:00~18:00(周一~周六)<br />'
		+ '<hr />'
		+ '</span>'
		+ '</div>'
	$('#contact').html($(contact))
});
