// script.js
document.addEventListener('DOMContentLoaded', () => {
  // ① grab the new wrapper and inner container
  const wrapper   = document.getElementById('team-wrapper');
  const container = document.getElementById('scroll-container');

  // ② compute viewport height and max scroll length of the container
  let vh = window.innerHeight;
  const maxScroll = () => container.offsetHeight - vh;

  // ③ grab all the elements you animate
  const slot1Els = ['h1','b1','b2','a1','a2']
    .map(id => document.getElementById(id));
  const slot2Els = ['b3','a3']
    .map(id => document.getElementById(id));
  const redbox = document.getElementById('redbox');
  const clock  = document.getElementById('clock-icon');
  let inSlot2  = false;

  // ④ measure the Y at which we start and end
  function getBounds() {
    const startY = wrapper.offsetTop;
    const endY   = startY + wrapper.offsetHeight - vh;
    return { startY, endY };
  }

  function update() {
    const { startY, endY } = getBounds();
    const scrollY = window.scrollY;

    // localScroll = how far we've scrolled *into* the wrapper
    const localScroll = scrollY - startY;
    // progress 0→1 over the container’s scrollable height
    const prog = Math.min(Math.max(localScroll / maxScroll(), 0), 1);
    const half = 0.5;

    // SLOT 1 animations (first half)
    const p1 = Math.min(Math.max((prog - 0) / half, 0), 1);
    slot1Els.forEach(el => {
      if (p1 === 0) {
        el.style.transform = 'translateY(0)';
        el.style.opacity   = '1';
      } else {
        el.style.transform = `translateY(${-100 * p1}px)`;
        el.style.opacity   = `${1 - p1}`;
      }
    });
    document.getElementById('t1').style.opacity = (prog <  half ? '1' : '0');
    document.getElementById('p1').style.opacity = (prog <  half ? '1' : '0');

    // SLOT 2 animations (second half)
    const p2 = Math.min(Math.max((prog - half) / half, 0), 1);
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
    document.getElementById('t2').style.opacity = (prog >= half ? '1' : '0');
    document.getElementById('p2').style.opacity = (prog >= half ? '1' : '0');

    // BOUNCE-in/out for redbox & clock
    if (p2 > 0 && !inSlot2) {
      inSlot2 = true;
      redbox.classList.remove('bounce-exit');
      clock.classList.remove('bounce-exit');
      redbox.style.transform = 'translateX(-50%) translateY(80px)';
      redbox.style.opacity   = '0';
      clock.style.transform  = 'translateX(-50%) translateY(80px)';
      clock.style.opacity    = '0';
      void redbox.offsetWidth;  // force reflow
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

  // recalc on resize (vh changes) and hook scroll
  window.addEventListener('resize', () => { vh = window.innerHeight; update(); });
  window.addEventListener('scroll', update);
  update();


  // ─── your glow-on-intersection code ─────────────────────────────────────
  const card = document.getElementById("card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      card.classList.toggle("glow", entry.isIntersecting);
    });
  }, {
    root: null,
    threshold: 0.5
  });
  observer.observe(card);
});
