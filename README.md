# Zhenhua Tang — Academic homepage

Buildless HTML, CSS and JavaScript, published through GitHub Pages.

- `index.html`: biography, publications, experience and travel photos.
- `site.css`: responsive layout and light/dark themes.
- `site.js`: publication filters/search, theme switching and accessible photo dialog.
- `site-config.js`: optional visitor map configuration.

## Visitor map

Register the homepage with a visitor-map provider that supplies an HTTPS image widget. Copy its image URL into `visitorMapImage` and its statistics/dashboard URL into `visitorMapLink` in `site-config.js`. Both fields are required. The section stays hidden until the image loads successfully. Never paste a private API key into this public repository. The map uses approximate locations from the provider and starts collecting after activation; no historical visitor data is fabricated.

## Content maintenance

Add only confirmed paper URLs. Missing paper images use a neutral decorative mark; the Glimpse highlight uses a typographic cover, not a research result. A CV button can be added when a public CV file is available. The publication metadata was retained from the original homepage and has not been independently verified.

For local preview: `python -m http.server 8765`.

## October 2026 CV integration

The latest supplied Chinese CV is the source for corrected education dates, MotionRefineNet (ACM MM 2025), the SNS-Grasp author list, FDCT project role, JD Explore Academy internship, teaching, assisted supervision, skills and reviewer service. `cv.html` is a public English CV with print-to-PDF support. Personal phone number, date of birth and home address are deliberately excluded.

Publication totals (17 published/accepted; 8 first/corresponding author) are attributed to the CV. The selected list contains 17 titled records. The 2025 Probabilistic Generative Approach paper is listed as IEEE TED, explicitly confirmed by the user after reviewing the CV discrepancy. The CV mentions a PRCV 2026 paper without a title, so no additional record has been invented. New co-authored entries identify Zhenhua Tang as a co-author because the CV does not supply their complete author lists. Under-review submissions are not presented as accepted publications.

`motion-lab.js` is an original dependency-free Canvas 3D projection of a procedural 17-joint skeleton. It is labeled as an illustration, starts paused, and suspends updates offscreen/in background tabs. It is not a demonstration of paper results. Ctrl/Cmd+K opens keyboard-accessible quick navigation. Glimpse's user-supplied framework is preserved at full resolution in `figs/glimpse_icml.png`.
