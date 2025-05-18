window.onload = () => {
  anime({
    targets: '#cursor1',
    translateX: [ -100, 40 ],
    translateY: [ -100, 10 ],
    rotate: 45,
    duration: 1500,
    easing: 'easeOutExpo'
  });

  anime({
    targets: '#cursor2',
    translateX: [ 300, 160 ],
    translateY: [ -150, 20 ],
    rotate: -20,
    duration: 1800,
    easing: 'easeOutExpo',
    delay: 200
  });
};
