
const menuIcon = document.querySelector('.mobile-menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');

menuIcon.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Đảm bảo menu đóng khi nhấp bên ngoài trên mobile
document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Hiệu ứng cuộn mượt mà khi chuyển trang
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    section.addEventListener('click', () => {
        const sectionName = section.classList[0];
        window.location.href = `${sectionName}.html`;
    });
});

// Hiệu ứng slide-in khi tải trang
window.addEventListener('load', () => {
    const allSections = document.querySelectorAll('.section');
    allSections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Cài đặt ban đầu cho các phần
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

/* Mobile Slide Logic */
let isTransitioning = false;
let totalBanners = 4;
let currentBanner = 1;

function next() {
    if (isTransitioning) return;
    isTransitioning = true;

    let banners = document.querySelectorAll('.bannerimg');
    banners.forEach((banner) => {
        let currentClass = banner.classList[1];
        let currentNumber = parseInt(currentClass.replace('bannerimg', ''));
        let newNumber = currentNumber < totalBanners ? currentNumber + 1 : 1;
        banner.classList.replace(currentClass, `bannerimg${newNumber}`);
    });

    currentBanner = currentBanner < totalBanners ? currentBanner + 1 : 1;
    setTimeout(() => {
        isTransitioning = false;
    }, 1000);
}

function previous() {
    if (isTransitioning) return;
    isTransitioning = true;

    let banners = document.querySelectorAll('.bannerimg');
    banners.forEach((banner) => {
        let currentClass = banner.classList[1];
        let currentNumber = parseInt(currentClass.replace('bannerimg', ''));
        let newNumber = currentNumber > 1 ? currentNumber - 1 : totalBanners;
        banner.classList.replace(currentClass, `bannerimg${newNumber}`);
    });

    currentBanner = currentBanner > 1 ? currentBanner - 1 : totalBanners;
    setTimeout(() => {
        isTransitioning = false;
    }, 1000);
}

// Tự động chuyển banner mỗi 3 giây
let slideInterval = setInterval(next, 3000);

let startX = 0, startY = 0;

// Thêm touch event cho việc swipe trên mobile
document.querySelector('.homebanner').addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
});

document.querySelector('.homebanner').addEventListener('touchend', (e) => {
    const endY = e.changedTouches[0].clientY;
    if (startY - endY > 50) {
        next();
    } else if (endY - startY > 50) {
        previous();
    }
    resetSlideInterval();
});

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(next, 3000);
}

// Đảm bảo không chạy sự kiện menu mobile trên desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
    }
});

// Điều chỉnh hiển thị Contact Bar trên cả Desktop và Mobile
const contactBar = document.querySelector('.contact-bar');

// Đảm bảo contact bar không bị che khuất trên mobile menu khi mở
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        // Giữ contact bar luôn hiển thị ngay cả khi kích thước màn hình thay đổi
        contactBar.style.display = 'flex';
    } else {
        contactBar.style.display = 'flex';
    }
});

// Đảm bảo contact bar không bị ẩn khi cuộn trên mobile
document.addEventListener('scroll', () => {
    contactBar.style.display = 'flex';
});
