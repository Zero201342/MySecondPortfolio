// Điều hướng đến trang test1.html khi nhấp vào biểu tượng Home
document.querySelector('.home-icon').addEventListener('click', (event) => {
    event.preventDefault(); 
    window.location.href = 'test1.html'; 
});

// Thêm hiệu ứng fade-in cho các phần nội dung
document.addEventListener('DOMContentLoaded', function() {
    const contentSections = document.querySelectorAll('.content-box h2, .content-box p, .content-box blockquote');

    // Thêm lớp fade-in khi trang tải xong
    contentSections.forEach(section => {
        section.classList.add('fade-in');
    });

    // Thêm hiệu ứng fade-in khi cuộn
    window.addEventListener('scroll', function() {
        contentSections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (sectionPosition < screenPosition) {
                section.classList.add('fade-in');
            }
        });
    });
});

// Thêm hiệu ứng hover cho logo cá nhân
document.addEventListener('DOMContentLoaded', () => {
    const profileLogo = document.querySelector('.profile-logo');
    profileLogo.addEventListener('mouseenter', () => {
        profileLogo.classList.add('hover-effect');
    });
    profileLogo.addEventListener('mouseleave', () => {
        profileLogo.classList.remove('hover-effect');
    });
});

// Thay đổi shadow cho khung nội dung khi hover
const contentBox = document.querySelector('.content-box');
contentBox.addEventListener('mouseover', () => {
    contentBox.style.boxShadow = '0 0 25px rgba(255, 255, 0, 0.7)';
});

contentBox.addEventListener('mouseout', () => {
    contentBox.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';
});

// Thay đổi shadow cho logo cá nhân khi hover
const profileLogoShadow = document.querySelector('.profile-logo');
profileLogoShadow.addEventListener('mouseover', () => {
    profileLogoShadow.style.boxShadow = '0 0 25px rgba(255, 255, 0, 0.7)';
});

profileLogoShadow.addEventListener('mouseout', () => {
    profileLogoShadow.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';
});

// Hiệu ứng cuộn mượt mà cho tất cả liên kết trên trang
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

// Hiệu ứng typing cho một câu trích dẫn
const quoteElement = document.querySelector('.quote');
const quoteText = "Sống là không chờ đợi.";
let index = 0;

function typeQuote() {
    if (index < quoteText.length) {
        quoteElement.textContent += quoteText.charAt(index);
        index++;
        setTimeout(typeQuote, 100); // Thời gian gõ từng ký tự
    }
}

// Bắt đầu hiệu ứng typing khi trang được tải
window.addEventListener('load', typeQuote);

// Tạo một tooltip cho thông tin liên hệ
document.querySelectorAll('.tooltip').forEach(tooltip => {
    tooltip.addEventListener('mouseenter', () => {
        const tooltipText = tooltip.getAttribute('data-tooltip');
        const tooltipDiv = document.createElement('div');
        tooltipDiv.classList.add('tooltip-text');
        tooltipDiv.innerText = tooltipText;
        document.body.appendChild(tooltipDiv);

        const rect = tooltip.getBoundingClientRect();
        tooltipDiv.style.left = `${rect.left + window.scrollX}px`;
        tooltipDiv.style.top = `${rect.bottom + window.scrollY}px`;
    });

    tooltip.addEventListener('mouseleave', () => {
        const tooltipDiv = document.querySelector('.tooltip-text');
        if (tooltipDiv) {
            tooltipDiv.remove();
        }
    });
});

// Hiệu ứng nhấp nháy cho nút
const buttonElements = document.querySelectorAll('.button');
buttonElements.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
        }, 300); // Thời gian hiệu ứng nhấp nháy
    });
});

// Tạo hiệu ứng cho các phần tử trong khung nội dung
contentSections.forEach(section => {
    section.addEventListener('mouseenter', () => {
        section.style.transform = 'scale(1.02)';
        section.style.transition = 'transform 0.3s ease';
    });

    section.addEventListener('mouseleave', () => {
        section.style.transform = 'scale(1)';
    });
});

// Hiệu ứng cuộn cho phần tử
const scrollElements = document.querySelectorAll('.scroll-effect');
window.addEventListener('scroll', () => {
    scrollElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        } else {
            element.classList.remove('visible');
        }
    });
});

// Thêm hiệu ứng cho các phần tử mới xuất hiện
const newContent = document.createElement('div');
newContent.classList.add('new-content');
newContent.textContent = 'Nội dung mới xuất hiện!';
document.body.appendChild(newContent);

// Hiệu ứng xuất hiện cho nội dung mới
setTimeout(() => {
    newContent.style.opacity = '1';
    newContent.style.transition = 'opacity 0.5s ease';
}, 1000); // Hiển thị nội dung mới sau 1 giây

// Kiểm tra và hiển thị thông báo khi cuộn đến cuối trang
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        alert('Bạn đã cuộn đến cuối trang!');
    }
});

// Thêm hiệu ứng nhấp nháy cho tất cả các phần tử có lớp là scroll-effect
scrollElements.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.add('active');
        setTimeout(() => {
            element.classList.remove('active');
        }, 300);
    });
});

// Tạo một hiệu ứng dừng khi cuộn
window.addEventListener('scroll', () => {
    let scrollTimer = null;
    if (scrollTimer) {
        clearTimeout(scrollTimer);
    }
    document.body.classList.add('scrolling');
    scrollTimer = setTimeout(() => {
        document.body.classList.remove('scrolling');
    }, 100);
});
