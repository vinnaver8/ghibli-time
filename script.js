const cardInner = document.getElementById('cardInner');
  const startY = 950;
  const endY = 2600;
  const range = endY - startY;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY < startY) {
      cardInner.style.transform = 'translateY(0px)';
    } else if (scrollY > endY) {
      cardInner.style.transform = `translateY(${range}px)`;
    } else {
      const offset = scrollY - startY;
      cardInner.style.transform = `translateY(${offset}px)`;
    }
  });
