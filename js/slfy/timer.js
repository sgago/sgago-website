function Timer(delay, callback) {
  "use strict";
  
  var timerId,
      start,
      remaining = delay;

  this.pause = function() {
      window.clearTimeout(timerId);
      remaining -= new Date() - start;
  };

  this.resume = function() {
      start = new Date();
      window.clearTimeout(timerId);
      timerId = window.setTimeout(callback, remaining);
  };

  this.resume();
}

/*
var timer = new Timer(1000, function() {
    alert("Done!");
});

timer.pause();
// Do some stuff...
timer.resume();
*/