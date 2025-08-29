(function(){
  // Lien actif
  try{
    const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nav a').forEach(a=>{
      const href = (a.getAttribute('href')||'').toLowerCase();
      if(href===here) a.setAttribute('aria-current','page');
      else a.removeAttribute('aria-current');
    });
  }catch(e){}

  // Menu burger
  const btn = document.querySelector('.burger');
  const nav = document.getElementById('site-nav');

  if(!btn || !nav) return;

  const closeMenu = () => {
    btn.setAttribute('aria-expanded','false');
    nav.classList.remove('is-open');
  };
  const openMenu = () => {
    btn.setAttribute('aria-expanded','true');
    nav.classList.add('is-open');
  };

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') closeMenu();
  });
  nav.addEventListener('click', (e)=>{
    if(e.target.closest('a')) closeMenu();
  });

  const mql = window.matchMedia('(min-width: 720px)');
  const sync = () => { if(mql.matches) closeMenu(); };
  mql.addEventListener('change', sync); sync();
})();
