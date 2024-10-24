
document.querySelector('.nav-home-icon').addEventListener('click', (event) => {
    event.preventDefault(); 
    window.location.href = 'test1.html'; 
});


document.getElementById('btnClickMe').addEventListener('click', () => {
    const answer = prompt("What is 2 + 2?");
    if (answer === "4") {
        const skillsContainer = document.getElementById('skillsContainer');
        skillsContainer.classList.remove('hidden');
    } else {
        alert("Incorrect answer. Try again!");
    }
});

// tạo hiệu ứng chữ đang gõ
function typeText(element, text, speed = 50) {
    let index = 0;
    element.innerHTML = ''; 
    element.style.display = 'block'; // Hiển thị container nếu nó bị ẩn

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
        // Cuộn đến phần tử mới nếu nội dung quá dài
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    type();
}

// Tạo đối tượng để lưu trạng thái của từng kỹ năng
const skillState = {};

// Sự kiện cho các icon kỹ năng
document.querySelectorAll('.skill-icon').forEach((item, index) => {
    const skillInfo = item.parentElement.getAttribute('data-info');

    // Khởi tạo trạng thái ban đầu là false cho mỗi kỹ năng
    skillState[index] = false;

    item.addEventListener('click', () => {
        const infoContainer = document.getElementById('skillInfoBox');
        const existingParagraphs = Array.from(infoContainer.querySelectorAll('p'));

        // Kiểm tra xem đoạn văn bản của kỹ năng này đã tồn tại trong `#skillInfoBox` hay chưa
        let existingParagraph = existingParagraphs.find(p => p.getAttribute('data-index') == index);

        if (existingParagraph) {
            // Nếu đoạn văn bản tồn tại, ta sẽ xóa nó (ẩn đi)
            existingParagraph.remove();
            skillState[index] = false; 
        } else {
            // Nếu đoạn văn bản không tồn tại, ta sẽ tạo mới và thêm hiệu ứng gõ
            if (!skillState[index]) {
                const newParagraph = document.createElement('p');
                newParagraph.setAttribute('data-index', index); 
                infoContainer.appendChild(newParagraph); // Thêm phần tử vào để sử dụng với hiệu ứng gõ
                typeText(newParagraph, skillInfo, 50); // hiệu ứng gõ
                skillState[index] = true; 

                
                newParagraph.scrollIntoView({ behavior: 'smooth', block: 'center' });

                
                infoContainer.scrollTop = infoContainer.scrollHeight;
            }
        }
    });


    item.addEventListener('mouseover', () => {
        item.style.boxShadow = '0 0 25px rgba(255, 255, 0, 0.7)';
    });

    item.addEventListener('mouseout', () => {
        item.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.5)';
    });
});


document.getElementById('scrollUpBtn').addEventListener('click', () => {
    const infoContainer = document.getElementById('skillInfoBox');
    infoContainer.scrollBy({
        top: -50, 
        behavior: 'smooth'
    });
});


document.getElementById('scrollDownBtn').addEventListener('click', () => {
    const infoContainer = document.getElementById('skillInfoBox');
    infoContainer.scrollBy({
        top: 50, 
        behavior: 'smooth'
    });
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
