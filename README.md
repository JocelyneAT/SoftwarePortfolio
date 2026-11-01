# Portfolio reference study

A local visual study of https://www.jameschugh.com/, using its public layout, styles, artwork and interaction code as temporary reference material at the user's request.

Run `node server.cjs`, then open http://127.0.0.1:4173. The preview server downloads missing public reference media from a fixed origin and caches it under `dist/v2/`. Initial exploration requires an internet connection; fonts are loaded from Google Fonts. Lenis 1.1.13 is stored locally under `dist/vendor/`.

Alex Morgan, company labels, visitor count, and guestbook notes are demo data. Analytics and remote write APIs have been removed; guestbook entries stay in browser storage. Social and booking destinations are placeholders. The resume is a local demo page.

Reference imagery, portraits, project screenshots and copy remain temporary study material, not the owner's work. Replace them with owned or licensed assets and personal case studies before public launch. This version has not been published. The hero scene is intentionally retained for this matching pass and can be replaced later.

## GitHub Pages

In the repository's Settings → Pages, select GitHub Actions as the source. Pushes to `main` then publish `dist/` using `.github/workflows/pages.yml`; the workflow sets the base URL for the repository path. Local preview still uses `node server.cjs`. Section and case-study interactions work in-page on Pages; the local server's clean URL routes require that server.
