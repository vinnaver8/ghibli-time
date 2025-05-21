(function() {
  const section = document.querySelector('.metabrain');
  const card    = document.getElementById('card-wrapper');
  if (!section || !card) return;

  let sectionTop, sectionHeight, startY, endY;

  // Recompute on load & resize
  function recalc() {
    const rect = section.getBoundingClientRect();
    sectionTop    = rect.top + window.scrollY;
    sectionHeight = section.offsetHeight;
    // we want the card to move its center from the top of the section...
    startY = sectionTop;
    // ...down until the bottom of the section
    endY   = sectionTop + sectionHeight;
  }

  function onScroll() {
    const scrollY = window.scrollY + window.innerHeight / 2; // use viewport center
    // clamp between startY and endY
    const clamped = Math.max(startY, Math.min(scrollY, endY));
    // set the card's top relative to the section
    // subtract sectionTop so top:0 aligns card-center to sectionTop
    card.style.top = (clamped - sectionTop) + 'px';
  }

  window.addEventListener('load', () => {
    recalc();
    onScroll();
  });
  window.addEventListener('resize', () => {
    recalc();
    onScroll();
  });
  window.addEventListener('scroll', onScroll, { passive: true });
})();
