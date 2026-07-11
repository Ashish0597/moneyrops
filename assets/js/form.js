const serviceConfig = {
  "investment-advisory": {
    title: "Investment Advisory",
    fields: [
      { label: "Name", name: "name", type: "text" },
      { label: "Contact", name: "contact", type: "tel" },
      { label: "City", name: "city", type: "text" },
      { label: "E-mail ID", name: "email", type: "email" }
    ]
  },

  "project-finance": {
    title: "Project Finance",
    fields: [
      { label: "Name", name: "name", type: "text" },
      { label: "Contact", name: "contact", type: "tel" },
      { label: "City", name: "city", type: "text" },
      { label: "Business Name", name: "business_name", type: "text" },
      { label: "Industry Type", name: "industry_type", type: "text" },
      { label: "Required Amount", name: "required_amount", type: "text" }
    ]
  },

  "cash-credit": {
    title: "Working Capital Solutions",
    fields: [
      { label: "Name", name: "name", type: "text" },
      { label: "Contact", name: "contact", type: "tel" },
      { label: "City", name: "city", type: "text" },
      { label: "Business Name", name: "business_name", type: "text" },
      { label: "Industry Type", name: "industry_type", type: "text" },
      { label: "Required Amount", name: "required_amount", type: "text" }
    ]
  },

  "lap": {
    title: "Loan Against Property (LAP)",
    fields: [
      { label: "Name", name: "name", type: "text" },
      { label: "Contact", name: "contact", type: "tel" },
      { label: "City", name: "city", type: "text" },
      { label: "Business Name", name: "business_name", type: "text" },
      { label: "Industry Type", name: "industry_type", type: "text" },
      { label: "Required Amount", name: "required_amount", type: "text" }
    ]
  },

  "government-subsidy-assistance": {
    title: "Government Subsidy",
    fields: [
      { label: "Name", name: "name", type: "text" },
      { label: "Contact", name: "contact", type: "tel" },
      { label: "City", name: "city", type: "text" },
      { label: "Business Name", name: "business_name", type: "text" },
      { label: "Industry Type", name: "industry_type", type: "text" },
      { label: "Required Amount", name: "required_amount", type: "text" }
    ]
  },

  "business-loan": {
    title: "Business Loan (BL)",
    fields: [
      { label: "Name", name: "name", type: "text" },
      { label: "Contact", name: "contact", type: "tel" },
      { label: "City", name: "city", type: "text" },
      { label: "Business Name", name: "business_name", type: "text" },
      { label: "Industry Type", name: "industry_type", type: "text" },
      { label: "Required Amount", name: "required_amount", type: "text" }
    ]
  },

  "home-loan": {
    title: "Home Loan (HL)",
    fields: [
      { label: "Name", name: "name", type: "text" },
      { label: "Contact", name: "contact", type: "tel" },
      { label: "City", name: "city", type: "text" },
      {
        label: "Occupation Type",
        name: "occupation_type",
        type: "select",
        options: [
          "Salaried",
          "Self-Employed Professional",
          "Partnership Firm",
          "Proprietorship Firm",
          "LLP (Limited Liability Partnership)",
          "Private Limited Company"
        ]
      },
      { label: "Annual Income", name: "annual_income", type: "text" },
      { label: "Required Amount", name: "required_amount", type: "text" }
    ]
  },

  "personal-loan": {
    title: "Personal Loan (PL)",
    fields: [
      { label: "Name", name: "name", type: "text" },
      { label: "Contact", name: "contact", type: "tel" },
      { label: "City", name: "city", type: "text" },
      {
        label: "Occupation Type",
        name: "occupation_type",
        type: "select",
        options: [
          "Salaried",
          "Self-Employed Professional",
          "Partnership Firm",
          "Proprietorship Firm",
          "LLP (Limited Liability Partnership)",
          "Private Limited Company"
        ]
      },
      { label: "Annual Income", name: "annual_income", type: "text" },
      { label: "Required Amount", name: "required_amount", type: "text" }
    ]
  },

  "virtual-cfo": {
    title: "Virtual CFO Services",
    fields: [
      { label: "Name", name: "name", type: "text" },
      { label: "Contact", name: "contact", type: "tel" },
      { label: "City", name: "city", type: "text" },
      { label: "Business Name", name: "business_name", type: "text" },
      { label: "Industry Type", name: "industry_type", type: "text" },
      { label: "Annual Turnover", name: "annual_turnover", type: "text" }
    ]
  }
};

// ── FORMSPREE ENDPOINT (used for all service application forms) ──
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgojgrwn";

