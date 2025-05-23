 const card = document.getElementById('card-wrapper');
  let direction = 1;
  let position = 100; // start at 150px
  const minY = 100;
  const maxY = 1200;
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
// Messages for each card
    const cardMessages = [
      ["Generating your resume...", "Analyzing skills...", "Resume ready!"],
      ["Selecting templates...", "Building website...", "Website deployed!"],
      ["Processing images...", "Applying filters...", "Image complete!"],
      ["Calculating routes...", "Optimizing directions...", "Map ready!"],
      ["Compiling invoice...", "Finalizing totals...", "Invoice created!"]
    ];
    const cards = Array.from(document.querySelectorAll('.card'));
    let currentIndex = 0;
    let isAnimating = false;

    // Function to type out messages in a given card index
    function typeCard(index) {
      const messages = cardMessages[index];
      const p = cards[index].querySelector('.typing-text');
      let msgIndex = 0, charIndex = 0;
      p.textContent = '';
      function typeChar() {
        const currentMsg = messages[msgIndex];
        if (charIndex < currentMsg.length) {
          p.textContent += currentMsg.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, 50);
        } else {
          // Pause and then show next message
          setTimeout(() => {
            msgIndex++;
            if (msgIndex < messages.length) {
              p.textContent = '';
              charIndex = 0;
              typeChar();
            }
          }, 800);
        }
      }
      typeChar();
    }

    // Show the first card and start typing
    cards[0].classList.remove('hidden');
    typeCard(0);

    // Function to move to the next card on scroll/click
    function nextCard() {
      if (isAnimating) return;
      if (currentIndex >= cards.length - 1) return;
      isAnimating = true;

      // Fold down current card
      const currentCard = cards[currentIndex];
      currentCard.classList.add('rotate-x-90');
      // After animation, hide it and show next card
      setTimeout(() => {
        currentCard.classList.add('hidden');
        currentIndex++;
        const nextCardElem = cards[currentIndex];
        nextCardElem.classList.remove('hidden');
        // Start typing on the new card
        typeCard(currentIndex);
        isAnimating = false;
      }, 700);
    }

    // Listen for scroll or click to trigger card transition
    window.addEventListener('wheel', nextCard);
    window.addEventListener('click', nextCard);

     //3rd box
const mainCard = document.querySelector('.main-card');
    const rightBoxes = document.querySelectorAll('.right-box');
    let animating = false;

    mainCard.addEventListener('click', () => {
      if (animating) return;
      animating = true;
      mainCard.classList.add('ring-4', 'ring-blue-400', 'ring-opacity-50');

      // Slide right-side boxes fully out to the LEFT
      rightBoxes.forEach(box => {
        box.style.transition = 'transform 0.8s ease';
        box.style.transform = 'translateX(-350%)';
      });

      // After sliding out, wait 1s then bring back in from right
      setTimeout(() => {
        // Prepare boxes off-screen at right
        rightBoxes.forEach(box => {
          box.style.transition = 'none';
          box.style.transform = 'translateX(600%)';
        });
        // Force reflow
        void rightBoxes[0].offsetWidth;
        // Slide back to original position
        rightBoxes.forEach(box => {
          box.style.transition = 'transform 0.7s ease';
          box.style.transform = 'translateX(0)';
        });
        // Cleanup after animation
        setTimeout(() => {
          mainCard.classList.remove('ring-4', 'ring-blue-400', 'ring-opacity-50');
          animating = false;
        }, 700);
      }, 1500); // 0.5s slide-out + 1s wait
    });
