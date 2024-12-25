function SevenSegmentTracker(label, value) {
  var el = document.createElement('span');
  el.className = 'seven-segment__piece';
  el.innerHTML = `
    <div class="display_group">
      <div class="seven-segment__display">
          <div class="segment a"></div>
          <div class="segment b"></div>
          <div class="segment c"></div>
          <div class="segment d"></div>
          <div class="segment e"></div>
          <div class="segment f"></div>
          <div class="segment g"></div>
      </div>
      <div class="seven-segment__display">
          <div class="segment a"></div>
          <div class="segment b"></div>
          <div class="segment c"></div>
          <div class="segment d"></div>
          <div class="segment e"></div>
          <div class="segment f"></div>
          <div class="segment g"></div>
      </div>
    </div>
    <span class="seven-segment__slot">${label}</span>
  `;

  this.el = el;
  var segments = el.querySelectorAll('.seven-segment__display');

  const segmentMap = {
      '0': ['a', 'b', 'c', 'd', 'e', 'f'],
      '1': ['b', 'c'],
      '2': ['a', 'b', 'd', 'e', 'g'],
      '3': ['a', 'b', 'c', 'd', 'g'],
      '4': ['b', 'c', 'f', 'g'],
      '5': ['a', 'c', 'd', 'f', 'g'],
      '6': ['a', 'c', 'd', 'e', 'f', 'g'],
      '7': ['a', 'b', 'c'],
      '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
      '9': ['a', 'b', 'c', 'd', 'f', 'g'],
  };

  this.update = function (val) {
      val = ('0' + val).slice(-2); // Ensure two digits
      if (val !== this.currentValue) {
          this.currentValue = val;

          for (let i = 0; i < 2; i++) {
              let digit = val[i];
              let display = segments[i];
              let segmentEls = display.querySelectorAll('.segment');
              segmentEls.forEach(segment => segment.classList.remove('active'));
              segmentMap[digit].forEach(s => display.querySelector(`.segment.${s}`).classList.add('active'));
          }
      }
  };

  this.update(value);
}


function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  return {
      'Total': t,
      'Days': Math.floor(t / (1000 * 60 * 60 * 24)),
      'Hours': Math.floor((t / (1000 * 60 * 60)) % 24),
      'Minutes': Math.floor((t / 1000 / 60) % 60),
      'Seconds': Math.floor((t / 1000) % 60),
  };
}


function Clock(countdown, callback) {
  countdown = new Date(Date.parse(countdown));
  callback = callback || function () {};

  this.el = document.createElement('div');
  this.el.className = 'seven-segment-clock';

  var trackers = {},
      t = getTimeRemaining(countdown),
      key,
      timeinterval;

  // Counter for added colons
  let isFirst = true;

  for (key in t) {
      if (key === 'Total') {
          continue;
      }

      if (!isFirst) {
          // Add a colon between the segments
          var colon = document.createElement('div');
          colon.className = 'seven-segment__colon';
          colon.innerHTML = ':';
          this.el.appendChild(colon);
      }
      isFirst = false;

      trackers[key] = new SevenSegmentTracker(key, t[key]);
      this.el.appendChild(trackers[key].el);
  }

  function updateClock() {
      timeinterval = requestAnimationFrame(updateClock);

      var t = getTimeRemaining(countdown);
      if (t.Total < 0) {
          cancelAnimationFrame(timeinterval);
          for (key in trackers) {
              trackers[key].update(0);
          }
          callback();
          return;
      }

      for (key in trackers) {
          trackers[key].update(t[key]);
      }
  }

  setTimeout(updateClock, 500);
}


var deadline = "30 December 2024 21:58:00";
var c = new Clock(deadline, function () {
  alert('Countdown complete');
});
document.getElementById("countdownRVSAT").appendChild(c.el);
