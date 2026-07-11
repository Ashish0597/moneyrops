// ═══════════════════════════════════════════════════════════
// MONEYROPS — Homepage Contact Form (id="contactForm")
// Uses the same EmailJS service + template as contact.html,
// so submissions from the homepage land in the same branded
// email format.
//
// Requires emailjs.init() to already be called on the page
// (already present in your <script> block).
// ═══════════════════════════════════════════════════════════

const homepageContactForm = document.getElementById("contactForm");

if (homepageContactForm) {
  homepageContactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById("contactSubmitBtn");
    const status = document.getElementById("contactFormStatus");
    const originalBtnText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    try {
      await emailjs.sendForm(
        "service_5y6tya9",
        "template_n5sb98g",
        this
      );

      status.innerHTML =
        "✅ Thank you! Your enquiry has been submitted successfully.";
      status.style.color = "green";
      this.reset();
    } catch (error) {
      status.innerHTML = "❌ Something went wrong. Please try again.";
      status.style.color = "red";
      console.error(error);
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  });
}