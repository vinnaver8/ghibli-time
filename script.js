const card = document.getElementById('floatCard');
    let direction = 1;
    let posY = 0;

    function animateCard() {
      const scrollY = window.scrollY;
      if (scrollY >= 950 && scrollY <= 2600) {
        posY += 0.5 * direction;
        if (posY >= 30 || posY <= -30) direction *= -1;
        card.style.transform = `translateY(${posY}px)`;
        requestAnimationFrame(animateCard);
      } else {
        card.style.transform = 'translateY(0px)';
        posY = 0;
      }
    }

    window.addEventListener('scroll', () => {
      if (window.scrollY >= 950 && window.scrollY <= 2600) {
        animateCard();
      }
    });
 
