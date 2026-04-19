(function () {
  "use strict";
  function init() {
    highlightActiveNav();
    initSlider();
    setFooterYear();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  function highlightActiveNav() {
    var links = document.querySelectorAll(".nav-menu a");
    if (!links.length) return;
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    links.forEach(function (link) {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  }
  function initSlider() {
    var sliderEl = document.querySelector(".slider");
    if (!sliderEl) return;
    var slides = sliderEl.querySelectorAll(".slide");
    var prevBtn = document.getElementById("prevBtn");
    var nextBtn = document.getElementById("nextBtn");
    var dotsContainer = document.getElementById("sliderDots");

    if (!slides.length) return;
    var currentIndex = 0;
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active-dot");
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        dot.addEventListener("click", function () {
          goToSlide(i);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateSlider() {
      slides.forEach(function (slide, i) {
        slide.style.display = (i === currentIndex) ? "block" : "none";
        slide.classList.toggle("active", i === currentIndex);
      });
    
      if (dotsContainer) {
        var dots = dotsContainer.querySelectorAll(".dot");
        dots.forEach(function (dot, i) {
          dot.classList.toggle("active-dot", i === currentIndex);
        });
      }
    }

    function goToSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      updateSlider();
    }
    if (prevBtn) {
      prevBtn.addEventListener("click", function () { 
        goToSlide(currentIndex - 1); 
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () { 
        goToSlide(currentIndex + 1); 
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft")  { goToSlide(currentIndex - 1); }
      if (e.key === "ArrowRight") { goToSlide(currentIndex + 1); }
    });
    updateSlider();
  }
  
  function setFooterYear() {
    var yearEls = document.querySelectorAll(".footer-year");
    var year = new Date().getFullYear();
    yearEls.forEach(function (el) { el.textContent = year; });
  }
}());