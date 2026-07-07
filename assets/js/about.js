// Register GSAP
gsap.registerPlugin(ScrollTrigger);

// ======================
// Founder
// ======================

gsap.from(".founder-media", {
  scrollTrigger: {
    trigger: ".exhibit-founder",
    start: "top 75%",
  },
  x: -100,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".founder-content", {
  scrollTrigger: {
    trigger: ".exhibit-founder",
    start: "top 75%",
  },
  x: 100,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

// ======================
// Why Choose Us
// ======================

gsap.from(".advantage-card", {
  scrollTrigger: {
    trigger: ".advantage-grid",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  stagger: 0.15,
  duration: 0.8,
});

// ======================
// Vision / Mission
// ======================

gsap.from(".direction-block", {
  scrollTrigger: {
    trigger: ".exhibit-direction",
    start: "top 80%",
  },
  y: 80,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
});

// ======================
// Team
// ======================

gsap.from(".team-card", {
  scrollTrigger: {
    trigger: ".team-grid",
    start: "top 80%",
    once: true,
  },
  y: 80,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
});


/*
   CAROUSEL 
 */

(function () {
  "use strict";

  const root = document.querySelector("[data-team-carousel]");
  if (!root) return;

  const viewport = root.querySelector(".team-carousel-viewport");
  const track = root.querySelector("[data-team-track]");
  const cards = Array.from(track.children);
  const prevBtn = root.querySelector("[data-team-prev]");
  const nextBtn = root.querySelector("[data-team-next]");
  const dotsWrap = root.querySelector("[data-team-dots]");

  if (!viewport || !track || !cards.length) return;

  const AUTOPLAY_MS = 5000;
  let visibleCount = getVisibleCount();
  let pageIndex = 0;
  let totalPages = Math.max(1, Math.ceil(cards.length / visibleCount));
  let autoplayTimer = null;

  /* How many cards are visible per page — mirrors the
     breakpoints used for .team-card flex-basis in about.css */
  function getVisibleCount() {
    const w = window.innerWidth;
    if (w <= 640) return 1;
    if (w <= 1024) return 2;
    return 3;
  }

  function buildDots() {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      if (i === pageIndex) dot.classList.add("is-active");
      dot.addEventListener("click", () => goToPage(i));
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    Array.from(dotsWrap.children).forEach((dot, i) => {
      dot.classList.toggle("is-active", i === pageIndex);
    });
  }

  function getGapPx() {
  const cs = getComputedStyle(track);
  return parseFloat(cs.columnGap || cs.gap) || 0;
}

function render() {
  const gap = getGapPx();
  const offset = pageIndex * (viewport.clientWidth + gap);
  track.style.transform = "translateX(-" + offset + "px)";
  updateDots();
}

  function goToPage(index) {
    pageIndex = ((index % totalPages) + totalPages) % totalPages;
    render();
  }

  function next() { goToPage(pageIndex + 1); }
  function prev() { goToPage(pageIndex - 1); }

  function recalc() {
    visibleCount = getVisibleCount();
    totalPages = Math.max(1, Math.ceil(cards.length / visibleCount));
    if (pageIndex > totalPages - 1) pageIndex = totalPages - 1;
    buildDots();
    render();
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = window.setInterval(next, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  /* ---- Controls ---- */
  if (nextBtn) nextBtn.addEventListener("click", () => { next(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prev(); startAutoplay(); });

  root.addEventListener("mouseenter", stopAutoplay);
  root.addEventListener("mouseleave", startAutoplay);
  root.addEventListener("focusin", stopAutoplay);
  root.addEventListener("focusout", startAutoplay);

  /* ---- Swipe support for touch devices ---- */
  let touchStartX = 0;
  let touchDeltaX = 0;

  viewport.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchDeltaX = 0;
    stopAutoplay();
  }, { passive: true });

  viewport.addEventListener("touchmove", (e) => {
    touchDeltaX = e.touches[0].clientX - touchStartX;
  }, { passive: true });

  viewport.addEventListener("touchend", () => {
    const SWIPE_THRESHOLD = 40;
    if (touchDeltaX > SWIPE_THRESHOLD) prev();
    else if (touchDeltaX < -SWIPE_THRESHOLD) next();
    startAutoplay();
  });

  /* ---- Resize handling (debounced) ---- */
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(recalc, 150);
  });

  /* ---- Init ---- */
  buildDots();
  render();
  startAutoplay();
})();