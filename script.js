(function () {
  const cardWrapper = document.getElementById("card-wrapper");
  const startY = 150;
  const endY = 1700;
  const cardHeight = 300; // must match your card height

  function onScroll() {
    const scrollY = window.scrollY + window.innerHeight / 2 - cardHeight / 2;

    if (scrollY < startY) {
      cardWrapper.style.top = `${startY}px`;
    } else if (scrollY > endY) {
      cardWrapper.style.top = `${endY}px`;
    } else {
      cardWrapper.style.top = `${scrollY}px`;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", onScroll);
})();
