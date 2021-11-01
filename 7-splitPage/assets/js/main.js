$(document).ready(function () {
  $(".half-page").each(function () {
    $(this).mouseenter(function () {
      $(this).addClass("active").siblings(".half-page").addClass("dead");
    });
    $(this).mouseleave(function () {
      $(this).removeClass("active").siblings(".half-page").removeClass("dead");
    });
  });
});
