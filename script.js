document.addEventListener('DOMContentLoaded', function() {
    // ===== КНОПКА "ВВЕРХ" =====
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Показываем кнопку, когда прокрутили страницу вниз на 20px
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    };

    // Функция для прокрутки страницы вверх
    scrollToTopBtn.addEventListener('click', function() {
        document.body.scrollTop = 0; // Для Safari
        document.documentElement.scrollTop = 0; // Для Chrome, Firefox, IE и Opera
    });

    // ===== СЛАЙДЕР (index.html) =====
    const slides = document.querySelector('.slides');
    if (slides) { // Проверяем, существует ли элемент на странице
        const slideItems = document.querySelectorAll('.slide');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentIndex = 0;
        const totalSlides = slideItems.length;

        function updateSlider() {
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        if (prevBtn && nextBtn) { // Проверяем, существуют ли кнопки
            nextBtn.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlider();
            });

            prevBtn.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                updateSlider();
            });

            // Автопрокрутка слайдера каждые 5 секунд
            setInterval(function() {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlider();
            }, 5000);
        }
    }

    // ===== АККОРДЕОН (index.html) =====
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = this.nextElementSibling;
            const isActive = item.classList.contains('active');

            // Закрываем все элементы
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
                el.querySelector('.accordion-content').classList.remove('active');
            });

            // Открываем текущий, если он был закрыт
            if (!isActive) {
                item.classList.add('active');
                content.classList.add('active');
            }
        });
    });

    // ===== АВТОРИЗАЦИЯ (index.html и about.html) =====
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModal = loginModal.querySelectorAll('.close'); // Изменено на querySelectorAll
    const loginForm = document.getElementById('loginForm');
    const bookModal = document.getElementById('bookModal');

    // Создаем кнопку выхода
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'logoutBtn';
    logoutBtn.className = 'btn';
    logoutBtn.textContent = 'Выход';
    if(loginBtn){
        loginBtn.parentNode.insertBefore(logoutBtn, loginBtn.nextSibling);
    }

    // Открытие модального окна входа
    if(loginBtn){
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }


    // Закрытие модального окна входа
    closeLoginModal.forEach(close => {
        close.addEventListener('click', () => {
            loginModal.style.display = 'none';
            successModal.style.display = 'none'; //закрытия модального окна отправки сообщении
        });
    });

    // Обработка формы входа
    if(loginForm){
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = loginForm.querySelector('input[name="email"]').value;
            const password = loginForm.querySelector('input[name="password"]').value;
            const errorElement = loginForm.querySelector('.error-message');

            // Валидация
            if (!email || !password) {
                showError('Заполните все поля', errorElement);
                return;
            }

            // Тестовые данные для входа (в реальном проекте проверка на сервере)
            if (email === 'user@example.com' && password === 'password123') {
                loginSuccess(email);
            } else {
                showError('Неверный email или пароль', errorElement);
            }
        });
    }


    // Функция успешного входа
    function loginSuccess(email) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';

        // Добавляем приветствие
        const nav = document.querySelector('nav ul');
        const greeting = document.createElement('li');
        greeting.innerHTML = `<span style="color: #3498db;">Добро пожаловать, ${email.split('@')[0]}</span>`;
        nav.insertBefore(greeting, loginBtn.parentNode);

        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        loginForm.reset();
        alert('Вы успешно вошли в систему!');
    }

    // Функция выхода
    if(logoutBtn){
        logoutBtn.addEventListener('click', function() {
            loginBtn.style.display = 'inline-block';
            logoutBtn.style.display = 'none';

            const greeting = document.querySelector('nav ul li span');
            if (greeting) {
                greeting.parentNode.remove();
            }

            alert('Вы вышли из системы');
        });
    }


    // Показать ошибку
    function showError(message, element) {
        element.textContent = message;
        element.style.display = 'block';

        setTimeout(() => {
            element.style.display = 'none';
        }, 3000);
    }

    // Закрытие модальных окон при клике вне их
    window.addEventListener('click', (event) => {
        if (loginModal && event.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        if (bookModal && event.target === bookModal) {
            bookModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        if (successModal && event.target === successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // ===== ОТПРАВКА ФОРМЫ (contacts.html) =====
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');

    if (contactForm) { // Проверяем, существует ли форма
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Предотвращаем отправку формы

            // Здесь можно добавить код для отправки данных формы на сервер
            // После успешной отправки показываем модальное окно
            successModal.style.display = 'block';

            // Очищаем форму
            contactForm.reset();
        });
    }

    // ===== ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА (contacts.html) =====
    const closeModalButtons = document.querySelectorAll('.close');

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

});