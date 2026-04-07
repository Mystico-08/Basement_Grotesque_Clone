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

const elements = document.querySelectorAll('.animate,.section-5,.Section-7');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

elements.forEach((el, i) => {
  observer.observe(el);
  el.style.transitionDelay = `${i * 0.5}s`;
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

      capitalObserver.disconnect(); // fixed
    }
  });
}, { threshold: 0.1 });

const capitalSection = document.querySelector(".capital");
if (capitalSection) capitalObserver.observe(capitalSection);



const text = document.getElementById("text");
const sizeSlider = document.getElementById("size");
const trackingSlider = document.getElementById("tracking");
const leadingSlider = document.getElementById("leading");

function Text() {
  text.style.fontSize = sizeSlider.value + "px";
  text.style.letterSpacing = trackingSlider.value + "px";
  text.style.lineHeight = leadingSlider.value;
}

sizeSlider?.addEventListener("input", Text);
trackingSlider?.addEventListener("input", Text);
leadingSlider?.addEventListener("input", Text);


Text();


const box = document.getElementById("playground");
const chars = "abcdefghijklmnopqrstuvwxyz123456789";

let physLetters = [];

if (box) {

  function createLetter() {
    const el = document.createElement("span");
    el.className = "phys-letter";
    el.innerText = chars[Math.floor(Math.random() * chars.length)];

    const obj = {
      el,
      x: Math.random() * (box.clientWidth - 40),
      y: -50,
      vy: 0,
      width: 30,
      height: 40,
      rotation: Math.random() * 360
    };
  }
}
