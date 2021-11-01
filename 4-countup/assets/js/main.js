$(document).ready(function () {
  $(window).scroll(function () {
    var offset = $(".stats-wrapper").outerHeight() * 2;
    if (
      $("html,body").scrollTop() >
      $(".stats-wrapper").position().top - offset
    ) {
      $(".stat-num").each(function () {
        var $this = $(this);
        var countTo = $this.attr("data-count");

        $({ countNum: $this.text() }).animate(
          {
            countNum: countTo,
          },
          {
            duration: 1800,
            easing: "linear",
            step: function () {
              $this.text(Math.ceil(this.countNum));
            },
            complete: function () {
              $this.text(countTo);
            },
          }
        );
      });
    }
  });
});
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
