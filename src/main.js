import './style.css';

const reveals = document.querySelectorAll('.reveal');
const sections = [...document.querySelectorAll('main section')];
const navLinks = document.querySelectorAll('.nav-link');

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

const quoteEl = document.getElementById('quote');
const quoteMetaEl = document.getElementById('quoteMeta');

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = entry.target.style.getPropertyValue('--delay') || '0ms';
      entry.target.style.transitionDelay = delay;
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  { threshold: 0.42 }
);

sections.forEach((section) => sectionObserver.observe(section));

menuToggle?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const quotes = [
  {
    quote: '“NOVA//01 feels futuristic in motion. Fast, controlled, and absurdly smooth over distance.”',
    meta: 'K. Rhodes · National 10K Finalist'
  },
  {
    quote: '“The transition is instant. It gives me race-day confidence even in heavy training blocks.”',
    meta: 'M. Silva · Elite Run Coach'
  },
  {
    quote: '“I came for the look, stayed for the performance. This is premium footwear done right.”',
    meta: 'A. Patel · Performance Creator'
  }
];

let quoteIndex = 0;

setInterval(() => {
  if (!quoteEl || !quoteMetaEl) return;
  quoteIndex = (quoteIndex + 1) % quotes.length;
  quoteEl.classList.add('opacity-0', 'translate-y-1');
  quoteMetaEl.classList.add('opacity-0');

  setTimeout(() => {
    quoteEl.textContent = quotes[quoteIndex].quote;
    quoteMetaEl.textContent = quotes[quoteIndex].meta;
    quoteEl.classList.remove('opacity-0', 'translate-y-1');
    quoteMetaEl.classList.remove('opacity-0');
  }, 220);
}, 4200);
