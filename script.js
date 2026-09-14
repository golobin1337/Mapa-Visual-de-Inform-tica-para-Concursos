(function(){
  // ---------- data for entregaveis carousel ----------
  var mapas = [
    {img:"e1.jpg", num:"02", modulo:"Hardware, Software e Periféricos", t:"Hierarquia e Tipos de Memória"},
    {img:"e2.jpg", num:"05", modulo:"Hardware, Software e Periféricos", t:"Periféricos Híbridos"},
    {img:"e3.jpg", num:"13", modulo:"Segurança da Informação", t:"Criptografia"},
    {img:"e4.jpg", num:"16", modulo:"Redes, Internet e Nuvem", t:"Abrangência de Rede: PAN x LAN x MAN x WAN"},
    {img:"e5.jpg", num:"18", modulo:"Redes, Internet e Nuvem", t:"Ambientes de Rede: Internet x Intranet x Extranet"},
    {img:"e6.jpg", num:"19", modulo:"Redes, Internet e Nuvem", t:"Equipamentos de Rede: Hub x Switch x Roteador x Modem"},
    {img:"e7.jpg", num:"21", modulo:"Redes, Internet e Nuvem", t:"Protocolos de Navegação e Arquivos"}
  ];
  var bonus = [
    {img:"BONUS 1.jpg", t:"100 Questões + Gabarito"},
    {img:"BONUS 2.jpg", t:"Checklist de Informática"},
    {img:"BONUS 3.jpg", t:"Ficha de Revisão Pré-Prova"},
    {img:"BONUS 4.jpg", t:"Atalhos Essenciais"}
  ];
  var track = document.getElementById('carTrack');
  var frag = document.createDocumentFragment();
  mapas.forEach(function(m){
    var el = document.createElement('div');
    el.className = 'cslide';
    el.innerHTML =
      '<div class="cslide-media"><img src="public/'+encodeURIComponent(m.img)+'" alt="Mapa '+m.num+' — '+m.t+'" loading="lazy"></div>'+
      '<div class="cslide-body"><span class="cnum">Mapa '+m.num+' · '+m.modulo+'</span><h4>'+m.t+'</h4></div>';
    frag.appendChild(el);
  });
  bonus.forEach(function(b, idx){
    var el = document.createElement('div');
    el.className = 'cslide is-bonus';
    el.innerHTML =
      '<div class="cslide-media"><img src="public/'+encodeURIComponent(b.img)+'" alt="'+b.t+'" loading="lazy"></div>'+
      '<div class="cslide-body"><span class="cnum">Bônus '+(idx+1)+'</span><h4>'+b.t+'</h4></div>';
    frag.appendChild(el);
  });
  var moreEl = document.createElement('div');
  moreEl.className = 'cslide is-more';
  moreEl.innerHTML = '<span class="more-num">+43</span><h4>mapas visuais e mais temas dentro do material completo</h4>';
  track.appendChild(frag);
  track.appendChild(moreEl);

  function dragScroll(el){
    var isDown = false, startX, scrollLeft, moved = false;
    el.addEventListener('mousedown', function(e){
      isDown = true; moved = false; el.classList.add('dragging');
      startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft;
    });
    window.addEventListener('mouseup', function(){ isDown = false; el.classList.remove('dragging'); });
    el.addEventListener('mouseleave', function(){ isDown = false; el.classList.remove('dragging'); });
    el.addEventListener('mousemove', function(e){
      if(!isDown) return;
      e.preventDefault();
      var x = e.pageX - el.offsetLeft;
      var walk = x - startX;
      if(Math.abs(walk) > 5) moved = true;
      el.scrollLeft = scrollLeft - walk;
    });
    el.addEventListener('click', function(e){ if(moved){ e.preventDefault(); e.stopPropagation(); } }, true);
  }
  dragScroll(track);
  dragScroll(document.getElementById('cenasScroller'));

  document.getElementById('carPrev').addEventListener('click', function(){ track.scrollBy({left:-240, behavior:'smooth'}); });
  document.getElementById('carNext').addEventListener('click', function(){ track.scrollBy({left:240, behavior:'smooth'}); });

  // ---------- compare slider ----------
  var range = document.getElementById('compareRange');
  var after = document.getElementById('compareAfter');
  var handle = document.getElementById('compareHandle');
  function setCompare(v){
    after.style.clipPath = 'inset(0 ' + (100 - v) + '% 0 0)';
    handle.style.left = v + '%';
  }
  range.addEventListener('input', function(){ setCompare(range.value); });
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
