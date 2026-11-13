document.addEventListener('DOMContentLoaded',function(){
  var b=document.querySelector('.burger'),m=document.querySelector('.menu');
  if(b&&m)b.addEventListener('click',function(){m.classList.toggle('open')});
  var c=document.querySelector('.cookie'),k='jr-cookie';
  var get=function(){try{return localStorage.getItem(k)}catch(e){return null}};
  var set=function(v){try{localStorage.setItem(k,v)}catch(e){}};
  if(c&&!get())c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){
    x.addEventListener('click',function(){set(x.getAttribute('data-cookie'));c.classList.remove('show')})
  });
  var y=document.getElementById('yil');if(y)y.textContent=new Date().getFullYear();
});
