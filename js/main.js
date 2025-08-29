(function(){
  try{
    const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav a').forEach(a=>{
      const href = (a.getAttribute('href')||'').toLowerCase();
      if(href===here) a.setAttribute('aria-current','page');
    });
  }catch(e){}
})();
