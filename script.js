window.onload = () => {
  // Cursor 1 (John S.)
  anime.timeline()
    .add({
      targets: '#cursor1',
      translateX: [ -100, 40 ],
      translateY: [ -100, 10 ],
      rotate: 45,
      duration: 1500,
      easing: 'easeOutExpo'
    })
    .add({
      targets: '#cursor1',
      translateX: 20,
      translateY: -30,
      rotate: 20,
      duration: 1000,
      easing: 'easeOutQuad'
    })
    .add({
      targets: '#cursor1',
      translateX: 10,
      translateY: -45,
      rotate: 0,
      duration: 800,
      easing: 'easeOutQuad'
    });

  // Cursor 2 (Lillanna)
  anime.timeline({ delay: 200 })
    .add({
      targets: '#cursor2',
      translateX: [ 300, 160 ],
      translateY: [ -150, 20 ],
      rotate: -20,
      duration: 1800,
      easing: 'easeOutExpo'
    })
    .add({
      targets: '#cursor2',
      translateX: 180,
      translateY: -30,
      rotate: -10,
      duration: 1000,
      easing: 'easeOutQuad'
    })
    .add({
      targets: '#cursor2',
      translateX: 200,
      translateY: -45,
      rotate: 0,
      duration: 800,
      easing: 'easeOutQuad'
    });
};
