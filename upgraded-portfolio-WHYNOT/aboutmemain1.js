// about.js

// Hiệu ứng đánh máy cho phần "About Me"
function typeWriterEffect(element, text, speed) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Tạo các bong bóng nổi huyền ảo
function createBubbles() {
    const aboutSection = document.querySelector('.about-section');
    for (let i = 0; i < 50; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.animationDuration = `${5 + Math.random() * 10}s`;
        bubble.style.width = bubble.style.height = `${5 + Math.random() * 20}px`;
        bubble.classList.add(Math.random() > 0.5 ? 'pink' : 'blue');
        aboutSection.appendChild(bubble);
    }
}

// Áp dụng hiệu ứng cho đoạn văn "About Me"
const aboutContent = document.querySelector('.about-content');
const aboutText = "Xin chào! Tôi là Hiếu, lập trình viên đam mê sáng tạo.";
aboutContent.textContent = "";
typeWriterEffect(aboutContent, aboutText, 100);

// Gọi chức năng tạo bong bóng
createBubbles();

// Hiệu ứng phát sáng khi di chuột vào tiêu đề
const aboutTitle = document.querySelector('.about-section h2');
aboutTitle.addEventListener('mouseenter', () => {
    aboutTitle.classList.add('glow');
    setTimeout(() => {
        aboutTitle.classList.remove('glow');
    }, 300);
});
