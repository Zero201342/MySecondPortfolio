// Star Animation Setup
const starCanvas = document.getElementById('starBackgroundCanvas');
const ctx = starCanvas.getContext('2d');

function resizeCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
}

// Tự động điều chỉnh kích thước canvas khi thay đổi kích thước cửa sổ
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let stars = [];
const starCount = 150; // Số lượng sao
const maxStarSize = 3; // Kích thước tối đa của sao
const maxStarSpeed = 0.2; // Tốc độ tối đa của sao
const fadeDuration = 0.005; // Tốc độ mờ dần
const maxLifetime = 300; // Tuổi thọ tối đa của sao

// Lớp Star để tạo từng ngôi sao
class Star {
    constructor(x, y, size, speed, opacity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = (Math.random() - 0.5) * speed;
        this.speedY = (Math.random() - 0.5) * speed;
        this.opacity = opacity;
        this.lifeTime = Math.random() * maxLifetime + 450;
        this.fadeDirection = 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.speedX * 0.5;
        this.y += this.speedY * 0.5;

        // Di chuyển sao qua lại khi chạm biên
        if (this.x < 0) this.x = starCanvas.width;
        if (this.x > starCanvas.width) this.x = 0;
        if (this.y < 0) this.y = starCanvas.height;
        if (this.y > starCanvas.height) this.y = 0;

        // Logic làm mờ dần
        if (this.fadeDirection === 1) {
            this.opacity += fadeDuration;
            if (this.opacity >= 1) this.fadeDirection = 0;
        } else if (this.fadeDirection === -1) {
            this.opacity -= fadeDuration;
        }

        // Quản lý tuổi thọ và mờ dần khi sắp hết
        this.lifeTime--;
        if (this.lifeTime < 30) {
            this.fadeDirection = -1;
        }

        // Loại bỏ ngôi sao khi hoàn toàn mờ
        if (this.opacity <= 0) {
            const index = stars.indexOf(this);
            stars.splice(index, 1);
        }

        this.draw();
    }
}

// Hàm tạo sao
function spawnStars() {
    if (stars.length < starCount) {
        const x = Math.random() * starCanvas.width;
        const y = Math.random() * starCanvas.height;
        const size = Math.random() * maxStarSize + 1;
        const speed = Math.random() * maxStarSpeed + 0.05;
        const opacity = 0;
        stars.push(new Star(x, y, size, speed, opacity));
    }
}

// Hàm chạy hiệu ứng sao
function animateStars() {
    ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    spawnStars();
    stars.forEach(star => star.update());
    requestAnimationFrame(animateStars);
}

// Khởi động hiệu ứng
animateStars();
