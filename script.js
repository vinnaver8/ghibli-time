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
