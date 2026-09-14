(function(){
  // ---------- data for entregaveis carousel ----------
  var mapas = [
    "Microcomputador: Componentes e Periféricos","Hardware e Periféricos","Dispositivos de Entrada e Saída",
    "Impressoras e Periféricos","Sistemas de Numeração e Unidades de Medida","Sistema Operacional Windows",
    "Sistema Operacional Linux","Editor de Texto (Word)","Formatação e Estilos no Word",
    "Planilhas Eletrônicas (Excel)","Fórmulas e Funções no Excel","Gráficos e Tabelas Dinâmicas",
    "Apresentações (PowerPoint)","LibreOffice Writer","LibreOffice Calc","LibreOffice Impress",
    "Redes de Computadores","Modelo OSI e TCP/IP","Topologias de Rede","Internet e Intranet",
    "Navegadores de Internet","Correio Eletrônico","Protocolos de E-mail (POP3, IMAP, SMTP)",
    "Computação em Nuvem","Armazenamento em Nuvem","Segurança da Informação","Princípios CID",
    "Malwares e Pragas Virtuais","Vírus, Worms e Trojans","Ransomware e Spyware",
    "Firewall e Criptografia","Certificado e Assinatura Digital","Backup e Recuperação de Dados",
    "Tipos de Backup","Banco de Dados — Conceitos","Modelo Relacional","Atalhos — Windows",
    "Atalhos — Word e Excel","LGPD — Noções Gerais","Governança de TI",
    "Compressão de Arquivos (ZIP/RAR)","Extensões de Arquivo","Manutenção Preventiva de Computadores",
    "Redes Sociais e Ferramentas Colaborativas","Aplicativos de Mensagens e Videoconferência",
    "Atualizações e Patches de Segurança","Autenticação e Senhas Seguras","Phishing e Engenharia Social",
    "Termos e Conceitos Gerais de Informática","Tendências em TI para Concursos"
  ];
  var bonus = [
    {t:"100 Questões + Gabarito", i:"📝"},
    {t:"Checklist de Informática", i:"☑️"},
    {t:"Ficha de Revisão Pré-Prova", i:"⏱️"},
    {t:"Atalhos Essenciais", i:"⌨️"}
  ];
  var track = document.getElementById('carTrack');
  var frag = document.createDocumentFragment();
  mapas.forEach(function(m, idx){
    var el = document.createElement('div');
    el.className = 'cslide';
    el.innerHTML = '<div class="cicon">🗂️</div><span class="cnum">Mapa '+String(idx+1).padStart(2,'0')+'</span><h4>'+m+'</h4>';
    frag.appendChild(el);
  });
  bonus.forEach(function(b, idx){
    var el = document.createElement('div');
    el.className = 'cslide is-bonus';
    el.innerHTML = '<div class="cicon">'+b.i+'</div><span class="cnum">Bônus '+(idx+1)+'</span><h4>'+b.t+'</h4>';
    frag.appendChild(el);
  });
  track.appendChild(frag);

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
