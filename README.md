# Manajemen Tugas: README Project

## Overview
Proyek ini adalah aplikasi **Manajemen Tugas** berbasis web yang memanfaatkan teknologi **PHP (Laravel)**, **React (Inertia.js)**, dan **MySQL**. Aplikasi ini dirancang untuk memenuhi kriteria terkait pemrograman sisi klien, server-side, pengelolaan database, dan state management, serta mendukung hosting.

---

## Bagian 1: Client-side Programming

### 1.1 Manipulasi DOM dengan JavaScript
- **Fitur Utama:**
  - Form input tugas dengan elemen berikut:
    - **Input teks**: untuk judul tugas.
    - **Input tanggal**: untuk tenggat waktu tugas.
    - **Dropdown**: untuk status tugas.
    - **Text area**: untuk deskripsi tugas.
  - Data dari server ditampilkan ke tabel HTML menggunakan React dengan **Hooks** untuk pengelolaan state.
  - Manipulasi tabel dilakukan di **Tasks.tsx**, dengan data yang di-fetch dari backend menggunakan Inertia.js.

### 1.2 Event Handling
- **Fitur Event:**
  - **onChange**: Validasi real-time pada elemen input untuk memastikan data valid.
  - **onClick**: Validasi tombol kirim sebelum data diproses di server.
  - **onSubmit**: Data dari form dikirim ke server dengan metode **POST** dan **PUT** untuk operasi CRUD.
- Validasi memastikan:
  - Input teks memiliki nilai.
  - Format data seperti tanggal valid.

---

## Bagian 2: Server-side Programming

### 2.1 Pengelolaan Data dengan PHP
- **Fitur yang Diterapkan:**
  - **CRUD**:
    - Tambah tugas baru dengan **POST**.
    - Update tugas dengan **PUT**.
    - Hapus tugas dengan **DELETE**.
  - Validasi data di server:
    ```php
    $validated = $request->validate([
        'title' => 'required|max:255',
        'deadline' => 'required|date',
        'status' => 'required|in:not_started,in_progress,completed',
        'description' => 'nullable|string',
    ]);
    ```
### 2.2 Objek PHP Berbasis OOP
- Kelas `TaskController` digunakan untuk operasi:
  - `index()`: Menampilkan daftar tugas.
  - `store(Request $request)`: Menambah tugas baru.
  - `update(Request $request, Task $task)`: Mengupdate tugas.
  - `destroy(Task $task)`: Menghapus tugas.

---

## Bagian 3: Database Management

### 3.1 Pembuatan Tabel Databas
- Tabel `tasks` dengan struktur:
  - **Kolom**: id, title, description, status, deadline, user_id.
  - **Relasi**: Foreign key ke tabel `users`.

### 3.2 Konfigurasi Koneksi Database
- Pengaturan di file `.env`:
  ```plaintext
  DB_CONNECTION=mysql
  DB_HOST=
  DB_PORT=
  DB_DATABASE=
  DB_USERNAME=
  DB_PASSWORD=

### 3.3 Manipulasi Data pada Database
- Create (Tambah data):
  ```
  Auth::user()->tasks()->create($validatedData);
- Read (Ambil data):
  ```
  $tasks = Task::where('user_id', Auth::id())
             ->where('status', $statusFilter)
             ->get();
- Update (Perbarui data):
  ```
  $task->update($request->all());
- Delete (Hapus data):
  ```
  $task->delete();

---

## Bagian 4: State Management
### 4.1 State Management dengan Session
- **Laravel Session** digunakan untuk menyimpan data filter status tugas:
  - Pada saat filter diubah, data `statusFilter` disimpan ke session di server.
  - **Implementasi Client-side**:
    - Saat pengguna memuat halaman, session di server mengembalikan nilai filter terakhir, memastikan halaman tetap konsisten dengan preferensi pengguna.

  - **Keuntungan**:
    - Meningkatkan pengalaman pengguna dengan mempertahankan status filter selama sesi.
  ```
  session(['user_id' => Auth::id()]);

### 4.2 Pengelolaan State dengan Cookie dan Browser Storage
- **Browser Storage (Local Storage)** digunakan untuk menyimpan data tugas (tasks) pada browser.
  - Ketika data tugas ditampilkan di halaman, data tersebut disimpan dalam **localStorage** pada browser, yang memungkinkan pengguna untuk mengakses data tanpa harus memuat ulang halaman atau meminta data ke server.

