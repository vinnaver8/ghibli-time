(function() {
  const section = document.querySelector('.metabrain');
  const card    = document.getElementById('card-wrapper');

  if (!section || !card) return;

  let sectionTop, sectionHeight, cardHeight;

  function recalc() {
    const r = section.getBoundingClientRect();
    sectionTop    = r.top + window.scrollY;
    sectionHeight = section.offsetHeight;
    cardHeight    = card.offsetHeight;
    // Immediately update position in case of resize/late load
    update();
  }

  function update() {
    // Center of the viewport in document coords
    const viewportCenter = window.scrollY + window.innerHeight / 2;

    // Clamp to the section bounds
    const clampedCenter = Math.min(
      Math.max(viewportCenter, sectionTop),
      sectionTop + sectionHeight
    );

    // Compute card.top so the card's center = clampedCenter
    const top = clampedCenter - sectionTop - (cardHeight / 2);
    card.style.top = `${top}px`;
  }

  window.addEventListener('load', recalc);
  window.addEventListener('resize', recalc);
  window.addEventListener('scroll', update, { passive: true });
})();
