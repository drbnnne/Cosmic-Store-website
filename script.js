// script.js

// Инициализация AOS (анимация при скролле)
AOS.init({
    duration: 1000,
    once: true,
    mirror: false
});

// Прелоадер
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);
});

// Навигация при скролле
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Подсветка активной ссылки
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Анимация при наведении на иконки (уже в CSS, но добавим дополнительные эффекты)
document.querySelectorAll('.icon-wrapper, .social-icon, .service-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(5deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    });
});

// Анимация при клике на сердечко (избранное)
document.querySelectorAll('.fa-heart').forEach(heart => {
    heart.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        this.classList.toggle('fas');
        this.classList.toggle('far');

        if (this.classList.contains('fas')) {
            this.style.color = '#ff6b6b';
            showNotification('❤️ Добавлено в избранное!');
        } else {
            this.style.color = '';
            showNotification('💔 Удалено из избранного');
        }

        // Анимация
        this.style.transform = 'scale(1.5)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Функция покупки (анимация при нажатии на кнопку)
function buyNow() {
    const btn = event.currentTarget;

    // Анимация кнопки
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);

    // Показываем уведомление
    showNotification('🚀 Добро пожаловать в магазин!');

    // Создаем конфетти эффект
    createConfetti();
}

// Покупка конкретного товара
function buyProduct(productName) {
    showNotification(`✨ Товар "${productName}" добавлен в корзину!`);

    // Анимация корзины
    const cart = document.querySelector('.cart-icon');
    cart.style.transform = 'scale(1.3)';
    setTimeout(() => {
        cart.style.transform = 'scale(1)';
    }, 200);

    // Обновляем счетчик корзины
    const count = document.querySelector('.cart-count');
    const currentCount = parseInt(count.textContent);
    count.textContent = currentCount + 1;

    // Анимация счетчика
    count.style.transform = 'scale(1.5)';
    setTimeout(() => {
        count.style.transform = 'scale(1)';
    }, 200);
}

// Функция для кнопки "Узнать больше"
function learnMore() {
    showNotification('📖 Скоро здесь будет больше информации!');
}

// Отправка сообщения
function sendMessage(event) {
    event.preventDefault();

    const btn = event.currentTarget;

    // Анимация кнопки
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);

    showNotification('✉️ Сообщение отправлено!');

    // Очищаем форму
    document.getElementById('contactForm').reset();
}

// Показать уведомление
function showNotification(message) {
    const notification = document.getElementById('notification');
    const messageSpan = document.getElementById('notificationMessage');

    messageSpan.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Эффект конфетти
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `confetti ${Math.random() * 2 + 1}s linear forwards`;
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Добавляем ключевые кадры для конфетти
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Анимация при наведении на карточки товаров
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Плавный скролл для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация поиска
document.querySelector('.search-icon').addEventListener('click', () => {
    showNotification('🔍 Поиск скоро будет доступен');
});

// Анимация меню
document.querySelector('.menu-icon').addEventListener('click', () => {
    showNotification('📱 Меню в разработке');
});

// Добавляем частицы на фон
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '0';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'white';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random();
        particle.style.animation = `floatParticle ${Math.random() * 10 + 5}s linear infinite`;

        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Добавляем анимацию для частиц
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        from {
            transform: translateY(-100vh);
        }
        to {
            transform: translateY(100vh);
        }
    }
`;
document.head.appendChild(particleStyle);