- **Implementasi untuk Menyimpan Data Tugas ke LocalStorage**:
  Setelah mendapatkan data tugas dari server (misalnya dalam props), kita menyimpannya ke `localStorage`.

  ```javascript
  setTaskList(JSON.parse(storedTasks));
  const storedTasks = localStorage.getItem(`tasks-${userId}`);

---

### Bagian Bonus: Hosting Aplikasi Web

#### Langkah-langkah untuk meng-host aplikasi web:
1. **Persiapkan aplikasi**:
   - Pastikan aplikasi sudah berjalan dengan baik di lingkungan lokal, semua fitur sudah teruji dan berfungsi sesuai harapan.

2. **Daftar dan buat akun di Railway**:
   - Kunjungi situs Railway di [Railway.app](https://railway.app).
   - Daftar menggunakan email atau dengan menggunakan akun GitHub.

3. **Buat project baru di Railway**:
   - Setelah login, klik tombol **New Project** di dashboard Railway untuk membuat proyek baru.
   - Pilih metode **Deploy** yang sesuai (untuk aplikasi berbasis Node.js, Laravel, dsb.).

4. **Koneksikan ke repository GitHub**:
   - Pilih repository yang berisi aplikasi Anda dan koneksikan ke Railway.
   - Railway akan memulai proses deployment dari kode sumber di GitHub ke server Railway.

5. **Setting Environment Variables**:
   - Setelah proyek berhasil dibuat, tambahkan semua **Environment Variables** yang diperlukan oleh aplikasi Anda (misalnya, database credentials atau konfigurasi API).
   - Variabel ini bisa dimasukkan di tab **Environment** pada Dashboard Railway.

6. **Tunggu proses deployment**:
   - Railway akan mulai proses build dan deployment aplikasi secara otomatis.
   - Setelah selesai, Anda akan mendapatkan URL di mana aplikasi web Anda dapat diakses.

7. **Verifikasi aplikasi berjalan**:
   - Cek aplikasi Anda pada URL yang diberikan oleh Railway untuk memastikan aplikasi berhasil dideploy dan berjalan dengan benar.

#### Penyedia hosting web yang paling cocok untuk aplikasi web Anda:
- **Railway** adalah penyedia hosting yang sangat cocok untuk aplikasi web berbasis **Node.js**, **PHP**, **Laravel**, dan **Docker**, serta menawarkan **automated deployment** dari GitHub.
- Railway sangat mudah digunakan dan dapat mengintegrasikan berbagai aplikasi dan layanan ke dalam pipeline CI/CD. Ini membuat deployment aplikasi menjadi lebih cepat dan efisien tanpa banyak konfigurasi manual.
- Dengan harga yang terjangkau, Railway juga menawarkan penyimpanan dan database dalam satu paket, serta kemampuan untuk melakukan deploy dari **git repository** yang mempercepat pengembangan dan hosting.

#### Keamanan aplikasi yang di-host:
1. **Penggunaan HTTPS**: Railway secara otomatis menyediakan SSL/HTTPS untuk aplikasi Anda untuk mengamankan semua lalu lintas data yang masuk dan keluar dari server.
   
2. **Environment Variables yang Aman**: Semua informasi sensitif (misalnya, kunci API atau kredensial database) dapat disimpan dalam **Environment Variables** di Railway dan akan tetap aman.

3. **Pemantauan dan log**: Railway menyediakan fitur **logs** dan pemantauan otomatis untuk memeriksa performa aplikasi dan mendiagnosis masalah pada aplikasi yang berjalan.

4. **Pencadangan Data**: Railway menyediakan cadangan otomatis untuk database yang digunakan aplikasi Anda sehingga data aman saat terjadi kerusakan sistem atau kesalahan lainnya.

#### Konfigurasi server yang diterapkan untuk mendukung aplikasi web Anda:
1. **Railway Deployment Configurations**:
   - Railway mengkonfigurasi server secara otomatis berdasarkan jenis aplikasi yang Anda deploy (misalnya, **Node.js**, **PHP**, atau **Laravel**).
   - Anda tidak perlu menyesuaikan pengaturan server secara manual. Railway mengatur build process dan konfigurasi aplikasi sesuai dengan stack yang digunakan.

2. **Automatic Scaling**: Railway mendukung scaling otomatis, yang berarti aplikasi Anda akan diperbesar atau diperkecil sumber daya servernya secara dinamis, sesuai dengan jumlah trafik yang diterima.

3. **Integrasi Layanan Database**:
   - Railway dapat menghubungkan aplikasi ke layanan database seperti **PostgreSQL**, **MySQL**, dan **MongoDB**, yang disediakan dalam environment.
   - Anda dapat mengakses database ini langsung dari aplikasi dengan konfigurasi yang cukup sederhana.

4. **Continuous Deployment**: Railway menyediakan dukungan untuk pipeline CI/CD yang mengotomatisasi seluruh proses deployment. Setiap perubahan yang didorong ke **GitHub** akan otomatis memicu deployment ke server produksi.


