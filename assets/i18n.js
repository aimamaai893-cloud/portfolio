/* Laly Chang portfolio — bilingual (zh/en) switcher.
   Contract: each page defines window.PAGE_I18N = {key:{zh,en}} inline in <head>
   BEFORE this script loads. Elements carry data-i18n="key" (textContent) or
   data-i18n-html="key" (innerHTML). Pager title spans carry
   data-i18n-title="slug" (looked up in TITLES). Attribute swaps use
   data-i18n-attr="attrName:key". __title__ / __desc__ switch document title
   and meta description. The nav <select id="lang-switch"> drives setLang().
   Language persists in localStorage "laly-lang"; ?lang=en|zh overrides. */
(function () {
  var SHARED = {
    nav_about: { zh: "ABOUT", en: "ABOUT" },
    nav_work: { zh: "精選作品", en: "Selected Work" },
    nav_skills: { zh: "我的技能樹", en: "How I Work" },
    foot_h: { zh: "與我聯絡<span class=\"dot\">.</span>", en: "Get in touch<span class=\"dot\">.</span>" },
    foot_p: { zh: "歡迎透過以下方式與我聯絡。", en: "Feel free to reach out through any of these." },
    foot_medium: { zh: "Medium 文章", en: "Medium" },
    foot_copy: { zh: "© 2026 Laly Chang · Laly.Lab 品牌實驗室", en: "© 2026 Laly Chang · Laly.Lab" },
    back: { zh: "← 回到作品列表", en: "← Back to all works" },
    prev: { zh: "← 上一個作品", en: "← Previous project" },
    next: { zh: "下一個作品 →", en: "Next project →" },
    visit: { zh: "前往網站 ↗", en: "Visit site ↗" },
    note: { zh: "為保護客戶/作品原始設計檔案，本頁面展示的設計作品均經過降畫質處理。", en: "To protect client work and original design files, images on this page are shown at reduced quality." },
    copied: { zh: "已複製 ✓", en: "Copied ✓" },
    empty: { zh: "作品整理中，敬請期待。", en: "More works coming soon." }
  };
  var CATS = {
    "全部": { zh: "全部", en: "All" },
    "後台管理系統": { zh: "後台管理系統", en: "Back-office Systems" },
    "企業內部系統": { zh: "企業內部系統", en: "Internal Systems" },
    "網站與平台設計": { zh: "網站與平台設計", en: "Web & Platform Design" },
    "3D 設計": { zh: "3D 設計", en: "3D Design" },
    "Design System": { zh: "Design System", en: "Design System" }
  };
  var TITLES = {
    "saiyan-member": { zh: "Member Management 會員管理", en: "Member Management" },
    "saiyan-customer-service": { zh: "Customer Service 客服系統", en: "Customer Service" },
    "saiyan-settlement": { zh: "Settlement 結算", en: "Settlement" },
    "saiyan-design-system": { zh: "Saiyan Design System", en: "Saiyan Design System" },
    "mtbo-design-system": { zh: "MTBO Design System", en: "MTBO Design System" },
    "nami-design-system": { zh: "Nami Design System", en: "Nami Design System" },
    "twsc-onboarding": { zh: "TWSC 新人入職訓練計畫", en: "TWSC New-Hire Onboarding Program" },
    "tifun": { zh: "Tifun 企業活動報名系統", en: "Tifun Corporate Event Registration" },
    "transfer": { zh: "TRANSFER 數位化交易平台", en: "TRANSFER Digital Trading Platform" },
    "multidim": { zh: "多維度國家空間資訊服務平臺｜內政部國土測繪中心", en: "Multidimensional National Spatial Information Platform | National Land Surveying and Mapping Center" },
    "joinit": { zh: "Join It ! 線上票券與行銷平台", en: "Join It! Online Ticketing & Marketing Platform" },
    "keziliao": { zh: "安心呷魚｜高雄蚵仔寮海鮮選物網站", en: "Anxin Chi Yu (Keziliao) | Kaohsiung Keziliao Seafood Selection" },
    "kaching": { zh: "KaChing 卡鏘｜FB 直播留言自動成單", en: "KaChing | FB Livestream Comment-to-Order" },
    "heiwei-3d": { zh: "美容 3D 模擬立體圖｜Heiwei", en: "Beauty 3D Simulation Render | Heiwei" },
    "titansoft-3d": { zh: "企業 3D 客製化公仔｜Titansoft", en: "Custom 3D Corporate Mascot | Titansoft" },
    "lowpoly-3d": { zh: "低面數 3D 模型｜農業部鳳山熱帶園區試驗所", en: "Low-Poly 3D Models | Fengshan Tropical Horticultural Experiment Branch" },
    "cleaner-3d": { zh: "海灘涼鞋 3D 渲染｜The Cleaner", en: "Beach Sandal 3D Render | The Cleaner" }
  };

  function getLang() {
    try {
      var q = new URLSearchParams(window.location.search).get("lang");
      if (q === "en" || q === "zh") {
        try { localStorage.setItem("laly-lang", q); } catch (e) {}
        return q;
      }
      var s = localStorage.getItem("laly-lang");
      if (s === "en" || s === "zh") return s;
    } catch (e) {}
    return "zh";
  }

  function dict() {
    var d = {};
    var k;
    for (k in SHARED) d[k] = SHARED[k];
    var page = window.PAGE_I18N || {};
    for (k in page) d[k] = page[k];
    return d;
  }

  function applyLang(lang) {
    var d = dict();
    document.documentElement.lang = lang === "en" ? "en" : "zh-Hant";
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var e = d[els[i].getAttribute("data-i18n")];
      if (e) els[i].textContent = e[lang];
    }
    var htmls = document.querySelectorAll("[data-i18n-html]");
    for (var j = 0; j < htmls.length; j++) {
      var h = d[htmls[j].getAttribute("data-i18n-html")];
      if (h) htmls[j].innerHTML = h[lang];
    }
    var titles = document.querySelectorAll("[data-i18n-title]");
    for (var t = 0; t < titles.length; t++) {
      var tt = TITLES[titles[t].getAttribute("data-i18n-title")];
      if (tt) titles[t].textContent = tt[lang];
    }
    var attrs = document.querySelectorAll("[data-i18n-attr]");
    for (var a = 0; a < attrs.length; a++) {
      var spec = attrs[a].getAttribute("data-i18n-attr").split(":");
      var av = d[spec[1]];
      if (av) attrs[a].setAttribute(spec[0], av[lang]);
    }
    var hrefs = document.querySelectorAll("[data-i18n-href]");
    for (var r = 0; r < hrefs.length; r++) {
      var hv = d[hrefs[r].getAttribute("data-i18n-href")];
      if (hv) hrefs[r].setAttribute("href", hv[lang]);
    }
    if (d.__title__) document.title = d.__title__[lang];
    if (d.__desc__) {
      var m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute("content", d.__desc__[lang]);
    }
    var sel = document.getElementById("lang-switch");
    if (sel) sel.value = lang;
    if (typeof window.__i18nRedraw === "function") window.__i18nRedraw(lang);
    document.documentElement.classList.remove("i18n-pending");
  }

  function setLang(lang) {
    if (lang !== "en" && lang !== "zh") return;
    try { localStorage.setItem("laly-lang", lang); } catch (e) {}
    try {
      var u = new URL(window.location.href);
      u.searchParams.set("lang", lang);
      history.replaceState(null, "", u.toString());
    } catch (e) {}
    applyLang(lang);
  }

  window.I18N = {
    getLang: getLang, setLang: setLang, applyLang: applyLang,
    CATS: CATS, TITLES: TITLES, SHARED: SHARED
  };

  function init() {
    var sel = document.getElementById("lang-switch");
    if (sel) sel.addEventListener("change", function () { setLang(sel.value); });
    applyLang(getLang());
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
