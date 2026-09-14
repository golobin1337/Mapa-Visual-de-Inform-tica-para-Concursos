(function(){
  // ---------- infinite auto-scroll marquee (used by "A prévia" e "Onde o mapa entra na rotina") ----------
  // Moves the track with a CSS transform (not scrollLeft) so it works regardless
  // of the viewport's overflow/scroll behavior.
  function autoCarousel(track, speed, gap){
    if(!track) return;
    var setWidth = 0;
    function measure(){
      var slides = track.children.length / 2;
      setWidth = 0;
      for(var i = 0; i < slides; i++){
        setWidth += track.children[i].getBoundingClientRect().width + gap;
      }
    }
    // duplicate the slide set once so the loop can wrap seamlessly
    Array.prototype.slice.call(track.children).forEach(function(el){
      track.appendChild(el.cloneNode(true));
    });
    measure();
    window.addEventListener('resize', measure);

    var offset = 0;
    var paused = false;
    function tick(){
      if(!paused && setWidth > 0){
        offset += speed;
        if(offset >= setWidth) offset -= setWidth;
        track.style.transform = 'translateX(' + (-offset) + 'px)';
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    track.addEventListener('mouseenter', function(){ paused = true; });
    track.addEventListener('mouseleave', function(){ paused = false; });
  }
  autoCarousel(document.getElementById('previaTrack'), 0.35, 20);
  autoCarousel(document.getElementById('cenasScroller'), 0.35, 20);

  // ---------- compare slider: drag directly on the image ----------
  var compareFrame = document.getElementById('compareFrame');
  var after = document.getElementById('compareAfter');
  var handle = document.getElementById('compareHandle');
  function setCompare(v){
    v = Math.max(0, Math.min(100, v));
    after.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
    handle.style.left = v + '%';
  }
  function compareFromX(clientX){
    var rect = compareFrame.getBoundingClientRect();
    var v = ((clientX - rect.left) / rect.width) * 100;
    setCompare(v);
  }
  var compareDragging = false;
  compareFrame.addEventListener('pointerdown', function(e){
    compareDragging = true;
    compareFrame.setPointerCapture(e.pointerId);
    compareFromX(e.clientX);
  });
  compareFrame.addEventListener('pointermove', function(e){
    if(!compareDragging) return;
    compareFromX(e.clientX);
  });
  compareFrame.addEventListener('pointerup', function(){ compareDragging = false; });
  compareFrame.addEventListener('pointercancel', function(){ compareDragging = false; });
  setCompare(50);

  // ---------- smooth anchor scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });
})();
