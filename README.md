# hilmiherumi.vercel.app

Portofolio video editor Hilmi Herumi. Web statis (HTML + CSS + JS), tanpa build step.
Animasi: GSAP + ScrollTrigger + Lenis (via CDN jsDelivr). Video nggak di-host di sini, semua di-embed dari YouTube / Instagram / Google Drive.

## Struktur

```
index.html              halaman utama (meta OG buat preview WhatsApp ada di <head>)
assets/js/data.js       ⬅ SEMUA KONTEN: kontak, daftar video, shorts, review client
assets/js/main.js       render + animasi
assets/css/style.css    styling
assets/thumbs/          thumbnail video (.webp)
assets/og-image.jpg     gambar preview link (1200×630)
vercel.json             cache header
```

## Yang perlu diisi

Buka `assets/js/data.js`:

1. `whatsapp`: nomor format internasional, angka saja, contoh `6281234567890`
2. `email`, `instagram` (opsional `youtube`, `linkedin`)
3. `heroPhoto`: taruh foto cut-out PNG (background transparan) di `assets/img/hilmi.png`, lalu isi `"assets/img/hilmi.png"`. Kalau kosong, hero menampilkan tumpukan Shorts.
4. `REVIEWS`: ganti quote placeholder dengan review asli dari client, terus set `placeholder: false`.

## Nambah video

- **YouTube**: tambah `{ type: "yt", id: "<ID video>", title: "...", duration: "12:34", views: 12345 }` ke `works` client terkait.
- **Shorts**: tambah ke `SHORTS` dengan `type: "yts"`.
- **Instagram reel**: `type: "ig"`, `path: "reel/<ID>"`.
- **Google Drive**: `type: "drive"` (file harus di-share "Anyone with the link").
- Thumbnail: simpan sebagai `assets/thumbs/yt_<ID>.webp` (1280×720) atau 540×960 buat vertikal.
  Thumbnail YouTube bisa diambil dari `https://i.ytimg.com/vi/<ID>/maxresdefault.jpg` (Shorts vertikal: `/oar2.jpg`).

## Preview lokal

```
python -m http.server 5500
```
lalu buka http://localhost:5500

## Deploy (GitHub → Vercel)

1. Bikin repo baru di GitHub, misalnya `hilmiherumi-portfolio`.
2. Push folder ini:
   ```
   git remote add origin https://github.com/<username>/hilmiherumi-portfolio.git
   git push -u origin main
   ```
3. Di vercel.com → **Add New… → Project** → import repo itu.
   Framework Preset: **Other**, Build Command: kosong, Output Directory: kosong (root).
4. Project name: **hilmiherumi** → otomatis dapat `hilmiherumi.vercel.app`.
   (Kalau nama itu sudah dipakai orang, ganti di Settings → Domains, lalu update URL di `<head>` index.html.)
5. Selesai. Setiap `git push` ke `main` → Vercel deploy ulang otomatis, link tetap sama.

## Cek preview link

Setelah live, tempel link di https://www.opengraph.xyz atau kirim ke chat WhatsApp sendiri buat lihat thumbnail-nya.
WhatsApp suka nyimpen cache preview; kalau gambar belum berubah, tambahkan `?v=2` di ujung link.
