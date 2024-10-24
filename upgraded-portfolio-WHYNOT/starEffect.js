// Star Animation Setup
const starCanvas = document.getElementById('animatedStarCanvas');
const ctx = starCanvas.getContext('2d');

function resizeCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
}

// Create and resize canvas to fit the viewport
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let stars = [];
const starCount = 200; // You can adjust for more or fewer stars
const maxStarSize = 3;
const maxStarSpeed = 0.2;
const fadeDuration = 0.005; // Slower fade for smoother effect
const maxLifetime = 300; // Increase lifetime to slow down spawning/despawning

class Star {
    constructor(x, y, size, speed, opacity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = (Math.random() - 0.5) * speed;
        this.speedY = (Math.random() - 0.5) * speed;
        this.opacity = opacity;
        this.lifeTime = Math.random() * maxLifetime + 450; // Increase range for longer life
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

        // Wrap stars around screen edges for smooth movement
        if (this.x < 0) this.x = starCanvas.width;
        if (this.x > starCanvas.width) this.x = 0;
        if (this.y < 0) this.y = starCanvas.height;
        if (this.y > starCanvas.height) this.y = 0;

        // Fade in and out logic
        if (this.fadeDirection === 1) {
            this.opacity += fadeDuration;
            if (this.opacity >= 1) this.fadeDirection = 0;
        } else if (this.fadeDirection === -1) {
            this.opacity -= fadeDuration;
        }

        // Manage life and fade-out when approaching the end
        this.lifeTime--;
        if (this.lifeTime < 30) {
            this.fadeDirection = -1;
        }

        // Remove the star when fully faded
        if (this.opacity <= 0) {
            const index = stars.indexOf(this);
            stars.splice(index, 1);
        }

        this.draw();
    }
}

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

function startStarAnimation() {
    ctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    spawnStars();
    stars.forEach(star => star.update());
    requestAnimationFrame(startStarAnimation);
}

startStarAnimation();
