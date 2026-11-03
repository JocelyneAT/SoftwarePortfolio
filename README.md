# Software Portfolio

A portfolio website in development. The design, content, and project showcases will be updated as the portfolio evolves.

Live preview: https://jocelyneat.github.io/SoftwarePortofolio/

A one-page UI/UX portfolio: hero with portrait, principles, selected work (mobile apps and websites, filterable), about, and contact. Soft pink on a warm white ground, Instrument Serif for headings and Geist for text. Motion (smooth scroll, staggered entrances, hero parallax, a project cursor, a tools marquee) is turned off for visitors who prefer reduced motion.

Run `node server.cjs`, then open http://127.0.0.1:4173. Website files are in `dist/`: `index.html`, `style.css`, `script.js`, and images under `dist/assets/`. Lenis 1.1.13 is stored locally under `dist/vendor/`; fonts load from Google Fonts.

Project previews link to the Kitchin, BestRate, Codu and FivePawns case studies. The contact popup sends messages to `jocelyneaudreytando@gmail.com` through FormSubmit; LinkedIn, Instagram and WhatsApp use the links from the original portfolio.

Before launch, submit the contact form from the published site and click FormSubmit's activation link in the Gmail inbox (check Spam). Activation is required before email delivery works. The form retains the visitor's message when a request fails and offers a direct email link. Real email delivery still needs an inbox check after activation.


## GitHub Pages

GitHub Pages publishes the root of the `gh-pages` branch. Development files live on `main`; the publishing branch contains the files from `dist/`, with the HTML base URL set to `/SoftwarePortofolio/`. Publishing that branch through GitHub Desktop triggers GitHub’s Pages build. Local preview uses `node server.cjs`.
