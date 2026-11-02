# BestRate detail page and prototype

Website: `dist/projects/bestrate/`. The page, CSS and animation bundle are isolated from the homepage.

Source designs: the user's five exports in `D:/PORTOFOLIO WEBSITTE/assets/elements_canva/projects/bestrate-1.png` through `bestrate-5.png`, and Figma file `b4GBFi7TV7fvCWRuLNZHC7`. Original Figma frames: login `1:3`, home `29:102`, rate details `34:156`, alerts `29:260`, profile `37:200`.

The original Figma page was preserved. New page `119:74`, “BestRate · Interactive Prototype”, contains 13 editable frames with 62 navigation connections. Start node `119:75`. Original copied screens retain their assets and Figtree typography; newly added controls reuse the file's existing fills, typography and shapes. Generic community-library controls were checked and did not match the existing custom styling.

The four long original screens gained vertical scrolling containers, persistent header/navigation, and lower content. New states include alert creation, saved confirmation, provider handoff, and five profile settings views. All prototype destinations were checked against the new page's top-level frames. Browser verification of the Figma presentation required sign-in, so link integrity and visual checks were performed with the Figma tools. Prototype fields use preset values.

The website motion is a rebuilt presentation based on the original visual design. It includes more readable fields, added scroll content and a mathematically consistent illustrative quote; it is not a recording and has no video controls. No live provider or financial service is connected. The Figma prototype retains original sample design values, apart from the newly added alert example.

Build: `npm run build:bestrate`. Source checks: `npm run lint` and `npm run check:bestrate`. Browser checks cover responsive widths, all eight stages, scroll offsets, pause and reduced-motion startup.

Kitchin's existing animation has been shortened from 24 to 12.6 seconds, with faster pointer movements and 0.22-second transitions. Only its animation bundle is included in deployment; ongoing edits to its HTML/CSS and the homepage are left alone.

Layout direction: retained the existing Kitchin detail-page composition and the portfolio's established cream/pink palette and serif/sans pairing; BestRate navy and teal are used inside the actual app. The animated app is marked as an interface fragment so its original-sized control labels, fixed headers, dividers and cards are evaluated as app UI rather than page decoration.

Final QA: ESLint/TypeScript and the flow self-check pass. Browser smoke checks passed at 1440, 768 and 390 pixels, including every automatic stage, actual scroll offsets, pause, reduced motion and no JavaScript exceptions. Layout inspector: 0 failures with intentional hardware shadows and restrained motion allowed. Visual critique: design 8/10, usability 8/10, creativity 7/10, content 8/10. Remaining limitations are preset prototype fields, illustrative quotes and the browser sign-in requirement for Figma.


## PDF case-study update — 2026-11-02

Source: user-supplied DMT2309287_Assignment1 (2).pdf, pages 4–10 (concept, UI trends, UX principles), 11–15 (original screens), 21–23 (proposed navigation and reflection). The PDF itself, cover details and marking material are not published. Course label follows the user's correction: Mobile App System Design; tool: Figma. No testing or usability findings are claimed.

The public page follows the current Kitchin page: shared Chillax typography, cream/pink tokens, hero, chapter labels, problem cards, alternating feature panels and CTA. The app retains navy/teal. Extracted original screen images are shown as source artwork; added live-demo content remains labelled. The feedback/error/provider flow is described as planned, not fully implemented.

Page argument: personal comparison problem → ranked providers, fee detail and alerts → visual choices → feedback and navigation → reflection. Real screens support each feature. No persona or metrics were invented.

Checks: responsive browser smoke at 1440/768/390; all images decode; no horizontal overflow; automatic navigation/scrolling; pause and reduced motion; no JavaScript errors. Motion source lint and flow self-check pass. Kitchin and homepage files remain untouched. Inspector exceptions deliberately retain Kitchin's requested labels, numbering, cards, gradients, shadows, small metadata and cream palette. No video player is introduced.
