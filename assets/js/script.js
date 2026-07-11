document.addEventListener("DOMContentLoaded", function () {


  /*  Navbar fade left to right ── */

  // Set initial hidden state
  gsap.set(".nav-logo",     { autoAlpha: 0, x: -30 });
  gsap.set(".nav-links li", { autoAlpha: 0, x: -20 });
  gsap.set(".nav-cta",      { autoAlpha: 0, x: -20 });
  gsap.set(".hamburger",    { autoAlpha: 0 });

  // Animate left → right on load
  const navTl = gsap.timeline({ delay: 0.2 });

  navTl
    .to(".nav-logo", {
      autoAlpha: 1, x: 0,
      duration: 0.6, ease: "power3.out"
    })
    .to(".nav-links li", {
      autoAlpha: 1, x: 0,
      duration: 0.45, stagger: 0.1, ease: "power2.out"
    }, "-=0.3")
    .to(".nav-cta", {
      autoAlpha: 1, x: 0,
      duration: 0.4, ease: "power2.out"
    }, "-=0.2")
    .to(".hamburger", {
      autoAlpha: 1,
      duration: 0.3
    }, "<");


  /* ── 2.  Hero content fade in ── */
// Hero Animation (Run only if hero exists)
if (document.querySelector(".hero-heading")) {

  // Set initial states
  gsap.set(".hero-badge",   { autoAlpha: 0, y: 20 });
  gsap.set(".hero-heading", { autoAlpha: 0, y: 30 });
  gsap.set(".hero-subtext", { autoAlpha: 0, y: 20 });
  
  gsap.set(".hero-stats",   { autoAlpha: 0, y: 20 });
  gsap.set(".hero-card",    { autoAlpha: 0, x: 40 });

  // Animate hero left side — staggered
  const heroTl = gsap.timeline({ delay: 0.6 });

  heroTl
    .to(".hero-badge", {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    })
    .to(".hero-heading", {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.2")
    .to(".hero-subtext", {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.3")
   
    .to(".hero-stats", {
      autoAlpha: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2")
    .to(".hero-card", {
      autoAlpha: 1,
      x: 0,
      duration: 0.7,
      ease: "power3.out"
    }, "-=0.6")
    // .to(".hero-bottom", {
    //   autoAlpha: 1,
    //   duration: 0.5
    // }, "-=0.2");

}

  /* ── 3. Stats Counter Animation ── */

  // Count up from 0 to target number
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"));
    const duration = 2000; // ms
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }

    requestAnimationFrame(update);
  }

  // Trigger counter when stats come into view
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll(".stat-number[data-target]");
          counters.forEach(animateCounter);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsEl = document.querySelector(".hero-stats");
  if (statsEl) statsObserver.observe(statsEl);


  /* ── 4. Scroll — Navbar pill → full width solid ── */

  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });


  /* ── 5. Hamburger toggle ── */

  const hamburger  = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll(".mob-link, .btn-contact").forEach(function (link) {
    link.addEventListener("click", function () {
      hamburger.classList.remove("open");
      mobileMenu.classList.remove("open");
    });
  });

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  /* ── 6. Service Cards — scroll fade up ── */

  // Set initial state
  gsap.set(".service-card", { autoAlpha: 0, y: 40 });

  // Animate cards as they scroll into view
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            autoAlpha: 1, y: 0,
            duration: 0.55,
            ease: "power2.out",
            delay: 0.1 * i
          });
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".service-card").forEach(function (card) {
    cardObserver.observe(card);
  });


});

// header>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Hero animation (Home page only)
if (document.querySelector(".hero-left")) {

  const tl = gsap.timeline();

  tl.from(".hero-badge", {
      y: 50,
      opacity: 0,
      duration: 1
  })

  .from(".hero-left h1", {
      y: 80,
      opacity: 0,
      duration: 1
  }, "-=.5")

  .from(".hero-left p", {
      y: 40,
      opacity: 0,
      duration: .8
  }, "-=.5")

  // .from(".hero-btn", {
  //     y: 30,
  //     opacity: 0,
  //     stagger: .15,
  //     duration: .6
  // }, "-=.4")

  .from(".hero-glass-card", {
      x: 120,
      opacity: 0,
      duration: 1
  }, "-=.8")

  .from(".service-card", {
      y: 80,
      opacity: 0,
      stagger: .15,
      duration: .8
  }, "-=.4");

}

