document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('card');
  const startY = 1000; // Animation starts at 1000px scroll
  const endY = startY + 2600; // Adjust as needed for your effect
  let ticking = false;
  let autoScroll = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll(window.scrollY);
        ticking = false;
      });
      ticking = true;
    }
  });

  function handleScroll(scrollY) {
    if (autoScroll) return;

    if (scrollY >= startY && scrollY <= endY) {
      // Fix card to center of screen
      card.style.position = 'fixed';
      card.style.top = '50%';
      card.style.transform = 'translateY(-50%)';
      card.style.visibility = 'visible';

      // Re-center if scrolled too fast
      const rect = card.getBoundingClientRect();
      if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
        autoScroll = true;
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => autoScroll = false, 600);
      }
    } else {
      // Keep card always visible
      card.style.position = 'absolute';
      card.style.transform = 'none';
      card.style.visibility = 'visible';

      if (scrollY < startY) {
        card.style.top = `${startY}px`;
      } else {
        // After endY, keep card at endY (don't hide)
        card.style.top = `${endY}px`;
      }
    }
  }
});
