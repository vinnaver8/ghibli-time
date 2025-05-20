// script.js
document.addEventListener('DOMContentLoaded', () => {
  // ── CONFIG: adjust these to your layout ─────────────────────────────
  const slot1EndOffset = 1830; // scrollY at which slot-1 ends (px)
  const slot2EndOffset = 2600; // scrollY at which slot-2 ends (px)
  // ────────────────────────────────────────────────────────────────────

  // grab elements
  const wrapper    = document.getElementById('team-wrapper');
  const stickyCard = document.getElementById('sticky-card');
  const slot1Els   = ['h1','b1','b2','a1','a2'].map(id => document.getElementById(id));
  const slot2Els   = ['b3','a3'].map(id => document.getElementById(id));
  const redbox     = document.getElementById('redbox');
  const clock      = document.getElementById('clock-icon');
  const image      = document.getElementById('visible');  // your board.webp img
  let inSlot2      = false;

  // measurements
  const wrapperTop = wrapper.offsetTop;             // e.g. 950 or 1300px
  const cardH      = stickyCard.offsetHeight;       // ~300px

  // clamp helper
  const clamp = (v, min, max) => v < min ? min : v > max ? max : v;

  // ── SCROLL HANDLER ───────────────────────────────────────────────────
  function handleScroll() {
    const y    = window.scrollY;
    const rect = stickyCard.getBoundingClientRect();

    // confirm image is still 100% visible
    const imgRect = image.getBoundingClientRect();
    if (imgRect.top < 0 || imgRect.bottom > window.innerHeight) {
      return; // image no longer fully visible → do nothing
    }

    // 1) MARCHING
    let marchY;
    if (y < wrapperTop) {
      marchY = 0;
    } else if (y > slot2EndOffset - cardH) {
      marchY = (slot2EndOffset - cardH) - wrapperTop;
    } else {
      marchY = y - wrapperTop;
    }
    stickyCard.style.position = 'absolute';
    stickyCard.style.top      = marchY + 'px';

    // 2) SLOT PROGRESS
    const p1 = clamp((y - wrapperTop) / (slot1EndOffset - wrapperTop), 0, 1);
    const p2 = clamp((y - slot1EndOffset) / (slot2EndOffset - slot1EndOffset), 0, 1);

    slot1Els.forEach(el => {
      if (p1 === 0) {
        el.style.transform = 'translateY(0)';
        el.style.opacity   = '1';
      } else {
        el.style.transform = `translateY(${-100 * p1}px)`;
        el.style.opacity   = `${1 - p1}`;
      }
    });
    document.getElementById('t1').style.opacity = p1 < 1 ? '1' : '0';
    document.getElementById('p1').style.opacity = p1 < 1 ? '1' : '0';

    slot2Els.forEach(el => {
      if (p2 === 0) {
        el.style.transform = 'translateY(-80px)';
        el.style.opacity   = '0';
      } else {
        const ty = -80 + 80 * p2;
        el.style.transform = `translateY(${ty}px)`;
        el.style.opacity   = `${p2}`;
      }
    });
    document.getElementById('t2').style.opacity = p2 > 0 ? '1' : '0';
    document.getElementById('p2').style.opacity = p2 > 0 ? '1' : '0';

    // bounce-in / bounce-out
    if (p2 > 0 && !inSlot2) {
      inSlot2 = true;
      redbox.classList.remove('bounce-exit');
      clock.classList.remove('bounce-exit');
      redbox.style.transform = 'translateX(-50%) translateY(80px)';
      redbox.style.opacity   = '0';
      clock.style.transform  = 'translateX(-50%) translateY(80px)';
      clock.style.opacity    = '0';
      void redbox.offsetWidth; void clock.offsetWidth;
      redbox.classList.add('bounce-enter');
      clock.classList.add('bounce-enter');

    } else if (p2 === 0 && inSlot2) {
      inSlot2 = false;
      redbox.classList.remove('bounce-enter');
      clock.classList.remove('bounce-enter');
      redbox.style.transform = 'translateX(-50%) translateY(0)';
      redbox.style.opacity   = '1';
      clock.style.transform  = 'translateX(-50%) translateY(0)';
      clock.style.opacity    = '1';
      void redbox.offsetWidth; void clock.offsetWidth;
      redbox.classList.add('bounce-exit');
      clock.classList.add('bounce-exit');
    }
  }

  // ── IMAGE OBSERVER: only enable scroll while image is fully visible ──
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio === 1) {
        // image 100% visible → start listening
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // optional: run immediately
      } else {
        // image not fully visible → stop listening
        window.removeEventListener('scroll', handleScroll);
      }
    });
  }, { threshold: 1.0 });

  imgObserver.observe(image);

  // ── 3) GLOW INTERSECTION (unchanged) ───────────────────────────────
  const card     = document.getElementById('card');
  const glowObs  = new IntersectionObserver(entries => {
    entries.forEach(e => card.classList.toggle('glow', e.isIntersecting));
  }, { threshold: 0.5 });
  glowObs.observe(card);
});
