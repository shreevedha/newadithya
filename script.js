/* ==========================================================================
   ADITYA MEDICARE HOSPITALS - INTERACTIVE LOGIC & FULL DOCTORS SYSTEM
   ========================================================================== */

// SPECIALTIES DATASET
const specialtiesData = [
  { name: "Cardiology", icon: "🫀", description: "Comprehensive cardiac care, Cath Lab & interventional cardiology." },
  { name: "Orthopedics", icon: "🦴", description: "Joint replacement, spine, arthroscopy & trauma surgery." },
  { name: "Pulmonology", icon: "🫁", description: "Advanced respiratory care, sleep medicine & bronchoscopy." },
  { name: "Neurology", icon: "🧠", description: "Brain & spine surgery, stroke management & neuro ICU." },
  { name: "Gastroenterology", icon: "🧬", description: "Advanced GI endoscopy, hepatology & HPB surgery." },
  { name: "Urology", icon: "🩺", description: "Kidney stone care, endourology & reconstructive urology." },
  { name: "Pediatrics", icon: "👶", description: "Child health, neonatal intensive care (NICU) & pediatric surgery." },
  { name: "Mother & Child", icon: "🤱", description: "Obstetrics, gynecology, high-risk pregnancy & fertility." },
  { name: "Nephrology", icon: "🩺", description: "Dialysis, kidney care & nephrology consultation." },
  { name: "Critical Care", icon: "🏥", description: "24/7 100-bed ICU, trauma & emergency critical care." },
  { name: "General Medicine", icon: "🩺", description: "Internal medicine, infectious disease & adult care." },
  { name: "General Surgery", icon: "🔪", description: "Laparoscopic, laser & general surgical procedures." },
  { name: "ENT", icon: "👂", description: "Ear, nose, throat, micro-ear & head/neck surgery." },
  { name: "Dermatology", icon: "✨", description: "Skin, hair, laser treatment & clinical dermatology." },
  { name: "Radiology", icon: "📷", description: "3T MRI, 128-Slice CT Scan, Ultrasound & Digital X-Ray." }
];

