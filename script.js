(function () {
  const MAX_RETRIES = 10;
  let retryCount = 0;

  function initScrollAnimation() {
    const card = document.getElementById('card-wrapper');

    // Retry if element not found
    if (!card) {
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        return setTimeout(initScrollAnimation, 300);
      }
      console.error('Card wrapper not found.');
      return;
    }

    const MIN_TOP = 80;
    const MAX_TOP = 1500;
    const OFFSET = window.innerHeight / 2 - card.offsetHeight / 2;

    function updateCardPosition() {
      let scrollY = window.scrollY;
      let newTop = scrollY + OFFSET;

      // Clamp the top value within limits
      newTop = Math.max(MIN_TOP, Math.min(newTop, MAX_TOP));

      // Apply the new top position
      card.style.top = newTop + 'px';
    }

    // Initial run
    updateCardPosition();

    // Listen to scroll
    window.addEventListener('scroll', updateCardPosition, { passive: true });

    // Handle window resize
    window.addEventListener('resize', updateCardPosition);
  }

  // Wait for DOM content and images to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimation);
  } else {
    initScrollAnimation();
  }
})();
