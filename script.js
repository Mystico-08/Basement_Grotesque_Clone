history.scrollRestoration = "manual";
window.onload = function(){
  window.scrollTo(0, 0);
};



function Clock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById('clock').textContent = time;
}
Clock();
setInterval(Clock, 1000);



window.addEventListener("load", () => {
  const texts = document.querySelectorAll(".hero-text");

  texts.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("show");
    }, i * 400);
  });
});

const btn = document.getElementById("viewBtn");
const grid = document.getElementById("grid");

btn.addEventListener("click", () => {
  grid.classList.add("open");
  btn.style.display = "none";
});


const buttons = document.querySelectorAll('.button');
const toast = document.getElementById('toast');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.textContent;

        navigator.clipboard.writeText(text).then(() => {
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 1000);
        });
    });
});


const elements = document.querySelectorAll('.animate,.Section-7,.section-5');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      entry.target.style.transitionDelay = '0s';
    }
  });
}, { threshold: 0.2 });

elements.forEach((el) => {
  el.style.transitionDelay = '0s';
  observer.observe(el);
});


const capitalLetters = document.querySelectorAll(".capital div");

const capitalObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      capitalLetters.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("show");
        }, index * 50);
      });

      capitalObserver.disconnect(); 
    }
  });
}, { threshold: 0.1 });

const capitalSection = document.querySelector(".capital");
if (capitalSection) capitalObserver.observe(capitalSection);



const text = document.getElementById("text");
const sizeSlider = document.getElementById("size");
const trackingSlider = document.getElementById("tracking");
const leadingSlider = document.getElementById("leading");

const sizeValue = document.querySelectorAll("#sizeValue");
const trackingValue = document.querySelectorAll("#trackingValue");
const leadingValue = document.querySelectorAll("#leadingValue");

function Text() {
  text.style.fontSize = sizeSlider.value + "px";
  text.style.letterSpacing = trackingSlider.value + "px";
  text.style.lineHeight = leadingSlider.value;

  sizeValue.forEach(el => el.textContent = sizeSlider.value + "px");
  trackingValue.forEach(el => el.textContent = trackingSlider.value + "px");
  leadingValue.forEach(el => el.textContent = leadingSlider.value);
}


if (window.innerWidth <= 768) {
  if (sizeSlider)     { sizeSlider.value     = "32";   sizeSlider.min = "16"; sizeSlider.max = "80"; }
  if (trackingSlider) { trackingSlider.value = "0.4";  }
  if (leadingSlider)  { leadingSlider.value  = "1.10"; }
}

sizeSlider?.addEventListener("input", Text);
trackingSlider?.addEventListener("input", Text);
leadingSlider?.addEventListener("input", Text);


Text();


