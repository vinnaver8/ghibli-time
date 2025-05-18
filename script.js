window.onload = () => {
  // Cursor 1 (John S.)
  anime.timeline()
    .add({
      targets: '#cursor1',
      translateX: [10, 40],
      translateY: [-45, 10],
      rotate: [0, 45],
      duration: 1500,
      easing: 'easeOutExpo'
    });

  // Cursor 2 (Lillanna)
  anime.timeline({ delay: 200 })
    .add({
      targets: '#cursor2',
      translateX: [200, 160],
      translateY: [-45, 20],
      rotate: [0, -20],
      duration: 1800,
      easing: 'easeOutExpo'
    });
};
function moveToSlot1() {
  const slot1 = document.getElementById('slot1');
  const slot2 = document.getElementById('slot2');
  const content = document.getElementById('yourRedBox');

  slot1.appendChild(content); // move instantly
  content.classList.remove('glow-box'); // remove glow and animation
}