// COMPREHENSIVE DOCTORS DATABASE (36 REAL CONSULTANTS & SURGEONS)
const doctorsData = [
  {
    name: "Dr. Krishna Sravanth Pakanati",
    department: "Orthopedics",
    qualification: "MBBS, DNB Orthopedics, MCh Ortho, FJR, FSS",
    designation: "Chief Consultant Orthopedic & Joint Replacement Surgeon",
    image: "images/doctors/krishna-sravanth.jpg",
    summary: "Senior orthopedic surgeon specializing in MISSO Robotic joint replacement, arthroscopy, and complex trauma care.",
    treatments: ["MISSO Robotic Knee", "Joint Replacement", "Arthroscopy", "Spine & Trauma Care"]
  },
  {
    name: "Dr. Ramakoteswara Rao K",
    department: "Orthopedics",
    qualification: "D Ortho, Fellowship in Arthroplasty and Arthroscopy",
    designation: "Senior Consultant Orthopaedic Surgeon",
    image: "images/doctors/ramakoteswara-rao.jpg",
    summary: "Expert in primary & revision hip and knee replacements and sports injury arthroscopic management.",
    treatments: ["Knee & Hip Replacement", "Arthroscopy", "Joint Pain Care", "Fracture Surgery"]
  },
  {
    name: "Dr. Sai Krishna Katakam",
    department: "Gastroenterology",
    qualification: "MBBS, MS, MCh (SGPGIMS Lucknow)",
    designation: "Consultant Surgical Gastroenterologist & GI Onco-surgeon",
    image: "images/doctors/sai-krishna-katakam.jpeg",
    summary: "Specialist in laparoscopic GI surgery, HPB liver procedures, and GI surgical oncology.",
    treatments: ["Laparoscopic GI Surgery", "HPB & Liver Care", "GI Onco-surgery", "Endoscopy"]
  },
  {
    name: "Dr. Raghu Sarath Punukollu",
    department: "Urology",
    qualification: "MBBS, DNB, MCh Urology",
    designation: "Consultant Urologist, Reconstructive Surgeon & Andrologist",
    image: "images/doctors/raghu-sarath.jpg",
    summary: "Expert in laser kidney stone removal (RIRS), prostate surgery, endourology, and male fertility.",
    treatments: ["Laser Stone Removal (RIRS)", "Prostate Surgery", "Andrology", "Endourology"]
  },
  {
    name: "Dr. Guttikonda Bhanu Vijay",
    department: "Cardiology",
    qualification: "MBBS, MD General Medicine, DM Cardiology",
    designation: "Consultant Interventional Cardiologist",
    image: "images/doctors/dr-guttikonda.jpeg",
    summary: "Senior cardiologist specializing in 24/7 emergency primary angioplasty, Cath Lab procedures, and heart failure.",
    treatments: ["Angioplasty & Stenting", "Cath Lab Interventions", "Heart Failure Care", "Pacemaker"]
  },
  {
    name: "Dr. Viswa Jyothi Yakkala",
    department: "Neurology",
    qualification: "MBBS, MD, DM Neurology",
    designation: "Consultant Neurologist & Stroke Specialist",
    image: "images/doctors/dr-viswa-jyothi.jpeg",
    summary: "Specialist in acute stroke thrombolysis, epilepsy, headache management, and neuro intensive care.",
    treatments: ["Acute Stroke Care", "Epilepsy Management", "Migraine & Headache", "Neuro ICU Care"]
  },
  {
    name: "Dr. Sajila",
    department: "Mother & Child",
    qualification: "MBBS, MS (OBG), DNB",
    designation: "Consultant Obstetrician & Gynecologist",
    image: "images/doctors/dr-sajila.jpeg",
    summary: "Specialist in high-risk pregnancy, laparoscopic gynecology surgery, painless delivery, and women's health.",
    treatments: ["High-Risk Pregnancy", "Laparoscopic Gynecology", "Painless Delivery", "Infertility Care"]
  },
  {
    name: "Dr. Farha",
    department: "Pediatrics",
    qualification: "MBBS, DCH, DNB Pediatrics",
    designation: "Consultant Pediatrician & Neonatologist",
    image: "images/doctors/dr-farha.jpeg",
    summary: "Expert in newborn NICU care, child vaccination, pediatric emergency management, and growth care.",
    treatments: ["Level-III NICU Care", "Child Vaccination", "Pediatric Emergency", "Growth & Nutrition"]
  },
  {
    name: "Dr. Dinesh",
    department: "Pulmonology",
    qualification: "MBBS, MD Pulmonology",
    designation: "Consultant Pulmonologist & Sleep Specialist",
    image: "images/doctors/dr-dinesh.jpeg",
    summary: "Expert in asthma, COPD, sleep apnea diagnosis, video bronchoscopy, and respiratory ICU care.",
    treatments: ["Asthma & COPD", "Video Bronchoscopy", "Sleep Apnea Care", "Respiratory ICU"]
  },
  {
    name: "Dr. Sunil Kumar Thadigiri",
    department: "Critical Care",
    qualification: "MBBS, MD Anesthesia, IDCCM",
    designation: "Chief Intensivist & Critical Care Specialist",
    image: "images/doctors/dr-sunil-thadigiri.jpeg",
    summary: "Head of 100-bed ICU managing multi-organ failure, poly-trauma, sepsis, and mechanical ventilation.",
    treatments: ["100-Bed ICU Care", "Ventilator Support", "Poly-Trauma Management", "Sepsis Care"]
  },
  {
    name: "Dr. Sravani Jakkireddy",
    department: "Mother & Child",
    qualification: "MBBS, MS (OBG), DNB",
    designation: "Consultant Gynecologic Surgeon & Fertility Specialist",
    image: "images/doctors/dr-sravani-jakkireddy.jpeg",
    summary: "Expert in minimally invasive gynecologic procedures, fertility workup, and maternity wellness.",
    treatments: ["Fertility Care", "Laparoscopic Surgery", "High-Risk Delivery", "Prenatal Care"]
  },
  {
    name: "Dr. Meena",
    department: "General Medicine",
    qualification: "MBBS, MD General Medicine",
    designation: "Consultant Physician & Diabetologist",
    image: "images/doctors/dr-meena.jpeg",
    summary: "Specialist in diabetes mellitus management, hypertension, infectious diseases, and adult health.",
    treatments: ["Diabetes Care", "Hypertension", "Infectious Diseases", "Preventive Checkups"]
  },
  {
    name: "Dr. Abhiram Katragadda",
    department: "Orthopedics",
    qualification: "MBBS, MS Ortho, FIJR",
    designation: "Consultant Joint Replacement & Trauma Surgeon",
    image: "images/doctors/abhiram-katragadda.png",
    summary: "Specialist in complex fracture reconstruction, sports medicine, and joint replacement.",
    treatments: ["Fracture Reconstruction", "Joint Replacement", "Sports Injuries", "Arthroscopy"]
  },
  {
    name: "Dr. Akif Baig",
    department: "Cardiology",
    qualification: "MBBS, MD, DM Cardiology",
    designation: "Consultant Cardiologist",
    image: "images/doctors/akif-baig.jpg",
    summary: "Consultant for adult cardiology, echocardiography, coronary angiogram, and hypertension care.",
    treatments: ["Echocardiography", "Coronary Angiogram", "Hypertension", "Preventive Heart Care"]
  },
  {
    name: "Dr. BCHV Akhilesh",
    department: "General Surgery",
    qualification: "MBBS, MS General Surgery, FMAS",
    designation: "Consultant Laparoscopic & General Surgeon",
    image: "images/doctors/bchv-akhilesh.png",
    summary: "Specialist in laparoscopic hernia repair, appendectomy, gallbladder surgery, and laser proctology.",
    treatments: ["Laparoscopic Hernia", "Appendectomy", "Gallbladder Surgery", "Laser Proctology"]
  },
  {
    name: "Dr. Bhumana Sai Srinivas",
    department: "Neurology",
    qualification: "MBBS, MD, DM Neurology",
    designation: "Consultant Neurologist",
    image: "images/doctors/bhumana-sai-srinivas.jpg",
    summary: "Specialist in peripheral neuropathy, neuromuscular disorders, stroke, and Parkinson's disease.",
    treatments: ["Neuropathy Care", "Parkinson's Care", "Stroke Recovery", "EEG & EMG"]
  },
  {
    name: "Dr. Ch. Amulya",
    department: "Pediatrics",
    qualification: "MBBS, MD Pediatrics",
    designation: "Consultant Pediatric Physician",
    image: "images/doctors/ch-amulya.jpg",
    summary: "Dedicated pediatrician focusing on pediatric infectious diseases, nutrition, and child growth.",
    treatments: ["Child Health Care", "Immunization", "Pediatric Infections", "Growth Monitoring"]
  },
  {
    name: "Dr. Bindesh",
    department: "Urology",
    qualification: "MBBS, MS, MCh Urology",
    designation: "Consultant Urologist & Kidney Transplant Surgeon",
    image: "images/doctors/dr-bindesh.png",
    summary: "Expert in endourological procedures, laparoscopic urology, and kidney stone management.",
    treatments: ["Endourology", "Kidney Stone Laser", "Laparoscopic Urology", "Prostate Care"]
  },
  {
    name: "Dr. Gamidi Anusha",
    department: "Mother & Child",
    qualification: "MBBS, DNB (OBG)",
    designation: "Consultant Obstetrician",
    image: "images/doctors/gamidi-anusha.jpg",
    summary: "Consultant obstetrician managing routine and complicated maternity deliveries and adolescent health.",
    treatments: ["Maternity Care", "Normal Delivery", "Postnatal Care", "Women's Wellness"]
  },
  {
    name: "Dr. Goli Kasiram",
    department: "Nephrology",
    qualification: "MBBS, MD, DM Nephrology",
    designation: "Consultant Nephrologist & Transplant Physician",
    image: "images/doctors/goli-kasiram.jpg",
    summary: "Specialist in acute renal failure, chronic kidney disease (CKD), hemodialysis, and kidney care.",
    treatments: ["Hemodialysis", "Chronic Kidney Disease", "Hypertensive Renal Care", "Kidney Health"]
  },
  {
    name: "Dr. Gopala Krishna Medarametla",
    department: "General Medicine",
    qualification: "MBBS, MD General Medicine",
    designation: "Senior Consultant Physician",
    image: "images/doctors/gopala-krishna-medarametla.jpg",
    summary: "Comprehensive internal medicine specialist for metabolic disorders, fever evaluation, and adult care.",
    treatments: ["Internal Medicine", "Fever & Infection", "Metabolic Care", "Geriatric Care"]
  },
  {
    name: "Dr. J. Ramesh",
    department: "Cardiology",
    qualification: "MBBS, MD, DM Cardiology",
    designation: "Consultant Clinical Cardiologist",
    image: "images/doctors/j-ramesh.jpg",
    summary: "Expert in non-invasive cardiac evaluation, treadmill stress testing (TMT), and arrhythmia management.",
    treatments: ["ECG & TMT", "Echocardiogram", "Arrhythmia Care", "Heart Health Checkup"]
  },
  {
    name: "Dr. Jinaga Nageswar Rao",
    department: "Pulmonology",
    qualification: "MBBS, DTCD, DNB Chest",
    designation: "Senior Consultant Chest Physician",
    image: "images/doctors/jinaga-nageswar-rao.jpg",
    summary: "Specialist in tuberculosis, lung fibrosis, chest infections, and occupational lung disorders.",
    treatments: ["Tuberculosis Care", "Lung Infections", "Chest Clinic", "Pulmonary Rehab"]
  },
  {
    name: "Dr. K. Suri Babu",
    department: "Orthopedics",
    qualification: "MBBS, MS Ortho",
    designation: "Senior Consultant Orthopedic Surgeon",
    image: "images/doctors/k-suri-babu.png",
    summary: "Experienced orthopedic surgeon specializing in complex joint trauma and bone deformity correction.",
    treatments: ["Trauma Surgery", "Deformity Correction", "Bone Fractures", "Joint Pain"]
  },
  {
    name: "Dr. Kesari Sravani",
    department: "Dermatology",
    qualification: "MBBS, DDVL",
    designation: "Consultant Dermatologist & Cosmetologist",
    image: "images/doctors/kesari-sravani.jpg",
    summary: "Expert in clinical dermatology, acne, psoriasis, eczema, and laser cosmetic treatments.",
    treatments: ["Acne & Psoriasis", "Laser Skin Care", "Hair Loss Treatment", "Dermatologic Surgery"]
  },
  {
    name: "Dr. Nimmagadda Bhanu Teja",
    department: "Critical Care",
    qualification: "MBBS, DA, IDCCM",
    designation: "Consultant Intensivist",
    image: "images/doctors/nimmagadda-bhanu-teja.jpg",
    summary: "Round-the-clock critical care consultant for trauma, respiratory failure, and post-operative monitoring.",
    treatments: ["ICU Monitoring", "Post-Op ICU Care", "Respiratory Failure", "Emergency Care"]
  },
  {
    name: "Dr. Pavan Badugu",
    department: "Gastroenterology",
    qualification: "MBBS, MD, DM Gastroenterology",
    designation: "Consultant Medical Gastroenterologist",
    image: "images/doctors/pavan-badugu.jpg",
    summary: "Specialist in diagnostic & therapeutic upper GI endoscopy, colonoscopy, GERD, and liver disorders.",
    treatments: ["Diagnostic Endoscopy", "Colonoscopy", "GERD & Acidity", "Liver Disease"]
  },
  {
    name: "Dr. Racha Madhavi",
    department: "Mother & Child",
    qualification: "MBBS, DGO",
    designation: "Consultant Gynecologist",
    image: "images/doctors/racha-madhavi.jpg",
    summary: "Consultant gynecologist for preventive cervical screening, fibroid management, and menopause care.",
    treatments: ["Gynec Care", "Pap Smear & Screening", "Fibroid Care", "Menopause Care"]
  },
  {
    name: "Dr. Sampara Sirish",
    department: "ENT",
    qualification: "MBBS, MS ENT",
    designation: "Consultant ENT, Head & Neck Surgeon",
    image: "images/doctors/sampara-sirish.jpg",
    summary: "Specialist in micro-ear surgery, endoscopic sinus surgery (FESS), tonsillectomy, and voice care.",
    treatments: ["Micro-Ear Surgery", "Endoscopic Sinus Surgery", "Tonsil & Adenoids", "Voice Disorders"]
  },
  {
    name: "Dr. Seshank Nuthi",
    department: "Radiology",
    qualification: "MBBS, MD Radiology",
    designation: "Chief Consultant Radiologist",
    image: "images/doctors/seshank-nuthi.jpg",
    summary: "Head of diagnostic radiology overseeing 3T MRI, 128-Slice CT scan, color Doppler, and ultrasound.",
    treatments: ["3T MRI Diagnostics", "128-Slice CT Scan", "Ultrasound & Doppler", "X-Ray Interpretation"]
  },
  {
    name: "Dr. Tejaswi Gogineni",
    department: "Pathology",
    qualification: "MBBS, MD Pathology",
    designation: "Consultant Pathologist & Lab Director",
    image: "images/doctors/tejaswi-gogineni.jpg",
    summary: "Director of central clinical pathology, histopathology, hematology, and biochemistry diagnostic lab.",
    treatments: ["Clinical Pathology", "Histopathology", "Hematology", "Diagnostic Lab"]
  },
  {
    name: "Dr. Unnam Yamuna",
    department: "General Surgery",
    qualification: "MBBS, MS General Surgery",
    designation: "Consultant General Surgeon",
    image: "images/doctors/unnam-yamuna.png",
    summary: "Consultant surgeon specializing in breast surgery, thyroid surgery, wound care, and diabetic foot management.",
    treatments: ["Breast & Thyroid Surgery", "Wound Care", "Diabetic Foot Care", "Minor Operations"]
  },
  {
    name: "Dr. V. Bhaskara Rao",
    department: "Orthopedics",
    qualification: "MBBS, D Ortho",
    designation: "Consultant Orthopedic Surgeon",
    image: "images/doctors/v-bhaskara-rao.jpg",
    summary: "Consultant for degenerative joint diseases, arthritis management, and emergency trauma fixation.",
    treatments: ["Arthritis Management", "Trauma Fixation", "Spine Pain Care", "Orthopedic OPD"]
  },
  {
    name: "Dr. V. Sai Krupa",
    department: "General Medicine",
    qualification: "MBBS, MD General Medicine",
    designation: "Consultant General Physician",
    image: "images/doctors/v-sai-krupa.jpg",
    summary: "General internal medicine consultant for routine ailments, preventive health screening, and chronic disease management.",
    treatments: ["General OPD", "Preventive Screening", "Chronic Disease Care", "Adult Health"]
  },
  {
    name: "Dr. Vaddi Viswanath",
    department: "Urology",
    qualification: "MBBS, MS, MCh Urology",
    designation: "Consultant Urologist",
    image: "images/doctors/vaddi-viswanath.jpg",
    summary: "Specialist in urinary tract infections, male urinary problems, bladder issues, and kidney stone management.",
    treatments: ["Urinary Tract Care", "Bladder Surgery", "Kidney Stones", "Prostate Health"]
  },
  {
    name: "Dr. Y.S. Himaja",
    department: "Mother & Child",
    qualification: "MBBS, MS (OBG)",
    designation: "Consultant Gynecologist & Fetal Medicine Specialist",
    image: "images/doctors/ys-himaja.jpg",
    summary: "Specialist in fetal ultrasound scans, high-risk maternity care, and genetic counseling.",
    treatments: ["Fetal Medicine", "Ultrasound Scans", "High-Risk Obstetrics", "Maternal Wellness"]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initActiveNavLink();
  initAppointmentModal();
  initDoctorFilters();
  initStatCounters();
  initBackToTop();
  initAOS();
  initCoETabs();
  initChatbot();
  initFacilityFilters();
  initBlogFilters();
  init3DTilt();
  initTechHotspots();
  initPatientJourney();
  initHeroEntrance();
  init3DParticleCanvas();
  initThreeJSMedicalScene();
  initGSAPScrollAnimations();
  initVanillaTiltEngine();
  initScrollProgressBar();
  initStepByStepModal();
  initFacilityTourGSAP();
  initThreeJSMedicalVisualizationCanvas();
  initUniversalGSAPAnimations();
});

