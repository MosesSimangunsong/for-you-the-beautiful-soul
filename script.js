// --- Script untuk Animasi Partikel Bintang ---
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 200; // Jumlah bintang
const starSpeed = 0.3; // Kecepatan kedipan bintang
const starSizeRange = { min: 0.5, max: 2 }; // Rentang ukuran bintang

// Fungsi untuk mengatur ukuran canvas agar full-screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Objek Bintang
function Star(x, y, size, opacity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.opacity = opacity;
    this.opacityDirection = 1; // 1 untuk menambah opacity, -1 untuk mengurangi

    // Fungsi untuk menggambar bintang
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // Warna putih-keperakan
        ctx.fill();
    };

    // Fungsi untuk update posisi dan kedipan bintang
    this.update = function() {
        // Animasi kedipan (perubahan opacity)
        this.opacity += (starSpeed / 100) * this.opacityDirection;

        if (this.opacity > 1) {
            this.opacity = 1;
            this.opacityDirection = -1;
        } else if (this.opacity < 0.1) { // Batas minimal opacity sebelum mulai terang kembali
            this.opacity = 0.1;
            this.opacityDirection = 1;
            // Pindahkan bintang ke posisi acak baru agar terasa lebih dinamis
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * (starSizeRange.max - starSizeRange.min) + starSizeRange.min;
        }

        this.draw();
    };
}

// Inisialisasi bintang-bintang
function initStars() {
    stars = []; // Kosongkan array jika ada resize
    for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * (starSizeRange.max - starSizeRange.min) + starSizeRange.min;
        const opacity = Math.random(); // Opacity awal acak
        stars.push(new Star(x, y, size, opacity));
    }
}

// Loop animasi
function animateStars() {
    requestAnimationFrame(animateStars);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas setiap frame

    stars.forEach(star => {
        star.update();
    });
}

// Event listener untuk resize window
window.addEventListener('resize', () => {
    resizeCanvas();
    initStars(); // Inisialisasi ulang bintang saat ukuran window berubah
});

// --- Inisialisasi Awal ---
resizeCanvas(); // Set ukuran canvas saat pertama kali load
initStars();    // Buat bintang-bintang
animateStars(); // Mulai animasi

// --- Script untuk Tahun di Footer ---
document.getElementById('currentYear').textContent = new Date().getFullYear();

// --- Script untuk Navigasi Smooth Scroll (Opsional, bisa ditingkatkan) ---
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});