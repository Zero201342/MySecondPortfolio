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

document.querySelector('.home-icon').addEventListener('click', (event) => {
    event.preventDefault(); 
    window.location.href = 'test1.html'; 
});

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
