/* =========================================================
   hilmiherumi.vercel.app — rendering + motion
   GSAP + ScrollTrigger + Lenis. Content works without them.
   ========================================================= */
(() => {
  const S = window.SITE || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = matchMedia("(hover: none), (pointer: coarse)").matches;
  const animate = hasGSAP && !reduceMotion;

  const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtViews = n => {
    if (!n) return "";
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M views";
    if (n >= 1e3) return Math.round(n / 1e3) + "K views";
    return n + " views";
  };
  const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L7.5 3.64A1 1 0 0 0 6 4.5z"/></svg>';

  /* ---------- contact links ---------- */
  const waHref = S.whatsapp
    ? `https://wa.me/${S.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(S.whatsappText || "")}`
    : null;
  const mailHref = S.email ? `mailto:${S.email}?subject=${encodeURIComponent("Video editing project")}` : null;

  $$(".js-wa").forEach(a => {
    if (waHref) { a.href = waHref; a.target = "_blank"; a.rel = "noopener"; }
    else if (mailHref) { a.href = mailHref; a.removeAttribute("target"); }
    else { a.href = "#contact"; a.removeAttribute("target"); a.setAttribute("data-scroll", ""); }
  });
  $$(".js-mail").forEach(a => {
    if (mailHref) a.href = mailHref; else a.style.display = "none";
  });

  const ICONS = {
    whatsapp: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12.05 2a9.9 9.9 0 0 0-8.5 15L2 22l5.1-1.5A9.9 9.9 0 1 0 12.05 2zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .9.9-2.9-.2-.3a8.2 8.2 0 1 1 6.8 3.63zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.8 2.8 0 0 0-.87 2.07c0 1.22.89 2.4 1.01 2.57.12.16 1.75 2.67 4.24 3.75 1.57.68 2.19.74 2.98.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M3 5.5h18v13H3zM3.5 6l8.5 7 8.5-7"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15.1V8.9l5.8 3.1-5.8 3.1z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zm6.5 0h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.8c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54v4.88h-4z"/></svg>',
  };
  const socials = [
    waHref && { k: "whatsapp", href: waHref, label: "WhatsApp" },
    mailHref && { k: "mail", href: mailHref, label: "Email" },
    S.instagram && { k: "instagram", href: `https://instagram.com/${S.instagram.replace(/^@/, "")}`, label: "Instagram" },
    S.youtube && { k: "youtube", href: S.youtube, label: "YouTube" },
    S.linkedin && { k: "linkedin", href: S.linkedin, label: "LinkedIn" },
  ].filter(Boolean);
  const heroSocial = $(".js-social");
  if (heroSocial) heroSocial.innerHTML = socials.map(s =>
    `<a href="${esc(s.href)}" target="_blank" rel="noopener" aria-label="${s.label}" title="${s.label}">${ICONS[s.k]}</a>`).join("");
  const footSocial = $(".js-social-footer");
  if (footSocial) footSocial.innerHTML = socials.map(s =>
    `<a href="${esc(s.href)}" target="_blank" rel="noopener">${s.label.toLowerCase()}</a>`).join("");
  if (S.email) { const m = $(".js-hero-mail"); if (m) m.textContent = S.email; }
  if (S.available === false) { const b = $(".js-available"); if (b) b.remove(); }
  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  /* ---------- hero visual ---------- */
  const stack = $(".js-hero-stack");
  const SH = window.SHORTS || [];
  const thumbOf = item => `assets/thumbs/${item.thumb || ((item.type === "ig" ? "ig_" : item.type === "drive" ? "drv_" : "yt_") + item.id)}.webp`;
  if (stack) {
    if (S.heroPhoto) {
      stack.innerHTML = `<img class="hero__photo" src="${esc(S.heroPhoto)}" alt="Hilmi Herumi" fetchpriority="high">`;
    } else {
      const pick = [SH[3], SH[0], SH[6]].filter(Boolean);
      stack.innerHTML = pick.map((s, i) =>
        `<div class="hero__card"><img src="${thumbOf(s)}" alt="" ${i === 1 ? 'fetchpriority="high"' : 'loading="eager"'}></div>`).join("");
      // Middle card cycles through every short
      const mid = $$(".hero__card img", stack)[1];
      if (mid && !reduceMotion && SH.length > 1) {
        let i = 0;
        SH.forEach(s => { const im = new Image(); im.src = thumbOf(s); });
        setInterval(() => {
          i = (i + 1) % SH.length;
          if (animate) {
            gsap.to(mid, { opacity: 0, duration: .25, onComplete: () => { mid.src = thumbOf(SH[i]); gsap.to(mid, { opacity: 1, duration: .35 }); } });
          } else mid.src = thumbOf(SH[i]);
        }, 2200);
      }
    }
  }

  /* ---------- works ---------- */
  const clientsEl = $(".js-clients");
  if (clientsEl) clientsEl.innerHTML = (window.CLIENTS || []).map(c => `
    <article class="client" data-cat="${c.category}">
      <div class="client__info">
        <div class="client__meta mono"><span class="tag">${esc(c.categoryLabel)}</span><span>${esc(c.year)}</span></div>
        <h3 class="client__name">${esc(c.client)} ${c.flag ? `<small>${c.flag}</small>` : ""}</h3>
        <p class="client__blurb">${esc(c.blurb)}</p>
      </div>
      <div class="client__works">
        ${c.works.map(w => `
          <button class="vcard" data-play="${w.type}" data-id="${esc(w.id)}" data-title="${esc(w.title)}">
            <div class="vcard__thumb">
              <img src="${thumbOf(w)}" alt="" loading="lazy" decoding="async" width="1280" height="720">
              ${w.duration ? `<span class="vcard__dur mono">${esc(w.duration)}</span>` : ""}
              <span class="vcard__play">${PLAY}</span>
            </div>
            <h4 class="vcard__title">${esc(w.title)}</h4>
            <div class="vcard__sub mono">${w.type === "drive" ? "full episode" : esc(fmtViews(w.views) || "youtube")}</div>
          </button>`).join("")}
      </div>
    </article>`).join("");

  /* ---------- shorts ---------- */
  const rail = $(".js-rail");
  if (rail) rail.innerHTML = SH.map(s => `
    <button class="scard" data-cat="${s.category}" data-play="${s.type}" data-id="${esc(s.id)}" data-path="${esc(s.path || "")}" data-title="${esc(s.title)}">
      <div class="scard__thumb">
        <img src="${thumbOf(s)}" alt="" loading="lazy" decoding="async" width="540" height="960">
        <span class="scard__platform mono">${s.type === "ig" ? "IG reel" : "yt shorts"}</span>
        ${s.views ? `<span class="scard__views mono">${fmtViews(s.views)}</span>` : ""}
        <span class="vcard__play">${PLAY}</span>
      </div>
      <h4 class="scard__title">${esc(s.title)}</h4>
      <div class="scard__client mono">${esc(s.client)}</div>
    </button>`).join("");

  /* ---------- reviews ---------- */
  const revEl = $(".js-reviews");
  if (revEl) revEl.innerHTML = (window.REVIEWS || []).map(r => `
    <figure class="review ${r.placeholder ? "is-placeholder" : ""}">
      <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
      <blockquote class="review__quote">${esc(r.quote)}</blockquote>
      <figcaption class="review__who">
        <span class="review__avatar">${esc((r.name || "?").trim()[0])}</span>
        <span><span class="review__name">${esc(r.name)}</span><br><span class="review__role mono">${esc(r.role)}</span></span>
      </figcaption>
    </figure>`).join("");

  /* ---------- smooth scroll (Lenis) ---------- */
  let lenis = null;
  if (animate && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  const scrollToTarget = target => {
    const el = target === "#top" ? null : $(target);
    if (target !== "#top" && !el) return;
    if (lenis) return lenis.scrollTo(el || 0, { offset: el ? -70 : 0 });
    if (el) el.scrollIntoView({ behavior: "smooth" }); else scrollTo({ top: 0, behavior: "smooth" });
  };
  document.addEventListener("click", e => {
    const a = e.target.closest("a[data-scroll]");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    e.preventDefault();
    scrollToTarget(href);
  });

  /* ---------- header + FAB ---------- */
  const header = $(".header");
  const fab = $(".fab");
  let lastY = 0;
  const onScroll = () => {
    const yy = window.scrollY;
    header.classList.toggle("is-scrolled", yy > 40);
    header.classList.toggle("is-hidden", yy > lastY && yy > 400);
    if (fab) fab.classList.toggle("is-visible", yy > window.innerHeight * .6);
    lastY = yy;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- filters ---------- */
  const setActive = (btns, btn) => btns.forEach(b => { const on = b === btn; b.classList.toggle("is-active", on); b.setAttribute("aria-selected", on); });
  const workBtns = $$("[data-filter]");
  workBtns.forEach(btn => btn.addEventListener("click", () => {
    setActive(workBtns, btn);
    const f = btn.dataset.filter;
    $$(".client").forEach(c => c.classList.toggle("is-hidden", f !== "all" && c.dataset.cat !== f));
    if (animate) {
      gsap.fromTo($$(".client:not(.is-hidden)"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, stagger: .08, duration: .6, ease: "power3.out", clearProps: "all" });
      ScrollTrigger.refresh();
    }
  }));
  const shortBtns = $$("[data-sfilter]");
  shortBtns.forEach(btn => btn.addEventListener("click", () => {
    setActive(shortBtns, btn);
    const f = btn.dataset.sfilter;
    $$(".scard").forEach(c => c.classList.toggle("is-hidden", f !== "all" && c.dataset.cat !== f));
    rail.scrollTo({ left: 0, behavior: "smooth" });
    if (animate) gsap.fromTo($$(".scard:not(.is-hidden)"), { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, stagger: .06, duration: .6, ease: "power3.out", clearProps: "all" });
  }));
  const step = dir => {
    const card = $(".scard:not(.is-hidden)", rail);
    const w = card ? card.getBoundingClientRect().width + 16 : 300;
    rail.scrollBy({ left: dir * w * 2, behavior: "smooth" });
  };
  $(".js-prev")?.addEventListener("click", () => step(-1));
  $(".js-next")?.addEventListener("click", () => step(1));
  // Drag to scroll the shorts rail with a mouse
  if (rail && !isTouch) {
    let down = false, sx = 0, sl = 0, moved = false;
    rail.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft; rail.style.scrollSnapType = "none"; });
    addEventListener("pointermove", e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 5) moved = true; rail.scrollLeft = sl - dx; });
    addEventListener("pointerup", () => { if (!down) return; down = false; rail.style.scrollSnapType = ""; });
    rail.addEventListener("click", e => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
  }

  /* ---------- modal player ---------- */
  const modal = $("#modal");
  const frame = $(".modal__frame", modal);
  let lastFocus = null;
  const openModal = (type, id, title, path) => {
    let src = "", ext = "";
    modal.classList.remove("is-vertical", "is-ig");
    if (type === "yt" || type === "yts") {
      src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`;
      ext = type === "yts" ? `https://youtube.com/shorts/${id}` : `https://youtu.be/${id}`;
      if (type === "yts") modal.classList.add("is-vertical");
    } else if (type === "ig") {
      src = `https://www.instagram.com/${path}/embed/`;
      ext = `https://www.instagram.com/${path}/`;
      modal.classList.add("is-ig");
    } else if (type === "drive") {
      src = `https://drive.google.com/file/d/${id}/preview`;
      ext = `https://drive.google.com/file/d/${id}/view`;
    }
    frame.innerHTML = `<iframe src="${src}" title="${esc(title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="eager"></iframe>`;
    $(".modal__title", modal).textContent = title;
    $(".modal__ext", modal).href = ext;
    lastFocus = document.activeElement;
    modal.hidden = false;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    if (animate) gsap.fromTo($(".modal__box", modal), { y: 40, autoAlpha: 0, scale: .97 }, { y: 0, autoAlpha: 1, scale: 1, duration: .5, ease: "power3.out" });
    $(".modal__close", modal).focus({ preventScroll: true });
  };
  const closeModal = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    frame.innerHTML = "";
    document.documentElement.style.overflow = "";
    lenis?.start();
    lastFocus?.focus({ preventScroll: true });
  };
  document.addEventListener("click", e => {
    const card = e.target.closest("[data-play]");
    if (card) { openModal(card.dataset.play, card.dataset.id, card.dataset.title, card.dataset.path); return; }
    if (e.target.closest("[data-close]")) closeModal();
  });
  addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  /* ---------- custom cursor ---------- */
  const cursor = $(".cursor");
  if (cursor && !isTouch && animate) {
    const xTo = gsap.quickTo(cursor, "x", { duration: .45, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: .45, ease: "power3" });
    addEventListener("pointermove", e => { xTo(e.clientX); yTo(e.clientY); cursor.style.opacity = 1; }, { passive: true });
    document.addEventListener("pointerover", e => {
      const play = e.target.closest("[data-play]");
      const link = !play && e.target.closest("a, button");
      cursor.classList.toggle("is-play", !!play);
      cursor.classList.toggle("is-link", !!link);
    });
    document.addEventListener("pointerleave", () => { cursor.style.opacity = 0; });
  }

  /* ---------- text splitting helpers ---------- */
  const splitChars = el => {
    const t = el.textContent;
    el.innerHTML = [...t].map(c => `<span class="char">${c === " " ? "&nbsp;" : esc(c)}</span>`).join("");
    return $$(".char", el);
  };
  const splitWords = el => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(w => `<span class="w">${esc(w)}</span>`).join(" ");
    return $$(".w", el);
  };
  $$(".split-line").forEach(l => { l.innerHTML = `<span>${l.innerHTML}</span>`; });

  /* ---------- loader + motion ---------- */
  const loader = $(".loader");
  const finishLoad = () => {
    document.body.classList.remove("is-loading");
    loader?.remove();
    lenis?.start();
  };

  if (!animate) { finishLoad(); return; }

  gsap.registerPlugin(ScrollTrigger);
  const heroChars = $$(".hero__line .split").flatMap(splitChars);
  gsap.set(heroChars, { yPercent: 110 });
  gsap.set(".hero__circle", { scale: 0 });
  const heroVis = $$(".hero__card, .hero__photo");
  gsap.set(heroVis, { y: 120, autoAlpha: 0 });
  gsap.set(".hero__bottom, .hero__side, .header", { autoAlpha: 0 });

  const intro = () => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to(heroChars, { yPercent: 0, duration: 1.3, stagger: .045 })
      .to(".hero__circle", { scale: 1, duration: 1.4 }, .15)
      .to(heroVis, { y: 0, autoAlpha: 1, duration: 1.2, stagger: .1 }, .35)
      .to(".header, .hero__bottom, .hero__side", { autoAlpha: 1, duration: 1 }, .7);
  };

  const seen = sessionStorage.getItem("hh_seen");
  if (loader && !seen) {
    sessionStorage.setItem("hh_seen", "1");
    const counter = { v: 0 };
    const num = $("#loaderCount");
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    gsap.timeline()
      .to(counter, { v: 100, duration: 1.4, ease: "power2.inOut", onUpdate: () => { num.textContent = Math.round(counter.v); } })
      .to(".loader__bar span", { width: "100%", duration: 1.4, ease: "power2.inOut" }, 0)
      .add(() => fontsReady)
      .to(loader, { yPercent: -100, duration: .9, ease: "expo.inOut" })
      .add(() => { finishLoad(); intro(); }, "-=.45");
  } else {
    finishLoad();
    intro();
  }

  const mm = gsap.matchMedia();

  // Hero parallax on scroll
  mm.add("(min-width: 861px)", () => {
    gsap.to(".hero__title", { yPercent: -35, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero__circle", { scale: 1.35, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to(".hero__stack", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  });
  mm.add("(max-width: 860px)", () => {
    gsap.to(".hero__title", { yPercent: -20, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  });

  // About: words light up as you scroll
  const lead = $(".about__lead");
  if (lead) {
    const words = splitWords(lead);
    gsap.fromTo(words, { opacity: .14 }, { opacity: 1, stagger: .05, ease: "none",
      scrollTrigger: { trigger: lead, start: "top 80%", end: "bottom 45%", scrub: true } });
  }

  // Counters
  $$("[data-count]").forEach(el => {
    const end = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || "0", 10);
    const suf = el.dataset.suffix || "";
    const o = { v: 0 };
    el.textContent = (0).toFixed(dec) + suf;
    gsap.to(o, { v: end, duration: 1.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate: () => { el.textContent = o.v.toFixed(dec) + suf; } });
  });
  gsap.from(".services li", { y: 20, autoAlpha: 0, stagger: .07, duration: .7, ease: "power3.out", scrollTrigger: { trigger: ".services", start: "top 90%", once: true } });

  // Big titles: lines slide up
  $$(".big-title, .contact__title").forEach(t => {
    gsap.from($$(".split-line > span", t), { yPercent: 105, duration: 1.2, stagger: .1, ease: "expo.out",
      scrollTrigger: { trigger: t, start: "top 85%", once: true } });
  });

  // Cards reveal
  gsap.set(".client, .review", { autoAlpha: 0, y: 50 });
  ScrollTrigger.batch(".client, .review", {
    start: "top 90%", once: true,
    onEnter: b => gsap.to(b, { autoAlpha: 1, y: 0, duration: 1, stagger: .1, ease: "power3.out", overwrite: true }),
  });
  gsap.from(".scard", { x: 80, autoAlpha: 0, duration: 1, stagger: .06, ease: "power3.out",
    scrollTrigger: { trigger: ".shorts__rail", start: "top 85%", once: true } });

  // Contact title scales in
  gsap.fromTo(".contact__title", { scale: .82 }, { scale: 1, ease: "none",
    scrollTrigger: { trigger: ".contact", start: "top bottom", end: "top 30%", scrub: true } });

  addEventListener("load", () => ScrollTrigger.refresh());
})();
