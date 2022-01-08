window._bd_share_config = {
  common: {
    bdText: '',
    bdDesc: '',
    bdUrl: '',
    bdPic: '',
    bdSign: '',
    bdMini: 1,
    bdMiniList: ['weixin', 'tsina', 'qzone', 'sqq'],
    onBeforeClick: function (cmd, config) {},
    onAfterClick: function (cmd) {},
    bdPopupOffsetLeft: 1,
    bdPopupOffsetTop: 1,
  },
  share: [{ tag: 'share_1', bdSize: 16, bdCustomStyle: '' }],
  image: [
    {
      tag: 'share_1',
      viewType: 'list',
      viewPos: 'top',
      viewColor: 'black',
      viewSize: '16',
      viewList: ['weixin', 'tsina', 'qzone', 'sqq'],
    },
  ],
  selectShare: [{ bdSelectMiniList: ['weixin', 'tsina', 'qzone', 'sqq'], bdContainerClass: 'bd_selectShare' }],
};
with (document)
  (0)[
    ((getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src =
      'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5))
  ];
