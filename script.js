(() => {
  'use strict';
  const profile = window.ACADEMIC_PROFILE;
  const translations = {
    en: {
      skip: 'Skip to content', navAbout: 'About', navResearch: 'Research', navPublications: 'Publications', navContact: 'Contact',
      field: '3D Vision', email: 'Email', profileNote: 'Exploring the world in three dimensions.', eyebrow: 'PERSONAL / ACADEMIC',
      introOne: 'Hello! I’m Shiqiang Gong, based at <strong>Northwestern Polytechnical University (NWPU)</strong>. My research interests lie in <strong>3D computer vision</strong>.',
      introTwo: 'I’m interested in how visual information helps us understand the three-dimensional world — its geometry, structure, and spatial relationships.',
      explore: 'Explore my research interests', based: 'AT NWPU', focus: 'FOCUSED ON 3D VISION', researchHeading: 'Research interests',
      researchLabel: 'THE THIRD DIMENSION', researchTitle: 'Seeing beyond<br> the image.',
      researchCopy: '3D vision connects images with the geometry of the world. My interests center on the representation and understanding of three-dimensional scenes.',
      tagOne: '3D Vision', tagTwo: 'Geometry', tagThree: 'Spatial understanding', publicationsHeading: 'Publications', papersAside: 'PAPERS & PREPRINTS',
      emptyTitle: 'More to come.', emptyCopy: 'Publications and preprints will be listed here.', noResults: 'No publications match your search.',
      searchLabel: 'Search publications', searchPlaceholder: 'Search by title, author, or venue…', yearLabel: 'Publication year', allYears: 'All years',
      contactHeading: 'Get in touch', contactCopy: 'For research discussions and academic enquiries, feel free to reach out.', copy: 'Copy',
      footer: 'A little corner of the academic web.', backTop: 'Back to top', copied: 'Email address copied.', copyFailed: 'Copy unavailable. Please select and copy the email address.',
      citation: 'BibTeX citation', copyCitation: 'Copy BibTeX', citationCopied: 'BibTeX copied.', citationFailed: 'Please select and copy the citation.',
      abstract: 'Abstract', paper: 'Paper', code: 'Code', bibtex: 'BibTeX', close: 'Close citation', copyEmail: 'Copy email address',
    },
    zh: {
      skip: '跳转到正文', navAbout: '关于', navResearch: '研究', navPublications: '论文', navContact: '联系',
      field: '三维视觉', email: '邮箱', profileNote: '从三维视角，探索世界。', eyebrow: '个人 / 学术主页',
      introOne: '你好，我是 Shiqiang Gong，来自<strong>西北工业大学（NWPU）</strong>。我的研究兴趣是<strong>三维计算机视觉（3D Vision）</strong>。',
      introTwo: '我关注如何利用视觉信息理解三维世界，包括物体与场景的几何、结构，以及空间关系。',
      explore: '了解我的研究兴趣', based: '西北工业大学', focus: '专注于三维视觉', researchHeading: '研究兴趣',
      researchLabel: '探索第三维度', researchTitle: '从二维图像，<br>理解三维世界。',
      researchCopy: '三维视觉连接图像与真实世界的几何结构。我关注三维场景的表征与理解，探索视觉信息背后的空间关系。',
      tagOne: '三维视觉', tagTwo: '几何结构', tagThree: '空间理解', publicationsHeading: '学术论文', papersAside: '论文与预印本',
      emptyTitle: '敬请期待。', emptyCopy: '论文与预印本将在这里更新。', noResults: '没有找到符合条件的论文。',
      searchLabel: '搜索论文', searchPlaceholder: '搜索标题、作者或发表期刊 / 会议…', yearLabel: '发表年份', allYears: '全部年份',
      contactHeading: '与我联系', contactCopy: '欢迎通过邮件交流研究想法与学术问题。', copy: '复制',
      footer: '学术网络中的一隅。', backTop: '返回顶部', copied: '邮箱地址已复制。', copyFailed: '暂时无法复制，请选中邮箱地址手动复制。',
      citation: 'BibTeX 引用', copyCitation: '复制 BibTeX', citationCopied: 'BibTeX 已复制。', citationFailed: '请选中引用内容手动复制。',
      abstract: '摘要', paper: '论文', code: '代码', bibtex: '引用', close: '关闭引用窗口', copyEmail: '复制邮箱地址',
    },
  };
  let language = 'en';
  let toastTimeout;
  const $ = selector => document.querySelector(selector);
  const t = key => translations[language][key];
  const publications = [...profile.publications].sort((a, b) => Number(b.year) - Number(a.year));
  const safeURL = value => {
    try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; }
    catch { return null; }
  };

  function showToast(message) {
    $('#toast').textContent = message;
    $('#toast').classList.add('visible');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => $('#toast').classList.remove('visible'), 3500);
  }

  async function copyText(value, success, failure) {
    try { await navigator.clipboard.writeText(value); showToast(t(success)); }
    catch { showToast(t(failure)); }
  }

  function renderProfile() {
    document.querySelectorAll('[data-profile]').forEach(node => {
      const value = profile[node.dataset.profile];
      node.textContent = typeof value === 'object' ? value[language] : value;
    });
    document.querySelectorAll('[data-link="email"]').forEach(link => link.href = `mailto:${profile.email}`);
    document.querySelectorAll('[data-link="github"]').forEach(link => {
      const url = safeURL(profile.github);
      if (url) link.href = url;
      else link.hidden = true;
    });
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderPublications() {
    const query = $('#publication-search').value.trim().toLowerCase();
    const year = $('#publication-year').value;
    const filtered = publications.filter(publication =>
      (year === 'all' || String(publication.year) === year) &&
      [publication.title, publication.authors, publication.venue].some(value => String(value || '').toLowerCase().includes(query))
    );
    const list = $('#publication-list');
    list.replaceChildren();
    $('#publication-toolbar').hidden = !publications.length;
    $('#publication-empty').hidden = Boolean(publications.length);
    $('#no-results').hidden = !publications.length || Boolean(filtered.length);
    filtered.forEach(publication => {
      const article = element('article', 'publication');
      article.append(element('span', 'publication-year', publication.year));
      const body = element('div');
      body.append(element('h3', '', publication.title), element('p', 'publication-authors', publication.authors));
      body.append(element('p', 'publication-venue', [publication.venue, publication.type].filter(Boolean).join(' · ')));
      const actions = element('div', 'publication-actions');
      ['paper', 'code'].forEach(key => {
        const url = safeURL(publication[key]);
        if (!url) return;
        const link = element('a', '', `${t(key)} ↗`);
        link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
        actions.append(link);
      });
      if (publication.bibtex) {
        const button = element('button', '', t('bibtex'));
        button.type = 'button';
        button.addEventListener('click', () => {
          $('#citation-text').textContent = publication.bibtex;
          $('#citation-dialog').showModal();
        });
        actions.append(button);
      }
      if (actions.childElementCount) body.append(actions);
      if (publication.abstract) {
        const details = element('details');
        details.append(element('summary', '', t('abstract')), element('p', '', publication.abstract));
        body.append(details);
      }
      article.append(body); list.append(article);
    });
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(node => node.innerHTML = t(node.dataset.i18n));
    $('#language-toggle').innerHTML = language === 'en' ? '中<span aria-hidden="true"> / </span><span class="language-current">EN</span>' : '<span class="language-current">中</span><span aria-hidden="true"> / </span>EN';
    $('#language-toggle').setAttribute('aria-label', language === 'en' ? '切换到中文' : 'Switch to English');
    $('#copy-email').setAttribute('aria-label', t('copyEmail'));
    $('#close-citation').setAttribute('aria-label', t('close'));
    $('#publication-search').placeholder = t('searchPlaceholder');
    $('#publication-year').options[0].textContent = t('allYears');
    renderProfile(); renderPublications();
    try { localStorage.setItem('academic-language', language); } catch { /* Storage is optional. */ }
  }

  [...new Set(publications.map(publication => String(publication.year)))].forEach(year => {
    const option = element('option', '', year); option.value = year; $('#publication-year').append(option);
  });
  $('#current-year').textContent = new Date().getFullYear();
  $('#language-toggle').addEventListener('click', () => setLanguage(language === 'en' ? 'zh' : 'en'));
  $('#copy-email').addEventListener('click', () => copyText(profile.email, 'copied', 'copyFailed'));
  $('#copy-citation').addEventListener('click', () => copyText($('#citation-text').textContent, 'citationCopied', 'citationFailed'));
  $('#close-citation').addEventListener('click', () => $('#citation-dialog').close());
  $('#citation-dialog').addEventListener('click', event => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close();
  });
  $('#publication-search').addEventListener('input', renderPublications);
  $('#publication-year').addEventListener('change', renderPublications);
  if (profile.portrait) {
    const image = element('img'); image.src = profile.portrait; image.alt = profile.name;
    image.addEventListener('load', () => {
      $('.portrait').replaceChildren(image);
      $('.portrait').removeAttribute('role'); $('.portrait').removeAttribute('aria-label');
    });
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        document.querySelectorAll('.main-nav a').forEach(link => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('.section-anchor').forEach(section => observer.observe(section));
  }
  let initialLanguage = 'en';
  try { if (localStorage.getItem('academic-language') === 'zh') initialLanguage = 'zh'; } catch { /* Use English. */ }
  setLanguage(initialLanguage);
})();
