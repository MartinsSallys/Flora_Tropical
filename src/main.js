import "./styles/variables.css";
import "./styles/global.css";
import "./styles/animations.css";
import { App } from "./App.js";

document.querySelector("#app").innerHTML = App();

const slides = document.querySelectorAll("[data-slide]");
const dots = document.querySelectorAll("[data-dot]");
let activeSlide = 0;

function showSlide(index) {
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === index);
  });

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === index);
  });
}

if (dots.length && slides.length) {
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      activeSlide = index;
      showSlide(activeSlide);
    });
  });

  setInterval(() => {
    activeSlide = (activeSlide + 1) % slides.length;
    showSlide(activeSlide);
  }, 4200);
}
