 (function() {
      const container = document.getElementById('scroll-container');
      const vh = window.innerHeight;
      const maxScroll = () => container.offsetHeight - vh;

        const slot1Els = ['h1','b1','b2','a1','a2']
        .map(id => document.getElementById(id));

      const slot2Els = ['b3','a3']
        .map(id => document.getElementById(id));

      const redbox = document.getElementById('redbox');
      const clock  = document.getElementById('clock-icon');
      let inSlot2  = false;

      function update() {
        const scrollY = window.scrollY;
        const prog    = Math.min(Math.max(scrollY / maxScroll(), 0), 1);
        const half    = 0.5;

        const p1 = Math.min(Math.max((prog - 0) / half, 0), 1);
         const p2 = Math.min(Math.max((prog - half) / half, 0), 1);
slot1Els.forEach(el => {
          if (p1 === 0) {
            el.style.transform = 'translateY(0)';
            el.style.opacity   = '1';
          } else {
            el.style.transform = `translateY(${-100 * p1}px)`;
            el.style.opacity   = `${1 - p1}`;
          }
        });
        document.getElementById('t1').style.opacity = (prog < 0.5 ? '1' : '0');
        document.getElementById('p1').style.opacity = (prog < 0.5 ? '1' : '0');
 slot2Els.forEach(el => {
          if (p2 === 0) {
            el.style.transform = 'translateY(-80px)';
            el.style.opacity   = '0';
          } else {
            const translateY = -80 + 80 * p2; 
            el.style.transform = `translateY(${translateY}px)`;
            el.style.opacity   = `${p2}`;
          }
        });
        document.getElementById('t2').style.opacity = (prog >= 0.5 ? '1' : '0');
        document.getElementById('p2').style.opacity = (prog >= 0.5 ? '1' : '0');

        if (p2 > 0 && !inSlot2) {
          inSlot2 = true;

          redbox.classList.remove('bounce-exit');
          clock.classList.remove('bounce-exit');
redbox.style.transform = 'translateX(-50%) translateY(80px)';
          redbox.style.opacity   = '0';
          clock.style.transform  = 'translateX(-50%) translateY(80px)';
          clock.style.opacity    = '0';
void redbox.offsetWidth;
          void clock.offsetWidth;

          redbox.classList.add('bounce-enter');
          clock.classList.add('bounce-enter');

        } else if (p2 === 0 && inSlot2) {
           inSlot2 = false;

           redbox.classList.remove('bounce-enter');
          clock.classList.remove('bounce-enter');

           redbox.style.transform = 'translateX(-50%) translateY(0)';
          redbox.style.opacity   = '1';
          clock.style.transform  = 'translateX(-50%) translateY(0)';
          clock.style.opacity    = '1';
void redbox.offsetWidth;
          void clock.offsetWidth;
redbox.classList.add('bounce-exit');
          clock.classList.add('bounce-exit');
        }
      }

      window.addEventListener('scroll', update);
      window.addEventListener('resize', update);
      update();
    })();
    document.addEventListener("DOMContentLoaded", function() {
      const card = document.getElementById("card");
const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              card.classList.add("glow");
            } else {
              card.classList.remove("glow");
            }
          });
        },
        {
          root: null,    // viewport
          threshold: 0.5 // 50% of card visible
        }
      );
observer.observe(card);
    });
