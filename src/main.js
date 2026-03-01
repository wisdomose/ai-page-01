import './style.css';

const reveals = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.nav-link');
const sections = [...document.querySelectorAll('main section[id]')];
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

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
  { threshold: 0.14 }
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
  { threshold: 0.45 }
);

sections.forEach((section) => sectionObserver.observe(section));

menuToggle?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

const testimonials = [
  {
    quote: '“Velocity One feels like it disappears underfoot — pure propulsion from warm-up to final split.”',
    meta: 'Ari Kim • Marathon Coach'
  },
  {
    quote: '“The grip and cushion combo is unreal. My tempo sessions are faster with less fatigue.”',
    meta: 'Jules Carter • Triathlete'
  },
  {
    quote: '“Minimal look, maximal performance. Easily the most premium trainer in my rotation.”',
    meta: 'Nadia Cruz • Running Creator'
  }
];

let quoteIndex = 0;
const quoteEl = document.getElementById('quote');
const metaEl = document.getElementById('quoteMeta');

setInterval(() => {
  quoteIndex = (quoteIndex + 1) % testimonials.length;
  quoteEl.classList.add('opacity-0', 'translate-y-1');

  setTimeout(() => {
    quoteEl.textContent = testimonials[quoteIndex].quote;
    metaEl.textContent = testimonials[quoteIndex].meta;
    quoteEl.classList.remove('opacity-0', 'translate-y-1');
  }, 220);
}, 4600);

const heroPanels = [...document.querySelectorAll('[data-hero-slide]')];
let heroIndex = 0;

const setHeroSlide = (index) => {
  heroPanels.forEach((panel, panelIndex) => {
    panel.classList.toggle('active', panelIndex === index);
  });
};

if (heroPanels.length) {
  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroPanels.length;
    setHeroSlide(heroIndex);
  }, 3600);
}

const storySteps = [...document.querySelectorAll('[data-story-step]')];
const storyImages = [...document.querySelectorAll('[data-story-image]')];

const setStoryStage = (index) => {
  storySteps.forEach((step, stepIndex) => {
    step.classList.toggle('active', stepIndex === index);
  });
  storyImages.forEach((image, imageIndex) => {
    image.classList.toggle('active', imageIndex === index);
  });
};

if (storySteps.length) {
  const storyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = Number(entry.target.getAttribute('data-story-step'));
        if (Number.isNaN(index)) return;
        window.requestAnimationFrame(() => setStoryStage(index));
      });
    },
    {
      threshold: 0.65,
      rootMargin: '-10% 0px -20% 0px'
    }
  );

  storySteps.forEach((step) => storyObserver.observe(step));
}
