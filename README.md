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
