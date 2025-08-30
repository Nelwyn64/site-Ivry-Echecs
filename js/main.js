/* js/main.js
   - Menu burger (ouverture/fermeture + Esc + clic sur un lien)
   - Mise à jour aria-current sur la navigation en fonction de l’URL courante
*/
(function () {
  // ------ Utilitaires
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // ------ Marquer le lien actif dans la nav
  try {
    // Exemple d’URL: /site-Ivry-Echecs/about.html
    // On récupère uniquement le dernier segment (about.html) ou index.html si vide
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

    $$('.nav a').forEach(a => {
      const target = (a.getAttribute('href') || '')
        .split('/')
        .pop() || 'index.html';
      if (target.toLowerCase() === current) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  } catch (e) {
    // silence is golden
  }

  // ------ Menu burger
  const btn = $('.burger');
  const nav = $('#site-nav');

  if (!btn || !nav) return;

  const openMenu = () => {
    btn.setAttribute('aria-expanded', 'true');
    nav.classList.add('is-open');
  };

  const closeMenu = () => {
    btn.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };

  const toggleMenu = () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  };

  // Clic sur le bouton
  btn.addEventListener('click', toggleMenu);

  // Fermer avec la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Fermer quand on clique un lien de la nav
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu();
  });

  // Re-synchroniser quand on repasse en desktop (>= 720px)
  const mql = window.matchMedia('(min-width: 720px)');
  const sync = () => { if (mql.matches) closeMenu(); };
  mql.addEventListener('change', sync);
  sync();
})();
