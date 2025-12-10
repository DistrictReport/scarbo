// ---------------------------
// BURGER MENU TOGGLE
// ---------------------------
const menuToggle = document.querySelector('nav .menu-toggle');
const navLinks = document.querySelector('nav .links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// CLOSE MENU WHEN CLICK ON LINK (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
    }
  });
});

// ---------------------------
// SECTION SCROLL ANIMATION
// ---------------------------
const sections = document.querySelectorAll('section');
const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ---------------------------
// COOKIE BANNER ONLY ON MAIN PAGE
// ---------------------------

// Определяем главную страницу
const filename = window.location.pathname.split('/').pop();
const isMainPage = filename === '' || filename === 'index.html';

// Показываем баннер только на главной, если cookie ещё не принято
if (isMainPage && !localStorage.getItem('cookieAccepted')) {
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'flex';
}

// Обработчик кнопки OK
const cookieAcceptBtn = document.getElementById('cookie-accept');
if (cookieAcceptBtn) {
  cookieAcceptBtn.addEventListener('click', function() {
    localStorage.setItem('cookieAccepted', 'true'); // сохраняем согласие
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.style.display = 'none';
  });
}

// ---------------------------
// SERVICES TABS
// ---------------------------
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Убираем активность у всех кнопок и панелей
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    // Делаем активной текущую кнопку и панель
    button.classList.add('active');
    const target = document.getElementById(button.dataset.tab);
    target.classList.add('active');
  });
});

// ---------------------------
// UPDATE MASSAGE PRICES BASED ON SELECT
// ---------------------------
document.querySelectorAll('.massage-card').forEach(card => {
  const select = card.querySelector('.duration-select');
  const priceElem = card.querySelector('.massage-price');
  const prices = card.dataset.prices ? JSON.parse(card.dataset.prices) : null;

  if (select && prices) {
    // Начальная цена
    priceElem.textContent = prices[select.value] + " р";

    select.addEventListener('change', () => {
      const selectedTime = select.value;
      priceElem.textContent = prices[selectedTime] + " р";
    });
  }
});

// ---------------------------
// OPTIONAL: SCROLL TO TOP SMOOTH (если нужно)
// ---------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetEl = document.querySelector(this.getAttribute('href'));
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
