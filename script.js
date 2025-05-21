 const card = document.getElementById('card-wrapper');
  let direction = 1;
  let position = 100; // start at 150px
  const minY = 100;
  const maxY = 1500;
  const speed = 0.8; // adjust for slower/faster

  function animate() {
    position += direction * speed;

    if (position >= maxY || position <= minY) {
      direction *= -1; // reverse direction
    }

    card.style.top = position + "px";
    requestAnimationFrame(animate);
  }

  // Start animation when DOM is ready
  window.addEventListener('DOMContentLoaded', animate);
