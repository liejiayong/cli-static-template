// 菜单栏
$('#menuWrapper').on('click', 'a', function () {
  if (logic.isGaming) return;
  var tag = $(this).attr('data-tag');
  switch (tag) {
    case 'house':
      jtool.navTo('.section-2');
      break;

    case 'swim':
      jtool.navTo('.section-3');
      break;
    case 'rank':
      jtool.navTo('.section-4');
      break;

    default:
      jtool.navTo('.section-4');
      break;
  }
});
