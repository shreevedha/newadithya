import os
import re

html_files = [
    'blog.html',
    'contact.html',
    'cookie-policy.html',
    'doctors.html',
    'facilities.html',
    'locations.html',
    'privacy-policy.html',
    'specialties.html',
    'technology.html',
    'terms-conditions.html'
]

workspace_dir = r"C:\Users\fayaz\Downloads\Aditya Medicare Hospital Website\Aditya Medicare Hospital Website"

for fname in html_files:
    fpath = os.path.join(workspace_dir, fname)
    if not os.path.exists(fpath):
        print(f"File not found: {fpath}")
        continue
        
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    modified = False
    
    # 1. Update <ul class="nav-links"> if health-card.html is missing
    nav_links_match = re.search(r'(<ul\s+class="nav-links">.*?</ul>)', content, re.DOTALL)
    if nav_links_match:
        nav_block = nav_links_match.group(1)
        if 'health-card.html' not in nav_block:
            new_nav_block = re.sub(
                r'<li><a href="locations.html"([^>]*)>Locations</a></li>',
                r'<li><a href="health-card.html">Health Card</a></li>\n        <li><a href="locations.html"\1>Locations</a></li>',
                nav_block
            )
            # fallback for ID version
            new_nav_block = new_nav_block.replace(
                '<li><a href="locations.html" id="nav-locations">Locations</a></li>',
                '<li><a href="health-card.html" id="nav-healthcard">Health Card</a></li>\n        <li><a href="locations.html" id="nav-locations">Locations</a></li>'
            )
            content = content.replace(nav_block, new_nav_block)
            modified = True
            
    # 2. Update <ul class="mobile-nav-links"> if health-card.html is missing
    mob_links_match = re.search(r'(<ul\s+class="mobile-nav-links">.*?</ul>)', content, re.DOTALL)
    if mob_links_match:
        mob_block = mob_links_match.group(1)
        if 'health-card.html' not in mob_block:
            new_mob_block = re.sub(
                r'<li><a href="locations.html"([^>]*)>Locations</a></li>',
                r'<li><a href="health-card.html">Health Card</a></li>\n      <li><a href="locations.html"\1>Locations</a></li>',
                mob_block
            )
            content = content.replace(mob_block, new_mob_block)
            modified = True

    # 3. Clean up corrupted close character if present
    if 'âœ•' in content:
        content = content.replace('âœ•', '✕')
        modified = True
        print(f"Cleaned close button corrupted characters in {fname}")

    if modified:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully updated menu navigation and drawer in {fname}")
    else:
        print(f"No changes required for {fname}")
