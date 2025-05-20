// JavaScript: Smoothly center #sticky-card between scrollY 950 and 2600
const card = document.getElementById('sticky-card');
const startY = 950;
const endY   = 2600;
let isAutoScrolling = false;

// Use a scroll event (throttled via requestAnimationFrame for performance9)
let ticking = false;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll(scrollY);
      ticking = false;
    });
    ticking = true;
  }
});

function handleScroll(scrollY) {
  // If we are already auto-scrolling, skip to avoid recursion
  if (isAutoScrolling) return;

  // In the sticky range: fix card at center of viewport
  if (scrollY >= startY && scrollY <= endY) {
    card.style.position = 'fixed';
    card.style.top = '50%';
    card.style.transform = 'translateY(-50%)';

    // Detect if card is touching viewport edges
    const rect = card.getBoundingClientRect();
    if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
      // Smoothly scroll the document to center the card10
      isAutoScrolling = true;
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // End auto-scroll flag after animation completes (~0.5s)
      setTimeout(() => { isAutoScrolling = false; }, 500);
    }

  } else {
    // Outside the range: restore normal flow at boundary
    card.style.position = 'absolute';
    card.style.transform = 'translateY(0)';

    if (scrollY < startY) {
      // Before start: pin at startY (so it hasn't yet come into view)
      card.style.top = `${startY}px`;
    } else {
      // After end: pin at endY (so it won't scroll past this point)
      card.style.top = `${endY}px`;
    }
  }
}
