# Software Portfolio

A portfolio website in development. The design, content, and project showcases will be updated as the portfolio evolves.

Live preview: https://jocelyneat.github.io/SoftwarePortofolio/

The opening is an interactive overhead beach with original generated artwork and a small black poodle. Move over the water for ripples; click the sand or use **Play fetch** to throw a ball. **Pause motion** stops the animation, and reduced-motion preferences are respected. `dist/beach.css` and `dist/beach.js` contain the opening’s styles and interactions.

Run `node server.cjs`, then open http://127.0.0.1:4173. Website files and assets are in `dist/`. Fonts are loaded from Google Fonts, and Lenis 1.1.13 is stored locally under `dist/vendor/`.

Alex Morgan, company labels, visitor count, and guestbook notes are demo data. Analytics and remote write APIs have been removed; guestbook entries stay in browser storage. Social and booking destinations are placeholders. The resume is a local demo page.


## GitHub Pages

In the repository's Settings → Pages, select GitHub Actions as the source. Pushes to `main` then publish `dist/` using `.github/workflows/pages.yml`; the workflow sets the base URL for the repository path. Local preview still uses `node server.cjs`. Section and case-study interactions work in-page on Pages; the local server's clean URL routes require that server.
