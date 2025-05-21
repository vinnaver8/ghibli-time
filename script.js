(function() {
  const section = document.querySelector('.metabrain');
  const card    = document.getElementById('card-wrapper');
  if (!section || !card) return;

  let sectionTop, sectionHeight, cardHeight;

  function recalc() {
    const rect = section.getBoundingClientRect();
    sectionTop    = rect.top + window.scrollY;
    sectionHeight = section.offsetHeight;
    cardHeight    = card.offsetHeight;
    update(); 
  }

  function update() {
    const scrollY = window.scrollY;
    const vpCenter = scrollY + window.innerHeight / 2;

    const startLimit = sectionTop + cardHeight / 2;
    const endLimit   = sectionTop + sectionHeight - cardHeight / 2;

    let topValue;

    if (vpCenter < startLimit) {
      // Before section: stick to top of section
      topValue = 0;
    } else if (vpCenter > endLimit) {
      // After section: stick to bottom of section
      topValue = sectionHeight - cardHeight;
    } else {
      // In range: center card in viewport
      topValue = vpCenter - sectionTop - (cardHeight / 2);
    }

    card.style.top = `${topValue}px`;
  }

  window.addEventListener('load', recalc);
  window.addEventListener('resize', recalc);
  window.addEventListener('scroll', update, { passive: true });
})();
