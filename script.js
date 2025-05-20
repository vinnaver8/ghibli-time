document.addEventListener('DOMContentLoaded', () => {
  const card1    = document.getElementById('card-1');
  const card2    = document.getElementById('card-2');
  const trigger  = document.getElementById('swap-trigger');

  // (Optional) initialize Rive
  let riveInput = null;
  if (window.Rive) {
    const rive = new Rive({
      src: 'cards.riv',
      canvas: document.getElementById('rive-canvas'),
      stateMachines: 'SM',
      autoplay: true
    });
    riveInput = rive.stateMachineInputs('SM')
                    .find(i => i.name === 'change');
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // show card-1
        card1.classList.add('active');
        card2.classList.remove('active');
        if (riveInput) riveInput.value = false;
      } else {
        // show card-2
        card1.classList.remove('active');
        card2.classList.add('active');
        if (riveInput) riveInput.value = true;
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -50% 0px',  // fire when trigger crosses mid-viewport
    threshold: 0
  });

  obs.observe(trigger);
});
