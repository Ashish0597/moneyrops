

(function () {
  "use strict";

  if (typeof window.openApplyModal !== "function") {
    window.openApplyModal = function (serviceKey) {
      console.warn(
        "openApplyModal() not found — wire up your global apply-modal script. Requested service:",
        serviceKey
      );
    };
  }

  document.addEventListener("DOMContentLoaded", function () {
   
    safeInit("initFilterBar", initFilterBar);
    safeInit("initFinderCardScroll", initFinderCardScroll);
    safeInit("initFaqAccordion", initFaqAccordion);
    safeInit("initRailNav", initRailNav);
    safeInit("initCounters", initCounters);
    safeInit("initScrollReveals", initScrollReveals);
  });

  function safeInit(name, fn) {
    try {
      fn();
    } catch (err) {
      console.warn("[services.js] " + name + "() failed — skipping. Reason:", err);
    }
  }

  /* -----------------------------------------------------------------
     1. FILTER BAR — show/hide overview cards by category
  ----------------------------------------------------------------- */
  function initFilterBar() {
    var pills = document.querySelectorAll(".svc-filter-pill");
    var cards = document.querySelectorAll(".svc-finder-card");

    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        pills.forEach(function (p) {
          p.classList.remove("is-active");
          p.setAttribute("aria-selected", "false");
        });
        pill.classList.add("is-active");
        pill.setAttribute("aria-selected", "true");

        var filter = pill.getAttribute("data-filter");

        cards.forEach(function (card) {
          var match = filter === "all" || card.getAttribute("data-category") === filter;
          if (match) {
            card.classList.remove("is-hidden");
            if (window.gsap) {
              gsap.fromTo(card, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35 });
            }
          } else {
            card.classList.add("is-hidden");
          }
        });
      });
    });
  }

  /* -----------------------------------------------------------------
     2. FINDER CARDS — click the card body to jump to full detail
        (the Apply Now link inside stops propagation, see HTML)
  ----------------------------------------------------------------- */
  function initFinderCardScroll() {
    var cards = document.querySelectorAll(".svc-finder-card");

    cards.forEach(function (card) {
      card.addEventListener("click", function () {
        var targetId = card.getAttribute("data-target");
        var targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  /* -----------------------------------------------------------------
     3. FAQ ACCORDION — exclusive open within the list
  ----------------------------------------------------------------- */
  function initFaqAccordion() {
    var items = document.querySelectorAll("#services-faq .mr-faq-item");

    items.forEach(function (item) {
      var question = item.querySelector(".mr-faq-question");
      question.addEventListener("click", function () {
        var alreadyOpen = item.classList.contains("active");

        items.forEach(function (i) {
          i.classList.remove("active");
        });

        if (!alreadyOpen) {
          item.classList.add("active");
        }
      });
    });
  }

  /* -----------------------------------------------------------------
     4. SIDE RAIL NAV — scrollspy + show/hide on long scroll
  ----------------------------------------------------------------- */
  function initRailNav() {
    var rail = document.querySelector(".svc-railnav");
    if (!rail) return;

    var railLinks = rail.querySelectorAll("a");
    var blocks = document.querySelectorAll(".svc-block");

    var overview = document.getElementById("services-overview") || document.querySelector(".svc-hero");
    var cta = document.querySelector(".svc-cta");

    if (!overview) {
      console.warn("[services.js] initRailNav: no anchor element found (.svc-hero missing) — rail nav visibility disabled.");
      return;
    }

    /* highlight current section */
    if ("IntersectionObserver" in window) {
      var blockObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var id = entry.target.id;
              railLinks.forEach(function (link) {
                link.classList.toggle("is-active", link.getAttribute("data-rail") === id);
              });
            }
          });
        },
        { rootMargin: "-45% 0px -45% 0px" }
      );
      blocks.forEach(function (block) {
        blockObserver.observe(block);
      });

      /* show rail only between overview and the final CTA */
      var visibilityObserver = new IntersectionObserver(
        function () {
          var afterOverview = overview.getBoundingClientRect().top < 0;
          var beforeCta = !cta || cta.getBoundingClientRect().top > window.innerHeight * 0.4;
          rail.classList.toggle("is-visible", afterOverview && beforeCta);
        },
        { threshold: 0, rootMargin: "0px" }
      );
      visibilityObserver.observe(overview);
      if (cta) visibilityObserver.observe(cta);

      window.addEventListener(
        "scroll",
        function () {
          var afterOverview = overview.getBoundingClientRect().top < 0;
          var beforeCta = !cta || cta.getBoundingClientRect().top > window.innerHeight * 0.4;
          rail.classList.toggle("is-visible", afterOverview && beforeCta);
        },
        { passive: true }
      );
    }
  }

  /* -----------------------------------------------------------------
     5. ANIMATED STAT COUNTERS in the hero
  ----------------------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll(".svc-hero-stat h3[data-count]");
    if (!counters.length) return;

    counters.forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var prefix = el.getAttribute("data-prefix") || "";
      var suffix = el.getAttribute("data-suffix") || "";

      var run = function () {
        if (window.gsap) {
          gsap.fromTo(
            el,
            { textContent: 0 },
            {
              textContent: target,
              duration: 1.4,
              ease: "power2.out",
              snap: { textContent: 1 },
              onUpdate: function () {
                el.textContent = prefix + Math.round(el.textContent) + suffix;
              },
            }
          );
        } else {
          el.textContent = prefix + target + suffix;
        }
      };

      if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: run,
        });
      } else {
        run();
      }
    });
  }

 
})();