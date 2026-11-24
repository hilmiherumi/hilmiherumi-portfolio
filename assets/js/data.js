/* =========================================================
   EDIT THIS FILE to update the portfolio content.
   Everything on the page (works, shorts, reviews, contact)
   is rendered from the data below. No build step needed:
   save, commit, push -> Vercel redeploys automatically.
   ========================================================= */

window.SITE = {
  name: "Hilmi Herumi",
  role: "Video Editor",

  // --- CONTACT (fill these in) -----------------------------
  // WhatsApp number in international format, digits only. e.g. "6281234567890"
  whatsapp: "6282260895618",
  whatsappText: "Hi Hilmi, I saw your portfolio and I'd like to talk about a video project.",
  email: "herumi.hilmi92@gmail.com",
  instagram: "",      // e.g. "hilmiherumi" (handle only, no @)
  youtube: "",        // full URL, optional
  linkedin: "",       // full URL, optional

  // --- HERO PHOTO ------------------------------------------
  // Put a cut-out PNG of yourself (transparent background, ~1000px tall)
  // at assets/img/hilmi.png and set this to "assets/img/hilmi.png".
  // While it is empty, the hero shows a stack of your Shorts instead.
  heroPhoto: "assets/img/hilmi.webp",

  available: true,    // green "available for projects" badge
};

/* ---------------------------------------------------------
   LONG-FORM WORKS, grouped by client.
   type: "yt" = YouTube video, "drive" = Google Drive file
   (Drive files must be shared as "Anyone with the link").
   thumb: file in assets/thumbs/
   --------------------------------------------------------- */
window.CLIENTS = [
  {
    client: "Okemudin",
    year: "2026",
    category: "tech",
    categoryLabel: "Tech Review",
    blurb: "High-end PC builds, flagship GPUs and gaming tablets: fast pacing, punchy motion text and clean product shots.",
    works: [
      { type: "yt", id: "mN3Wap8DyFM", title: "Total Rp 400 Juta | Unboxing dan Rakit ROG Edition 20 Pertama di Indonesia!", duration: "14:07", views: 324646 },
      { type: "yt", id: "RCuJ97lX720", title: "Rata Kanankan Game Android di Muka Bumi | Legion Tab Gen 5", duration: "12:49", views: 305600 },
      { type: "yt", id: "2NLu9pEelFk", title: "Tembus Rp 232 Juta di Newegg (US) MSI GeForce RTX 5090 Lightning Z", duration: "12:01", views: 148662 },
    ],
  },
  {
    client: "Jagat Review",
    year: "2025",
    category: "tech",
    categoryLabel: "Tech Review",
    blurb: "In-depth laptop and smartphone reviews for one of Indonesia's biggest tech channels: long runtimes kept tight and easy to follow.",
    works: [
      { type: "yt", id: "cW_aqGmhZiU", title: "SADIS UPGRADENYA! Review Xiaomi 15T Pro", duration: "33:22", views: 713843 },
      { type: "yt", id: "8NIoSCcPHDc", title: "Kejutan! Laptop RTX 5050 Ternyata Sekencang ini: Review Acer Nitro V 15 (2025)", duration: "16:24", views: 123900 },
      { type: "yt", id: "bgZpWetJugI", title: "Laptop Workstation Kencang Buat Profesional: Review Lenovo ThinkPad P1 Gen 8", duration: "23:55", views: 98757 },
    ],
  },
  {
    client: "DKID Media",
    year: "2024",
    category: "tech",
    categoryLabel: "Tech Review",
    blurb: "Smartphone hands-ons and reviews with a casual, story-driven tone.",
    works: [
      { type: "yt", id: "csdpCHnVTP8", title: "Nyoba Klaim Garansi HP Vivo Light Saber | Ternyata...", duration: "8:28", views: 106161 },
      { type: "yt", id: "Fls6TQlHjY4", title: "NGGAK MAIN MAIN! Ketika Redmi Bikin Hape 1 Jutaan | Redmi 14C Review", duration: "9:57", views: 69874 },
      { type: "yt", id: "MRuRr5XS4AM", title: "Semua Upgrade Yang KITA TUNGGU | Hands On Samsung Galaxy S25 Ultra", duration: "12:37", views: 31430 },
    ],
  },
  {
    client: "Leotrails",
    flag: "🇨🇳",
    year: "2026",
    category: "travel",
    categoryLabel: "Travel Vlog",
    blurb: "English-language travel & food vlogs across China and Asia: location pins, dish cards, sound design and a warm, story-first cut.",
    works: [
      { type: "yt", id: "3CsqigA6HC4", title: "Fenghuang Ancient Town | A Reunion with Old Friends", duration: "30:03" },
      { type: "yt", id: "KA2deBdlrJU", title: "Shenzhen Travel Guide | 11 Things to Eat, See & Do!", duration: "10:31" },
      { type: "yt", id: "uCFERxj3RD8", title: "Song Wat Bangkok Guide 2026 | Best Food, Cafés & Hidden Gems", duration: "15:40" },
    ],
  },
  {
    client: "Sungwoo 성우",
    flag: "🇰🇷",
    year: "2026",
    category: "travel",
    categoryLabel: "Travel Vlog",
    blurb: "Korean travel vlogs through Russia, Belarus and Estonia: playful captions, camcorder-style graphics and comedic timing.",
    works: [
      { type: "drive", id: "1OpYuOmwXp_Dftfa7VoBUPeGVFEMDBpQo", thumb: "drv_1OpYuOmwXp_Dftfa7VoBUPeGVFEMDBpQo", title: "Russia, Episode 1" },
      { type: "drive", id: "1QW4Yba-XIZL4ejwaZ9OP_wRdgudJrsQD", thumb: "drv_1QW4Yba-XIZL4ejwaZ9OP_wRdgudJrsQD", title: "Estonia Trip, Episode 1" },
      { type: "drive", id: "1eAguy5L_uieIjvWy6W9l6bVIQLoa9UtB", thumb: "drv_1eAguy5L_uieIjvWy6W9l6bVIQLoa9UtB", title: "Belarus Trip" },
    ],
  },
];

