(function () {
  const section = document.querySelector('.metabrain');
  const card = document.getElementById('card-wrapper');
  if (!section || !card) return;

  let sectionTop = 0;
  let sectionHeight = 0;
  let cardHeight = 0;

  function recalc() {
    const rect = section.getBoundingClientRect();
    sectionTop = rect.top + window.scrollY;
    sectionHeight = section.offsetHeight;
    cardHeight = card.offsetHeight;
    update(); 
  }

  function update() {
    const scrollY = window.scrollY;
    const viewportCenter = scrollY + window.innerHeight / 2;

    const startLimit = sectionTop;
    const endLimit = sectionTop + sectionHeight;

    let topValue;

    if (viewportCenter <= startLimit + cardHeight / 2) {
      // Before section: lock to top
      topValue = 0;
    } else if (viewportCenter >= endLimit - cardHeight / 2) {
      // After section: lock to bottom
      topValue = sectionHeight - cardHeight;
    } else {
      // In-section: center card with viewport
      topValue = viewportCenter - sectionTop - cardHeight / 2;
    }

    card.style.top = `${topValue}px`;
  }

  window.addEventListener('load', recalc);
  window.addEventListener('resize', recalc);
  window.addEventListener('scroll', update, { passive: true });
})();
