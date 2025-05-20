
(function() {
  const card      = document.getElementById('scroll-card');
  const startY    = 950;              // scrollY where movement begins
  const endY      = 2600;             // scrollY where movement ends
  const maxOffset = endY - startY;    // total pixels of travel

  let lastY   = 0;
  let ticking = false;

  function update() {
    const y = lastY;
    let offset;

    if (y < startY) {
      offset = 0;
    } else if (y > endY) {
      offset = maxOffset;
    } else {
      offset = y - startY;
    }

    // Negative translateY = move card up as user scrolls down
    card.style.transform = `translateY(${-offset}px)`;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    lastY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();
