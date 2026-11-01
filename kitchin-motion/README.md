# Kitchin phone walkthrough

A separate Remotion project for the Kitchin case-study page. It does not edit the portfolio homepage.

- `npm install` installs the locked dependencies.
- `npm run dev` opens Remotion Studio.
- `npm run lint` checks TypeScript and source conventions.
- `npm run build:player` updates the embedded player in `../dist/projects/kitchin/player.js`.

The compositions are `KitchinWalkthrough` (desktop) and `KitchinMobile` (portrait). Both are 24 seconds at 30 fps, using the original Figma screens with an animated pointer and tap feedback.

The completed page is `../dist/projects/kitchin/index.html`. Serve the portfolio's `dist` folder, then visit `/projects/kitchin/`.

See PROJECT-NOTES.md for sources, scope and integration details.