/* ---------------------------------------------------------
   SHORTS & REELS (9:16)
   type: "yts" = YouTube Shorts, "ig" = Instagram reel/post
   For "ig", path is "reel/<id>" or "p/<id>".
   --------------------------------------------------------- */
window.SHORTS = [
  { type: "yts", id: "iAOytsh7A30", client: "Okemudin", category: "tech", title: "MSI Titan 18HX Draco Epic Limited Edition", views: 1681319 },
  { type: "yts", id: "NZm5K1Xe-S8", client: "Okemudin", category: "tech", title: "GTA 6 Rasa Bioskop", views: 436508 },
  { type: "yts", id: "T_e36Xl4Tps", client: "Okemudin", category: "tech", title: "Superchip RTX Spark ASUS ProArt P16", views: 365380 },
  { type: "ig", id: "DOYW06rCa9r", path: "reel/DOYW06rCa9r", client: "Garuda Indonesia × Haydar Pratama", category: "edu", title: "Ask Your Pilot" },
  { type: "ig", id: "DQQfcCBEakb", path: "reel/DQQfcCBEakb", client: "Haydar Pratama", category: "edu", title: "Pesawat Airbus Susah Jatuh?" },
  { type: "ig", id: "DZPK3TxxCJW", path: "p/DZPK3TxxCJW", client: "Haydar Pratama", category: "edu", title: "Bisa Jadi Kamu yang Bikin Pramugari Pensiun Dini!" },
  { type: "yts", id: "J5kb0Iz13VM", client: "Leotrails", category: "travel", title: "Fenghuang Ancient Town at Night Is Magical!" },
  { type: "yts", id: "ku_fmlUnllY", client: "Leotrails", category: "travel", title: "Coconut Chicken Hotpot in Shenzhen" },
  { type: "yts", id: "b9J46EnoDMs", client: "Leotrails", category: "travel", title: "Stay With Me — Japan" },
];

/* ---------------------------------------------------------
   CLIENT REVIEWS (5 stars)
   Replace the placeholder quotes with real words from your
   clients (WhatsApp chats, emails...). Set placeholder:false
   once a quote is real. Placeholder cards are shown dimmed.
   --------------------------------------------------------- */
window.REVIEWS = [
  { name: "Okemudin", role: "Tech YouTuber", quote: "Thank u luar biasa, banyak yang puji kualitasnya" },
  { name: "Haydar Pratama", role: "Pilot & Educator", quote: "Bagus dan rapih, Love" },
  { name: "Leotrails (Leo)", role: "Travel & Food Vlogger", quote: "I like it, help ya to do good job in editing" },
  { name: "Sungwoo 성우", role: "Korean Travel Vlogger", quote: "Great, Thank you" },
];
