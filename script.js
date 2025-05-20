// script.js
document.addEventListener('DOMContentLoaded', () => {
  const card    = document.getElementById('card');
  const startY  = 950;
  const endY    = startY + 2600; // = 3550
  let ticking   = false;
  let autoScroll = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll(window.scrollY);
        ticking = false;
      });
      ticking = true;
    }
  });

  function handleScroll(scrollY) {
    if (autoScroll) return;

    if (scrollY >= startY && scrollY <= endY) {
      // 1) fix to center
      card.style.position  = 'fixed';
      card.style.top       = '50%';
      card.style.transform = 'translateY(-50%)';

      // 2) if it ever drifts off (due to fast scroll), re-center
      const rect = card.getBoundingClientRect();
      if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
        autoScroll = true;
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => autoScroll = false, 600);
      }

    } else {
      // outside range → absolute back in flow
      card.style.position  = 'absolute';
      card.style.transform = 'none';

      if (scrollY < startY) {
        card.style.top = `${startY}px`;
      } else {
        card.style.top = `${endY}px`;
      }
    }
  }

  // (your slot-1/slot-2 animations & intersection observers stay unchanged)
});