/* --------------------------------------------------------------------------
   0. NAVBAR SCROLL EFFECT
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   1. MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  const closeBtn = document.getElementById('mobile-drawer-close');

  if (!toggleBtn || !drawer || !overlay) return;

  function openMenu() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   2. ACTIVE NAV LINK HIGHLIGHT
   -------------------------------------------------------------------------- */
function initActiveNavLink() {
  const links = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* --------------------------------------------------------------------------
   3. UNIVERSAL APPOINTMENT BOOKING MODAL
   -------------------------------------------------------------------------- */
function initAppointmentModal() {
  const modal = document.getElementById('appointment-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const form = document.getElementById('appointment-form');

  if (!modal) return;

  let lastFocusedElement = null;

  // Global trigger function
  window.openAppointmentModal = function(doctorName = '', department = '') {
    lastFocusedElement = document.activeElement;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const deptSelect = document.getElementById('modal-department-select');
    const doctorSelect = document.getElementById('modal-doctor-select');
    const nameInput = document.getElementById('modal-patient-name');

    if (deptSelect && department) {
      deptSelect.value = department;
    }
    if (doctorSelect && doctorName) {
      doctorSelect.value = doctorName;
    }

    setTimeout(() => {
      nameInput?.focus();
    }, 100);
  };

  window.closeAppointmentModal = function() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', window.closeAppointmentModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      window.closeAppointmentModal();
    }
  });

  // Keyboard Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      window.closeAppointmentModal();
    }
  });

  // Attach click listener to all book buttons
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-modal]');
    if (trigger) {
      e.preventDefault();
      const doc = trigger.getAttribute('data-doctor') || '';
      const dept = trigger.getAttribute('data-department') || '';
      window.openAppointmentModal(doc, dept);
    }
  });

  // Form submission handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modal-patient-name')?.value || 'Patient';
      const phone = document.getElementById('modal-patient-phone')?.value || '';

      if (!phone) {
        showToast('Please enter a valid contact phone number.');
        return;
      }

      showToast(`Thank you, ${name}! Your appointment request has been received. Our team will contact you shortly.`);
      form.reset();
      window.closeAppointmentModal();
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✓</span> <div>${message}</div>`;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 4500);
}

/* --------------------------------------------------------------------------
   4. DOCTOR FILTERS & DYNAMIC SEARCH
   -------------------------------------------------------------------------- */
function initDoctorFilters() {
  const doctorGrid = document.getElementById('doctors-grid-container');
  const searchInput = document.getElementById('doctor-search-input');
  const filterPillsContainer = document.getElementById('filter-pills-container');

  if (!doctorGrid) return; // Not on page with dynamic doctor grid

  let currentCategory = 'All';

  // Render filter pills
  if (filterPillsContainer) {
    const categories = ['All', 'Orthopedics', 'Cardiology', 'Gastroenterology', 'Neurology', 'Urology', 'Pulmonology', 'Pediatrics', 'Mother & Child', 'Critical Care', 'General Medicine', 'General Surgery', 'Nephrology', 'Dermatology', 'ENT', 'Radiology', 'Pathology'];
    filterPillsContainer.innerHTML = categories.map(cat => 
      `<button class="filter-pill ${cat === 'All' ? 'active' : ''}" data-category="${cat}">${cat}</button>`
    ).join('');

    filterPillsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      filterDoctors();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterDoctors);
  }

  function renderDoctors(list) {
    if (list.length === 0) {
      doctorGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; background: #ffffff; border-radius: 16px; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
        <div style="font-size: 2.5rem; margin-bottom: 12px;">🩺</div>
        <h3 style="margin-bottom: 8px; color: var(--navy); font-size: 1.3rem;">No matching doctors found</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Try searching for another specialty, doctor name, or qualification.</p>
      </div>`;
      return;
    }

    doctorGrid.innerHTML = list.map(doc => `
      <div class="doctor-card doctor-card-horizontal">
        <div class="doctor-card-main">
          <div class="doctor-photo-col">
            <div class="doctor-photo-wrap">
              <img src="${doc.image}" alt="${doc.name}" loading="lazy" onerror="this.src='images/doctor-placeholder.svg';" />
            </div>
            <div class="doctor-opd-badge-below">
              <span class="opd-dot"></span> OPD Mon - Sat
            </div>
          </div>

          <div class="doctor-details-wrap">
            <div class="doctor-meta-header">
              <span class="doctor-dept-badge">${doc.department}</span>
            </div>
            <h3 class="doctor-name">${doc.name}</h3>
            <div class="doctor-qualification">${doc.qualification}</div>
            <div class="doctor-designation">${doc.designation}</div>
            <div class="doctor-treatments">
              ${doc.treatments.slice(0, 3).map(t => `<span class="treatment-tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="doctor-card-footer">
          <button class="btn btn-primary doctor-card-action" data-open-modal="true" data-doctor="${doc.name}" data-department="${doc.department}">
            <span>📅 Book Appointment</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  function filterDoctors() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    let filtered = doctorsData.filter(doc => {
      const matchesCategory = currentCategory === 'All' || doc.department.toLowerCase() === currentCategory.toLowerCase();
      const matchesSearch = !query || 
        doc.name.toLowerCase().includes(query) ||
        doc.department.toLowerCase().includes(query) ||
        doc.qualification.toLowerCase().includes(query) ||
        doc.designation.toLowerCase().includes(query) ||
        doc.treatments.some(t => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });

    // Limit to 6 doctors on homepage (index.html), show all on doctors.html
    const isHomepage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
    if (isHomepage && !query && currentCategory === 'All') {
      filtered = filtered.slice(0, 6);
    }

    renderDoctors(filtered);
  }

  // Initial render of all doctors into grid
  filterDoctors();
}

