gsap.registerPlugin(ScrollTrigger);

// Hero

gsap.from(".contact-hero-tag", {
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
});

gsap.from(".contact-hero h1", {
  y: 80,
  opacity: 0,
  duration: 1,
  delay: 0.2,
  ease: "power3.out",
});

gsap.from(".contact-hero p", {
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.4,
  ease: "power3.out",
});

gsap.from(".contact-breadcrumb", {
  y: 30,
  opacity: 0,
  duration: 1,
  delay: 0.6,
});

// Contact Section

gsap.from(".contact-info-card", {
  scrollTrigger: {
    trigger: ".contact-info-card",
    start: "top 80%",
  },
  x: -120,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

gsap.from(".contact-form-wrapper", {
  scrollTrigger: {
    trigger: ".contact-form-wrapper",
    start: "top 80%",
  },
  x: 120,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
});

// Form Fields

gsap.from(".form-group", {
  scrollTrigger: {
    trigger: "#contactLeadForm",
    start: "top 85%",
  },
  y: 40,
  opacity: 0,
  stagger: 0.08,
  duration: 0.7,
});

// Why Moneyrops

gsap.from(".contact-highlight-box li", {
  scrollTrigger: {
    trigger: ".contact-highlight-box",
    start: "top 85%",
  },
  x: -40,
  opacity: 0,
  stagger: 0.12,
  duration: 0.6,
});

// Map

gsap.from(".map-header", {
  scrollTrigger: {
    trigger: ".map-header",
    start: "top 85%",
  },
  y: 50,
  opacity: 0,
  duration: 1,
});

gsap.from(".map-wrapper", {
  scrollTrigger: {
    trigger: ".map-wrapper",
    start: "top 85%",
  },
  y: 100,
  opacity: 0,
  duration: 1,
});




const contactForm = document.getElementById("contactLeadForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector(".contact-submit-btn");
    const status = document.getElementById("contactFormStatus");

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    const formData = new FormData(this);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        status.innerHTML =
          "✅ Thank you! Your enquiry has been submitted successfully.";
        status.style.color = "green";
        this.reset();
      } else {
        status.innerHTML = "❌ Something went wrong. Please try again.";
        status.style.color = "red";
      }
    } catch (error) {
      status.innerHTML = "❌ Network error. Please try again.";
      status.style.color = "red";
      console.error(error);
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML =
      'Request Consultation <i class="ri-arrow-right-line"></i>';
  });
}