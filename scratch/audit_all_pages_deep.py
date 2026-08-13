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

print("--- DEEP HTML & ASSETS AUDIT ---")
missing_images = []
broken_links = []

for html_file in html_files:
    if not os.path.exists(html_file):
        print(f"CRITICAL ERROR: {html_file} does not exist!")
        continue
    
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check image paths
    img_matches = re.findall(r'src=["\'](images/[^"\']+)["\']', content)
    for img_path in img_matches:
        # remove URL parameters if any
        clean_path = img_path.split('?')[0]
        if not os.path.exists(clean_path):
            missing_images.append((html_file, clean_path))
            
    # Check page links
    href_matches = re.findall(r'href=["\']([^"\'#]+\.html)["\']', content)
    for href in href_matches:
        if not os.path.exists(href):
            broken_links.append((html_file, href))

print(f"Total HTML files audited: {len(html_files)}")
print(f"Missing images found: {len(missing_images)}")
for page, img in missing_images:
    print(f"  [MISSING IMG] in {page}: {img}")

print(f"Broken page links found: {len(broken_links)}")
for page, link in broken_links:
    print(f"  [BROKEN LINK] in {page}: {link}")
