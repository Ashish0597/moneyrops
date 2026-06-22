// ── SERVICE CONFIG: fields per service ──────────────
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
    title: "Cash Credit (CC)",
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
      { label: "Monthly Net Salary", name: "monthly_salary", type: "text" }
    ]
  },

  "lap": {
    title: "Loan Against Property (LAP)",
    fields: [
      { label: "Name", name: "name", type: "text" },
      { label: "Contact", name: "contact", type: "tel" },
      { label: "City", name: "city", type: "text" },
      { label: "E-mail ID", name: "email", type: "email" }
    ]
  },

  "business-loan": {
    title: "Business Loan (BL)",
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
      { label: "Monthly Net Salary", name: "monthly_salary", type: "text" }
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
      { label: "Monthly Net Salary", name: "monthly_salary", type: "text" },
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
      { label: "Monthly Net Salary", name: "monthly_salary", type: "text" }
    ]
  },

  "overdraft": {
    title: "Overdraft (OD)",
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
      { label: "Monthly Net Salary", name: "monthly_salary", type: "text" }
    ]
  }
};

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

// ── FORM SUBMIT (EmailJS integration placeholder) ────
document.getElementById("applyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitBtn = e.target.querySelector(".apply-submit-btn");
  const statusEl = document.getElementById("applyFormStatus");

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const formData = new FormData(e.target);
  const templateParams = {};
  if (
  templateParams.contact &&
  !/^\d{10}$/.test(templateParams.contact)
) {
  statusEl.textContent =
    "Please enter a valid 10 digit mobile number.";
  statusEl.className = "apply-form-status error";

  submitBtn.disabled = false;
  submitBtn.innerHTML =
    'Submit Application <i class="ri-arrow-right-line"></i>';

  return;
}
  formData.forEach((value, key) => {
    templateParams[key] = value;
  });

  // EmailJS call (Service ID, Template ID, Public Key baad mein daalenge)
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams, "YOUR_PUBLIC_KEY")
    .then(() => {
      statusEl.textContent = "Application submitted successfully!";
      statusEl.className = "apply-form-status success";
      e.target.reset();
      setTimeout(() => closeApplyModal(), 2000);
    })
    .catch(() => {
      statusEl.textContent = "Something went wrong. Please try again.";
      statusEl.className = "apply-form-status error";
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Submit Application <i class="ri-arrow-right-line"></i>`;
    });
    document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeApplyModal();
  }
});
});

// >>>>>>>>>>>>>>>>>>>>>> nav btn
function openReferralModal() {
  document.getElementById("referralModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeReferralModal() {
  document.getElementById("referralModal").classList.remove("active");
  document.body.style.overflow = "";
}

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
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        templateParams,
        "YOUR_PUBLIC_KEY"
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
}


// contact page

