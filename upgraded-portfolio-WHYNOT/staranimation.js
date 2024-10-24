// Star Animation Setup
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
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
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

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
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * maxStarSize + 1;
        const speed = Math.random() * maxStarSpeed + 0.05;
        const opacity = 0;
        stars.push(new Star(x, y, size, speed, opacity));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spawnStars();
    stars.forEach(star => star.update());
    requestAnimationFrame(animate);
}

// Mouse Interaction for Desktop
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const mouseRadius = 100;

    stars.forEach(star => {
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
            star.x += dx / 30;
            star.y += dy / 30;
        }
    });
});

// Mobile Touch Interaction
canvas.addEventListener('touchmove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const touchY = e.touches[0].clientY - rect.top;
    const touchRadius = 100;

    stars.forEach(star => {
        const dx = touchX - star.x;
        const dy = touchY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < touchRadius) {
            star.x += dx / 30;
            star.y += dy / 30;
        }
    });
});

window.addEventListener('resize', () => {
    resizeCanvas();
});

animate();

// Functionality for Course Dropdowns
function toggleDropdown(element) {
    const dropdown = element.querySelector('.dropdown-content');
    if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
        dropdown.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        dropdown.style.opacity = 0;
        dropdown.style.transform = 'translateX(-50%) translateY(-10px)';
        setTimeout(() => {
            dropdown.style.display = 'none';
        }, 500);
    } else {
        dropdown.style.display = 'block';
        setTimeout(() => {
            dropdown.classList.add("show");
            dropdown.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            dropdown.style.opacity = 1;
            dropdown.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
    }
}

// Event Listener for Home Icon Navigation
document.querySelector('.home-icon').addEventListener('click', (event) => {
    event.preventDefault(); 
    window.location.href = 'test1.html'; 
});
