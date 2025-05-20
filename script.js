document.addEventListener('DOMContentLoaded', () => {
  // —— CONFIG —— (tweak these)
  const slot1EndOffset = 1830; // scrollY where slot-1 ends
  const slot2EndOffset = 2600; // scrollY where slot-2/card stops
  // ——————

  // grab elements
  const wrapper    = document.getElementById('team-wrapper');
  const stickyCard = document.getElementById('sticky-card');
  const slot1Els   = ['h1','b1','b2','a1','a2'].map(id => document.getElementById(id));
  const slot2Els   = ['b3','a3'].map(id => document.getElementById(id));
  const redbox     = document.getElementById('redbox');
  const clock      = document.getElementById('clock-icon');
  let inSlot2      = false;

  // measurements
  const wrapperTop = wrapper.offsetTop;
  let vh           = window.innerHeight;
  let cardH        = stickyCard.offsetHeight;

  // clamp helper
  const clamp = (v, min, max) => v < min ? min : v > max ? max : v;
  function update() {
  const y       = window.scrollY;
  const vh      = window.innerHeight;
  const wrapper = document.getElementById('team-wrapper');
  const card    = document.getElementById('sticky-card');
  const wrapperTop    = 950;    // start of the scroll window
  const wrapperHeight = 2600;   // total scroll window size
  const slot1End      = 1775;   // halfway → end of slot1
  const slot2End      = 2600;   // end of slot2 = wrapperTop + wrapperHeight
  const cardH         = card.offsetHeight;

  // Hide until we reach wrapperTop
  if (y < wrapperTop) {
    card.style.visibility = 'hidden';
    return;
  } else {
    card.style.visibility = 'visible';
  }

  // Compute “ideal” top within wrapper so that card's center == viewport center:
  //   topPos = (scrollY - wrapperTop) + (vh/2 - cardH/2)
  let topPos = (y - wrapperTop) + (vh/2 - cardH/2);

  // Clamp so the card never moves above wrapper nor below its bottom:
  topPos = Math.max(0, Math.min(topPos, wrapperHeight - cardH));

  // Apply positioning:
  card.style.position = 'absolute';
  card.style.top      = `${topPos}px`;

  // — Slot animations —

  // slot-1 progress: 950 → 1775 maps 0→1
  const p1 = Math.min(Math.max((y - wrapperTop) / (slot1End - wrapperTop), 0), 1);
  // slot-2 progress: 1775 → 2600 maps 0→1
  const p2 = Math.min(Math.max((y - slot1End) / (slot2End - slot1End), 0), 1);

  // slot1 elements
  const slot1Els = ['h1','b1','b2','a1','a2'].map(id => document.getElementById(id));
  slot1Els.forEach(el => {
    el.style.transform = `translateY(${-100 * p1}px)`;
    el.style.opacity   = `${1 - p1}`;
  });
  document.getElementById('t1').style.opacity = p1 < 1 ? '1' : '0';
  document.getElementById('p1').style.opacity = p1 < 1 ? '1' : '0';

  // slot2 elements
  const slot2Els = ['b3','a3'].map(id => document.getElementById(id));
  slot2Els.forEach(el => {
    const ty = -80 + 80 * p2;
    el.style.transform = `translateY(${ty}px)`;
    el.style.opacity   = `${p2}`;
  });
  document.getElementById('t2').style.opacity = p2 > 0 ? '1' : '0';
  document.getElementById('p2').style.opacity = p2 > 0 ? '1' : '0';

  // bounce logic (if you have it)
  const redbox = document.getElementById('redbox');
  const clock  = document.getElementById('clock-icon');
  if (p2 > 0 && !redbox.classList.contains('bounce-enter')) {
    redbox.classList.remove('bounce-exit');
    clock.classList.remove('bounce-exit');
    redbox.offsetWidth; clock.offsetWidth;
    redbox.classList.add('bounce-enter');
    clock .classList.add('bounce-enter');
  } else if (p2 === 0 && redbox.classList.contains('bounce-enter')) {
    redbox.classList.remove('bounce-enter');
    clock.classList.remove('bounce-enter');
    redbox.offsetWidth; clock.offsetWidth;
    redbox.classList.add('bounce-exit');
    clock .classList.add('bounce-exit');
  }
}

// Hook it up:
window.addEventListener('scroll', update);
window.addEventListener('resize', update);
update();

  // — 3) GLOW INTERSECTION ——————————————
  const card = document.getElementById('card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => card.classList.toggle('glow', e.isIntersecting));
  }, { threshold: 0.5 });
  observer.observe(card);
});
