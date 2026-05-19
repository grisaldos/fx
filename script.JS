/* =============================================
   HAPPY GRADUATION WEBSITE — script.js
   ============================================= */

// ── Confetti Generator ───────────────────────
(function createConfetti() {
  const container = document.getElementById('confetti');
  const colors = ['#f9c784','#f5a8b8','#c8b4e3','#9ed9c8','#a8d4f5','#f7b7c0','#fff'];
  const shapes = ['circle','square','squircle'];

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');

    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const size  = Math.random() * 10 + 6;
    const left  = Math.random() * 100;
    const delay = Math.random() * 8;
    const dur   = Math.random() * 6 + 5;

    piece.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${shape === 'circle' ? '50%' : shape === 'squircle' ? '40%' : '2px'};
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;
    container.appendChild(piece);
  }
})();

// ── Scroll-triggered reveal ───────────────────
(function initReveal() {
  const targets = document.querySelectorAll(
    '.photo-card, .wish-card, .quote-inner, .section-title, .section-label'
  );

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07}s`;
    obs.observe(el);
  });

  // Inject revealed state
  const style = document.createElement('style');
  style.textContent = '.revealed { opacity: 1 !important; transform: none !important; }';
  document.head.appendChild(style);
})();

// ── Cursor sparkles ──────────────────────────
(function initSparkles() {
  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.85) {
      const spark = document.createElement('div');
      const emojis = ['✨','⭐','🌟','💫','🎉'];
      spark.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      spark.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        pointer-events: none;
        z-index: 9999;
        font-size: ${Math.random() * 12 + 10}px;
        animation: sparkOut 0.7s ease forwards;
        user-select: none;
      `;
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 700);
    }
  });

  const sparkStyle = document.createElement('style');
  sparkStyle.textContent = `
    @keyframes sparkOut {
      0%   { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      100% { transform: translate(-50%, -100px) scale(0.2); opacity: 0; }
    }
  `;
  document.head.appendChild(sparkStyle);
})();


// ── Background Music ───────────────────────

const music = document.getElementById('bgMusic');
const toggle = document.getElementById('musicToggle');

function startMusic() {
  music.play().catch(() => {});
}

window.addEventListener('load', startMusic);

document.addEventListener('click', startMusic, { once: true });
document.addEventListener('touchstart', startMusic, { once: true });

toggle.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    toggle.innerHTML = '🎵 Music On';
  } else {
    music.pause();
    toggle.innerHTML = '🔇 Music Off';
  }
});
