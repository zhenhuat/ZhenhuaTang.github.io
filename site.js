(() => {
  const root = document.documentElement;
  const systemDark = matchMedia('(prefers-color-scheme: dark)').matches;
  let saved; try { saved = localStorage.getItem('theme'); } catch {}
  root.dataset.theme = saved || (systemDark ? 'dark' : 'light');
  document.querySelector('#theme').addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch {}
  });
  const papers = [...document.querySelectorAll('.pub-item')];
  let filter = 'all';
  const search = document.querySelector('#search');
  function update() {
    const query = search.value.trim().toLowerCase(); let count = 0;
    for (const paper of papers) {
      paper.hidden = !((filter === 'all' || paper.dataset.kind === filter) && paper.textContent.toLowerCase().includes(query));
      if (!paper.hidden) count++;
    }
    document.querySelector('#results').textContent = `${count} publications`;
    document.querySelector('#empty').hidden = count !== 0;
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('selected', b === button); b.setAttribute('aria-pressed', String(b === button)); }); update();
  }));
  search.addEventListener('input', update); update();
  const dialog = document.querySelector('#lightbox');
  document.querySelectorAll('.photo').forEach(button => button.addEventListener('click', () => {
    const image = button.querySelector('img');
    dialog.querySelector('img').src = image.src; dialog.querySelector('img').alt = image.alt;
    dialog.querySelector('p').textContent = image.alt; dialog.showModal();
  }));
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  const navLinks = [...document.querySelectorAll('.nav-links a')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.hash === '#' + entry.target.id)); }), {rootMargin: '-10% 0px -65% 0px'});
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }
  const config = window.SITE_CONFIG || {};
  if (config.visitorMapImage && config.visitorMapLink) {
    try {
      const image = new URL(config.visitorMapImage), link = new URL(config.visitorMapLink);
      if (image.protocol === 'https:' && link.protocol === 'https:') {
        const map = document.querySelector('#visitor-map');
        map.addEventListener('load', () => { document.querySelector('#visitors').hidden = false; });
        map.src = image.href; document.querySelector('#visitor-link').href = link.href;
      }
    } catch {}
  }
})();
