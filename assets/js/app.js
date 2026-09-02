/* ==========================================================================
   Can I Use This? — application script
   Hash router, creative search, trend + music browsing, and the rule-based
   copyright screening engine. No dependencies, no network calls.
   ========================================================================== */

(function () {
  'use strict';

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (str) => String(str).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));

  /* ======================================================================
     ROUTER
     ====================================================================== */

  const PAGES = ['home', 'trending', 'music', 'checker'];

  function routeTo(name, { scroll = true } = {}) {
    const page = PAGES.includes(name) ? name : 'home';

    $$('.page').forEach((section) => {
      const isActive = section.dataset.page === page;
      section.hidden = !isActive;
      if (isActive) {
        // Re-trigger the page-entry animation on every visit.
        section.style.animation = 'none';
        void section.offsetHeight;
        section.style.animation = '';
      }
    });

    $$('[data-nav]').forEach((link) => {
      link.classList.toggle('is-current', link.dataset.nav === page);
    });

    document.title = {
      home:     'Can I Use This? — Find creative work you can actually use.',
      trending: 'Trending creative formats — Can I Use This?',
      music:    'Music by mood, style and rights — Can I Use This?',
      checker:  'Rights Checker — Can I Use This?'
    }[page];

    closeNav();
    if (scroll) window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function currentRoute() {
    return (location.hash || '#home').replace('#', '');
  }

  window.addEventListener('hashchange', () => routeTo(currentRoute()));

  /* ======================================================================
     HEADER / MOBILE NAV
     ====================================================================== */

  const header = $('#siteHeader');
  const nav = $('#siteNav');
  const navToggle = $('#navToggle');

  function closeNav() {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ======================================================================
     PAGE 1 — CREATIVE SEARCH
     ====================================================================== */

  const state = { query: '', quick: 'all', type: '', licence: '', platform: '', reuse: '' };

  const resultsEl = $('#results');
  const emptyEl = $('#emptyState');
  const metaEl = $('#resultsMeta');
  const titleEl = $('#resultsTitle');
  const advCountEl = $('#advCount');

  const QUICK_TITLES = {
    all: 'All creative references',
    image: 'Images',
    video: 'Video',
    music: 'Music',
    campaign: 'Campaigns',
    free: 'Free to reuse'
  };

  const haystack = (w) => [
    w.title, w.category, w.style, w.licence, w.licenceLabel, w.source, w.type, REUSE[w.reuse].label
  ].join(' ').toLowerCase();

  function matches(work) {
    if (state.query && !haystack(work).includes(state.query)) return false;

    if (state.quick === 'free' && work.reuse !== 'free') return false;
    if (state.quick !== 'all' && state.quick !== 'free' && work.type !== state.quick) return false;

    if (state.type && work.type !== state.type) return false;
    if (state.licence && work.licence !== state.licence) return false;
    if (state.platform && work.platform !== state.platform) return false;
    if (state.reuse && work.reuse !== state.reuse) return false;

    return true;
  }

  function cardMarkup(work, index) {
    const reuse = REUSE[work.reuse];
    return `
      <article class="card" style="animation-delay:${Math.min(index * 40, 320)}ms">
        <div class="card-visual" style="background:${SWATCHES[work.swatch]}">
          <span class="card-visual-label">${esc(work.type)}</span>
        </div>
        <div class="card-body">
          <p class="card-cat">${esc(work.category)}</p>
          <h3 class="card-title">${esc(work.title)}</h3>
          <p class="card-style">${esc(work.style)}</p>
          <p class="licence-text">${esc(work.licenceLabel)}</p>
          <div class="card-meta">
            <span class="badge ${reuse.badge}">${esc(reuse.label)}</span>
            <span class="card-source">${esc(work.source)}</span>
          </div>
        </div>
      </article>`;
  }

  function renderResults() {
    const hits = CREATIVE_WORKS.filter(matches);

    resultsEl.innerHTML = hits.map(cardMarkup).join('');
    emptyEl.hidden = hits.length > 0;

    titleEl.textContent = state.query
      ? `Results for “${state.query}”`
      : QUICK_TITLES[state.quick];

    metaEl.textContent = `${hits.length} of ${CREATIVE_WORKS.length} references`;

    const active = ['type', 'licence', 'platform', 'reuse'].filter((k) => state[k]).length;
    advCountEl.hidden = active === 0;
    advCountEl.textContent = `${active} active`;
  }

  $('#searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    state.query = $('#searchInput').value.trim().toLowerCase();
    renderResults();
  });

  $('#searchInput').addEventListener('input', (e) => {
    state.query = e.target.value.trim().toLowerCase();
    renderResults();
  });

  $$('[data-suggest]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $('#searchInput').value = btn.dataset.suggest;
      state.query = btn.dataset.suggest.toLowerCase();
      renderResults();
      $('#results').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  $$('[data-quick]').forEach((chip) => {
    chip.addEventListener('click', () => {
      state.quick = chip.dataset.quick;
      $$('[data-quick]').forEach((c) => {
        const on = c === chip;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-selected', String(on));
      });
      // Keep the advanced "Content Type" select in step with the quick chips.
      const typeChips = ['image', 'video', 'music', 'campaign'];
      state.type = typeChips.includes(state.quick) ? state.quick : '';
      $('#fType').value = state.type;
      renderResults();
    });
  });

  const bindSelect = (id, key, syncQuick) => {
    $(id).addEventListener('change', (e) => {
      state[key] = e.target.value;
      if (syncQuick) syncQuickChips();
      renderResults();
    });
  };

  function syncQuickChips() {
    const target = state.type || 'all';
    $$('[data-quick]').forEach((c) => {
      const on = c.dataset.quick === target;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-selected', String(on));
    });
    state.quick = target;
  }

  bindSelect('#fType', 'type', true);
  bindSelect('#fLicence', 'licence');
  bindSelect('#fPlatform', 'platform');
  bindSelect('#fReuse', 'reuse');

  function resetSearch() {
    Object.assign(state, { query: '', quick: 'all', type: '', licence: '', platform: '', reuse: '' });
    $('#searchInput').value = '';
    ['#fType', '#fLicence', '#fPlatform', '#fReuse'].forEach((id) => { $(id).value = ''; });
    syncQuickChips();
    renderResults();
  }

  $('#clearFilters').addEventListener('click', resetSearch);
  $('#emptyReset').addEventListener('click', resetSearch);

  /* ======================================================================
     PAGE 2 — TRENDING
     ====================================================================== */

  const trendGrid = $('#trendGrid');

  function renderTrends(category = 'all') {
    const rows = category === 'all' ? TRENDS : TRENDS.filter((t) => t.category === category);

    trendGrid.innerHTML = rows.map((t, i) => `
      <article class="trend-card" style="animation-delay:${i * 45}ms">
        <div class="trend-top">
          <span class="trend-rank">No. ${String(TRENDS.indexOf(t) + 1).padStart(2, '0')}</span>
          <span class="trend-cat">${esc(t.category)}</span>
        </div>
        <h3 class="trend-name">${esc(t.name)}</h3>
        <p class="trend-desc">${esc(t.desc)}</p>
        <div class="metrics">
          <div class="metric"><p class="metric-k">Search growth</p><p class="metric-v up">${esc(t.searchGrowth)}</p></div>
          <div class="metric"><p class="metric-k">Usage growth</p><p class="metric-v up">${esc(t.usageGrowth)}</p></div>
          <div class="metric"><p class="metric-k">Mentions</p><p class="metric-v">${esc(t.mentions)}</p></div>
          <div class="metric"><p class="metric-k">Saves</p><p class="metric-v">${esc(t.saves)}</p></div>
        </div>
        <p class="trend-note"><strong>Reuse:</strong> ${esc(t.note)}</p>
      </article>`).join('');
  }

  $$('[data-trend]').forEach((chip) => {
    chip.addEventListener('click', () => {
      $$('[data-trend]').forEach((c) => {
        const on = c === chip;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-selected', String(on));
      });
      renderTrends(chip.dataset.trend);
    });
  });

  /* ======================================================================
     PAGE 3 — MUSIC
     ====================================================================== */

  const trackList = $('#trackList');
  let playingId = null;
  let musicCategory = 'Trending';

  const ICON_PLAY  = '<svg viewBox="0 0 12 14" aria-hidden="true"><path d="M1 1l10 6-10 6z" fill="currentColor"/></svg>';
  const ICON_PAUSE = '<svg viewBox="0 0 12 14" aria-hidden="true"><rect x="1" y="1" width="3.5" height="12" fill="currentColor"/><rect x="7.5" y="1" width="3.5" height="12" fill="currentColor"/></svg>';

  const trackId = (t) => `${t.artist}::${t.name}`;

  function renderTracks() {
    const rows = TRACKS.filter((t) => t.cat.includes(musicCategory));

    trackList.innerHTML = rows.map((t, i) => {
      const id = trackId(t);
      const isPlaying = id === playingId;
      const reuse = REUSE[t.reuse];
      return `
        <li class="track ${isPlaying ? 'is-playing' : ''}" style="animation-delay:${i * 30}ms">
          <button class="play-btn" type="button" data-track="${esc(id)}"
                  aria-label="${isPlaying ? 'Pause' : 'Play'} ${esc(t.name)} by ${esc(t.artist)}">
            ${isPlaying ? ICON_PAUSE : ICON_PLAY}
          </button>
          <div class="track-main">
            <p class="track-name">${esc(t.name)}${isPlaying ? '<span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>' : ''}</p>
            <p class="track-artist">${esc(t.artist)}</p>
          </div>
          <span class="badge ${reuse.badge}" title="${esc(LICENCE_NOTES[t.licence] || '')}">${esc(t.licence)}</span>
          <span class="track-dur">${esc(t.dur)}</span>
        </li>`;
    }).join('');
  }

  trackList.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-track]');
    if (!btn) return;
    playingId = playingId === btn.dataset.track ? null : btn.dataset.track;
    renderTracks();
  });

  $$('[data-music]').forEach((chip) => {
    chip.addEventListener('click', () => {
      $$('[data-music]').forEach((c) => {
        const on = c === chip;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-selected', String(on));
      });
      musicCategory = chip.dataset.music;
      renderTracks();
    });
  });

  /* ======================================================================
     PAGE 4 — RIGHTS CHECKER
     ----------------------------------------------------------------------
     A deliberately simple, transparent scoring model. It is an educational
     screening aid: it flags where risk concentrates and what to do next. It
     is not a legal opinion and it never returns "cleared".
     ====================================================================== */

  const RISK = {
    // Risk contributed by the licence when it does NOT cover the described use.
    licence:  { cc0: 2, ccby: 14, licensed: 10, ccbync: 34, none: 62, unknown: 58 },
    // Baseline when the licence DOES cover the use — what is left is diligence risk.
    covered:  { cc0: 2, ccby: 12, licensed: 8, ccbync: 18 },
    purpose:  { commercial: 18, editorial: 5, education: -6, review: -9, personal: -24 },
    type:     { music: 11, video: 7, image: 3, design: 3, text: 1 }
  };

  /*
   * Does the stated permission actually authorise the stated use?
   * CC BY only covers you if you credit; CC BY-NC only if the use is not commercial.
   * Everything else falls through to the exception-based assessment below.
   */
  const isCovered = (f) => (
    f.licence === 'cc0' ||
    f.licence === 'licensed' ||
    (f.licence === 'ccby' && f.attribution) ||
    (f.licence === 'ccbync' && f.attribution && f.purpose !== 'commercial')
  );

  const amountRange = $('#cAmount');
  const amountOut = $('#cAmountOut');

  function paintRange() {
    amountOut.textContent = `${amountRange.value}%`;
    amountRange.style.setProperty('--pct', `${amountRange.value}%`);
  }
  amountRange.addEventListener('input', paintRange);
  paintRange();

  function readForm() {
    return {
      source: $('#cSource').value.trim(),
      jurisdiction: $('#cJurisdiction').value,
      type: $('#cType').value,
      licence: $('#cLicence').value,
      purpose: $('#cPurpose').value,
      amount: Number(amountRange.value),
      transformative: $('#cTransform').checked,
      attribution: $('#cAttribution').checked
    };
  }

  /* --- score ---------------------------------------------------------- */

  function scoreOf(f) {
    const covered = isCovered(f);

    // A covered use starts low: the remaining risk is verifying the licence is real.
    if (covered) {
      let s = 6 + RISK.covered[f.licence];
      if (f.purpose === 'commercial') s += 6;
      // A licence on the top layer does not clear rights stacked underneath it.
      if (f.type === 'music' || f.type === 'video') s += 6;
      return Math.max(3, Math.min(97, s));
    }

    // Otherwise the use has to survive an exception, so every factor counts.
    let s = 20;
    s += RISK.licence[f.licence];
    s += RISK.purpose[f.purpose];
    s += RISK.type[f.type];

    // More of the work taken = weaker exception.
    s += Math.round((f.amount / 100) * 22) - 5;

    // Non-commercial licences collapse the moment money is involved.
    if (f.licence === 'ccbync' && f.purpose === 'commercial') s += 26;
    // Ignoring the one condition a CC BY licence imposes is a breach of it.
    if (f.licence === 'ccby' && !f.attribution) s += 10;

    if (f.transformative) s -= 12;
    if (f.attribution) s -= 6; else s += 5;

    // Jurisdictional character of the exception regime.
    if (f.jurisdiction === 'india') s += ['commercial', 'personal'].includes(f.purpose) ? 9 : 3;
    if (f.jurisdiction === 'us' && f.transformative) s -= 5;
    if (f.jurisdiction === 'other') s += 8;
    if (f.jurisdiction === 'eu') s += 4;

    return Math.max(3, Math.min(97, s));
  }

  const bandOf = (score) => (score < 34 ? 'low' : score < 67 ? 'medium' : 'high');

  const BAND_COPY = {
    low: {
      signal: 'Lower risk',
      title: 'Likely usable — with the conditions below',
      sub: 'The permissions you described appear to cover this use. Confirm the licence at the source and keep the evidence.'
    },
    medium: {
      signal: 'Medium risk',
      title: 'Partly usable — changes needed first',
      sub: 'Some of what you described is defensible, but this use has gaps. Work through the required actions before publishing.'
    },
    high: {
      signal: 'High risk',
      title: 'Do not publish as described',
      sub: 'This use looks like it needs permission. Get a licence, reduce what you take, or replace the source.'
    }
  };

  /* --- what may be reusable ------------------------------------------- */

  function reusableItems(f) {
    const out = [];

    if (f.licence === 'cc0') {
      out.push('<strong>The whole work.</strong> A CC0 dedication waives copyright, so commercial use, editing and redistribution are all permitted.');
      out.push('Modified and derivative versions you create, with no share-alike obligation attached.');
    } else if (f.licence === 'ccby') {
      out.push('<strong>The whole work, including commercially</strong> — provided the attribution the creator specifies stays attached to every published copy.');
      out.push('Derivatives, crops and edits, as long as the credit and licence notice travel with them.');
      if (!f.attribution) {
        out.push('<strong>Nothing, as currently planned.</strong> You have said the creator will not be credited — credit is the single condition of this licence, so publishing without it is a breach, not a technicality.');
      }
    } else if (f.licence === 'licensed') {
      out.push('<strong>Everything your licence covers.</strong> Re-read it for limits on media, territory, term, print run and paid amplification.');
      out.push('Nothing outside that scope — an editorial-only licence does not extend to advertising.');
    } else if (f.licence === 'ccbync') {
      if (f.purpose === 'commercial') {
        out.push('<strong>None of the work for this purpose.</strong> A non-commercial condition excludes brand, advertising and revenue-generating use.');
        out.push('The underlying idea and visual approach only — not the file itself.');
      } else {
        out.push('<strong>The whole work for genuinely non-commercial use</strong>, with the required credit.');
        out.push('Note that "non-commercial" is interpreted narrowly — sponsored or monetised placement usually fails it.');
        if (!f.attribution) {
          out.push('The credit is not optional here either — without it you lose the licence and fall back to needing permission.');
        }
      }
    } else {
      out.push('<strong>The idea, style and approach.</strong> Copyright protects expression, not a look, a palette, a genre or a technique — you can recreate the aesthetic with original material.');

      if (f.amount <= 20 && ['review', 'editorial', 'education'].includes(f.purpose)) {
        out.push(`A short excerpt (you indicated ${f.amount}%) may fall within a quotation, criticism, review or reporting exception where it is genuinely necessary to your point.`);
      }
      if (f.transformative) {
        out.push('Your own added commentary, analysis or creative transformation is yours — but it does not license the underlying material it sits on.');
      }
      if (f.type === 'text') {
        out.push('Facts, data and events reported in the text — those are not protected, only the particular wording is.');
      }
      if (f.type === 'music') {
        out.push('The chord progression or rhythm as a musical idea — but not one second of the actual recording without clearance.');
      }
      if (f.licence === 'unknown') {
        out.push('Treat the whole work as fully protected until you have identified the licence — absence of a copyright notice does not mean it is free.');
      }
    }

    return out;
  }

  /* --- actions required ----------------------------------------------- */

  function actionItems(f) {
    const out = [];
    const covered = isCovered(f);

    if (f.licence === 'unknown') {
      out.push('Identify the rights holder and the actual licence at the source, and save a dated screenshot of the terms.');
    }
    if (f.licence === 'none') {
      out.push('Request written permission, or buy a licence that names the media, territory, duration and audience size you need.');
    }
    if (f.licence === 'ccby') {
      out.push(f.attribution
        ? 'Publish the required credit: creator name, work title, licence name, and a link to the licence deed.'
        : 'Turn the credit on. A CC BY licence is conditional — creator name, work title, licence name and a link to the licence deed must appear wherever you publish.');
    }
    if (f.licence === 'ccbync' && f.purpose === 'commercial') {
      out.push('Replace the source with a commercially licensed alternative, or ask the creator for a separate commercial licence.');
    }
    if (f.licence === 'licensed') {
      out.push('Store the licence certificate or permission email against this asset so the clearance is auditable later.');
    }
    if (f.licence === 'cc0') {
      out.push('Verify the CC0 dedication was applied by someone who actually held the rights — mislabelled uploads are common.');
    }

    if (!covered && f.amount >= 55) {
      out.push(`Reduce how much you take (currently ${f.amount}%). Using a large share of a work weakens every fair use or fair dealing argument.`);
    }
    if (!covered && !f.transformative) {
      out.push('Add genuine commentary, criticism or creative transformation, or accept that straight reproduction needs a licence.');
    }
    if (!f.attribution && f.licence !== 'cc0') {
      out.push('Credit the original creator visibly. Even where credit is not legally required, its absence counts against you in a dispute.');
    }

    if (f.type === 'music') {
      out.push('Clear both layers: the sound recording (master rights) and the underlying composition (publishing rights). One is not the other.');
    }
    if (f.type === 'video') {
      out.push('Check what is inside the frame — music, on-screen artwork, logos and recognisable people each carry separate rights.');
    }
    if (f.type === 'image' && !covered) {
      out.push('Confirm model and property releases exist if identifiable people, private property or artwork appear in the image.');
    }
    if (f.type === 'design') {
      out.push('Check any embedded typefaces — font licences are separate software licences and rarely cover logo or app embedding.');
    }

    if (f.jurisdiction === 'india' && !covered && f.purpose === 'commercial') {
      out.push('Note that India’s Section 52 is a closed list with no general commercial exception — plan on a licence rather than fair dealing.');
    }
    if (f.jurisdiction === 'eu' && !covered) {
      out.push('Check the national implementation in every EU market you publish in — InfoSoc exceptions are optional per country.');
    }
    if (f.jurisdiction === 'other' && !covered) {
      out.push('Clear rights for your widest market. Across territories, the strictest applicable regime effectively governs the campaign.');
    }
    if (f.purpose === 'commercial' && !covered) {
      out.push('Budget for the licence early — commercial use is the factor that most often removes an exception entirely.');
    }

    out.push('Record this screening with the source, date and any permission received, so the decision trail exists if it is challenged.');

    if (bandOf(scoreOf(f)) === 'high') {
      out.push('<strong>Have a qualified copyright lawyer review this before it goes live.</strong>');
    }

    return out;
  }

  /* --- render --------------------------------------------------------- */

  function verdictMarkup(f) {
    const score = scoreOf(f);
    const band = bandOf(score);
    const copy = BAND_COPY[band];
    const law = LEGAL_SOURCES[f.jurisdiction];
    const listClass = band === 'high' ? 'blocked' : 'todo';

    const sourceEcho = f.source
      ? esc(f.source.length > 110 ? `${f.source.slice(0, 110)}…` : f.source)
      : 'No source recorded';

    return `
      <div class="panel verdict">
        <div class="verdict-head ${band}">
          <span class="verdict-signal ${band}">${copy.signal} · ${score}/100</span>
          <h2 class="verdict-title">${copy.title}</h2>
          <p class="verdict-sub">${copy.sub}</p>
          <div class="score-bar"><div class="score-fill ${band}" style="width:0%"></div></div>
          <div class="score-scale"><span>lower risk</span><span>medium</span><span>high risk</span></div>
        </div>

        <div class="verdict-block">
          <p class="block-title">What may be reusable</p>
          <ul class="verdict-list">${reusableItems(f).map((i) => `<li>${i}</li>`).join('')}</ul>
        </div>

        <div class="verdict-block">
          <p class="block-title">Actions required before publishing</p>
          <ul class="verdict-list ${listClass}">${actionItems(f).map((i) => `<li>${i}</li>`).join('')}</ul>
        </div>

        <div class="verdict-block">
          <p class="block-title">Relevant copyright law — ${esc(law.label)}</p>
          <div class="law-card">
            <p class="law-name">${esc(law.law)}</p>
            <p class="law-section">${esc(law.section)}</p>
            <p class="law-desc">${esc(law.desc)}</p>
            <a class="law-link" href="${esc(law.url)}" target="_blank" rel="noopener noreferrer">
              Read the official source
              <svg viewBox="0 0 14 14" width="12" height="12" aria-hidden="true"><path d="M3 11 11 3M5 3h6v6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
          </div>
        </div>

        <p class="verdict-foot">
          Screened ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          · Source: ${sourceEcho}
          · Simplified rule-based educational screening — not legal advice, and not a clearance.
        </p>
      </div>`;
  }

  const checkerForm = $('#checkerForm');
  const resultWrap = $('#checkerResult');

  checkerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const f = readForm();
    if (!f.source) {
      $('#cSource').focus();
      $('#cSource').setAttribute('aria-invalid', 'true');
      return;
    }
    $('#cSource').removeAttribute('aria-invalid');

    resultWrap.innerHTML = verdictMarkup(f);

    // Animate the score bar after paint.
    const fill = $('.score-fill', resultWrap);
    requestAnimationFrame(() => { fill.style.width = `${scoreOf(f)}%`; });

    if (window.innerWidth < 960) {
      resultWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  checkerForm.addEventListener('reset', () => {
    window.setTimeout(() => {
      paintRange();
      resultWrap.innerHTML = `
        <div class="panel result-placeholder">
          <span class="placeholder-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64"><ellipse cx="32" cy="34" rx="27" ry="9" transform="rotate(-16 32 34)" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".5"/><text x="32" y="46" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="42" font-weight="700" fill="currentColor" opacity=".25">8</text></svg>
          </span>
          <h2 class="placeholder-title">Your screening appears here</h2>
          <p class="placeholder-sub">
            Fill in the source and context, then run the assessment. Nothing you type leaves your
            browser — the check runs locally on this page.
          </p>
        </div>`;
    }, 0);
  });

  /* ======================================================================
     BOOT
     ====================================================================== */

  renderResults();
  renderTrends('all');
  renderTracks();
  routeTo(currentRoute(), { scroll: false });
})();