const card = document.querySelector(".hero-glass-card");

document.addEventListener("mousemove",(e)=>{

    const x =
    (window.innerWidth/2 - e.clientX)/40;

    const y =
    (window.innerHeight/2 - e.clientY)/40;

    gsap.to(card,{
        rotateY:-x,
        rotateX:y,
        duration:1,
        ease:"power2.out"
    });

});

// about??????????????????????????????????????????
gsap.registerPlugin(ScrollTrigger);

const visionTl = gsap.timeline({
    scrollTrigger:{
        trigger:".vision-section",
        start:"top 70%",
        toggleActions:"play none none none"
    }
});

visionTl

.from(".vision-label",{
    opacity:0,
    y:30,
    duration:.8
})

.from(".vision-text",{
    opacity:0,
    y:60,
    duration:1.2
},"-=.4")

.to(".highlight-1",{
    backgroundPosition:"0% 0%",
    opacity:1,
    duration:1.8,
    ease:"power2.out"
},"-=.4")

.to(".highlight-2",{
    backgroundPosition:"0% 0%",
    opacity:1,
    duration:1.8,
    ease:"power2.out"
},"-=1.2");

// About Timeline Animation
gsap.utils.toArray('[data-gsap="abt-left"]').forEach(el => {
  gsap.to(el, {
    opacity: 1, x: 0, duration: 1, ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 85%" }
  });
});

gsap.utils.toArray('[data-gsap="abt-right"]').forEach((el, i) => {
  gsap.to(el, {
    opacity: 1, x: 0, duration: 1, delay: i * 0.15, ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 85%" }
  });
});

