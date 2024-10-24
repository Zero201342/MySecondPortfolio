// Desktop Navigation
document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('click', () => {
        const sectionName = section.classList[1];
        window.location.href = `${sectionName}.html`;
    });
});

document.querySelector('.about').addEventListener('click', () => {
    window.location.href = 'aboutme.html';
});

let isTransitioning = false;
let totalBanners = 4; // Tổng số ảnh trong banner
let currentBanner = 1; // Bắt đầu từ ảnh đầu tiên

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

let slideInterval = setInterval(next, 3000);

let startX = 0, startY = 0;

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

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(next, 3000);
}