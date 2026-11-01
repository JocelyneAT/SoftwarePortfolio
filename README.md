# Software Portfolio

A portfolio website in development. The design, content, and project showcases will be updated as the portfolio evolves.

Live preview: https://jocelyneat.github.io/SoftwarePortofolio/

The opening is a softly shaded illustrated seaside with a small black poodle relaxing in a float. Move over or tap the water to make ripples; floating shells, flowers, a message bottle and the poodle gently bob in response. **Make a little ripple** provides the same interaction from the keyboard. **Pause motion** stops the animation, and reduced-motion preferences are respected. `dist/beach.css` and `dist/beach.js` contain the opening’s styles and interactions; the floating objects are separate illustrated assets.

Run `node server.cjs`, then open http://127.0.0.1:4173. Website files and assets are in `dist/`. Fonts are loaded from Google Fonts, and Lenis 1.1.13 is stored locally under `dist/vendor/`.

Alex Morgan, company labels, visitor count, and guestbook notes are demo data. Analytics and remote write APIs have been removed; guestbook entries stay in browser storage. Social and booking destinations are placeholders. The resume is a local demo page.


## GitHub Pages

GitHub Pages publishes the root of the `gh-pages` branch. Development files live on `main`; the publishing branch contains the files from `dist/`, with the HTML base URL set to `/SoftwarePortofolio/`. Publishing that branch through GitHub Desktop triggers GitHub’s Pages build. Local preview uses `node server.cjs`. Section and case-study interactions work in-page on Pages; the local server's clean URL routes require that server.
