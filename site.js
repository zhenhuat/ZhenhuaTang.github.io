(() => {
  const root = document.documentElement;
  let saved; try { saved = localStorage.getItem('theme'); } catch {}
  root.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.querySelector('#theme').addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch {}
  });
  const papers = [...document.querySelectorAll('.pub-item')];
  let year = '2026', kind = 'all';
  function update() {
    let count = 0;
    papers.forEach(p => { p.hidden = !((year === 'all' || p.dataset.year === year) && (kind === 'all' || p.dataset.kind === kind)); if (!p.hidden) count++; });
    document.querySelectorAll('.publication-category').forEach(group => { group.hidden = ![...group.querySelectorAll('.pub-item')].some(p => !p.hidden); });
    document.querySelectorAll('.publication-year').forEach(group => { group.hidden = ![...group.querySelectorAll('.pub-item')].some(p => !p.hidden); });
    document.querySelectorAll('[data-year-filter]').forEach(b => { const selected = b.dataset.yearFilter === year; b.classList.toggle('selected', selected); b.setAttribute('aria-pressed', String(selected)); });
    document.querySelectorAll('[data-kind-filter]').forEach(b => { const selected = b.dataset.kindFilter === kind; b.classList.toggle('selected', selected); b.setAttribute('aria-pressed', String(selected)); });
    const label = kind === 'all' ? 'conference & journal papers' : kind === 'conference' ? 'conference papers' : 'journal papers';
    document.querySelector('#results').textContent = `${year === 'all' ? 'All years' : year} · ${label} · ${count} publications`;
    document.querySelector('#empty').hidden = count !== 0;
  }
  document.querySelectorAll('[data-year-filter]').forEach(b => b.addEventListener('click', () => { year = b.dataset.yearFilter; update(); }));
  document.querySelectorAll('[data-kind-filter]').forEach(b => b.addEventListener('click', () => { kind = b.dataset.kindFilter; update(); }));
  document.querySelectorAll('.feature').forEach(a => a.addEventListener('click', () => {
    const paper = document.querySelector(a.hash); if (paper) { year = paper.dataset.year; kind = 'all'; update(); }
  }));
  function revealHash() {
    const paper = papers.find(p => '#' + p.id === location.hash);
    if (paper) { year = paper.dataset.year; kind = 'all'; update(); requestAnimationFrame(() => paper.scrollIntoView()); }
  }
  update(); revealHash(); window.addEventListener('hashchange', revealHash);
  const dialog = document.querySelector('#lightbox');
  document.querySelectorAll('.photo,.framework-button').forEach(button => button.addEventListener('click', () => {
    const image = button.querySelector('img');
    dialog.querySelector('img').src = image.src; dialog.querySelector('img').alt = image.alt;
    dialog.querySelector('p').textContent = button.classList.contains('framework-button') ? 'Glimpse · Geometry Learning of Multi-scale Structural Priors' : image.alt;
    dialog.showModal();
  }));
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
  const navLinks = [...document.querySelectorAll('.nav-links a')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.hash === '#' + entry.target.id)); }), {rootMargin: '-10% 0px -65% 0px'});
    document.querySelectorAll('main>section[id]').forEach(section => observer.observe(section));
  }
  const palette = document.querySelector('#command-palette'), search = document.querySelector('#command-search');
  const options = [...document.querySelectorAll('#command-options a')];
  const open = () => { search.value = ''; options.forEach(a => a.hidden = false); document.querySelector('#command-empty').hidden = true; if (!palette.open) palette.showModal(); search.focus(); };
  document.querySelector('#open-palette').addEventListener('click', open);
  document.querySelector('#close-palette').addEventListener('click', () => palette.close());
  document.addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.open ? palette.close() : open(); } });
  search.addEventListener('input', () => { options.forEach(a => a.hidden = !a.textContent.toLowerCase().includes(search.value.toLowerCase())); document.querySelector('#command-empty').hidden = options.some(a => !a.hidden); });
  search.addEventListener('keydown', e => { if (e.key === 'Enter') { const first = options.find(a => !a.hidden); if (first) first.click(); } });
  options.forEach(a => a.addEventListener('click', () => palette.close()));
  const config = window.SITE_CONFIG || {}, visitors = document.querySelector('#visitors');
  const toggleVisitors = document.querySelector('#toggle-visitors');
  toggleVisitors.addEventListener('click', () => {
    const collapsed = visitors.classList.toggle('is-collapsed');
    document.querySelector('#visitor-body').hidden = collapsed;
    toggleVisitors.textContent = collapsed ? '+' : '−';
    toggleVisitors.setAttribute('aria-expanded', String(!collapsed));
    toggleVisitors.setAttribute('aria-label', collapsed ? 'Expand visitor map' : 'Collapse visitor map');
    if (!collapsed) window.dispatchEvent(new Event('resize'));
  });
  const widget = document.querySelector('#visitor-widget');
  const status = document.querySelector('#visitor-status');
  const ready = new MutationObserver(() => {
    const inner = widget.querySelector('.mmvst_inner');
    if ((inner && getComputedStyle(inner).display !== 'none') || widget.querySelector('#mapmyvisitors-widget')) { status.hidden = true; ready.disconnect(); }
  });
  ready.observe(widget, {childList:true, subtree:true, attributes:true, attributeFilter:['style']});
  // Link to the provider's real public country/city statistics, discovered from this widget.
  const details = document.querySelector('#visitor-details');
  const statsObserver = new MutationObserver(() => {
    const nativeLink = widget.querySelector('a[href]');
    if (!nativeLink) return;
    try {
      const url = new URL(nativeLink.href);
      if (url.hostname === 'mapmyvisitors.com' && url.pathname.startsWith('/web/')) {
        url.protocol = 'https:';
        details.href = url.href; details.hidden = false;
        nativeLink.target = '_blank'; nativeLink.rel = 'noopener noreferrer';
        if (nativeLink.href !== url.href) nativeLink.href = url.href;
        statsObserver.disconnect();
      }
    } catch {}
  });
  statsObserver.observe(widget, {childList:true, subtree:true, attributes:true, attributeFilter:['href']});

  if (config.visitorWidgetScript) {
    try {
      const url = new URL(config.visitorWidgetScript);
      if (url.protocol === 'https:' && url.hostname === 'mapmyvisitors.com' && ['/map.js', '/globe.js'].includes(url.pathname) && url.searchParams.get('d')) {
        const script = document.createElement('script'); script.id = url.pathname === '/globe.js' ? 'mmvst_globe' : 'mapmyvisitors'; script.src = url.href; script.async = true;
        visitors.hidden = false;
        script.addEventListener('error', () => { document.querySelector('#visitor-status').textContent = 'Visitor map is temporarily unavailable.'; });
        document.querySelector('#visitor-widget').appendChild(script);
      }
    } catch {}
  } else if (config.visitorMapImage && config.visitorMapLink) {
    try {
      const image = new URL(config.visitorMapImage), link = new URL(config.visitorMapLink);
      if (image.protocol === 'https:' && link.protocol === 'https:') {
        const map = document.querySelector('#visitor-map'); map.addEventListener('load', () => { visitors.hidden = false; });
        map.src = image.href; document.querySelector('#visitor-link').href = link.href;
      }
    } catch {}
  }
})();
