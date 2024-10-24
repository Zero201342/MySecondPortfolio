// Điều hướng trang khi nhấn vào biểu tượng Trang Chủ
document.querySelector('.home-icon').addEventListener('click', (event) => {
    event.preventDefault(); 
    window.location.href = 'test1.html'; 
});

// Thêm hiệu ứng khi di chuột qua phần nội dung
const contentElement = document.querySelector('.content');

// Sử dụng một hàm để thêm hoặc loại bỏ hiệu ứng box-shadow để tránh trùng lặp mã
function toggleContentShadow(add) {
    contentElement.style.boxShadow = add ? 
        '0 0 25px rgba(255, 255, 0, 0.7)' : 
        '0 0 15px rgba(0, 0, 0, 0.5)';
}

// Xử lý sự kiện di chuột vào và rời khỏi phần nội dung
contentElement.addEventListener('mouseover', () => toggleContentShadow(true));
contentElement.addEventListener('mouseout', () => toggleContentShadow(false));

// Thêm hiệu ứng nhẹ nhàng (smooth) khi di chuột vào phần nội dung
contentElement.addEventListener('mouseover', () => {
    contentElement.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
    contentElement.style.transform = 'scale(1.05)';
});

contentElement.addEventListener('mouseout', () => {
    contentElement.style.transform = 'scale(1)';
});

// Thêm hiệu ứng nhấp nháy ngắn khi người dùng nhấp vào Trang Chủ
document.querySelector('.home-icon').addEventListener('mousedown', () => {
    document.querySelector('.home-icon').style.transform = 'scale(0.95)';
});

document.querySelector('.home-icon').addEventListener('mouseup', () => {
    document.querySelector('.home-icon').style.transform = 'scale(1)';
    document.querySelector('.home-icon').style.transition = 'transform 0.1s ease';
});
