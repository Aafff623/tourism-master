(function () {
  const cfg = window.__PREVIEW_README__ || {
    readmeFile: 'README.md',
    pageLang: 'zh-CN',
    title: 'Tourism Master — README Preview',
    toolbarTitle: 'Tourism Master · README Preview',
    hint: 'Preview README.md locally — reload after edits, no commit needed',
    reloadLabel: 'Reload README',
    openLabel: 'Open README.md',
    loading: 'Loading README…',
    loadedPrefix: 'Loaded',
    fileProtocolError:
      'Open via local HTTP server (file:// cannot fetch README). From repo root: python -m http.server 8080',
    fetchError: 'Failed to load README.',
    footerNote:
      'Preview: preview-readme.html · Assets: docs/images/readme/ · Broken images on GitHub usually mean the file was not pushed.',
    activeLang: 'zh',
    zhPage: 'preview-readme.html',
    enPage: 'preview-readme-en.html',
  };

  document.documentElement.lang = cfg.pageLang;
  document.title = cfg.title;

  const contentEl = document.getElementById('content');
  const statusEl = document.getElementById('status');
  const reloadBtn = document.getElementById('reload-btn');
  const toolbarTitle = document.getElementById('toolbar-title');
  const toolbarHint = document.getElementById('toolbar-hint');
  const openLink = document.getElementById('open-readme-link');
  const footerNote = document.getElementById('footer-note');
  const langZh = document.getElementById('lang-zh');
  const langEn = document.getElementById('lang-en');

  if (toolbarTitle) toolbarTitle.textContent = cfg.toolbarTitle;
  if (toolbarHint) toolbarHint.innerHTML = cfg.hint;
  if (reloadBtn) reloadBtn.textContent = cfg.reloadLabel;
  if (openLink) {
    openLink.href = './' + cfg.readmeFile;
    openLink.textContent = cfg.openLabel;
  }
  if (footerNote) footerNote.textContent = cfg.footerNote;
  if (langZh) {
    langZh.href = cfg.zhPage;
    langZh.classList.toggle('active', cfg.activeLang === 'zh');
    langZh.setAttribute('aria-current', cfg.activeLang === 'zh' ? 'page' : 'false');
  }
  if (langEn) {
    langEn.href = cfg.enPage;
    langEn.classList.toggle('active', cfg.activeLang === 'en');
    langEn.setAttribute('aria-current', cfg.activeLang === 'en' ? 'page' : 'false');
  }

  marked.setOptions({ gfm: true, breaks: false });

  function setStatus(type, message) {
    statusEl.className = 'status ' + type;
    statusEl.textContent = message;
  }

  async function loadReadme() {
    if (location.protocol === 'file:') {
      setStatus('error', cfg.fileProtocolError);
      contentEl.innerHTML =
        '<p>Cannot load README under <code>file://</code>. Start a local HTTP server first.</p>';
      return;
    }

    setStatus('ok', cfg.loading);
    reloadBtn.disabled = true;

    try {
      const res = await fetch('./' + cfg.readmeFile + '?ts=' + Date.now(), { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const md = await res.text();
      contentEl.innerHTML = marked.parse(md);
      const locale = cfg.pageLang.startsWith('zh') ? 'zh-CN' : 'en-US';
      setStatus('ok', cfg.loadedPrefix + ' ' + cfg.readmeFile + ' · ' + new Date().toLocaleString(locale));
    } catch (err) {
      setStatus('error', cfg.fetchError + ' ' + err.message);
      contentEl.innerHTML =
        '<p>Could not read <code>' + cfg.readmeFile + '</code>. Serve from repo root via HTTP.</p>';
    } finally {
      reloadBtn.disabled = false;
    }
  }

  reloadBtn.addEventListener('click', loadReadme);
  loadReadme();
})();
