(function windowAutoAdjest(designWidth) {
  designWidth = 1920
  window.resizefun = function () {
    var sWidth = $(window).width();
    var isFirefox;
    if ((isFirefox = navigator.userAgent.indexOf("Firefox") > 0)) {
      var len = sWidth / designWidth;
      $(".wrapper").css({ "-moz-transform": "scale(" + len + ")" });
      $(".wrapper").css({ "-moz-transform-origin": "0 0" });
      $(".wrapper").css({ "transform-origin": "top left" });
    }
    $(".wrapper").css({ zoom: sWidth / designWidth });
  };
  $(window).on("resize", resizefun).trigger("resize");
}())