(function initPlayground() {
  const box = document.getElementById("playground");

  const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const GRAVITY = 1.0;
  const DAMPEN = 0.2;
  const FONT_SIZE = 64;

  let letters = [];
  let running = true;
  let lastTime = 0;
  let rafId;

  function boxW() { return box.clientWidth; }
  function boxH() { return box.clientHeight; }

  function cols() {
    return Math.floor(boxW() / FONT_SIZE);
  }

  /* ── stop only when top is filled across width ── */
  function isFilledTop() {
    const totalCols = cols();
    let filled = 0;

    for (let i = 0; i < totalCols; i++) {
      const x = i * FONT_SIZE;

      const hasTop = letters.some(l =>
        Math.abs(l.x - x) < 2 && l.y <= 10
      );

      if (hasTop) filled++;
    }

    return filled >= totalCols * 0.9;
  }

  function pickChar() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }

  function spawnLetter() {
    if (isFilledTop()) return;

    const colIndex = Math.floor(Math.random() * cols());
    const baseX = colIndex * FONT_SIZE;

    const isOutline = Math.random() < 0.5;
    const rotation = (Math.random() * 80) - 40;

    const el = document.createElement("span");
    el.className = "phys-letter" + (isOutline ? " outlined" : "");
    el.textContent = pickChar();

    el.style.cssText = `
      position: absolute;
      font-size: ${FONT_SIZE}px;
      width: ${FONT_SIZE}px;
      height: ${FONT_SIZE}px;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      user-select: none;
      will-change: transform;
      transform: rotate(${rotation}deg);
    `;

    box.appendChild(el);

    letters.push({
      el,
      x: baseX,
      y: -FONT_SIZE,
      vy: 0,
      rotation,
      col: colIndex,
      settled: false
    });
  }


  function groundFor(obj) {
    let floor = boxH() - FONT_SIZE;
    let highest = floor;

    for (const other of letters) {
      if (other === obj || !other.settled) continue;

      if (other.col === obj.col) {
        const candidate = other.y - FONT_SIZE;
        if (candidate < highest) highest = candidate;
      }
    }

    return highest;
  }

  function loop(ts) {
    if (!running) return;
    rafId = requestAnimationFrame(loop);

    

    if (!isFilledTop()) {
      for (let i = 0; i < 3; i++) {
        spawnLetter();
      }
    }

    for (const obj of letters) {
      if (obj.settled) continue;

      obj.vy += GRAVITY;
      obj.y += obj.vy;

      const ground = groundFor(obj);

      if (obj.y >= ground) {
        obj.y = ground;
        obj.vy = -obj.vy * DAMPEN;

        if (Math.abs(obj.vy) < 0.8) {
          obj.vy = 0;
          obj.settled = true;
        }
      }

      obj.el.style.left = obj.x + "px";
      obj.el.style.top = obj.y + "px";
    }
  }


  requestAnimationFrame((ts) => {
    lastTime = ts;
    rafId = requestAnimationFrame(loop);
  });

  
  const vis = new IntersectionObserver(entries => {
    running = entries[0].isIntersecting;

    if (running) {
      lastTime = performance.now();
      rafId = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(rafId);
    }
  }, { threshold: 0.1 });

  vis.observe(box);
})();


window.addEventListener("scroll", function() {
  const scrollY = window.scrollY;

  
  const heroOutline = document.querySelector(".hero-text.outline");
  const heroFilled  = document.querySelector(".hero-text.filled");

  if (heroOutline)
    heroOutline.style.transform = `translateY(${-scrollY * 0.08}px)`;

  if (heroFilled)
    heroFilled.style.transform = `translateY(${-scrollY * 0.18}px)`;


 
  const bigA  = document.querySelector(".BigA");
  const text2 = document.querySelector(".text-2");

  if (bigA)
    bigA.style.transform = `translateY(${scrollY * 0.07}px)`;

  if (text2)
    text2.style.transform = `translateY(${scrollY * 0.02}px)`;


 
  const sec6 = document.querySelector(".Section-6");

  if (sec6) {
    const sec6Top = sec6.offsetTop;
    const sec6H   = sec6.offsetHeight;

    const rel6 = Math.max(
      0,
      Math.min(scrollY - sec6Top + window.innerHeight * 0.5, sec6H)
    );

    const leftLines   = document.querySelectorAll(".sec-6-left .sec-6-line");
    const rightLines  = document.querySelectorAll(".sec-6-right-box .sec-6-line");
    const bottomLines = document.querySelectorAll(".sec-6-bottom .sec-6-line");

    const speeds = [0.06, 0.10, 0.14];

    leftLines.forEach((ln, i) => {
      ln.style.transform = `translateY(${rel6 * (speeds[i] || 0.06)}px)`;
    });

    rightLines.forEach((ln, i) => {
      ln.style.transform = `translateY(${rel6 * (speeds[i] || 0.06)}px)`;
    });

    bottomLines.forEach((ln, i) => {
      ln.style.transform = `translateY(${rel6 * (speeds[i] || 0.06)}px)`;
    });
  }



  const sec8 = document.querySelector(".Section-8");

  if (sec8) {
    const sec8Top = sec8.offsetTop;
    const sec8H   = sec8.offsetHeight;

    const rel8 = Math.max(
      0,
      Math.min(scrollY - sec8Top + window.innerHeight * 0.5, sec8H)
    );

    const poster  = document.querySelector(".sec8-poster");
    const sec8txt = document.querySelector(".sec8-text");

    if (poster)
      poster.style.transform = `translateY(${-rel8 * 0.08}px)`;

    if (sec8txt)
      sec8txt.style.transform = `translateY(${-rel8 * 0.04}px)`;
  }



  const sec9txt = document.querySelector("#sec-9-text");

  if (sec9txt)
    sec9txt.style.transform = `translateY(${scrollY * 0.04}px)`;
});