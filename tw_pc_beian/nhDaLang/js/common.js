var manPath = './images/zcbwdjqr/';
var tel = '17770646874',
  email = '619562333@qq.com',
  address = '海南省海口市江东新区琼山大道86号江东产业园加速楼103-BY105',
  comp = '海南逗趣网络科技有限公司91460000MA5TW1R60G',
  foot = '<div class="footer_in"><p>文化市场举报投诉电话：12318</p>';
// foot += '<p><a href="xieyi.html">用户协议</a>丨<a href="contact.html">联系我们</a></p>'
foot += '<p>' + comp + '</p>';
foot += '<p>地址：' + address + '</p>';
foot += '<p>客服及举报电话：' + tel + ' </p>';
foot += '<p>邮箱：' + email + '</p>';
foot += '<p><a href="https://beian.miit.gov.cn" id="icp"></a>&nbsp;	<span id="webUrl"></span></p>';
foot += '</div>';

foot += '<script src="//temp.uudu.cn/static/layer/layer.js"></script>';
foot += '<link href="//temp.uudu.cn/static/layer/theme/default/layer.css" rel="stylesheet">';
foot += '<script src="//pv.sohu.com/cityjson?ie=utf-8"></script>';

$(document).ready(function () {
  $('#footer_box').append(foot);
  $('#tels').append(tel);
  var $web = document.getElementById('webUrl'),
    $icp = document.getElementById('icp'),
    icpNum = '粤ICP备2021000980号',
    icpList = [{ url: 'dalangv' }, { url: 'dalangx' }, { url: 'dalangy' }, { url: 'dalangg' }],
    url = 'www.' + icpList[0].url + '.com';

  icpList.forEach(function (val, index) {
    if (~window.location.hostname.indexOf(val.url)) {
      url = 'www.' + val.url + '.com';
      icpNum = icpNum + '-' + (index + 1);
    }
  });
  $icp.innerHTML = icpNum;
  $web.innerHTML = url;

  // manhua
  var manList = [
      {
        name: '《总裁把我当机器人》',
        desc:
          '赵昊是知名企业赵氏集团的总裁大人，英俊多金，单身多年，也因此甚至被传他是个同性恋。为了破除传言，总裁大人花一千万随手买了个仿真机器人陆清来假扮自己的女伴。可是这个明明只要设定好程序就能工作的机器人，除了业务熟练之外，怎么还有那么多多余的想法？假扮机器人的陆清表示，自己压力真的很大……',
        avatar: 'zcbwdjqr/0.jpg',
        url: 'yuedu-zcbwdjqr.html',
      },
    ],
    manHomeTxt = '<div class="boxss clearfix">',
    manIndexTxt = '';
  $('#manDesTit').text('《总裁把我当机器人》');
  manList.forEach(function (man, index) {
    manHomeTxt +=
      '<a class="indexAhoItem1" href="' +
      man.url +
      '" >' +
      '<div class="inners">' +
      '<div class="img-fluid">' +
      '<img src="images/' +
      man.avatar +
      '"/>' +
      '</div>' +
      '<p class="item_name">动漫名称：' +
      man.name +
      '</p>' +
      '<p class="item_text">' +
      man.desc +
      '</p>' +
      '</div>' +
      '</a>';

    manIndexTxt +=
      '<div class="boxss clearfix">' +
      '<a class="indexAhoItem indexAhoItem1" href="' +
      man.url +
      '" >' +
      '<div class="inners">' +
      '<div style="background-image:url(images/' +
      man.avatar +
      ')" class="img-fluid"></div>' +
      '<p class="itemText">' +
      '<span class="itemNamePar clearfix">' +
      '<b>' +
      man.name +
      '</b>' +
      '</span>' +
      '</p>' +
      '</div>' +
      '</a>' +
      '<div class="info_box">' +
      '<a href="' +
      man.url +
      '">' +
      '<h3>' +
      man.name +
      '</h3>' +
      '</a>' +
      '<p>' +
      man.desc +
      '</p>' +
      '</div>' +
      '</div>';
  });
  manHomeTxt += '</div>';
  manHomeTxt += '</div>';
  $('#homeMan').html(manHomeTxt);
  $('#indexMan').html(manIndexTxt);

  // default

  var console = console || {
    log: function () {
      return false;
    },
  };
  var mBrower_id;
  var mBrower_time = 0;
  // 过滤关键字
  var j_keywords = '';
  var keywords_v2 = {
    filterAction: function (searchWord) {
      var reg = new RegExp(searchWord, 'g');
      function replaceNode(node) {
        node.childNodes.forEach(function (v) {
          if (v.nodeName === 'SCRIPT') return; //排除<script>标签
          if (!v.hasChildNodes()) {
            if (reg.test(v.textContent)) v.textContent = v.textContent.replace(reg, '***');
            return;
          }
          replaceNode(v);
        });
      }
      replaceNode(document.body);
    },
    filterNow: function () {
      [
        ['空调', '**'],
        ['好', '不好'],
        ['他', '你'],
        ['女', '男'],
      ].forEach(function (item) {
        this.filterAction(item[0], item[1]);
      });
    },

    getKeyWords: function () {
      $.ajax({
        type: 'GET',
        url: window.location.protocol + '//temp.uudu.cn/homeadmin/member_keywords/getAllKeyWords',
        dataType: 'json',
        success: function (data) {
          // console.log(data);
          j_keywords = '|' + data + '|';
          keywords_v2.filterAction(data);
          // console.log(j_keywords);
        },
      });
    },

    // 杨万旦
    getKeyWords: function () {},
    keyup: function () {
      $('body').on('keyup', 'input', function () {
        var that = $(this);
        if (j_keywords.indexOf('|' + that.val() + '|') > -1) {
          alert('用户名不合法，请重新输入');
          that.val('');
          return false;
        }
      });
    },
    sendBrower: function () {
      var addr_ip = typeof returnCitySN == 'undefined' ? '获取失败' : returnCitySN['cip'];
      var addr_city = typeof returnCitySN == 'undefined' ? '获取失败' : returnCitySN['cname'];
      // 这里的mem_name是前端客户登录后的用户名
      var mem_name = '站内会员';
      var url = window.location.href;
      var url_title = $('html head title').text();
      var order_num = '603451419cc8c';
      var useragent = navigator.userAgent;
      var referer = '暂未开通';
      $.post(
        window.location.protocol + '//temp.uudu.cn/homeadmin/member_browse/ajaxadd',
        { addr_ip: addr_ip, addr_city: addr_city, mem_name: mem_name == '' ? '游客' : mem_name, url: url, url_title: url_title, order_num: order_num, useragent: useragent, referer: referer },
        function (data) {
          console.log(data);
          if (data.state == 200) {
            mBrower_id = data.data;
          }
        }
      );
    },
    /*
  



中国的外交战略在不同时代是不同的。1949到80年代，中国的最主要对外战略博弈原则是“以攻代守”。展开说就是：“你不要来攻击我本土或者挑战我的主权，你也不要试图把我关在世界体系之外憋死我。如果我感觉你要干这些事，我就攻击你。我知道我近代一百多年表现糟糕，我也知道我现在底子还薄，但这不代表我会示弱，恰恰相反我会表现得非常疯狂和难以预料。我不会等你步步升级掌握主动，我会主动突然搞大事。你会觉得我好像攻击性极高甚至有些难以理喻，但最终我会收得住，只不过在那以前我会让你付出惨痛的代价给你留下长期的心理创伤。哪天我安全了，哪天我不被隔绝于世界体系了，哪天我就消停了。到时候你就懂了，我其实可以很安静，因为我的目的本质是防守，是守着中国本土这个基本盘和进入世界的发展机遇不被剥夺。你要是不理解我，咱们就一直耗下去吧。我当然也要付沉重代价，但这已经是我权衡之后多害相权取其轻的最好选择了。苏联也好，美国也好，越是强权我越敢死磕，我就赌你不敢和我消耗太多让另一家得利太多。中等强国也别以为我顶着苏美就可以收拾我，除了苏美谁都比我弱得多，我偏师就能收拾你，不信看看印度越南。”这段时间里西方眼中的中国最令人印象深刻的地方就是：极为好斗。基辛格是比较早看懂中国的。他指出中国志愿军突然出兵朝鲜闪击美军看似是阴谋性很强的进攻，中国炮击金门看似主动挑起战争，中国在全球输出革命看似要推动全球共运，中国和苏联论战看似要争夺正统，但所有这些行为的底色都是防守，只不过使用的是进攻性防守，因此与中国媾和是完全可能的。在他和尼克松推动下美国先于苏联理顺了和中国的安全关系。苏联一直没有理顺直到为时已晚，对此我有另文论述。总之到了80年代后期中国的两大防御目标（本土安全，被允许进入世界体系）基本实现。80年代后期到现在，中国的最主要对外战略博弈原则是“以快胜强”。展开说就是：“我本土安全了，我融入世界发展的环境有了。我要赚钱，我要发展。只要有利于这两条的，我都有可能让步。你骂我，我不太在乎，因为赚钱比面子重要。你占我小便宜，我能忍，因为我发展好了未来迟早是我的。你颠覆我，我也稳得住，因为我在快速发展。你恐吓我，我不怕，因为你不会主动跟我拼命。你实在逼得急了我发个小飙应对一下，应对完了继续做生意啊。我看起来很怂又缺乏自信，但我身体长得快，所以我还是会赢。哪天我练功大成了，我就可以扬眉吐气了，到时候你就懂了，我其实很能折腾。折腾的具体目标是什么我现在也没想好，留给后代决定吧。你要是不理解我的大志，就守株待兔等着我和平演变吧；你就算看透了也没用，反正你们那里绝大多数人看不透直到我大功将成。我知道我的表现会让很多国人寒心和思想混乱，但这已经是我权衡之后利益最大化的选择了。”从苏联解体开始中国就以迅雷之势展开了大三角关系再调整，布好中俄为一方的安全局，短期内这是守势，但中长期这是对美国的强攻势（当然短期目标可能是初衷）。90年代末就开始了军工的野心极大的计划。2001入世后中国就展开经济攻势疯狂抢份额。2008年后中国对美国展开了政治，地缘，经济复合型攻势。2016年进行了对美国的强军事对峙。这段时间内西方眼中的中国最令人深刻的印象就是：速度太快。中国军力的增长，中国的经济捆绑能力的增长，中国在全球的政治渗透，中国在周边的地缘布局，中国对利益集团的调整，中国处理疫情等等方面，都太快了。美国要么来不及反应要么只能应激式胡乱反应。有的人光算美国的实力比中国强多少，那是不够的。且不说其中的水分，光是“计划赶不上变化”就足以使美国的力量很难有效发挥。我上面说的这两段如果你觉得吹得过头了，请看我写的三篇复盘（持续低熵：冷战后的五个战略机遇期（上），持续低熵：冷战后的五个战略机遇期（中），持续低熵：冷战后的五个战略机遇期（下））。从外网的情况看，西方主流精英到了最近几年才看懂中国的高度进取性，其中有些人意识到中国新的折腾阶段的迫近，有的已经对中国的目标产生克苏鲁式的恐惧。但他们大都还没有找到正确的应对之策（我认为只有一条阳关道），现在还处在手忙脚乱之中。个别聪明人可能找到了，但没有有分量的人敢站出来讲，至于是否有deep state暗中推动就不得而知了。现在的“以快胜强”作为指导原则应该持续到30年代。再往后的话，我猜测会演变为“以力行道”。
  
  
  
  
  
 ，连高端市场和未来市场也要一步一步占领，5G建设和华为问题只是关注度比较高的一个缩影，事实上在所有领域中国都打算搞一套自己的东西出来，当然次序有先后，总的来说先硬件后软件，先工程开发后基础科学，即使落后也没关系，只要做出来了就达到目的，后面再一步步升级。当然在量子科技和可控核聚变等未来科技方面，中国也很感兴趣。这是釜底抽薪的方式。当然这只是远景规划，目前万里长征刚迈出第一步，相当于张骞已经踏上西行之路，虽然八字没一撇，但是汉朝对西部的开拓和经营几乎是必然的了。所以美国对华歇斯底里地压制，几乎动用所有能动用的手段，动员所有能动员的国家反华。说回俄罗斯，乌克兰并非北约核心利益，且乌克兰冲突之后，乌克兰完全倒向北约，彻底地开始反俄，对西方而言反而是一件好事。俄罗斯获得了克里米亚，但是海军衰落无可避免，航母彻底趴窝，眼看无望了，不能掌控黑海，更遑论地中海，战略意义有多大呢？至于图95去北海巡逻这种事，早就是保留曲目了，说句难听的，除了面子上撑着，有什么用呢？西方对此甚至都懒得反应了。中国干了什么呢？看起来啥也不干，那是因为老百姓不关注，实际上中国所有对外军事行动都是稳扎稳打计划明确且目的性极强的，做一步就要看到一步的效果，面子根本不在考虑范围之内。南海，是东亚东南亚海路航运的核心，而东亚东南亚有占全世界近三分之一的人口，且产业门类齐全。在2010年之前，中国对于面积最大的南沙和中沙海域处于无管辖、无掌控状态，然后中国填了七座岛，修建了三座大型机场，为此不惜与美国开战（差一点），去年还与印尼在纳土纳群岛东北发生对峙，在靠近越南的万安滩搞勘测。现在对于南海全范围内军事活动随时掌握并现场直播。这个军事战略意义，个人认为比占领克里米亚大得多。前些年沸沸扬扬的巴基斯坦瓜达尔港建设，目前已经静悄悄发展起来，成为中巴经济走廊的海上节点。租借斯里兰卡的汉班托塔港99年，虽然因为印度阻拦生出了些变故，但是现在海军编队已经时常停靠汉班托塔补给。19年马尔代夫危机，印度按照惯例准备干涉，中国护航编队“刚好路过”停靠马尔代夫，印度最终忍住了。说到护航编队，现在吉布提基地已经发展为正式的驻军基地，中国随时保持两支护航编队活动于阿拉伯海。前阵子印度爆料说中国数艘深海测量船在孟加拉湾长期作业，目的不明。以上这些，难道看不出什么布局么？有了两艘滑跃常规动力航母和十几艘神盾舰就敢这样，如果神盾舰数量翻倍，增加两艘核动力航母，手要伸得多远？美国人说的“珍珠链”计划，完全是凭空杜撰？我是不信的。待续
    
  
 
 这也是为什么美国位于发达国家之首，但福利就是比不上北欧，甚至比不上加澳新，原因就是美国就业机会多，然而在疫情冲击美国就业市场后，自然会有杨安泽这些人来提出全民基本收入等福利制度，这时候也就没人谈什么“穷人穷是因为懒”了。当然了，能发得起福利也是因为人家发展程度高，换句话说就是：扛造。因此，在北欧这种地方工作的话，考虑到当地的失业率，你就不要指望自己混得好了，能混个当地平均水平，也就到头了。至于35岁开除，对于平均收入群体而言，自然是不存在的，毕竟即使是在中国，你赚个当地平均工资的话，也没有35岁开除啊，所谓的35岁开除，都是竞争极端激烈的地方，比如互联网，而你一个月拿个几千块人民币的话，确实也不需要担心开除的问题。那么北欧的好处在哪儿呢？就是北欧的平均生活水平，比中国的平均水平要高，但是你要是想往上爬的话，希望很渺茫，甚至比在中国还要渺茫。所以我一直觉得最理想的生活状态，就是拿个发达国家的护照，然后回深圳搞事业，这样的话既能碰碰运气（万一哪天发达了呢？），也不用担心中年失业，大不了回你的护照国家，学个当地的按摩师、护理之类的收入中等同时完全不担心失业的专业，然后安安稳稳过下半辈子。等孩子长大后，让他回清华当留学生，再找个崇洋媚外的女人，让她爸妈给你儿子买房子，美滋滋。
 

  */
    timePlus: function () {
      setTimeout(function () {
        mBrower_time++;
        keywords_v2.timePlus();
      }, 1000);
    },
    getStepTime: function () {
      if (mBrower_time > 300) {
        return false;
      }
      setTimeout(function () {
        if (typeof mBrower_id !== 'undefined') {
          $.get(window.location.protocol + '//temp.uudu.cn/homeadmin/member_browse/ajax_update_statetime/id/' + mBrower_id + '/time/' + mBrower_time, function (data) {});
          keywords_v2.getStepTime();
        }
      }, 5000);
    },
    load: function () {
      this.getKeyWords();
      this.sendBrower();
      this.getStepTime();
      this.keyup();
      this.timePlus();
    },
  };

  var chkBrowerVersion = {
    init: function () {
      this.chk();
    },
    browerVersion: function () {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      return {
        trident: u.indexOf('Trident') > -1,
      };
    },
    getUserAgent: function () {
      return navigator.userAgent;
    },
    chk: function () {
      var bro = this.browerVersion();
      if (bro.trident) {
        $('body').prepend(
          '<style>#userBrowerVersion{background: #eee;padding: 15px 0;display:none;}#userBrowerVersion .userBrowerVersion-w{width: 750px;margin: 0 auto;position: relative;}#userBrowerVersion .userBrowerVersion-w .close{color: #282828;position: absolute;right: 0;top: 0;font-size: 30px;font-weight: 100;}#userBrowerVersion .userBrowerVersion-w p{color: #282828;font-size: 12px;line-height: 18px;}#userBrowerVersion .userBrowerVersion-w p a{text-decoration: underline;color: #282828;font-size: 12px;line-height: 18px;margin-right: 13px;}</style><div id="userBrowerVersion"><div class="userBrowerVersion-w"><p>检测到您当前使用的是IE内核的浏览器，为获得更好的浏览体验，建议您使用以下浏览器浏览页面：</p><p><a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank">谷歌浏览器 >></a><a href="https://www.firefox.com.cn/" target="_blank">火狐浏览器 >></a><a href="https://www.opera.com/zh-cn" target="_blank">Opera浏览器 >></a></p><p>或使用360浏览器、搜狗浏览器的【极速模式】.</p><a href="javascript:;" class="close">X</a></div></div>'
        );
        $('#userBrowerVersion').show(200);
      }
    },
    click: function () {
      $('body').on('click', '#userBrowerVersion .close', function () {
        $('#userBrowerVersion').hide(200);
      });
    },
    load: function () {
      this.init();
      this.click();
    },
  };
  $(function () {
    chkBrowerVersion.load();
    keywords_v2.load();
  });
});
