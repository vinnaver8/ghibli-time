document.addEventListener('DOMContentLoaded', () => {
  // ── CONFIG ────────────────────────────────────────────────────────
  const slot1EndOffset = 1830; // scrollY at which slot-1 ends
  const slot2EndOffset = 2600; // scrollY at which the card stops
  // ──────────────────────────────────────────────────────────────────

  // grab elements
  const wrapper    = document.getElementById('team-wrapper');
  const stickyCard = document.getElementById('sticky-card');
  const slot1Els   = ['h1','b1','b2','a1','a2'].map(id => document.getElementById(id));
  const slot2Els   = ['b3','a3'].map(id => document.getElementById(id));
  const redbox     = document.getElementById('redbox');
  const clock      = document.getElementById('clock-icon');
  let inSlot2      = false;

  // clamp helper
  const clamp = (v, min, max) => v < min ? min : v > max ? max : v;

  function update() {
    const y         = window.scrollY;
    const wrapperTop= wrapper.offsetTop;
    const vh        = window.innerHeight;
    const cardH     = stickyCard.offsetHeight;

    // ── 1) HORIZONTAL CENTER + VERTICAL MARCHING ────────────────
    // compute ideal top so card center tracks viewport center:
    let topPos = (y - wrapperTop) + (vh/2 - cardH/2);

    // hide before start
    if (y < wrapperTop) {
      stickyCard.style.visibility = 'hidden';
      topPos = 0;
    } else {
      stickyCard.style.visibility = 'visible';
    }

    // clamp so it stops at slot2EndOffset
    const maxPos = (slot2EndOffset - wrapperTop) - cardH;
    topPos = clamp(topPos, 0, maxPos);

    // apply centering & position
    stickyCard.style.position = 'absolute';
    stickyCard.style.left     = '50%';
    stickyCard.style.transform= 'translateX(-50%)';
    stickyCard.style.top      = `${topPos}px`;


    // ── 2) SLOT-1 / SLOT-2 PROGRESS ───────────────────────────────
    const p1 = clamp((y - wrapperTop) / (slot1EndOffset - wrapperTop), 0, 1);
    const p2 = clamp((y - slot1EndOffset) / (slot2EndOffset - slot1EndOffset), 0, 1);

    // slot-1
    slot1Els.forEach(el => {
      el.style.transform = `translateY(${-100 * p1}px)`;
      el.style.opacity   = `${1 - p1}`;
    });
    document.getElementById('t1').style.opacity = p1 < 1 ? '1' : '0';
    document.getElementById('p1').style.opacity = p1 < 1 ? '1' : '0';

    // slot-2
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
      clock .classList.remove('bounce-exit');
      void redbox.offsetWidth; void clock.offsetWidth;
      redbox.classList.add('bounce-enter');
      clock .classList.add('bounce-enter');
    } else if (p2 === 0 && inSlot2) {
      inSlot2 = false;
      redbox.classList.remove('bounce-enter');
      clock .classList.remove('bounce-enter');
      void redbox.offsetWidth; void clock.offsetWidth;
      redbox.classList.add('bounce-exit');
      clock .classList.add('bounce-exit');
    }
  }

  // hook events
  window.addEventListener('scroll', update);
  window.addEventListener('resize', update);
  update();


  // ── 3) GLOW INTERSECTION (unchanged) ───────────────────────────
  const card = document.getElementById('card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => card.classList.toggle('glow', e.isIntersecting));
  }, { threshold: 0.5 });
  observer.observe(card);
});
