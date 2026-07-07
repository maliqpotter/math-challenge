<div align="center">
  <h1>📐 Escape Room Math: Kota Pangkat 🏛️</h1>
  <p>Game edukasi interaktif matematika bertema <i>Escape Room</i> untuk mempelajari dan menguji pemahaman materi <b>Bilangan Berpangkat (Eksponen)</b>.</p>
</div>

---

## ✨ Fitur Utama

- **🎮 Mode Bermain Fleksibel**:
  - **Solo**: Petualangan mandiri menyelamatkan Kota Pangkat.
  - **Group (Maks 5 Siswa)**: Kolaborasi tim dengan giliran acak dan perputaran otomatis setiap 30 detik untuk menjawab soal secara adil.
- **📚 Bank Soal Luas**: 50 variasi soal matematika berpangkat tingkat SMP, di mana setiap sesi permainan akan mengacak 10 soal unik.
- **🏆 Papan Skor Terpisah**: Papan peringkat global yang dipisah antara kategori **Solo** dan **Group**, diurutkan berdasarkan skor tertinggi dan waktu tercepat.
- **🔄 Reset Harian**: Skor papan peringkat akan otomatis dikosongkan setiap pergantian hari untuk memberi kesempatan baru bagi siswa setiap harinya.
- **🛡️ Otorisasi Reset**: Fitur pembersihan papan skor manual langsung dari halaman Leaderboard yang dilindungi kata sandi (`R3setSc0r3`).
- **🐳 Docker Ready & Vercel Friendly**: Dilengkapi dengan Dockerfile multi-stage dan konfigurasi routing Vercel yang siap pakai.

---

## 🚀 Cara Menjalankan Secara Lokal

### **Prasyarat:**
* Node.js v18 atau v20+

### **Langkah-langkah:**

1. **Instal Dependensi:**
   ```bash
   npm install
   ```

2. **Pengaturan API Key:**
   Salin file `.env.local.example` (jika ada) ke `.env.local` dan isi kunci API Gemini Anda:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Jalankan Mode Pengembangan (Development):**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000).

4. **Kompilasi & Jalankan Mode Produksi (Production):**
   ```bash
   npm run build
   npm run start
   ```

---

## 🐳 Docker Deployment

Jika Anda ingin menjalankan aplikasi di dalam container Docker:

1. **Build Docker Image:**
   ```bash
   docker build -t escape-room-math .
   ```

2. **Jalankan Docker Container:**
   ```bash
   docker run -p 3000:3000 escape-room-math
   ```

---

## 🛡️ Informasi Administratif
* **Password Reset Papan Skor**: `R3setSc0r3`
* **Daftar Soal**: Seluruh daftar 50 soal lengkap beserta kunci jawaban dan petunjuk telah diekspor ke file daftar-soal.txt
