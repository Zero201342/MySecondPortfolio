// Desktop Navigation
document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('click', () => {
        const sectionName = section.classList[1];
        window.location.href = `${sectionName}.html`;
    });
});

// Đảm bảo chỉ thêm sự kiện nhấp cho phiên bản desktop
if (window.innerWidth > 768) {
    document.querySelector('.about').addEventListener('click', () => {
        window.location.href = 'banthantoiht.html';
    });
}

if (window.innerWidth > 768) {
    document.querySelector('.school').addEventListener('click', () => {
        window.location.href = 'truonghoc.html';
    });
}

if (window.innerWidth > 768) {
    document.querySelector('.skill').addEventListener('click', () => {
        window.location.href = 'vandekinang.html';
    });
}

if (window.innerWidth > 768) {
    document.querySelector('.course').addEventListener('click', () => {
        window.location.href = 'Baitap.html';
    });
}


// Chặn F12
document.addEventListener('keydown', function (event) {
    if (event.key === 'F12') {
        event.preventDefault();
    }
});

// Chặn Ctrl+U
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'u') {
        event.preventDefault();
    }
});

// Chặn Ctrl+Shift+I (mở DevTools)
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'I') {
        event.preventDefault();
    }
});

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});






// MOBILE
const menuIcon = document.querySelector('.mobile-menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');
let isTransitioning = false;
let totalBanners = 4; // Tổng số ảnh trong banner
let currentBanner = 1; // Bắt đầu từ ảnh đầu tiên

// Thêm sự kiện click để hiển thị/ẩn menu với hiệu ứng cuộn
menuIcon.addEventListener('click', () => {
    if (!mobileMenu.classList.contains('active')) {
        mobileMenu.style.maxHeight = "0";
        mobileMenu.style.opacity = "0";
        mobileMenu.style.visibility = "hidden";
        mobileMenu.classList.add('active');
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
        mobileMenu.style.opacity = "1";
        mobileMenu.style.visibility = "visible";
    } else {
        mobileMenu.style.maxHeight = "0";
        mobileMenu.style.opacity = "0";
        mobileMenu.style.visibility = "hidden";
        setTimeout(() => mobileMenu.classList.remove('active'), 300);
    }

    // Thay đổi biểu tượng từ dấu 3 gạch thành dấu X
    menuIcon.classList.toggle('open');
    if (menuIcon.classList.contains('open')) {
        menuIcon.classList.replace('fa-bars', 'fa-times');
    } else {
        menuIcon.classList.replace('fa-times', 'fa-bars');
    }
});

// Slide logic cho mobile
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

// Đảm bảo menu di động ẩn khi nhấp bên ngoài trên mobile
document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.style.maxHeight = "0";
        mobileMenu.style.opacity = "0";
        mobileMenu.style.visibility = "hidden";
        setTimeout(() => mobileMenu.classList.remove('active'), 300);
        menuIcon.classList.replace('fa-times', 'fa-bars');
        menuIcon.classList.remove('open');
    }
});

// Đảm bảo không chạy sự kiện menu mobile trên desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenu.style.maxHeight = "0";
        mobileMenu.style.opacity = "0";
        mobileMenu.style.visibility = "hidden";
        setTimeout(() => mobileMenu.classList.remove('active'), 300);
        menuIcon.classList.replace('fa-times', 'fa-bars');
        menuIcon.classList.remove('open');
    }
});

// Kéo thả biểu tượng menu trên mobile
let offsetX, offsetY;
menuIcon.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định
    offsetX = e.clientX - menuIcon.getBoundingClientRect().left;
    offsetY = e.clientY - menuIcon.getBoundingClientRect().top;

    const onMouseMove = (e) => {
        menuIcon.style.left = `${e.clientX - offsetX}px`;
        menuIcon.style.top = `${e.clientY - offsetY}px`;
        menuIcon.style.position = "absolute"; // Đảm bảo nó có thể di chuyển
    };

    document.addEventListener('mousemove', onMouseMove);

    menuIcon.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', onMouseMove);
    }, { once: true });
});

// Hỗ trợ kéo thả trên mobile
menuIcon.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    offsetX = touch.clientX - menuIcon.getBoundingClientRect().left;
    offsetY = touch.clientY - menuIcon.getBoundingClientRect().top;

    const onTouchMove = (e) => {
        const touchMove = e.touches[0];
        menuIcon.style.left = `${touchMove.clientX - offsetX}px`;
        menuIcon.style.top = `${touchMove.clientY - offsetY}px`;
        menuIcon.style.position = "absolute";
    };

    document.addEventListener('touchmove', onTouchMove);

    menuIcon.addEventListener('touchend', () => {
        document.removeEventListener('touchmove', onTouchMove);
    }, { once: true });
});