// ── OPEN MODAL ───────────────────────────────────────
function openApplyModal(serviceKey) {
  const service = serviceConfig[serviceKey];
  if (!service) return;

  document.getElementById("applyModalTitle").textContent = service.title;
  document.getElementById("serviceNameField").value = service.title;

  const fieldsContainer = document.getElementById("applyFormFields");
  fieldsContainer.innerHTML = "";

service.fields.forEach((field) => {
  const group = document.createElement("div");
  group.className = "apply-form-group";

  if (field.type === "select") {
    group.innerHTML = `
      <label>${field.label}</label>
      <select name="${field.name}" required>
        <option value="">Select ${field.label}</option>
        ${field.options
          .map(option => `<option value="${option}">${option}</option>`)
          .join("")}
      </select>
    `;
  } else {
    group.innerHTML = `
      <label>${field.label}</label>
      <input
        type="${field.type}"
        name="${field.name}"
        required
      />
    `;
  }

  fieldsContainer.appendChild(group);
});

  document.getElementById("applyModalOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

// ── CLOSE MODAL ───────────────────────────────────────
function closeApplyModal(e) {
  document.getElementById("applyModalOverlay").classList.remove("active");
  document.body.style.overflow = "";
  document.getElementById("applyFormStatus").textContent = "";
  document.getElementById("applyFormStatus").className = "apply-form-status";
}


// ── FORM SUBMIT (Apply Modal — now via Formspree) ────
const applyForm = document.getElementById("applyForm");

if (applyForm) {
applyForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitBtn = e.target.querySelector(".apply-submit-btn");
  const statusEl = document.getElementById("applyFormStatus");

  const formData = new FormData(e.target);

  // Mobile number validation
  const contact = formData.get("contact");
  if (contact && !/^\d{10}$/.test(contact)) {
    statusEl.textContent = "Please enter a valid 10 digit mobile number.";
    statusEl.className = "apply-form-status error";
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      statusEl.textContent = "Application submitted successfully!";
      statusEl.className = "apply-form-status success";
      e.target.reset();

      setTimeout(() => {
        closeApplyModal();
      }, 2000);
    } else {
      const result = await response.json();
      statusEl.textContent = result.errors
        ? result.errors.map((err) => err.message).join(", ")
        : "Something went wrong. Please try again.";
      statusEl.className = "apply-form-status error";
    }
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Something went wrong. Please try again.";
    statusEl.className = "apply-form-status error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML =
      'Submit Application <i class="ri-arrow-right-line"></i>';
  }
});}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeApplyModal();
  }
})

// >>>>>>>>>>>>>>>>>>>>>> nav btn
function openReferralModal() {
  document.getElementById("referralModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeReferralModal() {
  document.getElementById("referralModal").classList.remove("active");
  document.body.style.overflow = "";
}

// ── REFERRAL FORM — stays on EmailJS ──────────────────
const referralForm = document.getElementById("referralForm");

if (referralForm) {
  referralForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const templateParams = {};

    formData.forEach((value, key) => {
      templateParams[key] = value;
    });

    emailjs
      .send(
        "service_5y6tya9",
        "template_95kbk9p",
        templateParams,
        "lJBPZEThLQpI2FlU9"
      )
      .then(() => {
        document.getElementById("referralStatus").innerHTML =
          "Application submitted successfully.";

        this.reset();

        setTimeout(() => {
          closeReferralModal();
        }, 2000);
      })
      .catch((error) => {
        console.error(error);

        document.getElementById("referralStatus").innerHTML =
          "Something went wrong.";
      });
  });
};


// ── SERVICE PAGE APPLICATION FORM (Project & Expansion Finance) — now via Formspree ──

const serviceApplyForm = document.getElementById("serviceApplyForm");

if (serviceApplyForm) {
  serviceApplyForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const statusEl = this.querySelector(".apply-form-status");

    const formData = new FormData(this);

    // Add service name (this form has no dedicated service input)
    formData.append("service", "Project & Expansion Finance");

    // Mobile number validation
    const contact = formData.get("contact");
    if (contact && !/^\d{10}$/.test(contact)) {
      statusEl.textContent = "Please enter a valid 10 digit mobile number.";
      statusEl.className = "apply-form-status error";
      return;
    }

    // Button loading
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        statusEl.textContent =
          "Application submitted successfully! Our team will contact you soon.";
        statusEl.className = "apply-form-status success";
        this.reset();
      } else {
        const result = await response.json();
        statusEl.textContent = result.errors
          ? result.errors.map((err) => err.message).join(", ")
          : "Something went wrong. Please try again.";
        statusEl.className = "apply-form-status error";
      }
    } catch (error) {
      console.error("Formspree Error:", error);
      statusEl.textContent = "Something went wrong. Please try again.";
      statusEl.className = "apply-form-status error";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML =
        'Submit Application <i class="fa-solid fa-arrow-right"></i>';
    }
  });
}