/* --------------------------------------------------------------------------
   5. STAT COUNTERS ANIMATION
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-target') || '0', 10);
          if (!target) return;

          let count = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            const suffix = num.getAttribute('data-suffix') || '';
            num.innerHTML = count.toLocaleString() + `<span>${suffix}</span>`;
          }, 30);
        });
      }
    });
  }, { threshold: 0.2 });

  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) observer.observe(statsGrid);
}

/* --------------------------------------------------------------------------
   6. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  let btn = document.getElementById('back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '↑';
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   7. AOS (ANIMATE ON SCROLL) SCRIPT observer
   -------------------------------------------------------------------------- */
function initAOS() {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   8. COE (CENTERS OF EXCELLENCE) TAB SWITCHER
   -------------------------------------------------------------------------- */
function initCoETabs() {
  const tabs = document.querySelectorAll('.coe-tab-btn');
  const panels = document.querySelectorAll('.coe-tab-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. ADVANCED INTERACTIVE AI ASSISTANT CHATBOT (DOCTORS & OPTIONS)
   -------------------------------------------------------------------------- */
function initChatbot() {
  const trigger = document.getElementById('chatbot-trigger');
  const panel = document.getElementById('chatbot-panel');
  const closeBtn = document.getElementById('chatbot-close');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send-btn');
  const chatBody = document.getElementById('chatbot-body');
  const suggestionsContainer = document.querySelector('.chatbot-suggestions');

  if (!trigger || !panel) return;

  // Toggle Chat Panel
  trigger.addEventListener('click', () => {
    panel.classList.toggle('active');
    if (panel.classList.contains('active') && chatBody.children.length <= 1) {
      showInitialMenuOptions();
    }
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.remove('active');
  });

  // Typing indicator helper
  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chat-msg bot-msg typing-indicator';
    indicator.id = 'chat-typing-indicator';
    indicator.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
    chatBody.appendChild(indicator);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) indicator.remove();
  }

  // Helper to append message (supports plain text or HTML cards)
  function appendMessage(content, sender, isHTML = false) {
    removeTypingIndicator();
    const msg = document.createElement('div');
    msg.classList.add('chat-msg', sender === 'user' ? 'user-msg' : 'bot-msg');
    if (isHTML) {
      msg.innerHTML = content;
    } else {
      msg.textContent = content;
    }
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;

    // Attach click listeners to any dynamic booking or action buttons inside HTML messages
    msg.querySelectorAll('[data-chat-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-chat-action');
        const doc = btn.getAttribute('data-doc');
        const dept = btn.getAttribute('data-dept');

        if (action === 'book') {
          panel.classList.remove('active');
          const modal = document.getElementById('appointment-modal');
          if (modal) {
            modal.setAttribute('aria-hidden', 'false');
            modal.classList.add('active');
            const deptSelect = document.getElementById('modal-department');
            if (deptSelect && dept) deptSelect.value = dept;
          }
        } else if (action === 'select-dept') {
          handleDepartmentSelect(dept);
        } else if (action === 'menu') {
          showInitialMenuOptions();
        }
      });
    });
  }

  // Show initial interactive menu chips
  function showInitialMenuOptions() {
    showTypingIndicator();
    setTimeout(() => {
      const menuHTML = `
        <div><strong>How can I assist you today? Please select an option:</strong></div>
        <div class="chat-options-grid" style="margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
          <button class="btn btn-secondary btn-sm" data-chat-action="select-dept" data-dept="all" style="text-align: left; justify-content: start;">🩺 Find Specialist Doctor</button>
          <button class="btn btn-primary btn-sm" data-chat-action="book" style="text-align: left; justify-content: start;">📅 Book OPD Appointment</button>
          <a href="tel:08632944444" class="btn btn-danger btn-sm" style="text-align: left; justify-content: start; text-decoration: none; color: white;">🚨 Emergency Helpline (24/7)</a>
        </div>
      `;
      appendMessage(menuHTML, 'bot', true);
    }, 400);
  }

  // Department specialist cards flow
  function handleDepartmentSelect(dept) {
    showTypingIndicator();
    setTimeout(() => {
      let docHTML = '';

      if (dept === 'Cardiology' || dept === 'all') {
        docHTML += `
          <div class="chat-doc-card" style="background: rgba(8,126,164,0.08); padding: 10px; border-radius: 8px; margin-bottom: 8px; border: 1px solid rgba(8,126,164,0.2);">
            <div style="font-weight:700; color:var(--navy);">Dr. Guttikonda Bhanu Vijay</div>
            <div style="font-size:0.78rem; color:var(--blue);">MD, DM Cardiology • Interventional Cardiologist</div>
            <button class="btn btn-primary btn-sm" data-chat-action="book" data-doc="Dr. Guttikonda Bhanu Vijay" data-dept="Cardiology" style="margin-top: 6px; width: 100%; font-size: 0.78rem; padding: 6px;">📅 Book Dr. Bhanu Vijay</button>
          </div>
        `;
      }

      if (dept === 'Orthopedics' || dept === 'all') {
        docHTML += `
          <div class="chat-doc-card" style="background: rgba(8,126,164,0.08); padding: 10px; border-radius: 8px; margin-bottom: 8px; border: 1px solid rgba(8,126,164,0.2);">
            <div style="font-weight:700; color:var(--navy);">Dr. Krishna Sravanth Pakanati</div>
            <div style="font-size:0.78rem; color:var(--blue);">MCh Ortho, FJR • MISSO Robotic Joint Surgeon</div>
            <button class="btn btn-primary btn-sm" data-chat-action="book" data-doc="Dr. Krishna Sravanth Pakanati" data-dept="Orthopedics" style="margin-top: 6px; width: 100%; font-size: 0.78rem; padding: 6px;">📅 Book Dr. Krishna Sravanth</button>
          </div>
          <div class="chat-doc-card" style="background: rgba(8,126,164,0.08); padding: 10px; border-radius: 8px; margin-bottom: 8px; border: 1px solid rgba(8,126,164,0.2);">
            <div style="font-weight:700; color:var(--navy);">Dr. Ramakoteswara Rao K</div>
            <div style="font-size:0.78rem; color:var(--blue);">D Ortho, Arthroplasty Fellow • Senior Orthopaedic Surgeon</div>
            <button class="btn btn-primary btn-sm" data-chat-action="book" data-doc="Dr. Ramakoteswara Rao K" data-dept="Orthopedics" style="margin-top: 6px; width: 100%; font-size: 0.78rem; padding: 6px;">📅 Book Dr. Ramakoteswara</button>
          </div>
        `;
      }

      if (dept === 'Neurology' || dept === 'all') {
        docHTML += `
          <div class="chat-doc-card" style="background: rgba(8,126,164,0.08); padding: 10px; border-radius: 8px; margin-bottom: 8px; border: 1px solid rgba(8,126,164,0.2);">
            <div style="font-weight:700; color:var(--navy);">Dr. Viswa Jyothi Yakkala</div>
            <div style="font-size:0.78rem; color:var(--blue);">MD, DM Neurology • Stroke & Epilepsy Specialist</div>
            <button class="btn btn-primary btn-sm" data-chat-action="book" data-doc="Dr. Viswa Jyothi Yakkala" data-dept="Neurology" style="margin-top: 6px; width: 100%; font-size: 0.78rem; padding: 6px;">📅 Book Dr. Viswa Jyothi</button>
          </div>
        `;
      }

      if (dept === 'Gastroenterology' || dept === 'all') {
        docHTML += `
          <div class="chat-doc-card" style="background: rgba(8,126,164,0.08); padding: 10px; border-radius: 8px; margin-bottom: 8px; border: 1px solid rgba(8,126,164,0.2);">
            <div style="font-weight:700; color:var(--navy);">Dr. Sai Krishna Katakam</div>
            <div style="font-size:0.78rem; color:var(--blue);">MS, MCh (SGPGIMS) • Surgical Gastroenterologist</div>
            <button class="btn btn-primary btn-sm" data-chat-action="book" data-doc="Dr. Sai Krishna Katakam" data-dept="Gastroenterology" style="margin-top: 6px; width: 100%; font-size: 0.78rem; padding: 6px;">📅 Book Dr. Sai Krishna</button>
          </div>
        `;
      }

      const fullContent = `
        <div><strong>Specialist Doctors:</strong></div>
        <div style="margin-top: 10px;">${docHTML}</div>
        <button class="btn btn-secondary btn-sm" data-chat-action="menu" style="width:100%; margin-top: 6px;">↩ Back to Main Menu</button>
      `;
      appendMessage(fullContent, 'bot', true);
    }, 600);
  }

  // Handle user typed or chip query
  function handleBotResponse(query) {
    const q = query.toLowerCase();
    showTypingIndicator();

    setTimeout(() => {
      if (q.includes('doctor') || q.includes('specialist') || q.includes('find') || q.includes('consultant')) {
        handleDepartmentSelect('all');
      } else if (q.includes('cardio') || q.includes('heart')) {
        handleDepartmentSelect('Cardiology');
      } else if (q.includes('ortho') || q.includes('bone') || q.includes('knee') || q.includes('joint')) {
        handleDepartmentSelect('Orthopedics');
      } else if (q.includes('neuro') || q.includes('brain') || q.includes('stroke')) {
        handleDepartmentSelect('Neurology');
      } else if (q.includes('gastro') || q.includes('stomach') || q.includes('liver')) {
        handleDepartmentSelect('Gastroenterology');
      } else if (q.includes('book') || q.includes('appointment')) {
        const replyHTML = `
          <div>You can book an OPD consultation with any of our senior consultants!</div>
          <div style="margin-top: 10px;">
            <button class="btn btn-primary btn-sm" data-chat-action="book" style="width:100%;">📅 Open Appointment Booking Form</button>
          </div>
        `;
        appendMessage(replyHTML, 'bot', true);
      } else if (q.includes('emergency') || q.includes('ambulance') || q.includes('accident') || q.includes('critical')) {
        const replyHTML = `
          <div>🚨 <strong>24/7 Level-III Emergency & Trauma Unit</strong></div>
          <p style="font-size:0.84rem; margin-top:4px;">Our trauma care team and ALS ambulances are ready 24 hours a day.</p>
          <div style="margin-top: 10px;">
            <a href="tel:08632944444" class="btn btn-danger btn-sm" style="width:100%; display:block; text-align:center; text-decoration:none; color:white;">📞 Call Emergency: 0863-294-4444</a>
          </div>
        `;
        appendMessage(replyHTML, 'bot', true);
      } else if (q.includes('hours') || q.includes('timing') || q.includes('open') || q.includes('location')) {
        const replyHTML = `
          <div>📍 <strong>Aditya Medicare Hospitals, Guntur</strong></div>
          <p style="font-size:0.82rem; margin-top:4px;">3rd Line, Gunturvari Thota, Kothapeta, Suryaraopeta, Guntur, AP 522002</p>
          <p style="font-size:0.82rem; margin-top:4px;"><strong>OPD Hours:</strong> Mon - Sat: 9:00 AM - 8:00 PM<br/><strong>Emergency & ICU:</strong> Open 24/7</p>
          <div style="margin-top: 10px;">
            <a href="https://maps.google.com/?q=Aditya+Medicare+Hospitals+Guntur" target="_blank" class="btn btn-secondary btn-sm" style="width:100%; display:block; text-align:center; text-decoration:none;">🗺️ Get Google Directions</a>
          </div>
        `;
        appendMessage(replyHTML, 'bot', true);
      } else {
        const defaultReply = `
          <div>Thank you for your inquiry. How would you like to proceed?</div>
          <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 6px;">
            <button class="btn btn-secondary btn-sm" data-chat-action="select-dept" data-dept="all">🩺 View Doctors Directory</button>
            <button class="btn btn-primary btn-sm" data-chat-action="book">📅 Book OPD Appointment</button>
            <a href="tel:08632944444" class="btn btn-danger btn-sm" style="text-decoration:none; color:white; text-align:center;">📞 Call 0863-294-4444</a>
          </div>
        `;
        appendMessage(defaultReply, 'bot', true);
      }
    }, 600);
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    input.value = '';
    handleBotResponse(text);
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Suggestion chips click listener
  if (suggestionsContainer) {
    suggestionsContainer.querySelectorAll('.suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        appendMessage(query, 'user');
        handleBotResponse(query);
      });
    });
  }
}

