// ******************** Random Movement of Floating Cricles **********************/
/* Thanks to LEE SHERWOOD for his response on stack overflow
   Thread : https://stackoverflow.com/users/887728/lee
*/

function RandomObjectMover(obj, container, posX, posY) {
  this.$object = obj;
  this.$container = container;
  this.container_is_window = container === window;
  this.pixels_per_second = 150;
  this.current_position = { x: posX, y: posY };
  this.is_running = false;
}

// Set the speed of movement in Pixels per Second.
RandomObjectMover.prototype.setSpeed = function (pxPerSec) {
  this.pixels_per_second = pxPerSec;
};

RandomObjectMover.prototype._getContainerDimensions = function () {
  if (this.$container === window) {
    return {
      height: this.$container.innerHeight,
      width: this.$container.innerWidth,
    };
  } else {
    return {
      height: this.$container.clientHeight,
      width: this.$container.clientWidth,
    };
  }
};

RandomObjectMover.prototype._generateNewPosition = function () {
  // Get container dimensions minus div size
  var containerSize = this._getContainerDimensions();
  var availableHeight = containerSize.height - this.$object.clientHeight;
  var availableWidth = containerSize.width - this.$object.clientHeight;

  // Pick a random place in the space
  var y = Math.floor(Math.random() * availableHeight);
  var x = Math.floor(Math.random() * availableWidth);

  return { x: x, y: y };
};

RandomObjectMover.prototype._calcDelta = function (a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  var dist = Math.sqrt(dx * dx + dy * dy);
  return dist;
};

RandomObjectMover.prototype._moveOnce = function () {
  // Pick a new spot on the page
  var next = this._generateNewPosition();

  // How far do we have to move?
  var delta = this._calcDelta(this.current_position, next);

  // Speed of this transition, rounded to 2DP
  var speed = Math.round((delta / this.pixels_per_second) * 100) / 100;

  //console.log(this.current_position, next, delta, speed);

  this.$object.style.transition = "transform " + speed + "s linear";
  this.$object.style.transform =
    "translate3d(" + next.x + "px, " + next.y + "px, 0)";

  // Save this new position ready for the next call.
  this.current_position = next;
};

RandomObjectMover.prototype.start = function () {
  if (this.is_running) {
    return;
  }

  // Make sure our object has the right css set
  this.$object.style.willChange = "transform";
  this.$object.style.pointerEvents = "auto";

  this.boundEvent = this._moveOnce.bind(this);

  // Bind callback to keep things moving
  this.$object.addEventListener("transitionend", this.boundEvent);

  // Start it moving
  this._moveOnce();

  this.is_running = true;
};

RandomObjectMover.prototype.stop = function () {
  if (!this.is_running) {
    return;
  }

  this.$object.removeEventListener("transitionend", this.boundEvent);

  this.is_running = false;
};

// Init it
var floatingCircle1 = new RandomObjectMover(
  document.querySelector(".floating-circle1"),
  document.querySelector(".hero-header"),
  0,
  0
);
var floatingCircle2 = new RandomObjectMover(
  document.querySelector(".floating-circle2"),
  document.querySelector(".hero-header"),
  1000,
  500
);

floatingCircle1.start();
floatingCircle2.start();

// ******************** END Random Movement of Floating Cricles **********************/
$(document).ready(function () {
  // side bar menu
  $(".menu-btn, .overlay-sidebar").click(function () {
    if ($(".menu-btn").hasClass("first")) {
      //first time page loads
      $(".menu-btn").removeClass("first").toggleClass("checked");
      $(".menu").removeClass("first").toggleClass("opened");
      $(".overlay-sidebar").toggleClass("open");
    } else {
      //after first time
      $(".menu-btn").toggleClass("unchecked").toggleClass("checked");
      $(".menu").toggleClass("closed").toggleClass("opened");
      $(".overlay-sidebar").toggleClass("open");
    }
  });
  // sign in modal box
  $(".signin-modal-btn,.signin-overlay").click(function () {
    $(".signin-modal").toggleClass("open");
    $(".signin-overlay").fadeToggle(500);
  });
  // show/hide password in modal box password input
  $("#show-pass").click(function () {
    if ($(".pass-input").attr("type") === "password") {
      $(this).removeClass("fa-eye-slash").addClass("fa-eye");
      $(".pass-input").attr("type", "text");
    } else {
      $(this).removeClass("fa-eye").addClass("fa-eye-slash");
      $(".pass-input").attr("type", "password");
    }
  });
  // corner-menu
  $("#corner-btn").click(function (e) {
    e.preventDefault();
    $(".corner-menu").toggleClass("active");
  });
  // toast
  // toast close button
  $(".toast-close").click(function () {
    $(this)
      .parent(".toast")
      .fadeOut("slow", function () {
        $(this).remove();
      });
  });
  // toast auto close after n miliseconds
  setTimeout(function () {
    $(".toast.toast-info, .toast.toast-success").fadeOut("slow", function () {
      $(this).remove();
    });
  }, 15000);
});
