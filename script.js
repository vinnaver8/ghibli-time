document.addEventListener('DOMContentLoaded', () => {
  const trigger      = document.getElementById('knowledge');     // RIGHT-HAND SECTION
  const wrapper      = document.getElementById('team-wrapper');  // your tall 2600px box
  const stickyCard   = document.getElementById('sticky-card');
  const slot1Els     = ['h1','b1','b2','a1','a2'].map(id => document.getElementById(id));
  const slot2Els     = ['b3','a3'].map(id => document.getElementById(id));
  const redbox       = document.getElementById('redbox');
  const clock        = document.getElementById('clock-icon');
  let inSlot2        = false;

  // PIXEL OFFSETS
  const slot1EndY    = 1830;  // where slot-1 ends (window.scrollY)
  const slot2EndY    = 2600;  // where slot-2/card stops
  const startOffset  = trigger.offsetTop;  // start when #knowledge hits top

  const cardHeight   = stickyCard.offsetHeight;
  const clamp        = (v,min,max) => v<min?min:v>max?max:v;

  function update() {
    const y = window.scrollY;

    // ── 1) LOCK until #knowledge hits top ───────────────────────
    // marchY is zero until we hit startOffset
    let marchY = 0;
    if (y >= startOffset) {
      // then march until slot2EndY
      marchY = clamp(y - startOffset, 0, slot2EndY - startOffset - cardHeight);
    }
    stickyCard.style.position = 'absolute';
    stickyCard.style.top      = marchY + 'px';


    // ── 2) SLOT PROGRESS ──────────────────────────────────────
    const p1 = clamp((y - startOffset) / (slot1EndY - startOffset), 0, 1);
    const p2 = clamp((y - slot1EndY) / (slot2EndY - slot1EndY),   0, 1);

    // slot-1
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

    // slot-2
    slot2Els.forEach(el => {
      if (p2 === 0) {
        el.style.transform = 'translateY(-80px)';
        el.style.opacity   = '0';
      } else {
        el.style.transform = `translateY(${-80 + 80 * p2}px)`;
        el.style.opacity   = `${p2}`;
      }
    });
    document.getElementById('t2').style.opacity = p2 > 0 ? '1' : '0';
    document.getElementById('p2').style.opacity = p2 > 0 ? '1' : '0';

    // bounce
    if (p2 > 0 && !inSlot2) {
      inSlot2 = true;
      redbox.classList.remove('bounce-exit');
      clock .classList.remove('bounce-exit');
      redbox.style.transform = 'translateX(-50%) translateY(80px)';
      clock .style.transform = 'translateX(-50%) translateY(80px)';
      redbox.style.opacity   = clock.style.opacity = '0';
      void redbox.offsetWidth; void clock.offsetWidth;
      redbox.classList.add('bounce-enter');
      clock .classList.add('bounce-enter');

    } else if (p2 === 0 && inSlot2) {
      inSlot2 = false;
      redbox.classList.remove('bounce-enter');
      clock .classList.remove('bounce-enter');
      redbox.style.transform = 'translateX(-50%) translateY(0)';
      clock .style.transform = 'translateX(-50%) translateY(0)';
      redbox.style.opacity   = clock.style.opacity = '1';
      void redbox.offsetWidth; void clock.offsetWidth;
      redbox.classList.add('bounce-exit');
      clock .classList.add('bounce-exit');
    }
  }

  window.addEventListener('scroll', update);
  update();

  // ── 3) KEEP YOUR GLOW LOGIC ───────────────────────────────
  const card = document.getElementById('card');
  new IntersectionObserver(entries => {
    entries.forEach(e => card.classList.toggle('glow', e.isIntersecting));
  }, { threshold: 0.5 }).observe(card);
});
