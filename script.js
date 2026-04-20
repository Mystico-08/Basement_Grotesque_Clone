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
    }
  });
}, { threshold: 0.2 });

elements.forEach((el, i) => {
  observer.observe(el);
  el.style.transitionDelay = `${Math.min(i * 0.2, 0.6)}s`;
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

window.addEventListener("scroll", function() {
  var scrollY = window.scrollY;
 

  document.querySelector(".hero-text.outline").style.transform = "translateY(" + (-scrollY * 0.08) + "px)";
  document.querySelector(".hero-text.filled").style.transform = "translateY(" + (-scrollY * 0.18) + "px)";
 

  document.querySelector(".BigA").style.transform = "translateY(" + (scrollY * 0.05) + "px)";
  document.querySelector(".text-2").style.transform = "translateY(" + (scrollY * 0.02) + "px)";
 
 
  var leftLines = document.querySelectorAll(".sec-6-left .sec-6-line");
  leftLines[0].style.transform = "translateY(" + (scrollY * 0.03) + "px)";
  leftLines[1].style.transform = "translateY(" + (scrollY * 0.04) + "px)";
  leftLines[2].style.transform = "translateY(" + (scrollY * 0.05) + "px)";

 var rightLines = document.querySelectorAll(".sec-6-right-box .sec-6-line");
  rightLines[0].style.transform = "translateY(" + (scrollY * 0.03) + "px)";
  rightLines[1].style.transform = "translateY(" + (scrollY * 0.04) + "px)";
  rightLines[2].style.transform = "translateY(" + (scrollY * 0.05) + "px)";
  
  var bottomLines = document.querySelectorAll(".sec-6-bottom .sec-6-line");
  bottomLines[0].style.transform = "translateY(" + (scrollY * 0.03) + "px)";
  bottomLines[1].style.transform = "translateY(" + (scrollY * 0.04) + "px)";
  bottomLines[2].style.transform = "translateY(" + (scrollY * 0.05) + "px)";
  
  document.querySelector(".sec8-poster").style.transform = "translateY(" + (-scrollY * 0.02) + "px)";
  document.querySelector(".sec8-text").style.transform = "translateY(" + (-scrollY * 0.01) + "px)";

  document.querySelector("#sec-9-text").style.transform = "translateY(" + (-scrollY * 0.02) + "px)";
});

 