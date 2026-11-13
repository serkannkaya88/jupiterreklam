document.addEventListener('DOMContentLoaded',function(){
  var b=document.querySelector('.burger'),m=document.querySelector('.menu');
  if(b&&m)b.addEventListener('click',function(){var o=m.classList.toggle('open');b.textContent=o?'✕':'☰';b.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''});
  var h=document.querySelector('header');
  var onS=function(){if(h)h.classList.toggle('scrolled',window.scrollY>40)};window.addEventListener('scroll',onS,{passive:true});onS();
  var c=document.querySelector('.cookie'),k='jr-cookie';
  var get=function(){try{return localStorage.getItem(k)}catch(e){return null}};
  var set=function(v){try{localStorage.setItem(k,v)}catch(e){}};
  if(c&&!get())c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){
    x.addEventListener('click',function(){set(x.getAttribute('data-cookie'));c.classList.remove('show')})
  });
  var y=document.getElementById('yil');if(y)y.textContent=new Date().getFullYear();
});
document.addEventListener('DOMContentLoaded',function(){
  /* lights */
  var h=document.querySelector('.hero.photo');
  if(h){
    var btn=document.createElement('button');btn.type='button';btn.className='light-btn';
    btn.innerHTML='<i></i><span>Işıkları kapat</span>';h.appendChild(btn);
    var lbl=btn.querySelector('span');
    var on=function(){h.classList.remove('off');h.classList.add('flick');setTimeout(function(){h.classList.remove('flick')},1200);lbl.textContent='Işıkları kapat';btn.setAttribute('aria-pressed','true')};
    var off=function(){h.classList.add('off');lbl.textContent='Işığı yak';btn.setAttribute('aria-pressed','false')};
    var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!rm){h.classList.add('off');setTimeout(on,700)}
    btn.addEventListener('click',function(){h.classList.contains('off')?on():off()});
  }
  /* wizard */
  var w=document.getElementById('wiz'); if(!w) return;
  var steps=w.querySelectorAll('.wstep'),tabs=w.querySelectorAll('.wiz-steps b'),bar=w.querySelector('.wiz-bar span'),err=w.querySelector('.wiz-err'),cur=1;
  function show(n){cur=n;steps.forEach(function(s){s.classList.toggle('on',+s.dataset.step===n)});
    tabs.forEach(function(t,i){t.classList.toggle('on',i<n)});bar.style.width=(n*25)+'%';
    w.className='wiz s'+n;err.textContent='';var f=steps[n-1].querySelector('input,select,textarea');if(f&&n>1)f.focus({preventScroll:true});}
  function check(n){var s=steps[n-1];
    if(n===1&&!s.querySelector('input[name=hizmet]:checked')){err.textContent='Lütfen bir hizmet seçin.';return false}
    var bad=[].slice.call(s.querySelectorAll('[required]')).filter(function(i){return i.type==='checkbox'?!i.checked:!i.value.trim()});
    if(bad.length){err.textContent=bad[0].type==='checkbox'?'Devam etmek için KVKK onayı gerekiyor.':'Lütfen zorunlu alanları doldurun.';bad[0].focus();return false}
    var tel=s.querySelector('input[name=telefon]');if(tel&&tel.value.replace(/\D/g,'').length<10){err.textContent='Telefon numarasını kontrol edin.';tel.focus();return false}
    return true}
  w.querySelector('[data-next]').addEventListener('click',function(){if(check(cur))show(cur+1)});
  w.querySelector('[data-prev]').addEventListener('click',function(){if(cur>1)show(cur-1)});
  w.addEventListener('input',function(){err.textContent=''});
  w.querySelectorAll('.opt input').forEach(function(r){r.addEventListener('change',function(){setTimeout(function(){if(cur===1)show(2)},180)})});
  w.addEventListener('submit',function(e){if(!check(4)){e.preventDefault()}});
  w.querySelector('[data-wa-send]').addEventListener('click',function(){
    if(!check(4))return;var g=function(n){var el=w.querySelector('[name='+n+']');if(!el)return'';if(el.type==='radio'){var c=w.querySelector('[name='+n+']:checked');return c?c.value:''}return el.value.trim()};
    var olcu=(g('genislik')||'?')+' x '+(g('yukseklik')||'?')+' cm, '+g('adet')+' adet';
    var t='Merhaba, web sitenizden teklif almak istiyorum.\n\nHizmet: '+g('hizmet')+'\nÖlçü: '+olcu+'\nAydınlatma: '+g('aydinlatma')+' / '+g('mekan')+'\nKonum: '+g('ilce')+', '+g('il')+'\nZaman: '+g('zaman')+(g('mesaj')?'\nNot: '+g('mesaj'):'')+'\n\nAd: '+g('ad')+'\nTel: '+g('telefon')+(g('firma')?'\nFirma: '+g('firma'):'')+'\n\n(Fotoğraf ekliyorum)';
    window.open('https://wa.me/'+w.dataset.wa+'?text='+encodeURIComponent(t),'_blank');
  });
});
