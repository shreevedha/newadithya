import os
import re

hero_templates = {
    'specialties.html': '''  <!-- PAGE HERO -->
  <section class="section subpage-hero-banner" data-aos="fade-up">
    <div class="container">
      <div class="subpage-breadcrumb">
        <a href="index.html">Home</a> <span>/</span> <span>Specialties</span>
      </div>
      <div class="section-header">
        <span class="section-tag">Centers of Excellence</span>
        <h1 class="section-title">Medical Specialties & Clinical Departments</h1>
        <p class="section-subtitle">Comprehensive tertiary care across Cardiology, Orthopedics, Neurology, Gastroenterology, Urology, Nephrology & Pediatrics.</p>
      </div>
      <div class="subpage-hero-badges">
        <div class="subpage-badge-pill">⚡ 24/7 Primary Emergency & Trauma</div>
        <div class="subpage-badge-pill">👨‍⚕️ 36+ Senior Super Specialists</div>
        <div class="subpage-badge-pill">🏥 HEPA Modular Surgical OTs</div>
        <div class="subpage-badge-pill">🩸 Level-3 ICU & Cath Lab</div>
      </div>
    </div>
  </section>''',

    'doctors.html': '''  <!-- PAGE HERO -->
  <section class="section subpage-hero-banner">
    <div class="container">
      <div class="subpage-breadcrumb">
        <a href="index.html">Home</a> <span>/</span> <span>Doctors</span>
      </div>
      <div class="section-header">
        <span class="section-tag">Find Your Specialist</span>
        <h1 class="section-title">Our Doctors & Medical Specialists in Guntur</h1>
        <p class="section-subtitle">Board-certified senior consultants, surgeons & critical care specialists available for daily OPD consultations.</p>
      </div>
      <div class="subpage-hero-badges">
        <div class="subpage-badge-pill">👨‍⚕️ 36+ Expert Doctors</div>
        <div class="subpage-badge-pill">📅 Daily OPD Consultation</div>
        <div class="subpage-badge-pill">⭐ 99.4% Patient Satisfaction</div>
        <div class="subpage-badge-pill">🩺 Instant Online Booking</div>
      </div>
    </div>
  </section>''',

    'facilities.html': '''  <!-- PAGE HERO -->
  <section class="section subpage-hero-banner" id="icu">
    <div class="container">
      <div class="subpage-breadcrumb">
        <a href="index.html">Home</a> <span>/</span> <span>Facilities</span>
      </div>
      <div class="section-header">
        <span class="section-tag">World-Class Infrastructure</span>
        <h1 class="section-title">Advanced Hospital Facilities & Care Units</h1>
        <p class="section-subtitle">Engineered with Class-100 HEPA air filters, 128-Slice CT, Flat-Panel Cath Lab, and Level-3 Emergency ICU units.</p>
      </div>
      <div class="subpage-hero-badges">
        <div class="subpage-badge-pill">🔬 128-Slice CT Scan & 3.0T MRI</div>
        <div class="subpage-badge-pill">🤖 Robotic Knee Surgery OT</div>
        <div class="subpage-badge-pill">🚑 24/7 ICU Ambulance</div>
        <div class="subpage-badge-pill">🏥 100+ Bedded Super Specialty</div>
      </div>
    </div>
  </section>''',

    'locations.html': '''  <!-- PAGE HERO -->
  <section class="section subpage-hero-banner">
    <div class="container">
      <div class="subpage-breadcrumb">
        <a href="index.html">Home</a> <span>/</span> <span>Locations</span>
      </div>
      <div class="section-header">
        <span class="section-tag">Easy Access & Directions</span>
        <h1 class="section-title">Our Campus Location & Contact Points</h1>
        <p class="section-subtitle">Conveniently located in the heart of Guntur on Collectorate Road with 24/7 emergency entrance and patient parking.</p>
      </div>
      <div class="subpage-hero-badges">
        <div class="subpage-badge-pill">📍 Collectorate Road, Nagarampalem, Guntur</div>
        <div class="subpage-badge-pill">📞 24/7 Helpline: 0863-294-4444</div>
        <div class="subpage-badge-pill">🅿️ Free Multi-level Patient Parking</div>
      </div>
    </div>
  </section>''',

    'blog.html': '''  <!-- PAGE HERO -->
  <section class="section subpage-hero-banner">
    <div class="container">
      <div class="subpage-breadcrumb">
        <a href="index.html">Home</a> <span>/</span> <span>Blog</span>
      </div>
      <div class="section-header">
        <span class="section-tag">Health Knowledge & Updates</span>
        <h1 class="section-title">Medical Articles & Patient Wellness Guide</h1>
        <p class="section-subtitle">Expert health advice, surgical recovery tips, and wellness insights written by Aditya Medicare Hospital doctors.</p>
      </div>
      <div class="subpage-hero-badges">
        <div class="subpage-badge-pill">📚 Verified Doctor Insights</div>
        <div class="subpage-badge-pill">❤️ Heart & Brain Health Tips</div>
        <div class="subpage-badge-pill">🥗 Preventive Wellness Guides</div>
      </div>
    </div>
  </section>''',

    'contact.html': '''  <!-- PAGE HERO -->
  <section class="section subpage-hero-banner">
    <div class="container">
      <div class="subpage-breadcrumb">
        <a href="index.html">Home</a> <span>/</span> <span>Contact</span>
      </div>
      <div class="section-header">
        <span class="section-tag">Reach Out To Us</span>
        <h1 class="section-title">Contact Aditya Medicare Hospital</h1>
        <p class="section-subtitle">We are here to assist you 24/7 for appointments, emergency admissions, ambulance services, and inquiries.</p>
      </div>
      <div class="subpage-hero-badges">
        <div class="subpage-badge-pill">🚨 Emergency Desk: 0863-294-4444</div>
        <div class="subpage-badge-pill">💬 WhatsApp Consultation</div>
        <div class="subpage-badge-pill">✉️ 24/7 Email Support</div>
      </div>
    </div>
  </section>''',

    'technology.html': '''  <!-- PAGE HERO -->
  <section class="section subpage-hero-banner">
    <div class="container">
      <div class="subpage-breadcrumb">
        <a href="index.html">Home</a> <span>/</span> <span>Technology</span>
      </div>
      <div class="section-header">
        <span class="section-tag">Cutting-Edge Medical Tech</span>
        <h1 class="section-title">Advanced Surgical & Diagnostic Technology</h1>
        <p class="section-subtitle">Pioneering precision robotic surgery, high-speed 128-slice CT imaging, and ultra-accurate laser urology systems.</p>
      </div>
      <div class="subpage-hero-badges">
        <div class="subpage-badge-pill">🤖 MISSO Robotic Knee System</div>
        <div class="subpage-badge-pill">⚡ 128-Slice Low-Dose CT</div>
        <div class="subpage-badge-pill">🔬 Flat-Panel Digital Angiography</div>
      </div>
    </div>
  </section>'''
}

for page, new_hero in hero_templates.items():
    if not os.path.exists(page):
        continue
    with open(page, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace existing <section class="section section-soft subpage-hero-banner"...</section>
    new_content = re.sub(
        r'<!-- PAGE HERO -->\s*<section class="[^"]*subpage-hero-banner[^"]*"[^>]*>.*?</section>',
        new_hero,
        content,
        flags=re.DOTALL
    )
    
    if new_content != content:
        with open(page, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated subpage hero banner in {page}")
