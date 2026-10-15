# Zhenhua Tang — Academic homepage

Buildless HTML, CSS and JavaScript, published through GitHub Pages.

- `index.html`: biography, publications, experience and travel photos.
- `site.css`: responsive layout and light/dark themes.
- `site.js`: publication year/type filters, theme switching and accessible photo dialog.
- `site-config.js`: optional visitor map configuration.

## Visitor map

Register this homepage at https://mapmyvisitors.com/add and choose the map or globe widget. Copy the complete HTTPS `src` URL from your generated script into `visitorWidgetScript` in `site-config.js`. The integration supports MapMyVisitors map.js and globe.js with their public widget ID. The resulting map appears in the public Visitors section above the footer. Alternatively use an HTTPS image widget via `visitorMapImage` plus `visitorMapLink`; both fields are required for the image variant. The section stays hidden when unconfigured. Never paste a private API key into this public repository. The map uses approximate locations from the provider and starts collecting after activation; no historical visitor data is fabricated.

## Content maintenance

Add only confirmed paper URLs. Missing paper images use a neutral decorative mark; the Glimpse highlight uses a typographic cover, not a research result. A CV button can be added when a public CV file is available. The publication metadata was retained from the original homepage and has not been independently verified.

For local preview: `python -m http.server 8765`.

## October 2026 CV integration

The latest supplied Chinese CV is the source for corrected education dates, MotionRefineNet (ACM MM 2025), the SNS-Grasp author list, FDCT project role, JD Explore Academy internship, teaching, assisted supervision, skills and reviewer service. `cv.html` is a public English CV with print-to-PDF support. Personal phone number, date of birth and home address are deliberately excluded.

Publication totals (17 published/accepted; 8 first/corresponding author) are attributed to the CV. The selected list contains 17 titled records. The 2025 Probabilistic Generative Approach paper is listed as IEEE TED, explicitly confirmed by the user after reviewing the CV discrepancy. The CV mentions a PRCV 2026 paper without a title, so no additional record has been invented. New co-authored entries identify Zhenhua Tang as a co-author because the CV does not supply their complete author lists. Under-review submissions are not presented as accepted publications.


Publications now default to 2026, with click-only year and conference/journal controls, plus visible year/type headings. The interactive motion playground has been removed at the user's request. The Glimpse framework uses a versioned asset filename and eager loading to avoid a stale missing image or deferred load. Original image resolution is preserved.

The user-provided MapMyVisitors globe widget is now configured. At viewport widths of 1100px and above it occupies a reserved fixed right rail; narrower screens show it inline above the footer. A keyboard-accessible collapse/expand button keeps the card unobtrusive. The public widget ID is not a secret. Verified with the real provider: globe renders, fixed position persists while scrolling, no text overlap, and no overflow from 320px through 1920px.
