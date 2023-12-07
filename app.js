
function CountdownTracker(label, value){

    var el = document.createElement('span');
  
    el.className = 'flip-clock__piece';
    el.innerHTML = '<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' + 
      '<span class="flip-clock__slot">' + label + '</span>';
  
    this.el = el;
  
    var top = el.querySelector('.card__top'),
        bottom = el.querySelector('.card__bottom'),
        back = el.querySelector('.card__back'),
        backBottom = el.querySelector('.card__back .card__bottom');
  
    this.update = function(val){
      val = ( '0' + val ).slice(-2);
      if ( val !== this.currentValue ) {
        
        if ( this.currentValue >= 0 ) {
          back.setAttribute('data-value', this.currentValue);
          bottom.setAttribute('data-value', this.currentValue);
        }
        this.currentValue = val;
        top.innerText = this.currentValue;
        backBottom.setAttribute('data-value', this.currentValue);
  
        this.el.classList.remove('flip');
        void this.el.offsetWidth;
        this.el.classList.add('flip');
      }
    }
    
    this.update(value);
  }
  
  
  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    return {
      'Total': t,
      'Days': Math.floor(t / (1000 * 60 * 60 * 24)),
      'Hours': Math.floor((t / (1000 * 60 * 60)) % 24),
      'Minutes': Math.floor((t / 1000 / 60) % 60),
      'Seconds': Math.floor((t / 1000) % 60)
    };
  }
  
  function Clock(countdown,callback) {
    
    countdown = new Date(Date.parse(countdown))
    callback = callback || function(){};
  
    this.el = document.createElement('div');
    this.el.className = 'flip-clock';
  
    var trackers = {},
        t = getTimeRemaining(countdown),
        key, timeinterval;
  
    for ( key in t ){
      if ( key === 'Total' ) { continue; }
      trackers[key] = new CountdownTracker(key, t[key]);
      this.el.appendChild(trackers[key].el);
    }
  
    var i = 0;
    function updateClock() {
      timeinterval = requestAnimationFrame(updateClock);
      
      // throttle so it's not constantly updating the time.
      if ( i++ % 10 ) { return; }
      
      var t = getTimeRemaining(countdown);
      if ( t.Total < 0 ) {
        cancelAnimationFrame(timeinterval);
        for ( key in trackers ){
          trackers[key].update( 0 );
        }
        callback();
        return;
      }
      
      for ( key in trackers ){
        trackers[key].update( t[key] );
      }
    }
  
    setTimeout(updateClock,500);
  }
  
  var deadline = "8 December 2023 23:59:59"
  var c = new Clock(deadline, function(){ alert('countdown complete') });
  document.getElementById("countdown").appendChild(c.el);
  
  