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
  const y = window.scrollY;
  const scrollToFix = wrapperTop + (cardH / 2); // where card center aligns with screen center
  const lockBottomY = slot2EndOffset - cardH;

  const centerY = (vh - cardH) / 2;

  if (y < scrollToFix - centerY) {
    // Before center align point: pin to wrapper top
    stickyCard.style.position = 'absolute';
    stickyCard.style.top = `0px`;
  } else if (y >= scrollToFix - centerY && y < lockBottomY - wrapperTop) {
    // While centered in viewport
    stickyCard.style.position = 'fixed';
    stickyCard.style.top = `${centerY}px`;
  } else {
    // After scroll limit: stick to bottom of wrapper
    const bottomPos = lockBottomY - wrapperTop;
    stickyCard.style.position = 'absolute';
    stickyCard.style.top = `${bottomPos}px`;
  }

  // SLOT 1 & 2 animations (unchanged)
  const p1 = clamp((y - wrapperTop) / (slot1EndOffset - wrapperTop), 0, 1);
  const p2 = clamp((y - slot1EndOffset) / (slot2EndOffset - slot1EndOffset), 0, 1);

  slot1Els.forEach(el => {
    el.style.transform = `translateY(${-100 * p1}px)`;
    el.style.opacity = `${1 - p1}`;
  });
  document.getElementById('t1').style.opacity = p1 < 1 ? '1' : '0';
  document.getElementById('p1').style.opacity = p1 < 1 ? '1' : '0';

  slot2Els.forEach(el => {
    const ty = -80 + 80 * p2;
    el.style.transform = `translateY(${ty}px)`;
    el.style.opacity = `${p2}`;
  });
  document.getElementById('t2').style.opacity = p2 > 0 ? '1' : '0';
  document.getElementById('p2').style.opacity = p2 > 0 ? '1' : '0';

  if (p2 > 0 && !inSlot2) {
    inSlot2 = true;
    redbox.classList.remove('bounce-exit');
    clock.classList.remove('bounce-exit');
    redbox.style.transform = 'translateX(-50%) translateY(80px)';
    clock.style.transform = 'translateX(-50%) translateY(80px)';
    redbox.style.opacity = clock.style.opacity = '0';
    void redbox.offsetWidth; void clock.offsetWidth;
    redbox.classList.add('bounce-enter');
    clock.classList.add('bounce-enter');

  } else if (p2 === 0 && inSlot2) {
    inSlot2 = false;
    redbox.classList.remove('bounce-enter');
    clock.classList.remove('bounce-enter');
    redbox.style.transform = 'translateX(-50%) translateY(0)';
    clock.style.transform = 'translateX(-50%) translateY(0)';
    redbox.style.opacity = clock.style.opacity = '1';
    void redbox.offsetWidth; void clock.offsetWidth;
    redbox.classList.add('bounce-exit');
    clock.classList.add('bounce-exit');
  }
      }
  

  // recalc on resize
  window.addEventListener('resize', () => {
    vh    = window.innerHeight;
    cardH = stickyCard.offsetHeight;
    update();
  });

  window.addEventListener('scroll', update);
  update();

  // — 3) GLOW INTERSECTION ——————————————
  const card = document.getElementById('card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => card.classList.toggle('glow', e.isIntersecting));
  }, { threshold: 0.5 });
  observer.observe(card);
});
