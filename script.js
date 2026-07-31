document.addEventListener('DOMContentLoaded', () => {
  // Loader
  const loader = document.getElementById('loader');
  window.setTimeout(() => {
    loader.classList.add('hidden');
  }, 2200);

  // Smooth reveal on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));

  // Custom cursor
  const cursor = document.querySelector('.cursor');
  document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
  document.querySelectorAll('a, button, .reason-card, .gallery-item').forEach((element) => {
    element.addEventListener('mouseenter', () => cursor.classList.add('active'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });

  // Image slider
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dotsContainer = document.querySelector('.slider-dots');
  let currentSlide = 0;

  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    if (index === 0) dot.classList.add('active');
    dot.dataset.index = index;
    dot.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(dot);
  });

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove('active'));
    const activeDots = dotsContainer.querySelectorAll('span');
    activeDots.forEach((dot) => dot.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    activeDots[currentSlide].classList.add('active');
  }

  document.querySelector('.slider-btn.prev').addEventListener('click', () => {
    showSlide(currentSlide - 1);
  });

  document.querySelector('.slider-btn.next').addEventListener('click', () => {
    showSlide(currentSlide + 1);
  });

  setInterval(() => showSlide(currentSlide + 1), 5000);

  // Typewriter effect
  const typewriter = document.getElementById('typewriter');
  const letterText = `My dearest love,

You make every ordinary moment feel tender and beautiful. Your smile has a way of turning even my quietest days into something full of warmth, color, and joy. I love the softness in your heart, the kindness in your soul, and the gentle magic you bring into my life.

I hope this little website reminds you of how deeply you are loved. Not just today, but every day. You are my favorite feeling, my sweetest thought, and my most cherished dream. I will always adore you, cherish you, and choose you again and again.

Forever yours,
Your one and only.`;

  let index = 0;
  function typeLetter() {
    if (index < letterText.length) {
      typewriter.textContent += letterText.charAt(index);
      index += 1;
      setTimeout(typeLetter, 28);
    }
  }

  window.setTimeout(typeLetter, 600);

 // Music Player
const musicButton = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

let isMusicPlaying = false;

musicButton.addEventListener("click", async () => {
  try {
    if (isMusicPlaying) {
      bgMusic.pause();
      musicButton.innerHTML = "<span>♪</span> Music On";
    } else {
      await bgMusic.play();
      musicButton.innerHTML = "<span>⏸</span> Music Off";
    }

    isMusicPlaying = !isMusicPlaying;
  } catch (error) {
    console.error(error);
    alert("Gagal memutar musik. Pastikan file MP3 ada di folder music.");
  }
});

  // Floating particles and star field
  const starsContainer = document.querySelector('.stars');
  for (let i = 0; i < 28; i += 1) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    starsContainer.appendChild(star);
  }

  // Surprise modal and confetti
  const modal = document.getElementById('modal');
  const surpriseBtn = document.getElementById('surpriseBtn');
  const closeModal = document.getElementById('closeModal');

  function showModal() {
    modal.classList.add('active');
    createConfetti();
    burstHearts();
  }

  function hideModal() {
    modal.classList.remove('active');
  }

  surpriseBtn.addEventListener('click', showModal);
  closeModal.addEventListener('click', hideModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) hideModal();
  });

  function createConfetti() {
    const colors = ['#ff7ea8', '#ffd4e2', '#ffffff', '#ffb5ca'];
    for (let i = 0; i < 40; i += 1) {
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.top = '-20px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.setProperty('--x', `${(Math.random() - 0.5) * 140}px`);
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 1200);
    }
  }

  function burstHearts() {
    for (let i = 0; i < 14; i += 1) {
      const heart = document.createElement('div');
      heart.className = 'heart-burst';
      heart.textContent = '💗';
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.top = `${Math.random() * 60}vh`;
      heart.style.setProperty('--x', `${(Math.random() - 0.5) * 200}px`);
      heart.style.setProperty('--y', `${Math.random() * 180}px`);
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 900);
    }
  }

  // Floating hearts in background
  const floatingLayer = document.querySelector('.background-hearts');
  const heartElements = Array.from(floatingLayer.children);
  heartElements.forEach((heart, index) => {
    heart.animate(
      [
        { transform: 'translateY(0px)' },
        { transform: `translateY(${20 + index * 6}px)` }
      ],
      { duration: 2000 + index * 300, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out' }
    );
  });
});
