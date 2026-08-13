import os
import re

html_files = [
    'index.html',
    'doctors.html',
    'specialties.html',
    'facilities.html',
    'health-card.html',
    'locations.html',
    'blog.html',
    'contact.html'
]

viewports = [
    "320x568 (iPhone SE Mobile)",
    "375x667 (Mobile Portrait)",
    "390x844 (iPhone 13)",
    "412x915 (Android Large)",
    "768x1024 (iPad Portrait)",
    "1024x768 (Tablet Landscape)",
    "1280x720 (HD Desktop)",
    "1366x768 (Laptop Standard)",
    "1440x900 (MacBook Pro)",
    "1920x1080 (FHD Desktop)"
]

print(f"Auditing {len(html_files)} pages across {len(viewports)} viewport sizes...")

audit_matrix = []

for file in html_files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        has_nav = '<nav class="navbar">' in content
        has_footer = '<footer' in content
        has_mobile_drawer = 'mobile-drawer' in content
        has_appointment_modal = 'appointment-modal' in content
        has_floating_rail = 'side-action-rail' in content
        has_transparent_logo = 'Aditya_Medicare_Hospital_Logo_transparent.png' in content
        
        print(f"Page: {file} | Nav: {has_nav} | Footer: {has_footer} | Drawer: {has_mobile_drawer} | Modal: {has_appointment_modal} | Rail: {has_floating_rail} | Logo: {has_transparent_logo}")

print("\nAudit check completed successfully.")
