// Register GSAP

gsap.registerPlugin(ScrollTrigger);

// Hero

gsap.from(".about-tag", {
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
});

gsap.from(".about-hero h1", {
  y: 80,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
});

gsap.from(".about-hero p", {
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.4,
  ease: "power3.out",
});

gsap.from(".about-breadcrumb", {
  y: 30,
  opacity: 0,
  duration: 1,
  delay: 0.6,
});

// Intro

gsap.from(".about-intro .section-tag", {
  scrollTrigger: {
    trigger: ".about-intro",
    start: "top 80%",
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
});

gsap.from(".about-intro h2", {
  scrollTrigger: {
    trigger: ".about-intro",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  duration: 1,
});

gsap.from(".about-intro p", {
  scrollTrigger: {
    trigger: ".about-intro",
    start: "top 80%",
  },
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.2,
});

// Founder Section

gsap.from(".founder-image-wrap", {
  scrollTrigger: {
    trigger: ".founder-section",
    start: "top 75%",
  },
  x: -120,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

gsap.from(".founder-content", {
  scrollTrigger: {
    trigger: ".founder-section",
    start: "top 75%",
  },
  x: 120,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
});

// Founder Stats

gsap.from(".stat-box", {
  scrollTrigger: {
    trigger: ".founder-stats",
    start: "top 85%",
  },
  y: 50,
  opacity: 0,
  stagger: 0.15,
  duration: 0.8,
});

// Vision Mission

gsap.from(".vm-card", {
  scrollTrigger: {
    trigger: ".vision-mission",
    start: "top 80%",
  },
  y: 80,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
});

// Why Choose Us

gsap.from(".why-card", {
  scrollTrigger: {
    trigger: ".why-grid",
    start: "top 80%",
  },
  y: 70,
  opacity: 0,
  stagger: 0.15,
  duration: 0.8,
});

// Counters

const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  ScrollTrigger.create({
    trigger: counter,
    start: "top 85%",
    once: true,

    onEnter: () => {
      let target = +counter.dataset.count;

      gsap.to(counter, {
        innerText: target,
        duration: 2,
        snap: {
          innerText: 1,
        },

        onUpdate: function () {
          counter.innerText = Math.ceil(
            counter.innerText
          );
        },
      });
    },
  });
});

// Team Cards

gsap.from(".team-card", {
  scrollTrigger: {
    trigger: ".team-grid",
    start: "top 80%",
  },
  y: 80,
  opacity: 0,
  stagger: 0.2,
  duration: 1,
});

// CTA

gsap.from(".about-cta h2", {
  scrollTrigger: {
    trigger: ".about-cta",
    start: "top 80%",
  },
  y: 60,
  opacity: 0,
  duration: 1,
});

gsap.from(".about-cta p", {
  scrollTrigger: {
    trigger: ".about-cta",
    start: "top 80%",
  },
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.2,
});

gsap.from(".cta-buttons", {
  scrollTrigger: {
    trigger: ".about-cta",
    start: "top 80%",
  },
  y: 40,
  opacity: 0,
  duration: 1,
  delay: 0.4,
});