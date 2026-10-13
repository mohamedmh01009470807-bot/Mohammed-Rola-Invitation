(function(){
  var intro=document.getElementById('intro');
  var openBtn=document.getElementById('openInvitation');
  var toggle=document.getElementById('soundToggle');
  var audio=document.getElementById('bgMusic');
  var label=toggle.querySelector('.sound-label');
  document.body.classList.add('locked');

  function setPlaying(on){
    toggle.setAttribute('aria-pressed',on?'true':'false');
    toggle.setAttribute('aria-label',on?'Turn background music off':'Turn background music on');
    label.textContent=on?'Pause music':'Play music';
  }
  function play(){
    var p=audio.play();
    if(p&&p.then){p.then(function(){setPlaying(true)}).catch(function(){setPlaying(false)});}
  }
  openBtn.addEventListener('click',function(){
    intro.classList.add('hide');
    document.body.classList.remove('locked');
    window.scrollTo(0,0);
    play();
  });
  toggle.addEventListener('click',function(){
    if(audio.paused){play()}else{audio.pause();setPlaying(false)}
  });

  // Reveal on scroll
  var items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target)}});
    },{threshold:.15});
    items.forEach(function(el){io.observe(el)});
  }else{items.forEach(function(el){el.classList.add('show')})}

  // Countdown (Egypt time, UTC+3 in October)
  var target=new Date('2026-10-16T20:00:00+03:00').getTime();
  var d=document.getElementById('days'),h=document.getElementById('hours'),
      m=document.getElementById('minutes'),s=document.getElementById('seconds'),
      msg=document.getElementById('countdownMessage');
  function pad(n){return String(n).padStart(2,'0')}
  function tick(){
    var diff=target-Date.now();
    if(diff<=0){d.textContent=h.textContent=m.textContent=s.textContent='00';msg.textContent='Today is our special day!';return}
    d.textContent=pad(Math.floor(diff/864e5));
    h.textContent=pad(Math.floor(diff%864e5/36e5));
    m.textContent=pad(Math.floor(diff%36e5/6e4));
    s.textContent=pad(Math.floor(diff%6e4/1e3));
  }
  tick();setInterval(tick,1000);
})();
