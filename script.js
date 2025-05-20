
(function() {
  const container = document.getElementById('card-container');
  const card      = document.getElementById('scroll-card');

  // Once the page is fully loaded, measure heights
  window.addEventListener('load', init);
  function init() {
    const containerRect = container.getBoundingClientRect();
    // Container’s top relative to document
    const startY = containerRect.top + window.scrollY;
    // How far the card can move before its bottom hits container bottom
    const maxTranslate = container.offsetHeight - card.offsetHeight;

    let lastY   = 0;
    let ticking = false;

    function update() {
      // How far we've scrolled past the container top
      const scrolled = lastY - startY;
      // Clamp between 0 (no move) and maxTranslate
      const offset = Math.max(0, Math.min(scrolled, maxTranslate));
      // Move the card **down** as you scroll **down**, up when you scroll up
      card.style.transform = `translateY(${offset}px)`;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      lastY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }
})();
