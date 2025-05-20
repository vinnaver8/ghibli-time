(function () {
  const container = document.getElementById('card-container');
  const card = document.getElementById('scroll-card');

  window.addEventListener('load', () => {
    const startY = 1100;
    const endY = 3000;
    const maxTranslate = endY - startY;

    let ticking = false;

    function update() {
      const scrollY = window.scrollY;

      if (scrollY < startY) {
        card.style.transform = 'translateY(0px)';
      } else if (scrollY > endY) {
        card.style.transform = `translateY(${maxTranslate}px)`;
      } else {
        const offset = scrollY - startY;
        card.style.transform = `translateY(${offset}px)`;
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  });
})();
