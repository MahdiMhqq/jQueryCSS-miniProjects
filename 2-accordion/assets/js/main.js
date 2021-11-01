$(document).ready(function () {
  $(".accordin-menu .item").click(function () {
    // close all other accordin menus
    if ($(this).not(".open")) {
      $(this)
        .siblings(".item.open")
        .removeClass("open")
        .children(".content")
        .slideToggle();
    }
    //open this one
    $(this).toggleClass("open");
    $(this).children(".content").slideToggle();
  });
});
