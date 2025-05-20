gsap.registerPlugin(ScrollTrigger);
gsap.to("#scroll-card", {
    y: 1700, // Total movement: 2700 - 1000 = 1700 pixels
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: () => `+=${document.body.scrollHeight - window.innerHeight}`,
        scrub: true,
        onUpdate: (self) => {
            const scrollY = window.scrollY;
            let offset = 0;
            if (scrollY >= 1000 && scrollY <= 2700) {
                offset = (scrollY - 1000) * 0.5; // Parallax effect
            } else if (scrollY > 2700) {
                offset = (2700 - 1000) * 0.5; // Stay at maximum offset
            }
            gsap.set("#scroll-card", { y: offset });
        }
    }
});
