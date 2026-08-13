import os
from bs4 import BeautifulSoup

subpages = [
    'specialties.html',
    'doctors.html',
    'facilities.html',
    'locations.html',
    'blog.html',
    'contact.html',
    'technology.html'
]

print("--- VERIFYING SUBPAGE HERO BANNERS ---")
for page in subpages:
    if not os.path.exists(page):
        print(f"File missing: {page}")
        continue
    with open(page, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    hero = soup.find('section', class_=lambda c: c and 'subpage-hero-banner' in c)
    if not hero:
        print(f"[MISSING HERO] in {page}")
    else:
        h1 = hero.find(['h1', 'h2', 'div'], class_=lambda c: c and ('section-title' in c or 'h1' in c)) or hero.find('h1')
        title_text = h1.text.strip() if h1 else 'NO H1 FOUND'
        breadcrumb = hero.find('div', class_='subpage-breadcrumb')
        b_text = breadcrumb.text.strip() if breadcrumb else 'NO BREADCRUMB'
        badges = hero.find_all('div', class_='subpage-badge-pill')
        print(f"[OK] {page}: Title='{title_text[:45]}...', Breadcrumb='{b_text}', Badges={len(badges)}")
