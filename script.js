// script.js
document.addEventListener('DOMContentLoaded', () => {
  // ① grab your wrapper and the sticky card
  const wrapper     = document.getElementById('team-wrapper');     // the 2600px-tall container
  const stickyCard  = document.getElementById('sticky-card');     // the element you want to march
  const container   = document.getElementById('scroll-container'); // where your animations live

  // ② grab all anim elements
  const slot1Els = ['h1','b1','b2','a1','a2'].map(id => document.getElementById(id));
  const slot2Els = ['b3','a3'].map(id => document.getElementById(id));
  const redbox   = document.getElementById('redbox');
  const clock    = document.getElementById('clock-icon');
  let inSlot2    = false;

  // ③ measurements that change on resize
  let vh           = window.innerHeight;
  const wrapperTop = wrapper.offsetTop;
  const wrapperH   = wrapper.offsetHeight;
  const cardH      = stickyCard.offsetHeight;
  const maxMarch   = wrapperH - cardH;              // how far the card can march
  const maxProg    = container.offsetHeight - vh;   // how far to scroll for prog=1

  // clamp helper
  const clamp = (v, min, max) => v < min ? min : v > max ? max : v;

  function update() {
    const scrollY = window.scrollY;

    // ─── marching logic ────────────────────────────────────────────
    let marchY;
    if (scrollY < wrapperTop) {
      marchY = 0;
    } else if (scrollY > wrapperTop + maxMarch) {
      marchY = maxMarch;
    } else {
      marchY = scrollY - wrapperTop;
    }
    stickyCard.style.position = 'absolute';
    stickyCard.style.top      = marchY + 'px';

    // ─── slot animations logic ────────────────────────────────────
    // prog goes 0→1 over the container’s scrollable height
    const localScroll = scrollY - wrapperTop;
    const prog = clamp(localScroll / maxProg, 0, 1);
    const half = 0.5;

    // slot1 (first half)
    const p1 = clamp((prog - 0) / half, 0, 1);
    slot1Els.forEach(el => {
      if (p1 === 0) {
        el.style.transform = 'translateY(0)';
        el.style.opacity   = '1';
      } else {
        el.style.transform = `translateY(${-100 * p1}px)`;
        el.style.opacity   = `${1 - p1}`;
      }
    });
    document.getElementById('t1').style.opacity = prog < half ? '1' : '0';
    document.getElementById('p1').style.opacity = prog < half ? '1' : '0';

    // slot2 (second half)
    const p2 = clamp((prog - half) / half, 0, 1);
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
    document.getElementById('t2').style.opacity = prog >= half ? '1' : '0';
    document.getElementById('p2').style.opacity = prog >= half ? '1' : '0';

    // bounce enter/exit
    if (p2 > 0 && !inSlot2) {
      inSlot2 = true;
      redbox.classList.remove('bounce-exit');
      clock.classList.remove('bounce-exit');
      redbox.style.transform = 'translateX(-50%) translateY(80px)';
      redbox.style.opacity   = '0';
      clock.style.transform  = 'translateX(-50%) translateY(80px)';
      clock.style.opacity    = '0';
      void redbox.offsetWidth;
      void clock.offsetWidth;
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
      void redbox.offsetWidth;
      void clock.offsetWidth;
      redbox.classList.add('bounce-exit');
      clock.classList.add('bounce-exit');
    }
  }

  // recalc vh on resize, re-run update
  window.addEventListener('resize', () => { vh = window.innerHeight; update(); });
  window.addEventListener('scroll', update);
  update(); // initial

  // ─── glow-on-intersection (unchanged) ───────────────────────────
  const card = document.getElementById("card");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      card.classList.toggle("glow", entry.isIntersecting);
    });
  }, { root: null, threshold: 0.5 });
  observer.observe(card);
});
