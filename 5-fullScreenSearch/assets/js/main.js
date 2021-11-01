$(document).ready(function () {
  $(".page-open-btn").click(function () {
    $(this).addClass("open");
    $("#search-bar").focus();
  });
  $(".page-close-btn").click(function () {
    $(".page-open-btn").removeClass("open");
  });
});