// Highlight animation
gsap.utils.toArray('.highlight').forEach(el => {
  gsap.to(el, {
    backgroundPosition: '0% 0', opacity: 1, duration: 1.4, ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});


// Financial Growth Section



gsap.from(".why-tag",{
  scrollTrigger:{
    trigger:".why-section",
    start:"top 75%"
  },
  y:30,
  opacity:1,
  duration:.8
});

gsap.from(".why-left h2",{
  scrollTrigger:{
    trigger:".why-section",
    start:"top 75%"
  },
  y:50,
  opacity:1,
  duration:1
});

gsap.from(".why-left p",{
  scrollTrigger:{
    trigger:".why-section",
    start:"top 75%"
  },
  y:30,
  opacity:1,
  duration:.8
});

gsap.from(".why-card",{
  scrollTrigger:{
    trigger:".why-right",
    start:"top 80%"
  },
  y:60,
  opacity:1,
  stagger:.12,
  duration:.8,
  ease:"power3.out"
});

// 

gsap.registerPlugin(ScrollTrigger);

const financeServicesTl = gsap.timeline({
    scrollTrigger:{
        trigger:".finance-services-section",
        start:"top 75%",
        toggleActions:"play none none none"
    }
});

financeServicesTl

.from(".finance-services-label",{
    opacity:0,
    y:30,
    duration:.6
})

.from(".finance-services-heading",{
    opacity:0,
    y:50,
    duration:.8
},"-=0.3")

.from(".finance-services-subheading",{
    opacity:0,
    y:30,
    duration:.6
},"-=0.4")

.from(".finance-service-card",{
    y:60,
    stagger:0.08,
    duration:.7,
    ease:"power3.out"
},"-=0.3");

// 

gsap.timeline({
    scrollTrigger:{
        trigger:".moneyrops-process",
        start:"top 75%"
    }
})

.from(".moneyrops-process-header",{
    y:50,
    opacity:0,
    duration:1
})

.from(".moneyrops-process-step",{
    y:80,
    opacity:0,
    stagger:0.2,
    duration:0.8,
    ease:"power3.out"
},"-=0.4");


 // EMI Calculator
      function calcEMI() {
        const P = +document.getElementById("loanAmt").value;
        const r = +document.getElementById("interestRate").value / 12 / 100;
        const n = +document.getElementById("tenure").value * 12;
        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPay = emi * n;
        const totalInt = totalPay - P;
        document.getElementById("emiResult").textContent =
          "₹" + Math.round(emi).toLocaleString("en-IN");
        document.getElementById("principalAmt").textContent =
          "₹" + (P / 100000).toFixed(1) + " L";
        document.getElementById("interestAmt").textContent =
          "₹" + (totalInt / 100000).toFixed(1) + " L";
        document.getElementById("totalAmt").textContent =
          "₹" + (totalPay / 100000).toFixed(1) + " L";
        document.getElementById("loanAmtDisplay").textContent =
          "₹" + (P / 100000 >= 100 ? P / 10000000 + "Cr" : P / 100000 + "L");
        document.getElementById("interestDisplay").textContent =
          document.getElementById("interestRate").value + "%";
        const t = +document.getElementById("tenure").value;
        document.getElementById("tenureDisplay").textContent =
          t + (t === 1 ? " Year" : " Years");
        // update slider gradients
        ["loanAmt", "interestRate", "tenure"].forEach((id) => {
          const el = document.getElementById(id);
          const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
          el.style.setProperty("--p", pct + "%");
        });
      }
      calcEMI();

      // testimonial

      // 

      document.querySelectorAll(".mr-faq-question").forEach(btn => {
  btn.addEventListener("click", () => {

    const item = btn.parentElement;

    document.querySelectorAll(".mr-faq-item").forEach(faq => {
      if (faq !== item) {
        faq.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});



// patners


let counterObj = { val: 0 };
gsap.to(counterObj, {
  val: 100,
  duration: 1.8,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.bp-intro', start: 'top 80%', once: true },
  onUpdate: () => {
    const n = Math.round(counterObj.val);
    document.querySelector('.bp-count-num').textContent = String(n).padStart(2, '0');
  }
});
 

function makeLogoBadge(tag){
  const initials = tag.slice(0, 4);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#e7c766"/>
          <stop offset="1" stop-color="#c9a227"/>
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="62" height="62" rx="14" fill="#0f1b30" stroke="url(#g)" stroke-width="1.5"/>
      <text x="32" y="38" font-family="Space Mono, monospace" font-size="15" font-weight="700"
            fill="#f3efe4" text-anchor="middle">${initials}</text>
    </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
 
document.querySelectorAll('.bp-card').forEach(card => {
  const img = card.querySelector('.bp-card-logo');
  if (img) img.src = makeLogoBadge(card.dataset.tag || '?');
});
 
/* one-time reveal of the grid on scroll */
const cards = gsap.utils.toArray('.bp-card');
gsap.set(cards, { autoAlpha: 0, y: 22 });
gsap.to(cards, {
  autoAlpha: 1,
  y: 0,
  duration: 0.6,
  ease: 'power2.out',
  stagger: 0.03,
  scrollTrigger: { trigger: '.bp-partner-grid', start: 'top 85%', once: true }
});
 
/* ambient background drift */
gsap.to('.bp-arcs svg', {
  y: -20,
  duration: 8,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1
});
 

function runAmbientGlow(){
  const card = cards[Math.floor(Math.random() * cards.length)];
  card.classList.add('bp-glow');
 
  const holdTime = gsap.utils.random(1.2, 2.4);
  gsap.delayedCall(holdTime, () => card.classList.remove('bp-glow'));
 
  const nextPause = gsap.utils.random(0.3, 1.2);
  gsap.delayedCall(nextPause, runAmbientGlow);
}
 
/* stagger the start of a few runners so glows overlap naturally */
runAmbientGlow();
gsap.delayedCall(0.4, runAmbientGlow);
gsap.delayedCall(0.9, runAmbientGlow);