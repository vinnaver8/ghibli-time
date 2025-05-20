// Select your card element (replace '.card' with your card's selector)
const card = document.querySelector('.card');

const CARD_START = 950;   // px from top where scrolling starts
const CARD_END = 2600;    // px from top where scrolling ends

let isTouching = false;
let touchStartY = 0;
let scrollStartY = 0;

// Function to clamp a value between min and max
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

// Scroll handler for smooth pinning within limits
function handleScroll() {
  const scrollY = window.scrollY;
  // Card position relative to viewport
  const cardRect = card.getBoundingClientRect();
  const cardTopInDoc = scrollY + cardRect.top;
  
  if (cardTopInDoc < CARD_START) {
    // If card above start, pin to START
    window.scrollTo({ top: CARD_START - cardRect.top, behavior: "smooth" });
  } else if (cardTopInDoc > CARD_END) {
    // If card below end, pin to END
    window.scrollTo({ top: CARD_END - cardRect.top, behavior: "smooth" });
  }
}

// Touch start
card.addEventListener('touchstart', function(e) {
  isTouching = true;
  touchStartY = e.touches[0].clientY;
  scrollStartY = window.scrollY;
});

// Touch move
card.addEventListener('touchmove', function(e) {
  if (!isTouching) return;
  e.preventDefault();
  const touchY = e.touches[0].clientY;
  const deltaY = touchStartY - touchY;
  let targetScroll = scrollStartY + deltaY;
  targetScroll = clamp(targetScroll, CARD_START, CARD_END);
  window.scrollTo({ top: targetScroll, behavior: "smooth" });
}, { passive: false });

// Touch end
card.addEventListener('touchend', function(e) {
  isTouching = false;
});

// Optional: For mouse dragging too
let isDragging = false;
let mouseStartY = 0;
let mouseScrollStartY = 0;

card.addEventListener('mousedown', function(e) {
  isDragging = true;
  mouseStartY = e.clientY;
  mouseScrollStartY = window.scrollY;
  document.body.style.userSelect = 'none';
});

window.addEventListener('mousemove', function(e) {
  if (!isDragging) return;
  const deltaY = mouseStartY - e.clientY;
  let targetScroll = mouseScrollStartY + deltaY;
  targetScroll = clamp(targetScroll, CARD_START, CARD_END);
  window.scrollTo({ top: targetScroll, behavior: "smooth" });
});

window.addEventListener('mouseup', function(e) {
  isDragging = false;
  document.body.style.userSelect = '';
});

// Listen for scroll to keep card within limits
window.addEventListener('scroll', handleScroll);

// Initial pin
handleScroll();
