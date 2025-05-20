document.addEventListener('DOMContentLoaded', () => {
  // ── CONFIGURE THESE to match your design ───────────────────────────
  const slot1EndOffset = 1830; // scrollY at which slot-1 ends (px)
  const slot2EndOffset = 2600; // scrollY at which the card stops (px)
  // ────────────────────────────────────────────────────────────────────

  // grab elements
  const wrapper    = document.getElementById('team-wrapper');
  const stickyCard = document.getElementById('sticky-card');
  const slot1Els   = ['h1','b1','b2','a1','a2'].map(id => document.getElementById(id));
  const slot2Els   = ['b3','a3'].map(id => document.getElementById(id));
  const redbox     = document.getElementById('redbox');
  const clock      = document.getElementById('clock-icon');
  let inSlot2      = false;

  // measurements
  const wrapperTop = wrapper.offsetTop;             // where the scroll window starts
  const cardH      = stickyCard.offsetHeight;      // ~300px

  // clamp helper
  const clamp = (v, min, max) => v < min ? min : v > max ? max : v;

  function update() {
    const y  = window.scrollY;
    const vh = window.innerHeight;

    // ── 1) CENTER-TRACKING MARCHING ───────────────────────────────────
    // Compute the “ideal” top so that card’s center aligns with viewport center:
    // 1) how far into the scroll window: y - wrapperTop
    // 2) offset to center it: vh/2 - cardH/2
    let topPos = (y - wrapperTop) + (vh / 2 - cardH / 2)+centeroffset;

    // Before the window: hide or pin off-screen
    if (y < wrapperTop) {
      stickyCard.style.visibility = 'hidden';
      topPos = 0;
    } else {
      stickyCard.style.visibility = 'visible';
    }

    // Clamp so it never moves above start or below end:
    const maxPos = (slot2EndOffset - wrapperTop) - cardH;
    topPos = clamp(topPos, 0, maxPos);

    // Apply absolute positioning:
    stickyCard.style.position = 'absolute';
    stickyCard.style.top      = `${topPos}px`;


    // ── 2) SLOT PROGRESS ──────────────────────────────────────────────
    const p1 = clamp((y - wrapperTop) / (slot1EndOffset - wrapperTop), 0, 1);
    const p2 = clamp((y - slot1EndOffset) / (slot2EndOffset - slot1EndOffset), 0, 1);

    // SLOT 1 animations
    slot1Els.forEach(el => {
      el.style.transform = `translateY(${-100 * p1}px)`;
      el.style.opacity   = `${1 - p1}`;
    });
    document.getElementById('t1').style.opacity = p1 < 1 ? '1' : '0';
    document.getElementById('p1').style.opacity = p1 < 1 ? '1' : '0';

    // SLOT 2 animations
    slot2Els.forEach(el => {
      const ty = -80 + 80 * p2;
      el.style.transform = `translateY(${ty}px)`;
      el.style.opacity   = `${p2}`;
    });
    document.getElementById('t2').style.opacity = p2 > 0 ? '1' : '0';
    document.getElementById('p2').style.opacity = p2 > 0 ? '1' : '0';

    // bounce-in / bounce-out
    if (p2 > 0 && !inSlot2) {
      inSlot2 = true;
      redbox.classList.remove('bounce-exit');
      clock.classList.remove('bounce-exit');
      void redbox.offsetWidth; void clock.offsetWidth;
      redbox.classList.add('bounce-enter');
      clock.classList.add('bounce-enter');

    } else if (p2 === 0 && inSlot2) {
      inSlot2 = false;
      redbox.classList.remove('bounce-enter');
      clock.classList.remove('bounce-enter');
      void redbox.offsetWidth; void clock.offsetWidth;
      redbox.classList.add('bounce-exit');
      clock.classList.add('bounce-exit');
    }
  }

  // hook events
  window.addEventListener('scroll', update);
  window.addEventListener('resize', update);
  update();


  // ── 3) GLOW INTERSECTION (unchanged) ───────────────────────────────
  const card = document.getElementById('card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => card.classList.toggle('glow', e.isIntersecting));
  }, { threshold: 0.5 });
  observer.observe(card);
});