/* --------------------------------------------------------------------------
   10. FACILITIES PAGE CATEGORY FILTERS
   -------------------------------------------------------------------------- */
function initFacilityFilters() {
  const buttons = document.querySelectorAll('[data-facility-filter]');
  const cards = document.querySelectorAll('.facility-card');
  if (!buttons.length || !cards.length) return;

  // Initialize active button style
  const activeBtn = document.querySelector('[data-facility-filter].active');
  if (activeBtn) {
    activeBtn.style.background = 'var(--blue)';
    activeBtn.style.color = 'var(--white)';
    activeBtn.style.borderColor = 'var(--blue)';
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states on buttons
      buttons.forEach(b => {
        b.classList.remove('active');
        b.style.background = 'var(--white)';
        b.style.color = 'var(--navy)';
        b.style.borderColor = 'var(--border-color)';
      });

      btn.classList.add('active');
      btn.style.background = 'var(--blue)';
      btn.style.color = 'var(--white)';
      btn.style.borderColor = 'var(--blue)';

      const filterValue = btn.getAttribute('data-facility-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          // Trigger smooth fade in
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.98)';
          setTimeout(() => {
            // Re-verify the active filter didn't change while waiting
            const currentActive = document.querySelector('[data-facility-filter].active');
            const currentFilter = currentActive ? currentActive.getAttribute('data-facility-filter') : 'all';
            if (currentFilter !== 'all' && category !== currentFilter) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   11. BLOG PAGE CATEGORY FILTERS
   -------------------------------------------------------------------------- */
function initBlogFilters() {
  const buttons = document.querySelectorAll('[data-blog-filter]');
  const cards = document.querySelectorAll('.facility-card'); // Note: blog layout uses same grid card classes
  if (!buttons.length || !cards.length) return;

  // Initialize active button style
  const activeBtn = document.querySelector('[data-blog-filter].active');
  if (activeBtn) {
    activeBtn.style.background = 'var(--blue)';
    activeBtn.style.color = 'var(--white)';
    activeBtn.style.borderColor = 'var(--blue)';
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states on buttons
      buttons.forEach(b => {
        b.classList.remove('active');
        b.style.background = 'var(--white)';
        b.style.color = 'var(--navy)';
        b.style.borderColor = 'var(--border-color)';
      });

      btn.classList.add('active');
      btn.style.background = 'var(--blue)';
      btn.style.color = 'var(--white)';
      btn.style.borderColor = 'var(--blue)';

      const filterValue = btn.getAttribute('data-blog-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          // Trigger smooth fade in
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px) scale(0.98)';
          setTimeout(() => {
            // Re-verify the active filter didn't change while waiting
            const currentActive = document.querySelector('[data-blog-filter].active');
            const currentFilter = currentActive ? currentActive.getAttribute('data-blog-filter') : 'all';
            if (currentFilter !== 'all' && category !== currentFilter) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   12. DYNAMIC 3D CARD TILT EFFECT (VANILLA-TILT STYLE)
   -------------------------------------------------------------------------- */
function init3DTilt() {
  // Mobile check: Disable tilt on small devices for maximum performance
  if (window.innerWidth <= 768) return;

  const tiltCards = document.querySelectorAll('.specialty-card, .legacy-card, .facility-card, .doctor-card, .tech-card, .stat-card');

  tiltCards.forEach(card => {
    card.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease';
    card.style.transformStyle = 'preserve-3d';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max tilt angle: 4 degrees
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* --------------------------------------------------------------------------
   13. ADVANCED MEDICAL TECHNOLOGY HOTSPOT INTERACTIVITY
   -------------------------------------------------------------------------- */
function initTechHotspots() {
  const hotspots = document.querySelectorAll('.tech-hotspot-pin');
  if (!hotspots.length) return;

  hotspots.forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = pin.closest('.tech-showcase-container');
      if (parent) {
        parent.querySelectorAll('.tech-hotspot-pin').forEach(p => p.classList.remove('active'));
      }
      pin.classList.add('active');
    });
  });

  document.addEventListener('click', () => {
    hotspots.forEach(pin => pin.classList.remove('active'));
  });
}

/* --------------------------------------------------------------------------
   14. PATIENT JOURNEY TIMELINE INTERACTIVITY
   -------------------------------------------------------------------------- */
function initPatientJourney() {
  const steps = document.querySelectorAll('.journey-step-item');
  if (!steps.length) return;

  steps.forEach(step => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });
}

/* --------------------------------------------------------------------------
   15. CINEMATIC HERO ENTRANCE SEQUENCE
   -------------------------------------------------------------------------- */
function initHeroEntrance() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;

  const elements = [
    heroContent.querySelector('.hero-badge'),
    heroContent.querySelector('.hero-title'),
    heroContent.querySelector('.hero-subtitle'),
    heroContent.querySelector('.hero-actions'),
    document.querySelector('.hero-info-bar')
  ];

  elements.forEach((el, index) => {
    if (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
  });
}

/* --------------------------------------------------------------------------
   16. AMBIENT 3D MEDICAL PARTICLE CANVAS RENDERER
   -------------------------------------------------------------------------- */
function init3DParticleCanvas() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'ambient-3d-canvas';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1';
  hero.style.position = 'relative';
  hero.insertBefore(canvas, hero.firstChild);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const count = window.innerWidth <= 768 ? 15 : 35;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.5 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00F0FF';
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}

/* --------------------------------------------------------------------------
   17. THREE.JS REAL WEBGL 3D MEDICAL MOLECULE SCENE
   -------------------------------------------------------------------------- */
function initThreeJSMedicalScene() {
  if (typeof THREE === 'undefined') return;

  const heroVisual = document.querySelector('.hero-visual-wrap');
  if (!heroVisual) return;

  // Create canvas container
  const canvasContainer = document.createElement('div');
  canvasContainer.id = 'three-webgl-container';
  canvasContainer.style.position = 'absolute';
  canvasContainer.style.inset = '0';
  canvasContainer.style.pointerEvents = 'none';
  canvasContainer.style.zIndex = '5';
  heroVisual.style.position = 'relative';
  heroVisual.appendChild(canvasContainer);

  const width = heroVisual.offsetWidth || 500;
  const height = heroVisual.offsetHeight || 500;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 15;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  canvasContainer.appendChild(renderer.domElement);

  // 3D Icosahedron Medical Nucleus
  const geometry = new THREE.IcosahedronGeometry(4, 2);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00F0FF,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Inner glowing core
  const coreGeo = new THREE.IcosahedronGeometry(2, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x087EA4,
    wireframe: true,
    transparent: true,
    opacity: 0.6
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  scene.add(coreMesh);

  // Mouse interaction
  let targetX = 0, targetY = 0;
  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 0.5;
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.5;
  });

  function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.003;
    mesh.rotation.y += 0.005;

    coreMesh.rotation.x -= 0.004;
    coreMesh.rotation.y -= 0.006;

    camera.position.x += (targetX * 5 - camera.position.x) * 0.05;
    camera.position.y += (-targetY * 5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const newW = heroVisual.offsetWidth;
    const newH = heroVisual.offsetHeight;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });
}

/* --------------------------------------------------------------------------
   18. GSAP + SCROLLTRIGGER SMOOTH ANIMATION TIMELINE
   -------------------------------------------------------------------------- */
function initGSAPScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero entrance animation timeline
  const heroTL = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
  heroTL.from('.hero-badge', { y: -20, opacity: 0, delay: 0.2 })
        .from('.hero h1', { y: 30, opacity: 0 }, '-=0.6')
        .from('.hero-subtitle', { y: 20, opacity: 0 }, '-=0.6')
        .from('.hero-actions .btn', { y: 20, opacity: 0, stagger: 0.15 }, '-=0.5')
        .from('.hero-stats-wrapper .stat-item', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.4');

  // Parallax scroll on Hero Building visual
  const heroImg = document.querySelector('.hero-img-overlay, .hero-img');
  if (heroImg) {
    gsap.to(heroImg, {
      yPercent: 12,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // Continuous floating levitation on floating glass cards
  gsap.to('.floating-card', {
    y: '-=12',
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.4
  });

  // Stagger reveal on Specialty Cards
  const specCards = document.querySelectorAll('.specialty-card');
  if (specCards.length) {
    gsap.from(specCards, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.specialties-grid',
        start: 'top 80%'
      }
    });
  }
}

/* --------------------------------------------------------------------------
   19. VANILLA-TILT 3D GLARE ENGINE
   -------------------------------------------------------------------------- */
function initVanillaTiltEngine() {
  if (typeof VanillaTilt === 'undefined' || window.innerWidth <= 768) return;

  const tiltElements = document.querySelectorAll('.specialty-card, .facility-card, .doctor-card, .tech-card, .legacy-card, .stat-card, .journey-step-item');

  VanillaTilt.init(tiltElements, {
    max: 8,
    speed: 400,
    glare: true,
    'max-glare': 0.2,
    scale: 1.02
  });
}

/* --------------------------------------------------------------------------
   20. TOP VIEWPORT SCROLL DEPTH PROGRESS BAR
   -------------------------------------------------------------------------- */
function initScrollProgressBar() {
  let bar = document.getElementById('scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scroll-progress-bar';
    document.body.appendChild(bar);
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${scrollPercent}%`;
  });
}

/* --------------------------------------------------------------------------
   21. FLUID STEP-BY-STEP APPOINTMENT MODAL TRANSITIONS
   -------------------------------------------------------------------------- */
function initStepByStepModal() {
  const modal = document.getElementById('appointment-modal');
  if (!modal) return;

  const panes = modal.querySelectorAll('.modal-step-pane');
  const nextBtns = modal.querySelectorAll('[data-step-next]');
  const prevBtns = modal.querySelectorAll('[data-step-prev]');
  const pills = modal.querySelectorAll('.modal-step-pill');

  let currentStep = 1;

  function goToStep(step) {
    panes.forEach((pane, idx) => {
      if (idx + 1 === step) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    pills.forEach((pill, idx) => {
      if (idx + 1 === step) {
        pill.classList.add('active');
        pill.classList.remove('completed');
      } else if (idx + 1 < step) {
        pill.classList.remove('active');
        pill.classList.add('completed');
      } else {
        pill.classList.remove('active', 'completed');
      }
    });

    currentStep = step;
  }

  nextBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetStep = parseInt(btn.getAttribute('data-step-next'), 10);
      if (targetStep && targetStep <= panes.length) {
        goToStep(targetStep);
      }
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetStep = parseInt(btn.getAttribute('data-step-prev'), 10);
      if (targetStep && targetStep >= 1) {
        goToStep(targetStep);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   22. INTERACTIVE FACILITY TOUR GSAP SCROLLTRIGGER TIMELINE
   -------------------------------------------------------------------------- */
function initFacilityTourGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const tourSection = document.querySelector('.facility-tour-section');
  const cards = document.querySelectorAll('.tour-card-item');

  if (!tourSection || !cards.length) return;

  gsap.from(cards, {
    x: 80,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: tourSection,
      start: 'top 75%'
    }
  });
}

/* --------------------------------------------------------------------------
   23. THREE.JS STYLIZED 3D MEDICAL HUMAN HEART / ANATOMY VISUALIZATION CANVAS
   -------------------------------------------------------------------------- */
function initThreeJSMedicalVisualizationCanvas() {
  if (typeof THREE === 'undefined') return;

  const container = document.getElementById('hero-3d-scene-container');
  if (!container) return;

  const width = container.offsetWidth || window.innerWidth;
  const height = container.offsetHeight || 600;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 18;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 3D Anatomical Stylized Pulse Heart Geometry
  const heartGroup = new THREE.Group();

  // Create Torus Knots as stylized ventricles & aortic arches
  const mainKnotGeo = new THREE.TorusKnotGeometry(3, 0.8, 100, 16, 2, 3);
  const knotMat = new THREE.MeshStandardMaterial({
    color: 0x00F0FF,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
    emissive: 0x087EA4,
    emissiveIntensity: 0.4
  });
  const mainKnot = new THREE.Mesh(mainKnotGeo, knotMat);
  heartGroup.add(mainKnot);

  // Orbiting Anatomical Rings
  const ringGeo = new THREE.TorusGeometry(5.5, 0.08, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x00F0FF, transparent: true, opacity: 0.5 });
  const ring1 = new THREE.Mesh(ringGeo, ringMat);
  ring1.rotation.x = Math.PI / 3;
  heartGroup.add(ring1);

  const ring2 = new THREE.Mesh(ringGeo, ringMat);
  ring2.rotation.y = Math.PI / 4;
  heartGroup.add(ring2);

  // Add Ambient & Point Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0x00F0FF, 2, 50);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  scene.add(heartGroup);

  // Heartbeat pulse animation + mouse rotation
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4;
  });

  let time = 0;
  function render() {
    requestAnimationFrame(render);
    time += 0.03;

    // Heartbeat pulsing scale
    const pulseScale = 1 + Math.sin(time * 2) * 0.05;
    heartGroup.scale.set(pulseScale, pulseScale, pulseScale);

    heartGroup.rotation.y += 0.006;
    heartGroup.rotation.x += 0.003;

    ring1.rotation.z += 0.008;
    ring2.rotation.z -= 0.008;

    camera.position.x += (mouseX * 8 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 8 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  render();

  window.addEventListener('resize', () => {
    const newW = container.offsetWidth || window.innerWidth;
    const newH = container.offsetHeight || 600;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });
}

/* --------------------------------------------------------------------------
   24. UNIVERSAL GSAP ANIMATIONS ACROSS ALL PAGES & NAVIGATION MENUS
   -------------------------------------------------------------------------- */
function initUniversalGSAPAnimations() {
  if (typeof gsap === 'undefined') return;

  // Animate Navigation Bar and Dropdown Menu Links
  gsap.from('.navbar .nav-links > li', {
    y: -15,
    opacity: 0,
    stagger: 0.08,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.3
  });

  // Animate Section Headers across all subpages
  const headers = document.querySelectorAll('.section-header, .subpage-hero-banner');
  headers.forEach(header => {
    gsap.from(header.children, {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 85%'
      }
    });
  });

  // Animate all grid cards across subpages
  const gridItems = document.querySelectorAll('.facility-card, .doctor-card, .article-card, .location-card');
  if (gridItems.length) {
    gsap.from(gridItems, {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: gridItems[0].parentElement,
        start: 'top 85%'
      }
    });
  }
}





