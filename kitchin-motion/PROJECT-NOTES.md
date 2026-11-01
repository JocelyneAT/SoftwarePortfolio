# Kitchin project page

Standalone page: `dist/projects/kitchin/index.html`. No shared homepage files are changed.

Run `npm run dev` in this folder for the Remotion Studio. The compositions are `KitchinWalkthrough` and `KitchinMobile`. Each is 24 seconds at 30 fps.

The page embeds Remotion Player, so the phone animates automatically within the page, without video controls or an MP4 render. A small pause toggle is available; reduced-motion starts paused, and offscreen or hidden-tab motion is suspended. Rebuild the player after editing the composition with `npm run build:player`:

```
npm run build:player
```

Original screen media: the user's Figma file `Q5gTXsWb1tPzoU5ZLWw5bB`, nodes Home `37:253`, Recipes `34:167`, Ingredients `34:460`, Instructions `34:594`. The actual screen artwork is used as video presentation media, not as a replacement for an implemented application. Screens are never redrawn or altered. The authored motion is the phone, pointer, tap rings and navigation transitions.

Flow verified against the prototype reactions: Home recipe shortcut → Recipes → Arrabbiata Penne → Instructions. Slides follow the source 0.3-second navigation; the final tab transition dissolves.

Project descriptions and evaluation details come from the user's existing local `D:/PORTOFOLIO WEBSITTE/kitchin-showcase.html` and `assets/elements_canva/projects/kitchin_poster.png`. The poster is the source for the 24-person, ages 18–23 study and 85.4 result. No percentile, deployment claim, individual role, project date or claimed research improvement has been invented.

Integration: link a project card to `projects/kitchin/`. The detail page and all its assets are self-contained. Its return links point to the site's existing `index.html#work`.

Final review: the page keeps the existing cream/pink palette and Geist/Instrument Serif typography. Green comes from the Kitchin UI. The requested automatic phone presentation is the live element, with no video controls, timeline or chapter buttons. The hardware shadow is intentional device shading. No footage is used because the user explicitly requested page-native automatic animation.

Browser smoke checks: 1440/768/390px, no horizontal overflow, original images load, automatic Home-to-Recipes progression, pause toggle and reduced-motion startup; no JavaScript exceptions. Source passes ESLint and TypeScript. Layout inspection: 0 failures with device shading and restrained motion allowed. Remaining warnings concern the preserved site palette/type scale and absence of footage, all intentional.

Visual critique: design 8/10, usability 8/10, creativity 7/10, content 8/10 (7.8 weighted). Strongest points: authentic screens, clear project summary and isolated integration. Limit: the automatic tour covers the recipe journey; the complete fridge, shopping and donation flows remain available through the linked prototype.
