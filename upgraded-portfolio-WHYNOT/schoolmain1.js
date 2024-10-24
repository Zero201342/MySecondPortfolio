// school.js

// Hiệu ứng mở sách khi nhấp vào
function openBookEffect() {
    const schoolSection = document.querySelector('.school-section');
    const schoolImg = document.querySelector('.school-hover-img');
    let isBookOpen = false;

    schoolSection.addEventListener('click', () => {
        if (!isBookOpen) {
            schoolImg.style.transform = "rotateY(0deg) scale(1.1)";
            setTimeout(() => {
                revealText();
            }, 1000);
        } else {
            schoolImg.style.transform = "rotateY(-15deg) scale(1)";
        }
        isBookOpen = !isBookOpen;
    });
}

// Chuyển động lượn sóng cho các đoạn văn bản
function waveTextAnimation(element) {
    let text = element.textContent;
    element.textContent = ""; // Xóa văn bản ban đầu
    [...text].forEach((char, i) => {
        let span = document.createElement("span");
        span.textContent = char;
        span.style.animation = `waveMotion ${1.5 + Math.random()}s ease-in-out ${i * 0.1}s infinite`;
        element.appendChild(span);
    });
}

// Tạo các hạt bụi lấp lánh
function createSparkles() {
    const schoolSection = document.querySelector('.school-section');
    for (let i = 0; i < 100; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 3}s`;
        sparkle.classList.add(Math.random() > 0.5 ? 'small' : 'large');
        schoolSection.appendChild(sparkle);
    }
}

// Animation khi cuộn đến phần School
function animateOnScroll() {
    const schoolSection = document.querySelector('.school-section');
    window.addEventListener('scroll', () => {
        const sectionPos = schoolSection.getBoundingClientRect().top;
        if (sectionPos < window.innerHeight && sectionPos > 0) {
            schoolSection.classList.add('show');
        }
    });
}

// Hiệu ứng chào mừng khi vào trang
function welcomeAnimation() {
    const text = "Welcome to My School Journey!";
    const element = document.querySelector('.school-content');
    let index = 0;

    function showText() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(showText, 150);
        }
    }
    showText();
}

// Kích hoạt các hiệu ứng
document.addEventListener('DOMContentLoaded', () => {
    openBookEffect();
    createSparkles();
    animateOnScroll();
    welcomeAnimation();
    const waveText = document.querySelector('.school-content');
    waveTextAnimation(waveText);
});
