# Bakul - Direktori UMKM Purwokerto

"Bakul" (Basis Aktivitas UMKM Lokal) adalah sebuah platform direktori digital yang didedikasikan untuk memetakan dan mempromosikan Usaha Mikro, Kecil, dan Menengah (UMKM) yang ada di area Purwokerto.

Project ini dibuat menggunakan Next.js (Pages Router) dan menampilkan berbagai animasi canggih menggunakan GSAP.

## 🌐 Demo Langsung (Live Demo)

Anda dapat melihat versi _live_ dari project ini di:
**[https://pwt-umkm.vercel.app/](https://pwt-umkm.vercel.app/)**

---

## ✨ Fitur Utama

- **Direktori UMKM:** Daftar UMKM yang dapat difilter dan memiliki paginasi.
- **Halaman Detail Dinamis:** Setiap UMKM memiliki halaman detail _server-side_ (`getStaticProps` & `getStaticPaths`).
- **Cool Animation:** Dibuat dengan GSAP, termasuk:
- **Kursor Kustom:** Efek kursor "jelly" yang interaktif.
- **Desain Responsif:** Tampilan yang dioptimalkan untuk desktop dan perangkat seluler.

---

## 📸 Pratinjau (Preview)

Berikut adalah beberapa tampilan dari aplikasi "Bakul".

|                 Halaman Utama (Homepage)                  |                       Halaman Direktori                       |                     Halaman Detail                      |
| :-------------------------------------------------------: | :-----------------------------------------------------------: | :-----------------------------------------------------: |
| ![Tampilan Halaman Utama Bakul](screenshots/HomePage.png) | ![Tampilan Halaman Direktori UMKM](screenshots/Directory.png) | ![Tampilan Halaman Detail UMKM](screenshots/Detail.png) |

---

## 🥞 Tumpukan Teknologi (Tech Stack)

- **Framework:** [Next.js](https://nextjs.org/) (Pages Router)
- **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animasi:** [GSAP (GreenSock Animation Platform)](https://gsap.com/)
- **Hosting:** [Vercel](https://vercel.com/)

---

## 🚀 Cara Menjalankan Project Secara Lokal

Berikut adalah cara untuk meng-clone dan menjalankan project ini di komputer lokal Anda untuk pengembangan.

1.  **Clone repository ini:**

    ```bash
    git clone [https://github.com/username-anda/nama-repo-anda.git](https://github.com/username-anda/nama-repo-anda.git)
    ```

    _(Ganti URL di atas dengan URL repository GitHub Anda)_

2.  **Masuk ke direktori project:**

    ```bash
    cd nama-repo-anda
    ```

3.  **Install dependencies (dependensi):**
    (Gunakan `npm` atau `yarn` sesuai preferensi Anda)

    ```bash
    npm install
    ```

    atau

    ```bash
    yarn install
    ```

4.  **Jalankan server development:**

    ```bash
    npm run dev
    ```

    atau

    ```bash
    yarn dev
    ```

5.  Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.
