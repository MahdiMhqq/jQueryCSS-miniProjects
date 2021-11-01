$(document).ready(function () {
  $(".btn").click(function () {
    if ($(".spinner").hasClass("waiting")) {
      $(this).removeClass("start").addClass("end");
      $(".spinner").removeClass("waiting").addClass("uploading");
    } else if ($(".spinner").hasClass("uploading")) {
      $(this).removeClass("end").addClass("again");
      $(".sign.info").fadeToggle(function () {
        $(".sign.done").fadeToggle();
        $(".spinner").removeClass("uploading").addClass("done");
      });
    } else {
      $(this).removeClass("again").addClass("start");
      $(".sign.done").fadeToggle(function () {
        $(".sign.info").fadeToggle();
        $(".spinner").removeClass("done").addClass("waiting");
      });
    }
  });
});
