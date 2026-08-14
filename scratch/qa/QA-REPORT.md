# Aditya Medicare Hospitals — End-to-End QA Audit

Audit target: https://aditya-medicare-hospital.vercel.app/

## Scope and coverage

- 12 direct routes discovered and tested: `/`, `blog.html`, `contact.html`, `cookie-policy.html`, `doctors.html`, `facilities.html`, `health-card.html`, `locations.html`, `privacy-policy.html`, `specialties.html`, `technology.html`, and `terms-conditions.html`.
- 10 requested viewport sizes attempted: 320×568, 375×667, 390×844, 412×915, 768×1024, 1024×768, 1280×720, 1366×768, 1440×900, and 1920×1080.
- Desktop route pass: 12/12 returned HTTP 200 and rendered.
- Inventory: 308 buttons, 25 forms, and 607 links across the 12 routes.
- Interactions exercised: appointment/form native validation, filter buttons on the home/doctors/facilities pages, mobile menu presence, booking controls, and representative repeated navigation/resizing.
- Authentication, pagination, file uploads, and payments were not present in the discovered UI; no real message/payment/destructive action was submitted.

## Executive summary

The site is broadly routable and the primary desktop pages render, with no horizontal overflow detected in the successful measurements. The production readiness blockers are visual/asset-related: the homepage requests a 404 GIF, several doctor images were reported as non-loading by the browser run despite some direct HTTP checks succeeding, the floating AI widget overlaps mobile form/search controls, and the mobile homepage hero copy has insufficient contrast against the background. A YouTube footer/social destination also failed the link check.

The live-site sweep was affected by intermittent network/DNS changes and long-running third-party resources; responsive results therefore distinguish “tested and observed” from “attempted but timed out.”

## Findings

| # | Page | Viewport | Category | Issue | Severity | Recommended fix | Evidence |
|---|---|---|---|---|---|---|---|
| 1 | `/` | Desktop | Network / asset | `images/gifs/integrateddepartments.gif` returns HTTP 404 and produces a browser console 404. | High | Restore the asset at the referenced path or update the markup to the canonical existing filename/case. | `home-desktop.png`; response status 404 |
| 2 | `/doctors.html` | Desktop | Images / network | Browser measurement reported 31 doctor images with `naturalWidth=0` during the live run. Direct HTTP checks for sampled doctor URLs returned 200, so this may be intermittent loading/caching or a browser-run race; it needs a production retest after asset-path normalization. | Medium | Normalize all doctor image URLs and verify every image after `load`; add a fallback placeholder and monitor image failures. | Browser inventory in `report.json` |
| 3 | `/` | 390×844 | Visual / contrast | Hero supporting copy is nearly invisible against the dark building background; readability is poor. | High | Add a solid/semi-opaque text panel or darker gradient behind the copy and verify WCAG contrast. | [home-mobile.png](home-mobile.png) |
| 4 | `/`, `/doctors.html`, `/contact.html` | 390×844 | Responsive layout | Floating AI/help widget sits over the primary content: it covers the doctors search field and the contact form’s Full Name field. | High | Reserve bottom/right safe space on mobile or reposition the widget above the form controls; test at 320–412px widths. | [doctors-mobile.png](doctors-mobile.png), [contact-mobile.png](contact-mobile.png) |
| 5 | `/doctors.html` | 390×844 | Responsive interaction | Doctor specialty filter pills extend beyond the visible card width; the horizontal continuation is not clearly discoverable and competes with the widget. | Medium | Use a deliberate horizontal scroller with visible affordance, or wrap filters into multiple rows. | [doctors-mobile.png](doctors-mobile.png) |
| 6 | Site footer/social link | Desktop link sweep | Broken external link | `https://www.youtube.com/@adityamedicare.institute` failed the HTTP link check. | Medium | Confirm the channel URL exists, then update or remove the link. | Link sweep: `ERR` |
| 7 | All routes | All tested sizes | Forms / semantics | Most appointment forms use `GET`, have blank `name` attributes, and only name/phone are required. This makes submissions unsuitable for reliable server-side handling and exposes form values in URLs if a backend is later connected. | Medium | Use `POST` to a defined endpoint, add stable `name`/`id` attributes, explicit labels, server-side validation, and a success/error state. | Form inventory in `report.json` |
| 8 | `/` | Desktop | Console | One console error was observed, caused by the missing GIF above. | High | Resolve finding #1 and retest with a clean console. | Browser console capture |

## Functional checks

- Direct access to all 12 discovered routes returned 200 on the desktop pass.
- Invalid direct route `/no-such-page.html` correctly returned 404.
- Native empty-submit validation correctly blocked appointment/contact forms and identified required fields.
- Home, doctors, and facilities filter controls were clickable and did not unexpectedly navigate.
- Mobile navigation/menu controls were present at 390px.
- No login/signup/authentication flow, pagination, or file upload flow was discovered.
- No real appointment, message, payment, or destructive action was submitted.

## Responsive results

The successful desktop measurements reported `scrollWidth === clientWidth` on all 12 routes at 1280×720, so no desktop horizontal overflow was detected. The requested responsive sweep was attempted at all 10 sizes, but intermittent live navigation timeouts and third-party resource waits prevented a clean full-page measurement for every route/viewport combination. The captured 390×844 screenshots confirm the mobile overlap/contrast issues above.

## Accessibility and typography observations

- Images in the successful desktop DOM inventory had non-empty `alt` attributes.
- Forms expose native required validation, but the markup should still be audited for stable label/id/name associations and server-side validation.
- The site reports `"Open Sans", "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` as the body stack. A live font request was intermittently reported as `ERR_NETWORK_CHANGED`; verify font loading and fallback appearance in a stable network run.
- Mobile touch targets for the menu and primary buttons were visually large enough in the captured screenshots.
- The homepage hero contrast and floating widget placement remain accessibility blockers.

## Evidence files

- [Raw automated inventory](report.json)
- [Homepage desktop](home-desktop.png)
- [Homepage mobile](home-mobile.png)
- [Doctors mobile](doctors-mobile.png)
- [Contact mobile](contact-mobile.png)

## Final status

Overall result: **Needs fixes before production sign-off**.

Priority order: fix the 404/missing asset, remove mobile widget overlap, improve homepage hero contrast, repair/verify doctor image loading, and fix the YouTube destination. Then repeat the responsive sweep on a stable network and verify form submission behavior against the intended backend.
