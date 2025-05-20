(function () {
  const container = document.getElementById('card-container');
  const card = document.getElementById('scroll-card');

  window.addEventListener('load', init);

  function init() {
    const sectionHeight = 2600; // Or: container.offsetHeight;
    const startPercent = 950 / sectionHeight;
    const endPercent = 1; // 100% scroll

    const startY = sectionHeight * startPercent;
    const endY = sectionHeight * endPercent;
    const maxTranslate = endY - startY;

    let lastY = 0;
    let ticking = false;

    function update() {
      const scrolled = lastY - startY;
      const offset = Math.max(0, Math.min(scrolled, maxTranslate));
      card.style.transform = `translateY(calc(-50% + ${offset}px))`;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      lastY = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }
})();
