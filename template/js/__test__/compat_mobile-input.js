// 只复位到顶部
$('input, textarea, select').on('blur', function () {
  window.scroll(0, 0);
});
// 复位到特定情景的顶部
(function () {
  var bfscrolltop = document.body.scrollTop;
  $('input, textarea, select')
    .focus(function () {
      bfscrolltop = document.body.scrollTop;
    })
    .blur(function () {
      document.body.scrollTop = bfscrolltop;
    });
})();
