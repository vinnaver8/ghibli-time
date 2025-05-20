// JavaScript: Scroll listener to move the card
(function() {
  const card = document.getElementById('scroll-card');
  const minScroll = 950;
  const maxScroll = 2600;
  const maxOffset = maxScroll - minScroll;
  let lastKnownScrollY = 0;
  let ticking = false;

  function updateCard(scrollY) {
    // Calculate offset only if above the start threshold
    let offset = 0;
    if (scrollY > minScroll) {
      offset = Math.min(scrollY - minScroll, maxOffset);
    }
    // Move the card by translating vertically (negative = move up)
    card.style.transform = `translateY(${-offset}px)`;
  }

  window.addEventListener('scroll', function() {
    lastKnownScrollY = window.scrollY;
    // Throttle updates using requestAnimationFrame for smooth animation910
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateCard(lastKnownScrollY);
        ticking = false;
      });
      ticking = true;
    }
  });
})();
