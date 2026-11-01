(() => { let t = null; try { t = localStorage.getItem('portfolio-theme'); } catch (_) {} document.documentElement.dataset.theme = t || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); })();
;
setTimeout(() => { const c = document.getElementById('cue'); if (c && scrollY < 4 && !document.hidden) c.classList.add('idle'); }, Math.max(0, 4000 - performance.now()));
;

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ss = t => t * t * (3 - 2 * t);
  const range = (v, a, b) => clamp((v - a) / (b - a));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hoverable = matchMedia('(hover: hover)').matches;
  const CS = 'https://uxwithjames.framer.website/projects/';

  /* ---------- content: from Alex's own portfolio ---------- */
  const PLACES = {
    nsut: { c: '#C4553A', side: 'right', tag: 'Chapter 01 · 2021 · Jakarta', t: 'Design school', r: 'B.Tech, Mechanical Engineering · 2021 – 2025',
      h: 'The day JEE changed everything.',
      st: ['I cleared JEE and got into <b>Design school</b> for Mechanical Engineering. Four years of machines, drawings and tolerances taught me how things work.', 'Somewhere in there I got hooked on <i>why</i> people use them, and started designing on the side, like <b>CampusX</b>, a social network for college life.'],
      n: [], j: 0 },
    eazydiner: { c: '#EE5A2B', side: 'left', tag: 'Chapter 02 · Feb – Apr 2025', t: 'Tablely', r: 'Product Design Intern',
      h: 'Tablely taught me to look beyond the screen.',
      st: ['At the end of a meal, people were hunting through <b>300+ bank and restaurant offers</b> just to get a discount. Some gave up and paid full price.', 'I led the redesign of the PayEazy coupon tray, <b>The Coupon Hunter</b>, so the best deal is waiting for you upfront. It’s live on the app.'],
      n: [['+41%', 'payment success'], ['55.5 → 67%', 'coupon application'], ['18 → 42%', 'filter engagement']], j: 4, cs: 'coupon', csL: 'View case study' },
    mmt: { c: '#E4262C', side: 'left', tag: 'Chapter 03 · Apr – Oct 2025', t: 'Wayfinder', r: 'Product Design Intern',
      h: 'Then everything got bigger.',
      st: ['Millions of users, complicated journeys, and tiny decisions that suddenly mattered a lot more.', 'I turned a buried <b>Special Requests</b> flow into one people actually use, and added <b>Chat with Hotelier</b> so hotels reply in real time.'],
      n: [['16 → 35%', 'hotel response rate'], ['4,500+', 'bookings a day use it'], ['2,800+', 'hotels on the new flow']], j: 5, cs: 'requests', csL: 'View case study' },
    oyo: { c: '#DC402A', side: 'left', tag: 'Chapter 04 · Dec 2025 → now', t: 'Orbit', r: 'Associate Product Designer',
      h: 'Then Orbit, and the whole stay.',
      st: ['Where I am right now: <b>self check-in, room selection and cancellations</b>. For <b>Haven</b>, an Orbit company in Germany, I redesigned the dashboard holiday-home owners use every day.'],
      n: [['500', 'properties validated'], ['6,000+', 'approved next']], j: 6, cs: 'traum', csL: 'View case study' },
    me: { c: '#F2B705', side: 'right', tag: 'About me', t: 'Hey, I’m Alex', r: '23 · Product designer · Builder · Engineer',
      h: 'I design so people don’t rage quit.',
      st: [],
      fun: [
        ['School', '#D2553A', [['Mechanical Engineering, Design school', '7 CGPA. Never liked it. Graduated anyway.'], ['Cleared JEE and Waterloo Maths', 'Then picked Jakarta. Still think I was right.'], ['Found design by accident', 'A friend’s app flopped. I opened Figma and never closed it.']]],
        ['Work', '#2F7FD8', [['2 years, 4 logos', 'Northstar Studio → Tablely → Wayfinder → Orbit. Products used by millions.'], ['+41% payment success', 'My coupon redesign at Tablely.'], ['PocketCheck, my own iOS app', 'Designed, built and shipped it solo. 400+ downloads.']]],
        ['Off the clock', '#4F9E4A', [['Drums, piano and guitar', 'The happy noise. Apple Music is on. Always.'], ['Olive, my roommate', 'A golden retriever. She runs the flat.'], ['Jakarta ⇄ Makassar', 'Long drives, music way too loud. Gym is my reset button.']]]
      ],
      n: [['2 yrs', 'industry experience'], ['3', 'products shipped at scale']], j: 7,
      photos: [['photo', 'Me, mid-laugh'], ['life-coldplay', 'Coldplay. Best night ever.'], ['life-olive', 'My roommate, Olive']],
      links: true, about: true }
  };

  const ICONS = {
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/>',
    fork: '<path d="M7 3v8"/><path d="M5 3v5a2 2 0 0 0 4 0V3"/><path d="M7 11v10"/><path d="M17 21V3c-2 1-3 4-3 7h3"/>',
    plane: '<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
    bed: '<path d="M3 18V6"/><path d="M3 14h18v4"/><path d="M21 14v-3a3 3 0 0 0-3-3h-7v6"/><circle cx="7" cy="11" r="1.6"/>',
    pin: '<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    ticket: '<path d="M3 7a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-3a2 2 0 0 0 0-4z"/><path d="M14 5v14" stroke-dasharray="2 2"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21a2 2 0 0 0 4 0"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3"/>',
    head: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
    check: '<path d="M5 12.5l4 4L19 7"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    bulb: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
    news: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/>',
    moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    rocket: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M9 15l-3-3c1-4 5-9 12-9 0 7-5 11-9 12z"/><circle cx="15" cy="9" r="1.5"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    in: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/>',
    bench: '<path d="M4 10h16M5 14h14M7 14v5M17 14v5M6 10V6h12v4"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowL: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14"/><path d="M15 6v14"/>'
  };
  const LI = '#hello', IG = '#hello', APP = '#hello';
  const STOPS = [
    { id: 'jee', when: '2021', place: 'Jakarta', icon: 'cap', logo: 'logo-nsut', c: '#D2553A', at: [400, 1420], lift: 175, name: 'Design school',
      title: 'The day JEE changed everything.',
      txt: 'I cleared JEE and got into <b>Design school</b> for Mechanical Engineering. I had even cleared Waterloo Mathematics, but somehow, Jakarta felt like where I was meant to be. I just didn’t know yet that engineering wouldn’t be the path I’d end up following.',
      photos: [['nsut-day1', 'First day at Design school'], ['nsut-project', 'Final project, submitted'], ['nsut-band', 'The college band'], ['nsut-degree', 'Degree day, 2025']],
      pois: [[-170, -120, 'check', 'Cleared Waterloo Mathematics too.']] },
    { id: 'app', when: 'April 2022', place: 'Jakarta', icon: 'phone', logo: 'logo-campusx', c: '#7B5CD6', at: [960, 960], lift: 150, name: 'The failed app',
      title: 'A failed app changed my life.',
      txt: 'A friend and I tried building an app together. It didn’t work, but somewhere along the way I opened <b>Figma</b> and got completely hooked. The app failed. I accidentally found UX, and, eventually, the career I wanted.',
      photos: [['cx-first', 'The first screen I ever designed'], ['cx-attendance', 'Pivot: everyone’s attendance'], ['cx-beta', 'First beta test']],
      pois: [[160, 90, 'pen', 'Opened Figma. Never really closed it.']] },
    { id: 'iitd', when: '2022 – 2023', place: 'Jakarta', icon: 'bulb', logo: 'logo-iit', c: '#2E9E6B', at: [1520, 1320], lift: 165, name: 'Studio internship',
      title: 'I started chasing that feeling.',
      txt: 'I began teaching myself design and got an internship at <b>Studio internship</b>. For the first time, the things I was learning at night were solving problems for someone beyond myself. I realised I didn’t just enjoy designing. I enjoyed figuring things out.',
      photos: [],
      pois: [[170, 90, 'book', 'Learning at night, designing by day.']] },
    { id: 'ht', when: '2024', place: 'Jakarta', icon: 'news', logo: 'logo-ht', c: '#1E7FC8', at: [2080, 880], lift: 272, name: 'Northstar Studio',
      title: 'HT Media made it real.',
      txt: 'At <b>Northstar Studio</b>, design became a real job, not just something I was learning on the side. For the first time, the things I designed shipped to people I’d never meet.',
      photos: [['ht-desk', 'Day 1 at HT'], ['ht-month', 'One month at HT House']],
      pois: [[160, 90, 'news', 'Design became a real job here.']] },
    { id: 'eazydiner', when: 'Feb – Apr 2025', place: 'Jakarta', logo: 'logo-eazydiner', c: '#F4511E', at: [2640, 1400], lift: 150, name: 'Tablely',
      title: 'Tablely taught me to look beyond the screen.',
      txt: 'I started noticing that good design wasn’t really about the interface. It was about what people <b>felt, understood, and did</b> because of it. That shift quietly changed the way I approached every product after that.',
      stats: [['+41%', 'payment success'], ['300+', 'offers, ranked']],
      work: CS + 'eazydiner',
      photos: [['ed-live', 'First project, live'], ['ed-office', 'The office'], ['ed-meetup', 'First event']],
      pois: [[150, 100, 'ticket', '300+ offers, and the best one shown first.']] },
    { id: 'mmt', when: 'Apr – Oct 2025', place: 'Gurgaon', logo: 'logo-mmt', c: '#E4262C', at: [3260, 1000], lift: 238, name: 'Wayfinder',
      title: 'Then everything got bigger at Wayfinder.',
      txt: 'Millions of users. Complicated journeys. Tiny decisions that suddenly mattered a lot more. <b>Wayfinder</b> showed me what product design looked like at scale, and pushed me to think beyond individual screens.',
      stats: [['4,500+', 'bookings a day use it'], ['16 → 35%', 'hotels replying']],
      work: CS + 'requests',
      photos: [['mmt-day1', 'Day 1 at HQ'], ['mmt-view', 'My desk view']],
      pois: [[160, 100, 'bell', 'Hotels now reply: 16% → 35%.'], [-170, 110, 'heart', 'Swipr.AI: swipe right on a hotel.']] },
    { id: 'oyo', when: 'Dec 2025', place: 'Gurgaon', logo: 'logo-oyo', c: '#DC402A', at: [3820, 1460], lift: 200, name: 'Orbit',
      title: 'Then Orbit, and the whole stay.',
      txt: 'At <b>Orbit</b>, a hospitality chain, I design the moments between booking a room and walking into it: <b>self check-in, room selection and cancellations</b>. For <b>Haven</b>, an Orbit company, I redesigned the host dashboard.',
      stats: [['500', 'properties validated'], ['6,000+', 'approved next']],
      photos: [['oyo-floor', 'The Orbit floor'], ['oyo-building', 'Spaze Palazo, by night'], ['oyo-prism-figma', 'Designing PRISM'], ['oyo-prism-wall', 'PRISM, live on the wall']],
      work: 'traum', pois: [[160, 100, 'key', 'Self check-in, straight to your room.']] },
    { id: 'lastlook', when: '2026', place: 'On the App Store', logo: 'logo-lastlook', c: '#9A6A3E', at: [4380, 940], lift: 190, name: 'PocketCheck',
      title: 'Then I built something of my own.',
      txt: '<b>PocketCheck</b> started as a problem I wanted to solve for myself: I kept forgetting my things. So I designed it, built it and launched it on iOS.',
      stats: [['400+', 'downloads'], ['10', 'paying subscribers'], ['500K+', 'organic views']],
      work: APP,
      photos: [['ll-testflight', 'First testers on TestFlight'], ['ll-builds', '15 builds to get it right'], ['ll-approved', 'Approved for the App Store']],
      pois: [[160, 100, 'rocket', 'Idea to App Store, solo.']] },
    { id: 'creator', when: 'Always on', place: 'Instagram & LinkedIn', icon: 'camera', c: '#E1306C', at: [4940, 1260], lift: 150, name: 'Creator corner',
      title: 'And I share it all along the way.',
      txt: 'On <b>Instagram and LinkedIn</b>, I share what I make: design, building, career, and a few things I’ve learned along the way.',
      share: true,
      photos: [['cr-desk', 'Pen, paper, then post'], ['cr-night', 'Building, after hours'], ['cr-takes', 'Take 9 of many']],
      pois: [[-90, 110, 'in', 'LinkedIn', LI, '#0A66C2'], [90, 110, 'ig', 'Instagram', IG, '#E1306C']] }
  ];
  const CS_SOON = ['lastlook', 'campusx'];  // case studies still being written: never offered as "another story"
  const WORK = [
    { id: 'coupon', bg: 'radial-gradient(120% 80% at 15% 0%, #FFC9A8 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #E8402A 0%, transparent 60%), linear-gradient(165deg, #FF9A6B, #F25A38)', glow: '#FF7A4F', logo: 'logo-eazydiner', face: ['big', '+41%', 'payment success'], name: 'The Coupon Hunter', co: 'Tablely · PayEazy', t: '#FFE3D6', c: '#EE5A2B', icon: 'ticket', cs: CS + 'eazydiner', status: 'Live on app',
      pitch: 'Finding the best coupon shouldn’t feel like a treasure hunt. I rebuilt the coupon tray so the best deal is waiting for you.',
      meta: [['Role', 'Led the end-to-end redesign'], ['Timeline', 'Jan – Apr 2025, 4 months'], ['Team', '1 PM, 3 devs, 2 QA, Head of Product']],
      problem: 'People came to PayEazy to get a discount while paying their bill. Only 36 of every 100 finished paying, and 40% dropped the moment they had to pick a payment mode. They wanted the deal, but couldn’t tell which coupon was the best one, or whether it had even applied.',
      did: ['Pulled real complaints to check the problem was real: "I just apply the first coupon I see."', 'Filled a whiteboard with 40+ pain points and boiled them down to 5 core problems', 'Studied 50+ apps, from Zomato and Swiggy to BookMyShow and District', 'Went through 4 rounds: search and chips, bank sub-chips, tabs by card type, then the final tray', 'Solved the Axis Bank puzzle (80+ card types) by asking for the first 8 digits of the card', 'Put the single best coupon upfront, based on your payment method', 'Ran a 3-hour handoff with the devs so the logic behind every decision shipped too'],
      res: [['+41%', 'payment success, 34.6% → 45.6%'], ['+25%', 'coupon application, 55.5% → 67%'], ['18 → 42%', 'filter engagement'], ['+26%', 'coupon tray opens']],
      shots: ['ed1', 'ed2', 'ed3', 'ed4'] },
    { id: 'traum', bg: 'radial-gradient(90% 60% at 0% 0%, #FFD24D 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #EE4B73 0%, transparent 60%), linear-gradient(165deg, #3AA6E0, #1667A8)', glow: '#3AA6E0', logo: 'logo-traum', face: ['mid', 'A score worth chasing.', 'B2B host dashboard'], name: 'The Visibility Game', co: 'Haven · an Orbit company', t: '#F4F4F2', c: '#1667A8', icon: 'pin', cs: '', status: 'Desktop & mobile web',
      pitch: 'Turning a property dashboard into a system that tells owners what to do next, one score at a time.',
      meta: [['Role', 'Sole product designer'], ['Timeline', '1 month'], ['Platforms', 'Desktop and mobile web']],
      problem: 'Hosts couldn’t tell whether their listings were working, so they never bought add-ons and often missed renewals.',
      did: ['Reframed the brief around what hosts couldn’t see', 'Designed a visibility score, almost half of it earned for free', 'Iterated the page six times with business, product and engineering', 'Shipped desktop and mobile, with seasonal skins'],
      res: [], wins: ['A visibility score on every listing', 'Next steps picked for each owner', 'Clearer listing states'], goals: [['+5%', 'engagement'], ['+3–4%', 'renewals']], shots: [] },
    { id: 'requests', bg: 'radial-gradient(110% 70% at 10% 0%, #FF9A8C 0%, transparent 55%), radial-gradient(90% 80% at 100% 100%, #8E0D14 0%, transparent 60%), linear-gradient(165deg, #F2453D, #C8161E)', glow: '#EF3B35', logo: 'logo-mmt', face: ['big', '2×', 'hotel replies'], name: 'The Request Rescue', co: 'Wayfinder · Special Requests', t: '#FFE2DE', c: '#D7262B', icon: 'bell', cs: CS + 'requests', status: 'Live on app & desktop',
      pitch: 'Skip the calls, make it special, right in the app. Guests can ask for a late check-in or a birthday surprise, and hotels actually reply.',
      meta: [['Role', 'Product Design Intern'], ['Timeline', 'Apr – Oct 2025'], ['Platforms', 'App and desktop']],
      problem: 'Only 16% of guests ever found Special Requests, and 84% of those dropped off mid-flow. Every request sat in one long list, and only 16% of guests ever heard back from the hotel. So people just called.',
      did: ['Gave Special Requests a clear entry point on the review page', 'Split requests into groups you can scan, with a separate field for custom asks', 'Iterated on the card until it was visible without pushing down the rest of the page', 'Added Chat with Hotelier, so hotels can confirm requests in real time', 'Carried the redesign over to desktop'],
      res: [['16 → 25%', 'guests reaching the flow, in 2 weeks'], ['16 → 35%', 'hotel response rate'], ['20 → 80%', 'bookings with 2+ requests'], ['4,500+', 'bookings a day use it']],
      shots: ['mmt1', 'mmt2', 'mmt3'] },
    { id: 'swipr', bg: 'radial-gradient(110% 80% at 0% 0%, #FFA6D2 0%, transparent 55%), radial-gradient(100% 80% at 100% 100%, #1F4FE0 0%, transparent 60%), linear-gradient(150deg, #FF5FA8, #7B6BFF 55%, #3868FF)', glow: '#9A6BFF', logo: 'logo-mmt', face: ['mid', 'Swipe right on your next stay.', 'GenAI hotel search'], name: 'Property Matchmaker', co: 'Wayfinder · Swipr.AI', t: '#F1E6FF', c: '#5B5CF0', icon: 'heart', cs: CS + 'swipr', status: 'Award holder',
      pitch: 'Hotel hunting, but like a first date. Chat, swipe, and let GenAI find your match. No boring forms required.',
      meta: [['Role', 'Product designer'], ['Made at', 'Wayfinder'], ['Recognition', 'Award holder']],
      problem: 'New users all see the same ranked list, whatever their taste. The top 5% of hotels drive 80% of bookings, yet people scroll through minutes of listings that don’t fit them. The data showed the more properties someone views, the more likely they book: 40% at 5 properties, 80% at 30.',
      did: ['Let people describe the stay they want in plain words', 'Turned results into a swipe deck, right to shortlist and left to skip', 'Used every swipe as feedback to sharpen the next cards', 'Brought price, inclusions and cancellation policy to the front of each card'],
      res: [['40%', 'faster to discovery (projected)'], ['65%', 'more engagement with cards (projected)'], ['30%', 'more accurate matches (projected)'], ['25%', 'fewer search drop-offs (projected)']],
      shots: ['sw1', 'sw2', 'sw3'] },

    { id: 'lastlook', bg: 'radial-gradient(110% 70% at 15% 0%, #E2B98A 0%, transparent 55%), radial-gradient(90% 70% at 100% 100%, #3E2614 0%, transparent 60%), linear-gradient(165deg, #A8774B, #5E3B22)', glow: '#B8834F', logo: 'logo-lastlook', face: ['mid', 'FindMy, but for everything ↗', 'Live on iOS'], name: 'PocketCheck', co: 'My own app · iOS', t: '#F6E7D4', c: '#9A6A3E', icon: 'pin', cs: '#hello', csLabel: 'Get it on iOS', status: 'On the App Store',
      pitch: 'I kept forgetting where I left things. So I built an app. FindMy, but for everything you own.',
      meta: [['Role', 'Designer and builder'], ['Platform', 'iOS'], ['Status', 'Live on the App Store']],
      problem: 'Keys, headphones, a tiffin, a laptop charger. The things we lose most aren’t the ones with trackers, and we only notice after we’ve left.',
      did: ['Link your things to the places you take them, like office, gym or college', 'PocketCheck notices when you leave a place and reminds you what you carry', 'Memory Insights turns that activity into patterns, like what you forget most', 'Designed, built and shipped it myself'],
      res: [['Solo', 'designed, built and shipped'], ['0 → 1', 'idea to App Store']],
      shots: ['ll1', 'll2', 'll3', 'll4'] }
  ];
  const PROC = [
    ['Get the numbers', 'Only 36 of 100 users paid.', '#FFD23F'],
    ['Hear real users', '"I just apply the first coupon I see."', '#9FD3FF'],
    ['Find the real problem', '40+ pain points, boiled down to 5.', '#FFB4A0'],
    ['Study the field', '50+ apps, from Zomato to BookMyShow.', '#D9CCFF'],
    ['Iterate, a lot', '4 rounds, each one tested.', '#BDEBC0'],
    ['Hand off properly', 'A 3-hour deep dive with the devs.', '#FFD23F'],
    ['Measure it', 'Payment success up 41%.', '#9FD3FF']
  ];
  const img = k => `v2/s/${k}.webp`;

  /* ---------- smooth scroll ---------- */
  const lenis = (!reduce && window.Lenis && innerWidth >= 860 && !matchMedia('(pointer: coarse)').matches) ? new Lenis({ lerp: .09, smoothWheel: true, wheelMultiplier: .9 }) : null;
  const Y = () => (lenis ? lenis.scroll : window.scrollY);
  const HW = {};
  const goTo = (y, dur = 0) => { for (const k in HW) delete HW[k]; return lenis ? lenis.scrollTo(y, dur ? { duration: dur, easing: t => 1 - Math.pow(1 - t, 4) } : { immediate: true, force: true }) : scrollTo({ top: y, behavior: dur && !reduce ? 'smooth' : 'auto' }); };
  // once a scroll scene has played, its long scroll track folds away: it never replays, and scrolling back is quick
  const DONE = {};
  // scroll-linked scenes only move forward: scrolling up leaves them as they are,
  // and once you scroll back above a scene it resets and plays again on the way down
  const held = (k, y, resetAt) => { if (y <= resetAt || HW[k] === undefined) HW[k] = y; else HW[k] = Math.max(HW[k], y); return HW[k]; };
  const top = el => el.getBoundingClientRect().top + window.scrollY;

  let vw = innerWidth, vh = innerHeight, mobile = vw < 860;
  // unlit words read a little brighter at night
  const DIMW = () => document.documentElement.dataset.theme === 'dark' ? .34 : .13;
  addEventListener('themechange', () => { lastQ = -1; llLit = -1; });

  /* =========================================================
     1 · THE VALLEY
     ========================================================= */
  const heroScrim = $('#heroScrim'), stage = $('#stage'), cam = $('#cam'), scene = $('#scene'), valley = $('#top');
  const layers = $$('.ly', scene).map(el => ({ el, d: +el.dataset.d || 0 }));
  const chips = document.createElement('div'), heroCopy = $('#heroCopy'), places = document.createElement('div'), cue = $('#cue'), hint = $('#hint'), sheet = $('#sheet');
  const shade = $('#shade'); const t0 = performance.now();
  let SW = 0, SH = 0, baseX = 0, baseY = 0, ax = .5, vTop = 0, vRange = 1, pV = 0;
  const cur = { x: 0, y: 0, s: 1 }, ptr = { x: 0, y: 0, sx: 0, sy: 0 };   // the painting starts exactly where it rests: no intro zoom that would glide once loading ends
  let focusId = null, rate = 2;
  // "scroll to fly in" appears 4s after the page opens (or at once, if loading took longer); it hides once you scroll and returns if you settle back at the top
  let cueT = 0;
  const cueArm = (wait = 1500) => { clearTimeout(cueT);
    cueT = setTimeout(() => { if (pV < .002 && !focusId && !document.hidden) cue.classList.add('idle'); }, wait); };
  ['scroll', 'wheel', 'keydown', 'touchstart'].forEach(ev => addEventListener(ev, () => cueArm(), { passive: true }));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) cueArm(); });
  cueArm(Math.max(0, 4000 - performance.now()));

  /* the painting is a WebGL plate: a 4000px texture with mipmaps (a zoom stays sharp) and a hand-built depth map, so the pointer and the scroll move near things more than far ones */
  const AR = 2000 / 1126, PAR = [0, 0], FOC = [.52, .58];   // no mouse parallax: the painting stays put under the pointer
  const EXT_D = 'data:image/webp;base64,UklGRrYKAABXRUJQVlA4IKoKAABwZgCdASqAAdgAPpVAmUiztLYmLDZs8sASiWVulvU9/f/5wfXmwSr/27h2nwpGoJyfug0k7hWKKtux/09tvoBXPhK7s945fvqzTNfVQ+97wH//0f7ht/A//96XPg3/V48/hP/Ll0g2674I+IYv3Cthg558+YFZyXLZ7vAQjtS0Bx5y5o6xyubpi4p0fGcpBxHqQdGg87HGc231PnAvf6X0R/Wu46vd+w7Bbn2CBQMmwbhDxYbvGgbA7St7Snu3wxEYAsqsc2o76eDaR8n8uTXlXi1zzqdRrSq+bXH9EuU4K8tkdJNguZttaYtbHF8C//6WpofnfYQkuJamn/030HfrWMHZ6iONXYSoQkI2WcvpgKhdASk2aKCovHVSUIJYGutzj//++yE2gsAzRsnmkuKlqDEwsioeW1ZqOu+lcHwd6SPR3Q/SZFW6IbUJDbxAHkUv7ZL7nFG52M25mu/wY4WUMc4LlGXMQdBm464i0LUTb88W+DarFRcypTEGaXvLqXSHtzRM7JEUx32rsaSfWWP9zGPGKgIL8cTo0sAIhU9TcvPz96M+akOgd+SLCOKxUI8A2tpcLgfU4ug8/nvmEANOPq0LfBvlQvFitpxvQaR+sZGByoCOm1XmILhuG+A3zFU2LXBwwFs9UIGTUd8zpl0RV7C6J+f5gSCOq4x016fNMxysZ6VDelx+8fSRFa2NSFexkYpHBYXkRYEGbFjIY93nLy4dCj4A6Kfr7RJ6Rj79Y4BP/CwhQzf4xZcltg5DXg8nmiRI4y/798momwFkHtSVvBcANJXwF0D5djnsbtirDNbkxDjFFR6oFfTCWOH2jqUI/7u8ITncu4+jCt6HOwMM7Bp53fq4Ry3VUvQHBTqjd51pmHU7XXoCe1DJwSmKcZfugAk1sbUVlZ01besd+JMvxyWwuHv6oA9JdqjS8hOV3I5+zERSoo/33iRUDHOh/eHAFs6ndsNmP/PpZF/XWiUHHF7Z9JGRczfEBa2LI4Aez6q8cbXuLL1P+2kh34FVXE+luH5pncbmordgttpc2ull5JHSNVT5C+X2tjNP9FtgtxDou1s/5QMtY83L++dfWqqjC2nHFLt/fjbirAAA/tAo+znrR0F6ccW8etrvKTMGWvO+zAlxHbiqXCt1xfazcQMUP1eJz2JUN4MArG/kH7nPQIe016ZifesIhJOYzFTU+2asWdBQgDP+1+wxQ2Iv+BRr6MXRJZ4ljmS0DSl7D9cE8CqC2DzgrL4xfTfR8Ig/+j6K9OFR6fnaSoJ2uFBvxhgzLHL1WTnc6LjSyg6cb9pDzrnnpFzY898jZLuqOAkepJO0+P2xmH93E5XuzaJoQlG2Hpq7vANG09rLjnZW4J4M73tOVgAoqYL127u2VsZhnzbRYBmJdOFKXzgbr0hmRcGT0NHlMDBkOmAAYTMWECtkaR51UI0kKYEA8ygCXzgg6sX1t1pQgdUKLvA4gAu1tTkkJNqW+PY4nb8o+pgIhZ2J7Zr8ovLIL9tGa4fh1AW2yS9l5otCZuTz4x68qWWpLc+aoRvZCA/6uDyK+XzoS5xh90OIwDh6mneJolaX4zszcyCDqzWUYWfIOvUjZBHGlmkh/nnKrywhdamVqLS75tUeLzF9ZdyU+ssll3gHiEheNlN1EIdLY190vd/e94pc0nEWXLBgi4SFbrz3/cn2EFiEPQ4CR40R4fWbVM73dNOjYPllDIgeD76V5Lr6m7cimKlV1nC2sHvzfZ8MbPhvHbbDWeiVJFuFF2Mc24PxroZmgEvt5aOcu+STBp1r6Bj9R3AIKbPNMQcxwy+I4bYkQtmwYjLtDJJ125LekKOnE34kvFeERca728Hg9UIleuB4xYkAGJmKTl9S8KO/tXyGe2XWVvQJ5LAOiMGymvL/hwgDj7lsHcZX+qT6Dv9RF+pSTt/rtAFXwcUomoH12sSAX7vRcbsO+tVvcmnXD7PY35WCEMh3VJzg2NUPUSlpRv3K3VCn8VufsGFMs/OrC79GHbe1Jt3YL7U+VdL8AgqcbFcoBy9cxtOURDRkhhfog0F35IXlpRIlIq+qDWqiPpX8ZiV4+iC6PNF9GKvoRukYdEAv/7NEyjm2FpsLFcXSV2CQ7YxXXbAzX5ZMPYV7BGyxwu7MzKJ6JX9gQ4bZ9sTwR826p0jIeu1AcHv65CNh+0MCLMGu453XrVc1Y5ABKNFEn990kB/56Bg/bkk+en1/YV+bSbTZWDygggZ42yqpk5q6j7qkr7a2lcmx4xBOp8ZcuyrKhKhfLXraAyKulP3T2/3wwcnKtKzUjkhXfE6YGYW/TjWY6VSwGMg3OC3ghMNh43CKLtlvcFWG2oSJ99PNB9SoegPIuDbbqBK007klP9MKVzmYPQ8UzlRewoOmU/lREiIyYfRgRIT/OZ2K4kJJCjNF2wXBp+BTsfHW2pNJik1njOc5SsIqyRAt/gTywXdeSF/2J73Xyd5DJbJ+YUyhuclEZoEA1LvsUNn7LqWmKUE0+fgaQb7HT3NWtO5bf5aHWHjeoN+Sa2LQ1FGpvHlGRs4C272u45I5AXYWc+h5/PopffHtjeGxapwSPZ0gqI56VxQYEQvcKzNGdWxaJy9KeZWoMvROvgYJ49S6YK52uQfSPJDsLo8xE5D1iL15/qFFqlZZqvztghVpdfQ36yyjTi2/F9yE+dlfXMBulUItIXmE9NaYIr3z8xQAPWfjBDa0u8s+h1R71IpPINoUuiBSYjACxdgpVeeqUUwYOosi6GjFpmdsbe2DArK4XA7FMLZtwx3J7XmB7NZEprEZGiVCtQSLetQnN9k5JIEbFUW4GsQddhgufpAIaNWEHwtM4tZRwN0xsx1viIb2UcpO3uTEC8KB4B/xO687aSDzSWTfoy7XiDJuzuhRCVWBxQW6HlsAGCCPgIShHW0y+/dV42oJRYGyrsPB6jHBQwQsO24u4jYupZM8j8OPYy3uwhUnbZME7ndOyjwL4mEKSgLmxmb99n1U6TsbPFwou+J3tMG1R7k5M/eWmMIoWI6/407NtnTNFdydhnbJRtV7pzWxd8ymKvJbK4sylU19vYk+tsUfnO+xm9q0HbzOpWZRJkRA2nGmpfsAgYSr5/d+bQ4t9JUI3zC3NVwumikHqKWo7MOuhvwaHT8RC/ITSQx02Ahjf6KJP76Ix79Ze6y4Gm/Jpbsl5fTL34eHSage4NE6ooReTTyyXGvK00eJDbtITo2O0r/cgjGaWWBIWbgQ2EEiwk0j1NZQfPysFAaW7iVRNc9+gsrsYRKg5kjJ6MjcZXZQRC6NL38svxnqC3tBNhO1wXzzHNPvGlSIXhyDgKA8GMII7BkDRFRAxPhQbOqJeea1VGIKRAXq3uIWOR4x3xWTBrmi78Qjbs4e0iX7NrHMFAVGVut6lGbzjkOj1aCzdML9CCjrKFGsybxtJR2tj/SXIrzOWrtDCmqXuE5FBThOryNbvvsqAkvan1JUTqAK5kS2eFnRMlOYir4Cw2IF50anZKJTkIdSaULIfxXatLjA4qCzYKH2AHBLbxsSmsvw/Zgq7VQBx+UJLzsU+JJT8x97omm6vdDDigORPYHn0eix5blffCmfKFjKmXtsNEcnfq7FyfEJ5zydtb7qfaAO5b0XZQStVbP3V7+n4Xs53SQAAAA=', EXT_N = 'data:image/webp;base64,UklGRg4JAABXRUJQVlA4IAIJAABwSQCdASqAAdgAPpVEnEqztbIrpxRb+rASiWVu2TjwBjYSPkZMfFZI3Od8Lzrp0ieJ6/y7xC6b96kmi35zhoYAP//o/3ET+Af/zvAf/naD/+8vuEf62tz1Jy36uxpfohnOdfdy1dVViAZkUT1chDECMsQhAXiqA9+Qd1dsz+jThf7umkFTIkehsdJUI3MKFWFfo9YWMpU3MNDkuvXnIGxN6nHpFSxNK65xl64O8Ud0/Zht30jUaOgAbuk/cQMKHFmVscu/TlFLNz9iLQ9YuyxbUqtz0D/GYqL5qBi/AiTgbeWxrRwahwHD04TKyHgl8/pk+qPGCfH7PWrZcbEA1kko/wT2Z2bZLMhZ5oEX394uRzUon0EsyuPgShh1JYKmiVj5/8nfUFhuVEdrrLZoYAJd2b16CNCeHfvh4gdnDm/u/3F0BgJ9A7BIyzM6UIR29EM76iP8u68DLkZ+vjt3UhuuHvU64fIC2CBGtEd5skOTEfZyYpg5NBd7vFvW7KUN3E2ySGf8UShBvc5/GLblMOgSB487y60PxGi+67LABNmzDUQ3N5JUKVxwBftkJMLc9PO0HfiOc6KS85+5RrrOtsIBWQgEeubMxkDamA/MJ4oaxnys1ImbjkLpRkfCdjZ7c4Yh5dyCaR0XgSjyovbeELCP/rflB7CqemPS9dQmhqAyumkiZO7siMZPxQqhThhOATQSIIv/T/ioyBIhrRvULlHr20DO4wT74PJKihj7vNhWv+qepZ9e+wftYhO4EpzWlKkT1I1nBz++Y1p2QfmpKrF5EWyIAAD+8v0IovULunAqAmsWMnj5dbOls+SE2PyUgv4l1dHbr8usVymf5TxKH04viW9jjEnOllmWQwCw5IiiB+GJ3FffaT+Cv3ThLaDSzSlDplVosXX91kT6wj89ox9IMCN0vBAO1o0Pck1z4plm0zwCkRNA35e71jgroo3JDgBnIa8bxbZ+4jZlL8toxrtyi0vnHP6ojCgeFQt/af1GLfQR/Kylwn9Y+t+LDvLeH5vu84PLmroSXzX3oCRleSi8uFwAjazBIURlvmVIpQdwYiS9fkyibYSE8bhMXYq8nojpwrH4Qo6apaYLVRQUniBUyRacZfHtiX4XmXuDDlLhY0e1EkkPAtva3tB2PhjrpBkPHymtPDZwCQpc+xlQ/EcSOQ34l+cTaQbmnFDC87ohM1Q4mLqBWI/4FBmcWSNfIoPWseJ+23heAVufNjAOzCoIBGdBE0mb1cx82REvs5z+fUn6D0xxXR/JAmfanIqz1IO/+FbvZgv4n+d+m+IwlhTRt0H782tr0hKpENNCMfUagCFzILCSNxYcPVJqbnSBn72lPgPkqOfKZJtIds8Xpk8rhN3cCoK9wedTDHbAy0yhiRv2lD7/BLm/Z4DDp+Bxc7+eqb3gNkQQ3nqkiu3N9M47nYvvOT2Qg3C0uEEd2aEWa/X2hDXDvzMXXBgJ6taztVgN1h79v2ELK2eySqYzMTRrjmMiY9D2NJITR7X4jwyPiYUzT9471Q9vwPnJhjrn4VnNkzSREW66z5e6WGBbXj9ZgmwgGqifzUaCAoAqc3oh7WbUQwKssifSu0FSRe9HFBpX3QKVfAAgF+WFTLbPnl6Owf0KLTH625R8RmAV0qB8WA4JSzPl6rK6ub0r4XbTLXY6tfOmD1qsTKuS75V8rIqaPbC9JEut2L2592fezGQMgOQBlcbtphKGPbf2jqC1TxVtLD2EF4vt4bf5TrIJCyg5x5ZPBuqAaZLi+pAa7n4xe/2cfdtxPBl0Oekg3UI1x56jp2b8qldtBI24wfOokxruptJTlp7J9x2hDRdZ6q1LFvej0mBzgExhzG00TFxktnePEX9nZIoFkpZIxf8TNXXAmtEn9lIZmj7QS1RIS3B+fzWm3jQKtVEiJfgZ6ZHQgcquOExo8jUm4BZSYfiILYMtviKUSQHeFZdcM5W1qM146wbLQiH9BBGHULZzB7fEIslA2XPh+i1JWyfwpcift/THAwsjyKg12UJ/G/tK380jmhp/pyzH5RXJe63/Pox0jJaK15hCUIIOjcD4uTfow51SVhzuIUuFqh+KxkNufwgzQxz/SuScdLGHRNV52N2xgbRpmOb692LGxFFT1jIRqjmbmuGN/2trDHXClXybO/1+D8UOpvZcQLe04SXCv7IqrdJ+4V5xcpp+PXn3H9w4JBLNjl9sKoAOdFy0zG8C0LnGCkGL1Ks/c3lmt9Hn6jQ7rWmMPCpfPyyjDVNbMSFdb7mDYH0fPQMaVFNF+2fhvN0ynSCpoBU5YyRw4HmeD6R41x7QtjOcm6p4iTfnoTFkhwqF3v4ocRd5lw/+axNHTS51buAPX2R+0dd5TUZ+7Qxh5a23y3MLt8azXzVesAIzHDjWFUPWBYlDuZ0MIrdHL1ZaHgEHymSHj6d86gr5ZjNfRL/89fBCJdE0YXiik4BsHy5nu2M99WM7w6Hg2d6Woy07QBCQippZER8a/2f5UntNPC9kb9P5MVM7D599YUY8EKXyJNkdPXKYmTribYxmBjpkScy5pvQ2kxYS/+v17U7LnlRXzRz5f9qVrEguWCUB8ABC62FzNm26V1CtcnBoDJrvofmQ5AsFm3Xx8b4kuUpQbd02wpymhPciV5U8Hy/UpJ+dUU9w3SrGBmsS8SXr/sGTGKPKHNVbesSKQlksUXoQRhXxwVoFT+tGtZcKYmjqGsBjueK4sbiLjBV+znio1y4V2Z4oq3cFvzysbFODMj/5h0Cc6IB/OBNQWPt/uihkozkPVC48A8W9245Ovdn/UG+elF+yOtjbFxufeEk4Q1mOXoEY6i+HxMboFxgHmJpGHtZzri76ANnxSHkZJ5PwIKERO0sLZMsIjHMlLqeT4ZfX/jkUlmKYlLTwqrDCOUkTg1wm0n24yx6JJQYTKzevxH/tF+3TGIlJMlMc5pw6rN3AUSZhXcha6P5viuC3UYv7ucW8T745yJ0Sooc3BAbYM4YtQSeX+KIAJAGuKDWii7ywhUO/0VcGb9SPLmpwbsatWf8LyIq1IY3lkpGNzJxLLcBGNnF9JlPYFwE7fRGbVbbnDSdAAA==';
  const SPOT = { nsut: [.115, .41, .10, .13], oyo: [.92, .31, .10, .12], mmt: [.72, .45, .10, .085], eazydiner: [.81, .67, .10, .09], me: [.19, .76, .17, .17] };
  const glc = $('#glPlate'); let lastDraw = [0, 0, 0], glKey = '', nightLoad = null, nightReady = false, nf = 0, gl = null, glU = null, glReady = false, fa = 0, hspot = SPOT.eazydiner;
  const gain = (e, d) => 1 + e * (.02 + d * .12);
  // the painting's texture upload is heavy, so it starts once the headline has finished arriving (the plain image shows until then)
  setTimeout(function initGL() {
    if (matchMedia('(max-width: 859px)').matches) { addEventListener('resize', () => { if (!gl && innerWidth >= 860) initGL(); }); }
    let g; try { g = glc.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'high-performance' }); } catch (_) {}
    if (!g) return;
    const sh = (t, src) => { const o = g.createShader(t); g.shaderSource(o, src); g.compileShader(o); if (!g.getShaderParameter(o, g.COMPILE_STATUS)) throw new Error(g.getShaderInfoLog(o)); return o; };
    try {
      const pr = g.createProgram();
      g.attachShader(pr, sh(g.VERTEX_SHADER, `#version 300 es
in vec2 p; void main() { gl_Position = vec4(p, 0., 1.); }`));
      g.attachShader(pr, sh(g.FRAGMENT_SHADER, `#version 300 es
precision highp float;
uniform sampler2D uTex, uTexN, uDep, uExt, uExtN; uniform vec2 uRes, uSize, uOff; uniform vec3 uCam; uniform float uE, uDpr, uFocus, uNight; uniform vec4 uSpot;
out vec4 o;
const vec2 F = vec2(.52, .58);
float gn(float d) { return 1. + uE * (.02 + d * .12); }
void main() {
  vec2 css = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uDpr;
  vec2 uv = ((css - uCam.xy) / uCam.z) / uSize;
  float edge = min(min(uv.x, 1. - uv.x), min(uv.y, 1. - uv.y));
  vec2 off = uOff * smoothstep(0., .05, edge);
  vec2 c = uv;
  for (int i = 0; i < 3; i++) { float d = texture(uDep, clamp(c, 0., 1.)).r; c = F + (uv - off * (d - .45) - F) / gn(d); }
  // past the painting's edge the picture folds back on itself (a mirror), so the strip is real painting that matches the edge exactly
  vec2 oo = max(max(-c, c - 1.), 0.);
  vec2 mc = 1. - abs(1. - mod(c, 2.));
  float od = max(oo.x, oo.y), bias = clamp(od * 40., 0., 2.6);
  vec3 col = textureLod(uTex, mc, bias).rgb;
  if (uNight > .001) col = mix(col, textureLod(uTexN, mc, bias).rgb, uNight);
  col *= 1. - .35 * smoothstep(0., .1, od);
  float m = 1. - smoothstep(.58, 1., length((c - uSpot.xy) / uSpot.zw));
  float l = dot(col, vec3(.299, .587, .114));
  vec3 dim = mix(vec3(l), col, .55) * .86, lit = mix(vec3(l), col, 1.12) * 1.06;
  col = mix(col, mix(dim, lit, m), uFocus);
  o = vec4(col, 1.);
}`));
      g.linkProgram(pr); if (!g.getProgramParameter(pr, g.LINK_STATUS)) throw new Error(g.getProgramInfoLog(pr));
      g.useProgram(pr);
      g.bindBuffer(g.ARRAY_BUFFER, g.createBuffer()); g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), g.STATIC_DRAW);
      const a = g.getAttribLocation(pr, 'p'); g.enableVertexAttribArray(a); g.vertexAttribPointer(a, 2, g.FLOAT, false, 0, 0);
      glU = {}; ['uTex', 'uTexN', 'uDep', 'uExt', 'uExtN', 'uRes', 'uSize', 'uOff', 'uCam', 'uE', 'uDpr', 'uFocus', 'uNight', 'uSpot'].forEach(n => glU[n] = g.getUniformLocation(pr, n));
      const load = (src, unit, mips) => fetch(src).then(r => r.blob()).then(b => createImageBitmap(b, { imageOrientation: 'none', premultiplyAlpha: 'none' })).then(bm => {
        const t = g.createTexture(); g.activeTexture(g.TEXTURE0 + unit); g.bindTexture(g.TEXTURE_2D, t);
        g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, bm);
        g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE); g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
        g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
        if (mips) { g.generateMipmap(g.TEXTURE_2D); g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR_MIPMAP_LINEAR);
          const an = g.getExtension('EXT_texture_filter_anisotropic'); if (an) g.texParameterf(g.TEXTURE_2D, an.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(8, g.getParameter(an.MAX_TEXTURE_MAX_ANISOTROPY_EXT))); }
        else g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
        bm.close && bm.close();
      });
      g.uniform1i(glU.uTex, 0); g.uniform1i(glU.uDep, 1); g.uniform1i(glU.uTexN, 2); g.uniform1i(glU.uExt, 3); g.uniform1i(glU.uExtN, 4);
      gl = g;
      Promise.all([load('v2/h/plate.webp', 0, true), load('v2/h/depth2.png', 1, false), load(EXT_D, 3, false), load(EXT_N, 4, false)]).then(() => {
        // draw first, show the canvas under the page's own copy, and only then hide that copy: nothing changes on screen at the hand-over
        glReady = true; sizeGL(); glKey = ''; drawGL(lastDraw[0], lastDraw[1], lastDraw[2], .016); glc.classList.add('on');
        requestAnimationFrame(() => requestAnimationFrame(() => scene.classList.add('gl')));
        // the night painting loads once it is wanted (or a few seconds after the day one)
        const wantN = () => { if (nightLoad) return; nightLoad = load('v2/h/plate-night2.webp', 2, true).then(() => { nightReady = true; glc.classList.add('nt'); }).catch(() => {}); };
        if (document.documentElement.dataset.theme === 'dark') wantN(); else setTimeout(() => (window.requestIdleCallback || (f => f()))(wantN, { timeout: 4000 }), 8000); addEventListener('themechange', () => { wantN(); if (glReady && !mobile) { glKey = ''; drawGL(lastDraw[0], lastDraw[1], lastDraw[2], .016); } }); })
        .catch(() => { gl = null; });
    } catch (err) { console.warn('plate shader', err); gl = null; }
  }, 3300);
  function sizeGL() {
    const dpr = Math.max(1, Math.min(devicePixelRatio || 1, 1.5, Math.sqrt(2.2e6 / (vw * vh)))), w = Math.round(vw * dpr), h = Math.round(vh * dpr);
    if (glc.width !== w || glc.height !== h) { glc.width = w; glc.height = h; gl.viewport(0, 0, w, h); glKey = ''; }
  }
  function drawGL(e, px, py, dt) {
    if (!gl || !glReady || mobile) return;
    const dpr = glc.width / vw;
    fa += ((focusId ? 1 : 0) - fa) * (reduce ? 1 : clamp(dt * 3.2));
    const nt = nightReady && document.documentElement.dataset.theme === 'dark' ? 1 : 0;
    nf = reduce || document.startViewTransition ? nt : nf + (nt - nf) * clamp(dt * 3);
    lastDraw = [e, px, py];
    if (focusId && SPOT[focusId]) hspot = SPOT[focusId];
    const key = [cur.x, cur.y, cur.s, SW, px, py, e, fa, nf, glc.width, glc.height, hspot[0]].map(v => v.toFixed(3)).join();
    if (key === glKey) return; glKey = key;   // nothing moved: leave the last picture on screen
    gl.uniform2f(glU.uRes, glc.width, glc.height); gl.uniform1f(glU.uDpr, dpr);
    gl.uniform3f(glU.uCam, cur.x, cur.y, cur.s); gl.uniform2f(glU.uSize, SW, SH);
    gl.uniform2f(glU.uOff, -px * PAR[0] * (1 - fa), -py * PAR[1] * (1 - fa) * (SW / SH)); gl.uniform1f(glU.uE, e);
    gl.uniform1f(glU.uFocus, fa); gl.uniform1f(glU.uNight, nf); gl.uniform4f(glU.uSpot, hspot[0], hspot[1], hspot[2], hspot[3]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  // short or narrow laptop windows: the headline block shrinks until it clears every place tag, so nothing ever sits on top of the words
  function fitCopy() {
    if (mobile || !heroCopy) { if (heroCopy) heroCopy.style.removeProperty('--hs'); return; }
    const tags = $$('.pin[data-id]', scene).filter(p => !p.classList.contains('rpin')).map(p => { const b = $('b', p), x = baseX + parseFloat(p.style.left) / 100 * SW, y = baseY + parseFloat(p.style.top) / 100 * SH; return { l: x - b.offsetWidth / 2 - 8, r: x + b.offsetWidth / 2 + 8, t: y - b.offsetHeight - 30, b: y }; });
    let hs = 1; heroCopy.style.setProperty('--hs', 1);
    for (let i = 0; i < 8 && hs > .55; i++) {
      const o = e => ({ l: heroCopy.offsetLeft + e.offsetLeft, t: heroCopy.offsetTop + e.offsetTop, r: heroCopy.offsetLeft + e.offsetLeft + e.offsetWidth, b: heroCopy.offsetTop + e.offsetTop + e.offsetHeight });
      const boxes = [$('.hey', heroCopy), ...$$('h1 .ln > span', heroCopy), $('.sub', heroCopy)].filter(e => e && e.offsetWidth).map(o);
      if (!tags.some(t => boxes.some(r => r.l < t.r && r.r > t.l && r.t < t.b && r.b > t.t))) break;
      hs = Math.max(.55, hs * .94); heroCopy.style.setProperty('--hs', hs.toFixed(3));
    }
  }
  function layoutValley() {
    // phones: the whole valley fits the width and sits above the places bar, so every place is in view
    // desktop shows the whole painting (nothing cropped); phones keep their own hero
    SW = mobile ? vw * 1.14 : Math.min(vw, vh * AR); SH = mobile ? SW * 944 / 1680 : SW / AR;
    cam.style.width = SW + 'px'; cam.style.height = SH + 'px';
    if (mobile) ax = clamp(ax, 0, 1);
    baseX = (vw - SW) * (mobile ? ax : .5); baseY = mobile ? vh - SH - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navh')) || 92) * .55 : (vh - SH) * .5;
    if (gl) sizeGL();
    fitCopy();
    if (mobile && !cur.ok) cur.s = 1;
    vTop = top(valley); vRange = Math.max(1, valley.offsetHeight - vh);
    if (!cur.ok) { cur.x = baseX - (cur.s - 1) * SW * .5; cur.y = baseY - (cur.s - 1) * SH * .55; cur.ok = true; }
  }
  // a zoomed camera never shows past the painting; while the painting is smaller than the window it stays centred
  const fit = (v, size, lo) => size >= lo ? Math.min(0, Math.max(lo - size, v)) : (lo - size) / 2;
  const clampCam = o => { o.x = fit(o.x, o.s * SW, vw); o.y = fit(o.y, o.s * SH, vh); return o; };
  function focusCam(id) {
    const r = $(`.hot[data-id="${id}"]`, scene); const fx = (parseFloat(r.style.left) + parseFloat(r.style.width) / 2) / 100, fy = (parseFloat(r.style.top) + parseFloat(r.style.height) / 2) / 100;
    const s = mobile ? 1.9 : 1.32, P = PLACES[id];
    const sx = mobile ? vw * .5 : (P.side === 'left' ? vw * .68 : vw * .32), sy = mobile ? vh * .2 : vh * .52;
    if (mobile) return { x: clamp(sx - s * fx * SW, vw - s * SW, 0), y: sy - s * fy * SH, s };
    return clampCam({ x: sx - s * fx * SW, y: sy - s * fy * SH, s });
  }

  function fillSheet(id) {
    const P = PLACES[id], S = STOPS[P.j];
    sheet.style.setProperty('--c', P.c);
    $('#s-tag').textContent = P.tag; $('#s-t').textContent = P.t; $('#s-r').textContent = P.r; $('#s-l').textContent = P.h;
    $('#s-d').innerHTML = P.st.map(t => `<p>${t}</p>`).join(''); $('#s-d').hidden = !P.st.length;
    const fun = P.fun || [];
    $('#s-f').innerHTML = fun.length ? `<div class="sf-tabs" role="tablist">${fun.map(([t, c], k) => `<button type="button" role="tab" data-ft="${k}" style="--fc:${c}" aria-selected="${!k}">${t}</button>`).join('')}</div>`
      + fun.map(([, c, items], k) => `<ul class="sf-pane" data-fp="${k}" style="--fc:${c}"${k ? ' hidden' : ''}>${items.map(([b, t]) => `<li><b>${b}</b><span>${t}</span></li>`).join('')}</ul>`).join('') : '';
    $('#s-f').hidden = !fun.length;
    $('#s-n').innerHTML = P.n.map(([b, s]) => `<li><b>${b}</b><span>${s}</span></li>`).join('');
    const ph = P.photos || (S && S.photos) || [];
    $('#s-p').innerHTML = ph.length ? `<p>Gallery</p><div style="--n:${ph.length}">${ph.map(([src, cap], k) => `<button type="button" class="portfolio-ph" data-sg="${k}" aria-label="Open photo: ${cap}" style="--r:${[-3, 2, -1.5][k % 3]}deg"><span class="ph${src ? '' : ' empty'}">${src ? `<img src="${img(src)}" alt="" loading="lazy">` : `<svg viewBox="0 0 24 24">${ICONS.camera}</svg>`}</span><small>${cap}</small></button>`).join('')}</div>` : '';
    $('#s-p').hidden = !ph.length;
    $('#s-n').hidden = !P.n.length;
    const cta = P.links ? `<a class="s-link" href="${LI}" target="_blank" rel="noopener"><i style="background:#0A66C2"><svg viewBox="0 0 24 24">${ICONS.in}</svg></i>LinkedIn</a><a class="s-link" href="${IG}" target="_blank" rel="noopener"><i style="background:linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)"><svg viewBox="0 0 24 24">${ICONS.ig}</svg></i>Instagram</a><a class="s-link" href="mailto:hello@example.com"><i style="background:#EA4335"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="#fff" stroke-width="2"/><path d="M3.5 6.5L12 13l8.5-6.5" fill="none" stroke="#fff" stroke-width="2"/></svg></i>Gmail</a>` : P.cs ? `<button type="button" class="btn btn-ink s-cta" data-case="${P.cs}">${P.csL} <span aria-hidden="true">→</span></button>` : P.mail ? `<a class="btn btn-ink s-cta" href="${P.mail}">${P.csL} <span aria-hidden="true">↗</span></a>` : '';
    $('#s-row').innerHTML = cta; $('#s-row').hidden = !cta;
  }

  function focus(id) {
    if (!PLACES[id] || pV > .04) { if (PLACES[id]) { goTo(vTop); setTimeout(() => focus(id), 900); } return; }
    if (focusId === id) return;
    stage.classList.add('still');
    focusId = id; rate = 3; moved = 0; focusAt = performance.now(); clearTimeout(leaveT); leaveT = 0; fillSheet(id);
    sheet.classList.toggle('left', PLACES[id].side === 'left'); sheet.classList.add('on');
    scene.classList.add('focusing');
    layers.forEach(L => { const on = L.el.dataset.id === id; L.el.classList.toggle('on', on); L.el.classList.toggle('lift', on); });
    $$('.pin, #places button').forEach(b => b.classList.toggle('on', b.dataset.id === id));
    heroCopy.style.opacity = 0; hint.style.opacity = 0; chips.style.opacity = 0;
  }
  function unfocus() {
    if (!focusId) return;
    stage.classList.remove('still');
    focusId = null; rate = 2.6; sheet.classList.remove('on'); scene.classList.remove('focusing');
    layers.forEach(L => L.el.classList.remove('on', 'lift'));
    $$('.pin, #places button').forEach(b => b.classList.remove('on'));
    heroCopy.style.opacity = ''; hint.style.opacity = ''; chips.style.opacity = '';
  }
  let hoverT = 0, leaveT = 0;
  $$('.hot, .pin:not(.rpin)', scene).forEach(el => {
    const pinFor = $(`.pin[data-id="${el.dataset.id}"]`, scene);
    el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') pinFor.classList.add('hov'); });
    el.addEventListener('pointerleave', () => pinFor.classList.remove('hov'));
    el.addEventListener('click', () => focus(el.dataset.id));
  });
  let moved = 0, lmx = null, lmy = null, focusAt = 0;
  stage.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    lmx = e.clientX; lmy = e.clientY;
  });
  places.id = 'places'; places.className = 'places'; places.setAttribute('aria-label', 'Places in the valley');
  places.innerHTML = Object.entries(PLACES).map(([id, P]) => `<button type="button" data-id="${id}" style="--c:${P.c}">${id === 'me' ? 'Me' : P.t.replace(/,.*/, '')}</button>`).join('');
  stage.appendChild(places);
  $$('#places button').forEach(b => b.addEventListener('click', () => focusId === b.dataset.id ? unfocus() : focus(b.dataset.id)));
  $('#s-x').addEventListener('click', unfocus);
  // the mouse wheel over an open card scrolls the card, and never the page behind it
  sheet.addEventListener('wheel', e => { const up = e.deltaY < 0, top = sheet.scrollTop <= 0, end = sheet.scrollTop + sheet.clientHeight >= sheet.scrollHeight - 1;
    if ((up && top) || (!up && end)) e.preventDefault(); }, { passive: false });
  sheet.addEventListener('click', e => { const ft = e.target.closest('[data-ft]'); if (ft) { const k = ft.dataset.ft; $$('[data-ft]', sheet).forEach(b => b.setAttribute('aria-selected', b === ft)); $$('[data-fp]', sheet).forEach(u => u.hidden = u.dataset.fp !== k); return; } const w = e.target.closest('[data-walk]'); if (w) { unfocus(); walkTo(+w.dataset.walk); return; } const g = e.target.closest('[data-sg]'); if (g && focusId) { const P = PLACES[focusId]; openLB(P.j, +g.dataset.sg, P.photos && { c: P.c, when: P.tag, place: 'off the clock', title: 'That’s me', photos: P.photos }); return; } const c = e.target.closest('[data-case]'); if (c) openCaseAt(c.dataset.case, c); });
  addEventListener('keydown', e => { if (e.key === 'Escape') unfocus(); });
  stage.addEventListener('pointermove', e => { if (e.pointerType === 'mouse') { ptr.x = e.clientX / vw * 2 - 1; ptr.y = e.clientY / vh * 2 - 1; } });
  stage.addEventListener('click', e => { if (focusId && !e.target.closest('.hot, .pin, .sheet, .places')) unfocus(); });
  // phones: the portrait painting gets its own place pins, pinned to the buildings in it
  (() => {
    const ov = document.createElement('div'); ov.className = 'ph-pins';
    const SPOTS = [['nsut', 15, 51, 'l'], ['mmt', 89, 52, 'r'], ['oyo', 92, 35, 'r'], ['eazydiner', 84, 64, 'r'], ['me', 21, 66.5, 'l']];
    ov.innerHTML = SPOTS.map(([id, x, y, a]) => { const p = $(`.pin[data-id="${id}"]`, scene); if (!p) return ''; const c = p.cloneNode(true); $$('.hint', c).forEach(h => h.remove()); c.classList.add('ph-pin'); if (id === 'mmt') { const b = $('b', c), t = [...b.childNodes].reverse().find(n => n.nodeType === 3 && n.textContent.trim()); if (t) t.textContent = 'MMT'; } if (a) c.classList.add(a); c.style.left = x + '%'; c.style.top = y + '%'; return c.outerHTML; }).join('')
    ;
    $('.ph-hero', stage).after(ov);
    $$('.ph-pin[data-id]', ov).forEach(b => b.addEventListener('click', e => { e.stopPropagation(); focusId === b.dataset.id ? unfocus() : focus(b.dataset.id); }));
    // a pin never sits on the headline or its subtitle: if it would, it hangs below its spot instead
    const clear = () => { const t = $('.hero-copy', stage); if (!t || innerWidth >= 860) return; const lim = t.getBoundingClientRect().bottom + 6;
      $$('.ph-pin', ov).forEach(p => { p.classList.remove('down'); if (p.dataset.id === 'oyo' || p.getBoundingClientRect().top < lim) p.classList.add('down'); });
      // and never under the bottom nav: on real phones the browser bars and home bar push the nav up over the lowest pins
      const nav = [...document.querySelectorAll('nav')].find(n => { const r = n.getBoundingClientRect(); return r.height && r.top > innerHeight * .6; });
      const floor = (nav ? nav.getBoundingClientRect().top : innerHeight - 92) - 12;
      $$('.ph-pin', ov).forEach(p => { p.style.translate = ''; const r = p.getBoundingClientRect(), over = r.bottom - floor, dx = Math.round(Math.min(0, innerWidth - 10 - r.right) + Math.max(0, 10 - r.left)); if (over > 0 || dx) p.style.translate = `${dx}px ${over > 0 ? -Math.ceil(over) : 0}px`; }); };
    addEventListener('resize', clear); addEventListener('load', clear); setTimeout(clear, 900); setTimeout(clear, 2000);
    if (window.visualViewport) visualViewport.addEventListener('resize', clear);
  })();

  // mobile: drag to look around
  let drag0 = null;
  stage.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' && mobile && !focusId) drag0 = { x: e.clientX, ax }; });
  stage.addEventListener('pointermove', e => { if (drag0) { ax = clamp(drag0.ax - (e.clientX - drag0.x) / Math.max(1, SW - vw)); baseX = (vw - SW) * ax; } });
  addEventListener('pointerup', () => drag0 = null);
  setTimeout(() => stage.classList.add('ready'), 4700);
  if (!hoverable) hint.innerHTML = hint.innerHTML.replace('click a place', 'tap a place');

  function frameValley(dt, y) {
    pV = mobile ? 0 : clamp((y - vTop) / vRange);
    if (focusId && pV > .04) unfocus();
    const e = ss(pV);
    rate += ((focusId ? 3 : 2.2) - rate) * clamp(dt);
    const T = focusId ? focusCam(focusId) : { x: baseX, y: baseY, s: 1 };
    const k = reduce ? 1 : 1 - Math.exp(-dt * rate);
    cur.x += (T.x - cur.x) * k; cur.y += (T.y - cur.y) * k; cur.s += (T.s - cur.s) * k;
    ptr.sx += (ptr.x - ptr.sx) * clamp(dt * 1.6); ptr.sy += (ptr.y - ptr.sy) * clamp(dt * 1.6);
    const intro = reduce ? 0 : 1 - ss(clamp((performance.now() - t0 - 200) / 2000));

    // only touch the DOM when something actually moved, so an idle hero costs nothing
    const ct = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0) scale(${cur.s.toFixed(4)})`;
    if (ct !== frameValley.ct) { frameValley.ct = ct; cam.style.transform = ct; cam.style.setProperty('--ps', Math.pow(cur.s, -.75).toFixed(3)); }
    const fl = pV > .03; if (fl !== frameValley.fl) { frameValley.fl = fl; cam.classList.toggle('flying', fl); }
    // fly-through: each layer grows around the valley's focal point by depth; foreground flies out
    const px = reduce ? 0 : ptr.sx, py = reduce ? 0 : ptr.sy;
    // the DOM layers (pins, hot areas, the gramophone) ride the same depth maths as the shader, so they stay glued to their buildings
    for (const L of layers) {
      const d = L.d, sc = gain(e, d), k = (d - .45) * (1 - fa);
      const lt = `translate3d(${(-px * PAR[0] * k * SW).toFixed(1)}px, ${(-py * PAR[1] * k * SW).toFixed(1)}px, 0) scale(${sc.toFixed(4)})`;
      if (lt !== L.t) { L.t = lt; L.el.style.transform = lt; }
    }
    drawGL(e, px, py, dt);
    const t = range(pV, .02, .3);
    heroCopy.style.transform = `translate3d(0, ${(-t * vh * .35).toFixed(1)}px, 0)`;
    if (!focusId) heroCopy.style.opacity = (1 - t * 1.2).toFixed(3);
    heroScrim.style.opacity = focusId ? 0 : Math.max(0, 1 - t * 1.2).toFixed(3);
    places.style.opacity = pV > .002 ? (1 - range(pV, .0, .08)).toFixed(3) : '';
    places.style.pointerEvents = pV > .06 ? 'none' : '';
    if ((pV > .002 || focusId) && cue.classList.contains('idle')) cue.classList.remove('idle');
    shade.style.opacity = range(pV, .25, .65).toFixed(3);
    if (!focusId) { const fo = (1 - range(pV, .0, .12)); chips.style.opacity = pV > .002 ? fo.toFixed(3) : ''; hint.style.opacity = pV > .002 ? fo.toFixed(3) : ''; }
  }

  /* =========================================================
     2 · HOW I GOT HERE
     ========================================================= */
  const tell = $('#tell'), tellBox = $('#tellBox'), story = $('#story'), svgD = $('#doodles');
  const words = [], marks = [];
  (function split(node, mark) {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const f = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(tok => {
          if (!tok) return;
          if (/^\s+$/.test(tok)) { f.appendChild(document.createTextNode(tok)); return; }
          const s = document.createElement('span'); s.className = 'w'; s.textContent = tok; f.appendChild(s); words.push({ el: s, mark });
        });
        n.replaceWith(f);
      } else if (n.classList && n.classList.contains('hl')) { const m = { el: n, last: 0, dd: n.dataset.dd, paths: [] }; marks.push(m); split(n, m); }
    });
  })(tell, null);
  words.forEach((w, i) => { if (w.mark) w.mark.last = i; });
  const stickies = $$('.sticky', tellBox);
  let sTop = 0, sRange = 1;

  const rnd = (a => () => (a = (a * 16807) % 2147483647) / 2147483647)(7);
  function roughEllipse(cx, cy, rx, ry) {
    let d = ''; const n = 36, turns = 1.12, st = -.4;
    for (let i = 0; i <= n; i++) {
      const t = st + (i / n) * Math.PI * 2 * turns, j = 1 + (rnd() - .5) * .06 + (i / n) * .05;
      const x = cx + Math.cos(t) * rx * j, y = cy + Math.sin(t) * ry * j;
      d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    return d;
  }
  function buildDoodles() {
    const B = tellBox.getBoundingClientRect(); svgD.innerHTML = '';
    svgD.setAttribute('viewBox', `0 0 ${B.width} ${B.height}`);
    const add = (d, color, w, m) => { const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', d); p.setAttribute('stroke', color); p.setAttribute('stroke-width', w); svgD.appendChild(p); const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; m.paths.push({ p, L }); };
    const rectOf = m => { const rs = [...m.el.getClientRects()]; const r = rs[rs.length - 1]; return { x: r.left - B.left, y: r.top - B.top, w: r.width, h: r.height, first: rs[0] }; };
    marks.forEach(m => {
      m.paths = []; const r = rectOf(m);
      if (m.dd === 'circle') {
        const rs = [...m.el.getClientRects()]; const x0 = Math.min(...rs.map(q => q.left)) - B.left, x1 = Math.max(...rs.map(q => q.right)) - B.left, y0 = Math.min(...rs.map(q => q.top)) - B.top, y1 = Math.max(...rs.map(q => q.bottom)) - B.top;
        add(roughEllipse((x0 + x1) / 2, (y0 + y1) / 2, (x1 - x0) / 2 + 18, (y1 - y0) / 2 + 12), '#FF6B4A', 4, m);
      } else if (m.dd === 'gear') {
        const cx = r.x + r.w + 8, cy = r.y - 6, R = Math.max(14, r.h * .28); let d = '';
        for (let i = 0; i <= 48; i++) { const t = i / 48 * Math.PI * 2, rr = R * (i % 6 < 3 ? 1 : .78); d += (i ? ' L' : 'M') + (cx + Math.cos(t) * rr).toFixed(1) + ' ' + (cy + Math.sin(t) * rr).toFixed(1); }
        add(d, '#13233A', 3, m); add(roughEllipse(cx, cy, R * .35, R * .35), '#13233A', 3, m);
      } else if (m.dd === 'under') {
        const y = r.y + r.h - 2; let d = `M${r.x} ${y}`; const seg = 26;
        for (let x = r.x; x < r.x + r.w; x += seg) d += ` q ${seg / 2} ${(x / seg) % 2 ? 9 : -9} ${seg} 0`;
        add(d, '#13233A', 3.5, m);
      } else if (m.dd === 'stars' && !mobile) {
        const sx = r.x + r.w + 14, sy = r.y + 4, star = (x, y, s) => `M${x} ${y - s}L${x} ${y + s}M${x - s} ${y}L${x + s} ${y}M${x - s * .6} ${y - s * .6}L${x + s * .6} ${y + s * .6}M${x + s * .6} ${y - s * .6}L${x - s * .6} ${y + s * .6}`;
        add(star(sx + 10, sy + 6, 13), '#FF6B4A', 3.5, m); add(star(sx + 36, sy - 16, 8), '#2F7FD8', 3, m); add(star(sx + 4, sy - 24, 6), '#13233A', 2.5, m);
      } else if (m.dd === 'scribble' && !mobile) {
        const y = r.y + r.h * .98; add(`M${r.x - 6} ${y} C ${r.x + r.w * .3} ${y + 10}, ${r.x + r.w * .6} ${y - 6}, ${r.x + r.w + 8} ${y + 4} M${r.x + 4} ${y + 12} C ${r.x + r.w * .4} ${y + 18}, ${r.x + r.w * .7} ${y + 6}, ${r.x + r.w} ${y + 14}`, '#FF6B4A', 3.5, m);
      }
    });
  }
  // phones: a reveal starts when its block comes into view and plays on its own, the scroll never holds it
  const PLAY = {};
  function playIn(el, k, ms) { if (!PLAY[k]) { const r = el.getBoundingClientRect(); if (r.top < vh * .8 && r.bottom > 0) PLAY[k] = performance.now(); else return 0; } return clamp((performance.now() - PLAY[k]) / ms); }
  function layoutStory() { sTop = top(story); sRange = Math.max(1, story.offsetHeight - vh); const dk = Math.round(tellBox.offsetWidth) + 'x' + Math.round(tellBox.offsetHeight) + ':' + words.length;
    if (dk !== layoutStory.dk) { layoutStory.dk = dk; buildDoodles(); lastQ = -1; } }
  let lastQ = -1;
  function frameStory(y) {
    const q = playIn(tell, 'st', 2800);
    if (Math.abs(q - lastQ) < .001) return; lastQ = q;
    const lit = q * words.length * 1.05;
    const b0 = DIMW(); words.forEach((w, i) => { w.el.style.opacity = (b0 + (1 - b0) * clamp(lit - i)).toFixed(3); });
    marks.forEach(m => {
      const on = lit >= m.last + 1; m.el.classList.toggle('on', on);
      const t = clamp((lit - m.last - 1) / 3);
      m.paths.forEach((P, k) => { const tt = clamp(t * m.paths.length - k); P.p.style.strokeDashoffset = (P.L * (1 - ss(tt))).toFixed(1); });
    });
    stickies.forEach(s => { if (q >= +s.dataset.at) s.classList.add('in'); });
    const mh = $('#moveHint'); if (q > .8 && !mh.classList.contains('in')) placeHint(); mh.classList.toggle('in', q > .8);
  }
  // "these notes move" sits on the left edge of the yellow note, pointing into it
  function placeHint() {
    const mh = $('#moveHint'), note = stickies[0]; if (!mh || !note) return;
    mh.style.left = (note.offsetLeft - mh.offsetWidth + 16) + 'px';
    mh.style.top = (note.offsetTop + note.offsetHeight * .72 - mh.offsetHeight / 2) + 'px';
  }
  addEventListener('resize', () => { if ($('#moveHint').classList.contains('in')) placeHint(); });
  function draggable(el, onMove) {
    let s = null;
    el.addEventListener('pointerdown', e => {
      if (e.target.closest('a, button')) return;
      e.preventDefault(); el.setPointerCapture(e.pointerId); el.classList.add('drag');
      const cs = getComputedStyle(el); s = { x: e.clientX, y: e.clientY, tx: parseFloat(cs.getPropertyValue('--tx')) || 0, ty: parseFloat(cs.getPropertyValue('--ty')) || 0 };
      el.style.zIndex = ++draggable.z;
    });
    el.addEventListener('pointermove', e => { if (!s) return; el.style.setProperty('--tx', (s.tx + e.clientX - s.x) + 'px'); el.style.setProperty('--ty', (s.ty + e.clientY - s.y) + 'px'); el.dataset.moved = 1; onMove && onMove(); });
    const end = () => { s = null; el.classList.remove('drag'); };
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  }
  draggable.z = 10;
  stickies.forEach(s => { draggable(s); s.addEventListener('pointerdown', () => $('#moveHint').classList.add('done'), { once: true }); });
  $$('.item', $('#desk')).forEach(el => {
    el.style.transform = 'translate(var(--tx,0), var(--ty,0)) rotate(var(--r,0deg))';
    draggable(el);
    if (el.classList.contains('vinyl')) { let d0 = null;
      el.addEventListener('pointerdown', e => { d0 = [e.clientX, e.clientY]; });
      el.addEventListener('pointerup', e => { if (e.target.closest('a, button')) return; if (d0 && Math.hypot(e.clientX - d0[0], e.clientY - d0[1]) < 6) el.classList.toggle('ask'); d0 = null; });
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.classList.toggle('ask'); } });
      $('.vn-x', el).addEventListener('click', () => el.classList.remove('ask')); }
    if (el.classList.contains('mag')) el.addEventListener('pointerdown', () => { el.classList.remove('wig'); void el.offsetWidth; el.classList.add('wig'); });
  });

  /* =========================================================
     3 · THE JOURNEY (a map you discover)
     ========================================================= */
  const journey = $('#journey'), jTrack = $('#jTrack'), mapview = $('#mapview'), world3 = $('#world3'), mapArt = $('#mapArt'), jcard = $('#jcard'), jcIn = $('#jcIn'), compass = $('#compass'), needle = $('#needle'), meTip = $('#meTip'), polsEl = $('#pols');
  const N = STOPS.length, MW = 4720, MH = 3900;
  // the route is a heart: it starts at the tip, climbs the Jakarta lobe, crosses the river, and comes home down the Gurgaon side
  const HX = MW / 2, HY = 1780, HKX = 110, HKY = 100;
  const heartAt = t => [HX + 16 * Math.sin(t) ** 3 * HKX, HY - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * HKY];
  const heartPts = Array.from({ length: 721 }, (_, k) => heartAt(Math.PI + 2 * Math.PI * k / 720));
  const heartLen = [0]; for (let k = 1; k < heartPts.length; k++) heartLen.push(heartLen[k - 1] + Math.hypot(heartPts[k][0] - heartPts[k - 1][0], heartPts[k][1] - heartPts[k - 1][1]));
  const heartPoint = f => { const L = f * heartLen[heartLen.length - 1]; let k = 1; while (k < heartLen.length - 1 && heartLen[k] < L) k++; const a = heartPts[k - 1], b = heartPts[k], u = (L - heartLen[k - 1]) / Math.max(1e-6, heartLen[k] - heartLen[k - 1]); return [Math.round(a[0] + (b[0] - a[0]) * u), Math.round(a[1] + (b[1] - a[1]) * u)]; };
  const HEART_F = [.075, .15, .23, .31, .39, .61, .7, .79, .88];
  STOPS.forEach((st, i) => { st.at = heartPoint(HEART_F[i]); });
  const heartD = 'M' + heartPts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L');
  const jHead = $('#jHead'), jFade = $('#jFade');
  let spot, spotG; const spotC = { x: STOPS[0].at[0], y: STOPS[0].at[1] };
  let jCar = false, jpos = -1, jposT = -1, jdrag = false, jIdx = -1;
  const holeR = STOPS.map(() => 0);
  let jTop = 0, jRange = 1, carve, casing, ghost, fogPath, holes = [], pathLen = 0, stopL = [], jmarks = [], pois = [], lastCard = -2, heading = 0, polFor = -2;
  const mrand = (a => () => (a = (a * 16807) % 2147483647) / 2147483647)(42);
  const blob = (cx, cy, rx, ry, amp, seed) => { let d = ''; for (let a = 0; a <= 64; a++) { const t = a / 64 * Math.PI * 2, w = 1 + amp * (Math.sin(3 * t + seed) * .6 + Math.sin(5 * t + seed * 2) * .3 + Math.sin(8 * t + seed) * .1); d += (a ? 'L' : 'M') + (cx + Math.cos(t) * rx * w).toFixed(1) + ' ' + (cy + Math.sin(t) * ry * w).toFixed(1); } return d + 'Z'; };
  const grad = c => `linear-gradient(145deg, color-mix(in srgb, ${c} 55%, #fff), ${c})`;
  (function drawMap() {
    const FONT = 'Bricolage Grotesque, sans-serif', LAND = '#FDFCF9', PARK = '#CDE8C4', PARK2 = '#BEDCA0', WATER = '#AAD3F2', WATER_E = '#86C1EA';
    let h = `<defs><radialGradient id="hole"><stop offset="0" stop-color="#000"/><stop offset=".35" stop-color="#000"/><stop offset=".7" stop-color="#777"/><stop offset="1" stop-color="#fff"/></radialGradient>
      <mask id="fogMask" maskUnits="userSpaceOnUse" x="-900" y="-900" width="${MW + 1800}" height="${MH + 1800}"><rect x="-900" y="-900" width="${MW + 1800}" height="${MH + 1800}" fill="#fff"/>
      <path id="fogPath" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="260" stroke-linecap="round" stroke-linejoin="round"/>${STOPS.map((_, i) => `<circle id="hole${i}" r="0" fill="url(#hole)"/>`).join('')}</mask>
      <radialGradient id="spotG" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="820"><stop offset="0" stop-color="${LAND}" stop-opacity="0"/><stop offset=".4" stop-color="${LAND}" stop-opacity="0"/><stop offset="1" stop-color="${LAND}" stop-opacity=".86"/></radialGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EAF3FD"/><stop offset="1" stop-color="#C9DDF2"/></linearGradient></defs>`;
    h += `<rect x="-3000" y="-3000" width="${MW + 6000}" height="${MH + 6000}" fill="${LAND}"/>`;
    // two cities: a tight street grid with building footprints between the streets
    const CITIES = [[HX - 1050, HY + 150, 1380], [HX + 1050, HY + 150, 1380]];
    h += `<defs><radialGradient id="cityG"><stop offset="0" stop-color="#ECE8E1"/><stop offset=".8" stop-color="#EEEAE3"/><stop offset="1" stop-color="${LAND}" stop-opacity="0"/></radialGradient>${CITIES.map(([cx, cy, R], k) => `<clipPath id="cityC${k}"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath>`).join('')}</defs>`;
    const ST = 150, AR = 600, dens = (x, y) => Math.max(...CITIES.map(([cx, cy, R]) => 1 - Math.hypot(x - cx, y - cy) / (R * 1.25)));
    let bld = '', minor = '', major = '';
    for (let x0 = -ST * 2; x0 < MW + ST * 2; x0 += ST) for (let y0 = -ST * 2; y0 < MH + ST * 2; y0 += ST) {
      const dn = dens(x0 + ST / 2, y0 + ST / 2); if (mrand() > .12 + dn * .95) continue;
      const n = dn < .2 ? 1 : mrand() < .35 ? 1 : 2 + Math.floor(mrand() * 2), m = 18;
      for (let q = 0; q < n; q++) { const w = (ST - m * 2) / (n > 2 ? 2 : n) - 6, hh = n > 2 ? (ST - m * 2) / 2 - 6 : ST - m * 2 - mrand() * 40;
        const bx = x0 + m + (n > 2 ? (q % 2) * (w + 12) : q * (w + 12)), by = y0 + m + (n > 2 ? Math.floor(q / 2) * (hh + 12) : 0);
        if (mrand() < .9) bld += `<rect x="${bx.toFixed(0)}" y="${by.toFixed(0)}" width="${Math.max(10, w).toFixed(0)}" height="${Math.max(10, hh).toFixed(0)}" rx="4"/>`; }
    }
    for (let g = -ST * 2; g <= Math.max(MW, MH) + ST * 2; g += ST) { const isA = g % AR === 0; const seg = (g <= MW + ST * 2 ? `M${g} -400V${MH + 400}` : '') + (g <= MH + ST * 2 ? `M-400 ${g}H${MW + 400}` : ''); if (isA) major += seg; else minor += seg; }
    CITIES.forEach(([cx, cy, R]) => { major += `M${cx - R} ${cy - R * .7}L${cx + R} ${cy + R * .8}`; });
    // the grid fades out softly at the edges of the map, so it never ends in a hard line
    h += `<defs><radialGradient id="edgeG" cx=".5" cy=".5" r=".62"><stop offset=".72" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient><mask id="edgeM" maskUnits="userSpaceOnUse" x="-400" y="-400" width="${MW + 800}" height="${MH + 800}"><rect x="-400" y="-400" width="${MW + 800}" height="${MH + 800}" fill="url(#edgeG)"/></mask></defs>
      <g mask="url(#edgeM)"><g fill="#E3DED5">${bld}</g>
      <path d="${minor}" fill="none" stroke="#E2DDD3" stroke-width="12"/><path d="${minor}" fill="none" stroke="#FFFFFF" stroke-width="8"/>
      <path d="${major}" fill="none" stroke="#DCD5C9" stroke-width="22"/><path d="${major}" fill="none" stroke="#FFFFFF" stroke-width="16"/></g>`;
    // parks and water, flat like a real map
    [[HX - 1020, HY + 820, 300, 140], [HX + 1000, HY - 60, 280, 160], [520, 520, 360, 190], [MW - 520, 560, 340, 180], [560, MH - 420, 380, 160], [MW - 560, MH - 380, 360, 150], [HX - 1500, HY + 380, 170, 110], [HX + 1420, HY + 700, 190, 110]].forEach(([cx, cy, rx, ry], k) => {
      h += `<path d="${blob(cx, cy, rx, ry, .1, k * 1.7)}" fill="${PARK}"/>`; });
    h += `<path d="${blob(HX - 1000, HY - 80, 230, 120, .1, 3)}" fill="${WATER}"/>`;
    // the river splits Jakarta from Gurgaon, right down the middle
    const river = `M${HX - 40} -300 C ${HX + 70} 500, ${HX - 70} 1300, ${HX} 2100 S ${HX + 60} 3200, ${HX - 20} ${MH + 400}`;
    h += `<path d="${river}" fill="none" stroke="${WATER}" stroke-width="80" stroke-linecap="round"/>`;
    // the expressway between the two cities
    const main = `M-300 ${HY + 420} C ${MW * .25} ${HY + 360}, ${MW * .5} ${HY + 480}, ${MW * .75} ${HY + 400} S ${MW + 200} ${HY + 380}, ${MW + 400} ${HY + 420}`;
    h += `<path d="${main}" fill="none" stroke="#EDC458" stroke-width="30" stroke-linecap="round"/><path d="${main}" fill="none" stroke="#FCDE86" stroke-width="24" stroke-linecap="round"/>`;
    h += `<g transform="translate(${HX - 260} ${HY + 420})"><rect x="-30" y="-14" width="60" height="28" rx="6" fill="#fff" stroke="#E4B847" stroke-width="2.5"/><text y="7" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="17" fill="#8A6A1E">NH48</text></g>`;
    // the route runs on a road of its own
    h += `<path d="${heartD}" fill="none" stroke="#DCD5C9" stroke-width="34" stroke-linejoin="round"/><path d="${heartD}" fill="none" stroke="#FFFFFF" stroke-width="27" stroke-linejoin="round"/>`;
    // labels: quiet grey with a paper halo, like a real map
    h += `<g font-family="${FONT}" font-weight="700" fill="#8C9096" stroke="${LAND}" stroke-width="10" paint-order="stroke" stroke-linejoin="round" letter-spacing="14" text-anchor="middle" font-size="46"><text x="${HX - 1000}" y="${HY + 250}">NEW DELHI</text><text x="${HX + 1000}" y="${HY + 250}">GURGAON</text></g>`;
    h += `<g font-family="${FONT}" font-weight="600" font-size="22" fill="#6E9FCB" text-anchor="middle"><text x="${HX - 1000}" y="${HY - 72}">Blue Lake</text></g>`;
    window.__mapRoads = { main, river };
    // ---- the trail
    const d = heartD;
    // ---- landmarks, drawn flat in the map's own style
    const box = (x, y, w, hh, dd, f, sd, rf) => { const dx = dd * .55, dy = -dd * .4; return `<path d="M${x} ${y - hh}h${w}v${hh}h${-w}z" fill="${f}"/><path d="M${x + w} ${y - hh}l${dx} ${dy}v${hh}l${-dx} ${-dy}z" fill="${sd}"/><path d="M${x} ${y - hh}l${dx} ${dy}h${w}l${-dx} ${-dy}z" fill="${rf}"/>`; };
    const wins = (x, y, cols, rows, cw, ch, gx, gy, c) => { let o = ''; for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) o += `<rect x="${x + i * (cw + gx)}" y="${y + j * (ch + gy)}" width="${cw}" height="${ch}" rx="2" fill="${c}"/>`; return o; };
    const tree = (x, y, r = 16, c = '#8CC26C') => `<rect x="${x - 2}" y="${y - 6}" width="4" height="12" fill="#8B6B45"/><circle cx="${x}" cy="${y - r}" r="${r}" fill="${c}"/><circle cx="${x - r * .35}" cy="${y - r * 1.2}" r="${r * .5}" fill="#A9D48A"/>`;
    const pad = (x, y, rx = 170, ry = 58, c = '#EADFC8') => `<rect x="${x - rx}" y="${y - ry * .9}" width="${rx * 2 + 30}" height="${ry * 1.5}" rx="22" fill="${c}" stroke="#DDCFB3" stroke-width="3"/><rect x="${x - 18}" y="${y + ry * .6}" width="36" height="34" fill="#F4EEE2"/>`;
    const logoSign = (src, cx, cy, sz, post) => `${post ? `<rect x="${cx - 2.5}" y="${cy + sz / 2}" width="5" height="${post}" fill="#6B7280"/>` : ''}<clipPath id="lc-${src}"><rect x="${cx - sz / 2}" y="${cy - sz / 2}" width="${sz}" height="${sz}" rx="${sz * .24}"/></clipPath><rect x="${cx - sz / 2 - 5}" y="${cy - sz / 2 - 5}" width="${sz + 10}" height="${sz + 10}" rx="${sz * .3}" fill="#fff" stroke="#E6DCC8" stroke-width="2"/><image href="${img(src)}" x="${cx - sz / 2}" y="${cy - sz / 2}" width="${sz}" height="${sz}" clip-path="url(#lc-${src})" preserveAspectRatio="xMidYMid slice"/>`;
    const house = (x, y, w, hh, wall, roof, win) => `<rect x="${x}" y="${y - hh}" width="${w}" height="${hh}" fill="${wall}"/><path d="M${x - 10} ${y - hh + 2}L${x + w / 2} ${y - hh - w * .42}L${x + w + 10} ${y - hh + 2}z" fill="${roof}"/>` + wins(x + 12, y - hh + 14, 2, 1, 22, 20, w - 70, 0, win) + `<rect x="${x + w / 2 - 12}" y="${y - 32}" width="24" height="32" rx="3" fill="${roof}"/>`;
    // ---- places: clean front-view illustrations, one soft palette, no blocky extrusions
    const gnd = (x, y, w) => `<ellipse cx="${x}" cy="${y + 3}" rx="${w / 2}" ry="${Math.max(10, w * .075)}" fill="#3A2A12" opacity=".09"/>`;
    const tr = (x, y, s = 1, c = '#7DB968') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-3" y="-24" width="6" height="24" rx="3" fill="#8A6A48"/><circle cy="-42" r="21" fill="${c}"/><circle cx="-8" cy="-49" r="8" fill="#fff" opacity=".2"/></g>`;
    const bush = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cy="-8" rx="17" ry="10" fill="#8AC474"/><ellipse cx="-5" cy="-12" rx="6" ry="3.5" fill="#fff" opacity=".22"/></g>`;
    const grid = (x, y, cols, rows, w, h, gx, gy, c, r = 2.5, hi = false) => { let o = ''; for (let a = 0; a < cols; a++) for (let b = 0; b < rows; b++) { const X = x + a * (w + gx), Y = y + b * (h + gy); o += `<rect x="${X}" y="${Y}" width="${w}" height="${h}" rx="${r}" fill="${c}"/>`; if (hi) o += `<path d="M${X + 3} ${Y + h - 3}L${X + w - 3} ${Y + 3}" stroke="#fff" stroke-width="1.6" opacity=".45"/>`; } return o; };
    const arches = (x, y, n, w, h, gap, c) => { let o = ''; for (let a = 0; a < n; a++) { const X = x + a * (w + gap); o += `<path d="M${X} ${y + h}V${y + w / 2}a${w / 2} ${w / 2} 0 0 1 ${w} 0V${y + h}z" fill="${c}"/>`; } return o; };
    const LM = {
      jee: (x, y) => gnd(x, y, 330) + tr(x - 170, y, 1.05) + tr(x + 175, y, .9, '#8CC66F') + bush(x - 118, y) + bush(x + 125, y, .9) +
        `<rect x="${x - 135}" y="${y - 82}" width="270" height="82" rx="4" fill="#D66C4E"/><rect x="${x - 141}" y="${y - 90}" width="282" height="11" rx="3" fill="#B4513A"/>` +
        arches(x - 120, y - 70, 4, 18, 28, 12, '#FCEBD6') + arches(x + 29, y - 70, 4, 18, 28, 12, '#FCEBD6') + grid(x - 120, y - 30, 4, 1, 18, 18, 12, 0, '#FCEBD6') + grid(x + 29, y - 30, 4, 1, 18, 18, 12, 0, '#FCEBD6') +
        `<rect x="${x - 30}" y="${y - 178}" width="60" height="178" rx="3" fill="#E3805F"/><rect x="${x + 16}" y="${y - 178}" width="14" height="178" fill="#C8654A"/>` +
        `<path d="M${x - 38} ${y - 178}L${x} ${y - 226}L${x + 38} ${y - 178}z" fill="#9C4430"/><rect x="${x - 38}" y="${y - 182}" width="76" height="8" rx="2" fill="#B4513A"/>` +
        `<circle cx="${x}" cy="${y - 146}" r="16" fill="#FFF8EC" stroke="#9C4430" stroke-width="3"/><path d="M${x} ${y - 155}v9h7" stroke="#13233A" stroke-width="2.6" fill="none" stroke-linecap="round"/>` +
        arches(x - 11, y - 118, 1, 22, 34, 0, '#FCEBD6') + `<path d="M${x - 16} ${y}V${y - 26}a16 16 0 0 1 32 0V${y}z" fill="#6E2C1F"/><rect x="${x - 50}" y="${y - 4}" width="100" height="6" rx="2" fill="#EADCC6"/>` +
        `<path d="M${x} ${y - 226}v-26" stroke="#6E2C1F" stroke-width="3"/><path d="M${x} ${y - 252}h24l-6 7 6 7h-24z" fill="#FFD23F"/>`,
      app: (x, y) => gnd(x, y, 250) + tr(x - 120, y, .95) + bush(x + 108, y) +
        `<rect x="${x - 82}" y="${y - 104}" width="164" height="104" rx="6" fill="#F1ECFB"/><rect x="${x - 90}" y="${y - 116}" width="180" height="16" rx="6" fill="#7B5CD6"/>` +
        `<rect x="${x - 64}" y="${y - 84}" width="82" height="58" rx="6" fill="#2B2140"/><rect x="${x - 54}" y="${y - 76}" width="62" height="40" rx="3" fill="#B8A8FF"/>` +
        `<circle cx="${x - 38}" cy="${y - 62}" r="5" fill="#F24E1E"/><circle cx="${x - 26}" cy="${y - 62}" r="5" fill="#1ABCFE"/><circle cx="${x - 14}" cy="${y - 62}" r="5" fill="#0ACF83"/><rect x="${x - 44}" y="${y - 50}" width="40" height="5" rx="2.5" fill="#fff" opacity=".7"/>` +
        `<rect x="${x + 30}" y="${y - 66}" width="34" height="66" rx="5" fill="#7B5CD6"/><circle cx="${x + 56}" cy="${y - 34}" r="2.5" fill="#FFD23F"/>` +
        `<g transform="translate(${x} ${y - 150})"><circle r="16" fill="#FFE27A"/><rect x="-7" y="14" width="14" height="10" rx="3" fill="#B8A8FF"/><path d="M-26 -14l-8-6M26 -14l8-6M0 -26v-9M-30 4h-9M30 4h9" stroke="#FFC21A" stroke-width="3.4" stroke-linecap="round"/></g>` +
        `<circle cx="${x + 88}" cy="${y - 7}" r="8" fill="#fff" stroke="#D8D0EC" stroke-width="2"/><path d="M${x + 83} ${y - 9}l6 3M${x + 86} ${y - 3}l5-6" stroke="#C8BFE3" stroke-width="1.6"/>`,
      iitd: (x, y) => gnd(x, y, 360) + tr(x - 190, y, 1.05) + tr(x + 195, y, .95, '#8CC66F') + bush(x - 150, y, .9) + bush(x + 152, y, .9) +
        `<rect x="${x - 160}" y="${y - 66}" width="320" height="66" rx="4" fill="#F1EBDD"/><rect x="${x - 166}" y="${y - 74}" width="332" height="10" rx="3" fill="#CFC4AC"/>` +
        grid(x - 146, y - 56, 10, 1, 12, 34, 16, 0, '#5B7FA8', 2, true) + grid(x + 42, y - 56, 4, 1, 12, 34, 16, 0, '#5B7FA8', 2, true) +
        `<rect x="${x - 44}" y="${y - 160}" width="88" height="160" rx="4" fill="#E7DFCD"/><rect x="${x - 50}" y="${y - 168}" width="100" height="10" rx="3" fill="#CFC4AC"/>` +
        grid(x - 32, y - 146, 4, 4, 12, 18, 8, 10, '#5B7FA8', 2, true) + grid(x - 34, y - 44, 5, 1, 6, 44, 11, 0, '#D9CFB8', 2) +
        `<g transform="translate(${x} ${y - 196})"><circle r="22" fill="#2E9E6B"/><path d="M-7 8h14M-5 14h10M0 -10a10 10 0 0 0-5 18h10a10 10 0 0 0-5-18z" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>` +
        `<ellipse cx="${x}" cy="${y + 26}" rx="120" ry="12" fill="#A6D38C" opacity=".6"/>`,
      ht: (x, y) => gnd(x, y, 260) + tr(x - 125, y, .95) + bush(x + 118, y) +
        `<rect x="${x - 118}" y="${y - 74}" width="74" height="74" rx="4" fill="#F3EEE3"/>` + grid(x - 108, y - 64, 3, 3, 14, 14, 9, 8, '#9CB7D6', 2) +
        `<defs><linearGradient id="htG" x1="0" x2="1"><stop offset="0" stop-color="#3A7BC4"/><stop offset="1" stop-color="#1F4E8A"/></linearGradient></defs>` +
        `<rect x="${x - 46}" y="${y - 236}" width="92" height="236" rx="5" fill="url(#htG)"/>` + grid(x - 34, y - 222, 4, 11, 12, 12, 8, 8, '#BFD9F2', 2) +
        `<rect x="${x - 58}" y="${y - 270}" width="116" height="36" rx="8" fill="#fff"/><text x="${x}" y="${y - 244}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="22" fill="#1E4E86" letter-spacing="1">HT</text>` +
        `<rect x="${x - 16}" y="${y - 30}" width="32" height="30" rx="3" fill="#163A66"/>`,
      eazydiner: (x, y) => gnd(x, y, 300) + tr(x - 155, y) + tr(x + 158, y, .9, '#8CC66F') +
        `<rect x="${x - 115}" y="${y - 104}" width="230" height="104" rx="5" fill="#FFF4E6"/><rect x="${x - 121}" y="${y - 112}" width="242" height="13" rx="4" fill="#F4511E"/>` +
        `<rect x="${x - 98}" y="${y - 62}" width="72" height="46" rx="4" fill="#FFD9A8"/><rect x="${x + 26}" y="${y - 62}" width="72" height="46" rx="4" fill="#FFD9A8"/><rect x="${x - 17}" y="${y - 58}" width="34" height="58" rx="4" fill="#7A3A1E"/>` +
        `<g>${Array.from({ length: 11 }, (_, k) => `<rect x="${x - 110 + k * 20}" y="${y - 88}" width="20" height="16" fill="${k % 2 ? '#fff' : '#F4511E'}"/>`).join('')}<path d="M${x - 110} ${y - 72}${'q10 9 20 0'.repeat(11)}" fill="#F4511E"/></g>` +
        [[-70, '#FFB38A'], [70, '#F4511E']].map(([d, c]) => `<g transform="translate(${x + d} ${y + 34})"><rect x="-2" y="-30" width="4" height="30" fill="#6B4A2E"/><path d="M-24 -28q24 -20 48 0z" fill="${c}"/><ellipse rx="15" ry="5" fill="#D8C4A4"/></g>`).join('') +
        logoSign('logo-eazydiner', x, y - 146, 44, 22),
      mmt: (x, y) => gnd(x, y, 290) + tr(x - 140, y) + bush(x + 130, y) +
        `<defs><linearGradient id="mmtG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#D9EAFB"/><stop offset="1" stop-color="#8FB7E3"/></linearGradient></defs>` +
        `<rect x="${x - 110}" y="${y - 42}" width="220" height="42" rx="4" fill="#EEF3F9"/><rect x="${x - 26}" y="${y - 34}" width="52" height="34" rx="3" fill="#6E93BE"/>` +
        `<rect x="${x - 70}" y="${y - 206}" width="140" height="170" rx="6" fill="url(#mmtG)"/><rect x="${x + 44}" y="${y - 206}" width="26" height="170" fill="#7FA6CF" opacity=".55"/>` +
        grid(x - 58, y - 194, 5, 8, 16, 12, 6, 7, '#F4F9FF', 2) +
        logoSign('logo-mmt', x, y - 236, 48, 14),
      oyo: (x, y) => gnd(x, y, 270) + tr(x - 132, y, .95) + tr(x + 135, y, .85, '#8CC66F') +
        `<rect x="${x - 84}" y="${y - 186}" width="168" height="186" rx="6" fill="#FFFFFF"/><rect x="${x + 60}" y="${y - 186}" width="24" height="186" fill="#EFEAE3"/><rect x="${x - 90}" y="${y - 194}" width="180" height="12" rx="4" fill="#E9E2D8"/>` +
        Array.from({ length: 4 }, (_, r) => grid(x - 66, y - 174 + r * 34, 4, 1, 22, 20, 12, 0, '#F4CBC3', 3) + `<path d="M${x - 70} ${y - 150 + r * 34}h140" stroke="#DC402A" stroke-width="3" stroke-linecap="round"/>`).join('') +
        `<rect x="${x - 38}" y="${y - 44}" width="76" height="9" rx="4" fill="#DC402A"/><rect x="${x - 16}" y="${y - 35}" width="32" height="35" rx="3" fill="#8E2A1B"/>` +
        logoSign('logo-oyo', x, y - 224, 46, 14),
      lastlook: (x, y) => gnd(x, y, 230) + tr(x - 118, y, .95) + bush(x + 112, y) +
        `<rect x="${x - 50}" y="${y - 196}" width="100" height="196" rx="22" fill="#2B2118"/><rect x="${x - 42}" y="${y - 184}" width="84" height="172" rx="15" fill="#F6DCB9"/><rect x="${x - 14}" y="${y - 192}" width="28" height="7" rx="3.5" fill="#2B2118"/>` +
        `<rect x="${x - 30}" y="${y - 70}" width="60" height="9" rx="4.5" fill="#D9B98E"/><rect x="${x - 22}" y="${y - 54}" width="44" height="9" rx="4.5" fill="#E6CCA6"/>` +
        logoSign('logo-lastlook', x, y - 124, 50) +
        `<g transform="translate(${x + 78} ${y - 6})"><path d="M0 0C0 0 -24 -32 -24 -52a24 24 0 0 1 48 0c0 20 -24 52 -24 52z" fill="#9A6A3E"/><circle cy="-53" r="9" fill="#fff"/></g>`,
      creator: (x, y) => gnd(x, y, 250) + tr(x + 125, y, .9, '#8CC66F') +
        `<rect x="${x - 78}" y="${y - 98}" width="156" height="98" rx="6" fill="#FFEAF1"/><rect x="${x - 86}" y="${y - 110}" width="172" height="15" rx="6" fill="#E1306C"/>` +
        `<rect x="${x - 60}" y="${y - 80}" width="74" height="50" rx="6" fill="#2B1D26"/><path d="M${x - 29} ${y - 66}v22l18-11z" fill="#fff"/>` +
        `<rect x="${x + 28}" y="${y - 62}" width="32" height="62" rx="5" fill="#E1306C"/>` +
        `<g transform="translate(${x - 118} ${y})"><path d="M0 -58v58M-12 0l12 -16 12 16" stroke="#13233A" stroke-width="3" fill="none"/><circle cy="-80" r="22" fill="none" stroke="#FFE08A" stroke-width="7"/><circle cy="-80" r="22" fill="#FFF6CC" opacity=".35"/></g>`
    };
    let lmH = '', rtH = '';
    STOPS.forEach((st, i) => { rtH += `<circle class="ripple" id="rip${i}" cx="${st.at[0]}" cy="${st.at[1] - 60}" r="90" fill="none" stroke="${st.c}" stroke-width="6"/>`; lmH += `<g class="lm" id="lm${i}">${LM[st.id](st.at[0], st.at[1] - 40)}</g>`; });
    // start and finish flags
    h += `<g font-family="${FONT}" font-weight="800" font-size="22"><g transform="translate(${HX - 70} ${HY + 1720})"><path d="M0 0v-70" stroke="#13233A" stroke-width="4"/><path d="M0 -70h54l-10 14 10 14h-54z" fill="#FF6B4A"/><text x="8" y="-49" fill="#fff" font-size="16">2021</text></g>
      <g transform="translate(${HX + 40} ${HY + 1720})"><path d="M0 0v-70" stroke="#13233A" stroke-width="4"/><path d="M0 -70h70l-10 14 10 14h-70z" fill="#4285F4"/><text x="8" y="-49" fill="#fff" font-size="16">NOW</text></g></g>`;
    rtH += `<path id="ghostPath" d="${d}" fill="none" stroke="#4285F4" stroke-opacity=".8" stroke-width="3.5" stroke-dasharray="1 9" stroke-linecap="round" vector-effect="non-scaling-stroke"/>`;
    rtH += `<path id="casing" d="${d}" fill="none" stroke="#1A5FD0" stroke-width="15" stroke-linecap="round"/><path id="carve" d="${d}" fill="none" stroke="#4285F4" stroke-width="10" stroke-linecap="round"/>`;
    mapArt.setAttribute('viewBox', `0 0 ${MW} ${MH}`); mapArt.innerHTML = h;
    // the base map is drawn once into a bitmap (per theme), so moving the camera only slides an image and never repaints thousands of shapes
    (function bakeMap() {
      const DARK = { fill: { '#FDFCF9': '#1C1C1C', '#E3DED5': '#262626', '#CDE8C4': '#1E2B22', '#AAD3F2': '#1A2733', '#fff': '#2A2D32', '#8C9096': '#8A9099', '#6E9FCB': '#8A9099', '#8A6A1E': '#C9B27A' },
        stroke: { '#E2DDD3': '#17181A', '#DCD5C9': '#17181A', '#FFFFFF': '#333333', '#AAD3F2': '#1A2733', '#EDC458': '#5C4A1F', '#FCDE86': '#7A6328', '#FDFCF9': '#1C1C1C', '#E4B847': '#7A6328' } };
      const svgFor = dark => { let b = h.replace(/<defs><radialGradient id="hole">[\s\S]*?<\/defs>/, '');
        if (dark) { const keep = []; b = b.replace(/<mask[\s\S]*?<\/mask>/g, m => (keep.push(m), `@@M${keep.length - 1}@@`));
          b = b.replace(/(fill|stroke)="(#[0-9A-Fa-f]{3,6})"/g, (m, a, c) => { const t = DARK[a][c] || DARK[a][c.toUpperCase()]; return t ? `${a}="${t}"` : m; });
          b = b.replace(/@@M(\d+)@@/g, (m, i) => keep[+i]); }
        // decode the svg straight at the bitmap size: a full-size decode is ~75MB and can kill a phone's tab
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MW} ${MH}" width="${Math.round(MW * R)}" height="${Math.round(MH * R)}">${b}</svg>`; };
      const cache = {}; let cv = null;
      const R = Math.min(innerWidth < 860 ? .42 : .75, 4096 / MW);
      const bake = () => { const dark = document.documentElement.dataset.theme === 'dark', key = dark ? 'd' : 'l';
        const show = c => { if (cv && cv !== c) cv.remove(); cv = c; if (!c.isConnected) mapArt.after(c); mapArt.style.visibility = 'hidden'; };
        if (cache[key]) return show(cache[key]);
        const img = new Image(); img.decoding = 'async';
        img.onload = () => { const c = document.createElement('canvas'); c.className = 'mapbake'; c.width = Math.round(MW * R); c.height = Math.round(MH * R);
          const x = c.getContext('2d'); if (!x) { mapArt.style.visibility = ''; return; } x.drawImage(img, 0, 0, c.width, c.height); x.scale(R, R); URL.revokeObjectURL(img.src);
          // the edges dissolve into the page: solid in the middle, fading out towards every side
          x.globalCompositeOperation = 'destination-in'; x.save(); x.translate(MW / 2, MH / 2); x.scale(MW / 2, MH / 2);
          const g = x.createRadialGradient(0, 0, 0, 0, 0, 1); g.addColorStop(0, '#000'); g.addColorStop(.58, '#000'); g.addColorStop(.8, 'rgba(0,0,0,.55)'); g.addColorStop(.97, 'rgba(0,0,0,0)');
          x.fillStyle = g; x.fillRect(-1, -1, 2, 2); x.restore(); x.globalCompositeOperation = 'source-over';
          // hand the pixels to a plain image and free the canvas: the browser can drop and re-decode an image under memory pressure, a canvas it can't
          c.toBlob(b => { const out = new Image(); out.className = 'mapbake'; out.alt = ''; out.decoding = 'async';
            const done = () => { c.width = c.height = 0; if (innerWidth < 860) for (const k in cache) if (k !== key) { URL.revokeObjectURL(cache[k].src); delete cache[k]; }
              cache[key] = out; if ((document.documentElement.dataset.theme === 'dark') === dark) show(out); };
            if (!b) { cache[key] = c; if ((document.documentElement.dataset.theme === 'dark') === dark) show(c); return; }
            out.onload = done; out.onerror = () => { mapArt.style.visibility = ''; }; out.src = URL.createObjectURL(b); }, 'image/webp', .9); };
        img.onerror = () => { mapArt.style.visibility = ''; };
        img.src = URL.createObjectURL(new Blob([svgFor(dark)], { type: 'image/svg+xml' }));
      };
      let baked = false; const bakeLater = () => { baked = true; (window.requestIdleCallback || (f => setTimeout(f, 60)))(bake, { timeout: 1500 }); };
      setTimeout(bakeLater, 4200); addEventListener('themechange', () => { if (baked) bake(); });
    })();
    const layer = (id, html, z) => { const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); el.id = id; el.setAttribute('class', 'maplayer'); el.setAttribute('viewBox', `0 0 ${MW} ${MH}`); el.setAttribute('aria-hidden', 'true'); if (z) el.style.zIndex = z; el.innerHTML = html; world3.insertBefore(el, meTip); return el; };
    layer('routeArt', rtH);
    layer('lmArt', lmH);
    const sp = document.createElement('div'); sp.className = 'spot2'; sp.id = 'spot'; $('#jPin').insertBefore(sp, $('#jFade'));
    world3.style.width = MW + 'px'; world3.style.height = MH + 'px';
    spot = $('#spot'); carve = $('#carve'); casing = $('#casing'); ghost = $('#ghostPath');
    pathLen = carve.getTotalLength();
    [carve, casing].forEach(p => { p.style.strokeDasharray = pathLen; p.style.strokeDashoffset = pathLen; });
    { const STEP = 16, pts = []; for (let l = 0; l <= pathLen; l += STEP) pts.push(carve.getPointAtLength(l));   // the route is sampled once and shared by every stop
      stopL = STOPS.map(st => { let bi = 0, bd = 1e12; pts.forEach((q, i) => { const dd = (q.x - st.at[0]) ** 2 + (q.y - st.at[1]) ** 2; if (dd < bd) { bd = dd; bi = i; } });
        let best = bi * STEP; bd = 1e12; for (let l = Math.max(0, best - STEP); l <= Math.min(pathLen, best + STEP); l += 2) { const q = carve.getPointAtLength(l), dd = (q.x - st.at[0]) ** 2 + (q.y - st.at[1]) ** 2; if (dd < bd) { bd = dd; best = l; } } return best; }); }
    const pinShape = c => `<svg viewBox="0 0 54 66"><path d="M27 64C27 64 4 40 4 25a23 23 0 0 1 46 0c0 15-23 39-23 39z" fill="${c}" stroke="#fff" stroke-width="3"/></svg>`;
    STOPS.forEach((st, i) => {
      const m = document.createElement('button'); m.className = 'mk'; m.type = 'button'; m.style.setProperty('--c', st.c); m.style.left = st.at[0] + 'px'; m.style.top = st.at[1] + 'px';
      m.setAttribute('aria-label', `Go to ${st.when}: ${st.name}`);
      m.innerHTML = `<span class="halo"></span><span class="dot"></span><span class="pinhead">${pinShape(st.c)}${st.logo ? `<img class="lg" src="${img(st.logo)}" alt="">` : `<span class="ic"><svg viewBox="0 0 24 24">${ICONS[st.icon]}</svg></span>`}</span><span class="nm">${st.name}</span>`;
      m.addEventListener('click', () => { if (!dragMoved) walkTo(i); }); world3.insertBefore(m, meTip); jmarks.push(m);
      st.pois.forEach(([x, y, ic, tip, url, col]) => {
        const p = document.createElement(url ? 'a' : 'button'); p.className = 'poi' + (url ? ' link' : ''); p.style.setProperty('--c', col || st.c); p.style.left = (st.at[0] + x) + 'px'; p.style.top = (st.at[1] + y) + 'px'; p.dataset.stop = i;
        if (url) { p.href = url; p.target = '_blank'; p.rel = 'noopener'; p.innerHTML = `<svg viewBox="0 0 24 24">${ICONS[ic]}</svg>${tip} ↗`; }
        else { p.type = 'button'; p.setAttribute('aria-label', tip); p.innerHTML = `<svg viewBox="0 0 24 24">${ICONS[ic]}</svg><span class="tip">${tip}</span>`;
          p.addEventListener('click', e => { e.stopPropagation(); if (dragMoved) return; const on = !p.classList.contains('tipon'); pois.forEach(q => q.classList.remove('tipon')); p.classList.toggle('tipon', on); }); }
        world3.insertBefore(p, meTip); pois.push(p); });
    });
  })();
  const lms = STOPS.map((_, i) => $('#lm' + i)), rips = STOPS.map((_, i) => $('#rip' + i)), found = STOPS.map(() => false);
  // timeline
  const jtlDots = $('#jtlDots'), jtlYr = $('#jtlYr');
  const tlBtns = STOPS.map((st, i) => { const li = document.createElement('li'); const b = document.createElement('button'); b.type = 'button'; b.style.setProperty('--c', st.c); b.setAttribute('aria-label', `${st.when}, ${st.name}`); b.title = `${st.when} · ${st.name}`; b.addEventListener('click', () => walkTo(i)); li.appendChild(b); jtlDots.appendChild(li); return b; });
  // polaroids
  const photoHTML = (st, [src, cap]) => src ? `<img src="${img(src)}" alt="${cap}" loading="lazy">` : `<svg viewBox="0 0 24 24">${ICONS.camera}</svg>`;
  function showPols(i) {
    if (polFor === i) return; polFor = i;
    polsEl.classList.remove('in');
    clearTimeout(showPols.t);
    if (i < 0) { showPols.t = setTimeout(() => polsEl.innerHTML = '', 400); return; }
    const st = STOPS[i], left = false;
    showPols.t = setTimeout(() => {
      polsEl.style.left = st.at[0] + 'px'; polsEl.style.top = (st.at[1] - st.lift + 20) + 'px';
      const spots = left ? [[-470, -20, 6], [-330, 30, -8], [-190, -30, 4], [-60, 40, -5]] : mobile ? [[-190, 10, -8], [-150, 50, 4], [-110, 0, 9], [-70, 40, -5]] : [[235, 20, -7], [360, -40, 4], [485, 30, 9], [610, -30, -5]];
      if (left && st.photos.length < 4) spots.shift();
      polsEl.innerHTML = st.photos.map((ph, k) => `<button class="pol" type="button" style="--k:${k};--x:${spots[k][0]}px;--y:${spots[k][1]}px;--r:${spots[k][2]}deg;--g:${grad(st.c)}" data-i="${k}" aria-label="Open photo: ${ph[1]}"><span class="ph${ph[0] ? '' : ' empty'}">${photoHTML(st, ph)}</span><span>${ph[1]}</span></button>`).join('');
      requestAnimationFrame(() => requestAnimationFrame(() => polsEl.classList.add('in')));
    }, 280);
  }
  polsEl.addEventListener('click', e => { const b = e.target.closest('.pol'); if (b && polFor >= 0) openLB(polFor, +b.dataset.i); });
  // photo viewer
  const lb = $('#lb'), lbTrack = $('#lbTrack'), lbCount = $('#lbCount');
  let lbN = 0;
  function openLB(i, start, alt) {
    const st = alt || STOPS[i]; lbN = st.photos.length;
    lb.style.setProperty('--g', grad(st.c));
    $('#lbWhen').textContent = `${st.when} · ${st.place}`; $('#lbTitle').textContent = st.title;
    lbTrack.innerHTML = st.photos.map(([src, cap], n) => `<figure class="lb-slide" style="margin:0"><div class="frame" style="--rot:${[-1.6, 1.2, -.8][n % 3]}deg">${src ? `<img src="${img(src)}" alt="${cap}">` : `<div class="empty"><svg viewBox="0 0 24 24">${ICONS.camera}</svg>Photo coming soon</div>`}<figcaption>${cap}</figcaption></div></figure>`).join('');
    lb.classList.add('open'); lenis && lenis.stop(); document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => { lbTrack.scrollLeft = start * lbTrack.clientWidth; lbCount.textContent = `${start + 1} / ${lbN}`; $('#lbX').focus({ preventScroll: true }); });
  }
  function closeLB() { if (!lb.classList.contains('open')) return; lb.classList.remove('open'); document.documentElement.style.overflow = ''; lenis && lenis.start(); }
  const lbGo = d => lbTrack.scrollBy({ left: d * lbTrack.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
  lbTrack.addEventListener('scroll', () => { lbCount.textContent = `${Math.round(lbTrack.scrollLeft / Math.max(1, lbTrack.clientWidth)) + 1} / ${lbN}`; }, { passive: true });
  $('#lbPrev').addEventListener('click', () => lbGo(-1)); $('#lbNext').addEventListener('click', () => lbGo(1)); $('#lbX').addEventListener('click', closeLB);
  lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb-slide') || e.target === lbTrack) closeLB(); });
  addEventListener('keydown', e => { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') closeLB(); if (e.key === 'ArrowRight') lbGo(1); if (e.key === 'ArrowLeft') lbGo(-1); });
  // the card
  const CASE_OF = { [CS + 'eazydiner']: 'coupon', [CS + 'requests']: 'requests', traum: 'traum' };
  function cardHTML(i) {
    const st = STOPS[i];
    const tile = st.logo ? `<span class="tile"><img src="${img(st.logo)}" alt="${st.name} logo"></span>` : `<span class="tile"><svg viewBox="0 0 24 24">${ICONS[st.icon]}</svg></span>`;
    return `<div class="portfolio-top">${tile}<p><b>${st.name}</b>${st.when} · ${st.place}</p><em>${String(i + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')}</em></div>
      <div class="portfolio-bd"><h3>${st.title}</h3><p class="txt">${st.txt}</p><button type="button" class="portfolio-more" aria-expanded="false">Read more</button>
      ${st.share ? `<div class="portfolio-share"><a href="${IG}" target="_blank" rel="noopener"><i style="background:linear-gradient(45deg,#F58529,#DD2A7B,#8134AF)"><svg viewBox="0 0 24 24">${ICONS.ig}</svg></i><div>@alexmakes<span>Design, building and career on Instagram</span></div><em>↗</em></a><a href="${LI}" target="_blank" rel="noopener"><i style="background:#0A66C2"><svg viewBox="0 0 24 24">${ICONS.in}</svg></i><div>Alex Morgan<span>Work and lessons on LinkedIn</span></div><em>↗</em></a></div>` : ''}
      ${st.stats ? `<ul class="portfolio-stats">${st.stats.map(([b, t]) => `<li><b>${b}</b><span>${t}</span></li>`).join('')}</ul>` : ''}
      ${st.photos && st.photos.length ? `<div class="portfolio-gal"><p>Gallery</p><div style="--n:${st.photos.length}">${st.photos.map(([src, cap], k) => `<button type="button" class="portfolio-ph" data-lb="${k}" aria-label="Open photo: ${cap}" style="--r:${[-3, 2, -1.5][k % 3]}deg"><span class="ph${src ? '' : ' empty'}">${src ? `<img src="${img(src)}" alt="" loading="lazy">` : `<svg viewBox="0 0 24 24">${ICONS.camera}</svg>`}</span><small>${cap}</small></button>`).join('')}</div></div>` : ''}
      ${st.work ? `<div class="portfolio-act">${CASE_OF[st.work] ? `<button type="button" class="cbtn" data-case="${CASE_OF[st.work]}">View case study<svg viewBox="0 0 24 24">${ICONS.arrowR}</svg></button>` : `<a class="cbtn" href="${st.work}" target="_blank" rel="noopener">View work<svg viewBox="0 0 24 24">${ICONS.arrowR}</svg></a>`}</div>` : ''}</div>`;
  }
  function showCard(i) {
    if (lastCard === i) return; const first = lastCard < 0; lastCard = i;
    jcard.classList.toggle('in', i >= 0);
    if (i < 0) return;
    jcard.style.setProperty('--c', STOPS[i].c);
    if (jCar) { clearTimeout(showCard.t); jcIn.innerHTML = cardHTML(i); jcard.scrollTop = 0; jcard.classList.remove('open', 'swap'); return; }
    jcard.classList.add('swap'); clearTimeout(showCard.t);
    showCard.t = setTimeout(() => { jcIn.innerHTML = cardHTML(i); jcard.scrollTop = 0; jcard.classList.remove('swap'); }, first ? 0 : 260);
  }
  jcard.addEventListener('click', e => { const oc = e.target.closest('[data-case]'); if (oc) { openCaseAt(oc.dataset.case, oc); return; } const mo = e.target.closest('.portfolio-more'); if (mo) { const o = jcard.classList.toggle('open'); mo.setAttribute('aria-expanded', o); mo.textContent = o ? 'Show less' : 'Read more'; if (!o) jcard.scrollTop = 0; return; } const s = e.target.closest('[data-step]'); if (s) walkTo(+s.dataset.step); const p = e.target.closest('[data-photos]'); if (p) openLB(+p.dataset.photos, 0); const g = e.target.closest('[data-lb]'); if (g && lastCard >= 0) openLB(lastCard, +g.dataset.lb); });
  // map controls
  let uz = 1, pan = { x: 0, y: 0 }, dragMoved = false, drag = null, lastActive = -2;
  $('#mapIn').addEventListener('click', () => uz = clamp(uz * 1.3, .55, 2.4));
  $('#mapOut').addEventListener('click', () => uz = clamp(uz / 1.3, .55, 2.4));
  $('#mapRe').addEventListener('click', () => { uz = 1; pan.x = 0; pan.y = 0; });
  mapview.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.target.closest('.poi, .mk, .pol')) return; drag = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y }; dragMoved = false; mapview.classList.add('drag'); });
  addEventListener('pointermove', e => { if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; if (Math.abs(dx) + Math.abs(dy) > 4) dragMoved = true; pan.x = drag.px + dx; pan.y = drag.py + dy; });
  addEventListener('pointerup', () => { if (drag) { drag = null; mapview.classList.remove('drag'); setTimeout(() => dragMoved = false, 0); } });
  mapview.addEventListener('click', e => { if (!e.target.closest('.poi')) pois.forEach(q => q.classList.remove('tipon')); });
  function layoutJourney() { jCar = vw <= 1100; journey.classList.toggle('jcm', jCar); $('.j-how').textContent = jCar ? 'Tap through them, or swipe the map.' : 'Scroll to walk the path.'; jTrack.style.height = jCar ? '' : DONE.j ? '100vh' : (N * 84 + 200) + 'vh'; jTop = top(jTrack); jRange = Math.max(1, jTrack.offsetHeight - vh); headB = jHead.offsetTop + jHead.offsetHeight; jFade.style.setProperty('--hb', headB + 'px'); }
  const PH = { hold: .012, zoom: .115, walk: .91 };
  function phase(p) {
    if (p < PH.hold) return { pos: -1, k: 0, out: 0 };
    if (p < PH.zoom) { const k = ss((p - PH.hold) / (PH.zoom - PH.hold)); return { pos: -1 + k, k, out: 0 }; }
    if (p < PH.walk) { const t = (p - PH.zoom) / (PH.walk - PH.zoom) * (N - 1), i = Math.min(N - 2, Math.floor(t)), f = t - i; return { pos: i + f - .55 * Math.sin(2 * Math.PI * f) / (2 * Math.PI), k: 1, out: 0 }; }
    return { pos: N - 1, k: 1, out: ss(clamp((p - PH.walk) / .07)) };
  }
  const lenAt = pos => { if (pos <= 0) return pos < -.999 ? 0 : stopL[0] * (1 + pos); const i = Math.min(N - 2, Math.floor(pos)), f = pos - i; return stopL[i] + (stopL[i + 1] - stopL[i]) * f; };
  const cam3 = { x: 0, y: 0, s: 0, ok: false };
  const cardW = () => mobile ? 0 : Math.min(26 * 16, vw - 32) + 44;
  function viewFor(cx, cy, s) { const L = cardW(), fx = mobile ? vw * .5 : L + (vw - L) * .36, fy = mobile ? vh * .33 : vh * .58; return { x: fx - cx * s, y: fy - cy * s, s }; }
  let headB = 240;
  function overview() { const t = headB + 10, b = mobile ? 70 : 90, s = Math.min((vw - 48) / MW, (vh - t - b) / MH) * (mobile ? 1.12 : 1); return { x: (vw - MW * s) / 2, y: t + (vh - t - b - MH * s) / 2, s }; }
  const tg = (el, c, on) => { on = !!on; if (el.classList.contains(c) !== on) el.classList.toggle(c, on); };   // touch the class list only when something changes
  // with the pointer over a stop's card, the wheel scrolls the card while it still has text to show; at its top or bottom the map takes over again
  { const jc = $('#jcard');
    jc.addEventListener('wheel', e => { const can = jc.scrollHeight > jc.clientHeight + 2 && (e.deltaY > 0 ? jc.scrollTop + jc.clientHeight < jc.scrollHeight - 1 : jc.scrollTop > 0);
      if (can) jc.setAttribute('data-lenis-prevent', ''); else jc.removeAttribute('data-lenis-prevent'); jc.style.overscrollBehavior = can ? 'contain' : 'auto'; }, { passive: true, capture: true }); }
  function frameJourney(dt, y) {
    if (jCar) { const ke = reduce ? 1 : 1 - Math.exp(-dt * (jdrag ? 22 : 4.6)); jpos += (jposT - jpos) * ke; if (Math.abs(jposT - jpos) < .0005) jpos = jposT; }
    const p = jCar ? (jpos <= -.999 ? 0 : .5) : clamp((y - jTop) / jRange), ph = jCar ? (jpos < 0 ? { pos: jpos, k: ss(jpos + 1), out: 0 } : { pos: jpos, k: 1, out: 0 }) : phase(p);
    const L = lenAt(Math.max(ph.pos, 0)), tip = carve.getPointAtLength(Math.max(0.01, L));
    const O = overview(), Z = (mobile ? .5 : jCar ? .52 : clamp(vw / 3000, .44, .6)) * uz;
    const dip = 0;
    const F = viewFor(tip.x, tip.y, Z * (1 - dip));
    const k = ph.out ? 1 - ph.out : ph.k;
    const hk = ss(clamp(k * 1.6));
    jHead.style.opacity = (1 - hk).toFixed(3); jHead.style.transform = `translate3d(0, ${(-hk * 40).toFixed(1)}px, 0)`; jFade.style.opacity = (1 - ss(k)).toFixed(3);
    tg(world3, 'far', k < .5); tg(journey, 'jfar', k < .5); tg(journey, 'jstart', ph.pos <= -.995 && !ph.out);
    const T = { x: O.x + (F.x - O.x) * k + pan.x, y: O.y + (F.y - O.y) * k + pan.y, s: O.s + (F.s - O.s) * k };
    if (!cam3.ok) Object.assign(cam3, T, { ok: true });
    const e = reduce ? 1 : 1 - Math.exp(-dt * 6);
    cam3.x += (T.x - cam3.x) * e; cam3.y += (T.y - cam3.y) * e; cam3.s += (T.s - cam3.s) * e;
    world3.style.transform = `translate3d(${cam3.x.toFixed(1)}px, ${cam3.y.toFixed(1)}px, 0) scale(${cam3.s.toFixed(4)})`;
    const inv = Math.round(clamp(1 / cam3.s, .55, 3) * 20) / 20; if (inv !== frameJourney.inv) { frameJourney.inv = inv; world3.style.setProperty('--inv', inv.toFixed(3)); }
    // phones: the route jumps straight to the next stop instead of repainting on every frame of the glide
    const carved = jCar && mobile ? (jposT < 0 ? 0 : lenAt(jposT)) : ph.pos < 0 ? stopL[0] * clamp(ph.pos + 1) : L;
    const q = mobile ? 14 : 4, off = (Math.round((pathLen - carved) / q) * q).toFixed(0);
    if (off !== frameJourney.off) { frameJourney.off = off; carve.style.strokeDashoffset = off; casing.style.strokeDashoffset = off; }
    const go = (1 - ph.k * .8 + ph.out * .8).toFixed(2); if (go !== frameJourney.go) { frameJourney.go = go; ghost.style.opacity = go; }
    const settled = ph.k > .95 && !ph.out && Math.abs(ph.pos - Math.round(ph.pos)) < .06;
    const active = ph.pos < -.35 || ph.out > .3 ? -1 : Math.round(ph.pos);
    if (active !== lastActive) { lastActive = active; pan.x = 0; pan.y = 0; pois.forEach(q => q.classList.remove('tipon')); }
    lms.forEach((g, i) => { const reached = ph.pos >= i - .08 && ph.k > .5 && ph.out < .3; tg(g, 'seen', reached); tg(g, 'all', ph.k < .5 || ph.out > .3);
      tg(g, 'act', i === Math.round(ph.pos) && ph.k > .9 && ph.out < .3);
      if (reached && !found[i]) { found[i] = true; rips[i].classList.remove('go'); void rips[i].getBBox(); rips[i].classList.add('go'); } if (!reached && ph.pos < i - .5) found[i] = false; });
    jmarks.forEach((m, i) => { const seen = ph.k < .5 || ph.out > .3 || ph.pos >= i - .08; tg(m, 'seen', seen); tg(m, 'on', i === active); tg(m, 'dim', ph.k > .5 && !ph.out && ph.pos < i - .08); });
    pois.forEach(q => { tg(q, 'seen', ph.pos >= +q.dataset.stop - .08 && ph.k > .9 && !ph.out); tg(q, 'here', +q.dataset.stop === active); });
    tg(world3, 'focus', active >= 0);
    if (active >= 0) { const a = STOPS[active].at, e2 = reduce ? 1 : clamp(dt * 3.5); spotC.x += (a[0] + 190 - spotC.x) * e2; spotC.y += (a[1] - 120 - spotC.y) * e2; }
    if (active >= 0) { const sx = (cam3.x + spotC.x * cam3.s).toFixed(0), sy = (cam3.y + spotC.y * cam3.s).toFixed(0), sr = (900 * cam3.s).toFixed(0), key = sx + ',' + sy + ',' + sr; if (key !== frameJourney.sp) { frameJourney.sp = key; spot.style.setProperty('--sx', sx + 'px'); spot.style.setProperty('--sy', sy + 'px'); spot.style.setProperty('--sr', sr + 'px'); } }
    tg(spot, 'on', active >= 0 && ph.k > .9);
    showPols(-1);
    meTip.style.opacity = ph.pos > -.5 && ph.out < .5 ? 1 : 0;
    { const mt = `translate3d(${tip.x.toFixed(1)}px, ${tip.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(var(--inv, 1))`; if (mt !== frameJourney.mt) { frameJourney.mt = mt; meTip.style.transform = mt; } }
    const ahead = carve.getPointAtLength(Math.min(pathLen, L + 40)), want = ph.pos < 0 || ph.out ? 0 : Math.atan2(ahead.x - tip.x, -(ahead.y - tip.y)) * 180 / Math.PI;
    let dh = ((want - heading + 540) % 360) - 180; heading += dh * (reduce ? 1 : clamp(dt * 4));
    needle.style.transform = `rotate(${heading.toFixed(1)}deg)`; meTip.style.setProperty('--hd', heading.toFixed(1) + 'deg');
    tg(compass, 'in', p > .005 && p < .999);
    tlBtns.forEach((b, i) => { tg(b, 'on', i === active); tg(b, 'done', ph.pos >= i - .08 && ph.k > .5); });
    { const yt = active >= 0 ? `${STOPS[active].when} · ${STOPS[active].place}` : '2021 → now'; if (yt !== frameJourney.yt) { frameJourney.yt = yt; jtlYr.textContent = yt; } }   // a text write every frame would re-layout the whole page every frame
    showCard(active);
    if (jCar) { const f = ph.pos < 0 ? 0 : ph.pos - Math.round(ph.pos), dx = (-f * 150).toFixed(1), da = Math.max(0, 1 - Math.abs(f) * 2.1).toFixed(3);
      if (dx !== frameJourney.dx || da !== frameJourney.da) { frameJourney.dx = dx; frameJourney.da = da; jcIn.style.transform = `translate3d(${dx}px, 0, 0)`; jcIn.style.opacity = da; } }
    tg(journey, 'over', !jCar && ph.out > .6);
  }
  const stopP = i => i < 0 ? 0 : PH.zoom + Math.min(N - 1.001, i + .1) / (N - 1) * (PH.walk - PH.zoom);
  function carTo(i) {
    if (jIdx < 0 && i >= 0 && Math.abs(Y() - jTop) > 20) goTo(jTop, 1);
    jIdx = clamp(i, -1, N - 1); jposT = jIdx;
    $('#jcPrev').disabled = jIdx < 0; $('#jcCount').textContent = jIdx < 0 ? '' : `${jIdx + 1} / ${N}`;
    $('#jcNext').innerHTML = jIdx < 0 ? 'Start the journey <span aria-hidden="true">→</span>' : jIdx === N - 1 ? 'See my work <span aria-hidden="true">↓</span>' : 'Next stop <span aria-hidden="true">→</span>';
    journey.classList.toggle('started', jIdx >= 0);
  }
  $('#jtlView').addEventListener('click', () => { if (jCar) { carTo(0); goTo(jTop); } else walkTo(0); });
  $('#jcPrev').addEventListener('click', () => carTo(jIdx - 1));
  $('#jcNext').addEventListener('click', () => { if (jIdx === N - 1) goTo(top($('#work'))); else carTo(jIdx + 1); });
  // swipe between stops: the map and card follow the finger, then glide to the next stop or spring back
  let sw = null, swEat = false;
  const jPinEl = $('#jPin');
  jPinEl.addEventListener('pointerdown', e => { if (!jCar || e.pointerType === 'mouse' || e.target.closest('.jcar, .mapctl, a, .jtl')) return; sw = { x: e.clientX, y: e.clientY, t: performance.now(), ax: null, base: jIdx, vx: 0, lx: e.clientX, lt: performance.now() }; });
  jPinEl.addEventListener('pointermove', e => { if (!sw) return; const dx = e.clientX - sw.x, dy = e.clientY - sw.y;
    if (!sw.ax) { if (Math.hypot(dx, dy) < 8) return; sw.ax = Math.abs(dx) > Math.abs(dy) * 1.15 ? 'x' : 'y'; if (sw.ax === 'x') { jdrag = true; try { jPinEl.setPointerCapture(e.pointerId); } catch (_) {} } }
    if (sw.ax !== 'x') return;
    const now = performance.now(); sw.vx = sw.vx * .6 + ((e.clientX - sw.lx) / Math.max(1, now - sw.lt)) * .4; sw.lx = e.clientX; sw.lt = now;
    let t = sw.base - dx / Math.min(vw * .75, 520); const lo = Math.max(-1, sw.base - 1), hi = Math.min(N - 1, sw.base + 1);
    if (t < lo) t = lo - (lo - t) * .25; if (t > hi) t = hi + (t - hi) * .25; jposT = t; });
  const swEnd = e => { if (!sw) return; const s0 = sw; sw = null; if (s0.ax !== 'x') return; jdrag = false; swEat = true; setTimeout(() => swEat = false, 50);
    const dx = e.clientX - s0.x, far = Math.abs(dx) > Math.min(vw * .16, 90), fast = Math.abs(s0.vx) > .35;
    const go = (far || fast) ? (dx < 0 ? 1 : -1) : 0, to = clamp(s0.base + go, -1, N - 1);
    if (to === -1 && s0.base === 0) carTo(0); else carTo(to); };
  jPinEl.addEventListener('pointerup', swEnd); jPinEl.addEventListener('pointercancel', swEnd);
  jPinEl.addEventListener('click', e => { if (swEat) { e.stopPropagation(); e.preventDefault(); } }, true);
  function reopenJourney() {
    if (!DONE.j) return; DONE.j = 0; delete HW.j;
    const y = Y(); layout(); if (Y() !== y) { lenis ? lenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y); }
  }
  function walkTo(i) {
    reopenJourney();
    if (jCar) { carTo(i); if (Math.abs(Y() - jTop) > vh * .5) goTo(jTop); return; }
    i = clamp(i, 0, N - 1);
    const t = Math.min(N - 1.001, i + .1), p = PH.zoom + t / (N - 1) * (PH.walk - PH.zoom);
    goTo(jTop + (i === 0 ? PH.zoom + .01 : p) * jRange, 2.2);
  }

  /* =========================================================
     4 · WORK (the box)
     ========================================================= */
  const box3 = $('#box3'), boxFit = $('#boxFit'), boxStage = $('#boxStage'), boxTrack = $('#boxTrack'), boxCap = $('#boxCap'), csEl = $('#cs');
  const BW = 660, BD = 260, BH = 96, CW = 224, CH = 304, VIEW_Z = 30, VIEW_X = 57;
  const face = (cls, w, h, x, y, z, rot, html = '') => { const el = document.createElement('div'); el.className = 'f ' + cls; el.style.width = w + 'px'; el.style.height = h + 'px';
    el.style.left = (x - w / 2) + 'px'; el.style.top = (y - h) + 'px'; el.style.transform = `translate3d(0,0,${z}px) ${rot}`; el.innerHTML = html; box3.appendChild(el); return el; };
  face('wall-i', BW, BH, BW / 2, 0, 0, 'rotateX(-90deg)');
  face('wall-i', BD, BH, 0, BD / 2, 0, 'rotateZ(90deg) rotateX(-90deg)');
  const lid = face('box-lid', BW, BD, BW / 2, 0, BH, 'rotateX(-180deg)');
  const SUNK = -(CH - BH + 40);
  // the back of a card, shown on hover: the numbers it moved, or for unshipped work what changed and the targets
  const wkBack = w => { const res = (w.res || []).slice(0, 2);
    if (!res.length && !w.wins) return '';
    const body = res.length ? `<ul class="wb-n">${res.map(([b, t]) => `<li><b>${b}</b><span>${t}</span></li>`).join('')}</ul>`
      : `<ul class="wb-l">${w.wins.map(t => `<li><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>${t}</li>`).join('')}</ul><div class="wb-g">${w.goals.map(([b, t]) => `<span><b>${b}</b>${t}</span>`).join('')}</div><small class="wb-t">Targets, launching soon</small>`;
    return `<div class="wk-bk" aria-hidden="true"><p class="wb-k">${res.length ? 'The numbers' : 'What changed'}</p>${body}<span class="wb-go">Open case study →</span></div>`; };
  const wks = WORK.map((w, i) => {
    const x = 108 + i * ((BW - 216) / (WORK.length - 1));
    const el = document.createElement('button'); el.className = 'wk' + (w.cls ? ' ' + w.cls : ''); el.type = 'button';
    el.style.setProperty('--bg', w.bg); el.style.setProperty('--glow', w.glow); el.style.setProperty('--c', w.c);
    el.style.left = (x - CW / 2) + 'px'; el.style.top = (BD / 2 - CH) + 'px';
    el.setAttribute('aria-label', `${w.name}, open case study`);
    const [kind, main, sub] = w.face;
    el.innerHTML = `<div class="wk-top">${w.logo ? `<img class="wk-logo" src="${img(w.logo)}" alt="">` : `<span class="wk-ic"><svg viewBox="0 0 24 24">${ICONS[w.icon]}</svg></span>`}<span class="wk-tag">${String(i + 1).padStart(2, '0')}</span></div>
      <div><p class="wk-hand" style="margin:0 0 8px">${w.name}</p><div class="wk-${kind}">${main}</div><p class="wk-sub" style="margin-bottom:0">${sub}</p></div>${wkBack(w)}`;
    box3.appendChild(el);
    return { el, w, i, x, z: SUNK };
  });
  face('wall-o', BD, BH, BW, BD / 2, 0, 'rotateZ(-90deg) rotateX(-90deg)');
  face('wall-o', BW, BH, BW / 2, BD, 0, 'rotateX(-90deg)', '<span class="brand">Things I designed</span>');
  const stand = z => `translate3d(0px, 0px, ${z}px) rotateZ(-90deg) rotateX(-90deg) rotateY(0deg)`;
  const faced = k => `translate3d(${(BW / 2 - k.x).toFixed(1)}px, ${BD * .95}px, 210px) rotateZ(${-VIEW_Z}deg) rotateX(${-VIEW_X}deg) rotateY(0deg)`;
  // a card sunk into the box is clipped at the box floor, so nothing ever pokes out underneath
  const rim = (k, z) => { k.el.style.clipPath = z < 0 ? `inset(${z <= SUNK ? 0 : -90}px -90px ${-z}px -90px)` : (k.el.style.clipPath ? 'inset(-90px -90px 0px -90px)' : ''); };
  wks.forEach(k => { k.el.style.transform = stand(k.z); rim(k, k.z); });
  let boxOpen = false, picked = null, hoverK = null, boxS = 1;
  const BOX_TOP = [['+41%', 'payment success, Tablely'], ['16 → 35%', 'hotels replying, Wayfinder'], ['400+', 'PocketCheck downloads']];
  const boxInfo = document.createElement('div'); boxInfo.className = 'box-info'; boxStage.appendChild(boxInfo);
  boxInfo.innerHTML = `<ol class="bi-list">${WORK.map((w, i) => `<li><button type="button" data-k="${i}" style="--c:${w.c}"><b>${String(i + 1).padStart(2, '0')}</b><em>${w.name}</em><span>${w.co}</span></button></li>`).join('')}</ol>`;
  { const sh = $('#work .sec-head'); sh.classList.add('bi-head'); boxInfo.prepend(sh); }
  boxInfo.addEventListener('pointerover', e => { const b = e.target.closest('[data-k]'); if (!b || picked || !boxOpen) return; const k = wks[+b.dataset.k]; if (hoverK !== k) { hoverK && hoverK.leave(); k.enter(); } });
  boxInfo.addEventListener('click', e => { const b = e.target.closest('[data-k]'); if (b) pick(wks[+b.dataset.k]); });
  function setCap(k) {
    boxInfo.style.setProperty('--c', k ? k.w.c : 'var(--coral)');
    $$('[data-k]', boxInfo).forEach(b => b.classList.toggle('on', k && +b.dataset.k === k.i));
  }

  function openBox() {
    if (boxOpen) return; boxOpen = true; boxStage.classList.add('opened');
    lid.style.transform = `translate3d(0,0,${BH}px) rotateX(-72deg)`;
    wks.forEach((k, i) => setTimeout(() => { if (picked !== k) { k.z = 0; k.el.style.transition = 'transform 1.2s cubic-bezier(.2, .9, .25, 1), clip-path 1.2s cubic-bezier(.2, .9, .25, 1), box-shadow .5s, filter .5s'; k.el.style.transform = stand(0); rim(k, 0); setTimeout(() => { if (k.z === 0) k.el.style.clipPath = ''; }, 1300); } }, 800 + i * 130));
  }
  wks.forEach(k => {
    const enter = () => { if (picked || !boxOpen) return; hoverK = k; k.el.classList.add('hover'); k.el.style.transform = stand(70); rim(k, 70); setCap(k); };
    const leave = () => { if (picked) return; k.el.classList.remove('hover'); k.el.style.transform = stand(k.z); rim(k, k.z); if (hoverK === k) { hoverK = null; setCap(null); } };
    k.enter = enter; k.leave = leave;
    k.el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse' && hoverK !== k) { hoverK && hoverK.leave(); enter(); } });
    k.el.addEventListener('focus', enter); k.el.addEventListener('blur', leave);
    k.el.addEventListener('click', () => pick(k));
  });
  // hover stays on a card until the pointer reaches another card or leaves the box, so a lifted card never flickers
  boxStage.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse' || !hoverK || picked) return; if (!e.target.closest('#box3, .box-info')) hoverK.leave(); });
  boxStage.addEventListener('pointerleave', () => { if (hoverK && !picked) hoverK.leave(); });
  // the box is measured once (lid open, cards lifted), then centred and scaled into the gap between the heading and the project list
  let boxExt = null, boxSW = 0, boxCur = 0, boxPos = '';
  function boxMeasure() {
    const parts = [...box3.children].filter(e => !e.classList.contains('box-shadow')), saved = parts.map(e => [e.style.transition, e.style.transform]);
    const fitT = boxFit.style.transform, b3T = box3.style.transform; boxFit.style.transform = 'none'; box3.style.transform = '';
    parts.forEach(e => { e.style.transition = 'none'; if (e === lid) e.style.transform = `translate3d(0,0,${BH}px) rotateX(-72deg)`; else if (e.classList.contains('wk')) e.style.transform = stand(70); });
    const o = boxFit.getBoundingClientRect(); let l = 1e9, t = 1e9, r = -1e9, b = -1e9;
    parts.forEach(e => { const q = e.getBoundingClientRect(); l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); b = Math.max(b, q.bottom); });
    parts.forEach((e, i) => { e.style.transform = saved[i][1]; });
    void box3.offsetWidth; parts.forEach((e, i) => { e.style.transition = saved[i][0]; });
    boxFit.style.transform = fitT; box3.style.transform = b3T;
    boxExt = { l: l - o.left, t: t - o.top, w: r - l, h: b - t };
  }
  function boxZone() {
    const st = boxStage.getBoundingClientRect(), vis = el => el && el.offsetParent !== null && getComputedStyle(el).display !== 'none';
    const hd = $('.bi-head', boxInfo); let top = (hd ? hd.getBoundingClientRect().bottom - st.top : 0) + (mobile ? 18 : 28);
    const list = $('.bi-list', boxInfo), bot = (vis(list) ? list.getBoundingClientRect().top : st.bottom) - st.top - (mobile ? 10 : 18);
    return { x: 16, y: top, w: st.width - 32, h: Math.max(120, bot - top) };
  }
  // the box spins into view with the scroll, then follows the pointer a little; it settles square whenever a card is picked
  const bRot = { x: VIEW_X, z: VIEW_Z, ok: false }, bPtr = { x: 0, y: 0, tx: 0, ty: 0 };
  boxStage.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; bPtr.tx = e.clientX / vw * 2 - 1; bPtr.ty = e.clientY / vh * 2 - 1; }, { passive: true });
  boxStage.addEventListener('pointerleave', () => { bPtr.tx = 0; bPtr.ty = 0; });
  function boxSpin(dt, q) {
    const settle = picked || reduce, e = 1;
    const pe = 1 - Math.exp(-dt * 3); bPtr.x += (bPtr.tx - bPtr.x) * pe; bPtr.y += (bPtr.ty - bPtr.y) * pe;
    const tilt = settle || !boxOpen ? 0 : 1;
    const tx = VIEW_X - bPtr.y * 2.5 * tilt, tz = VIEW_Z + bPtr.x * 4.5 * tilt;
    const k = !bRot.ok || !dt || reduce ? 1 : 1 - Math.exp(-dt * (picked ? 12 : 6)); bRot.ok = true;
    bRot.x += (tx - bRot.x) * k; bRot.z += (tz - bRot.z) * k;
    const t = `rotateX(${bRot.x.toFixed(2)}deg) rotateZ(${bRot.z.toFixed(2)}deg)`; if (t !== boxSpin.t) { boxSpin.t = t; box3.style.transform = t; }
  }
  function boxScale(dt) { { const r0 = boxTrack.getBoundingClientRect(); boxSpin(dt || 0, clamp((vh - r0.top) / r0.height)); } if (picked) return boxS; if (!boxExt) boxMeasure();
    const z = boxZone(), fit = Math.min(z.w / boxExt.w, z.h / boxExt.h, mobile ? 1.1 : 1.15);
    const r = boxTrack.getBoundingClientRect(), q = clamp((vh - r.top) / (r.height)), want = mobile ? fit : fit * (.5 + .5 * ss(clamp(q / .42)));
    boxCur = !boxCur || !dt || reduce ? want : boxCur + (want - boxCur) * (1 - Math.exp(-dt * 7));
    const x = z.x + z.w / 2 - boxCur * (boxExt.l + boxExt.w / 2), y = z.y + z.h / 2 - boxCur * (boxExt.t + boxExt.h / 2), pos = x.toFixed(1) + ',' + y.toFixed(1);
    if (pos !== boxPos) { boxPos = pos; boxFit.style.left = x.toFixed(1) + 'px'; boxFit.style.top = y.toFixed(1) + 'px'; }
    if (Math.abs(boxCur - boxSW) > .0004) { boxSW = boxCur; boxS = boxCur; boxFit.style.transform = `scale(${boxCur.toFixed(4)})`; } return boxS; }
  const pickEase = 'cubic-bezier(.55, 0, .15, 1)';
  function pick(k) {
    if (picked || !boxOpen) return;
    picked = k; k.el.classList.remove('hover');
    const from = k.el.style.transform, to = faced(k);
    k.el.style.transition = 'none';
    const a = k.el.animate([{ transform: from }, { transform: stand(CH + 60), offset: .38 }, { transform: to }], { duration: reduce ? 1 : 1500, easing: pickEase, fill: 'forwards' });
    a.onfinish = () => { k.el.style.transform = to; a.cancel(); setTimeout(() => expand(k), 160); };
  }
  // ---------- Tablely: the full case study, told as a scroll story
  const cimg = n => `v2/cs/ed-${n}.webp`;
  const HI = new Set('ax1 ax2 ax3 ax4 booster code1 code2 code3 code4 code5 comp1 comp2 comp3 comp4 comp5 comp6 comp7 comp8 ex1 ex2 ex3 ex4 ex5 ex6 flow it1 it2 it3 it4 pay1 pay2 pay3 pay4 up1 up2 up3 up4'.split(' '));
  const ED = {
    comic: [['story1', 'Dinner’s done. The bill arrives.', 'You’re full, happy, and ready to head home.'],
      ['story2', 'Out comes the phone.', 'PayEazy promises a discount on the bill. Nice.'],
      ['story3', 'So many offers. Which one?', 'Bank cards, codes, cashback… the hunt begins.'],
      ['story4', 'Yes! The best deal, applied.', 'This is how it should feel, every single time.']],
    stages: [['Enter amount', '100 diners open PayEazy to pay their bill.'], ['Payment summary', '16 leave at the payment summary.'],
      ['Payment mode', '34 more give up choosing how to pay. That’s 40% of those still here.'], ['Payment success', '14 more don’t make it. Only 36 pay.']],
    quotes: [['User 1', 'I couldn’t find a great deal quickly, so I just paid the full amount instead of hunting for coupons.'],
      ['User 2', 'I always apply the first coupon I see without checking if it’s actually the best one.'],
      ['User 3', 'The way discounts are shown is confusing. I can’t tell how much I’m saving, and I don’t trust these offers.'],
      ['User 5', 'I can’t search for my bank card to see which offers apply to me.'],
      ['User 6', 'I don’t want to waste time figuring out offers. Can you just show me the best discount?'],
      ['User 7', 'There are way too many offers, and it’s hard to understand which one applies to me. I need to pay my bill fast.']],
    probs: [['Low discoverability', 'Too many offers, unclear categorisation and an overwhelming UI made it hard to find the best deal.'],
      ['Applicability confusion', 'People couldn’t tell whether a coupon was actually applied to their order.'],
      ['Limited personalisation', 'There was no system to recommend the best coupon automatically.'],
      ['Multiple coupons, one choice', 'People didn’t know how to compare deals, and stacking wasn’t possible in a clear way.'],
      ['Hidden best deals', 'The best possible coupon wasn’t visible upfront, so people missed out on savings.']],
    its: [['it1', 'Round 1', 'The foundation', ['Redesigned the coupon tray with <b>search</b>.', 'Improved <b>text hierarchy</b> so people instantly saw their savings.', 'Introduced coupon <b>chips</b> to make navigation and filtering easier.'], ''],
      ['it2', 'Round 2', 'The breakthrough', ['Introduced <b>sub-chips</b> for cards of different banks, right after picking a payment method.', 'Redesigned <b>how offers were grouped</b>, since early versions didn’t separate savings categories clearly.'], 'The catch: people couldn’t compare two banks side by side.'],
      ['it3', 'Round 3', 'Granular control', ['Added <b>tabs</b> for All offers, Credit cards, Debit cards and Other offers.', 'Showed <b>the number of offers</b> next to each category.', 'Sharpened hierarchy so bank names, discounts and eligibility stand out.', 'Made the offer list <b>resize smoothly</b>, fixing cut-offs from early tests.'], ''],
      ['it4', 'Final', 'Bringing it all together', ['Coupon code entry, search, tabs, sub-chips and a <b>new UI</b>, in one tray.', 'Solved the <b>Axis Bank problem</b> by asking for the first 8 digits of the card.', 'Fixed tap areas, dynamic heights and UX inconsistencies.', 'Added <b>smart recommendations</b> that highlight the best saving for your payment method.'], '']],
    // the five ways to save, and the route each one takes through checkout
    paths: [['up', '#2A7BD1', 'Upfront coupons', 'Best deals, zero hunting.', 'The best coupon for your payment method sits right on the payment summary. Tap it and you’re done.', ['up1', 'up2', 'up3', 'up4'], ['A', 'B', 'C1', 'D', 'E']],
      ['ex', '#7B5CD6', 'Coupon exploration', 'Search, filter, and find the perfect deal your way.', '50+ coupons, organised with tabs, chips and search so people can actually browse them.', ['ex1', 'ex2', 'ex3', 'ex4', 'ex5', 'ex6'], ['A', 'B', 'C2', 'D', 'E']],
      ['ax', '#F4511E', 'Axis Bank cards', 'Cutting through 20+ card types.', 'Enter the first 8 digits of your Axis Bank card to instantly confirm the discount you’re eligible for.', ['ax1', 'ax2', 'ax3', 'ax4'], ['A', 'B', 'C3', 'D', 'E']],
      ['code', '#E1306C', 'Coupon code', 'Got a coupon code?', 'Drop it in and unlock your savings, with clear feedback when it works and when it doesn’t.', ['code1', 'code2', 'code3', 'code4', 'code5'], ['A', 'B', 'C4', 'D', 'E']]],
    galSub: { up: 'The best coupon for your payment method, applied in one tap.', ex: 'Search, tabs and bank chips to browse 50+ offers with ease.', ax: 'First 8 digits of an Axis card, then only the offers that apply.', code: 'Drop in a code and get clear feedback when it works, or doesn’t.' },
    nodes: { A: [90, 220, 'Enter amount'], B: [260, 220, 'Payment summary'], C1: [520, 52, 'Best coupon, upfront', 'Upfront coupon'], C2: [520, 164, 'Coupon tray', 'Coupon tray'], C3: [520, 276, 'Axis card, 8 digits', 'Axis card'], C4: [520, 388, 'Coupon code', 'Coupon code'], D: [775, 220, 'Payment mode'], E: [925, 220, 'Paid'] },
    more: [['traum', 'The Visibility Game', 'Haven · an Orbit company', '#1667A8'], ['requests', 'The Request Rescue', 'Wayfinder · Special Requests', '#D7262B'], ['swipr', 'Property Matchmaker', 'Wayfinder · Swipr.AI', '#E4262C'], ['lastlook', 'PocketCheck', 'My own app · iOS', '#9A6A3E']]
  };
  const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.2 7.1L21 5l-3.6 6.5L24 14l-7.1 1.3L19 22l-7-3.9L5 22l2.1-6.7L0 14l6.6-2.5L3 5l6.8 3.1z"/></svg>';
  // a heading whose words rise in one by one, with one brushed phrase
  function edHead(pre, hl = '', post = '', b = 'b-sun') {
    let i = 0; const W = t => t.split(' ').filter(Boolean).map(w => `<span class="w" style="--i:${i++}">${w}</span>`).join(' ');
    return `<h3 class="c3-h" data-rv>${W(pre)}${hl ? ` <span class="hl ${b}">${W(hl)}</span>` : ''}${post ? ' ' + W(post) : ''}</h3>`;
  }
  const edBig = (t, cls = '') => `<p class="c3-big ${cls}" data-scrub>${t.split(' ').map(w => `<span>${w}</span>`).join(' ')}</p>`;
  function edHTML(w) {
    const I = (n, a = '', extra = '', g = '') => `<img src="${cimg(n)}" alt="${a}" loading="lazy"${HI.has(n) ? ` data-z="${g || 'all'}" data-hi="v2/cs/hi/ed-${n}.webp"` : ''} onerror="this.outerHTML='<div class=&quot;c3-ph&quot;>'+(this.alt||'Image coming soon')+'</div>'"${extra}>`;
    const K = t => `<p class="kicker c3-k" data-rv>${STAR}${t}</p>`;
    const drop = Array(100).fill(9), order = [...Array(100).keys()].sort((a, b) => ((a * 37) % 101) - ((b * 37) % 101));
    order.slice(0, 16).forEach(i => drop[i] = 1); order.slice(16, 50).forEach(i => drop[i] = 2); order.slice(50, 64).forEach(i => drop[i] = 3);
    const SK = ['#F2C9A0', '#D9A273', '#A8704A', '#7A4B2E', '#F5D5B8'], SH = ['#FF6B4A', '#2F7FD8', '#FFD23F', '#4F9E4A', '#B7A2FF', '#FF9E7A'];
    const person = i => `style="--s:${SK[(i * 7) % 5]};--c:${SH[(i * 5) % 6]};--d:${(i * 13) % 40}"`;
    const crowd = drop.map((d, i) => `<i data-g="${d}" ${person(i)}></i>`).join('');
    const hs = k => { const v = Math.sin(k * 12.9898) * 43758.5453; return v - Math.floor(v); };
    const notes = Array.from({ length: 42 }, (_, i) => `<i class="sn" style="left:${2 + hs(i + 1) * 90}%;top:${3 + hs(i + 71) * 85}%;--c:${['#FFE58A', '#FFC9B8', '#C8E6FF', '#D5F2C8', '#E6DAFF'][i % 5]};--r:${((i * 17) % 21) - 10}deg"></i>`).join('');
    const tick = '<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" fill="#3DBE6B"/><path d="M24 41l11 11 21-24" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const svgClock = '<svg viewBox="0 0 64 64"><circle cx="32" cy="34" r="24" fill="#9FD3FF" stroke="#13233A" stroke-width="3"/><path d="M32 20v14l9 6" fill="none" stroke="#13233A" stroke-width="3.5" stroke-linecap="round"/><path d="M24 6h16M32 6v4" stroke="#13233A" stroke-width="3" stroke-linecap="round"/></svg>';
    const svgTarget = '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="26" fill="#FF6B4A" stroke="#13233A" stroke-width="3"/><circle cx="32" cy="32" r="16" fill="#FFF8EC" stroke="#13233A" stroke-width="3"/><circle cx="32" cy="32" r="6" fill="#FF6B4A" stroke="#13233A" stroke-width="3"/><path d="M32 32l22-22M46 8l8 2 2 8" fill="none" stroke="#13233A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const svgBulb = '<svg viewBox="0 0 64 64"><path d="M32 6a19 19 0 0 0-11 34.5c2 1.6 3 3.6 3 6V50h16v-3.5c0-2.4 1-4.4 3-6A19 19 0 0 0 32 6z" fill="#FFD23F" stroke="#13233A" stroke-width="3" stroke-linejoin="round"/><path d="M25 56h14M27 61h10" stroke="#13233A" stroke-width="3" stroke-linecap="round"/><path d="M27 32l5 5 5-5" fill="none" stroke="#13233A" stroke-width="2.5" stroke-linecap="round"/></svg>';
    // rough, hand-drawn lines for the sketch sections
    const rough = (x1, y1, x2, y2, j = 3) => { const mx = (x1 + x2) / 2 + (hs(x1 + y2) - .5) * j * 2, my = (y1 + y2) / 2 + (hs(y1 + x2) - .5) * j * 2; return `M${x1} ${y1}Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2} ${y2}`; };
    const mxLines = [rough(6, 200, 594, 203, 4), rough(10, 196, 590, 199, 3), rough(300, 8, 302, 394, 4), rough(296, 12, 299, 390, 3), rough(594, 203, 574, 189, 1) + rough(594, 203, 574, 217, 1), rough(300, 8, 286, 28, 1) + rough(300, 8, 314, 28, 1)];
    const badge = (k, html, bg, slot) => `<span class="bdg" data-slot="${slot}" style="--bg:${bg}">${html}</span>`;
    const results = [['pay', 'Payment success', '+41.18%', 41.18, 34.6, 45.6, 'diners who paid', 'p'], ['cpn', 'Coupon application', '+24.64%', 24.64, 55.5, 67, 'diners who applied a coupon', 't'], ['flt', 'Filter engagement', '~2.3×', 0, 18, 42, 'diners who used the filters', 'c']];
    return `<div class="cs-bar"><button class="cs-close" id="csClose" type="button"><span class="ar" aria-hidden="true">←</span>Back to the box</button><span class="c3-ch" id="c3Ch">The story</span></div>
      <div class="c3-prog" id="c3Prog"><i></i></div>
      <article class="c3">
      <header class="c3-hero" data-ch="The story"><div class="c3-w">
        ${I('wordmark', 'Tablely', ' class="brand" data-rv')}
        <h2 data-rv>The Coupon <span class="hl b-coral">Hunter</span></h2>
        <p class="sub" data-rv>Finding the best coupon shouldn’t feel like a treasure hunt. This is how I redesigned the moment you pay for dinner.</p>
        <p class="c3-scrollhint" data-rv>Scroll, it starts at dinner<svg viewBox="0 0 26 40"><path d="M13 3v32M4 26l9 10 9-10"/></svg></p></div></header>

      <div class="c3-track" id="c3Comic" style="height:340vh"><div class="c3-pin"><div class="c3-comic">
        <div class="c3-panels">${ED.comic.map(([n, t], k) => `<figure style="--r:${[-2, 1.5, -1, 2][k]}deg">${I(n, t)}<span>${k + 1}</span></figure>`).join('')}</div>
        <p class="c3-cap" id="c3Cap"></p></div></div></div>

      <div class="c3-w">${edBig('That third panel, the hunt, is where people were getting lost. So I redesigned it, end to end.')}
        <div class="c3-flip" data-rv><button type="button" class="c3-flip-in" id="c3Bill" aria-label="Flip the bill to see more">
          <div class="c3-receipt"><h4>EAZYDINER · PAYEAZY</h4><p class="sm">Coupon selection redesign</p><hr>
            <dl><dt>My role</dt><dd>End-to-end redesign lead</dd><dt>Timeline</dt><dd>Jan – Apr 2025 · 4 months</dd><dt>Team</dt><dd>1 PM, 3 devs, 2 QA, Head of Product</dd></dl><hr>
            <dl><dt>Coupon application</dt><dd>55.5% → <em>67.0%</em></dd><dt>Payment success</dt><dd>34.6% → <em>45.6%</em></dd><dt>Filter engagement</dt><dd>~18% → <em>~42%</em></dd></dl>
            <p class="thx">Tap to flip ↻</p></div>
          <div class="c3-receipt back"><h4>THE ORDER, ITEMISED</h4><p class="sm">Everything that went into it</p><hr>
            <dl><dt>The problem</dt><dd>Only 36 of 100 diners paid</dd><dt>User feedback</dt><dd>Real complaints, checked</dd><dt>Pain points</dt><dd>40+ → 5 core problems</dd><dt>Apps studied</dt><dd>50+</dd><dt>Design rounds</dt><dd>4</dd><dt>Card types handled</dt><dd>80+ Axis cards</dd><dt>Dev handoff</dt><dd>3-hour deep-dive</dd></dl><hr>
            <dl><dt>Status</dt><dd><em>Live on the app</em></dd></dl>
            <p class="thx">Tap to flip back ↻</p></div></button></div>
        <p class="c3-fliphint" data-rv>The bill flips. Go on, tap it.</p></div>

      <section class="c3-sec" data-ch="The drop-off"><div class="c3-w">${K('Chapter 1 · The drop-off')}
        ${edHead('Everyone came for a discount.', 'Few paid.')}
        <p class="c3-p" data-rv>People came to PayEazy with one clear goal: <b>get a discount while paying their bill</b>. The data showed this is exactly where things started to break. Let’s follow 100 diners through checkout.</p></div></section>
      <div class="c3-track" id="c3Fun" style="height:440vh"><div class="c3-pin"><div class="c3-fun">
        <div class="c3-steps">${ED.stages.map(([t]) => `<span>${t}</span>`).join('')}</div>
        <div class="c3-phone">
          <div class="c3-scr"><header><b>Cafe Jakarta Heights</b><small>Pay your bill</small></header><div class="amt">₹2,810</div><p class="lbl">Enter bill amount</p><div class="c3-keys">${[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '⌫'].map(k => `<i>${k}</i>`).join('')}</div></div>
          <div class="c3-scr"><header><b>Payment summary</b><small>Cafe Jakarta Heights</small></header><div class="c3-rows"><div><span>Bill amount</span><span>₹2,810</span></div><div class="cp"><span>Apply coupon</span><em>?</em></div><div><span>Convenience fee</span><span>₹0</span></div><div class="tot"><span>To pay</span><span>₹2,810</span></div></div><div class="c3-btn">Select payment option</div></div>
          <div class="c3-scr"><header><b>Choose payment mode</b><small>₹2,810</small></header><div class="c3-modes"><div><b>Credit card</b><s>10% off</s><s>Flat ₹200</s><s>₹150 back</s><s>+6 more</s></div><div><b>Debit card</b><s>5% off</s><s>Flat ₹100</s><s>+4 more</s></div><div><b>UPI</b><s>₹50 back</s><s>2% off</s><s>+3 more</s></div><div><b>Wallets</b><s>Flat ₹75</s><s>+2 more</s></div></div></div>
          <div class="c3-scr ok">${tick}<b>Payment successful</b><span>₹2,810 paid</span></div></div>
        <div class="c3-crowdw"><div class="c3-count"><b id="c3N">100</b>of 100 diners still here</div><div class="c3-crowd" id="c3Crowd">${crowd}</div><p class="c3-fnote" id="c3Fn"></p></div></div></div></div>
      <div class="c3-w"><p class="c3-p" data-rv>Nearly <b>40% of people dropped off</b> between the payment summary and choosing a payment mode. Overall, <b>only 36 out of 100</b> completed the payment.</p>
        <p class="c3-p" data-rv>They wanted the discount, but many couldn’t confidently apply the right coupon, so they left. That made <span class="hl b-sun">payment success and coupon confidence</span> the core problem to solve.</p></div>

      <section class="c3-sec" data-ch="Listening"><div class="c3-w">${K('Chapter 2 · Listening')}
        ${edHead('I read what people were', 'telling us.', '', 'b-sky')}
        <p class="c3-p" data-rv>I needed to validate my assumptions, so I pulled the data of real users who had raised issues that lined up with the problem I was defining.</p></div></section>
      <div class="c3-track" id="c3Chat" style="height:${ED.quotes.length * 55 + 80}vh"><div class="c3-pin"><div class="c3-chat">
        <header><i></i><div>User feedback<small>Issues raised about paying with coupons</small></div></header>
        <div class="c3-msgs">${ED.quotes.map(([u, q], k) => `<div class="c3-msg"><span class="c3-av" style="background-image:url('${cimg(k < 4 ? 'users1' : 'users2')}');background-position:${(k % 4) * 33.333}% 0"></span><p><small>${u}</small>${q}</p></div>`).join('')}</div>
        <div class="c3-typing"><i></i><i></i><i></i></div></div></div></div>
      <div class="c3-w">${edBig('Armed with these insights, I knew exactly what needed fixing. Next step: writing out every problem with the current design.')}</div>

      <section class="c3-sec" data-ch="The whiteboard"><div class="c3-w">${K('Chapter 3 · The whiteboard')}
        ${edHead('40+ pain points.', 'Five real problems.', '', 'b-coral')}
        <p class="c3-p" data-rv>I gathered the team and filled a whiteboard with everything that was broken. From that chaos, I distilled five core problems and built a research-driven approach around them.</p></div></section>
      <div class="c3-track" id="c3Board" style="height:520vh"><div class="c3-pin"><div>
        <div class="c3-board">${notes}<span class="c3-bnum" id="c3Bn">40+ notes</span>
          <div class="c3-five">${ED.probs.map(([t], k) => `<div style="--c:${['#FFE58A', '#FFC9B8', '#C8E6FF', '#D5F2C8', '#E6DAFF'][k]};--r:${[-3, 2, -1.5, 3, -2][k]}deg"><em>0${k + 1}</em>${t}</div>`).join('')}</div></div>
        <div class="c3-w c3-bcap" id="c3Bcap"></div></div></div></div>

      <section class="c3-sec" data-ch="The goal"><div class="c3-w">${K('My primary goal')}
        <p class="c3-goal" data-rv>Help people quickly find and confidently apply the best coupon, so they can pay without hesitation.</p>
        <div class="c3-eq" data-rv><span class="t">${svgClock}<span>Faster decisions</span></span><i>+</i><span class="t">${svgTarget}<span>Smarter results</span></span><i>+</i><span class="t">${svgBulb}<span>Less time</span></span><i>=</i><span class="c3-ticket"><small>The result</small>Coupons that just work</span></div></div></section>

      <section class="c3-sec" data-ch="Looking around"><div class="c3-w">${K('Chapter 4 · Looking around')}
        ${edHead('I studied', '50+ apps', 'before drawing a thing.', 'b-lilac')}
        <p class="c3-p" data-rv>I wasn’t going to reinvent the wheel without seeing what was already out there: giants like <b>Zomato, BookMyShow, Swiggy, Airtel, Orbit</b> and <b>District</b>, and lesser-known but innovative apps.</p></div>
        <div class="c3-logos" data-rv>${['zomato', 'swiggy', 'bistro', 'myntra', 'oyo', 'bb', 'mmt', 'ajio'].map(n => I('lg-' + n, n)).join('')}<span>+40 more</span></div>
        <div class="c3-strip" id="c3Strip">${[1, 2, 3, 4, 5, 6, 7, 8].map(n => I('comp' + n, 'A competitor’s coupon screen', '', 'comp')).join('')}</div>
        <div class="c3-w"><p class="c3-p" data-rv style="margin-top:8vh">Then I grabbed a pen and sorted them by how well their UI and UX actually worked.</p></div></section>
      <div class="c3-track" id="c3Mx" style="height:300vh"><div class="c3-pin"><div class="c3-sketch">
        <div class="c3-mx"><svg class="mx-lines" viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">${mxLines.map(d => `<path d="${d}"/>`).join('')}</svg>
          <span class="ax x">better UI →</span><span class="ax y">better UX →</span>
          <div class="q" data-q="0"><i class="slot" data-s="0"></i><small>bad UI, great UX</small><b>BookMyShow</b><p>Intuitive sections based on payment methods made navigation seamless.</p></div>
          <div class="q win" data-q="1"><i class="slot" data-s="1"></i><small>great UI, great UX</small><b>Tablely</b><p>You’ll be convinced by the end of this case study.</p></div>
          <div class="q" data-q="2"><i class="slot" data-s="2"></i><small>bad UI, bad UX</small><b>Some apps</b><p>They made me wonder how anyone managed to apply a coupon at all.</p></div>
          <div class="q" data-q="3"><i class="slot" data-s="3"></i><small>great UI, bad UX</small><b>District</b><p>The visual hierarchy guided my eyes perfectly, but essential information was missing.</p></div></div>
        ${badge('bms', '<img class="lg" src="v2/cs/logo-bms.webp" alt="BookMyShow">', '#F84464', 0)}${badge('ed', '<img class="lg" src="v2/cs/logo-ed-word.webp" alt="Tablely">', '#F4511E', 1)}${badge('q1', '<svg viewBox="0 0 24 24" class="gen"><path d="M4 12.5V5a1 1 0 0 1 1-1h7.5L20 11.5 12.5 19z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/><circle cx="8.5" cy="8.5" r="1.6" fill="#fff"/></svg>', 'linear-gradient(145deg, #7B61FF, #4B3BD6)', 2)}${badge('q2', '<svg viewBox="0 0 24 24" class="gen"><rect x="3.5" y="6" width="17" height="13" rx="3" fill="none" stroke="#fff" stroke-width="2.2"/><path d="M3.5 10h17" stroke="#fff" stroke-width="2.2"/><circle cx="16.5" cy="14.5" r="1.4" fill="#fff"/></svg>', 'linear-gradient(145deg, #1FC7A3, #0E8F86)', 2)}${badge('dst', '<img class="lg" src="v2/cs/logo-district.webp" alt="District">', '#5A1FD1', 3)}
        <p class="c3-mxcap" id="c3MxCap"></p></div></div></div>
      <div class="c3-w"><p class="c3-p" data-rv>I took inspiration from these, but crafted a design that solved <b>our specific problems</b>, something no other app had done yet.</p></div>

      <section class="c3-sec" data-ch="Four rounds"><div class="c3-w">${K('Chapter 5 · Four rounds')}
        ${edHead('It took', 'four rounds', 'to get right.', 'b-sky')}
        <p class="c3-p" data-rv>Each round was tested, picked apart and rebuilt. Keep scrolling to flip through them, or tap a round.</p></div></section>
      <div class="c3-track c3-evo" id="c3Evo" style="height:${ED.its.length * 95 + 40}vh"><div class="c3-pin">
        <svg class="c3-doodles" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <g transform="translate(34 300) rotate(-4)"><path d="M2 3q30-3 60 0l1 118q-30 2-61 0z"/><path d="M12 22h40M12 34h28M12 50q18 2 38 0M12 66h34M12 82h22"/><path d="M-4 -6l74 136M70 -6l-76 136" class="x"/><text x="4" y="150">v1, too busy</text></g>
          <g transform="translate(1340 560) rotate(5)"><path d="M2 2q32-2 62 1v120q-31 2-62 0z"/><path d="M12 18q20-2 42 0M12 30h30M12 46h40v14H12zM12 72h26M12 86h36"/><path d="M20 140l8 8 18-20" class="ok"/><text x="-10" y="176">this one ✓</text></g>
          <g transform="translate(150 790) rotate(-3)"><path d="M0 30c40-26 90-30 140-8"/><path d="M128 10l14 12-18 6"/><text x="150" y="30">search first?</text></g>
          <g transform="translate(1210 150) rotate(4)"><text x="0" y="0">chips → tabs</text><path d="M0 12q60 8 110-2"/></g>
          <g transform="translate(60 120) rotate(-6)"><text x="0" y="0">too many offers :(</text><path d="M-4 10q90 10 180-4" class="x"/></g>
        </svg>
        <div class="c3-evo-in">
        <div class="c3-row" id="c3Row">${ED.its.map(([im, k, t, li, ch]) => `<div class="c3-slide"><div class="c3-card"><i class="cm"></i>${I(im, k + ' design', '', 'its')}</div><div class="c3-stxt"><small>${k}</small><h4>${t}</h4><ul>${li.map(x => `<li>${x}</li>`).join('')}</ul>${ch ? `<p class="chal">${ch}</p>` : ''}</div></div>`).join('')}</div>
        <div class="c3-tabs">${ED.its.map(([, k, t], i) => `<button type="button" data-evo="${i}"><i>${i + 1}</i>${t}</button>`).join('')}</div></div></div></div>

      <section class="c3-sec" data-ch="The Axis problem"><div class="c3-w">${K('Chapter 6 · The Axis problem')}
        ${edHead('80+ card types.', 'One simple question.', '', 'b-coral')}
        <p class="c3-p" data-rv>Axis Bank has more than 80 card types, each with different offers. Instead of making people scroll through all of them, I asked for the <b>first 8 digits of their card</b> and showed only the deals that apply.</p>
        <div class="c3-try" data-rv><p class="c3-trylbl">Go on, try it</p>
          <div class="c3-cc"><b>AXIS BANK</b><i class="chip"></i><div class="num" id="c3Num"><span>••••</span><span>••••</span><span>XXXX</span><span>XXXX</span></div><small>Credit card</small></div>
          <input id="c3Axis" inputmode="numeric" maxlength="8" placeholder="First 8 digits" aria-label="Type any 8 digits" autocomplete="off">
          <p class="c3-hint" id="c3Hint">Type any 8 digits.</p>
          <div class="c3-offers" id="c3Off"><div><b>Save ₹743</b>10% off up to ₹1,000 on your card</div><div><b>Offer confirmed</b>Minimum bill value of ₹3,000 · valid once a month</div></div></div></div></section>

      <section class="c3-sec" data-ch="The twist"><div class="c3-w">${K('Chapter 7 · The twist')}
        ${edHead('They needed', 'confidence,', 'not more coupons.', 'b-sun')}
        <p class="c3-p" data-rv>One pattern became obvious during research. People weren’t skipping coupons because they didn’t exist. They hesitated because they didn’t know <b>which one was the best</b>, right at the moment confidence mattered most.</p>
        ${edBig('What if people didn’t have to search at all? What if the best coupon was shown upfront?', 'q')}
        <p class="c3-twist" data-rv>And here came the twist!<svg viewBox="0 0 200 14" preserveAspectRatio="none"><path d="M3 9c30-6 60-6 90-2s70 4 104-3"/></svg></p>
        <p class="c3-p" data-rv>I introduced an <b>upfront coupon section</b> that automatically surfaces the most relevant, highest-saving coupon for the payment method you picked. Instead of showing everything equally, the system prioritises. Try both versions:</p>
        <div class="c3-demo" data-rv>
          <div class="c3-seg" role="tablist"><button type="button" data-mode="before">Before</button><button type="button" data-mode="after" class="on">After</button></div>
          <div class="c3-dphone" id="c3Demo" data-mode="after">
            <header><small>Cafe Jakarta Heights</small><b><s id="c3Old">₹2,810</s><span id="c3Pay">₹2,810</span></b><small>Your bill</small></header>
            <div class="bf"><p class="lab">Offers for you</p><button type="button" class="row" id="c3Tray"><span><b>Apply coupons</b><small>50+ offers inside</small></span><em>›</em></button><p class="toast" id="c3Toast">50+ offers, all shown the same way. Which one is best? 🤷</p></div>
            <div class="af"><p class="lab">Best coupon for you</p><div class="best"><span class="bk">AXIS</span><span><b>Save ₹743</b><small>Valid on Axis Bank selected cards</small></span><button type="button" id="c3Apply">Apply</button></div><p class="all">View all coupons</p></div>
            <div class="sum"><p class="lab">Payment summary</p><div><span>Bill amount</span><span>₹2,810</span></div><div class="disc"><span>Coupon discount</span><span>−₹743</span></div><div class="tot"><span>To pay</span><span id="c3Tot">₹2,810</span></div></div>
            <div class="yay" id="c3Yay">Woohoo! You’re saving ₹743 🎉</div>
            <div class="cta">Select payment option</div>
            <div class="conf" id="c3Conf">${Array.from({ length: 18 }, (_, i) => `<i style="--x:${(hs(i + 9) * 200 - 100).toFixed(0)}px;--y:${(-60 - hs(i + 40) * 140).toFixed(0)}px;--c:${['#FFD23F', '#FF6B4A', '#2F7FD8', '#4F9E4A', '#B7A2FF'][i % 5]};--d:${(i % 6) * 30}ms"></i>`).join('')}</div></div>
          <p class="c3-dcap" id="c3Dcap">One tap. The best saving for your payment method is already there.</p></div>
        <ul class="c3-checks" data-rv><li>The best coupon appears at the top</li><li>Savings are clearly highlighted</li><li>Apply it instantly, no scrolling</li></ul></div>
        <div class="c3-wide"><div class="c3-card c3-booster" data-rv>${I('booster', 'The upfront best coupon across states', '', 'booster')}<p class="c3-zoomhint">Tap any screen to zoom in</p></div></div></section>

      <section class="c3-sec" data-ch="Handoff"><div class="c3-w">${K('Chapter 8 · Handoff')}
        ${edHead('Three hours with the devs, so the', 'why', 'shipped too.', 'b-mint')}
        <p class="c3-p" data-rv>Once the design was final, I ran a three-hour deep-dive with the developers, walking through every decision in four parts.</p></div>
        <div class="c3-wide"><div class="c3-hand" data-rv>${[['The problems', 'What we found, and why each one mattered.'], ['The solutions', 'The logic behind every design decision.'], ['Functionality', 'What we expected every state to do.'], ['Feasibility', 'Aligning the design with development constraints.']].map(([t, d], k) => `<div><i>${k + 1}</i><b>${t}</b><p>${d}</p></div>`).join('')}</div>
        <div class="c3-w" style="margin-top:12vh"><p class="c3-p" data-rv>And we agreed on how we’d know it worked:</p></div>
        <div class="c3-kpi" data-rv>${[['card', 'PayEazy conversion', 'New-user conversion, before and after the redesign.'], ['bell', 'Coupon engagement', 'How many people interact with the coupon section.'], ['ticket', 'Coupon redemption', 'How many successfully apply a coupon at checkout.'], ['head', 'Support tickets', 'Fewer tickets means more clarity and confidence.']].map(([ic, t, d], k) => `<div style="--r:${[-1.5, 1, -1, 1.5][k]}deg"><svg viewBox="0 0 24 24">${ICONS[ic]}</svg><b>${t}</b><p>${d}</p></div>`).join('')}</div></div></section>

      <section class="c3-sec c3-paths" data-ch="The paths"><div class="c3-w">${K('Chapter 9 · The paths')}
        ${edHead('Four ways to save,', 'zero guesswork.', '', 'b-sky')}
        <p class="c3-p" data-rv>However people like to pay, there’s now a clear route from the bill to the best saving. Pick a path and follow it screen by screen.</p></div>
        <div class="c3-wide"><div class="c3-ptabs" id="c3Pt" data-rv>${ED.paths.map(([id, c, t], k) => `<button type="button" data-path="${k}" style="--c:${c}"${k ? '' : ' class="on"'}>${t}</button>`).join('')}</div>
        <div class="c3-pview" id="c3Pv"></div>
</div></section>

      <section class="c3-sec c3-final" data-ch="Final screens"><div class="c3-w">${K('The final designs')}
        ${edHead('Every screen,', 'as it shipped.', '', 'b-sun')}
        <p class="c3-p" data-rv>All the final mockups in one place, grouped by path. Tap any screen to look closer.</p></div>
        ${ED.paths.map(([id, c, t, h, , ims]) => `<div class="c3-gal" style="--c:${c}" data-rv><div class="c3-w"><p class="c3-galk"><i></i>${t}<small>${ims.length} screens</small></p><p class="c3-gald">${ED.galSub[id]}</p></div><div class="c3-galrow">${ims.map((n, k) => I(n, `${t}, screen ${k + 1}`, '', 'final')).join('')}</div></div>`).join('')}</section>

      <section class="c3-sec c3-results" data-ch="Results"><div class="c3-w">${K('Chapter 10 · The results')}
        ${edHead('It’s live, and', 'it’s working.', '', 'b-mint')}
        <p class="c3-p" data-rv>The coupon redesign shipped in the Tablely app. Remember our 100 diners? Out of every 100, about <b>11 more now pay</b> than before.</p></div>
        <div class="c3-wide" id="c3Res"><div class="c3-seg c3-rseg" role="tablist"><button type="button" data-res="0">Before</button><button type="button" data-res="1" class="on">After</button></div>
          <div class="c3-rgrid">${results.map(([id, t, big, , b, a, lab, sh]) => `<div class="c3-rc" data-b="${Math.round(b)}" data-a="${Math.round(a)}"><div class="rh"><span>${t}</span><em class="rd">${big}</em></div><b class="rv" data-from="${b}" data-to="${a}">${b}%</b><div class="c3-dots ${sh}">${Array.from({ length: 100 }, (_, i) => `<i ${sh === 'p' ? person(i) : `style="--d:${(i * 13) % 40}"`}></i>`).join('')}</div><p class="rf"><b class="rn">${Math.round(b)}</b> of 100 ${lab}<small data-b="Before the redesign" data-a="Up from ${b}%">Before the redesign</small></p></div>`).join('')}
            <div class="c3-rc tray"><div class="rh"><span>Opening the coupon tray</span><em class="rd">+25.58%</em></div><b class="rv tv" data-b="Baseline" data-a="+25.58%">Baseline</b><div class="c3-tray"><div class="tr-box"><i></i><i></i><i></i><i></i></div></div><div class="c3-tbar"><i></i></div><p class="rf"><span class="tl" data-b="How often people opened the tray before." data-a="More people now open the tray to explore offers.">How often people opened the tray before.</span></p></div></div></div></section>

      <footer class="c3-foot" data-ch="Thanks">
        <div class="c3-w c3-fin"><p class="kicker c3-k" data-rv>${STAR}That’s the bill, settled</p>
          ${edHead('Thanks for', 'reading!', '', 'b-sun')}
          <p class="c3-p" data-rv>Designed with care by Alex Morgan.</p>
          <div class="c3-links" data-rv><a class="soc li" href="#hello" target="_blank" rel="noopener" aria-label="LinkedIn"><svg class="soc-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg><span class="soc-t">LinkedIn ↗</span></a><a class="soc ig" href="#hello" target="_blank" rel="noopener" aria-label="Instagram"><svg class="soc-i" viewBox="0 0 24 24" aria-hidden="true"><path  d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg><span class="soc-t">Instagram ↗</span></a><a class="soc gm" href="mailto:hello@example.com" aria-label="Email me"><svg class="soc-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg><span class="soc-t">Email me</span></a><a href="#hello" target="_blank" rel="noopener" data-book>Book a free call ↗</a><button type="button" data-close>Back to the box</button></div>
          ${fbHTML('Tablely Coupon Hunter', ['The story', 'The drop-off', 'Listening', 'The paths', 'The whiteboard', 'Four rounds', 'Final screens', 'Results'])}
          <p class="c3-morek" data-rv>Got a minute for another story?</p>
          <div class="c3-more" data-rv>${WORK.filter(x => x.id !== 'coupon' && !CS_SOON.includes(x.id)).map(x => `<button type="button" class="c3-wc" data-switch="${x.id}" style="--bg:${x.bg};--g:${x.glow}"><span class="wc-top">${x.logo ? `<img src="v2/s/${x.logo}.webp" alt="">` : `<i class="wc-ic"><svg viewBox="0 0 24 24">${ICONS[x.icon]}</svg></i>`}<em>${x.status}</em></span><span class="wc-face ${x.face[0]}"><b>${x.face[1]}</b><small>${x.face[2]}</small></span><span class="wc-name"><b>${x.name}</b><small>${x.co}</small></span><span class="wc-go">Read the case study →</span></button>`).join('')}</div></div>
        <div class="c3-scene" id="c3Scene"></div></footer>
      </article>
      <div class="c3-lb" id="c3Lb" aria-hidden="true"><button type="button" class="lb-x" aria-label="Close">×</button><button type="button" class="lb-p" aria-label="Previous">‹</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="lb-n" aria-label="Next">›</button></div>`;
  }
  function edPathView([id, c, t, h, d, ims]) {
    const arrow = '<span class="pf-ar" aria-hidden="true"><svg viewBox="0 0 60 24"><path d="M2 12h50M44 4l10 8-10 8"/></svg></span>';
    return `<h4>${h}</h4><p>${d}</p><div class="c3-phones pflow" style="--c:${c}">${ims.map((n, k) => `${k ? arrow : ''}<figure class="pf-s" style="--k:${k}"><span class="pf-n">${k + 1}</span><img src="${cimg(n)}" alt="${t}, step ${k + 1}" loading="lazy" data-z="path" data-hi="v2/cs/hi/ed-${n}.webp" onerror="this.outerHTML='<div class=&quot;c3-ph&quot;>Screen coming soon</div>'"></figure>`).join('')}</div>`;
  }
  // the checkout flow as a diagram; vertical on narrow screens
  function edFlowSVG(svg, path, vert) {
    const N = ED.nodes, P = k => vert ? [60 + (N[k][1] - 52) * (360 / 336), N[k][0]] : [N[k][0], N[k][1]];
    const edges = [['A', 'B'], ['B', 'C1'], ['B', 'C2'], ['B', 'C3'], ['B', 'C4'], ['C1', 'D'], ['C2', 'D'], ['C3', 'D'], ['C4', 'D'], ['D', 'E']];
    const curve = (a, b) => { const [x1, y1] = P(a), [x2, y2] = P(b); if (vert) { const m = (y1 + y2) / 2; return `M${x1} ${y1}C${x1} ${m} ${x2} ${m} ${x2} ${y2}`; } const m = (x1 + x2) / 2; return `M${x1} ${y1}C${m} ${y1} ${m} ${y2} ${x2} ${y2}`; };
    const [, c, , , , , route] = path, on = new Set(route.slice(1).map((k, i) => route[i] + k));
    const route2 = route.slice(1).map((k, i) => curve(route[i], k)).map((d, i) => i ? d.replace(/^M[^C]+/, '') : d).join('');
    svg.setAttribute('viewBox', vert ? '0 0 480 1000' : '0 0 1000 440'); svg.classList.toggle('v', vert);
    const lineH = vert ? 24 : 17;
    svg.innerHTML = `${edges.map(([a, b]) => `<path class="fe${on.has(a + b) ? ' on' : ''}" d="${curve(a, b)}" style="--c:${c}"/>`).join('')}
      <path id="c3Route" d="${route2}" fill="none" stroke="none"/>
      ${Object.keys(N).map(k => { const [x, y] = P(k), isC = k[0] === 'C', lit = route.includes(k), label = vert && N[k][3] ? N[k][3] : N[k][2], words = label.split(' ');
        const w = vert ? (isC ? 110 : 230) : 150, h = vert ? (isC ? 70 : 54) : 56;
        const lines = vert ? (isC ? [words[0], words.slice(1).join(' ')] : [label]) : words.length > 2 ? [words.slice(0, Math.ceil(words.length / 2)).join(' '), words.slice(Math.ceil(words.length / 2)).join(' ')] : [label];
        return `<g class="fn${lit ? ' on' : ''}" style="--c:${c}"><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="14"/>${lines.map((l, i) => `<text x="${x}" y="${y + (i - (lines.length - 1) / 2) * lineH + (vert ? 7 : 5)}">${l}</text>`).join('')}</g>`; }).join('')}
      <circle id="c3Dot" r="${vert ? 12 : 9}" fill="${c}" stroke="#fff" stroke-width="3"/>`;
  }
  // a top-down restaurant: diners at tables, and a waiter bringing the bill
  function edScene() {
    const T = [[230, 160, 3], [520, 120, 4], [830, 170, 2], [1110, 130, 4], [360, 360, 4], [700, 380, 3], [1000, 380, 4]];
    const SK = ['#F2C9A0', '#D9A273', '#A8704A', '#7A4B2E', '#F5D5B8'], SH = ['#FF6B4A', '#2F7FD8', '#FFD23F', '#4F9E4A', '#B7A2FF', '#FF9E7A'], HA = ['#2B1B12', '#5A3A22', '#13233A', '#8A5A2B'];
    let n = 0;
    const diner = (x, y, a) => { const r = a * Math.PI / 180, px = x + Math.cos(r) * 64, py = y + Math.sin(r) * 64, k = n++;
      return `<g transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${a + 90})"><rect x="-20" y="2" width="40" height="22" rx="8" fill="#9C6B3E"/><ellipse cx="0" cy="4" rx="21" ry="12" fill="${SH[k % 6]}"/><circle cx="0" cy="-2" r="10" fill="${SK[k % 5]}"/><path d="M-10 0a10 10 0 0 1 20 0c0-4-4-12-10-12s-10 8-10 12z" fill="${HA[k % 4]}"/><g class="bob" style="animation-delay:${(k % 5) * .4}s"><circle cx="-14" cy="-10" r="5" fill="${SK[k % 5]}"/></g></g>`; };
    const table = ([x, y, p], i) => `<g class="tb"><circle cx="${x}" cy="${y + 6}" r="50" fill="rgba(60,30,0,.18)"/>${Array.from({ length: p }, (_, j) => diner(x, y, (360 / p) * j + 25 * i)).join('')}<circle cx="${x}" cy="${y}" r="48" fill="#FFFDF7" stroke="#E9DCC6" stroke-width="3"/>${Array.from({ length: p }, (_, j) => { const r = ((360 / p) * j + 25 * i) * Math.PI / 180; return `<circle cx="${(x + Math.cos(r) * 30).toFixed(1)}" cy="${(y + Math.sin(r) * 30).toFixed(1)}" r="11" fill="#fff" stroke="#E2D6C2" stroke-width="2"/><circle cx="${(x + Math.cos(r) * 30).toFixed(1)}" cy="${(y + Math.sin(r) * 30).toFixed(1)}" r="6" fill="${['#F4A261', '#E76F51', '#8AB17D', '#E9C46A'][(i + j) % 4]}"/>`; }).join('')}<circle cx="${x}" cy="${y}" r="7" fill="#9FD3FF" opacity=".8"/></g>`;
    const plant = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle r="26" fill="#C8875A"/>${[0, 72, 144, 216, 288].map(a => `<ellipse cx="${(Math.cos(a * Math.PI / 180) * 18).toFixed(1)}" cy="${(Math.sin(a * Math.PI / 180) * 18).toFixed(1)}" rx="16" ry="10" fill="${a % 144 ? '#4F9E4A' : '#6DBB5E'}" transform="rotate(${a} ${(Math.cos(a * Math.PI / 180) * 18).toFixed(1)} ${(Math.sin(a * Math.PI / 180) * 18).toFixed(1)})"/>`).join('')}<circle r="9" fill="#3F8A3A"/></g>`;
    return `<svg viewBox="0 0 1340 520" preserveAspectRatio="xMidYMid slice" role="img" aria-label="A busy restaurant seen from above, with a waiter bringing the bill">
      <defs><pattern id="plk" width="120" height="40" patternUnits="userSpaceOnUse"><rect width="120" height="40" fill="#E8C9A0"/><path d="M0 39.5h120M60 0v20M0 20h120M100 20v20" stroke="#D9B588" stroke-width="2"/></pattern><radialGradient id="lamp"><stop offset="0" stop-color="#FFE7A8" stop-opacity=".55"/><stop offset="1" stop-color="#FFE7A8" stop-opacity="0"/></radialGradient></defs>
      <rect width="1340" height="520" fill="url(#plk)"/>
      <rect x="430" y="250" width="480" height="40" rx="20" fill="#C0533A" opacity=".18"/>
      <g><rect x="0" y="0" width="1340" height="34" fill="#7A4B2E"/><rect x="40" y="34" width="300" height="16" rx="6" fill="#5A3A22"/>${[70, 130, 190, 250, 310].map(x => `<circle cx="${x}" cy="66" r="13" fill="#2B1B12"/><circle cx="${x}" cy="66" r="8" fill="#C0533A"/>`).join('')}<rect x="1180" y="0" width="110" height="18" fill="#FFF1D9"/><text x="1235" y="13" class="sg">KITCHEN</text></g>
      ${T.map(table).join('')}
      ${plant(40, 480, 1.1)}${plant(1300, 470, 1)}${plant(1300, 80, .8)}
      ${T.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="120" fill="url(#lamp)"/>`).join('')}
      <g transform="translate(700 380)"><g class="bubble"><rect x="-92" y="-136" width="184" height="44" rx="14" fill="#fff"/><path d="M-8 -93l8 14 8-14z" fill="#fff"/><text x="0" y="-108" class="bb">Best coupon applied ✓</text></g></g>
      <g class="waiter"><g class="wk"><ellipse cx="0" cy="4" rx="22" ry="13" fill="#13233A"/><path d="M-6 -6h12l-2 14h-8z" fill="#fff"/><circle cx="0" cy="-2" r="10" fill="#D9A273"/><path d="M-10 -2a10 10 0 0 1 20 0c0-5-4-11-10-11s-10 6-10 11z" fill="#2B1B12"/><rect x="18" y="-14" width="30" height="22" rx="4" fill="#2B1B12"/><rect x="23" y="-11" width="20" height="16" rx="2" fill="#fff"/><path d="M26 -6h14M26 -2h10M26 2h12" stroke="#9AA3B2" stroke-width="1.6"/></g></g>
    </svg>`;
  }
  function edCleanup() {
    mmCleanup(); swCleanup(); tfCleanup(); soonCleanup();
    clearInterval(initED.fi); cancelAnimationFrame(initED.raf);
    if (initED.sc) csEl.removeEventListener('scroll', initED.sc); if (initED.rs) removeEventListener('resize', initED.rs); if (initED.kd) removeEventListener('keydown', initED.kd, true);
    initED.sc = initED.rs = initED.kd = null;
  }
  function initED() {
    edCleanup();
    const root = csEl, prog = $('#c3Prog', root), chEl = $('#c3Ch', root);
    const obs = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const t = e.target; t.classList.add('in'); if (t.classList.contains('hl')) t.classList.add('on'); $$('.hl', t).forEach(h => h.classList.add('on')); obs.unobserve(t); }), { root, threshold: .2 });
    $$('[data-rv], .c3-p .hl', root).forEach(el => obs.observe(el));
    const comic = $('#c3Comic', root), panels = $$('.c3-panels figure', root), cap = $('#c3Cap', root);
    const fun = $('#c3Fun', root), scr = $$('.c3-scr', root), steps = $$('.c3-steps span', root), folk = $$('#c3Crowd i', root), nEl = $('#c3N', root), fn = $('#c3Fn', root);
    const chat = $('#c3Chat', root), msgs = $$('.c3-msg', root), typing = $('.c3-typing', root);
    const board = $('#c3Board', root), sn = $$('.c3-board .sn', root), five = $$('.c3-five div', root), bn = $('#c3Bn', root), bcap = $('#c3Bcap', root);
    const evo = $('#c3Evo', root), row = $('#c3Row', root), tabs = $$('[data-evo]', root), strip = $('#c3Strip', root);
    const mx = $('#c3Mx', root), mxPin = $('.c3-sketch', root), mxPaths = $$('.mx-lines path', root), bdgs = $$('.bdg', root), slots = $$('.c3-mx .slot', root), qs = $$('.c3-mx .q', root), mxCap = $('#c3MxCap', root);
    const scrubs = $$('[data-scrub]', root).map(el => ({ el, w: $$('span', el), n: -1 }));
    const chs = $$('[data-ch]', root);
    const S = { c: -1, f: -1, q: -1, b: '', e: -1, m: '' };
    const PHONE = innerWidth < 860;
    const prg = el => { if (PHONE) return el._p || 0; if (el.dataset.done) return 1; const r = el.getBoundingClientRect(); return clamp(-r.top / Math.max(1, r.height - vh)); };
    // a scene that has played to its end folds to one screen: scrolling back never replays or reverses it
    let evoPick = -1;
    const foldCS = () => { if (PHONE) return; [comic, fun, chat, board, mx, evo].forEach(el => { if (el.dataset.done) return; const r = el.getBoundingClientRect(); if (r.bottom > root.clientHeight + 2) return;
      const before = r.height; el.dataset.done = 1; el.style.height = '100vh'; el.style.height = '100svh'; root.scrollTop -= before - el.offsetHeight; }); };
    let ticking = false;
    function update() {
      ticking = false; foldCS();
      const H = root.scrollHeight - root.clientHeight; prog.style.setProperty('--p', (root.scrollTop / Math.max(1, H) * 100).toFixed(2) + '%');
      let name = 'The story'; chs.forEach(c => { if (c.getBoundingClientRect().top < vh * .5) name = c.dataset.ch; }); if (chEl.textContent !== name) chEl.textContent = name;
      // big lines light up word by word as they cross the screen
      scrubs.forEach(s => { if (s.n >= s.w.length) return; if (!s.t0) { const r = s.el.getBoundingClientRect(); if (r.top > vh * .85 || r.bottom < 0) return; s.t0 = performance.now(); } const f = clamp((performance.now() - s.t0) / Math.max(900, s.w.length * 90)), k = Math.round(f * s.w.length); if (k !== s.n) { s.n = k; s.w.forEach((w, i) => w.classList.toggle('lit', i < k)); } });
      const c = Math.min(3, Math.floor(prg(comic) * 4.2)); if (c !== S.c) { S.c = c;
        panels.forEach((p, k) => { p.classList.toggle('on', k === c); p.classList.toggle('seen', k < c); });
        cap.innerHTML = `${ED.comic[c][1]}<small>${ED.comic[c][2]}</small>`; }
      const f = Math.min(3, Math.floor(prg(fun) * 4.3)); if (f !== S.f) { S.f = f;
        scr.forEach((s2, k) => s2.classList.toggle('on', k === f)); steps.forEach((s2, k) => { s2.classList.toggle('on', k <= f); s2.classList.toggle('cur', k === f); });
        folk.forEach(p => p.classList.toggle('gone', +p.dataset.g <= f)); nEl.textContent = [100, 84, 50, 36][f]; fn.textContent = ED.stages[f][1]; }
      const q = Math.min(msgs.length, 1 + Math.floor(prg(chat) * (msgs.length + .3))); if (q !== S.q) { S.q = q;
        msgs.forEach((m, k) => m.classList.toggle('on', k < q)); typing.style.visibility = q < msgs.length ? 'visible' : 'hidden'; }
      const bp = prg(board), col = ss(clamp(bp / .22)), bi = bp < .26 ? -1 : Math.min(4, Math.floor((bp - .26) / .74 * 5));
      sn.forEach((n, k) => { n.style.opacity = (1 - clamp(col * 1.4 - (k % 7) * .05)).toFixed(3); n.style.transform = `rotate(${n.style.getPropertyValue('--r')}) scale(${(1 - col * .5).toFixed(3)})`; });
      const key = (col > .6) + '|' + bi; if (key !== S.b) { S.b = key;
        five.forEach((d, k) => { d.classList.toggle('in', col > .6); d.classList.toggle('on', k === bi); });
        bn.textContent = col > .6 ? '5 problems' : '40+ notes';
        bcap.innerHTML = bi < 0 ? `<p>${col > .6 ? 'Five problems were left standing.' : 'Everything that was broken, on one board.'}</p>` : `<b>0${bi + 1} · ${ED.probs[bi][0]}</b><p>${ED.probs[bi][1]}</p>`; }
      // the sketch stays put; each app flies into its corner as you scroll
      const mp = prg(mx);
      if (mp > 0 || mx.getBoundingClientRect().top < vh) {
        const pr = mxPin.getBoundingClientRect(); let landed = 0;
        bdgs.forEach((b, i) => { const t = ss(clamp((mp - .08 - i * .14) / .22)), sl = slots[+b.dataset.slot].getBoundingClientRect(), twin = b.dataset.slot === '2' ? (i === 2 ? -30 : 30) : 0;
          const tx = sl.left + sl.width / 2 - pr.left + twin, ty = sl.top + sl.height / 2 - pr.top, sx = pr.width / 2 + (i - 2) * 70, sy = pr.height + 80;
          const x = sx + (tx - sx) * t, y = sy + (ty - sy) * t - Math.sin(Math.PI * t) * 90;
          b.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%) rotate(${((1 - t) * (i % 2 ? 25 : -25)).toFixed(1)}deg) scale(${(.6 + .4 * t).toFixed(3)})`;
          b.style.opacity = t > 0 ? 1 : 0; if (t >= 1) landed |= 1 << +b.dataset.slot; });
        const m = landed === 15 ? 'And one app made it to the top right.' : ''; if (m !== S.m) { S.m = m; mxCap.textContent = m; }
      }
      const ep = prg(evo), n = tabs.length, et = ep * (n - 1), e0 = Math.min(n - 2, Math.floor(et)), ex = evoPick >= 0 ? evoPick : e0 + ss(clamp((et - e0 - .35) / .45));
      if (!PHONE) row.style.transform = `translate3d(${(-ex * root.clientWidth).toFixed(1)}px, 0, 0)`;
      const ei = Math.round(ex); if (ei !== S.e) { S.e = ei; tabs.forEach((t, k) => t.classList.toggle('on', k === ei)); }
      const sr = strip.getBoundingClientRect(); if (!PHONE && sr.bottom > 0 && sr.top < vh) strip.style.transform = `translate3d(${(-(1 - (sr.top + sr.height) / (vh + sr.height)) * Math.max(0, strip.scrollWidth - root.clientWidth)).toFixed(1)}px, 0, 0)`;
    }
    root.addEventListener('scroll', initED.sc = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    // phones: each scene is one screen with Back / Next, nothing scrubs with the scroll
    if (PHONE) {
      // phones: no step carousels. Each scene is one screen you tap, or a simple button
      const L = msgs.length;
      const tw = (el, to, ms = 700) => { const from = el._p || 0, t0 = performance.now(); const f = now => { const k = Math.min(1, (now - t0) / ms); el._p = from + (to - from) * ss(k); update(); if (k < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); };
      const btn = (lab, cls = '') => { const b = document.createElement('button'); b.type = 'button'; b.className = 'c3-pb ' + cls; b.textContent = lab; return b; };
      [comic, fun, chat, board, mx].forEach(el => { el.style.height = '100svh'; el._p = 0; });
      // 1 · the comic: tap a panel to play it
      panels.forEach((p, k) => { p.style.cursor = 'pointer'; p.addEventListener('click', () => { comic._p = (k + .01) / 4.2; update(); }); });
      comic._p = .001;
      // 2 · the 100 diners: small arrows beside the phone
      const fnav = document.createElement('div'); fnav.className = 'c3-fnav';
      fnav.innerHTML = '<button type="button" data-d="-1" aria-label="Previous step" disabled>‹</button><button type="button" data-d="1" aria-label="Next step">›</button>';
      $('.c3-phone', fun).after(fnav); let fi = 0;
      fnav.addEventListener('click', e => { const b = e.target.closest('[data-d]'); if (!b) return; fi = Math.max(0, Math.min(3, fi + +b.dataset.d)); fun._p = (fi + .01) / 4.3; update(); fnav.children[0].disabled = fi === 0; fnav.children[1].disabled = fi === 3; });
      // 3 · the quotes: one Next button, no dots
      chat._p = .01; const nq = btn('Next quote →', 'in'); $('.c3-msgs', chat).append(nq); let qi = 1;
      nq.addEventListener('click', () => { qi = Math.min(L, qi + 1); chat._p = (qi - .99) / (L + .3); update(); if (qi >= L) nq.hidden = true; });
      // 4 · the whiteboard: one button reveals the five problems; tap any to read it
      const tb = btn('See the top 5 problems'); $('.c3-board', board).after(tb);
      tb.addEventListener('click', () => { tw(board, .26 + .5 / 5 * .74, 900); tb.hidden = true; });
      five.forEach((d, k) => { d.style.cursor = 'pointer'; d.addEventListener('click', () => { if (!tb.hidden) return; board._p = .26 + (k + .5) / 5 * .74; update(); }); });
      // 6 · the matrix: one button drops every app into place
      const mb = btn('Mark the apps'); $('.c3-sketch', mx).appendChild(mb);
      mb.addEventListener('click', () => { tw(mx, 1, 1600); mb.hidden = true; });
      // 7 · iterations: all four rounds stacked, read them as you scroll
      evo.style.height = 'auto'; evoPick = 0;
      // 8 · the upfront coupon screens: 2 × 2
      const bo = $('.c3-booster img', root); if (bo) { const g = document.createElement('div'); g.className = 'c3-b2'; g.innerHTML = [0, 1, 2, 3].map(k => `<span style="--k:${k}"><img src="${bo.currentSrc || bo.src}" alt="${bo.alt}" data-z="${bo.dataset.z || ''}" ${bo.dataset.hi ? `data-hi="${bo.dataset.hi}"` : ''}></span>`).join(''); bo.replaceWith(g); }
    }
    // checkout paths
    const flow = $('#c3Flow', root); let pathI = 0, vert = null;
    const drawFlow = () => {};
    const showPath = i => { pathI = i; $('#c3Pv', root).innerHTML = edPathView(ED.paths[i]); $$('[data-path]', root).forEach((x, k) => x.classList.toggle('on', k === i)); };
    $$('[data-path]', root).forEach(b => b.addEventListener('click', () => showPath(+b.dataset.path)));
    showPath(0);
    let t0 = performance.now();
    const dotLoop = now => { initED.raf = requestAnimationFrame(dotLoop); const r = flow.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      const route = $('#c3Route', flow), dot = $('#c3Dot', flow); if (!route || !dot) return; const L = route.getTotalLength(), u = ((now - t0) / 3200) % 1, p = route.getPointAtLength(L * ss(u)); dot.setAttribute('cx', p.x); dot.setAttribute('cy', p.y); };
    // headings stay on one line on wide screens: shrink any that would overflow
    const fitHeads = () => $$('.c3-h', root).forEach(h => { h.style.fontSize = ''; if (getComputedStyle(h).whiteSpace !== 'nowrap') return; const r = h.clientWidth / h.scrollWidth; if (r < 1) h.style.fontSize = (parseFloat(getComputedStyle(h).fontSize) * r * .97).toFixed(1) + 'px'; });
    document.fonts && document.fonts.ready.then(fitHeads);
    const fitW = () => { root.style.setProperty('--cw', root.clientWidth + 'px'); if ((root.clientWidth < 700) !== vert) drawFlow(); fitHeads(); update(); }; addEventListener('resize', initED.rs = fitW);
    fitW();
    tabs.forEach(t => t.addEventListener('click', () => { if (evo.dataset.done) { evoPick = +t.dataset.evo; row.style.transition = 'transform .7s cubic-bezier(.22,1,.36,1)'; update(); return; } const r = evo.getBoundingClientRect(); root.scrollTo({ top: root.scrollTop + r.top + (r.height - vh) * (+t.dataset.evo / (tabs.length - 1)), behavior: 'smooth' }); }));
    // the axis card
    const ax = $('#c3Axis', root), num = $$('#c3Num span', root), hint = $('#c3Hint', root), off = $('#c3Off', root);
    ax.addEventListener('input', () => { const v = ax.value.replace(/\D/g, '').slice(0, 8); ax.value = v;
      num[0].textContent = (v.slice(0, 4) + '••••').slice(0, 4); num[1].textContent = (v.slice(4, 8) + '••••').slice(0, 4);
      num[0].classList.toggle('f', v.length > 0); num[1].classList.toggle('f', v.length > 4);
      const ok = v.length === 8; off.classList.toggle('on', ok);
      hint.textContent = ok ? 'Card found. Only the offers that apply to it:' : v.length ? `${8 - v.length} more to go…` : 'Type any 8 digits.'; });
    // before / after: the one-tap best coupon
    const demo = $('#c3Demo', root), apply = $('#c3Apply', root), dcap = $('#c3Dcap', root);
    const setApplied = on => { demo.classList.toggle('applied', on); apply.textContent = on ? 'Remove' : 'Apply'; $('#c3Pay', root).textContent = on ? '₹2,067' : '₹2,810'; $('#c3Tot', root).textContent = on ? '₹2,067' : '₹2,810';
      if (on) { const cf = $('#c3Conf', root); cf.classList.remove('go'); void cf.offsetWidth; cf.classList.add('go'); } dcap.textContent = on ? 'Done in one tap. That’s ₹743 saved, without opening a single list.' : 'One tap. The best saving for your payment method is already there.'; };
    apply.addEventListener('click', () => setApplied(!demo.classList.contains('applied')));
    $('#c3Tray', root).addEventListener('click', () => { const t = $('#c3Toast', root); t.classList.remove('on'); void t.offsetWidth; t.classList.add('on'); });
    $$('button[data-mode]', root).forEach(b => b.addEventListener('click', () => { $$('button[data-mode]', root).forEach(x => x.classList.toggle('on', x === b)); demo.dataset.mode = b.dataset.mode; setApplied(false);
      dcap.textContent = b.dataset.mode === 'before' ? 'Before: the best deal was hidden somewhere inside 50+ offers. Tap the tray and see.' : 'One tap. The best saving for your payment method is already there.'; }));
    // results: flip between before and after
    const res = $('#c3Res', root), rcs = $$('.c3-rc[data-a]', root);
    const countTo = (el, from, to, fmt) => { const t0 = performance.now(); const tick = n => { const f = Math.min(1, (n - t0) / 900), e = 1 - Math.pow(1 - f, 3); el.textContent = fmt(from + (to - from) * e); if (f < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
    let resAfter = null;
    const setRes = after => { if (after === resAfter) return; const was = resAfter; resAfter = after;
      $$('[data-res]', root).forEach(x => x.classList.toggle('on', +x.dataset.res === +after)); res.classList.toggle('after', after);
      rcs.forEach(rc => { const k = +(after ? rc.dataset.a : rc.dataset.b), k0 = +(after ? rc.dataset.b : rc.dataset.a); $$('.c3-dots i', rc).forEach((d, i) => d.classList.toggle('lit', i < k));
        const rv = $('.rv', rc), a = +rv.dataset.to, b = +rv.dataset.from;
        if (was === null) { rv.textContent = (after ? a : b) + '%'; $('.rn', rc).textContent = k; }
        else { countTo(rv, after ? b : a, after ? a : b, v => (Math.round(v * 10) / 10) + '%'); countTo($('.rn', rc), k0, k, v => Math.round(v)); }
        const sm = $('.rf small', rc); sm.textContent = after ? sm.dataset.a : sm.dataset.b; });
      $$('[data-b][data-a]', $('.c3-rc.tray', root)).forEach(el => el.textContent = after ? el.dataset.a : el.dataset.b); };
    $$('[data-res]', root).forEach(b => b.addEventListener('click', () => setRes(b.dataset.res === '1')));
    setRes(false);
    new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { o.disconnect(); setTimeout(() => setRes(true), 900); } }), { root, threshold: .35 }).observe(res);
    // the bill flips over
    const bill = $('#c3Bill', root); bill.addEventListener('click', () => bill.classList.toggle('flipped'));
    // the footer restaurant
    $('#c3Scene', root).innerHTML = edScene();
    // tap any screen to zoom in
    const lb = $('#c3Lb', root), lbImg = $('img', lb), lbCap = $('figcaption', lb); let group = [], gi = 0;
    const show = i => { gi = (i + group.length) % group.length; const im = group[gi]; lbImg.src = im.dataset.hi || im.src; lbImg.alt = im.alt; lbCap.textContent = im.alt + (group.length > 1 ? ` · ${gi + 1} of ${group.length}` : ''); lb.classList.toggle('one', group.length < 2); };
    const openLb = im => { group = $$(`img[data-z="${im.dataset.z}"]`, root); show(group.indexOf(im)); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); };
    const closeLb = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); };
    root.addEventListener('click', e => { const im = e.target.closest('img[data-z]'); if (im && !lb.contains(im)) openLb(im); });
    false && $('#c3FullFlow', root).addEventListener('click', () => { group = [{ dataset: { hi: 'v2/cs/hi/ed-flow.webp' }, src: cimg('flow'), alt: 'The full coupon flow' }]; show(0); lb.classList.add('open'); });
    lb.addEventListener('click', e => { if (e.target.closest('.lb-n')) show(gi + 1); else if (e.target.closest('.lb-p')) show(gi - 1); else if (!e.target.closest('img')) closeLb(); });
    let sx0 = null; lb.addEventListener('touchstart', e => { sx0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => { if (sx0 == null) return; const dx = e.changedTouches[0].clientX - sx0; if (Math.abs(dx) > 50) show(gi + (dx < 0 ? 1 : -1)); sx0 = null; });
    addEventListener('keydown', initED.kd = e => { if (!lb.classList.contains('open')) return; if (e.key === 'Escape') { closeLb(); e.stopImmediatePropagation(); } else if (e.key === 'ArrowRight') show(gi + 1); else if (e.key === 'ArrowLeft') show(gi - 1); }, true);
  }
  // ---------- Wayfinder: Special Requests, told as a stay at a hotel ----------
  const mi = n => `v2/mm/${n}.webp`;
  const MM = {
    svc: [['🌙', 'Late check-in', 'Noted! Your room will be ready whenever you arrive.'], ['🌅', 'Early check-in', 'Done. We’ll have your room ready early.'], ['🛏️', 'Extra bed', 'An extra bed will be set up before you arrive.'],
      ['🚕', 'Airport pickup', 'Your driver will be waiting at arrivals.'], ['🎂', 'Birthday surprise', 'Leave it to us. A little surprise is planned.'], ['🏙️', 'Higher floor', 'We’ve set aside a room with a view for you.']],
    probs: [['🛎️', 'Guests had special needs', 'Many travellers wanted to ask for late check-ins, extra beds, or even small surprises like birthday arrangements.'],
      ['🫣', 'The request flow was hidden', 'The option to add special requests was buried deep in the booking journey, so very few people even discovered it.'],
      ['⛔', 'No confirmation from hotels', 'Even when requests were made, guests didn’t receive any acknowledgment, so they never knew if the hotel had received or acted on them.'],
      ['📋', 'One long list of requests', 'All types of requests were shown together in a single list, which made it harder for guests to quickly pick what they actually needed.']],
    mmt: ['Seamless in-app requests, no calls needed', 'Quick acknowledgment builds guest trust', 'A personal touch drives loyalty', 'A smooth flow boosts booking conversions'],
    htl: ['Manage requests through the MMT CMS', 'Turn requests on or off', 'Every chat in one place, inside Myra', 'Better visibility, more efficient staff'],
    issues: [['No clear entry point', 'There was no dedicated CTA, which reduced visibility and led to low adoption.'],
      ['Choice overload', 'Once inside the flow, every request was shown together, creating decision fatigue.'],
      ['No home for one-off needs', 'There was no separate space for occasional or one-off requests.'],
      ['No tracking, no transparency', 'Guests couldn’t see their request’s progress.']],
    stats: [[16, 'found Special Requests', 'Awareness gap', 'Only 16% of guests (30% of premium guests) ever accessed Special Requests. It was free, but nobody could find it.', '#F5B83D'],
      [84, 'dropped off mid-flow', 'High drop-offs', '84% left halfway through, from confusion, effort, or not knowing where to place a request. So they called the hotel instead.', '#E4262C'],
      [80, 'placed just one request', 'Lost potential', 'With 80% using just one request, chances for personalisation, upsell and deeper engagement were missed.', '#3D8BF2'],
      [16, 'heard back from the hotel', 'No communication', 'Only 16% of guests ever got an update on their request, and hotels struggled to manage and respond to them.', '#2FA36B']],
    comps: [['cleartrip', 'Cleartrip', 'Categorises the different types of requests.'], ['ixigo', 'Ixigo', 'A dedicated CTA to enter the special requests funnel.'],
      ['swiggy', 'Swiggy', 'Solves issues upfront with chips, so there are fewer clicks.'], ['zomato', 'Zomato', 'A checklist, similar to MMT’s, to list the options for a product.']],
    its: [['Top requests, upfront', 'Show the three most-used requests right on the review page.', ['Quick access to the top three'], ['The card got taller and pushed down important review-page content'], ['it1']],
      ['A separate “custom request” button', 'Typing straight into the card caused keyboard overlap and a bloated card, so custom requests got their own CTA.', ['No more keyboard overlap', 'Standard and custom requests, kept apart'], ['Two ways in confused guests: some typed common requests into the custom box', 'Custom requests sat an extra tap away, so fewer guests found them'], ['it3']],
      ['Every request in one scrolling row', 'Put all requests in a horizontal row, so guests could browse them.', [], ['Guests didn’t scroll, so most options stayed hidden'], ['it2']],
      ['A checklist', 'A list with checkboxes, inspired by Zomato.', ['Standard requests were easy to see'], ['The card got taller again', 'It couldn’t handle second-level choices, like picking a time'], ['it4']],
      ['Tabs for second-level choices', 'Tabs and icons for choices like a check-in time.', [], ['Too many tabs and icons to process', 'Big tabs meant sideways scrolling', 'New requests would need new icons'], ['l2-1', 'l2-2', 'l2-3']],
      ['Shipped', 'Each try sharpened the card: easy to find, reliable, and lean enough to scan in a glance.', ['🎯 A precise list', '⏱️ Quicker decisions', '💡 Less time spent'], [], ['ui01']]],
    floors: [['Entry points', 'Guests can discover and start adding requests from every relevant touchpoint.', ['ui01', 'ui02', 'ui03', 'ui04']],
      ['Placing a request', 'Adding special requests is now quicker, clearer and more intuitive.', ['n3', 'n4', 'ui05', 'ui06', 'ui07', 'ui08']],
      ['Custom request field', 'Guests can type specific needs beyond the predefined options.', ['n2', 'ui09', 'ui10', 'ui11', 'ui12', 'ui13']],
      ['Chat with hotelier', 'A new chat, so requests and questions get resolved with the hotel team instantly.', ['n1', 'ui14', 'ui15', 'ui16', 'ui17', 'ui18'], 'New'],
      ['Desktop', 'The redesign, extended to desktop for one seamless experience across platforms.', ['desk1', 'desk2']]],
    board: [['16%', '25%', 'Guests reaching Special Requests', 'More guests now find and use it: funnel access jumped from 16% to 25% within two weeks, a 56% rise.'],
      ['20/80', '80/20', 'Multiple vs single requests', 'Guests now place several requests per booking. The split flipped from 20/80 to 80/20.'],
      ['16%', '35%', 'Hotel response rate', 'Up 120%, as Chat with Hotelier gave hotels a faster, direct way to reply and manage requests.'],
      ['', '2,800+', 'Hotels on the new funnel', 'Stronger engagement and adoption, even with a smaller rollout than the earlier 5,000-hotel coverage.'],
      ['', '4,500+', 'Bookings a day use it', 'Special Requests is now part of how people regularly book.']]
  };
  // a placeholder phone for each issue in the old flow
  const mmWire = i => {
    const bar = (w, c = '') => `<i class="wb ${c}" style="width:${w}%"></i>`;
    if (i === 0) return `<div class="wf">${bar(60, 'h')}${bar(90)}${bar(80)}<div class="wc">${bar(70)}${bar(50)}</div><div class="wc">${bar(85)}${bar(40)}</div>${bar(75)}<div class="wq"><span>Make a special request?</span><em>🔍</em></div><i class="wcta"></i></div>`;
    if (i === 1) return `<div class="wf">${bar(45, 'h')}<div class="wlong">${Array.from({ length: 18 }, (_, k) => `<span class="wrow"><i class="cb"></i>${bar(35 + (k * 23) % 50)}</span>`).join('')}</div><div class="wmore">+ 20 more, all in one list</div></div>`;
    if (i === 2) return `<div class="wf">${bar(50, 'h')}${[0, 1, 2, 3].map(k => `<span class="wrow"><i class="cb"></i>${bar(55 - k * 6)}</span>`).join('')}<div class="wbub">🎂 A birthday cake?</div><div class="wnope">no place for this</div></div>`;
    return `<div class="wf">${bar(55, 'h')}<div class="wsent"><b>Request sent</b>${bar(70)}<span class="wst">Status <em>?</em></span></div>${bar(80)}${bar(65)}<div class="wdots"><i></i><i></i><i></i></div></div>`;
  };
  // the footer: a bellboy wheels the luggage down the hotel corridor
  const mmHall = () => {
    const door = (x, n) => `<g transform="translate(${x} 0)"><rect x="0" y="96" width="120" height="196" rx="4" fill="#7A4A2C"/><rect x="10" y="106" width="100" height="186" rx="3" fill="#8E5A36"/><rect x="20" y="118" width="80" height="70" rx="3" fill="none" stroke="#6E4127" stroke-width="3"/><rect x="20" y="200" width="80" height="80" rx="3" fill="none" stroke="#6E4127" stroke-width="3"/><circle cx="94" cy="196" r="5" fill="#E8C060"/><rect x="38" y="72" width="44" height="18" rx="4" fill="#E8C060"/><text x="60" y="86" text-anchor="middle" class="hn">${n}</text></g>`;
    const lamp = x => `<g transform="translate(${x} 0)"><circle cx="0" cy="130" r="90" fill="url(#mmGlow)"/><rect x="-4" y="116" width="8" height="26" rx="3" fill="#B8862E"/><path d="M-16 112h32l-6-22h-20z" fill="#FFE7B0"/></g>`;
    const plant = x => `<g transform="translate(${x} 0)"><path d="M-22 292l6-40h32l6 40z" fill="#C0533A"/><path d="M0 252c-30-10-40-50-24-70 6 18 14 30 24 40 4-30 14-50 30-56 4 30-8 60-30 86z" fill="#3E7D4A"/><path d="M0 252c10-26 30-40 50-40-8 24-26 38-50 40z" fill="#4E9A5A"/></g>`;
    return `<svg viewBox="0 0 1600 360" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs><radialGradient id="mmGlow"><stop offset="0" stop-color="#FFE3A3" stop-opacity=".55"/><stop offset="1" stop-color="#FFE3A3" stop-opacity="0"/></radialGradient>
      <pattern id="mmPaper" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#F3E3C6"/><path d="M20 0v40" stroke="#E9D3AE" stroke-width="10"/><circle cx="20" cy="20" r="3" fill="#D9BC88"/></pattern></defs>
      <rect class="wall" width="1600" height="300" fill="url(#mmPaper)"/><rect y="226" width="1600" height="66" fill="#E2C89C"/><rect y="222" width="1600" height="6" fill="#C9A26A"/>
      ${lamp(100)}${door(180, 201)}${lamp(420)}${door(500, 202)}${plant(740)}${lamp(820)}${door(900, 203)}${lamp(1140)}${door(1220, 204)}${plant(1460)}${lamp(1520)}
      <rect y="292" width="1600" height="68" fill="#8C5A35"/><rect y="300" width="1600" height="44" fill="#A8323A"/><rect y="304" width="1600" height="3" fill="#E8C060"/><rect y="337" width="1600" height="3" fill="#E8C060"/>
      <g class="bb"><g class="bb-in">
        <g class="cart"><rect x="70" y="200" width="150" height="8" rx="4" fill="#C9962E"/><path d="M80 208v66M210 208v66" stroke="#C9962E" stroke-width="6"/><rect x="70" y="270" width="150" height="8" rx="4" fill="#C9962E"/><path d="M72 200c0-60 20-90 73-90s73 30 73 90" fill="none" stroke="#C9962E" stroke-width="6"/>
          <rect x="88" y="158" width="66" height="42" rx="6" fill="#2F5D96"/><rect x="88" y="174" width="66" height="5" fill="#244A78"/><rect x="146" y="130" width="58" height="70" rx="7" fill="#C0533A"/><rect x="164" y="122" width="22" height="10" rx="4" fill="none" stroke="#7A2E20" stroke-width="4"/><rect x="96" y="214" width="110" height="52" rx="6" fill="#E9B44C"/><path d="M110 214v52M192 214v52" stroke="#C99632" stroke-width="4"/>
          <circle class="wh" cx="90" cy="290" r="11" fill="#2B2B2B"/><circle class="wh" cx="200" cy="290" r="11" fill="#2B2B2B"/><circle cx="90" cy="290" r="4" fill="#C9962E"/><circle cx="200" cy="290" r="4" fill="#C9962E"/></g>
        <g class="boy"><g class="lg l1"><path d="M28 226l-6 64" stroke="#2B2E3A" stroke-width="13" stroke-linecap="round"/><ellipse cx="22" cy="294" rx="13" ry="6" fill="#1A1A1A"/></g><g class="lg l2"><path d="M40 226l8 64" stroke="#353949" stroke-width="13" stroke-linecap="round"/><ellipse cx="50" cy="294" rx="13" ry="6" fill="#1A1A1A"/></g>
          <path d="M14 162c0-12 10-20 22-20s24 8 24 20l2 70H12z" fill="#C8202A"/><path d="M36 144v86" stroke="#E8C060" stroke-width="3" stroke-dasharray="4 8"/><path d="M58 172c8 8 14 14 22 20" stroke="#C8202A" stroke-width="12" stroke-linecap="round"/><circle cx="82" cy="194" r="6" fill="#E9B07E"/>
          <circle cx="36" cy="126" r="17" fill="#E9B07E"/><path d="M20 118c2-12 30-14 34 0" fill="#3A2416"/><rect x="22" y="100" width="28" height="14" rx="3" fill="#C8202A"/><rect x="20" y="110" width="32" height="5" rx="2" fill="#E8C060"/><circle cx="44" cy="126" r="2" fill="#2B1B12"/><path d="M40 134q4 3 8 0" stroke="#7A3A2A" stroke-width="2" fill="none" stroke-linecap="round"/></g>
      </g></g>
    </svg>`;
  };
  // ---- Special Requests hero: the guest's phone and the hotel's front desk ----
  const SR_I = {
    blanket: '<path d="M4 7.5h14.5a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H4z"/><path d="M4 11.5h16M8.5 7.5v10"/>',
    checkin: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4.2l2.8 1.8"/>',
    pickup: '<path d="M5 15.5V12l1.7-4.2A2 2 0 0 1 8.6 6.5h6.8a2 2 0 0 1 1.9 1.3L19 12v3.5"/><path d="M4 15.5h16v1.8a.7.7 0 0 1-.7.7H4.7a.7.7 0 0 1-.7-.7z"/>',
    custom: '<path d="M14.5 5.5l4 4L9 19H5v-4z"/><path d="M12.5 7.5l4 4"/>',
    check: '<path d="M5 12.5l4.2 4L19 7"/>', bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    inbox: '<path d="M4 13l2.5-7h11L20 13v5H4z"/><path d="M4 13h4.5l1 2h5l1-2H20"/>', bed: '<path d="M3 18v-8M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11.5" r="1.6"/>',
    chart: '<path d="M5 19V9M12 19V5M19 19v-7"/>', chat: '<path d="M5 18.5l1.2-3.6A7 7 0 1 1 9.2 18.4z"/>' };
  const srSvg = (k, cls = '') => `<svg viewBox="0 0 24 24" class="${cls}" aria-hidden="true">${SR_I[k]}</svg>`;
  const SR_ROWS = [['blanket', 'Extra blankets', 'Brought to your room', '#FFF4ED', '#E8590C'], ['checkin', 'Early check-in', 'Pick a time', '#EFF8FF', '#1570EF'],
    ['pickup', 'Airport pickup', 'From the terminal', '#ECFDF3', '#079455'], ['custom', 'Something else', 'Write to the hotel', '#F4F3FF', '#6938EF']];
  const SR_STORY = {
    blanket: { title: 'Extra blankets × 2', desk: 'Extra blankets × 2', who: 'Ananya R.', team: 'Housekeeping', s3: 'On its way', s3s: 'About 8 min', tok: 'Extra blankets × 2', s4: 'Delivered to room 204', done: 'Delivered. No calls, no waiting on hold.' },
    checkin: { title: 'Early check-in at 11:00', desk: 'Early check-in · 11:00', who: 'Ananya R.', team: 'Front desk', s3: 'Room being prepared', s3s: 'Ready by 11:00', tok: 'Early check-in · 11:00', s4: 'Confirmed for 11:00', done: 'You’re all set. Check in at 11:00.' },
    custom: { title: 'A small anniversary cake', desk: '“It’s our anniversary. Could…”', who: 'Ananya R.', team: 'Kitchen', s3: 'Being arranged', s3s: 'Tonight, 8 PM', tok: 'Anniversary cake', s4: 'Arranged for 8 PM', done: 'The hotel has it covered. Happy anniversary.', text: 'It’s our anniversary. Could you arrange a small cake tonight?' } };
  const SR_SEED = [['412', 'Airport drop · 6:30 AM', 'Rohan M. · Concierge', 'prog', 'In progress'], ['118', 'Late checkout · 1 PM', 'Kavya S. · Front desk', 'done', 'Done'], ['305', 'Baby cot', 'Meera & Arjun · Housekeeping', 'done', 'Done']];
  function srHTML() {
    const row = ([k, t, d, bg, c]) => `<div class="sr-row" data-k="${k}" style="--t:${bg};--c:${c}"><span class="ic">${srSvg(k)}</span><span><b>${t}</b><small>${d}</small></span><span class="rd">${srSvg('check')}</span>
      ${k === 'checkin' ? '<div class="sr-more"><div class="sr-chips"><span>10:00</span><span>11:00</span><span>12:00</span><span>1 PM</span></div></div>' : ''}
      ${k === 'custom' ? '<div class="sr-more"><div class="sr-field"><span class="tx"></span><span class="ca"></span><span class="ph">Tell the hotel what you need…</span></div></div>' : ''}</div>`;
    const q = ([rm, t, who, s, l]) => `<div class="sr-q old"><span class="rm">${rm}</span><span><b>${t}</b><small>Room ${rm} · ${who}</small></span><span class="s ${s}">${l}</span></div>`;
    return `<div class="sr" id="srHero" role="img" aria-label="A guest asks for extra blankets on the Wayfinder app; the request lands at the hotel's front desk, gets accepted and is delivered, with the guest tracking it live.">
      <div class="sr-in">
        <div class="sr-tb"><div class="sr-scr">
          <div class="sr-top"><span class="lg">HV</span><span><b>Front desk</b><small>Hotel Valley · Special requests</small></span><span class="sp"></span><span class="sr-live">Live</span><span class="sr-av">PK</span></div>
          <div class="sr-nav"><i class="on">${srSvg('inbox')}<span class="dot"></span></i><i>${srSvg('bed')}</i><i>${srSvg('chat')}</i><i>${srSvg('chart')}</i></div>
          <div class="sr-main"><div class="sr-mh"><b>Guest requests</b><em class="n">3</em><span class="sp"></span><span class="on">All</span><span>New</span><span>In progress</span></div>
            <div class="sr-rows">${SR_SEED.map(q).join('')}</div>
            <div class="sr-toast">${srSvg('bell')}<span>New request · Room 204</span></div></div>
        </div></div>
        <div class="sr-ph"><div class="sr-scr">
          <span class="sr-isl"></span><div class="sr-sb"><span>9:41</span><span><s><b style="height:3px"></b><b style="height:5px"></b><b style="height:7px"></b><b style="height:9px"></b></s><i></i></span></div>
          <div class="sr-hd"><small>Hotel Valley · Room 204 · 12–14 Oct</small><h4>Special requests</h4>${srSvg('chat')}</div>
          <div class="sr-body">
            <div class="sr-list"><p class="sr-lab">Popular with guests</p>${SR_ROWS.map(row).join('')}</div>
            <div class="sr-st"><div class="sr-card"><span class="sr-pill">Request sent</span><h5 class="tt"></h5><small>Hotel Valley · Room 204</small>
              <ol class="sr-tl"><li>Sent to the hotel<small>Just now</small></li><li>Accepted by the <span class="tm"></span><small>Just now</small></li><li class="s3"><span class="l3"></span><small class="s3s"></small><div class="sr-bar"><i></i></div></li><li class="s4"></li></ol></div>
              <div class="sr-done">${srSvg('check')}<span class="dt"></span></div><p class="sr-nc">Track it here. No calls needed.</p></div>
            <div class="sr-cta">Send to hotel</div>
          </div><span class="sr-home"></span>
        </div></div>
        <svg class="sr-fx" aria-hidden="true"><path class="sr-arc"/></svg>
        <div class="sr-tok"><i>${srSvg('check')}</i><span></span></div><span class="sr-tap"></span>
      </div></div>`;
  }
  // later(fn, ms) is the page's cleanup-aware timer; returns nothing we need
  function srInit(wrap, track) {
    const $s = s => wrap.querySelector(s), $$s = s => [...wrap.querySelectorAll(s)], inner = $s('.sr-in');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let tids = []; const T = (ms, f) => { const id = setTimeout(f, ms); tids.push(id); track && track(id); };
    const clear = () => { tids.forEach(clearTimeout); tids = []; };
    // fit the fixed-size stage to the page
    let W = 1000, H = 560, sc = 1;
    const fit = () => { const narrow = wrap.clientWidth < 640; wrap.classList.toggle('narrow', narrow); W = narrow ? 420 : 1000; H = narrow ? 800 : 560;
      sc = wrap.clientWidth / W; inner.style.transform = `scale(${sc})`; wrap.style.height = Math.round(H * sc) + 'px'; $s('.sr-fx').setAttribute('viewBox', `0 0 ${W} ${H}`); };
    fit(); if (window.ResizeObserver) new ResizeObserver(fit).observe(wrap); else addEventListener('resize', fit);
    const pt = el => { const r = el.getBoundingClientRect(), R = inner.getBoundingClientRect(); return [(r.left - R.left + r.width / 2) / sc, (r.top - R.top + r.height / 2) / sc]; };
    const tap = el => { const [x, y] = pt(el), t = $s('.sr-tap'); t.style.left = x + 'px'; t.style.top = y + 'px'; t.classList.remove('go'); void t.offsetWidth; t.classList.add('go'); };
    const press = el => { el.classList.add('press'); T(160, () => el.classList.remove('press')); };
    const rowsEl = $s('.sr-rows'), cta = $s('.sr-cta'), count = $s('.sr-mh .n');
    const reset = () => { wrap.classList.remove('sent', 'ping', 'fly'); $$s('.sr-row').forEach(r => { r.classList.remove('on'); const m = r.querySelector('.sr-more'); if (m) m.style.height = '0px'; });
      $$s('.sr-chips span').forEach(c => c.classList.remove('on')); const f = $s('.sr-field'); if (f) { f.querySelector('.tx').textContent = ''; f.querySelector('.ph').style.display = ''; }
      cta.classList.remove('ok'); $$s('.sr-tl li').forEach(l => l.classList.remove('on', 'now')); $s('.sr-bar i').style.cssText = '--p:0%'; $s('.sr-done').classList.remove('on'); };
    const fly = (from, to, label) => {
      const ph = $s('.sr-ph').getBoundingClientRect(), R = inner.getBoundingClientRect(); let [x1, y1] = pt(from);
      if (W > 600) x1 = (ph.right - R.left) / sc + 4;  // leave from the phone's edge, not across its screen
      const [x2, y2] = to, top = Math.min(y1, y2) - (W > 600 ? 150 : 90);
      const d = `M ${x1} ${y1} C ${x1 + (x2 - x1) * .15} ${top}, ${x2 - (x2 - x1) * .25} ${top + 20}, ${x2} ${y2}`;
      const arc = $s('.sr-arc'), tok = $s('.sr-tok'); arc.setAttribute('d', d); tok.querySelector('span').textContent = label;
      const len = arc.getTotalLength(); arc.style.transition = 'none'; arc.style.strokeDasharray = `3 6`; arc.style.strokeDashoffset = 0;
      tok.style.transition = 'none'; tok.style.offsetPath = `path('${d}')`; tok.style.offsetDistance = '0%'; tok.style.opacity = '0'; tok.style.scale = '.6'; void tok.offsetWidth;
      wrap.classList.add('fly'); tok.style.transition = 'offset-distance .95s cubic-bezier(.65,0,.35,1), opacity .25s, scale .4s cubic-bezier(.34,1.56,.64,1)';
      tok.style.opacity = '1'; tok.style.scale = '1'; tok.style.offsetDistance = '100%';
      T(950, () => { tok.style.transition = 'opacity .3s, scale .3s'; tok.style.opacity = '0'; tok.style.scale = '.7'; wrap.classList.remove('fly'); }); };
    const addRow = s => { const el = document.createElement('div'); el.className = 'sr-q in fresh';
      el.innerHTML = `<span class="rm">204</span><span><b>${s.desk}</b><small>Room 204 · ${s.who} · just now</small></span><span class="acc">Accept</span>`;
      rowsEl.prepend(el); void el.offsetWidth; el.classList.remove('in'); count.textContent = rowsEl.children.length;
      const extra = [...rowsEl.children].slice(4); extra.forEach(x => { x.classList.add('in'); T(600, () => x.remove()); }); return el; };
    const story = (k, then) => {
      clear(); reset(); const s = SR_STORY[k], row = $s(`.sr-row[data-k="${k}"]`), more = row.querySelector('.sr-more'); let t = 450;
      $s('.tt').textContent = s.title; $s('.tm').textContent = s.team === 'Front desk' ? 'front desk' : s.team.toLowerCase() + ' team'; $s('.l3').textContent = s.s3; $s('.s3s').textContent = s.s3s; $s('.s4').textContent = s.s4; $s('.dt').textContent = s.done;
      T(t, () => tap(row)); T(t + 120, () => { row.classList.add('on'); cta.classList.add('ok'); });
      if (k === 'checkin') { T(t + 500, () => { more.style.height = '40px'; }); const chip = row.querySelectorAll('.sr-chips span')[1]; T(t + 1150, () => tap(chip)); T(t + 1270, () => chip.classList.add('on')); t += 1100; }
      if (k === 'custom') { T(t + 500, () => { more.style.height = '64px'; }); const tx = row.querySelector('.tx'), ph = row.querySelector('.ph');
        [...s.text].forEach((ch, i) => T(t + 950 + i * 38, () => { ph.style.display = 'none'; tx.textContent += ch; })); t += 950 + s.text.length * 38; }
      const S = t + 750;
      T(S, () => { tap(cta); press(cta); });
      let row2;
      T(S + 160, () => { const r = rowsEl.getBoundingClientRect(), R = inner.getBoundingClientRect(); fly(cta, [(r.left - R.left) / sc + 120, (r.top - R.top) / sc + 28], 'Room 204 · ' + s.tok); });
      T(S + 700, () => { wrap.classList.add('sent'); $s('.sr-tl li').classList.add('on'); });
      T(S + 1080, () => { row2 = addRow(s); wrap.classList.add('ping'); });
      T(S + 2100, () => { const a = row2.querySelector('.acc'); tap(a); press(a); });
      T(S + 2260, () => { const a = row2.querySelector('.acc'); a.outerHTML = `<span class="s prog">Accepted · ${s.team}</span>`; row2.classList.remove('fresh'); wrap.classList.remove('ping'); $$s('.sr-tl li')[1].classList.add('on'); });
      T(S + 2900, () => { $s('.sr-tl .s3').classList.add('now'); row2.querySelector('.s').textContent = s.s3; const b = $s('.sr-bar i'); b.style.transition = 'width 2.2s cubic-bezier(.4,0,.2,1)'; void b.offsetWidth; b.style.setProperty('--p', '100%'); });
      T(S + 5200, () => { const l3 = $s('.sr-tl .s3'); l3.classList.remove('now'); l3.classList.add('on'); $s('.sr-tl .s4').classList.add('on'); $s('.sr-done').classList.add('on');
        const st = row2.querySelector('.s'); st.className = 's done'; st.textContent = 'Done'; row2.classList.add('old'); });
      T(S + 7300, () => then && then()); };
    const ORDER = ['blanket', 'checkin', 'custom']; let n = 0;
    const loop = () => story(ORDER[n++ % ORDER.length], loop);
    $$s('.sr-row').forEach(r => r.addEventListener('click', () => { n = ORDER.indexOf(r.dataset.k) + 1; story(r.dataset.k, loop); }));
    if (reduce) { // a calm still: the blankets, delivered
      const s = SR_STORY.blanket; $s('.tt').textContent = s.title; $s('.tm').textContent = 'housekeeping team'; $s('.l3').textContent = s.s3; $s('.s3s').textContent = s.s3s; $s('.s4').textContent = s.s4; $s('.dt').textContent = s.done;
      wrap.classList.add('sent'); $$s('.sr-tl li').forEach(l => l.classList.add('on')); $s('.sr-bar i').style.setProperty('--p', '100%'); $s('.sr-done').classList.add('on'); return clear; }
    T(900, loop); return clear;
  }
  function mmHTML(w) {
    const Z = (n, a, g) => `<img src="${mi(n)}" alt="${a}" loading="lazy" data-mz="${g}">`;
    const plaque = (n, t) => `<p class="mm-pl" data-rv><span>Room ${String(n).padStart(2, '0')}</span>${t}</p>`;
    return `<div class="cs-bar mm-bar"><button class="cs-close" id="csClose" type="button"><span class="ar" aria-hidden="true">←</span>Back to the box</button><span class="mm-bk"><img src="${mi('logo')}" alt="Wayfinder"> Special Requests</span></div>
    <div class="mm">
      <header class="mm-hero" id="mmHero">
        <div class="mm-hw">
          <div class="mm-logo"><img src="${mi('logo')}" alt="Wayfinder"></div>
          <p class="mm-k">Special Requests · Product Design Intern</p>
          <h2 class="mm-t"><span class="ln"><span>Skip the calls.</span></span><span class="ln"><span><em>Make it special.</em></span></span></h2>
          <p class="mm-lead">Special Requests bridges the gap between what guests expect and what hotels deliver: a clear way to share your needs, and a way for hotels to act on them.</p>
          <ul class="mm-meta"><li><b>Role</b>Product Design Intern</li><li><b>Timeline</b>1.5 months</li><li><b>Live on</b>App and desktop</li></ul>
        </div>
        <div class="mm-demo">
          ${srHTML()}
          <p class="mm-dcap" id="mmDcap">One tap from the guest. The hotel sees it, accepts it, and the guest tracks it live.</p>
        </div>
      </header>

      <section class="mm-sec" id="mmProb">
        ${plaque(1, 'The problem')}
        <h3 class="mm-h" data-rv>Guests wanted things.<br>The app made it hard to ask.</h3>
        <div class="mm-rack" data-rv>${MM.probs.map(([e, t, d], i) => `<div class="mm-key" style="--i:${i}"><span class="mm-ring2"></span><span class="mm-fob"><b>${101 + i}</b><i>${e}</i></span><span class="mm-kc"><b>${t}</b><span>${d}</span></span></div>`).join('')}</div>
      </section>

      <section class="mm-sec" id="mmDesk">
        ${plaque(2, 'Business objective')}
        <h3 class="mm-h" data-rv>Two sides of the front desk.<br>One sweet spot.</h3>
        <div class="mm-blds" data-rv>
          <div class="mm-b mmt"><div class="bsign"><img src="${mi('logo')}" alt="Wayfinder"></div><div class="bbody"><p class="btag">Wayfinder’s office</p>${MM.mmt.map((t, i) => `<div class="bfl" style="--d:${3 - i}"><i></i><span>${t}</span><i></i></div>`).join('')}<div class="bdoor"></div></div></div>
          <div class="mm-link"><span class="lk-l"></span><div class="lk-c"><span class="lk-bell">🛎️</span><b>Special Requests</b><small>connects the two</small></div><span class="lk-l"></span></div>
          <div class="mm-b htl"><div class="bsign"><img src="${mi('hotel')}" alt=""><span>HOTEL</span></div><div class="bbody"><p class="btag">The hotel</p>${MM.htl.map((t, i) => `<div class="bfl" style="--d:${3 - i}"><i></i><span>${t}</span><i></i></div>`).join('')}<div class="bdoor"></div></div></div>
        </div>
      </section>

      <section class="mm-sec" id="mmAudit">
        ${plaque(3, 'Current design issues')}
        <h3 class="mm-h" data-rv>What was getting in the way.</h3>
        <div class="mm-wires">${MM.issues.map(([t, d], i) => `<div class="mm-wire" data-rv style="--i:${i}"><div class="mm-wph">${mmWire(i)}</div><div class="mm-wt"><span>${i + 1}</span><b>${t}</b><p>${d}</p></div></div>`).join('')}</div>
      </section>

      <section class="mm-sec mm-fsec" id="mmFac">
        ${plaque(4, 'User metrics')}
        <h3 class="mm-h" data-rv>Picture 100 guests checking in.</h3>
        <div class="mm-tabs" role="tablist" data-rv>${MM.stats.map(([n, t], i) => `<button type="button" role="tab" data-s="${i}" style="--sc:${MM.stats[i][4]}"><b>${n}%</b><span>${t}</span></button>`).join('')}</div>
        <div class="mm-fac" data-rv>
          <div class="mm-bld" aria-hidden="true"><div class="mm-sign">HOTEL</div><div class="mm-win" id="mmWin">${'<i></i>'.repeat(100)}</div><div class="mm-door"></div></div>
          <div class="mm-sd" id="mmSd"></div>
        </div>
      </section>

      <section class="mm-sec" id="mmComp">
        ${plaque(5, 'Competitor analysis')}
        <h3 class="mm-h" data-rv>What the neighbours got right.</h3>
        <div class="mm-tags">${MM.comps.map(([k, n, d], i) => `<button type="button" class="mm-tag" style="--i:${i}" data-rv><span class="mm-tin"><span class="f"><img src="${mi('lg-' + k)}" alt=""><b>${n}</b><small>Flip me</small></span><span class="b"><b>${n}</b><span>${d}</span></span></span></button>`).join('')}</div>
        <figure class="mm-cimg" data-rv>${Z('comp', 'How Swiggy, Zomato and other apps handle notes and special requests', 'comp')}</figure>
      </section>

      <section class="mm-sec" id="mmIt">
        ${plaque(6, 'Iterations and feedback')}
        <h3 class="mm-h" data-rv>Five tries to get the card right.</h3>
        <p class="mm-p" data-rv>The goal: a card on the review page that’s easy to find, easy to use, and small enough not to push everything else down.</p>
        <div class="mm-trw"><div class="mm-tr" data-rv data-v="0">
          <ol class="mm-trk">${MM.its.map(([t], i) => `<li><button type="button" data-v="${i}" aria-label="${i < 5 ? 'Try ' + (i + 1) : 'Shipped'}: ${t}"><i>${i < 5 ? i + 1 : '✓'}</i><span>${i < 5 ? 'Try ' + (i + 1) : 'Shipped'}</span></button></li>`).join('')}<li class="fill" aria-hidden="true"></li></ol>
          <p class="mm-trhint">Keep scrolling to see each try, or tap a number.</p><div class="mm-trb"><div class="mm-trs" id="mmTrs"></div><div class="mm-trc" id="mmTrc"></div></div>
        </div></div>
      </section>

      <section class="mm-sec mm-lsec" id="mmLift">
        ${plaque(7, 'The user interface')}
        <h3 class="mm-h" data-rv>Take the lift through the final design.</h3>
        <div class="mm-lift" data-rv data-f="0">
          <div class="mm-pan"><div class="mm-led"><i id="mmArr">▲</i><b id="mmFl">1</b></div>${MM.floors.map(([t, , , nw], i) => `<button type="button" data-f="${i}"><span>${i + 1}</span>${t}${nw ? '<em>New</em>' : ''}</button>`).join('')}</div>
          <div class="mm-car"><div class="mm-fl" id="mmFloor"></div><div class="mm-doors" aria-hidden="true"><i></i><i></i></div></div>
        </div>
      </section>

      <section class="mm-sec" id="mmBoard">
        ${plaque(8, 'Impact of the project')}
        <h3 class="mm-h" data-rv>Checking in: the results.</h3>
        <div class="mm-bd mm-wins" data-rv>
          ${MM.board.map(([a, b, t, d], i) => `<div class="mm-rw" style="--i:${i}"><div class="mm-glass"><div class="mm-fx">${a ? `<span class="sf" data-t="${a}"></span><i>↓</i>` : ''}<span class="sf big" data-t="${b}"></span></div><i class="cur l"></i><i class="cur r"></i></div><i class="sill"></i><div class="mm-rt"><b>${t}</b><span>${d}</span></div></div>`).join('')}
        </div>
      </section>

      <section class="mm-sec" id="mmBook">
        ${plaque(9, 'What I learned')}
        <h3 class="mm-h" data-rv>Signing the guestbook.</h3>
        <div class="mm-gb" data-rv>
          <p class="o">This project taught me a lot more than just design.</p>
          <p>I learned to pause and really listen to what users were struggling with, not what I <u>thought</u> they were. Understanding the real pain points became my starting line.</p>
          <p>I realised <u>how powerful the right data can be</u>. Working closely with the product team helped me connect numbers to behaviour: funnel entries, CTRs, drop-offs. All of it told a story about what was really happening.</p>
          <p><u>Great design means nothing if it doesn’t move the needle for the business.</u> The sweet spot is an experience users love and the company values.</p>
          <p>Through every round of feedback, iteration and stakeholder conversation, I learned to stay open: defend what mattered, but adapt when needed.</p>
          <p>Most importantly, I learned to <u>own my work completely</u>. Not just the pixels, but the outcome.</p>
          <div class="mm-sig" id="mmSig" aria-label="Signed, Alex Morgan"><span class="sg">Alex Morgan</span><span class="pen" aria-hidden="true">✒️</span></div>
        </div>
      </section>

      <footer class="c3-foot mm-foot">
        <div class="c3-w c3-fin"><p class="kicker c3-k" data-rv>${STAR}That’s checkout</p>
          ${edHead('Thanks for', 'staying!', '', 'b-coral')}
          <p class="c3-p" data-rv>Designed with care by Alex Morgan.</p>
          <div class="c3-links" data-rv><a class="soc li" href="#hello" target="_blank" rel="noopener" aria-label="LinkedIn"><svg class="soc-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg><span class="soc-t">LinkedIn ↗</span></a><a class="soc ig" href="#hello" target="_blank" rel="noopener" aria-label="Instagram"><svg class="soc-i" viewBox="0 0 24 24" aria-hidden="true"><path  d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg><span class="soc-t">Instagram ↗</span></a><a class="soc gm" href="mailto:hello@example.com" aria-label="Email me"><svg class="soc-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg><span class="soc-t">Email me</span></a><a href="#hello" target="_blank" rel="noopener" data-book>Book a free call ↗</a><button type="button" data-close>Back to the box</button></div>
          ${fbHTML('Wayfinder Special Requests', ['The problem', 'Business objective', 'Design issues', 'User metrics', 'Competitors', 'Iterations', 'Final UI', 'Impact'])}
          <p class="c3-morek" data-rv>Got a minute for another story?</p>
          <div class="c3-more" data-rv>${WORK.filter(x => x.id !== 'requests' && !CS_SOON.includes(x.id)).map(x => `<button type="button" class="c3-wc" data-switch="${x.id}" style="--bg:${x.bg};--g:${x.glow}"><span class="wc-top">${x.logo ? `<img src="v2/s/${x.logo}.webp" alt="">` : `<i class="wc-ic"><svg viewBox="0 0 24 24">${ICONS[x.icon]}</svg></i>`}<em>${x.status}</em></span><span class="wc-face ${x.face[0]}"><b>${x.face[1]}</b><small>${x.face[2]}</small></span><span class="wc-name"><b>${x.name}</b><small>${x.co}</small></span><span class="wc-go">Read the case study →</span></button>`).join('')}</div></div>
        <div class="mm-hall c3-scene">${mmHall()}</div>
      </footer>
      <div class="mm-lb" id="mmLb" aria-hidden="true"><button type="button" class="x" aria-label="Close">×</button><button type="button" class="p" aria-label="Previous">‹</button><img alt=""><button type="button" class="n" aria-label="Next">›</button><p></p></div>
    </div>`;
  }
  function mmCleanup() { if (initMM.kd) removeEventListener('keydown', initMM.kd, true); initMM.kd = null; if (initMM.sc) csEl.removeEventListener('scroll', initMM.sc); initMM.sc = null; if (initMM.sc2) csEl.removeEventListener('scroll', initMM.sc2); initMM.sc2 = null; (initMM.tt || []).forEach(clearTimeout); initMM.tt = []; (initMM.ts || []).forEach(clearInterval); initMM.ts = []; }
  function initMM() {
    mmCleanup(); initMM.ts = []; initMM.tt = [];
    const root = csEl, later = (f, ms) => initMM.tt.push(setTimeout(f, ms));
    const obs = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; e.target.classList.add('in'); $$('.hl', e.target).forEach(h => h.classList.add('on')); obs.unobserve(e.target); if (e.target._on) e.target._on(); }), { root, threshold: .18 });
    // the hero: a request goes from the guest's phone to the hotel's front desk, and the guest tracks it back
    const srWrap = $('#srHero', root); if (srWrap) srInit(srWrap, id => initMM.tt.push(id));
    later(() => $('#mmHero', root).classList.add('in'), 80);
    // keys come off the rack one by one
    $('.mm-rack', root)._on = () => $$('.mm-key', root).forEach((k, i) => later(() => k.classList.add('on'), 250 + i * 650));
    // the hotel facade
    const wins = $$('#mmWin i', root), order = wins.map((_, i) => i).sort((a, b) => ((a * 37) % 100) - ((b * 37) % 100)), sd = $('#mmSd', root);
    const setStat = i => { const [n, t, h, d, c] = MM.stats[i]; $$('.mm-tabs button', root).forEach(b => b.classList.toggle('on', +b.dataset.s === i));
      wins.forEach(w => w.classList.remove('on')); order.slice(0, n).forEach((k, j) => { wins[k].style.setProperty('--wc', c); wins[k].style.transitionDelay = (j * 9) + 'ms'; wins[k].classList.add('on'); });
      sd.innerHTML = `<p class="h" style="--sc:${c}">${h}</p><p class="n" style="--sc:${c}"><b>${n}</b> of 100 ${t}</p><p class="d">${d}</p>${i === 0 ? '<p class="fn">The old flow was live across 5,000 hotels.</p>' : ''}`; };
    $$('.mm-tabs button', root).forEach(b => b.addEventListener('click', () => setStat(+b.dataset.s)));
    $('.mm-fac', root)._on = () => later(() => setStat(0), 300);
    sd.innerHTML = `<p class="d">Tap a number to light up the windows.</p>`;
    // luggage tags flip
    $$('.mm-tag', root).forEach(t => t.addEventListener('click', () => t.classList.toggle('fl')));
    // iterations: a progress you can step through
    const tr = $('.mm-tr', root), trs = $('#mmTrs', root), trc = $('#mmTrc', root), N = MM.its.length;
    let curIt = -1;
    const setIt = i => { i = Math.max(0, Math.min(N - 1, i)); if (i === curIt) return; curIt = i; const [t, d, pro, con, ims] = MM.its[i]; tr.dataset.v = i; tr.style.setProperty('--p', i / (N - 1)); const last = i === N - 1;
      $$('.mm-trk button', root).forEach(b => { const v = +b.dataset.v; b.classList.toggle('on', v === i); b.classList.toggle('done', v < i); b.setAttribute('aria-current', v === i ? 'step' : 'false'); });
      trs.innerHTML = `<div class="ph${ims.length > 1 ? ' many' : ''}">${ims.map(n => `<span class="mm-scrw"><img class="mm-scr" src="${mi(n)}" alt="${last ? 'The shipped card' : 'Try ' + (i + 1) + ': ' + t}" data-mz="it"></span>`).join('')}</div>${ims.length > 1 ? '<p class="swipe">Swipe sideways for all three →</p>' : ''}`;
      trc.innerHTML = `<p class="v${last ? ' ship' : ''}">${last ? 'Shipped ✓' : `Try ${i + 1} of 5`}</p><h4>${t}</h4><p class="d">${d}</p>
        ${pro.length ? `<div class="col y"><b>${last ? 'What it gives guests' : 'What worked'}</b><ul>${pro.map(x => `<li>${x}</li>`).join('')}</ul></div>` : ''}
        ${con.length ? `<div class="col n"><b>What didn’t</b><ul>${con.map(x => `<li>${x}</li>`).join('')}</ul></div>` : ''}`; };
    // scroll drives the tries: the card stays pinned while the page runs through one step per stretch of scroll
    const trw = $('.mm-trw', root);
    const trGeo = () => { const r = trw.getBoundingClientRect(), top = parseFloat(getComputedStyle(tr).top) || 0, range = Math.max(1, trw.offsetHeight - tr.offsetHeight); return { r, top, range }; };
    let trLock = null;
    const trScroll = () => { const { r, top, range } = trGeo(), p = clamp((top - r.top) / range), i = Math.min(N - 1, Math.floor(p * N));
      if (trLock != null) { if (Math.abs(trLock - csEl.scrollTop) > 3) return; trLock = null; }
      setIt(i); };
    // tapping a number scrolls to that try, so scrolling on from there carries on naturally
    const goIt = i => { i = Math.max(0, Math.min(N - 1, i)); const { r, top, range } = trGeo();
      const y = Math.round(csEl.scrollTop + r.top - top + (i + .5) / N * range); setIt(i);
      trLock = Math.max(0, Math.min(y, csEl.scrollHeight - csEl.clientHeight)); csEl.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' }); later(() => { trLock = null; }, 1200); };
    $$('.mm-trk button', root).forEach(b => b.addEventListener('click', () => goIt(+b.dataset.v)));
    csEl.addEventListener('scroll', initMM.sc2 = () => requestAnimationFrame(trScroll), { passive: true });
    setIt(0);
    // the lift
    const lift = $('.mm-lift', root), floorEl = $('#mmFloor', root), fl = $('#mmFl', root), arr = $('#mmArr', root);
    const drawFloor = i => { const [t, d, ims, nw] = MM.floors[i]; floorEl.innerHTML = `<div class="hd"><h4>${t}${nw ? ' <em>New</em>' : ''}</h4><p>${d}</p></div><div class="row">${ims.map(n => `<span class="mm-scrw"><img class="mm-scr${/^desk/.test(n) ? ' dk' : ''}" src="${mi(n)}" alt="${t}" loading="lazy" data-mz="f${i}"></span>`).join('')}</div><p class="sw">Scroll sideways for more →</p>`; };
    let curF = 0, liftT = 0;
    const setFloor = i => { if (i === curF) return; $$('.mm-pan button', root).forEach(b => b.classList.toggle('on', +b.dataset.f === i)); arr.textContent = i > curF ? '▲' : '▼'; lift.classList.add('moving'); clearTimeout(liftT);
      liftT = setTimeout(() => { drawFloor(i); fl.textContent = i + 1; lift.dataset.f = i; curF = i; lift.classList.remove('moving'); }, reduce ? 0 : 520); };
    $$('.mm-pan button', root).forEach(b => b.addEventListener('click', () => setFloor(+b.dataset.f)));
    drawFloor(0); $$('.mm-pan button', root)[0].classList.add('on');
    // the split-flap board
    const CHARS = ' 0123456789%/,+';
    $('.mm-bd', root)._on = () => { $('.mm-bd', root).classList.add('open'); $$('.sf', root).forEach((s, k) => { const t = s.dataset.t; s.innerHTML = [...t].map(() => '<i> </i>').join(''); const cells = $$('i', s);
      cells.forEach((c, j) => { let n = 0; const stop = 10 + j * 3 + k * 4; const iv = setInterval(() => { n++; c.textContent = n >= stop ? t[j] : CHARS[Math.floor(Math.random() * CHARS.length)]; c.classList.toggle('flip', n % 2 === 0); if (n >= stop) { clearInterval(iv); c.classList.remove('flip'); if (j === cells.length - 1) later(() => { s.textContent = t; }, 60); } }, reduce ? 1 : 55); initMM.ts.push(iv); }); }); };
    $$('.sf', root).forEach(s => { s.textContent = s.dataset.t; });
    // the signature writes itself
    const sig = $('#mmSig', root); if (innerWidth < 860) { sig.classList.add('ph'); new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { sig.style.setProperty('--sp', 1); o.disconnect(); } }), { root, threshold: .6 }).observe(sig); } else csEl.addEventListener('scroll', initMM.sc = () => { const r = sig.getBoundingClientRect(), p = clamp((innerHeight * .92 - r.top) / (innerHeight * .42)); sig.style.setProperty('--sp', p.toFixed(3)); }, { passive: true }); initMM.sc && initMM.sc();
    // tap any screen to look closer
    const lb = $('#mmLb', root), lbI = $('img', lb), lbP = $('p', lb); let grp = [], gi = 0;
    const show = i => { gi = (i + grp.length) % grp.length; lbI.src = grp[gi].src; lbP.textContent = grp[gi].alt + (grp.length > 1 ? ` · ${gi + 1} of ${grp.length}` : ''); lb.classList.toggle('one', grp.length < 2); };
    const closeLb = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); };
    root.addEventListener('click', e => { const im = e.target.closest('img[data-mz]'); if (im && !lb.contains(im)) { grp = $$(`img[data-mz="${im.dataset.mz}"]`, root); show(grp.indexOf(im)); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); } });
    lb.addEventListener('click', e => { if (e.target.closest('.n')) show(gi + 1); else if (e.target.closest('.p')) show(gi - 1); else if (e.target !== lbI) closeLb(); });
    addEventListener('keydown', initMM.kd = e => { if (lb.classList.contains('open')) { if (e.key === 'Escape') { closeLb(); e.stopImmediatePropagation(); } else if (e.key === 'ArrowRight') show(gi + 1); else if (e.key === 'ArrowLeft') show(gi - 1); return; }
      const r = tr.getBoundingClientRect(); if (r.top < innerHeight * .7 && r.bottom > innerHeight * .3 && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) goIt(+tr.dataset.v + (e.key === 'ArrowRight' ? 1 : -1)); }, true);
    $$('[data-rv]', root).forEach(el => obs.observe(el));
  }

  // your opinion: which part could be better, and how you'd have solved it — it reaches me directly
  const fbHTML = (id, secs) => `<section class="fb" data-fb="${id}" data-rv><div class="fb-in">
    <div class="fb-intro"><p class="fb-k">Your opinion</p><h3>How would you have solved it?</h3><p class="fb-s">Tell me which part could be better, or how you’d have approached the problem. It lands straight in my inbox.</p>
      <div class="fb-me"><img src="v2/s/photo.webp" alt=""><span><b>Alex Morgan</b><small>I read every one myself</small></span></div></div>
    <form class="fb-f" novalidate>
      <fieldset><legend class="fb-lg">Which part could be better?</legend><div class="fb-chips">${secs.map(t => `<button type="button" class="fb-c" aria-pressed="false">${t}</button>`).join('')}</div></fieldset>
      <label class="fb-fl"><span>Your take</span><textarea name="t" maxlength="800" rows="4" placeholder="I would have…"></textarea></label>
      <div class="fb-row"><label class="fb-fl"><span>Name <i>*</i></span><input name="n" maxlength="60" placeholder="Your name" autocomplete="name" required></label><label class="fb-fl"><span>Email <i>*</i></span><input name="e" type="email" maxlength="120" placeholder="you@email.com" autocomplete="email" required></label></div>
      <div class="fb-end"><p class="fb-err" role="alert"></p><button type="submit" class="fb-go">Send it to Alex <span aria-hidden="true">→</span></button></div>
    </form>
    <div class="fb-done" hidden><span>✓</span><b>Thanks for putting this out there!</b><p>I’ve received it and will reach out to you.</p></div></div></section>`;
  csEl.addEventListener('input', e => { if (e.target.closest('.fb')) e.target.classList.remove('bad'); });
  csEl.addEventListener('click', e => { const c = e.target.closest('.fb-c'); if (c) { const on = c.getAttribute('aria-pressed') !== 'true'; c.setAttribute('aria-pressed', on); c.classList.toggle('on', on); } });
  csEl.addEventListener('submit', async e => {
    const f = e.target.closest('.fb-f'); if (!f) return; e.preventDefault();
    const sec = f.closest('.fb'), err = $('.fb-err', f), go = $('.fb-go', f);
    const text = f.t.value.trim(), parts = $$('.fb-c.on', f).map(b => b.textContent), name = f.n.value.trim(), email = f.e.value.trim();
    $$('.bad', f).forEach(x => x.classList.remove('bad'));
    const miss = [];
    if (!text && !parts.length) miss.push([f.t, 'Pick a part or write a line first.']);
    if (!name) miss.push([f.n, 'Add your name.']);
    if (!email) miss.push([f.e, 'Add your email, so I can reply.']); else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) miss.push([f.e, 'That email doesn’t look right.']);
    if (miss.length) { miss.forEach(([el]) => el.classList.add('bad')); err.textContent = miss[0][1]; miss[0][0].focus(); return; }
    err.textContent = ''; go.disabled = true; go.firstChild.textContent = 'Sending… ';
    const body = { cs: sec.dataset.fb, parts, text: text.slice(0, 800), name: name.slice(0, 60), email: email.slice(0, 120), at: Date.now() };
    let ok = false;
    if (noteDb && noteUid && noteCanWrite) { try { await noteDb.collection('feedback/' + noteUid + '/items').add(body); ok = true; } catch (_) {} }
    if (!ok) { location.href = `mailto:hello@example.com?subject=${encodeURIComponent('Feedback on ' + sec.dataset.fb + ' case study')}&body=${encodeURIComponent((parts.length ? 'Could be better: ' + parts.join(', ') + '\n\n' : '') + text + (name ? '\n\n— ' + name : ''))}`; }
    f.hidden = true; const dn = $('.fb-done', sec); $('b', dn).textContent = `Thanks, ${name.split(' ')[0]}!`; dn.hidden = false;
  });
  // ---------- Wayfinder: Swipr.AI, hotel hunting like a first date ----------
  const si = n => `v2/sw/${n}.webp`;
  const SWP = {
    hotels: [['banyan', 'Banyan Tree', '₹19,000', '4.9', 'Sukhumvit', ['Private villas', 'Yoga', 'Pool'], ['pool', 'calm', 'spa']],
      ['solitaire', 'Solitaire Bangkok', '₹15,500', '4.8', 'Sukhumvit', ['Riverside', 'Spa', 'Pool'], ['pool', 'spa', 'calm']],
      ['wbkk', 'W Bangkok', '₹19,300', '4.8', 'Pratunam', ['Rooftop', 'Nightlife', 'Breakfast'], ['city', 'night', 'pool']],
      ['mandarin', 'Mandarin Oriental', '₹18,000', '4.8', 'Pratunam', ['Rooftop bar', 'City views', 'Pool'], ['city', 'night', 'luxe']],
      ['sofitel', 'Sofitel Sukhumvit', '₹12,000', '4.6', 'Riverside', ['French style', 'Breakfast', 'Sky bar'], ['city', 'luxe', 'value']],
      ['pratunam', 'Stay in Pratunam?', 'Smart filter', '✦', 'Shopping district', ['Malls nearby', 'Street food', 'Metro'], ['city', 'value', 'night']]],
    tags: { pool: '🏊 Pools', calm: '🌿 Calm', spa: '💆 Spa', city: '🏙️ City life', night: '🌃 Nightlife', luxe: '✨ Luxe', value: '💸 Value' },
    probs: [['Weak visual hierarchy', 'Price breakdown, inclusions and cancellation policy are buried or set in small type.', 'Price · inclusions · policy'],
      ['No feedback loop', 'The listing never asks why a hotel was skipped or shortlisted, so it can’t learn.', 'Why did you skip this?'],
      ['Filters feel disconnected', 'Change a filter and nothing tells you the list is now a better match.', 'Filters applied… did anything change?'],
      ['Repetitive information', 'Every card repeats the same details, with no progressive disclosure.', 'Same info, card after card']],
    comps: [['airbnb', 'Airbnb', 'Visual storytelling', 'Semantic, intent-based filters'], ['booking', 'Booking.com', 'Robust filtering', 'A clean UI that shows personalisation'],
      ['expedia', 'Expedia', 'Bundles and deals', 'Personalisation beyond standard preferences'], ['tinder', 'Tinder', 'Swipe-based discovery and instant decisions', 'Never applied to property search… yet']],
    data: [[5, 40], [10, 50], [20, 70], [30, 80]],
    feats: [['Semantic search', 'Swipr turns what you type or say into a natural-language search, and keeps learning with every swipe.', 'f1'],
      ['Smart filters', 'Filters adapt instantly to the meaning of your query.', 'f2'],
      ['AI recommendation', 'The swipe engine re-ranks hotels on the fly from your likes and dislikes.', 'f3'],
      ['Edit prompt', 'The prompt stays editable, so you can tweak place, budget or vibe without starting over.', 'f4'],
      ['Seamless flow', 'Go from listing to details to booking without breaking the flow.', 'f5'],
      ['Collections', 'Every right swipe is saved to a wishlist stack, ready to review.', 'f6'],
      ['Search recall', 'Pick up a past search instantly instead of starting from scratch.', 'f7'],
      ['Special themes', 'Occasion themes, like Valentine’s, personalise results and sharpen the AI.', 'f8']],
    flows: [['Onboarding', 'A quick setup that personalises the experience from the start.', [1, 2, 3, 4, 5]],
      ['Semantic search', 'Search and refine by voice or text, in plain words.', [6, 7, 8, 9, 10]],
      ['GenAI stack', 'A fresh AI-curated stack, generated for you.', [11, 12, 13, 14, 15]],
      ['Prompt refining', 'Fine-tune the prompt and add filters for sharper results.', [16, 17, 18, 19, 20]],
      ['Collection stack', 'Your liked stays, and similar stacks to explore.', [21, 22, 23, 24, 25]]],
    impact: [[40, '⏱️', 'faster time-to-discovery', 'Relevant stays, found faster than scrolling 50+ listings.'], [65, '❤️', 'more engagement with cards', 'Swiping is playful, so people keep browsing.'],
      [30, '🎯', 'more accurate matches', 'AI refinement and semantic search cut irrelevant results.'], [20, '📈', 'uplift in booking intent', 'Measured by right-swipes and collections in prototypes.'],
      [25, '🔁', 'fewer search drop-offs', 'Plain-language queries and swiping ease search fatigue.']]
  };
  function swHTML(w) {
    const plaque = (n, t) => `<p class="sw-pl" data-rv><span>✦ ${String(n).padStart(2, '0')}</span>${t}</p>`;
    const head = (a, b) => `<h3 class="sw-h" data-rv>${a}${b ? `<br><span class="g">${b}</span>` : ''}</h3>`;
    const card = ([k, n, p, r, a, chips], i) => `<div class="sw-card${k === 'pratunam' ? ' smart' : ''}" data-i="${i}"><div class="ph"><img src="${si('h-' + k)}" alt="${n}" draggable="false"><span class="st like">LIKE</span><span class="st nope">NOPE</span>${k === 'pratunam' ? '<em>✦ Smart filter card</em>' : ''}</div>
      <div class="bd"><div class="r1"><b>${n}</b><span>${p}</span></div><div class="r2"><i>${r}</i>${a}</div><div class="r3">${chips.map(c => `<span>${c}</span>`).join('')}</div></div></div>`;
    return `<div class="cs-bar sw-bar"><button class="cs-close" id="csClose" type="button"><span class="ar" aria-hidden="true">←</span>Back to the box</button><span class="sw-bk"><img src="${si('orb')}" alt=""> Swipr.AI</span></div>
    <div class="sw sw-pg">
      <div class="sw-aur" aria-hidden="true"><i></i><i></i><i></i></div>
      <header class="sw-hero" id="swHero">
        <div class="sw-hw">
          <div class="sw-brand"><img src="${si('logo')}" alt="Wayfinder | Swipr.AI"></div>
          <p class="sw-k">✦ Future concept · GenAI · AI Deathon runner-up</p>
          <h2 class="sw-t"><span class="ln"><span>Swipe right on</span></span><span class="ln"><span class="g">your next stay.</span></span></h2>
          <p class="sw-lead">Hotel hunting, but like a first date. Tell Swipr what you’re after, swipe on what you like, and it learns your taste as you go.</p>
          <ul class="sw-meta"><li><b>Role</b>Product designer</li><li><b>Made at</b>Wayfinder</li><li><b>Award</b>Runner-up, AI Deathon</li></ul>
        </div>
        <div class="sw-play">
          <div class="sw-arena">
            <button type="button" class="sw-act no" id="swNo" aria-label="Skip this stay"><span>✕</span><small>Skip</small></button>
            <div class="sw-deck" id="swDeck">${SWP.hotels.map(card).join('')}<div class="sw-match" id="swMatch"></div><div class="sw-think" id="swThink"><img src="${si('orb')}" alt=""><b>Re-ranking your stack…</b><span>Learned from your last 3 swipes</span></div></div>
            <button type="button" class="sw-act yes" id="swYes" aria-label="Like this stay"><span>♥</span><small>Like</small></button>
          </div>
          <div class="sw-learn"><div class="rr" aria-live="polite"><i class="dots" id="swDots"><b></b><b></b><b></b></i><span id="swRR">Swipe 3 cards and Swipr re-ranks the rest</span></div><div class="tg" id="swTaste"></div></div>
        </div>
      </header>

      <section class="sw-ps" id="swPs" data-rv aria-label="The problem in three lines">${[['Everyone gets the same hotels', 'on their very first search.'], ['Personalisation only kicks in', 'on the second visit.'], ['So people scroll, tire out,', 'and leave without booking.']].map((l, j) => `<p class="ln">${l.join(' ').split(' ').map((w, i, arr) => `<span style="--d:${(j * 9 + i) * 70}ms">${w}</span>`).join(' ')}</p>`).join('')}</section>

      <section class="sw-sec" id="swProb">
        ${plaque(1, 'The problem')}
        ${head('Everyone gets', 'the same list.')}
        <p class="sw-p" data-rv>New users see the same ranked hotels, whatever their taste. Personalisation only kicks in from their second visit.</p>
        <div class="sw-same" data-rv>${[['🏖️', 'Beach lover'], ['🏙️', 'City hopper'], ['💆', 'Spa fan']].map(([e, t]) => `<div class="sw-u"><p><span>${e}</span>${t}</p><ol>${['W Bangkok', 'Sofitel Sukhumvit', 'Mandarin Oriental', 'Banyan Tree'].map(h => `<li>${h}</li>`).join('')}</ol></div>`).join('')}</div>
        <div class="sw-top" data-rv><div class="sq" id="swSq">${Array.from({ length: 100 }, (_, i) => `<i${i < 5 ? ' class="t"' : ''}></i>`).join('')}</div>
          <div class="tx"><b><span class="g">Top 5%</span> of hotels drive <span class="g">80%</span> of bookings.</b><p>Yet people spend minutes scrolling through listings that aren’t for them. That leads to fatigue, indecision and drop-offs.</p></div></div>
        <div class="sw-list" data-rv>
          <div class="sw-lc"><div class="lph"><img src="${si('h-sofitel')}" alt=""></div><div class="lbd"><b>Sofitel Sukhumvit</b><i class="l w60"></i><i class="l w40"></i><i class="l w80 sm"></i><div class="lfoot"><i class="l w30 sm"></i><span>₹12,000</span></div></div>
            ${SWP.probs.map((_, i) => `<button type="button" class="hs h${i}" data-p="${i}" aria-label="Issue ${i + 1}">${i + 1}</button>`).join('')}</div>
          <div class="sw-iss" id="swIss"></div>
        </div>
      </section>

      <section class="sw-sec" id="swComp">
        ${plaque(2, 'Competitor study')}
        ${head('Swiping through', 'the competition.')}
        <p class="sw-p" data-rv>Each one does something well. None of them learns what you like while you browse.</p>
        <div class="sw-hand" data-rv>${SWP.comps.map(([k, n, g, m], i) => `<article class="sw-cc${k === 'tinder' ? ' muse' : ''}" style="--i:${i}"><div class="top"><img src="${si('lg-' + k)}" alt=""><b>${n}</b>${k === 'tinder' ? '<em>Our muse 💘</em>' : ''}</div><p class="y"><span>✓ Great at</span>${g}</p><p class="n"><span>✕ Missing</span>${m}</p></article>`).join('')}</div>
      </section>

      <section class="sw-sec" id="swData">
        ${plaque(3, 'Statistics and data')}
        ${head('The more you look,', 'the more you book.')}
        <figure class="sw-chart" data-rv>
          <figcaption class="sw-chh"><span>Chance a user books</span><b id="swDv">40%</b><small id="swDs">after viewing 5 properties</small></figcaption>
          <div class="sw-plot"><svg id="swPlot" viewBox="0 0 640 300" role="img" aria-label="Chance of booking: 40% after 5 properties viewed, 50% after 10, 70% after 20, 80% after 30"></svg></div>
          <p class="sw-chx">Properties viewed</p>
        </figure>
        <div class="sw-ai" data-rv><img class="orb" src="${si('orb')}" alt=""><p class="k">AI meets Wayfinder</p><p class="q">One thing became clear: the more people search, the stronger their intent to book.</p><p class="d">So GenAI curates the stack and cuts how many properties you need to see before you decide, using your feedback and smart recommendations.</p></div>
      </section>

      <section class="sw-sec" id="swGoal">
        ${plaque(4, 'The goal')}
        ${head('Personal from', 'the very first search.')}
        <p class="sw-p" data-rv>Reduce time-to-decision for new users, by building personalisation into their very first session.</p>
        <div class="sw-eq" data-rv><span>⏱️ Faster decisions</span><b>+</b><span>🧠 Smarter results</span><b>+</b><span>⌛ Less time</span><b>=</b><span class="res"><img src="${si('orb')}" alt="">Swipr.AI</span></div>
      </section>

      <section class="sw-sec" id="swIdea">
        ${plaque(5, 'The idea')}
        ${head('Tinder for hotels.', 'That learns.')}
        <p class="sw-p" data-rv>Swipr blends Tinder-style swiping with live AI personalisation. In under 10 swipes it learns your taste, and it updates the hotel list every 3 swipes.</p>
        <div class="sw-prompt sw-ask" data-rv><img class="orb" src="${si('orb')}" alt=""><span id="swType"></span><i class="caret"></i><span class="mic" aria-hidden="true"><i></i><i></i><i></i></span></div>
        <div class="sw-loop" data-rv>
          <div class="lp l"><span>👈</span><b>Swipe left</b><small>What you avoid</small></div>
          <div class="lp c"><img src="${si('orb')}" alt=""><b>Swipr learns</b><small>Re-ranks the stack</small></div>
          <div class="lp r"><span>👉</span><b>Swipe right</b><small>What you like</small></div>
        </div>
        <div class="sw-nums" data-rv>
          <div><b data-n="6" data-s="th">0</b><span>card is a smart filter that adapts to what you swipe</span></div>
          <div><b data-n="3" data-p="Every ">0</b><span>swipes, re-ranking kicks in to keep the feed relevant</span></div>
          <div><b data-n="20">0</b><span>hotels pre-fetched, so swiping never lags</span></div>
        </div>
      </section>

      <section class="sw-sec" id="swHow">
        ${plaque(6, 'How it works')}
        ${head('Eight things', 'working behind the swipe.')}
        <p class="sw-p" data-rv>Tap any screen to see it up close.</p>
        <div class="sw-bento" data-rv>${SWP.feats.map(([t, d, img], i) => `<button type="button" class="sw-ft" style="--i:${i}" data-full="${si(img)}"><span class="shot"><img src="${si(img)}" alt="${t}" loading="lazy"></span><span class="tx"><i>${String(i + 1).padStart(2, '0')}</i><b>${t}</b><small>${d}</small></span></button>`).join('')}</div>
      </section>

      <section class="sw-sec" id="swFinal">
        ${plaque(7, 'The final UI')}
        ${head('Every screen,', 'flow by flow.')}
        <p class="sw-p" data-rv>Pick a flow to see its screens. Tap any screen to look closer.</p>
        <div class="sw-ui" data-rv>
          <div class="sw-tabs" role="tablist">${SWP.flows.map(([t], i) => `<button type="button" role="tab" data-g="${i}"${i ? '' : ' class="on" aria-selected="true"'}>${t}</button>`).join('')}</div>
          <p class="sw-fdsc" id="swFdsc"></p>
          <div class="sw-strip" id="swStrip"></div>
        </div>
      </section>

      <section class="sw-sec" id="swImp">
        ${plaque(8, 'Expected impact')}
        ${head('What we expect', 'it to move.')}
        <p class="sw-p" data-rv>Projected from prototype testing. It’s a future concept, so these are forecasts, not launch numbers.</p>
        <div class="sw-gauges" data-rv>${SWP.impact.map(([n, e, t, d]) => `<div class="sw-g" style="--v:${n}"><div class="ring"><b>${n}%</b><span>${e}</span></div><p class="t">${t}</p><p class="d">${d}</p></div>`).join('')}</div>
      </section>

      <section class="sw-sec" id="swRes">
        ${plaque(9, 'The result')}
        ${head('It’s a match.', '')}
        <div class="sw-win" data-rv>
          <figure class="p1"><img src="${si('stage')}" alt="Alex presenting Swipr.AI to Wayfinder leadership" loading="lazy"><figcaption>Showcased to the CTO, CMO and Head of Design</figcaption></figure>
          <div class="sw-rt"><span class="cup">🏆</span><b>Runner-up</b><p>Among 20 teams and 100+ participants across the Gurgaon and Bangalore offices, at Wayfinder’s AI Deathon.</p></div>
          <figure class="p2"><img src="${si('trophy')}" alt="The AI Deathon runner-up trophy" loading="lazy"><figcaption>The trophy, on my desk</figcaption></figure>
          <div class="hearts" aria-hidden="true">${'<i>♥</i>'.repeat(10)}</div>
        </div>
      </section>

      <footer class="c3-foot sw-foot">
        <div class="c3-w c3-fin"><p class="kicker c3-k" data-rv>${STAR}That’s a wrap</p>
          ${edHead('Thanks for', 'swiping by!', '', 'b-lilac')}
          <p class="c3-p" data-rv>Designed with care by Alex Morgan.</p>
          <div class="c3-links" data-rv><a class="soc li" href="#hello" target="_blank" rel="noopener" aria-label="LinkedIn"><svg class="soc-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg><span class="soc-t">LinkedIn ↗</span></a><a class="soc ig" href="#hello" target="_blank" rel="noopener" aria-label="Instagram"><svg class="soc-i" viewBox="0 0 24 24" aria-hidden="true"><path  d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg><span class="soc-t">Instagram ↗</span></a><a class="soc gm" href="mailto:hello@example.com" aria-label="Email me"><svg class="soc-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg><span class="soc-t">Email me</span></a><a href="#hello" target="_blank" rel="noopener" data-book>Book a free call ↗</a><button type="button" data-close>Back to the box</button></div>
          ${fbHTML('Swipr.AI', ['The problem', 'Competitors', 'The data', 'The idea', 'How it works', 'Final UI', 'Expected impact'])}
          <p class="c3-morek" data-rv>Got a minute for another story?</p>
          <div class="c3-more" data-rv>${WORK.filter(x => x.id !== 'swipr' && !CS_SOON.includes(x.id)).map(x => `<button type="button" class="c3-wc" data-switch="${x.id}" style="--bg:${x.bg};--g:${x.glow}"><span class="wc-top">${x.logo ? `<img src="v2/s/${x.logo}.webp" alt="">` : `<i class="wc-ic"><svg viewBox="0 0 24 24">${ICONS[x.icon]}</svg></i>`}<em>${x.status}</em></span><span class="wc-face ${x.face[0]}"><b>${x.face[1]}</b><small>${x.face[2]}</small></span><span class="wc-name"><b>${x.name}</b><small>${x.co}</small></span><span class="wc-go">Read the case study →</span></button>`).join('')}</div></div>
        <div class="sw-sky c3-scene" aria-hidden="true">${SWP.hotels.slice(0, 5).map(([k], i) => `<span class="fc" style="--i:${i}"><img src="${si('h-' + k)}" alt=""><b>♥</b></span>`).join('')}${'<i class="ht">♥</i>'.repeat(12)}</div>
      </footer>
      <div class="sw-lb" id="swLb" aria-hidden="true"><button type="button" class="x" aria-label="Close">×</button><img alt=""></div>
    </div>`;
  }
  function swCleanup() { (initSW.tt || []).forEach(clearTimeout); (initSW.ti || []).forEach(clearInterval); initSW.tt = []; initSW.ti = []; }
  function initSW() {
    swCleanup(); const root = csEl, later = (f, ms) => initSW.tt.push(setTimeout(f, ms)), every = (f, ms) => { const t = setInterval(f, ms); initSW.ti.push(t); return t; };
    const obs = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; e.target.classList.add('in'); $$('.hl', e.target).forEach(h => h.classList.add('on')); obs.unobserve(e.target); if (e.target._on) e.target._on(); }), { root, threshold: .2 });
    later(() => $('#swHero', root).classList.add('in'), 80);
    // the deck: drag or tap, and it learns
    const deck = $('#swDeck', root), cards = $$('.sw-card', root), taste = {}, tasteEl = $('#swTaste', root), rr = $('#swRR', root), dots = $$('#swDots b', root), think = $('#swThink', root), match = $('#swMatch', root);
    let order = cards.map((_, i) => i), swipes = 0, busy = false;
    const score = ci => SWP.hotels[ci][6].reduce((s, t) => s + (taste[t] || 0), 0);
    const lay = () => order.forEach((ci, k) => { const c = cards[ci]; c.style.zIndex = 20 - k; c.style.setProperty('--k', Math.min(k, 3)); c.classList.toggle('top', k === 0); });
    const drawTaste = () => { const e = Object.entries(taste).filter(([, v]) => v).sort((a, b) => Math.abs(b[1]) - Math.abs(a[1])).slice(0, 5);
      tasteEl.innerHTML = e.map(([k, v]) => `<span class="${v > 0 ? 'p' : 'm'}">${SWP.tags[k]}</span>`).join(''); };
    const setDots = n => dots.forEach((d, i) => d.classList.toggle('on', i < n));
    const done = () => { const liked = SWP.hotels.filter((h, i) => cards[i].dataset.v === 'y'); const best = liked.sort((a, b) => b[6].reduce((s, t) => s + (taste[t] || 0), 0) - a[6].reduce((s, t) => s + (taste[t] || 0), 0))[0];
      match.innerHTML = best ? `<p class="k">It’s a match!</p><img src="${si('h-' + best[0])}" alt=""><b>${best[1]}</b><span>${best[2]} · ${best[4]}</span><button type="button" id="swAgain">Swipe again ↺</button>` : `<p class="k">No match… yet</p><span>Picky! Swipr would keep learning.</span><button type="button" id="swAgain">Swipe again ↺</button>`;
      match.classList.add('on'); rr.textContent = 'Your stack is done'; };
    const reset = () => { Object.keys(taste).forEach(k => delete taste[k]); swipes = 0; order = cards.map((_, i) => i); cards.forEach(c => { c.classList.remove('out'); c.style.transform = ''; delete c.dataset.v; c.style.setProperty('--dx', 0); }); match.classList.remove('on'); setDots(0); rr.textContent = 'Swipe 3 cards and Swipr re-ranks the rest'; drawTaste(); lay(); };
    match.addEventListener('click', e => { if (e.target.closest('#swAgain')) reset(); });
    const fling = like => { if (busy || !order.length) return; busy = true; const ci = order.shift(), c = cards[ci]; c.dataset.v = like ? 'y' : 'n';
      c.classList.add('out'); c.style.transform = `translate(${like ? 140 : -140}%, -6%) rotate(${like ? 22 : -22}deg)`;
      $(like ? '#swYes' : '#swNo', root).animate([{ scale: 1 }, { scale: 1.18 }, { scale: 1 }], { duration: 380, easing: 'cubic-bezier(.34,1.56,.64,1)' });
      SWP.hotels[ci][6].forEach(t => { taste[t] = (taste[t] || 0) + (like ? 1 : -1); }); drawTaste(); swipes++; setDots(swipes % 3 || 3);
      rr.textContent = swipes % 3 ? `${3 - swipes % 3} more to re-rank` : 'Re-ranking…';
      if (swipes % 3 === 0 && order.length > 1) { think.classList.add('on'); later(() => { order.sort((a, b) => score(b) - score(a)); lay(); think.classList.remove('on'); rr.textContent = 'Re-ranked to your taste ✓'; setDots(0); busy = false; }, 1300); }
      else { lay(); later(() => { busy = false; }, 320); }
      if (!order.length) later(done, 500); };
    let drag = null;
    deck.addEventListener('pointerdown', e => { const c = e.target.closest('.sw-card.top'); if (!c || busy) return; drag = { c, x: e.clientX, y: e.clientY }; c.setPointerCapture(e.pointerId); c.classList.add('drag'); });
    deck.addEventListener('pointermove', e => { if (!drag) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.dx = dx; drag.c.style.transform = `translate(${dx}px, ${dy * .3}px) rotate(${dx / 14}deg)`; const v = Math.max(-1, Math.min(1, dx / 110)); drag.c.style.setProperty('--dx', v); root.style.setProperty('--lean', v); });
    const up = () => { if (!drag) return; const { c, dx = 0 } = drag; drag = null; c.classList.remove('drag'); c.style.setProperty('--dx', 0); root.style.setProperty('--lean', 0); if (Math.abs(dx) > 90) fling(dx > 0); else c.style.transform = ''; };
    deck.addEventListener('pointerup', up); deck.addEventListener('pointercancel', up);
    $('#swYes', root).addEventListener('click', () => fling(true)); $('#swNo', root).addEventListener('click', () => fling(false));
    lay(); drawTaste();
    // the issues on a listing card
    const iss = $('#swIss', root), setIss = i => { const [t, d, q] = SWP.probs[i]; $$('.hs', root).forEach(h => h.classList.toggle('on', +h.dataset.p === i)); iss.innerHTML = `<p class="n">Issue ${i + 1} of 4</p><b>${t}</b><p>${d}</p><span class="q">“${q}”</span>`; };
    $$('.hs', root).forEach(h => h.addEventListener('click', () => setIss(+h.dataset.p))); setIss(0);
    // more looks, more bookings: the line draws itself, then you can scrub it
    const svg = $('#swPlot', root), dv = $('#swDv', root), ds = $('#swDs', root), D = SWP.data;
    const X = v => 56 + v / 32 * 560, Yv = p => 252 - p / 100 * 224, P = D.map(([v, o]) => [X(v), Yv(o)]);
    const pts = P;
    let dPath = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      dPath += ` C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)},${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)},${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ${p2[0]},${p2[1]}`; }
    svg.innerHTML = `<defs><linearGradient id="swLg" x1="0" x2="1"><stop offset="0" stop-color="#FF3D9A"/><stop offset=".55" stop-color="#8B5CF6"/><stop offset="1" stop-color="#22A6F2"/></linearGradient>
      <linearGradient id="swAg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8B5CF6" stop-opacity=".28"/><stop offset="1" stop-color="#8B5CF6" stop-opacity="0"/></linearGradient>
      <clipPath id="swClip"><rect class="rev" x="0" y="0" width="640" height="300"/></clipPath></defs>
      ${[0, 25, 50, 75, 100].map(g => `<line class="gl" x1="56" x2="616" y1="${Yv(g)}" y2="${Yv(g)}"/><text class="ax" x="44" y="${Yv(g) + 4}">${g}%</text>`).join('')}
      ${D.map(([v]) => `<text class="ax x" x="${X(v)}" y="282">${v}</text>`).join('')}
      <g clip-path="url(#swClip)"><path class="area" d="${dPath} L${X(30)},${Yv(0)} L${X(5)},${Yv(0)} Z"/><path class="ln" d="${dPath}"/></g>
      <line class="cross" id="swX" x1="0" x2="0" y1="${Yv(100)}" y2="${Yv(0)}"/>
      ${P.map(([x, y], i) => `<g class="pt" data-i="${i}" style="--d:${.5 + i * .35}s"><circle class="ring" cx="${x}" cy="${y}" r="9"/><circle class="dot" cx="${x}" cy="${y}" r="5"/><text class="lb" x="${x}" y="${y - 18}">${D[i][1]}%</text><rect class="hit" x="${x - 40}" y="0" width="80" height="300"/></g>`).join('')}`;
    const setD = i => { const [v, o] = D[i]; dv.textContent = o + '%'; ds.textContent = `after viewing ${v} properties`; $$('.pt', svg).forEach((g, k) => g.classList.toggle('on', k === i)); const cx = $('#swX', svg); cx.setAttribute('x1', P[i][0]); cx.setAttribute('x2', P[i][0]); cx.classList.add('on'); };
    $$('.pt', svg).forEach(g => { g.addEventListener('pointerenter', () => setD(+g.dataset.i)); g.addEventListener('click', () => setD(+g.dataset.i)); });
    $('.sw-chart', root)._on = () => { let k = 0; const t = every(() => { setD(k); if (++k >= D.length) clearInterval(t); }, 520); };
    // counters
    $('.sw-nums', root)._on = () => $$('.sw-nums b', root).forEach(b => { const n = +b.dataset.n, p = b.dataset.p || '', s = b.dataset.s || ''; let k = 0; const t = every(() => { k++; b.textContent = p + Math.min(n, k) + s; if (k >= n) clearInterval(t); }, Math.max(40, 900 / n)); });
    // the prompt types itself when the idea comes into view
    const typeEl = $('#swType', root), txt = 'Looking for a luxury resort in Bangkok, 15–17 Aug, with a pool';
    $('.sw-ask', root)._on = () => { let ti = 0; const t = every(() => { ti++; typeEl.textContent = txt.slice(0, ti); if (ti >= txt.length) clearInterval(t); }, 34); };
    // the final UI, flow by flow
    const strip = $('#swStrip', root), fdsc = $('#swFdsc', root);
    const drawFlow = g => { const [t, d, ims] = SWP.flows[g]; $$('.sw-tabs button', root).forEach(b => { const on = +b.dataset.g === g; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
      fdsc.textContent = d; strip.innerHTML = ims.map((n, i) => `<button type="button" class="sw-scr" style="--i:${i}" data-full="${si('u' + String(n).padStart(2, '0'))}"><span class="fr"><img src="${si('u' + String(n).padStart(2, '0'))}" alt="${t}, screen ${i + 1}" loading="lazy"></span><small>${String(i + 1).padStart(2, '0')}</small></button>`).join(''); };
    $$('.sw-tabs button', root).forEach(b => b.addEventListener('click', () => drawFlow(+b.dataset.g))); drawFlow(0);
    // tap a feature or a result photo to look closer
    const lb = $('#swLb', root);
    $('.sw-pg', root).addEventListener('click', e => { const ft = e.target.closest('.sw-ft, .sw-scr'); const im = ft ? null : e.target.closest('.sw-win img');
      if (ft || im) { $('img', lb).src = ft ? ft.dataset.full : im.src; lb.classList.toggle('tall', !!ft); lb.classList.add('open'); } else if (e.target.closest('#swLb')) lb.classList.remove('open'); });
    $$('[data-rv]', root).forEach(el => obs.observe(el));
  }
  // ---------- Haven: the visibility score (B2B host dashboard) ----------
  const ti = k => `v2/tf/${k}.webp`;
  const TF = {
    ic: {
      check: '<path d="m5 12.5 4.2 4L19 7"/>', x: '<path d="M6 6l12 12M18 6 6 18"/>',
      chart: '<path d="M5 19V9M12 19V5M19 19v-7"/>', ticket: '<path d="M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4z"/><path d="M14 7v10" stroke-dasharray="2 2"/>',
      people: '<circle cx="9" cy="9" r="3"/><circle cx="17" cy="10" r="2.4"/><path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6M15 15.2c2.6-.4 4.6.9 5.5 3.8"/>',
      search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/>', play: '<circle cx="12" cy="12" r="8.5"/><path d="M10 8.8v6.4l5-3.2z"/>',
      tag: '<path d="M4 4h7l9 9-7 7-9-9z"/><circle cx="8.5" cy="8.5" r="1.4"/>', cam: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
      cal: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>', star: '<path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.4L12 16l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6z"/>',
      mail: '<rect x="3.5" y="6" width="17" height="12" rx="2"/><path d="m4 7 8 6 8-6"/>', bar: '<path d="M7 19v-6M12 19V7M17 19v-9"/>', clock: '<circle cx="12" cy="13" r="7.5"/><path d="M12 9.5V13l2.5 2M9.5 3h5"/>', pen: '<path d="M5 19l1-4L16 5l3 3L9 18z"/>',
      sys: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="3.5"/><rect x="4" y="13" width="7" height="7" rx="3.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
      spark: '<path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z"/>', figma: '<path d="M9 3h3v6H9a3 3 0 0 1 0-6zM12 3h3a3 3 0 0 1 0 6h-3zM9 9h3v6H9a3 3 0 0 1 0-6zM15 12a3 3 0 1 1-3-3 3 3 0 0 1 3 3zM9 15h3v3a3 3 0 1 1-3-3z"/>',
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', warn: '<path d="M12 4 2.8 19.5h18.4z"/><path d="M12 10v4.5M12 17v.2"/>'
    },
    owners: [['Haus Seeblick', '1 home, 6 phone photos', 'ph', 45, 'Few photos and empty-looking rooms, so visuals come first.', [['ph', 20], ['vs', 15], ['vt', 10], ['nl', 10]]],
      ['Chalet Bergblick', '1 home, great photos', 'ph3', 55, 'The photos are great, so the next points come from reach.', [['vt', 25], ['tg', 10], ['nl', 10]]],
      ['Küstenblick Agency', '14 listings', 'ph2', 72, 'An agency with many homes gets bigger, portfolio-wide upgrades.', [['r3', 12], ['id', 8], ['vs', 5], ['ph', 3]]]],
    recs: { ph: ['Photography Showcase', 'Transform your property with captivating photos.', 'rk1'], vs: ['Virtual Staging', 'Bring your listings to life with virtual enhancements.', 'rk0'], id: ['Interior Design Gallery', 'Elevate your space with stunning designs.', 'rk2'], r3: ['3D Renderings', 'Visualise your property with high-quality 3D images.', 'rk3'], vt: ['Virtual tour', 'Turn your photos into a beautiful video automatically.', 'rc-3'], tg: ['Haven tags', 'Highlight your property in search and attract more guests.', 'rc-4'], nl: ['Newsletter', 'Reach 50,000+ travellers in the next mailing.', 'rc-2'] },
    hero: [['cam', 'Photography', 15], ['play', 'Virtual tour', 10], ['star', 'Top listing', 20], ['mail', 'Newsletter', 10]],
    pins: [['Owners couldn’t tell how good their listing was.', 'Ticks and crosses on every card, but no total and no sense of “good”.', 'One score per property', '#FFF1B8'],
      ['Listings sat unpublished with no next step.', '288 listings offline, each with the same Publish button.', 'The next action, per listing', '#DDEFFC'],
      ['Paid services felt like ads, not help.', 'The same pitch for every owner and every property.', 'Offers tied to a property’s gap', '#FCE3EA'],
      ['Renewals came too late.', 'Renew only got loud after a listing had already expired.', 'Renewal before the deadline', '#DFF3E8']],
    ctr: [['Listing', 34.65, 'opened a listing', '#E8A912', [7, 27, 57, 50], 'Owners came to look at their properties.'],
      ['Statistics', 6.63, 'checked statistics', '#2F86C4', [43.5, 2.2, 11, 4.4], 'Some wanted numbers, but numbers alone don’t say what to do.'],
      ['Renew', 1.40, 'renewed', '#E06A3F', [52, 33, 11.5, 5.5], 'Renewing was rare, and only loud once a listing had already expired.'],
      ['Publish', 0.45, 'published a listing', '#D9476B', [55.5, 71, 7.8, 5.5], 'Almost nobody published. 288 listings sat offline.']],
    // regions on the old page (pixels on the 1600×1740 capture)
    old: [
      ['Owners couldn’t easily understand their listing quality or potential visibility.', 'Every card shows ticks, crosses and a yellow dash for pictures, prices and occupancy. There’s no total, no sense of “good”, and nothing that says what a better listing would earn.', [118, 282, 900, 116]],
      ['Listings could stay unpublished or need attention without a clear next step.', '2 listings online, 288 offline. Each offline one gets the same Publish button, in the same place, with nothing to say which is nearly ready.', [118, 668, 900, 330]],
      ['Paid services existed, but their relevance to a property wasn’t obvious.', 'The newsletter offer is a line of text above the list, and Top listing hides behind a “sale” badge in the header. The same pitch for every owner, for every property.', [118, 186, 900, 82]],
      ['Renewals were a concern, and owners weren’t adding more properties.', 'Renewal only becomes loud once a listing has already expired. The performance panel shows numbers, but not what to do with them.', [836, 186, 650, 470]]
    ],
    first: {
      a: ['Haus Seeblick', 'ph', 'Great photos, but the availability calendar hasn’t been touched in months.', ['cal', 'Update your calendar', 'Guests skip listings with stale dates', 'Free']],
      b: ['Chalet Bergblick', 'ph3', 'The calendar is spotless, but it’s still running on six phone photos.', ['cam', 'Photography Showcase', 'Pro photos for a property that needs them', '+25 pts']],
      cat: [['cam', 'Photography'], ['play', 'Virtual tour'], ['star', 'Top listing'], ['mail', 'Newsletter']]
    },
    bands: [[0, 49, 'Needs attention', 'r', 'Start with the free basics: photos, prices and an up-to-date calendar.'], [50, 79, 'Good', 'a', 'Great! Keep optimising to increase score to 80+ points.'], [80, 99, 'Great', 'g', 'You’re near the top. One or two improvements left.'], [100, 100, 'Max score', 'p', 'Maximum visibility. Every recommended action is done.']],
    gev: [['Overall visibility score', 'Version 1', 'A score out of 100', 'A familiar gauge and a clear number.', 'The “/100” and the break in the arc read like an exam grade. Nothing said how to improve.'],
      ['Overall visibility score', 'Version 2', 'Progress over time', '“+12 points this week” made improvement visible.', 'The boxed message competed with the score, and the arc still had no clear end point.'],
      ['Overall visibility score', 'Version 3', 'One marker, calmer copy', 'A knob marks exactly where you are. The message sits free under the score.', 'A rainbow gradient on every score felt noisy, and “visibility score” sounded like a grade.'],
      ['Growth meter', 'Final', 'A growth meter', 'Renamed to “Growth meter”, with an info icon that explains the score. The arc is one colour that shifts with the score: red, then yellow, then green.', '']],
    meter: [['g1', 'Exploration', 'Score plus a row of stats', 'A speedometer with views, leads and rating beside it. Four numbers competed with the one that mattered.'],
      ['it-gauge', 'Iteration', 'A traffic-light arc', 'Red to green, inside the page layout. Readable at a glance, but the colour did all the talking, and red read like a failing grade.'],
      ['x-meter', 'Final', 'One calm green, and words', 'A single green arc, a “Good” label, and a sentence about the next milestone. Meaning never depends on colour alone.'],
      ['s-meter-bf', 'Seasonal', 'Dressed for Black Friday', 'The same component takes a seasonal skin, so campaigns don’t need a new layout.']],
    states: [
      ['active', 'Active', 's-active', '', 'Property information, its score, key attributes and shortcuts to common actions. Nothing shouts when nothing needs to.'],
      ['improve', 'Needs improvement', 'x-improve', 's-m-recs', 'The card expands to show recommendations for this property, with the points each one adds.'],
      ['publish', 'Unpublished', 'x-publish', 's-m-publish', 'Publishing becomes the primary action, instead of treating the property like a live listing.'],
      ['renew', 'Renewal approaching', 's-renew', 's-m-renew', 'The deadline surfaces on the card, and Renew moves to where the eye lands first.'],
      ['expired', 'Expired', 's-expired', 's-m-expired', 'Renewal takes clear priority, with a plain explanation of the subscription status.'],
      ['stellar', 'Stellar', 's-stellar', '', 'A quiet green confirmation and no upsell. A good listing deserves to hear it.'],
      ['stay', 'Stay support', 's-stay', '', 'Once the basics are covered, the single nudge slot can offer damage cover instead.']
    ],
    beyond: [['x-remind', 'Reminders', 'Relevant booking and billing updates, right on the dashboard.', [67, 41.6, 28.3, 17.8]], ['x-renew', 'Auto-renewal', 'Easier to discover when it’s turned off, before a listing lapses.', [67, 9, 28.3, 5.6]], ['x-perf', 'Property performance', 'Summary numbers stay close, without stealing focus from listings.', [67, 31.1, 28.3, 10]], ['x-filter', 'Search and filters', 'Agencies narrow long lists by status, renewals or visibility score.', [4.8, 30, 59.6, 3.8]]],
    evo: [['s-it-a', 'Iteration 1', 'Boost cards beside the score.', 'Clear, but every owner saw the same list.'], ['s-it-b', 'Iteration 2', 'Bigger cards, fewer of them.', 'More deliberate, but the listings slid down.'], ['s-it-c', 'Iteration 3', 'Fixes move onto the listing.', 'Each card carries its own next step.'], ['s-final', 'Final', 'Calm and consistent.', 'Actions lead, the meter sits in the side rail.']],
    ai: [['sys', 'Give AI the right constraints', 'I installed the project’s design system in Claude and explored growth-meter iterations inside an established visual language, instead of building every variation by hand.'],
      ['spark', 'Use desktop as the foundation', 'Once desktop was final, the core layout, components and interaction patterns already existed. Mobile didn’t need to start from scratch.'],
      ['figma', 'Accelerate mobile execution', 'Working with Claude directly on my Figma file, I got the mobile UI to roughly 90% of the intended direction in under two hours, then reviewed and refined it.']],
    measure: ['Engagement and CTA click-through rates', 'Recommendation interactions', 'Listing publication', 'Renewal behaviour', 'Auto-renewal discovery']
  };
  const tfIc = (k, cls = '') => `<svg class="tf-i ${cls}" viewBox="0 0 24 24" aria-hidden="true">${TF.ic[k]}</svg>`;
  const tfArc = 'M29.8 152.8A96 96 0 1 1 210.2 152.8';
  const tfCol = v => v < 50 ? '#E0533D' : v < 70 ? '#E8A912' : '#16825A';
  const tfCls = v => v >= 100 ? 'p' : v < 50 ? 'r' : v < 70 ? 'a' : 'g';
  const tfGauge = id => `<svg class="tf-gauge" id="${id}" viewBox="0 0 240 170" aria-hidden="true"><defs><linearGradient id="${id}G" x1="0" x2="1"><stop offset="0" stop-color="#E0533D"/><stop offset=".45" stop-color="#F2B705"/><stop offset="1" stop-color="#16825A"/></linearGradient></defs><path class="tk" d="${tfArc}" pathLength="100"/><path class="fl" d="${tfArc}" pathLength="100" stroke="#E0533D"/><circle class="kn" r="11" cx="29.8" cy="152.8"/></svg>`;
  const tfRing = (v, cls = '') => `<span class="tf-ring ${cls}" style="--v:${v};--rc:${tfCol(v)}"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15"/><circle class="f" cx="18" cy="18" r="15" pathLength="100"/></svg><b>${v}</b></span>`;
  const tfBrw = (img, alt, url = 'traum-ferienwohnungen.de/vermieterbereich/inserate', cls = '') => `<div class="tf-brw ${cls}"><div class="tbar"><i></i><i></i><i></i><span>${url}</span></div><div class="vp"><img src="${ti(img)}" alt="${alt}" loading="lazy"></div></div>`;
  const tfPhone = (inner, cls = '') => `<div class="tf-phone ${cls}"><span class="isl"></span><div class="scr">${inner}</div></div>`;
  function tfHTML(w) {
    const plq = (n, t) => `<p class="tf-pl" data-rv><span>${String(n).padStart(2, '0')}</span>${t}</p>`;
    const head = (a, b) => `<h3 class="tf-h" data-rv>${a}${b ? ` <span class="u">${b}</span>` : ''}</h3>`;
    const p = (t, cls = '') => `<p class="tf-p ${cls}" data-rv>${t}</p>`;
    const F = TF.first;
    const fcard = (k, [n, im, d, [ic, t, why, pt]]) => `<div class="tf-fc"><div class="top"><img src="${ti(im)}" alt=""><div><b>${n}</b><small>${d}</small></div></div>
      <div class="gen">${F.cat.map(([i, c]) => `<span>${tfIc(i)}${c}</span>`).join('')}</div>
      <div class="ctx"><span class="ic">${tfIc(ic)}</span><span class="tx"><b>${t}</b><small>${why}</small></span><em>${pt}</em></div></div>`;
    return `<div class="cs-bar tf-bar"><button class="cs-close" id="csClose" type="button"><span class="ar" aria-hidden="true">←</span>Back to the box</button><span class="tf-bk"><img src="v2/s/logo-traum.webp" alt=""> Haven · Host dashboard</span></div>
    <div class="tf tf-pg">
      <header class="tf-hero" id="tfHero">
        <p class="tf-k"><img src="v2/s/logo-traum.webp" alt=""><span>Haven-Ferienwohnungen, an <b>Orbit</b> company</span></p>
        <h2 class="tf-t"><span class="ln"><span>A score worth</span></span><span class="ln"><span class="u">chasing.</span></span></h2>
        <p class="tf-lead">Turning a property dashboard into a system that tells owners what to do next.</p>
        <p class="tf-meta"><span class="tf-b2b">B2B host dashboard</span> Product design <i></i> Desktop &amp; mobile web <i></i> 1 month</p>
        <div class="tf-hcard" id="tfHc">
          <div class="hd"><b>Growth meter</b><small>Your property’s visibility at a glance.</small></div>
          <div class="tf-gw">${tfGauge('tfHg')}<div class="tf-gv"><b id="tfHv">45</b><span class="tf-chip r" id="tfHch">Needs attention</span></div></div>
          <p class="msg" id="tfHm"></p>
          <ul class="acts">${TF.hero.map(([ic, t, pt], i) => `<li><button type="button" data-h="${i}"><span class="ic">${tfIc(ic)}</span><span class="t">${t}</span><em>+${pt}</em><span class="go">Add</span></button></li>`).join('')}</ul>
        </div>
        <p class="tf-try">Tap an action and watch the score move.</p>
      </header>

      <section class="tf-sec tf-open" id="tfOpen">
        ${head('Owners could manage listings.', 'Not grow them.')}
        ${p('The old dashboard let them edit, check and renew. It never answered the one question they actually had.')}
        <div class="tf-cmp2" data-rv id="tfCmp2" style="--x:50%">
          <div class="tf-brw"><div class="tbar"><i></i><i></i><i></i><span>traum-ferienwohnungen.de/vermieterbereich/inserate</span></div>
            <div class="cm-cv"><img src="${ti('cmp-after')}" alt="After: the redesigned Advertisements page" draggable="false"><div class="cm-bf"><img src="${ti('cmp-before')}" alt="Before: the old Advertisements page" draggable="false"></div>
              <span class="cm-tg l">Before</span><span class="cm-tg r">After</span><span class="cm-hd"><i>‹ ›</i></span>
              <input type="range" min="0" max="100" value="50" step=".1" aria-label="Drag to compare before and after"></div></div>
        </div>
      </section>

      <section class="tf-sec" id="tfWho">
        ${plq(1, 'Who it’s for')}
        ${head('Designed for', 'German owners, 30 to 50.')}
        ${p('Our ideal customer: a property owner in Germany, in their 30s or 40s, trying to get a holiday home listed and booked, often alongside a full-time job.')}
        <div class="tf-icp2" data-rv id="tfIcp">
          <figure class="icp-map"><svg viewBox="0 0 520 560" aria-label="Map of Germany with our hosts marked on the Baltic coast"><path class="nb" d="M396,-1968L407,-2025L450,-2030L486,-1973L535,-1914L581,-1856L508,-1798L492,-1694L467,-1668L453,-1560L418,-1555L356,-1634L382,-1682L339,-1721L283,-1843L260,-1965L339,-2024L355,-1966ZM858,-823L808,-790L785,-783L797,-841L760,-874L715,-846L701,-785L674,-750L642,-769L605,-765L573,-808L555,-786L537,-783L533,-730L479,-743L471,-700L443,-700L424,-646L395,-564L350,-466L361,-443L351,-417L322,-418L303,-357L305,-274L323,-243L314,-174L290,-134L277,-102L258,-136L201,-72L162,-59L122,-87L112,-147L102,-284L129,-324L205,-378L263,-446L316,-542L349,-612L385,-684L433,-743L472,-794L513,-845L576,-882L624,-878L668,-950L721,-946L773,-964L819,-932L863,-899L826,-876ZM751,-2031L708,-1944L624,-1925L539,-1951L534,-1996L492,-1999L460,-2076L550,-2125L592,-2083L621,-2135L694,-2091ZM673,-1698L609,-1642L558,-1673L578,-1709L560,-1754L620,-1782L631,-1729ZM-1536,1896L-1553,1922L-1562,1943L-1573,1954L-1587,1957L-1591,1948L-1598,1947L-1607,1955L-1619,1949L-1612,1937L-1609,1924L-1604,1911L-1616,1894L-1618,1874L-1603,1849L-1593,1852L-1572,1859L-1541,1884ZM137,365L151,376L192,385L178,415L174,445L166,453L153,449L154,460L133,483L132,502L146,496L156,514L155,526L163,542L153,554L161,585L176,591L173,608L147,631L90,620L48,633L44,656L11,661L-22,644L-32,652L-85,634L-97,619L-82,595L-76,513L-106,469L-128,448L-172,431L-175,399L-137,390L-89,401L-98,351L-71,370L-3,335L5,298L31,289L35,305L48,305L62,324L82,345L97,342L122,362L129,366ZM211,650L230,635L235,669L225,699L212,691L205,665ZM277,-102L290,-134L314,-174L323,-243L305,-274L303,-357L322,-418L351,-417L361,-443L350,-466L395,-564L424,-646L443,-700L471,-700L479,-743L533,-730L537,-783L555,-786L594,-747L639,-694L640,-579L649,-551L600,-531L572,-483L576,-441L530,-388L474,-333L453,-246L474,-204L501,-171L475,-107L445,-94L434,-3L417,46L382,41L366,82L332,85L323,36L299,-24ZM637,157L639,179L647,197L646,216L629,226L638,248L639,269L653,309L650,322L636,327L609,364L617,384L611,382L583,365L562,371L549,366L531,376L517,360L505,366L503,363L490,341L469,339L466,324L446,319L442,331L426,322L428,309L406,305L392,290L381,261L383,245L376,219L365,202L373,189L367,165L386,150L431,127L468,110L497,119L499,131L527,132L562,137L616,137L630,142ZM449,424L447,441L431,441L436,451L427,478L421,485L396,486L381,496L357,493L316,482L310,467L281,474L278,482L260,476L245,475L232,467L237,457L236,450L244,447L259,459L263,448L289,450L309,442L323,443L332,452L335,445L331,417L341,411L351,391L373,405L389,387L399,384L422,397L435,395L449,403L446,409ZM597,411L613,423L615,434L597,443L584,472L566,501L543,509L525,507L503,518L492,524L468,516L446,498L437,493L432,479L427,478L436,451L431,441L447,441L449,424L464,435L475,439L499,434L501,426L513,424L527,417L530,420L543,415L550,405L560,402L591,415ZM724,72L727,94L703,111L697,139L665,157L637,157L630,142L616,137L613,124L616,110L604,102L573,93L567,50L600,34L649,38L677,32L681,43L697,47ZM437,493L446,498L468,516L492,524L503,518L510,534L519,545L508,561L495,552L475,552L450,546L436,546L430,555L420,546L414,563L428,582L434,594L447,609L458,618L469,634L495,649L492,656L465,642L448,627L421,615L397,586L403,583L390,566L389,552L370,546L362,563L353,550L354,535L355,535L375,536L380,529L390,536L401,537L401,525L411,521L414,504ZM236,450L237,457L232,467L245,475L260,476L258,494L245,501L224,495L217,512L204,514L199,507L182,521L168,523L156,514L146,496L132,502L133,483L154,460L153,449L166,453L174,445L199,446L205,436ZM133,335L139,345L137,365L129,366L122,362L125,337ZM136,304L133,335L125,337L122,362L97,342L82,345L62,324L48,305L35,305L31,289L54,279L75,283L102,273L120,294ZM158,178L163,194L156,238L149,256L131,256L136,304L120,294L102,273L75,283L54,279L69,267L94,197L134,177ZM260,476L278,482L281,474L310,467L316,482L357,493L354,513L361,531L338,525L315,540L316,560L313,571L322,592L349,612L364,645L396,677L419,676L426,685L418,693L444,707L465,718L490,738L493,745L487,759L471,741L446,735L434,759L455,773L451,793L439,795L424,826L412,829L412,818L418,798L424,790L413,769L404,750L392,745L383,729L365,722L352,706L331,704L308,686L282,661L262,638L253,599L239,594L215,581L202,586L185,605L173,608L176,591L161,585L153,554L163,542L155,526L156,514L168,523L182,521L199,507L204,514L217,512L224,495L245,501L258,494ZM385,821L407,817L397,846L401,858L395,876L373,863L358,859L318,840L322,821L355,825ZM210,717L224,705L242,733L238,782L225,780L213,792L202,783L201,737L194,715ZM245,104L227,111L205,105L193,77L192,24L197,10L205,-6L231,-10L241,-24L264,-40L263,-12L255,5L258,20L274,28L267,48L258,42L237,79ZM316,46L325,72L308,113L277,84L273,63ZM-221,159L-243,149L-261,150L-255,123L-261,96L-237,94L-206,125ZM-131,182L-131,182L-127,153L-147,123L-147,122L-182,113L-189,100L-178,77L-188,63L-204,87L-205,38L-220,11L-209,-45L-187,-89L-164,-85L-129,-89L-160,-30L-130,-38L-99,-37L-106,6L-132,53L-102,57L-100,62L-74,122L-54,130L-37,186L-28,205L7,214L3,244L-12,258L0,282L-26,306L-65,306L-114,318L-127,309L-147,331L-173,325L-194,343L-209,334L-167,286L-141,276L-141,276L-186,268L-194,249L-164,235L-180,209L-174,177ZM357,493L381,496L396,486L421,485L427,478L432,479L437,493L414,504L411,521L401,525L401,537L390,536L380,529L375,536L355,535L361,531L354,513ZM611,382L603,393L597,411L591,415L560,402L550,405L543,415L530,420L527,417L513,424L501,426L499,434L475,439L464,435L449,424L446,409L449,403L453,393L466,394L475,390L476,386L482,383L484,373L490,371L495,363L503,363L505,366L517,360L531,376L549,366L562,371L583,365ZM392,290L406,305L428,309L426,322L442,331L446,319L466,324L469,339L490,341L503,363L495,363L490,371L484,373L482,383L476,386L475,390L466,394L453,393L449,403L435,395L422,397L399,384L389,387L373,405L351,391L335,372L320,361L317,342L312,329L333,319L344,308L365,299L372,290L380,295Z"/><path class="de" d="M234,450L229,446L224,443L222,443L215,444L215,444L214,442L212,441L212,442L211,442L211,442L207,439L206,439L204,439L202,441L201,442L201,444L203,444L205,444L206,444L206,445L206,445L203,446L203,446L202,447L201,447L199,446L195,446L192,447L187,448L181,448L178,447L177,446L176,443L176,439L178,433L178,429L177,426L178,422L181,417L183,411L184,405L185,401L187,399L193,391L194,390L193,387L192,386L189,385L184,384L178,383L176,382L174,379L172,379L170,380L166,380L164,380L162,380L162,380L161,380L161,377L159,377L157,376L156,376L155,378L154,379L153,378L149,373L148,371L148,370L147,368L145,366L143,365L142,365L142,363L143,359L143,357L145,355L146,354L146,352L146,350L144,350L141,348L139,347L138,345L136,342L135,339L135,337L135,335L135,335L137,330L142,327L142,323L141,320L140,319L138,318L137,317L136,316L138,314L136,312L135,310L132,308L131,307L133,300L132,298L130,297L129,296L128,295L128,294L128,293L130,293L130,293L135,289L136,288L135,287L134,287L134,286L134,285L136,279L137,276L137,275L137,273L136,270L134,268L134,266L133,265L130,260L130,258L132,257L134,256L135,255L136,254L140,256L142,257L142,257L144,256L147,256L153,253L154,252L155,250L155,250L152,247L152,246L153,245L153,244L155,244L156,242L160,239L161,236L161,233L162,231L161,229L160,228L158,228L156,228L153,227L152,225L152,224L152,223L152,222L152,221L152,220L153,219L161,219L161,218L162,214L164,207L166,203L166,201L166,192L166,188L165,186L162,183L163,178L164,174L166,170L169,168L179,168L190,168L194,175L193,179L195,180L197,180L198,177L198,173L199,172L203,175L204,176L204,182L205,174L204,169L205,164L206,161L207,159L215,161L224,160L228,162L235,172L238,174L241,175L237,172L227,160L225,158L220,158L218,156L216,154L216,153L216,140L214,138L212,137L211,138L208,138L208,135L208,133L214,132L217,130L217,126L215,123L212,118L209,113L209,108L214,108L216,108L224,111L226,113L228,113L233,111L236,110L238,111L239,112L240,112L240,113L244,114L246,116L248,119L248,124L246,127L244,129L251,129L252,130L253,133L258,131L268,137L275,134L277,134L278,139L276,144L271,149L272,152L274,153L279,152L288,155L290,154L297,147L299,146L308,144L310,142L314,139L316,136L322,130L328,131L331,132L335,132L338,139L347,146L355,145L358,152L359,160L362,163L364,164L370,166L370,166L371,167L371,171L372,174L375,188L375,191L375,192L374,196L372,200L369,202L367,205L367,207L370,212L378,218L381,224L380,229L379,232L380,234L381,236L383,237L383,239L383,242L383,244L385,245L385,246L384,247L383,251L383,253L380,257L381,260L383,263L384,265L384,266L384,270L384,271L389,274L390,275L391,278L392,284L391,291L390,295L387,301L386,302L386,303L385,304L384,304L382,303L381,302L381,299L380,299L379,297L379,296L378,295L374,294L372,294L371,294L370,295L371,296L372,298L374,299L374,300L369,302L366,304L363,304L360,306L354,308L350,309L349,309L348,313L347,314L346,313L345,313L344,313L343,314L342,315L341,315L339,318L335,319L334,320L333,322L332,322L330,322L327,321L326,322L324,323L321,323L318,325L316,328L314,332L313,333L312,330L310,328L309,327L308,327L308,327L308,329L309,331L310,333L310,334L311,336L313,339L316,341L318,343L320,346L320,346L320,347L319,348L318,350L316,353L317,354L318,355L320,357L321,360L323,365L325,367L327,369L329,371L332,371L335,374L338,378L341,380L342,381L344,383L345,385L346,386L347,387L350,387L354,391L356,394L358,396L357,396L357,399L357,402L357,403L355,405L354,406L354,406L348,404L348,404L347,404L346,412L345,413L343,415L340,416L338,417L336,417L331,420L329,422L327,424L327,426L330,430L333,434L333,437L331,440L331,441L332,441L334,442L335,442L336,444L335,447L335,450L335,451L333,452L331,450L329,449L328,448L328,447L328,446L327,445L325,443L322,444L320,445L319,445L318,443L316,442L313,442L311,441L311,442L311,444L311,445L297,447L293,448L290,450L288,451L287,452L285,454L282,454L282,454L280,454L277,455L276,455L275,454L273,452L272,451L273,450L269,450L266,448L261,449L260,448L260,449L259,454L258,456L256,459L254,460L253,460L253,458L253,456L252,456L250,456L249,455L249,454L249,453L248,452L246,450L243,448L240,447L239,448L237,449L234,449ZM355,134L355,137L355,139L351,136L348,136L346,140L345,141L340,137L339,135L339,133L339,128L339,126L341,124L341,121L344,118L346,118L347,120L348,122L352,124L353,125L354,126L352,129L351,130L352,132ZM369,155L369,157L369,159L368,159L364,159L361,159L360,156L361,153L359,151L358,150L358,148L358,146L364,151ZM284,132L280,132L278,130L277,130L277,127L279,126L283,128L284,131ZM198,114L198,115L198,108L201,100L203,100L201,102L201,104L200,106L200,108L208,108L207,110L199,111ZM206,117L205,119L203,118L201,117L202,116L203,115L204,115L206,116Z"/><text class="lbl" x="256" y="295.4" text-anchor="middle">GERMANY</text><circle class="pls" cx="274.8" cy="142.9" r="9"/><circle class="dot" cx="274.8" cy="142.9" r="7"/></svg>
            <span class="icp-tag" style="left:52.8%;top:25.5%">Baltic coast</span><figcaption>Core market: Germany</figcaption></figure>
          <div class="icp-id">
            <div class="id-top"><span>Host profile</span><img src="v2/s/logo-traum.webp" alt=""></div>
            <div class="id-body"><svg viewBox="0 0 120 140" class="av" aria-hidden="true"><rect width="120" height="140" fill="#DCE9F3"/><path d="M12 140c4-30 22-44 48-44s44 14 48 44z" fill="#3F6E8C"/><path d="M42 102l18 14 18-14" fill="none" stroke="#fff" stroke-width="4"/><path d="M50 84h20v16c0 6-20 6-20 0z" fill="#E2AE88"/><ellipse cx="60" cy="58" rx="24" ry="28" fill="#EDBE98"/><path d="M36 60c0-24 10-34 24-34s24 10 24 34c-3-8-6-14-10-16-8 3-20 3-30 0-4 3-6 9-8 16z" fill="#B9B4AE"/><path d="M38 66c2 16 10 24 22 24s20-8 22-24c-4 6-10 9-22 9s-18-3-22-9z" fill="#A8A29C"/><path d="M52 76c4 2 12 2 16 0" stroke="#8A5A46" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="51" cy="59" r="7" fill="none" stroke="#2A2420" stroke-width="2"/><circle cx="69" cy="59" r="7" fill="none" stroke="#2A2420" stroke-width="2"/><path d="M58 59h4M44 58h-6M76 58h6" stroke="#2A2420" stroke-width="2"/><circle cx="51" cy="59" r="1.8" fill="#2A2420"/><circle cx="69" cy="59" r="1.8" fill="#2A2420"/><path d="M45 49c3-2 8-2 11 0M64 49c3-2 8-2 11 0" stroke="#8C8680" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg><dl>${[['Name', 'Thomas B.'], ['Age', '46'], ['Region', 'Baltic coast, Schleswig-Holstein'], ['Owns', '2 holiday flats'], ['Uses', 'Desktop at home, phone on the go'], ['Wants', 'More bookings, less admin']].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></div>
            <div class="id-age"><span>Typical age</span><div class="ax"><i class="band"></i><i class="me" style="left:52%"></i></div><div class="lb"><span>20</span><b>30–50</b><span>70</span></div></div>
            <p class="id-ft">Illustrative profile of our ideal customer</p>
          </div>
        </div>
        <div class="icp-jobs2" data-rv><p class="k">What they come to the page to do</p><div>${[['Add a property', 'Get a new home listed and live.', 'pen'], ['Keep it visible', 'Know if a listing is doing well, and how to help it.', 'chart'], ['Stay live', 'Renew on time, without surprises.', 'clock']].map(([t, d, ic], i) => `<div style="--i:${i}"><span class="ic">${tfIc(ic)}</span><b>${t}</b><small>${d}</small></div>`).join('')}</div></div>
      </section>

      <section class="tf-sec" id="tfNum">
        ${plq(2, 'The numbers')}
        ${head('The numbers told me', 'where to look.')}
        ${p('I went through page analytics, support tickets, stakeholder sessions and competitor products. One pattern stood out.')}
        <div class="tf-mk" id="tfMk">
          <div class="mk-pin">
            <div class="mk-steps" role="tablist">${TF.ctr.map(([t, , , c], i) => `<button type="button" role="tab" data-k="${i}" style="--c:${c}">${t}</button>`).join('')}</div>
            <div class="mk-card" data-s="0">
              <div class="mk-body"><img src="${ti('ph')}" alt=""><div class="mk-tx"><small>No. 343300</small><b>Holiday apartment Strandhuus</b><p><span>${tfIc('check')}Pictures</span><span>${tfIc('check')}Prices</span><span class="dash">${tfIc('x')}Occupancy plan</span></p></div></div>
              <div class="mk-act"><span class="mk-ic">${tfIc('mail')}</span><span class="mk-ic mk-stat">${tfIc('chart')}<em>Statistics</em></span><span class="mk-sp"></span><span class="mk-ren">Renew<span class="lg"> subscription</span></span><span class="mk-pub">Publish</span></div>
            </div>
            <div class="mk-read" aria-live="polite">
              <div class="mk-num"><b id="tfMkV">34.65%</b><span id="tfMkL">of visits opened a listing</span></div>
              <div class="mk-ppl" id="tfMkP">${'<i><svg viewBox="0 0 24 24"><circle cx="12" cy="7.5" r="4"/><path d="M4 21c.8-4.6 4-7 8-7s7.2 2.4 8 7z"/></svg><span></span></i>'.repeat(10)}</div>
              <p class="mk-one" id="tfMkO"></p>
            </div>
          </div>
        </div>
      </section>

      <section class="tf-sec tf-find" id="tfFind">
        ${plq(3, 'What we found')}
        <p class="tf-rv2" id="tfRv">${['Owners came to', '<k>look</k>,', 'not to', '<k>act.</k>'].join(' ').split(' ').map(w => w.startsWith('<k>') ? `<i class="k">${w.replace(/<\/?k>/g, '')}</i>` : `<i>${w}</i>`).join(' ')}</p>
        <div class="tf-fs" data-rv id="tfBub">
          <p class="fs-k"><span>Per 1,000 visits</span><span>So the design</span></p>
          ${[['347', 'opened a listing', '#E8A912', 'Puts the help on the listing itself'], ['14', 'renewed', '#E06A3F', 'Surfaces renewal before the deadline'], ['4.5', 'published', '#D9476B', 'Makes Publish the first action on offline listings']].map(([n, t, c, f], i) => `<div class="fs-r" style="--c:${c};--i:${i}"><span class="fs-n"><b>${n}</b>${t}</span><span class="fs-ar">${tfIc('arrow')}</span><span class="fs-f">${f}</span></div>`).join('')}
        </div>
        <div class="tf-eq" data-rv id="tfEq">
          <p class="eq-k">So the brief wrote itself</p>
          <div class="eq-row"><span class="t g"><small>Where they look</small>The listing</span><i>+</i><span class="t b"><small>What it lacked</small>The next step</span><i>−</i><span class="t r"><small>What they ignore</small><s>A sales pitch</s></span></div>
          <p class="eq-q"><span class="lab">How might we</span> make the listing tell owners <span class="u">what to do next</span>, without selling at them?</p>
        </div>
      </section>

      <section class="tf-sec tf-pins" id="tfPins">
        ${plq(4, 'The problems')}
        ${head('Four problems,', 'pinned to the wall.')}
        ${p('Each one came up in the data, the tickets and the stakeholder sessions. Tap a note to see what it meant for the design.')}
        <div class="tf-board" data-rv id="tfBoard">${TF.pins.map(([f, b, n, c], i) => `<button type="button" class="tf-pin" style="--r:${[-3, 2.5, -1.5, 3][i]}deg;--c:${c};--i:${i}" aria-pressed="false"><span class="tack"></span><span class="in"><span class="fr"><em>Problem ${i + 1}</em><b>${f}</b><small>Tap to flip</small></span><span class="bk"><em>What it meant</em><span class="ev">${b}</span><b>→ ${n}</b></span></span></button>`).join('')}</div>
      </section>

      <section class="tf-sec" id="tfFirst">
        <div class="tf-sh" id="tfSh">
          <div class="sh-pin">
            <div class="sh-hd">
        ${plq(5, 'A wrong turn')}
        ${head('My first idea', 'wasn’t the best one.')}
        ${p('I started with a separate catalogue of add-ons. Then I watched one property need just one of them.')}
            </div>
            <ol class="sh-steps">${['A catalogue for everyone', 'This property needs one thing', 'The offer moves in', 'Added'].map((t, i) => `<li data-k="${i}"><button type="button" data-k="${i}"><i>${i + 1}</i><span>${t}</span></button></li>`).join('')}</ol>
            <div class="sh-stage" data-s="0">
              <div class="sh-card">
                <div class="sh-top"><img src="${ti('ph3')}" alt=""><div><small>No. 343303</small><b>Chalet Bergblick</b><p><span class="no sh-ph">${tfIc('x')}Only 6 phone photos</span><span>${tfIc('check')}Prices</span><span>${tfIc('check')}Calendar</span></p></div><span class="sh-sc">${tfRing(48)}</span></div>
                <div class="sh-rec"><img src="${ti('rc-1')}" alt=""><span><em>+25 points</em><b>Photography Showcase</b><small>Pro photos, because this listing has only six.</small></span><button type="button" class="sh-add">Add</button></div>
              </div>
              <div class="sh-cat"><p>Add-ons</p><div>${[['cam', 'Photography'], ['play', 'Virtual tour'], ['star', 'Top listing'], ['mail', 'Newsletter']].map(([ic, t], i) => `<span class="${i ? '' : 'fit'}">${tfIc(ic)}${t}</span>`).join('')}</div></div>
              <div class="sh-note"><span class="tack"></span><em>The principle</em><b>Show the right opportunity where the need becomes clear.</b></div>
            </div>
          </div>
        </div>
      </section>

      <section class="tf-sec" id="tfMeter">
        ${plq(6, 'The visibility meter')}
        ${head('Enter the', 'visibility meter.')}
        ${p('One number from 0 to 100 that tells owners how visible a property is. Drag it.')}
        <div class="tf-m3" data-rv id="tfGm">
          <div class="m3-card">
            <div class="hd"><b>Growth meter <span class="i">i</span></b><small>Your property’s visibility at a glance.</small></div>
            <div class="m3-g"><svg class="tf-gauge g3" id="tfG" viewBox="-16 -14 272 186" aria-label="Growth meter. Drag the knob to change the score."><path id="tfLp0" d="M9.1 160.4A118 118 0 0 1 115.5 2.1" fill="none"/><text class="bl" data-s="0"><textPath href="#tfLp0" startOffset="50%" text-anchor="middle">Needs attention</textPath></text><path id="tfLp1" d="M120.0 2.0A118 118 0 0 1 225.9 67.9" fill="none"/><text class="bl" data-s="1"><textPath href="#tfLp1" startOffset="50%" text-anchor="middle">Good</textPath></text><path id="tfLp2" d="M227.8 72.0A118 118 0 0 1 232.4 156.1" fill="none"/><text class="bl" data-s="2"><textPath href="#tfLp2" startOffset="50%" text-anchor="middle">Great</textPath></text><text class="bl" data-s="3" x="234.9" y="176.4" text-anchor="start">Max</text><path class="sg" data-s="0" d="M29.8 152.8A96 96 0 0 1 117.8 24.0" stroke="#E0533D"/><path class="sg" data-s="1" d="M122.2 24.0A96 96 0 0 1 206.8 78.9" stroke="#E8A912"/><path class="sg" data-s="2" d="M208.6 83.0A96 96 0 0 1 211.2 150.0" stroke="#16825A"/><path class="sg" data-s="3" d="M210.6 151.8A96 96 0 0 1 210.2 152.8" stroke="#16825A"/><text class="tk2" x="46.7" y="149.7" text-anchor="middle">0</text><text class="tk2" x="120.0" y="45.0" text-anchor="middle">50</text><text class="tk2" x="191.3" y="91.3" text-anchor="middle">80</text><text class="tk2" x="193.3" y="149.7" text-anchor="middle">100</text><path class="fl" d="M29.8 152.8A96 96 0 1 1 210.2 152.8" pathLength="100" stroke="#E0533D"/><circle class="halo" r="22" cx="29.8" cy="152.8"/><circle class="kn" r="12" cx="29.8" cy="152.8"/></svg><div class="tf-gv"><b id="tfGv">72</b><span class="tf-chip g" id="tfGc">Good</span></div><span class="m3-hint" id="tfGh">Drag me</span></div>
            <p class="msg" id="tfGmsg"></p>
          </div>
          <p class="m3-k">The same score, on every listing card</p>
          <div class="m3-li"><img src="${ti('ph')}" alt=""><span><small>NO. 343300</small><b>Strandhuus, Wohnung 307</b><em id="tfGl">Good</em></span><span id="tfGring">${tfRing(72)}</span></div>
        </div>
        <h4 class="tf-h4" data-rv>Three rules it had to follow.</h4>
        <div class="tf-pr" data-rv>${[['sys', 'Made of real factors', 'Listing status, photos, location, calendar and add-ons.'], ['people', 'Readable at any age', 'A familiar gauge, clear type, and words over colour.'], ['warn', 'A proxy, not a promise', 'It reflects quality and potential reach, not a ranking guarantee.']].map(([ic, t, d]) => `<div><span class="ic">${tfIc(ic)}</span><b>${t}</b><p>${d}</p></div>`).join('')}</div>
        <h4 class="tf-h4" data-rv>How the meter grew up.</h4>
        <div class="tf-ev" data-rv id="tfEv">
          <div class="ev-stage">
            <span class="ev-cone" aria-hidden="true"></span><span class="ev-floor" aria-hidden="true"></span>
            ${TF.gev.map(([, k], i) => `<button type="button" class="ev-c" data-k="${i}" aria-label="${k}"><img src="${ti('gm' + (i + 1))}" alt="Growth meter, ${k}"><span class="ev-tag">${k}</span></button>`).join('')}
          </div>
          <div class="ev-tx"><p class="ev-k" id="tfEvK"></p><b id="tfEvT"></b><div class="ev-gb"><p class="ev-good" id="tfEvG"></p><p class="ev-bad" id="tfEvB"></p></div></div>
          <div class="ev-nav"><button type="button" class="pv" aria-label="Previous version">←</button><span class="ev-dots">${TF.gev.map((_, i) => `<i data-k="${i}"></i>`).join('')}</span><button type="button" class="nx" aria-label="Next version">→</button></div>
        </div>
        <p class="tf-rv2 sm">${'The real innovation wasn’t the gauge. It was what happened <k>after someone saw their score.</k>'.replace(/<k>(.*?)<\/k>/, (m, x) => x.split(' ').map(w => '\u0001' + w).join(' ')).split(' ').map(w => w.startsWith('\u0001') ? `<i class="k">${w.slice(1)}</i>` : `<i>${w}</i>`).join(' ')}</p>
      </section>

      <section class="tf-sec" id="tfNext">
        ${plq(7, 'The next step')}
        ${head('A score is useless', 'without a next step.')}
        ${p('So the top of the page became a tray of next steps, picked for each owner’s properties and sorted by how much they’d move the score. Same tray, different owners:')}
        <div class="tf-rt" data-rv id="tfRt">
          <div class="rt-who" role="tablist">${TF.owners.map(([n, d, im, v], i) => `<button type="button" role="tab" data-o="${i}"${i ? '' : ' class="on" aria-selected="true"'}><img src="${ti(im)}" alt=""><span><b>${n}</b><small>${d}</small></span></button>`).join('')}</div>
          <div class="rt-tray">
            <div class="rt-hd"><div><b>Recommended actions for you <span class="i">i</span> <em>New</em></b><small>Complete recommended actions to improve your score</small></div><div class="rt-sc"><span id="tfRtR"></span><span><b id="tfRtV">0</b><small>/100</small></span></div></div>
            <div class="rt-row" id="tfRtRow"></div>
            <p class="rt-why" id="tfRtW"></p>
          </div>
        </div>
      </section>

      <section class="tf-sec" id="tfAB">
        ${plq(8, 'Two contenders')}
        ${head('Stuck between', 'two good layouts.')}
        ${p('Both versions worked on paper. So instead of picking one in a meeting, we called owners and ran an A/B test.')}
        <div class="tf-ab" data-rv id="tfAb" data-s="0">
          <ol class="ab-steps">${['Two versions', 'Calls with owners', 'A/B test', 'The go-ahead'].map((t, i) => `<li><button type="button" data-k="${i}"><i>${i + 1}</i>${t}</button></li>`).join('')}</ol>
          <div class="ab-pair">${[['A', 'Meter and actions on the left', 'a'], ['B', 'Actions left, meter on the right', 'b']].map(([k, t, c]) => `<figure class="ab-v ${c}"><figcaption><b>${k}</b><span>${t}</span></figcaption>
            <div class="ab-wf"><div class="w-l">${c === 'a' ? '<span class="w-m"><i></i></span><span class="w-r"><i></i><i></i><i></i></span>' : '<span class="w-r"><i></i><i></i><i></i></span>'}<span class="w-li"></span><span class="w-li"></span><span class="w-li"></span></div><div class="w-s">${c === 'b' ? '<span class="w-m"><i></i></span>' : ''}<span class="w-p"></span><span class="w-p"></span></div></div>
            <div class="ab-call"><span class="ph">${tfIc('people')}</span><span class="q">${c === 'a' ? '“Where do I start? The score and the offers fight for my eye.”' : '“I see what to do first, and the score sits there when I want it.”'}</span></div>
            <span class="ab-win">Selected ✓</span></figure>`).join('')}</div>
          <p class="ab-cap" id="tfAbC"></p>
        </div>
      </section>

      <section class="tf-sec" id="tfBal">
        ${plq(9, 'Trade-offs')}
        ${head('The hardest part was', 'balancing priorities.')}
        ${p('A prominent growth meter mattered. But on mobile web, a bigger meter pushes the listings, the thing owners actually came for, further down. Try it.')}
        <div class="tf-fold" data-rv id="tfFold">
          ${tfPhone(`<div class="tf-fk"><div class="fnav"><b>traum</b><i></i></div><div class="gm"><b>Growth meter</b><span class="arc"></span><span class="n">72</span></div>${[1, 2, 3, 4].map(i => `<div class="li"><span class="ph"></span><span class="l"><i></i><i></i><i></i></span></div>`).join('')}</div><span class="line"><span>Fold</span></span>`, 'fold')}
          <div class="tf-foldc"><p class="k">Growth meter size on mobile</p><div class="tf-sw2" role="tablist">${[['s', 'Compact'], ['m', 'Medium'], ['l', 'Hero']].map(([k, t], i) => `<button type="button" data-z="${k}"${i ? '' : ' class="on" aria-selected="true"'}>${t}</button>`).join('')}</div>
            <p class="out"><b id="tfFn">2</b> listings visible before scrolling</p><p class="d" id="tfFd"></p></div>
        </div>
        <div class="tf-tri" data-rv>${[['For owners', 'Keep the hierarchy clear, the language understandable, and the colours purposeful.', 'sky'], ['For the business', 'Improve discovery of relevant offers, without showing every promotion at once.', 'sun'], ['For engineering', 'Reuse existing components wherever possible and avoid unnecessary complexity.', 'mint']].map(([t, d, c]) => `<div class="${c}"><b>${t}</b><p>${d}</p></div>`).join('')}</div>
        <div class="tf-it" id="tfEvo">
          <div class="it-pin">
            <h4 class="tf-h4">Iterating as the feedback came in.</h4>
            <div class="tf-brw"><div class="tbar"><i></i><i></i><i></i><span>traum-ferienwohnungen.de/vermieterbereich/inserate</span></div><div class="it-vp">${TF.evo.map(([im, k, t], i) => `<img src="${ti(im)}" alt="${k}: ${t}" data-i="${i}" loading="lazy"${i ? '' : ' class="on"'}>`).join('')}</div></div>
            <div class="it-dots">${TF.evo.map(([, k], i) => `<button type="button" data-i="${i}"><i></i><span>${k}</span></button>`).join('')}</div>
            <p class="it-cap"><b id="tfItT"></b> <span id="tfItD"></span></p>
          </div>
        </div>
        <div class="tf-team" data-rv>
          <div class="who"><p class="k">Approximately one month, together with</p><ul>${[['AP', 'Associate product manager'], ['DV', 'Developer'], ['DM', 'Design manager']].map(([a, t]) => `<li><i>${a}</i>${t}</li>`).join('')}</ul><p class="me">I owned the end-to-end design across desktop and mobile web.</p></div>
          <div class="drop"><span class="stamp">Dropped</span><b>24-hour booking opt-in</b><p>Explored, then cut because of technical and business constraints. Knowing when to simplify scope is part of designing for a real product.</p></div>
        </div>
      </section>

      <section class="tf-sec" id="tfAi">
        ${plq(10, 'Working with AI')}
        ${head('AI helped me spend less time', 'pushing pixels.')}
        ${p('Not more screens. Less repetitive work, so I had more time for the problem itself.')}
        <div class="ai2" data-rv>
          <div class="st" style="--i:0"><div class="vis"><div class="ai-sys"><span class="sw"><i></i><i></i><i></i><i></i></span><span class="bt">Add</span><span class="ch">↗ Good</span><svg viewBox="0 0 64 40"><path d="M6 36A26 26 0 0 1 58 36" class="tr"/><path d="M6 36A26 26 0 0 1 58 36" class="vl" pathLength="100" stroke="#16825A" style="stroke-dasharray:72 100"/></svg><span class="ln"><i></i><i></i></span></div></div><b>The design system</b><small>Real components, so every idea stays on-brand.</small></div>
          <span class="cn" aria-hidden="true"></span>
          <div class="st" style="--i:1"><div class="vis"><div class="ai-fan"><span class="ai-mc"><svg viewBox="0 0 64 40"><path d="M6 36A26 26 0 0 1 58 36" class="tr"/><path d="M6 36A26 26 0 0 1 58 36" class="vl" pathLength="100" stroke="#E0533D" style="stroke-dasharray:12 100"/></svg><b>12</b></span><span class="ai-mc"><svg viewBox="0 0 64 40"><path d="M6 36A26 26 0 0 1 58 36" class="tr"/><path d="M6 36A26 26 0 0 1 58 36" class="vl" pathLength="100" stroke="#E8A912" style="stroke-dasharray:53 100"/></svg><b>53</b></span><span class="ai-mc"><svg viewBox="0 0 64 40"><path d="M6 36A26 26 0 0 1 58 36" class="tr"/><path d="M6 36A26 26 0 0 1 58 36" class="vl" pathLength="100" stroke="#16825A" style="stroke-dasharray:72 100"/></svg><b>72</b></span><em>${tfIc('spark')} Claude</em></div></div><b>Claude explores</b><small>Many meter variations, without drawing each by hand.</small></div>
          <span class="cn" aria-hidden="true"></span>
          <div class="st" style="--i:2"><div class="vis"><div class="ai-dm"><span class="dk"><i></i><i></i><i></i><i></i></span><span class="ar">→</span><span class="ph"><i></i><i></i><i></i><i></i><i class="todo"></i></span></div></div><b>Desktop becomes mobile</b><small>The patterns already existed. AI did the re-layout.</small></div>
        </div>
        <p class="ai2-st" data-rv><b>Under 2 hours</b><span>to get the mobile UI about 90% there. The last 10% I reviewed and refined by hand.</span></p>
        <p class="tf-mid" data-rv>Let AI handle the repetition. Spend the time on harder problems.</p>
      </section>

      <section class="tf-sec" id="tfFin">
        ${plq(11, 'The final UI')}
        ${head('Here’s where', 'it landed.')}
        ${p('Desktop and mobile web, side by side. Scroll inside each screen to see the whole page.')}
        <div class="tf-fin" data-rv>
          <figure class="fn-d"><figcaption><i></i>Desktop web<small>↕ Scroll</small></figcaption><div class="tf-brw"><div class="tbar"><i></i><i></i><i></i><span>traum-ferienwohnungen.de/vermieterbereich/inserate</span></div><div class="vp"><img src="${ti('s-final')}" alt="The final desktop dashboard, full page" loading="lazy"></div></div></figure>
          <figure class="fn-m"><figcaption><i></i>Mobile web<small>↕ Scroll</small></figcaption>${tfPhone(`<img src="${ti('mobile')}" alt="The final mobile dashboard, full page" loading="lazy">`, 'fn-ph')}</figure>
        </div>
      </section>

      <section class="tf-sec" id="tfNx">
        ${plq(12, 'What happens next')}
        ${head('Next up:', 'proving it works.')}
        ${p('The designs are approved and being built. From here, the work is validation.')}
        <div class="nx-track" data-rv><ol>${[['Research', 'd'], ['Design', 'd'], ['Approved', 'd'], ['In development', 'now'], ['Launch & measure', '']].map(([t, c], i) => `<li class="${c}" style="--i:${i}"><span class="dot">${c === 'd' ? tfIc('check') : ''}</span><b>${t}</b>${c === 'now' ? '<em>We are here</em>' : ''}</li>`).join('')}</ol></div>
        <h4 class="tf-h4 nx-h" data-rv>What success looks like.</h4>
        <div class="nx-tg" data-rv>${[['+5%', 'Page engagement', 'On the advertisement page', 0], ['+3–4%', 'Renewals', 'From clearer states and better offers', 1]].map(([n, t, d, r]) => `<div class="nx-c"><div class="t"><b>${n}</b><span><strong>${t}</strong><small>${d}</small></span></div>
          <svg viewBox="-4 -6 328 122" aria-hidden="true"><line class="ax" x1="0" y1="96" x2="316" y2="96"/><text class="tx" x="0" y="70">Baseline</text><path class="base" d="M0 80 H160"/><line class="lx" x1="160" y1="8" x2="160" y2="96"/><text class="tx" x="168" y="16">Launch</text>
            <g class="pj">${r ? '<path class="area" d="M160 80 C220 80 262 46 310 40 L310 24 C262 30 220 80 160 80Z"/><path class="proj" d="M160 80 C220 80 262 46 310 40"/><path class="proj" d="M160 80 C220 80 262 30 310 24"/><path class="rng" d="M310 24 V40"/>' : '<path class="area" d="M160 80 C220 80 262 40 310 32 V96 H160Z"/><path class="proj" d="M160 80 C220 80 262 40 310 32"/><circle class="end" cx="310" cy="32" r="5"/>'}</g></svg></div>`).join('')}</div>
        <p class="nx-cap" data-rv>Targets agreed with product and business. Not results, yet.</p>
        <div class="nx-ms" data-rv><p>After launch, measured against a historical baseline</p><ul>${TF.measure.map(t => `<li>${t}</li>`).join('')}</ul></div>
      </section>

      <section class="tf-end" id="tfEnd">
        <div class="tk-note" data-rv>
          <span class="tk-tape" aria-hidden="true"></span>
          <p class="tk-k">The takeaway</p>
          <p class="tk-in">I started with a dashboard that showed owners what they had. I wanted one that showed them <b>what to do next.</b></p>
          <ul class="tk-l">${[['The meter', 'made progress tangible.'], ['Recommendations', 'connected progress to action.'], ['Listing states', 'made everyday management clearer.'], ['AI', 'bought me time for the decisions.']].map(([a, b], i) => `<li style="--i:${i}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13l5 5L20 6" pathLength="1"/></svg><span><b>${a}</b> ${b}</span></li>`).join('')}</ul>
          <p class="tf-last">Good product design doesn’t just expose opportunities. It helps people recognise <span class="u">which one matters to them, and why.</span></p>
          <p class="tk-sig">Alex</p>
        </div>
      </section>

      <footer class="c3-foot tf-foot">
        <div class="c3-w c3-fin"><p class="kicker c3-k" data-rv>${STAR}That’s a wrap</p>
          ${edHead('Thanks for', 'reading this far!', '', 'b-sun')}
          <p class="c3-p" data-rv>Designed with care by Alex Morgan.</p>
          <div class="c3-links" data-rv><a class="soc li" href="#hello" target="_blank" rel="noopener" aria-label="LinkedIn"><svg class="soc-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg><span class="soc-t">LinkedIn ↗</span></a><a class="soc ig" href="#hello" target="_blank" rel="noopener" aria-label="Instagram"><svg class="soc-i" viewBox="0 0 24 24" aria-hidden="true"><path  d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg><span class="soc-t">Instagram ↗</span></a><a class="soc gm" href="mailto:hello@example.com" aria-label="Email me"><svg class="soc-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg><span class="soc-t">Email me</span></a><a href="#hello" target="_blank" rel="noopener" data-book>Book a free call ↗</a><button type="button" data-close>Back to the box</button></div>
          ${fbHTML('Haven visibility score', ['The numbers', 'First idea', 'The meter', 'Next step', 'Listing states', 'Trade-offs', 'AI workflow'])}
          <p class="c3-morek" data-rv>Got a minute for another story?</p>
          <div class="c3-more" data-rv>${WORK.filter(x => x.id !== 'traum' && !CS_SOON.includes(x.id)).map(x => `<button type="button" class="c3-wc" data-switch="${x.id}" style="--bg:${x.bg};--g:${x.glow}"><span class="wc-top">${x.logo ? `<img src="v2/s/${x.logo}.webp" alt="">` : `<i class="wc-ic"><svg viewBox="0 0 24 24">${ICONS[x.icon]}</svg></i>`}<em>${x.status}</em></span><span class="wc-face ${x.face[0]}"><b>${x.face[1]}</b><small>${x.face[2]}</small></span><span class="wc-name"><b>${x.name}</b><small>${x.co}</small></span><span class="wc-go">Read the case study →</span></button>`).join('')}</div></div>
        <div class="tf-sky c3-scene" aria-hidden="true">${[92, 45, 80, 100, 64, 97, 72].map((v, i) => `<span class="fl" style="--i:${i}">${tfRing(v, v < 50 ? 'a' : '')}</span>`).join('')}</div>
      </footer>
      <div class="tf-lb" id="tfLb" aria-hidden="true"><button type="button" class="x" aria-label="Close">×</button><img alt=""></div>
    </div>`;
  }
  function tfCleanup() { if (initTF.sc5) { csEl.removeEventListener('scroll', initTF.sc5); initTF.sc5 = null; } if (initTF.sc3) { csEl.removeEventListener('scroll', initTF.sc3); initTF.sc3 = null; } if (initTF.sc2) { csEl.removeEventListener('scroll', initTF.sc2); initTF.sc2 = null; } if (initTF.sc) { csEl.removeEventListener('scroll', initTF.sc); initTF.sc = null; } if (initTF.tip) { initTF.tip.remove(); initTF.tip = null; } (initTF.tt || []).forEach(clearTimeout); (initTF.ti || []).forEach(clearInterval); (initTF.raf || []).forEach(cancelAnimationFrame); (initTF.io || []).forEach(o => o.disconnect()); initTF.tt = []; initTF.ti = []; initTF.raf = []; initTF.io = []; if (initTF.kd) removeEventListener('keydown', initTF.kd, true); initTF.kd = null; }
  function initTF() {
    tfCleanup(); const root = csEl, later = (f, ms) => initTF.tt.push(setTimeout(f, ms)), every = (f, ms) => { const t = setInterval(f, ms); initTF.ti.push(t); return t; };
    const obs = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; e.target.classList.add('in'); obs.unobserve(e.target); if (e.target._on) e.target._on(); }), { root, threshold: .18 }); initTF.io.push(obs);
    later(() => $('#tfHero', root).classList.add('in'), 80);
    const count = (el, to, ms = 700, dec = 0, suf = '') => { const from = parseFloat(el.textContent) || 0, t0 = performance.now(); const step = t => { const q = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - q, 3); el.textContent = (from + (to - from) * e).toFixed(dec) + suf; if (q < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); };
    // real screens that scroll themselves until you take over
    const drift = (vp, speed = 26) => { if (reduce || !vp) return; let dir = 1, hold = 0, on = false, last = 0, pos = 0;
      const io = new IntersectionObserver(es => es.forEach(e => on = e.isIntersecting), { root }); io.observe(vp); initTF.io.push(io);
      const stop = () => hold = performance.now() + 3500; ['pointerdown', 'wheel', 'touchstart', 'pointerenter'].forEach(ev => vp.addEventListener(ev, stop, { passive: true }));
      const tick = t => { const dt = Math.min(.05, (t - last) / 1000); last = t; if (on && t > hold) { const max = vp.scrollHeight - vp.clientHeight; if (max > 4) { if (Math.abs(vp.scrollTop - pos) > 3) pos = vp.scrollTop; pos += dir * speed * dt; if (pos >= max) { pos = max; dir = -1; hold = t + 1600; } else if (pos <= 0) { pos = 0; dir = 1; hold = t + 1600; } vp.scrollTop = pos; } } else pos = vp.scrollTop; initTF.raf.push(requestAnimationFrame(tick)); };
      initTF.raf.push(requestAnimationFrame(tick)); };
    $$('.tf-brw.auto .vp, .tf-phone.auto .scr', root).forEach((vp, i) => drift(vp, i ? 40 : 30));
    // metrics: one listing card, each part pops with its share of clicks (scroll or tap)
    { const mk = $('#tfMk', root), card = $('.mk-card', mk), ppl = $$('#tfMkP i', root), V = $('#tfMkV', root); let cur = -1, manual = 0;
      const ONE = ['About 1 in 3 visits', 'About 1 in 15 visits', 'About 1 in 71 visits', 'About 1 in 222 visits'];
      const show = i => { if (i === cur) return; cur = i; const [t, v, verb, c] = TF.ctr[i]; mk.style.setProperty('--c', c); card.dataset.s = i;
        $$('.mk-steps button', mk).forEach(b => { const o = +b.dataset.k === i; b.classList.toggle('on', o); b.setAttribute('aria-selected', o); });
        count(V, v, 700, 2, '%'); $('#tfMkL', root).textContent = 'of visits ' + verb; $('#tfMkO', root).innerHTML = `<b>${ONE[i]}.</b> ${TF.ctr[i][5]}`;
        const f = v / 10; ppl.forEach((p, k) => { const x = Math.max(0, Math.min(1, f - k)), tiny = k === 0 && f < .9; p.style.setProperty('--f', (tiny ? Math.max(x, .22) : x).toFixed(3)); p.classList.toggle('tiny', tiny); p.dataset.t = tiny ? `${v}%` : ''; }); };
      mk.addEventListener('click', e => { const b = e.target.closest('[data-k]'); if (b) { manual = performance.now(); show(+b.dataset.k); } });
      const onScroll = () => { if (performance.now() - manual < 900) return; const r = mk.getBoundingClientRect(), span = r.height - innerHeight; if (span <= 0) return; const q = clamp(-r.top / span); show(Math.min(3, Math.floor(q * 4))); };
      csEl.addEventListener('scroll', initTF.sc = onScroll, { passive: true }); show(0); }
    // what we found: one line lights up as you scroll
    { const rvs = $$('.tf-rv2', root); const lit = () => rvs.forEach(rv => { const ws = $$('i', rv), r = rv.getBoundingClientRect(), q = clamp((innerHeight * .85 - r.top) / (innerHeight * .45)); const n = Math.round(q * ws.length); ws.forEach((w, k) => w.classList.toggle('on', k < n)); });
      csEl.addEventListener('scroll', initTF.sc2 = lit, { passive: true }); lit(); }
    // pinned problems: tap to lift and flip
    $('#tfBoard', root).addEventListener('click', e => { const b = e.target.closest('.tf-pin'); if (!b) return; const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); });
    // the wrong turn: one card, driven by scroll, or by tapping
    { const sh = $('#tfSh', root), st = $('.sh-stage', sh), steps = $$('.sh-steps li', sh), add = $('.sh-add', sh); let manual = 0;
      const set = k => { if (st.dataset.s == k) return; st.dataset.s = k; steps.forEach((l, i) => { l.classList.toggle('on', i <= k); l.classList.toggle('cur', i === k); });
        const ring = $('.sh-sc .tf-ring', st), v = k >= 3 ? 73 : 48; ring.style.setProperty('--v', v); ring.style.setProperty('--rc', tfCol(v)); count($('b', ring), v, 600); add.textContent = k >= 3 ? 'Added ✓' : 'Add'; };
      const go = () => { if (performance.now() - manual < 1200) return; const r = sh.getBoundingClientRect(), span = r.height - innerHeight; const q = clamp(-r.top / Math.max(1, span)); set(Math.min(3, Math.floor(q * 4))); };
      sh.addEventListener('click', e => { const b = e.target.closest('.sh-steps button'); if (b) { manual = performance.now(); set(+b.dataset.k); } if (e.target.closest('.sh-add')) { manual = performance.now(); set(st.dataset.s == 3 ? 2 : 3); } });
      csEl.addEventListener('scroll', initTF.sc3 = go, { passive: true }); st.dataset.s = -1; set(0); }
    // the growth meter
    const G = $('#tfG', root);
    const putG = (svg, v) => { const a = (200 - 220 * v / 100) * Math.PI / 180, k = $('.kn', svg); $('.fl', svg).style.strokeDasharray = `${Math.max(.01, v).toFixed(2)} 100`; k.setAttribute('cx', (120 + 96 * Math.cos(a)).toFixed(1)); k.setAttribute('cy', (120 - 96 * Math.sin(a)).toFixed(1)); k.style.fill = tfCol(v); $('.fl', svg).style.stroke = tfCol(v); const h = $('.halo', svg); if (h) { h.setAttribute('cx', k.getAttribute('cx')); h.setAttribute('cy', k.getAttribute('cy')); h.style.fill = tfCol(v); } };
    const tween = (svg, v) => { const from = svg._v || 0, t0 = performance.now(), ms = reduce ? 1 : 900; svg._v = v; cancelAnimationFrame(svg._raf); const step = t => { const q = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - q, 3); putG(svg, from + (v - from) * e); if (q < 1) svg._raf = requestAnimationFrame(step); }; svg._raf = requestAnimationFrame(step); };
    const band = v => TF.bands.find(([a, b]) => v >= a && v <= b);
    // hero: a growth meter you can grow
    { const hg = $('#tfHg', root), hc = $('#tfHc', root); let hv = 45; const on = new Set();
      const draw = anim => { const [, , t, c, m] = band(hv); tween(hg, hv); count($('#tfHv', root), hv, 700); const ch = $('#tfHch', root); ch.textContent = t; ch.className = 'tf-chip ' + tfCls(hv); $('#tfHm', root).textContent = m; hc.classList.toggle('max', hv >= 100); };
      const add = i => { if (on.has(i)) { on.delete(i); hv -= TF.hero[i][2]; } else { on.add(i); hv += TF.hero[i][2]; } const b = $(`[data-h="${i}"]`, hc); b.classList.toggle('on', on.has(i)); $('.go', b).textContent = on.has(i) ? 'Added' : 'Add'; draw(); };
      hc.addEventListener('click', e => { const b = e.target.closest('[data-h]'); if (b) add(+b.dataset.h); });
      later(() => draw(), 500); later(() => { if (!on.size) add(0); }, 1900); }
    // before and after, side by side
    { const c = $('#tfCmp2', root), r = $('input', c); let sw = 0;
      const set = v => { c.style.setProperty('--x', v + '%'); r.value = v; c.classList.toggle('lo', v < 18); c.classList.toggle('hi', v > 82); };
      r.addEventListener('input', () => { cancelAnimationFrame(sw); set(+r.value); });
      c._on = () => { if (reduce) return; const keys = [[0, 50], [900, 16], [2100, 84], [3100, 50]], t0 = performance.now() + 500;
        const tick = t => { const e = t - t0; if (e < 0) { sw = requestAnimationFrame(tick); return; } let k = keys.findIndex(([ms]) => ms > e); if (k < 0) { set(50); return; } const [a0, v0] = keys[k - 1], [a1, v1] = keys[k], q = (e - a0) / (a1 - a0), ez = q < .5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2; set(v0 + (v1 - v0) * ez); sw = requestAnimationFrame(tick); initTF.raf.push(sw); };
        sw = requestAnimationFrame(tick); initTF.raf.push(sw); };
      set(50); }
    const drawG = (v, anim) => { v = Math.round(v); const [, , t, , m] = band(v); anim ? tween(G, v) : (G._v = v, putG(G, v)); anim ? count($('#tfGv', root), v, 600) : $('#tfGv', root).textContent = v;
      const ch = $('#tfGc', root); ch.textContent = t; ch.className = 'tf-chip ' + tfCls(v); $('#tfGmsg', root).textContent = m; $('#tfGl', root).textContent = t; $('#tfGl', root).className = tfCls(v);
      const r = $('#tfGring .tf-ring', root); r.style.setProperty('--v', v); r.style.setProperty('--rc', tfCol(v)); $('b', r).textContent = v;
      const bi = TF.bands.indexOf(band(v)); $$('.sg, .bl', G).forEach(e => e.classList.toggle('on', +e.dataset.s === bi)); const k = $('.kn', G); const h = $('.halo', G); h.setAttribute('cx', k.getAttribute('cx')); h.setAttribute('cy', k.getAttribute('cy')); h.style.fill = tfCol(v); };
    { const gm = $('#tfGm', root); let drag = false;
      const val = e => { const r = G.getBoundingClientRect(), sx = 272 / r.width, x = (e.clientX - r.left) * sx - 16, y = (e.clientY - r.top) * sx - 14; let a = Math.atan2(120 - y, x - 120) * 180 / Math.PI; if (a < -90) a += 360; return clamp((200 - a) / 2.2, 0, 100); };
      G.addEventListener('pointerdown', e => { drag = true; G.setPointerCapture(e.pointerId); gm.classList.add('dragging'); $('#tfGh', root).classList.add('gone'); drawG(val(e)); });
      G.addEventListener('pointermove', e => { if (drag) drawG(val(e)); }); ['pointerup', 'pointercancel'].forEach(ev => G.addEventListener(ev, () => { drag = false; gm.classList.remove('dragging'); }));
      gm._on = () => { G._v = 0; drawG(34, true); later(() => drawG(72, true), 1100); }; }
    // how the meter grew up: a spotlight carousel
    { const ev = $('#tfEv', root), cs = $$('.ev-c', ev), N = cs.length; let cur = 0, auto = 0;
      const show = i => { cur = (i + N) % N; const [, k, t, g, b] = TF.gev[cur];
        cs.forEach((c, j) => { let o = j - cur; if (o > N / 2) o -= N; if (o < -N / 2) o += N; c.style.setProperty('--o', o); c.classList.toggle('on', o === 0); c.classList.toggle('far', Math.abs(o) > 1); c.tabIndex = o === 0 ? 0 : -1; });
        $$('.ev-dots i', ev).forEach((d, j) => d.classList.toggle('on', j === cur));
        $('#tfEvK', root).textContent = k; $('#tfEvT', root).textContent = t; $('#tfEvG', root).innerHTML = `${tfIc('check')}<span>${g}</span>`; const bd = $('#tfEvB', root); bd.innerHTML = b ? `${tfIc('x')}<span>${b}</span>` : ''; bd.hidden = !b;
        const tx = $('.ev-tx', ev); tx.classList.remove('in'); void tx.offsetWidth; tx.classList.add('in'); };
      const stop = () => clearInterval(auto);
      ev.addEventListener('click', e => { const c = e.target.closest('.ev-c, .ev-dots i'); if (c) { stop(); show(+c.dataset.k); } if (e.target.closest('.pv')) { stop(); show(cur - 1); } if (e.target.closest('.nx')) { stop(); show(cur + 1); } });
      ev._on = () => { auto = every(() => { show(cur + 1); if (cur === N - 1) stop(); }, 3600); }; show(0); }
    // the recommended tray: personal to each owner, sorted by points, and it really adds
    { const rt = $('#tfRt', root), row = $('#tfRtRow', root); let o = 0, v = 0, left = [];
      const ring = () => { $('#tfRtR', root).innerHTML = tfRing(v); count($('#tfRtV', root), v, 600); };
      const card = ([k, pt], i) => { const [t, d, im] = TF.recs[k]; return `<div class="rt-c" style="--i:${i}" data-k="${k}"><div class="im"><img src="${ti(im)}" alt=""><em>+ ${pt} Points</em></div><b>${t}</b><small>${d}</small><button type="button" data-add="${pt}">Add</button></div>`; };
      const draw = () => { row.innerHTML = left.length ? left.map(card).join('') : `<div class="rt-done">${tfIc('check')}<b>All actions completed</b><small>You’ve completed every recommended action. Keep up the great work!</small></div>`; };
      const pick = i => { o = i; const [, , , sc, why, list] = TF.owners[i]; v = sc; left = list.slice().sort((a, b) => b[1] - a[1]); ring(); $('#tfRtW', root).textContent = why;
        $$('.rt-who button', rt).forEach(b => { const on = +b.dataset.o === i; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); }); row.classList.remove('in'); draw(); void row.offsetWidth; row.classList.add('in'); };
      rt.addEventListener('click', e => { const w = e.target.closest('[data-o]'); if (w) pick(+w.dataset.o);
        const a = e.target.closest('[data-add]'); if (a && !a.disabled) { a.disabled = true; a.textContent = 'Added ✓'; const c = a.closest('.rt-c'); c.classList.add('done'); v = Math.min(100, v + +a.dataset.add); ring();
          later(() => { c.classList.add('out'); later(() => { left = left.filter(([k]) => k !== c.dataset.k); draw(); row.classList.add('in'); }, 450); }, 700); } });
      pick(0); }
    // A/B: four beats, tap or watch
    { const ab = $('#tfAb', root); const CAP = ['Two layouts, both reasonable, both defended in reviews.', 'We called owners and walked them through both. Their words pointed one way.', 'Then an A/B test on the dashboard, to see it in real behaviour, not just opinions.', 'B got the go-ahead: actions lead on the left, the meter sits on the right where it’s glanced at, not fought over.'];
      let auto = 0; const set = k => { ab.dataset.s = k; $$('.ab-steps button', ab).forEach(b => b.classList.toggle('on', +b.dataset.k <= k)); $('#tfAbC', root).textContent = CAP[k]; };
      ab.addEventListener('click', e => { const b = e.target.closest('[data-k]'); if (b) { clearInterval(auto); set(+b.dataset.k); } });
      ab._on = () => { let k = 0; auto = every(() => { k++; set(k); if (k >= 3) clearInterval(auto); }, 2600); }; set(0); }
    // the fold
    const fold = $('#tfFold', root); const FD = { s: [2, 'A compact meter keeps two listings in view. The score is still the first thing you see.'], m: [1, 'One listing left above the fold. The meter starts to cost more than it gives.'], l: [0, 'A hero meter, and no listings at all until you scroll. Beautiful, and in the way.'] };
    const setFold = z => { fold.dataset.z = z; $$('[data-z]', fold).forEach(b => { const on = b.dataset.z === z; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); }); count($('#tfFn', root), FD[z][0], 400); $('#tfFd', root).textContent = FD[z][1]; };
    fold.addEventListener('click', e => { const b = e.target.closest('[data-z]'); if (b) setFold(b.dataset.z); }); setFold('s');
    // how the page evolved: one frame, scroll to step through
    { const it = $('#tfEvo', root); let cur = -1, manual = 0;
      const show = i => { if (i === cur) return; cur = i; const [, k, t, d] = TF.evo[i]; $$('.it-vp img', it).forEach(im => im.classList.toggle('on', +im.dataset.i === i)); $$('.it-dots button', it).forEach(b => { const n = +b.dataset.i; b.classList.toggle('on', n === i); b.classList.toggle('past', n < i); });
        $('#tfItT', root).textContent = t; $('#tfItD', root).textContent = d; const c = $('.it-cap', it); c.classList.remove('in'); void c.offsetWidth; c.classList.add('in'); };
      it.addEventListener('click', e => { const b = e.target.closest('.it-dots button'); if (b) { manual = performance.now(); show(+b.dataset.i); } });
      const go = () => { if (performance.now() - manual < 1000) return; const r = it.getBoundingClientRect(), span = r.height - innerHeight; show(Math.min(TF.evo.length - 1, Math.floor(clamp(-r.top / Math.max(1, span)) * TF.evo.length))); };
      csEl.addEventListener('scroll', initTF.sc5 = go, { passive: true }); show(0); }
    // the AI workflow, with a clock that runs
    $$('.tf-phone.auto2 .scr', root).forEach(vp => drift(vp, 60));
    // look closer at any real screen
    const lb = $('#tfLb', root); const closeLb = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); };
    $('.tf-pg', root).addEventListener('click', e => { if (e.target.closest('#tfLb')) { closeLb(); return; } const im = e.target.closest('.tf-sti .d img, .tf-sea img, .tf-mvf img, .tf-by .list img'); if (!im) return;
      $('img', lb).src = im.src; $('img', lb).alt = im.alt; lb.classList.toggle('tall', im.naturalHeight > im.naturalWidth * 1.2); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); });
    addEventListener('keydown', initTF.kd = e => { if (e.key === 'Escape' && lb.classList.contains('open')) { closeLb(); e.stopImmediatePropagation(); } }, true);
    // coach marks: a quiet tooltip, only after a few seconds of doing nothing
    { const TIPS = [['#tfHc .acts button', 'Tap an action to grow the score'], ['#tfCmp2 .cm-hd', 'Drag to compare before and after'], ['#tfMk .mk-steps', 'Scroll, or tap each part of the card'], ['#tfBoard', 'Tap a note to flip it'], ['#tfSh .sh-add', 'Tap Add, or keep scrolling'], ['#tfGm .m3-g', 'Drag the knob around the arc'], ['#tfEv .ev-nav', 'Tap a version or use the arrows'], ['#tfRt .rt-who', 'Switch owner, or tap Add'], ['#tfAb .ab-steps', 'Tap a step to replay the test'], ['#tfFold .tf-sw2', 'Try a bigger meter'], ['#tfEvo .it-dots', 'Keep scrolling, or tap a version']];
      const done = new Set(), tip = document.createElement('div'); tip.className = 'tf-tip'; tip.setAttribute('role', 'status'); document.body.appendChild(tip); initTF.tip = tip;
      let last = performance.now(), cur = null; const poke = () => { last = performance.now(); if (cur) { done.add(cur); cur = null; tip.classList.remove('on'); } };
      ['scroll', 'pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(ev => root.addEventListener(ev, poke, { passive: true }));
      every(() => { if (cur || performance.now() - last < 8000 || !root.classList.contains('open')) return;
        for (const [sel, t] of TIPS) { if (done.has(sel)) continue; const el = $(sel, root); if (!el) continue; const r = el.getBoundingClientRect(); if (r.top < innerHeight * .18 || r.bottom > innerHeight * .9 || !r.width) continue;
          cur = sel; tip.textContent = t; tip.style.left = Math.min(innerWidth - 16, Math.max(16, r.left + r.width / 2)) + 'px'; tip.style.top = r.top + 'px'; tip.classList.add('on'); break; } }, 500); }
    $$('[data-rv]', root).forEach(el => obs.observe(el));
  }
  // ---------- coming soon: the case study is still being written ----------
  const SOON = {
    lastlook: { name: 'PocketCheck', app: '#hello' },
    campusx: { name: 'CampusX' }
  };
  const SN_SECS = ['The problem', 'Research', 'Ideas', 'Design', 'Results'];
  function soonHTML(w) {
    const o = SOON[w.id] || {}, nm = o.name || w.name;
    return `<div class="cs-bar sn-bar"><button class="cs-close" id="csClose" type="button"><span class="ar" aria-hidden="true">←</span>Back to the box</button><span class="sn-bk">${w.logo ? `<img src="v2/s/${w.logo}.webp" alt="">` : ''}${nm}</span></div>
    <div class="sn-pg">
      <section class="sn-wrap">
        <div class="sn-copy">
          <p class="sn-k"><i></i>Case study in progress</p>
          <h2 class="sn-t">This story is still being <em>written.</em></h2>
          <p class="sn-lead">I’m putting the ${nm} case study into words. Leave your email and I’ll send it to you the day it’s live.</p>
          <form class="sn-f" novalidate><label class="sn-fl"><span class="vh">Your email</span><input name="e" type="email" maxlength="120" placeholder="you@email.com" autocomplete="email" required></label><button type="submit" class="sn-pri">Notify me</button></form>
          <p class="sn-err" role="alert"></p>
          <p class="sn-ok" hidden>✓ You’re on the list. I’ll write to you when it’s live.</p>
          ${o.app ? `<a class="sn-sec" href="${o.app}" target="_blank" rel="noopener">Or try PocketCheck on the App Store <span aria-hidden="true">↗</span></a>` : ''}
        </div>
        <div class="sn-doc" aria-hidden="true">
          <div class="sn-dt"><span>${w.logo ? `<img src="v2/s/${w.logo}.webp" alt="">` : ''}</span><b id="snType"></b><i class="sn-caret"></i></div>
          <p class="sn-dco">${w.co}</p>
          <div class="sn-hero-ph"></div>
          ${SN_SECS.map((t, i) => `<div class="sn-s" style="--i:${i}"><p>${t}</p><i style="--w:${[92, 78, 86, 70, 82][i]}%"></i><i style="--w:${[64, 88, 58, 80, 52][i]}%"></i></div>`).join('')}
        </div>
      </section>
      <section class="sn-more">
        <p class="c3-morek">Finished stories, ready to read</p>
        <div class="c3-more">${WORK.filter(x => x.id !== w.id && !CS_SOON.includes(x.id)).map(x => `<button type="button" class="c3-wc" data-switch="${x.id}" style="--bg:${x.bg};--g:${x.glow}"><span class="wc-top">${x.logo ? `<img src="v2/s/${x.logo}.webp" alt="">` : `<i class="wc-ic"><svg viewBox="0 0 24 24">${ICONS[x.icon]}</svg></i>`}<em>${x.status}</em></span><span class="wc-face ${x.face[0]}"><b>${x.face[1]}</b><small>${x.face[2]}</small></span><span class="wc-name"><b>${x.name}</b><small>${x.co}</small></span><span class="wc-go">Read the case study →</span></button>`).join('')}</div>
      </section>
      <footer class="sn-foot"><p class="c3-morek">Say hello</p>
        <div class="c3-links"><a class="soc li" href="#hello" target="_blank" rel="noopener" aria-label="LinkedIn"><svg class="soc-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg><span class="soc-t">LinkedIn ↗</span></a><a class="soc ig" href="#hello" target="_blank" rel="noopener" aria-label="Instagram"><svg class="soc-i" viewBox="0 0 24 24" aria-hidden="true"><path  d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg><span class="soc-t">Instagram ↗</span></a><a class="soc gm" href="mailto:hello@example.com" aria-label="Email me"><svg class="soc-i" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg><span class="soc-t">Email me</span></a><a href="#hello" target="_blank" rel="noopener" data-book>Book a free call ↗</a><button type="button" data-close>Back to the box</button></div></footer>
    </div>`;
  }
  function soonCleanup() { (initSoon.tt || []).forEach(clearTimeout); initSoon.tt = []; }
  function initSoon(w) {
    soonCleanup(); const root = csEl, later = (f, ms) => initSoon.tt.push(setTimeout(f, ms));
    // the title types itself, the sections fill in, and it starts over, like a draft being worked on
    const tEl = $('#snType', root), doc = $('.sn-doc', root), txt = `${(SOON[w.id] || {}).name || w.name}: the case study`;
    const run = () => { doc.classList.remove('fill'); tEl.textContent = ''; let i = 0;
      const step = () => { tEl.textContent = txt.slice(0, ++i); if (i < txt.length) later(step, 55 + Math.random() * 60); else { later(() => doc.classList.add('fill'), 300); later(run, 7000); } };
      later(step, 600); };
    run();
    $('.sn-f', root).addEventListener('submit', async e => {
      e.preventDefault(); const f = e.target, err = $('.sn-err', root), email = f.e.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'That email doesn’t look right.'; f.e.classList.add('bad'); f.e.focus(); return; }
      err.textContent = ''; f.e.classList.remove('bad'); f.querySelector('button').disabled = true;
      let ok = false;
      if (noteDb && noteUid && noteCanWrite) { try { await noteDb.collection('feedback/' + noteUid + '/items').add({ cs: (SOON[w.id] || {}).name || w.name, parts: ['Notify me'], text: 'Notify me when the case study is live.', name: '', email: email.slice(0, 120), at: Date.now() }); ok = true; } catch (_) {} }
      if (!ok) location.href = `mailto:hello@example.com?subject=${encodeURIComponent('Notify me: ' + w.name + ' case study')}&body=${encodeURIComponent('Please let me know when it’s live: ' + email)}`;
      f.hidden = true; $('.sn-ok', root).hidden = false;
    });
  }
  // phones: sideways rows become one card at a time, stepped with buttons
  function phCar(root) {
    if (innerWidth >= 860) return;
    [['.c3-phones'], ['.mm-fl', '.row'], ['.sw-hand'], ['.sw-bento'], ['.sw-strip']].forEach(([hs, rs]) => $$(hs, root).forEach(host => {
      if (host._car) return; host._car = 1;
      const row = () => rs ? host.querySelector(rs) : host;
      const bar = document.createElement('div'); bar.className = 'ph-cb'; bar.innerHTML = '<button type="button" data-d="-1" aria-label="Previous">←</button><span>1 / 1</span><button type="button" data-d="1" aria-label="Next">→</button>';
      host.after(bar);
      const items = () => { const r = row(); return r ? [...r.children].filter(c => c.offsetParent !== null) : []; };
      const idx = () => { const r = row(); if (!r) return 0; return Math.round(r.scrollLeft / Math.max(1, r.clientWidth)); };
      const upd = () => { const r = row(); if (r && !r.classList.contains('ph-car')) { r.classList.add('ph-car'); r.addEventListener('scroll', () => requestAnimationFrame(upd), { passive: true }); } const n = items().length, i = Math.min(idx(), n - 1);
        $('span', bar).textContent = `${i + 1} / ${n}`; bar.querySelectorAll('button')[0].disabled = i <= 0; bar.querySelectorAll('button')[1].disabled = i >= n - 1; bar.hidden = n < 2; };
      bar.addEventListener('click', e => { const b = e.target.closest('[data-d]'); const r = row(); if (!b || !r) return; r.scrollTo({ left: (idx() + +b.dataset.d) * r.clientWidth, behavior: 'smooth' }); });
      new MutationObserver(() => { const r = row(); if (r) r.scrollLeft = 0; upd(); }).observe(host, { childList: true, subtree: !!rs });
      upd();
    }));
  }
  // the case-study top bar: a round back button on the left; the story's name and the Day/Night switch on the right
  const CS_NAME = { coupon: 'The Coupon Hunter', requests: 'Special Requests', swipr: 'Swipr.AI', traum: 'The Visibility Score', lastlook: 'PocketCheck', campusx: 'CampusX' };
  function csBar(w) {
    const bar = $('.cs-bar', csEl); if (!bar) return;
    const close = $('#csClose', bar); if (close) { close.setAttribute('aria-label', 'Back'); close.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>'; }
    [...bar.children].forEach(c => { if (c !== close && !c.classList.contains('c3-prog')) c.classList.add('cs-old'); });
    const r = document.createElement('div'); r.className = 'cs-right';
    r.innerHTML = `<span class="cs-ttl">${CS_NAME[w.id] || w.name}</span><button type="button" class="cs-theme" aria-label="Switch theme"><span class="ct-i"><svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg><svg class="moon" viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg></span><span class="ct-l"><span class="ct-n">Night</span><span class="ct-d">Day</span></span></button>`;
    bar.appendChild(r);
    if (!$('.cs-prog', csEl)) { const pg = document.createElement('div'); pg.className = 'cs-prog'; pg.innerHTML = '<i></i>'; csEl.prepend(pg); }
    $('.cs-prog', csEl).style.setProperty('--pc', w.c || 'var(--coral)'); csBar.p = 0; csBar.y = 0;
    // the page grows as sections load, so only let the bar slide back when you scroll up
    if (!csBar.sc) csEl.addEventListener('scroll', csBar.sc = () => { const pg = $('.cs-prog i', csEl); if (!pg) return;
      const y = csEl.scrollTop, max = Math.max(1, csEl.scrollHeight - csEl.clientHeight), raw = y >= max - 2 ? 1 : y / max;
      csBar.p = y < csBar.y - 1 || y < 2 ? raw : Math.max(csBar.p, raw); csBar.y = y;
      pg.style.transform = `scaleX(${csBar.p.toFixed(4)})`; }, { passive: true });
    $('.cs-theme', r).addEventListener('click', () => { const t = $('#themeBtn'); if (t) t.click(); });
  }
  function csHTML(w) {
    if (w.id === 'coupon') return edHTML(w);
    if (w.id === 'requests') return mmHTML(w);
    if (w.id === 'swipr') return swHTML(w);
    if (w.id === 'traum') return tfHTML(w);
    if (SOON[w.id]) return soonHTML(w);
    const i = WORK.indexOf(w);
    return `<div class="cs-bar"><button class="cs-close" id="csClose" type="button"><span class="ar" aria-hidden="true">←</span>Back to the box</button><a class="cs-full" href="${w.cs}" target="_blank" rel="noopener">${w.csLabel || 'Full case study'} ↗</a></div>
      <header class="cs-hero cs-in"><span class="k"><i><svg viewBox="0 0 24 24">${ICONS[w.icon]}</svg></i>${String(i + 1).padStart(2, '0')} · ${w.co}</span><h2>${w.name}</h2><p class="pitch">${w.pitch}</p>
        <ul class="cs-meta">${w.meta.map(([b, t]) => `<li><b>${b}</b>${t}</li>`).join('')}</ul></header>
      ${w.shots.length ? `<div class="cs-shots cs-in">${w.shots.map(k => `<img src="${img(k)}" alt="" loading="lazy">`).join('')}</div>` : ''}
      <div class="cs-body cs-in"><div>
        <section class="cs-sec"><h3>The problem</h3><p>${w.problem}</p></section>
        <section class="cs-sec"><h3>What I did</h3><ol>${w.did.map(t => `<li>${t}</li>`).join('')}</ol></section>
        ${w.res.length ? `<section class="cs-sec"><h3>What changed</h3><ul class="cs-res">${w.res.map(([b, t]) => `<li><b>${b}</b><span>${t}</span></li>`).join('')}</ul></section>` : ''}
        <section class="cs-sec"><h3>Want more?</h3><div class="cs-end"><a href="${w.cs}" target="_blank" rel="noopener">${w.csLabel || 'Read the full case study'} ↗</a><button type="button" data-close>Back to the box</button></div></section>
        ${fbHTML(w.name, ['The problem', 'What I did', 'The results'])}
      </div></div>`;
  }
  const rectClip = r => `inset(${r.top.toFixed(1)}px ${(innerWidth - r.right).toFixed(1)}px ${(innerHeight - r.bottom).toFixed(1)}px ${r.left.toFixed(1)}px round 18px)`;
  function pick(k) {
    if (picked || !boxOpen) return;
    picked = k; k.el.classList.remove('hover'); k.el.classList.add('out');
    const sc = boxScale();
    // 1: lift straight out of the box
    k.el.style.transform = stand(CH + 40);
    setTimeout(() => {
      // 2: turn to face you, in front of the box
      const lift = 190;
      k.el.style.transform = `translate3d(${(BW / 2 - k.x).toFixed(1)}px, ${BD * .9}px, ${lift}px) rotateZ(${-VIEW_Z}deg) rotateX(${-VIEW_X}deg) rotateY(0deg)`;
      setTimeout(() => expand(k), 1450);
    }, reduce ? 0 : 520);
  }
  function expand(k) {
    const r = k.el.getBoundingClientRect();
    csEl.style.setProperty('--t', k.w.t); csEl.style.setProperty('--c', k.w.c);
    csEl.innerHTML = csHTML(k.w); csEl.scrollTop = 0; csEl.classList.toggle('ed', k.w.id === 'coupon'); csEl.classList.toggle('mm', k.w.id === 'requests'); csEl.classList.toggle('sw', k.w.id === 'swipr'); csEl.classList.toggle('tf', k.w.id === 'traum'); if (k.w.id === 'coupon') initED(); if (k.w.id === 'requests') initMM(); if (k.w.id === 'swipr') initSW(); if (k.w.id === 'traum') initTF(); csEl.classList.toggle('soon', !!SOON[k.w.id]); if (SOON[k.w.id]) initSoon(k.w); phCar(csEl); csBar(k.w);
    csEl.style.transition = 'none'; csEl.style.clipPath = rectClip(r); csEl.classList.add('open');
    // a flat copy of the card grows with the page, then melts into it
    const g = k.el.cloneNode(true); g.classList.add('wk-ghost'); g.classList.remove('hover'); g.removeAttribute('aria-label');
    Object.assign(g.style, { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', opacity: 1 });
    document.body.appendChild(g);
    csEl.offsetWidth;
    k.el.style.opacity = 0;
    csEl.style.transition = 'clip-path .9s cubic-bezier(.7, 0, .2, 1)';
    csEl.style.clipPath = 'inset(0px 0px 0px 0px round 0px)';
    const ga = g.animate([{ left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: '24px', opacity: 1 },
      { left: '0px', top: '0px', width: innerWidth + 'px', height: innerHeight + 'px', borderRadius: '0px', opacity: 1, offset: .6 },
      { left: '0px', top: '0px', width: innerWidth + 'px', height: innerHeight + 'px', borderRadius: '0px', opacity: 0 }], { duration: reduce ? 1 : 1300, easing: 'cubic-bezier(.7, 0, .2, 1)', fill: 'forwards' });
    ga.onfinish = () => g.remove();
    lenis && lenis.stop(); document.documentElement.style.overflow = 'hidden'; setRoute(k.w);
    setTimeout(() => { csEl.classList.add('ready'); $('#csClose').focus({ preventScroll: true }); }, 520);
  }
  let csFrom = null;
  function openCaseAt(id, from) {
    const k = wks.find(x => x.w.id === id); if (!k || picked) return;
    picked = k; csFrom = from; const r = from.getBoundingClientRect(); setRoute(k.w);
    csEl.style.setProperty('--t', k.w.t); csEl.style.setProperty('--c', k.w.c);
    csEl.innerHTML = csHTML(k.w); csEl.scrollTop = 0; csEl.classList.toggle('ed', k.w.id === 'coupon'); csEl.classList.toggle('mm', k.w.id === 'requests'); csEl.classList.toggle('sw', k.w.id === 'swipr'); csEl.classList.toggle('tf', k.w.id === 'traum'); if (k.w.id === 'coupon') initED(); if (k.w.id === 'requests') initMM(); if (k.w.id === 'swipr') initSW(); if (k.w.id === 'traum') initTF(); csEl.classList.toggle('soon', !!SOON[k.w.id]); if (SOON[k.w.id]) initSoon(k.w); phCar(csEl); csBar(k.w);
    csEl.style.transition = 'none'; csEl.style.clipPath = rectClip(r); csEl.classList.add('open'); csEl.offsetWidth;
    csEl.style.transition = 'clip-path .9s cubic-bezier(.7, 0, .2, 1)'; csEl.style.clipPath = 'inset(0px 0px 0px 0px round 0px)';
    lenis && lenis.stop(); document.documentElement.style.overflow = 'hidden';
    setTimeout(() => { csEl.classList.add('ready'); $('#csClose').focus({ preventScroll: true }); }, 520);
  }
  function closeCase() {
    if (!picked) return; const k = picked; setRoute(null, 'replace');
    if (csFrom) { const from = csFrom; csFrom = null; csEl.classList.remove('ready');
      const r = from.getBoundingClientRect(); csEl.style.transition = 'clip-path .7s cubic-bezier(.7, 0, .2, 1)'; csEl.style.clipPath = rectClip(r);
      setTimeout(() => { csEl.classList.remove('open', 'ed', 'mm', 'sw', 'tf', 'soon'); csEl.innerHTML = ''; edCleanup(); document.documentElement.style.overflow = ''; lenis && lenis.start();
        wks.forEach(w => { if (w.el.style.opacity === '0') { w.el.style.opacity = 1; w.el.style.transform = stand(boxOpen ? 0 : w.z); } }); picked = null; setCap(null); from.focus({ preventScroll: true }); }, 720);
      return; }
    csEl.classList.remove('ready');
    const r = k.el.getBoundingClientRect();
    csEl.style.transition = 'clip-path .75s cubic-bezier(.7, 0, .2, 1)'; csEl.style.clipPath = rectClip(r);
    setTimeout(() => {
      k.el.style.opacity = 1; csEl.classList.remove('open', 'ed', 'mm', 'sw', 'tf', 'soon'); csEl.innerHTML = ''; edCleanup();
      document.documentElement.style.overflow = ''; lenis && lenis.start();
      const a = k.el.animate([{ transform: faced(k) }, { transform: stand(CH + 60), offset: .55 }, { transform: stand(0) }], { duration: reduce ? 1 : 1400, easing: pickEase, fill: 'forwards' });
      a.onfinish = () => { k.el.style.transform = stand(0); rim(k, 0); k.z = 0; a.cancel(); k.el.style.transition = ''; picked = null; setCap(null); k.el.focus({ preventScroll: true }); };
    }, 760);
  }
  // jump straight from one case study to another, without going back to the box
  function switchCase(id) {
    const k = wks.find(x => x.w.id === id); if (!k || !picked || k === picked) return;
    edCleanup(); picked.el.style.opacity = 1; picked.el.style.transform = stand(0); rim(picked, 0); picked.z = 0;
    picked = k; k.el.style.transform = faced(k); k.el.style.opacity = 0; setRoute(k.w, 'replace');
    csEl.style.setProperty('--t', k.w.t); csEl.style.setProperty('--c', k.w.c);
    csEl.innerHTML = csHTML(k.w); csEl.scrollTop = 0; csEl.classList.toggle('ed', k.w.id === 'coupon'); csEl.classList.toggle('mm', k.w.id === 'requests'); csEl.classList.toggle('sw', k.w.id === 'swipr'); csEl.classList.toggle('tf', k.w.id === 'traum'); if (k.w.id === 'coupon') initED(); if (k.w.id === 'requests') initMM(); if (k.w.id === 'swipr') initSW(); if (k.w.id === 'traum') initTF(); csEl.classList.toggle('soon', !!SOON[k.w.id]); if (SOON[k.w.id]) initSoon(k.w); phCar(csEl); csBar(k.w);
    $('#csClose').focus({ preventScroll: true });
  }
  /* ---------- addresses: every case study and section gets its own link and tab title ---------- */
  const SITE = 'Alex Morgan';
  const CS_SLUG = { coupon: 'eazydiner', requests: 'makemytrip', swipr: 'swipr', traum: 'traum', lastlook: 'lastlook', campusx: 'campusx' };
  const SEC_PATH = { journey: ['journey', 'The journey'], work: ['work', 'Work'], life: ['about', 'About me'], hello: ['contact', 'Say hi'] };
  const ROUTED = location.protocol.startsWith('http') && /(^|\.)jameschugh\.com$|\.vercel\.app$|^localhost$|^127\./.test(location.hostname);
  const HOME_TITLE = SITE;
  const csTitle = w => `${CS_NAME[w.id] || w.name} · ${w.co.split(' · ')[0]} | ${SITE}`;
  const idFromPath = () => { const m = location.pathname.match(/^\/work\/([a-z0-9-]+)\/?$/); if (!m) return null; return Object.keys(CS_SLUG).find(k => CS_SLUG[k] === m[1]) || null; };
  const setRoute = (w, how = 'push') => {
    document.title = w ? csTitle(w) : HOME_TITLE;
    if (!ROUTED) return;
    const path = w ? `/work/${CS_SLUG[w.id]}` : '/';
    if (location.pathname === path) return;
    try { history[how === 'push' ? 'pushState' : 'replaceState']({ cs: w ? w.id : null }, '', path + (w ? '' : location.search)); } catch (_) {}
  };
  // a still point in the middle of the screen for links that open a case study directly
  const csAnchor = () => { let a = document.getElementById('csAnchor'); if (!a) { a = document.createElement('i'); a.id = 'csAnchor'; a.setAttribute('aria-hidden', 'true'); Object.assign(a.style, { position: 'fixed', left: '50%', top: '50%', width: '2px', height: '2px', pointerEvents: 'none' }); document.body.appendChild(a); } return a; };
  addEventListener('popstate', () => {
    const id = idFromPath();
    if (id) { if (!picked) openCaseAt(id, csAnchor()); else if (picked.w.id !== id) switchCase(id); document.title = csTitle(wks.find(x => x.w.id === id).w); }
    else { if (picked) closeCase(); document.title = HOME_TITLE; }
  });
  // sections: /journey, /work, /about, /contact
  $$('[data-go]').forEach(a => a.addEventListener('click', () => { const sp = SEC_PATH[a.dataset.go]; document.title = sp ? `${sp[1]} | ${SITE}` : HOME_TITLE;
    if (ROUTED) { try { history.replaceState(null, '', sp ? '/' + sp[0] : '/'); } catch (_) {} } }));
  if (ROUTED) addEventListener('load', () => setTimeout(() => {
    const id = idFromPath(); if (id) { openCaseAt(id, csAnchor()); document.title = csTitle(wks.find(x => x.w.id === id).w); return; }
    const sec = Object.keys(SEC_PATH).find(k => location.pathname.replace(/\/$/, '') === '/' + SEC_PATH[k][0]);
    if (sec) { const el = sec === 'work' ? $('#boxTrack') : $('#' + sec); if (el) { goTo(top(el) + (sec === 'journey' ? 4 : 0)); document.title = `${SEC_PATH[sec][1]} | ${SITE}`; } }
  }, 350));
  csEl.addEventListener('click', e => { if (e.target.closest('#csClose, [data-close]')) closeCase(); const sw = e.target.closest('[data-switch]'); if (sw) switchCase(sw.dataset.switch); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && picked) closeCase(); });
  function frameWork(dt) {
    boxScale(dt); boxInfo.classList.toggle('in', boxStage.getBoundingClientRect().top < vh * .2);
    if (!boxOpen && boxStage.getBoundingClientRect().top < vh * (mobile ? .6 : .3)) openBox();
  }

  /* =========================================================
     4b · BRAND & WEB
     ========================================================= */
  const SITES = [
    { name: '8x careers', url: 'lifeat8x.vercel.app', href: 'https://lifeat8x.vercel.app/', img: '8x', kind: 'Careers · Website', dy: 14, r: 1.2, st: '<span class="stk pill" style="left:-16px;top:-18px;transform:rotate(-6deg)">new ↗</span>' },
    { name: 'The Date Crew', url: 'datecrew-indol.vercel.app', href: 'https://datecrew-indol.vercel.app/', img: 'datecrew', kind: 'Matchmaking · Prototype', dy: -10, r: -1.1, st: '<span class="stk tape" style="left:34%;top:-14px;transform:rotate(-4deg)"></span>' },
    { name: 'SolaStays', url: 'solastays.com', href: 'https://solastays.com/', img: 'sola', kind: 'Hospitality · Website', dy: -18, r: -1.5, st: '<span class="stk tape" style="left:40%;top:-14px"></span>' },
    { name: 'SundayHotels', url: 'booksundays.com', href: 'https://booksundays.com/', img: 'sundays', kind: 'Hotels · Website', dy: 22, r: 1.2, st: '<span class="stk pill" style="right:-18px;top:-18px;transform:rotate(-6deg)">live ↗</span>' },
    { name: 'O2 Events', url: 'o2events.in', href: 'https://www.o2events.in/', img: 'o2', kind: 'Weddings · Website', dy: -6, r: -1, st: '<span class="stk round" style="--sc:#C9A24B;left:-24px;top:-26px;transform:rotate(-10deg)">made<br>with ♥</span>' },
    { name: 'Sundrift at 6', url: 'sundrift.in', href: 'https://sundrift-kappa.vercel.app/', img: 'sundrift', kind: 'Hospitality · Website', dy: 26, r: 1.6, st: '<span class="stk tape" style="right:18%;top:-14px;transform:rotate(6deg);background:rgba(159,211,255,.85)"></span>' },
    { name: 'Prodyt', url: 'prodyt.com', href: 'https://www.prodyt.com/', img: 'prodyt', kind: 'SaaS · Website', dy: -12, r: -1.2, st: '<span class="stk pill" style="right:-18px;top:-18px;transform:rotate(6deg)">new ↗</span>' }
  ];
  const brandSec = $('#brand'), brandRow = $('#brandRow'), brandProg = $('#brandProg');
  brandRow.innerHTML = SITES.map(x => `<a class="site" href="${x.href}" target="_blank" rel="noopener" style="--dy:${x.dy}px;--r:${x.r}deg">${x.st}<div class="win"><div class="chrome"><i></i><i></i><i></i><span>${x.url}</span></div><div class="page"><img src="v2/b/${x.img}.webp" alt="${x.name} website home page" loading="lazy"></div></div><div class="cap"><b>${x.name}</b><span>${x.kind} · visit ↗</span></div></a>`).join('');
  let bTop = 0, bRange = 1, bShift = 0;
  let bManual = false;
  function layoutBrand() {
    bManual = true; brandSec.classList.toggle('manual', bManual);
    if (bManual) { brandSec.style.height = ''; brandRow.style.transform = ''; bTop = top(brandSec); bRange = 1; bShift = 0; return; }
    bShift = Math.max(0, brandRow.scrollWidth - vw);
    brandSec.style.height = (vh + bShift * 1.1) + 'px';
    bTop = top(brandSec); bRange = Math.max(1, brandSec.offsetHeight - vh);
  }
  const bcur = { x: 0 };
  const bStep = d => { const c = brandRow.querySelector('.site'); brandRow.scrollBy({ left: d * (c ? c.offsetWidth + 40 : vw * .6), behavior: reduce ? 'auto' : 'smooth' }); };
  $('#bPrev').addEventListener('click', () => bStep(-1)); $('#bNext').addEventListener('click', () => bStep(1));
  const bEnds = () => { $('#bPrev').disabled = brandRow.scrollLeft < 8; $('#bNext').disabled = brandRow.scrollLeft > brandRow.scrollWidth - brandRow.clientWidth - 8; };
  brandRow.addEventListener('scroll', bEnds, { passive: true }); setTimeout(bEnds, 500);
  let bAuto = 0, bStop = false;
  ['pointerdown', 'wheel', 'touchstart'].forEach(ev => brandRow.addEventListener(ev, () => { bStop = true; clearInterval(bAuto); }, { passive: true }));
  [$('#bPrev'), $('#bNext')].forEach(b => b.addEventListener('click', () => { bStop = true; clearInterval(bAuto); }));
  new IntersectionObserver((es, o) => es.forEach(e => { if (!e.isIntersecting || bStop || reduce) return; o.disconnect();
    setTimeout(() => { if (bStop) return; bAuto = setInterval(() => { if (bStop || brandRow.scrollLeft > brandRow.scrollWidth - brandRow.clientWidth - 8) { clearInterval(bAuto); if (!bStop) setTimeout(() => brandRow.scrollTo({ left: 0, behavior: 'smooth' }), 1400); return; } bStep(1); }, 2200); }, 900); }), { threshold: .45 }).observe(brandRow);
  function frameBrand(dt, y) {
    if (bManual) return;
    const q = clamp((y - bTop) / bRange);
    const k = reduce ? 1 : 1 - Math.exp(-dt * 8);
    bcur.x += (-q * bShift - bcur.x) * k;
    brandRow.style.transform = `translate3d(${bcur.x.toFixed(1)}px, 0, 0)`;
    brandProg.style.setProperty('--p', (q * 100).toFixed(1) + '%');
  }

  /* =========================================================
     5 · HOW I WORK
     ========================================================= */
  /* =========================================================
     5 · MY STACK (a gift that opens on scroll)
     ========================================================= */
  const TOOL_ROLE = { Claude: 'Think', Vercel: 'Ship', Antigravity: 'Build', Supabase: 'Build', Figma: 'Design', ProtoPie: 'Prototype', Xcode: 'Build', Notion: 'Plan', 'Apple Music': 'Focus', 'Premiere Pro': 'Edit', 'After Effects': 'Motion', 'Microsoft Teams': 'Collaborate', 'Canva': 'Create', 'ChatGPT': 'Think', 'Vowen': 'Dictate', 'Gmail': 'Connect', 'ElevenLabs': 'Voice' };
  const TOOLS = [
    { n: 'Claude', bg: '#D97757', how: 'My thinking partner. I use it to pressure-test flows, write UX copy and build faster.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"/></svg>' },
    { n: 'Vercel', bg: '#0B0B0B', how: 'Where my side projects go live. Push, preview, share the link.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" transform="translate(3.6 4) scale(.7)" d="m12 1.608 12 20.784H0Z"/></svg>' },
    { n: 'Antigravity', bg: '#FFFFFF', how: 'Agent-first coding. I hand it the busywork and review what comes back.', icon: '<svg viewBox="0 0 24 24"><defs><linearGradient id="agG" x1="0" x2="1"><stop offset="0" stop-color="#4285F4"/><stop offset=".38" stop-color="#EA4335"/><stop offset=".68" stop-color="#FBBC05"/><stop offset="1" stop-color="#34A853"/></linearGradient></defs><path d="M4 19.5C6 12 8 4.5 12 4.5s6 7.5 8 15" fill="none" stroke="url(#agG)" stroke-width="3.4" stroke-linecap="round"/></svg>' },
    { n: 'Supabase', bg: '#1C1C1C', how: 'The backend behind my builds: auth, database and storage, no server to babysit.', icon: '<svg viewBox="0 0 24 24"><path fill="#3ECF8E" d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z"/></svg>' },
    { n: 'Figma', bg: '#1E1E1E', how: 'Where every screen starts: flows, systems and the messy explorations in between.', icon: '<svg viewBox="0 0 24 24"><path fill="#F24E1E" d="M8.5 2H12v6.67H8.5a3.33 3.33 0 0 1 0-6.67z"/><path fill="#FF7262" d="M12 2h3.5a3.33 3.33 0 0 1 0 6.67H12z"/><path fill="#A259FF" d="M8.5 8.67H12v6.66H8.5a3.33 3.33 0 0 1 0-6.66z"/><circle fill="#1ABCFE" cx="15.5" cy="12" r="3.33"/><path fill="#0ACF83" d="M8.5 15.33H12v3.34a3.33 3.33 0 1 1-3.5-3.34z"/></svg>' },
    { n: 'ProtoPie', bg: 'linear-gradient(145deg, #FF5FA8, #8B3DFF)', how: 'Prototypes that feel real, with real logic, so user tests aren’t guesswork.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M11 13V4a9 9 0 1 0 9 9z"/><path fill="#fff" opacity=".7" d="M13 11V2.2A9 9 0 0 1 21.8 11z"/></svg>' },
    { n: 'Xcode', bg: 'linear-gradient(160deg, #3AA0FF, #0A5BD6)', how: 'Where PocketCheck came to life. SwiftUI, simulators and a lot of builds.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M19.06 5.3327c.4517-.1936.7744-.2581 1.097-.1936.5163.1291.7744.5163.968.7098.1936.3872.9034.7744 1.2261.8389.2581.0645.7098-.6453 1.0325-1.2906.3227-.5808.5163-1.3552.4517-1.5488-.0645-.1936-.968-.5808-1.1616-.5808-.1291 0-.3872.1291-.8389.0645-.4517-.0645-.9034-.5808-1.1616-.968-.4517-.6453-1.097-1.0325-1.6778-1.3552-.6453-.3227-1.3552-.5163-2.065-.6453-1.0325-.2581-2.065-.4517-3.0975-.3227-.5808.0645-1.2906.1291-1.8069.3227-.0645 0-.1936.1936-.0645.1936s.5808.0645.5808.0645-.5807.1292-.5807.2583c0 .1291.0645.1291.1291.1291.0645 0 1.4842-.0645 2.065 0 .6453.1291 1.3552.4517 1.8069 1.2261.7744 1.4197.4517 2.7749.2581 3.2266-.968 2.1295-8.6472 15.2294-9.0344 16.1328-.3873.9034-.5163 1.4842.5807 2.065s1.6778.3227 2.0005-.0645c.3872-.5163 7.0339-17.1654 9.2925-18.2624zm-3.6138 8.7117h1.5488c1.0325 0 1.2261.5163 1.2261.7098.0645.5163-.1936 1.1616-1.2261 1.1616h-.968l.7744 1.2906c.4517.7744.2581 1.1616 0 1.4197-.3872.3872-1.2261.3872-1.6778-.4517l-.9034-1.5488c-.6453 1.4197-1.2906 2.9684-2.065 4.7753h4.0009c1.9359 0 3.5492-1.6133 3.5492-3.5492V6.5588c-.0645-.1291-.1936-.0645-.2581 0-.3872.4517-1.4842 2.0004-4.001 7.4856zm-9.8087 8.0019h-.3227c-2.3231 0-4.1945-1.8714-4.1945-4.1945V7.0105c0-2.3231 1.8714-4.1945 4.1945-4.1945h9.3571c-.1936-.1936-.968-.5163-1.7423-.4517-.3227 0-.968.1291-1.3552-.1291-.3872-.3227-.3227-.5163-.9034-.5163H4.9277c-2.6458 0-4.7753 2.1295-4.7753 4.7753v11.7447c0 2.6458 2.1295 4.7753 4.4527 4.7108.6452 0 .8388-.5162 1.0324-.9034zM20.4152 6.9459v10.9058c0 2.3231-1.8714 4.1945-4.1945 4.1945H11.897s-.3872 1.0325.8389 1.0325h3.8719c2.6458 0 4.7753-2.1295 4.7753-4.7753V8.8173c.0646-.9034-.7098-1.4842-.9679-1.8714zm-18.5851.0646v10.8413c0 1.9359 1.6133 3.5492 3.5492 3.5492h.5808c0-.0645.7744-1.4197 2.4522-4.2591.1936-.3872.4517-.7744.7098-1.2261H4.4114c-.5808 0-.9034-.3872-.968-.7098-.1291-.5163.1936-1.1616.9034-1.1616h2.3877l3.033-5.2916s-.7098-1.2906-.9034-1.6133c-.2582-.4517-.1291-.9034.129-1.1615.3872-.3872 1.0325-.5808 1.6778.4517l.2581.3872.2581-.3872c.5808-.8389.968-.7744 1.2906-.7098.5163.1291.8389.7098.3872 1.6133L8.864 14.0444h1.3552c.4517-.7744.9034-1.5488 1.3552-2.3877-.0645-.3227-.1291-.7098-.0645-1.0325.0645-.5163.3227-.968.6453-1.3552l.3872.6453c1.2261-2.1295 2.1295-3.9364 2.3877-4.6463.1291-.3872.3227-1.1616.1291-1.8069H5.3794c-2.0005.0001-3.5493 1.6134-3.5493 3.5494zM4.605 17.7872c0-.0645.7744-1.4197.7744-1.4197 1.2261-.3227 1.8069.4517 1.8714.5163 0 0-.8389 1.4842-1.097 1.7423s-.5808.3227-.9034.2581c-.5164-.129-.839-.6453-.6454-1.097z"/></svg>' },
    { n: 'Notion', bg: '#FFFFFF', how: 'Research notes, PRDs and the running list of ideas I’ll get to someday.', icon: '<svg viewBox="0 0 24 24"><path fill="#111" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg>' },
    { n: 'Apple Music', bg: 'linear-gradient(160deg, #FF6B84, #FA233B)', how: 'Always on. Deep work doesn’t happen in silence for me.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z"/></svg>' },
    { n: 'Premiere Pro', bg: '#00005B', how: 'Cutting reels and build-in-public videos, one jump cut at a time.', icon: '<svg viewBox="0 0 24 24"><text x="12" y="16.6" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="700" font-size="12.5" letter-spacing="-.3" fill="#9999FF">Pr</text></svg>' },
    { n: 'After Effects', bg: '#00005B', how: 'Motion studies and micro-interactions, so devs see exactly how it should feel.', icon: '<svg viewBox="0 0 24 24"><text x="12" y="16.6" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-weight="700" font-size="12.5" letter-spacing="-.3" fill="#D291FF">Ae</text></svg>' },
    { n: 'Microsoft Teams', bg: 'linear-gradient(160deg, #7B83EB, #4B53BC)', how: 'Standups, design reviews and handoff calls with PMs and devs, plus the threads that keep decisions in one place.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M20.625 8.127q-.55 0-1.025-.205-.475-.205-.832-.563-.358-.357-.563-.832Q18 6.053 18 5.502q0-.54.205-1.02t.563-.837q.357-.358.832-.563.474-.205 1.025-.205.54 0 1.02.205t.837.563q.358.357.563.837.205.48.205 1.02 0 .55-.205 1.025-.205.475-.563.832-.357.358-.837.563-.48.205-1.02.205zm0-3.75q-.469 0-.797.328-.328.328-.328.797 0 .469.328.797.328.328.797.328.469 0 .797-.328.328-.328.328-.797 0-.469-.328-.797-.328-.328-.797-.328zM24 10.002v5.578q0 .774-.293 1.46-.293.685-.803 1.194-.51.51-1.195.803-.686.293-1.459.293-.445 0-.908-.105-.463-.106-.85-.329-.293.95-.855 1.729-.563.78-1.319 1.336-.756.557-1.67.861-.914.305-1.898.305-1.148 0-2.162-.398-1.014-.399-1.805-1.102-.79-.703-1.312-1.664t-.674-2.086h-5.8q-.411 0-.704-.293T0 16.881V6.873q0-.41.293-.703t.703-.293h8.59q-.34-.715-.34-1.5 0-.727.275-1.365.276-.639.75-1.114.475-.474 1.114-.75.638-.275 1.365-.275t1.365.275q.639.276 1.114.75.474.475.75 1.114.275.638.275 1.365t-.275 1.365q-.276.639-.75 1.113-.475.475-1.114.75-.638.276-1.365.276-.188 0-.375-.024-.188-.023-.375-.058v1.078h10.875q.469 0 .797.328.328.328.328.797zM12.75 2.373q-.41 0-.78.158-.368.158-.638.434-.27.275-.428.639-.158.363-.158.773 0 .41.158.78.159.368.428.638.27.27.639.428.369.158.779.158.41 0 .773-.158.364-.159.64-.428.274-.27.433-.639.158-.369.158-.779 0-.41-.158-.773-.159-.364-.434-.64-.275-.275-.639-.433-.363-.158-.773-.158zM6.937 9.814h2.25V7.94H2.814v1.875h2.25v6h1.875zm10.313 7.313v-6.75H12v6.504q0 .41-.293.703t-.703.293H8.309q.152.809.556 1.5.405.691.985 1.19.58.497 1.318.779.738.281 1.582.281.926 0 1.746-.352.82-.351 1.436-.966.615-.616.966-1.43.352-.815.352-1.752zm5.25-1.547v-5.203h-3.75v6.855q.305.305.691.452.387.146.809.146.469 0 .879-.176.41-.175.715-.48.304-.305.48-.715t.176-.879Z"/></svg>' },
    { n: 'Canva', bg: 'linear-gradient(135deg, #00C4CC, #7D2AE8)', how: 'Quick social posts, thumbnails and carousels for my content, when opening Figma would be overkill.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM6.962 7.68c.754 0 1.337.549 1.405 1.2.069.583-.171 1.097-.822 1.406-.343.171-.48.172-.549.069-.034-.069 0-.137.069-.206.617-.514.617-.926.548-1.508-.034-.378-.308-.618-.583-.618-1.2 0-2.914 2.674-2.674 4.629.103.754.549 1.646 1.509 1.646.308 0 .65-.103.96-.24.5-.264.799-.47 1.097-.8-.073-.885.704-2.046 1.851-2.046.515 0 .926.205.96.583.068.514-.377.582-.514.582s-.378-.034-.378-.17c-.034-.138.309-.07.275-.378-.035-.206-.24-.274-.446-.274-.72 0-1.131.994-1.029 1.611.035.275.172.549.447.549.205 0 .514-.31.617-.755.068-.308.343-.514.583-.514.102 0 .17.034.205.171v.138c-.034.137-.137.548-.102.651 0 .069.034.171.17.171.092 0 .436-.18.777-.459.117-.59.253-1.298.253-1.357.034-.24.137-.48.617-.48.103 0 .171.034.205.171v.138l-.136.617c.445-.583 1.097-.994 1.508-.994.172 0 .309.102.309.274 0 .103 0 .274-.069.446-.137.377-.309.96-.412 1.474 0 .137.035.274.207.274.171 0 .685-.206 1.096-.754l.007-.004c-.002-.068-.007-.134-.007-.202 0-.411.035-.754.104-.994.068-.274.411-.514.617-.514.103 0 .205.069.205.171 0 .035 0 .103-.034.137-.137.446-.24.857-.24 1.269 0 .24.034.582.102.788 0 .034.035.069.07.069.068 0 .548-.445.89-1.028-.308-.206-.48-.549-.48-.96 0-.72.446-1.097.858-1.097.343 0 .617.24.617.72 0 .308-.103.65-.274.96h.102a.77.77 0 0 0 .584-.24.293.293 0 0 1 .134-.117c.335-.425.83-.74 1.41-.74.48 0 .924.205.959.582.068.515-.378.618-.515.618l-.002-.002c-.138 0-.377-.035-.377-.172 0-.137.309-.068.274-.376-.034-.206-.24-.275-.446-.275-.686 0-1.13.891-1.028 1.611.034.275.171.583.445.583.206 0 .515-.308.652-.754.068-.274.343-.514.583-.514.103 0 .17.034.205.171 0 .069 0 .206-.137.652-.17.308-.171.48-.137.617.034.274.171.48.309.583.034.034.068.102.068.102 0 .069-.034.138-.137.138-.034 0-.068 0-.103-.035-.514-.205-.72-.548-.789-.891-.205.24-.445.377-.72.377-.445 0-.89-.411-.96-.926a1.609 1.609 0 0 1 .075-.649c-.203.13-.422.203-.623.203h-.17c-.447.652-.927 1.098-1.27 1.303a.896.896 0 0 1-.377.104c-.068 0-.171-.035-.205-.104-.095-.152-.156-.392-.193-.667-.481.527-1.145.805-1.453.805-.343 0-.548-.206-.582-.55v-.376c.102-.754.377-1.2.377-1.337a.074.074 0 0 0-.069-.07c-.24 0-1.028.824-1.166 1.373l-.103.445c-.068.309-.377.515-.582.515-.103 0-.172-.035-.206-.172v-.137l.046-.233c-.435.31-.87.508-1.075.508-.308 0-.48-.172-.514-.412-.206.274-.445.412-.754.412-.352 0-.696-.24-.862-.593-.244.275-.523.553-.852.764-.48.309-1.028.549-1.68.549-.582 0-1.097-.309-1.371-.583-.412-.377-.651-.96-.686-1.509-.205-1.68.823-3.84 2.4-4.8.378-.205.755-.343 1.132-.343zm9.77 3.291c-.104 0-.172.172-.172.343 0 .274.137.583.309.755a1.74 1.74 0 0 0 .102-.583c0-.343-.137-.515-.24-.515z"/></svg>' },
    { n: 'ChatGPT', bg: '#0B0B0B', how: 'Brainstorming, quick research and rewriting copy. My second brain for first drafts.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>' },
    { n: 'Vowen', bg: 'linear-gradient(160deg, #FF8A5B, #E4402A)', how: 'Voice dictation on my Mac. I talk through ideas and notes, and it types them into any app, even offline.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2"/></svg>' },
    { n: 'Gmail', bg: '#FFFFFF', how: 'Where recruiters, collaborators and clients reach me, and where every handoff gets a paper trail.', icon: '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M2 6.5v11A1.5 1.5 0 0 0 3.5 19H6V10l-4-3.5z"/><path fill="#34A853" d="M18 19h2.5a1.5 1.5 0 0 0 1.5-1.5v-11L18 10z"/><path fill="#FBBC04" d="M18 5.5V10l4-3.5V5.2c0-1.3-1.5-2-2.5-1.2z"/><path fill="#EA4335" d="M6 10V5.5l6 4.5 6-4.5V10l-6 4.5z"/><path fill="#C5221F" d="M2 5.2v1.3L6 10V5.5L4.5 4C3.5 3.2 2 3.9 2 5.2z"/></svg>' },
    { n: 'ElevenLabs', bg: '#0B0B0B', how: 'AI voiceovers for my reels and app demos, when I need a clean voice track fast.', icon: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M4.6035 0v24h4.9317V0zm9.8613 0v24h4.9317V0z"/></svg>' }
  ];
  const giftStageEl = $('#giftStage'), beam = $('#beam'), stackTrack = $('#stackTrack'), stackHead = $('#stackHead'), gift = $('#gift'), lidG = $('#lid'), gGlow = $('#gGlowEl'), burst = $('#burst'), ring = $('#ring'), toolTip = $('#toolTip'), giftCap = $('#giftCap'), confetti = $('#confetti');
  let stTop = 0, stRange = 1, RX = 420, RY = 250, tipFor = -1;
  if (!hoverable) $('#giftCapV').textContent = 'Tap';
  // two rows of an arc that rises out of the box: a wide back row and a tighter front row
  const MOUTH = -70;
  const BUNCH = [[5, 6, 5, 1], [4, 5, 4, 3, 1]].map(rows => rows.flatMap((n, r) => Array.from({ length: n }, (_, k) => [r, k - (n - 1) / 2])));
  let BS = 104, BCY = -380;
  // an organic cloud of balloons (a sunflower spread inside an ellipse), all tied back to the box
  // the tools land in a neat, glassy grid above the box, like a home screen
  let TS = 1, BRX = 0, BRY = 0, COLS = 6, PX = 104, PY = 106, GTOP = -420, GIFT_LIFT = 0;
  const toolPos = i => { const n = TOOLS.length, rows = Math.ceil(n / COLS), r = Math.floor(i / COLS), inRow = r < rows - 1 ? COLS : n - COLS * (rows - 1), c = i % COLS;
    return [(c - (inRow - 1) / 2) * PX, GTOP + r * PY + PY / 2]; };
  const toolPosOld = i => { if (mobile) { const row = i < 4 ? 0 : i < 8 ? 1 : 2, inRow = row < 2 ? 4 : TOOLS.length - 8, k = row < 2 ? i % 4 : i - 8; return [(k - (inRow - 1) / 2) * Math.min(86, vw * .22), -210 - (2 - row) * 100]; }
    const a = (188 + 164 * i / (TOOLS.length - 1)) * Math.PI / 180; return [Math.cos(a) * RX, MOUTH + Math.sin(a) * RY]; };
  const toolEls = TOOLS.map((t, i) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'tool'; b.style.setProperty('--bg', t.bg); b.style.setProperty('--i', i);
    b.setAttribute('aria-label', `${t.n}: ${t.how}`);
    b.innerHTML = `<span class="ti">${t.icon}</span><span class="tn">${t.n.replace('Microsoft ', '')}</span>`;
    b.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') showTip(i); });
    b.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') showTip(-1); });
    b.addEventListener('focus', () => showTip(i)); b.addEventListener('blur', () => showTip(-1));
    b.addEventListener('click', () => showTip(tipFor === i ? -1 : i));
    ring.appendChild(b); return b;
  });
  Array.from({ length: 14 }, (_, k) => { const el = document.createElement('i'); el.style.cssText = `--x0:${((k * 37) % 120) - 60}px;--x1:${((k * 71) % 260) - 130}px;--d:${(-k * .41).toFixed(2)}s;--s:${(.4 + (k * 29 % 10) / 14).toFixed(2)}`; confetti.appendChild(el); });
  const strSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); strSvg.setAttribute('class', 'strings'); strSvg.setAttribute('aria-hidden', 'true'); ring.before(strSvg);
  const strings = TOOLS.map(() => { const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); strSvg.appendChild(p); return p; });
  function showTip(i) {
    tipFor = i; toolEls.forEach((b, k) => b.classList.toggle('on', k === i)); ring.classList.toggle('hov', i >= 0);
    if (i < 0 || !toolEls[i].classList.contains('set')) { toolTip.classList.remove('in'); giftCap.classList.remove('hide'); ring.classList.toggle('hov', false); return; }
    const t = TOOLS[i];
    $('#ttN').textContent = t.n; $('#ttP').textContent = t.how; $('#ttC').textContent = TOOL_ROLE[t.n] || ''; $('#ttI').innerHTML = t.icon; toolTip.style.setProperty('--bg', t.bg);
    // sit right next to the hovered icon: outside edge first, flip inward if there's no room
    const [px, py] = toolPos(i), w = mobile ? 220 : 300, gap = mobile ? 40 : 58;
    let tx, ty = py;
    if (mobile) { tx = clamp(px, -vw / 2 + w / 2 + 12, vw / 2 - w / 2 - 12); ty = py < GTOP + PY ? py + gap + 60 : py - gap - 56; }
    else { const out = px >= 0 ? 1 : -1; tx = px + out * (gap + w / 2); if (Math.abs(tx) + w / 2 > vw / 2 - 16) tx = px - out * (gap + w / 2); }
    toolTip.style.left = tx.toFixed(0) + 'px'; toolTip.style.top = ty.toFixed(0) + 'px';
    toolTip.classList.add('in'); giftCap.classList.add('hide');
  }
  let giftTap = false, giftQ = 0, giftGo = false;
  const giftBtn = document.createElement('button'); giftBtn.type = 'button'; giftBtn.className = 'gift-tap'; giftBtn.innerHTML = '<i></i>Tap to unwrap'; $('#giftStage').parentElement.appendChild(giftBtn);
  const unwrap = () => { if (giftTap && !giftGo) { giftGo = true; giftBtn.classList.add('gone'); } };
  giftBtn.addEventListener('click', unwrap); $('#giftStage').addEventListener('click', unwrap);
  function layoutStack() {
    giftTap = true; $('#stack').classList.toggle('tap', giftTap);
    stTop = top(stackTrack); stRange = Math.max(1, stackTrack.offsetHeight - vh);
    RX = mobile ? vw * .44 : Math.min(vw * .42, 620); RY = mobile ? Math.min(vh * .46, 380) : Math.min(vh * .58, 480);
    COLS = mobile ? (vh < 720 ? 6 : 5) : 9; PX = mobile ? Math.min(74, (vw - 24) / COLS) : Math.min(112, (vw - 80) / 9); PY = mobile ? 84 : 116; BS = 1; BRX = COLS * PX / 2;
    // heading, icon rows and gift stack as one tight group: the gift sits right under the last row of icons
    const pinBox = $('#giftStage').parentElement.getBoundingClientRect(), headB = stackHead.getBoundingClientRect().bottom - pinBox.top;
    const giftTop = mobile ? 125 : 170, gapTop = mobile ? 18 : 30, gapMid = mobile ? 24 : 44, rows = Math.ceil(TOOLS.length / COLS);
    // short screens: tighten and shrink the icon grid so it always sits fully above the gift
    const room = pinBox.height - (mobile ? 120 : 150) - (headB + gapTop + gapMid + giftTop), basePY = PY;
    if (rows * PY > room) PY = Math.max(mobile ? 42 : 62, room / rows);
    TS = Math.min(1, PY / basePY); PX = Math.max(PX * TS, Math.min(PX, (vw - 24) / COLS) * TS);
    const gridH = rows * PY;
    const stageY = Math.min(pinBox.height - (mobile ? 120 : 150), headB + gapTop + gridH + gapMid + giftTop);
    $('#giftStage').style.top = stageY + 'px';
    GTOP = headB + gapTop - stageY; GIFT_LIFT = Math.max(0, stageY - (headB + gapTop + giftTop));

  }
  function frameStack(y) {
    // the unwrap plays on its own clock: about seven unhurried seconds, eased at both ends
    if (giftTap && giftGo) { if (!giftGo.t) giftGo = { t: performance.now() }; const u = reduce ? 1 : Math.min(1, (performance.now() - giftGo.t) / 7000); giftQ = u < 1 ? .5 - .5 * Math.cos(Math.PI * u) : 1; }
    if (giftTap && !giftGo) { const gb = gift.getBoundingClientRect(), pb = giftBtn.parentElement.getBoundingClientRect(); if (gb.height) giftBtn.style.top = (gb.bottom - pb.top + 18).toFixed(0) + 'px'; }
    const q = giftTap ? giftQ : clamp((y - stTop) / stRange), now = performance.now() / 1000;
    const rise = ss(range(q, 0, .05)), shake = range(q, .03, .17), open = ss(range(q, .16, .25)), drop = ss(range(q, .14, .28));
    giftStageEl.style.transform = `translate3d(0, ${(-(1 - drop) * GIFT_LIFT).toFixed(1)}px, 0)`;
    const amp = reduce ? 0 : shake * (1 - open) * 3.5, rot = Math.sin(now * 23) * amp, hop = Math.abs(Math.sin(now * 11.5)) * amp * 1.4;
    gift.style.transform = `translate3d(0, ${((1 - rise) * vh * .08 - hop).toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${(.9 + .1 * rise).toFixed(3)})`;
    lidG.style.transform = `translate(${(open * 90).toFixed(1)}px, ${(-open * 150 + Math.sin(open * Math.PI) * -40 + ss(range(q, .25, .38)) * 110).toFixed(1)}px) rotate(${(open * 28).toFixed(1)}deg)`;
    gGlow.setAttribute('opacity', open.toFixed(3)); burst.style.opacity = (open * .95).toFixed(3); burst.style.scale = (.55 + .45 * open).toFixed(3);
    $('#giftStage').classList.toggle('open', open > .6); beam.style.opacity = (open * .8).toFixed(3);
    const hk = 0; stackHead.style.opacity = (1 - hk).toFixed(3); stackHead.style.transform = `translate3d(0, ${(-hk * 40).toFixed(1)}px, 0)`;
    giftCap.style.opacity = 0;
    toolEls.forEach((el, i) => {
      const s0 = .27 + i * .028, f = ss(range(q, s0, s0 + .11)), [tx, ty] = toolPos(i);
      const cx = tx * .25, cy = ty - 60, sx = 0, sy = MOUTH, u = 1 - f;
      const x = u * u * sx + 2 * u * f * cx + f * f * tx, yy = u * u * sy + 2 * u * f * cy + f * f * ty;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${yy.toFixed(1)}px, 0) scale(${((.2 + .8 * f) * TS).toFixed(3)}) rotate(${(u * (tx < 0 ? -40 : 40)).toFixed(1)}deg)`;
      el.style.opacity = f > 0 ? Math.min(1, f * 5).toFixed(2) : 0; el.style.pointerEvents = f > .98 ? '' : 'none';
      const set = f > .98; if (el.classList.contains('set') !== set) { el.classList.toggle('set', set); if (!set && tipFor === i) showTip(-1); }
    });
  }

  const procLine = $('#procLine'), procFg = $('#procFg'), procBg = $('#procBg'); let pNodes = [], pLen = 0, pTop = 0;
  PROC.forEach(([b, s, c], i) => { const n = document.createElement('div'); n.className = 'pnode' + (i % 2 ? ' up' : ''); n.style.setProperty('--c', c); n.innerHTML = `<span class="dot"></span><b>${b}</b><span>${s}</span>`; procLine.appendChild(n); pNodes.push(n); });
  function layoutProc() {
    pTop = top(procLine);
    if (mobile) return;
    const w = procLine.clientWidth, h = procLine.clientHeight, mid = h * .5, amp = h * .16, n = PROC.length;
    const pts = PROC.map((_, i) => [w * (.04 + .92 * i / (n - 1)), mid + (i % 2 ? -amp : amp)]);
    let d = `M 0 ${mid}`; let prev = [0, mid];
    pts.forEach(p => { const mx = (prev[0] + p[0]) / 2; d += ` C ${mx} ${prev[1]}, ${mx} ${p[1]}, ${p[0]} ${p[1]}`; prev = p; });
    d += ` C ${w} ${prev[1]}, ${w} ${mid}, ${w + 20} ${mid}`;
    procBg.setAttribute('d', d); procFg.setAttribute('d', d); $('#procSvg').setAttribute('viewBox', `0 0 ${w} ${h}`);
    pLen = procFg.getTotalLength(); procFg.style.strokeDasharray = pLen; procFg.style.strokeDashoffset = pLen;
    pNodes.forEach((nd, i) => { nd.style.left = pts[i][0] + 'px'; nd.style.top = (pts[i][1] - 13) + 'px'; if (i % 2) nd.style.top = (pts[i][1] + 13) + 'px'; });
  }
  function frameProc(y) {
    const q = clamp((y + vh * .8 - pTop) / (procLine.offsetHeight + vh * .35));
    if (!mobile && pLen) procFg.style.strokeDashoffset = (pLen * (1 - q)).toFixed(1);
    pNodes.forEach((n, i) => n.classList.toggle('in', mobile ? n.getBoundingClientRect().top < vh * .85 : q > (i + .3) / PROC.length));
  }

  /* ---------- highlights that paint as they enter ---------- */
  const lateHl = ['#journeyHl', '#workHl', '#brandHl', '#stackHl', '#llHl', '#procHl', '#notesHl', '#lifeHl'].map(s => $(s));
  const helloRq = $('#helloRq'); helloRq.style.animation = 'none';
  const cloudsFoot = $$('#cloudsFoot img'), cloudsFootEl = $('#cloudsFoot');
  let dockY = 0;
  const dock = $('.bar .nav');
  const navLinks = $$('.bar .nav a[data-go]'), navInd = $('#navInd'); let navOn = null, navTops = [];
  function frameMisc(y) {
    if (!navTops.length) navTops = navLinks.map(a => top($('#' + a.dataset.go)));
    let cur = null; navLinks.forEach((a, k) => { if (a.offsetParent && navTops[k] <= y + vh * .5) cur = a; });
    if (y < vh * .5) cur = navLinks.find(a => a.dataset.go === 'top') || null;
    if (navOn && navOn === cur && navInd.offsetWidth !== navOn.offsetWidth) { navInd.style.width = navOn.offsetWidth + 'px'; navInd.style.transform = `translateX(${navOn.offsetLeft}px)`; }
    if (cur !== navOn) { navOn = cur; navLinks.forEach(a => a.classList.toggle('on', a === cur)); navInd.classList.toggle('on', !!cur); if (cur) { navInd.style.width = cur.offsetWidth + 'px'; navInd.style.transform = `translateX(${cur.offsetLeft}px)`; } }
    const inMap = y > jTop - vh * .4 && y < jTop + jRange + vh * .3, bx = boxTrack.getBoundingClientRect(), pinned = (bx.top < vh * .3 && bx.bottom > vh * .7) || (y > stTop - vh * .2 && y < stTop + stRange) || (y > rvTop - vh * .2 && y < rvTop + rvRange) || (y > bTop - vh * .2 && y < bTop + bRange);
    if (y > dockY + 3 && y > vh * .5) { if (dock.dataset.dn !== '1') dock.dataset.dn = 1; } else if (y < dockY - 3 && dock.dataset.dn) dock.dataset.dn = '';
    if (dock.classList.contains('away')) dock.classList.remove('away'); dockY = y; // the nav always stays on screen
    lateHl.forEach(h => { if (!h.classList.contains('on') && h.getBoundingClientRect().top < vh * .78) h.classList.add('on'); });
    const hr = helloRq.getBoundingClientRect();
    if (hr.top < vh * .8 && !helloRq.dataset.done) { helloRq.dataset.done = 1; helloRq.classList.add('painted'); }
    const fr = cloudsFootEl.getBoundingClientRect(), fq = clamp(1 - fr.top / vh), fk = fq.toFixed(3);
    if (fk !== frameMisc.fk) { frameMisc.fk = fk; cloudsFoot.forEach(im => im.style.transform = `translate3d(0, ${(-(fq) * vh * +im.dataset.sp).toFixed(1)}px, 0)` + (im.dataset.f ? ' scaleX(-1)' : '')); }
  }
  const st = document.createElement('style'); st.textContent = '#helloRq::before{animation:none}#helloRq.painted::before{animation:paint 1s var(--ease) .1s forwards}'; document.head.appendChild(st);

  /* ---------- copy email ---------- */
  $('#copy').addEventListener('click', e => {
    const b = e.currentTarget, text = $('#mailText').textContent;
    const done = () => { b.classList.add('ok'); b.title = 'Copied'; setTimeout(() => { b.classList.remove('ok'); b.title = 'Copy email'; }, 1800); };
    try { navigator.clipboard.writeText(text).then(done, () => selectMail()); } catch (_) { selectMail(); }
  });
  function selectMail() { const r = document.createRange(); r.selectNodeContents($('#mailText')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }

  /* ---------- PocketCheck: a line that reveals itself ---------- */
  const llRevTrack = $('#llRevTrack'), llRevEl = $('#llRev');
  let llTop = 0, llRange = 1, rvTop = 0, rvRange = 1, llLit = -1;
  const llWords = [];
  (function split(node) { [...node.childNodes].forEach(n => { if (n.nodeType === 3) { const f = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(tok => { if (!tok) return; if (/^\s+$/.test(tok)) { f.appendChild(document.createTextNode(tok)); return; } const w = document.createElement('span'); w.className = 'w'; w.textContent = tok; llWords.push(w); f.appendChild(w); }); n.replaceWith(f); } else if (n.classList && n.classList.contains('w')) llWords.push(n); else split(n); }); })(llRevEl);
  const llMarks = $$('.hl', llRevEl).map(el => ({ el, last: llWords.indexOf($$('.w', el).pop()) }));
  function layoutLL() { const sec = $('#lastlook'); llTop = top(sec); llRange = Math.max(1, sec.offsetHeight - vh); rvTop = top(llRevTrack); rvRange = Math.max(1, llRevTrack.offsetHeight - vh); }
  const llRoles = $('#llRoles');
  function frameLL(y) {
    if (!llRoles.classList.contains('in') && llRoles.getBoundingClientRect().top < vh * .82) llRoles.classList.add('in');
    const p = playIn(llRevEl, 'll', 2600), lit = p * llWords.length * 1.05;
    if (Math.abs(lit - llLit) < .05) return; llLit = lit;
    const b1 = DIMW(); llWords.forEach((w, i) => { w.style.opacity = (b1 + (1 - b1) * clamp(lit - i)).toFixed(3); });
    llMarks.forEach(m => m.el.classList.toggle('on', lit >= m.last + 1));
  }

  const lookEyes = $$('#llRev .oo s');
  addEventListener('pointermove', e => {
    const r = llRevEl.getBoundingClientRect(); if (r.bottom < -100 || r.top > vh + 100) return;
    lookEyes.forEach(b => { const p = b.parentElement.getBoundingClientRect(), dx = e.clientX - (p.left + p.width / 2), dy = e.clientY - (p.top + p.height / 2), a = Math.atan2(dy, dx), m = Math.min(1, Math.hypot(dx, dy) / 260) * p.width * .2;
      b.style.setProperty('--ex', (Math.cos(a) * m).toFixed(1) + 'px'); b.style.setProperty('--ey', (Math.sin(a) * m * 1.2).toFixed(1) + 'px'); });
  }, { passive: true });

  /* ---------- the notes wall ---------- */
  const NOTE_COLORS = ['#FFE98A', '#FFD1C4', '#CFE7FF', '#D9CCFF', '#C9EBD2', '#FFE0B8'];
  const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const hashStr = str => { let h = 2166136261; for (const ch of String(str)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  function avatarSVG(seed) {
    let a = hashStr(seed || 'x'); const r = () => ((a = Math.imul(a ^ (a >>> 15), 2246822507) ^ Math.imul(a ^ (a >>> 13), 3266489909), (a >>> 0) / 4294967296));
    const bg = ['#FFD23F', '#9FD3FF', '#FFB4A0', '#BDEBC0', '#D9CCFF', '#FFC98A'][Math.floor(r() * 6)], skin = ['#F6D2B4', '#E4AE84', '#C98B62', '#8D5A3B', '#FBE3CF'][Math.floor(r() * 5)];
    const hairC = ['#1B1B1F', '#5A3A22', '#A0703F', '#E0B35A', '#C44A2C', '#6B7A99'][Math.floor(r() * 6)], hs = Math.floor(r() * 4), ey = r() > .5, mouth = Math.floor(r() * 3);
    const hair = [`<path d="M18 30c0-10 6-17 14-17s14 7 14 17c-4-5-9-7-14-7s-10 2-14 7z" fill="${hairC}"/>`, `<path d="M17 32c-1-12 6-20 15-20s16 8 15 20l-3-6c-6 1-18 1-24 0z" fill="${hairC}"/><path d="M17 32c0 8 1 16 3 20h-4c-2-6-2-14 1-20zM47 32c0 8-1 16-3 20h4c2-6 2-14-1-20z" fill="${hairC}"/>`,
      `<path d="M19 26c2-8 8-12 13-12s11 4 13 12H19z" fill="${hairC}"/><path d="M17 26h30v4H17z" fill="${hairC}"/>`, `<circle cx="32" cy="13" r="6" fill="${hairC}"/><path d="M19 29c1-9 7-14 13-14s12 5 13 14c-5-3-8-4-13-4s-8 1-13 4z" fill="${hairC}"/>`][hs];
    const eyes = ey ? '<circle cx="27" cy="33" r="2.2" fill="#1B1B1F"/><circle cx="37" cy="33" r="2.2" fill="#1B1B1F"/>' : '<path d="M24.5 33.5q2.5-2.5 5 0M34.5 33.5q2.5-2.5 5 0" stroke="#1B1B1F" stroke-width="1.8" fill="none" stroke-linecap="round"/>';
    const m = ['<path d="M28 40q4 4 8 0" stroke="#1B1B1F" stroke-width="1.8" fill="none" stroke-linecap="round"/>', '<ellipse cx="32" cy="41" rx="3.2" ry="2.4" fill="#1B1B1F"/>', '<path d="M27 40q5 5 10 0z" fill="#fff" stroke="#1B1B1F" stroke-width="1.4" stroke-linejoin="round"/>'][mouth];
    return `<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" fill="${bg}"/><path d="M14 64c2-11 9-16 18-16s16 5 18 16z" fill="${['#13233A', '#FF6B4A', '#2A7BD1', '#2E9E6B', '#7B5CD6'][Math.floor(r() * 5)]}"/><rect x="28" y="42" width="8" height="8" fill="${skin}"/><ellipse cx="32" cy="33" rx="13" ry="14" fill="${skin}"/>${hair}${eyes}<circle cx="24" cy="38" r="2.4" fill="#FF8A7A" opacity=".45"/><circle cx="40" cy="38" r="2.4" fill="#FF8A7A" opacity=".45"/>${m}</svg>`;
  }
  const safePhoto = p => typeof p === 'string' && (/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(p) || /^v2\/[a-z0-9/_-]+\.webp$/.test(p)) ? p : '';
  const faceHTML = n => { const p = safePhoto(n.photo); return p ? `<img src="${p}" alt="">` : avatarSVG(n.avatar || n.name); };
  const fmtDate = t => { try { return new Date(t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }); } catch (_) { return ''; } };
  const nwRows = [$('#nwRow1'), $('#nwRow2')];
  let wallNotes = [], localNotes = [], freshId = null;
  try { localNotes = JSON.parse(localStorage.getItem('portfolio-notes') || '[]').filter(n => n && n.note); } catch (_) {}
  // company logos come from Simple Icons (free, open source), loaded only when someone types a company
  const SI = 'https://cdn.jsdelivr.net/npm/simple-icons@13';
  const coSlug = t => String(t).replace(/\+/g, 'plus').replace(/^\./, 'dot-').replace(/\./g, 'dot').replace(/&/g, 'and').replace(/ß/g, 'ss').replace(/[łŀ]/g, 'l').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const okBrand = b => b && /^[a-z0-9]{1,60}$/.test(b.s) && /^[0-9A-Fa-f]{6}$/.test(b.h) ? { s: b.s, h: b.h } : null;
  const logoHTML = (name, b, cls = 'co') => { b = okBrand(b); const ch = esc((String(name).trim()[0] || '?').toUpperCase());
    return b ? `<i class="${cls}" style="--bh:#${b.h}"><img src="${SI}/icons/${b.s}.svg" alt="" loading="lazy" onerror="this.replaceWith(document.createTextNode('${ch}'))"></i>` : `<i class="${cls} mono">${ch}</i>`; };
  const workHTML = n => { const co = String(n.company || '').trim(), ro = String(n.role || '').trim(); if (!co && !ro) return '';
    return `<small class="nw-work">${co ? logoHTML(co, n.brand) : ''}<span>${esc(ro)}${ro && co ? ' · ' : ''}${co ? `<em>${esc(co)}</em>` : ''}</span></small>`; };
  // keep the wall readable: no keyboard mashing, no one-word or number-only notes (the server applies the same rules)
  const KROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm', 'poiuytrewq', 'lkjhgfdsa', 'mnbvcxz'];
  const junkWord = w => { const L = w.replace(/[^A-Za-z]/g, ''); if (L.length >= 4 && KROWS.some(r => r.includes(L.toLowerCase()))) return true; if (L.length < 6) return false; let flips = 0;
    for (let i = 1; i < L.length; i++) if ((L[i] === L[i].toUpperCase()) !== (L[i - 1] === L[i - 1].toUpperCase())) flips++;
    const vowels = (L.match(/[aeiouy]/gi) || []).length / L.length, run = Math.max(0, ...(L.match(/[^aeiou]+/gi) || []).map(r => r.length));
    return (flips >= 4 && L.length >= 8) || (vowels < .25 && run >= 7 && L.length >= 8); };
  const junkText = t => String(t || '').split(/\s+/).some(junkWord);
// a note has to read like something a person meant: not interjections ("uh uh ah ah"), not the same words over and over, and with a couple of real words in it
const FILLER = new Set(['uh', 'uhh', 'uhm', 'um', 'umm', 'ah', 'aah', 'ahh', 'oh', 'ohh', 'eh', 'hm', 'hmm', 'hmmm', 'mm', 'mmm', 'huh', 'ha', 'haha', 'hahaha', 'hehe', 'heh', 'lol', 'lmao', 'blah', 'bla', 'la', 'na', 'nah', 'ya', 'yay', 'woo', 'yeah', 'yep', 'nope', 'test', 'testing', 'asdf', 'abc', 'xyz', 'zzz', 'ok', 'okay', 'hi', 'hey', 'hello', 'wow', 'yo']);
const FAKE_NAME = /^(test(ing|er|user)?\d*|asdf\w*|qwerty\w*|admin|user\d*|abc|xyz|demo|sample|fake|null|none|na|n\/a|name|anonymous|anon|xxx+|aaa+|hello|hi|hey|me|no ?one|nobody|someone|god)$/i;
const fakeName = v => FAKE_NAME.test(String(v || '').trim());
function nonsense(t) {
  const w = String(t || '').toLowerCase().match(/[\p{L}\p{M}']+/gu) || [], n = w.length;
  if (n < 2 || new Set(w).size < 2) return true;
  const uniq = new Set(w).size, fill = w.filter(x => FILLER.has(x) || /^(.)\1+$/.test(x)).length;
  const cnt = {}; w.forEach(x => { cnt[x] = (cnt[x] || 0) + 1; });
  if (fill / n >= .5) return true;                                             // uh uh ah ah
  const stutter = w.filter(x => /(\p{L}{2,3})\1/u.test(x.replace(/(\p{L})\1+/gu, '$1')) || /^(\p{L})\1$/u.test(x)).length;   // ththath, aa (a stretched "sooo" is fine)
  if (stutter >= 2 || (n >= 3 && stutter / n >= .25)) return true;
  if (n >= 4 && uniq / n < .6) return true;                                    // the same few words again and again
  if (Math.max(...Object.values(cnt)) >= 3 && Math.max(...Object.values(cnt)) / n >= .3) return true;
  if (n >= 4) { const bg = {}; for (let i = 0; i < n - 1; i++) { const k = w[i] + ' ' + w[i + 1]; bg[k] = (bg[k] || 0) + 1; } if (Math.max(...Object.values(bg)) >= 2 && uniq / n < .75) return true; }
  return w.filter(x => x.length >= 3 && !FILLER.has(x) && (/[aeiouy]/.test(x) || !/[a-z]/.test(x))).length < 2;  // at least two real words
}

// (same rules as the server) an email has to look like a real person's: proper shape, a real-looking name and domain, no throwaway or placeholder services, no common typos
const FAKE_DOMAINS = ['example.com', 'example.org', 'example.net', 'test.com', 'test.test', 'test.in', 'fake.com', 'fakemail.com', 'noemail.com', 'none.com', 'abc.com', 'asdf.com', 'xyz.com', 'domain.com', 'email.test', 'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com', '10minutemail.com', 'tempmail.com', 'temp-mail.org', 'tempmail.net', 'yopmail.com', 'trashmail.com', 'throwawaymail.com', 'getnada.com', 'maildrop.cc', 'dispostable.com', 'fakeinbox.com', 'mailnesia.com', 'mintemail.com', 'moakt.com', 'emailondeck.com', 'spamgourmet.com', 'mohmal.com', 'burnermail.io'];
const TYPO_DOMAINS = ['gmial.com', 'gamil.com', 'gmai.com', 'gmail.co', 'gmail.cm', 'gmaill.com', 'gmal.com', 'gnail.com', 'gmail.con', 'hotmial.com', 'hotmal.com', 'yaho.com', 'yahooo.com', 'yahoo.co', 'outlok.com', 'outlook.co'];
const FAKE_LOCALS = ['test', 'testing', 'fake', 'asdf', 'qwerty', 'abc', 'abcd', 'xyz', 'noreply', 'no-reply', 'nobody', 'none', 'null', 'email', 'example', 'user', 'admin', 'name', 'sample', 'demo', 'spam', 'trash'];
function emailOk(e) {
  e = String(e || '').trim().toLowerCase();
  const m = /^([a-z0-9][a-z0-9._%+-]{0,63})@((?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24})$/.exec(e);
  if (!m || e.length > 120) return false;
  const [, local, domain] = m;
  if (/\.\.|\.$|^\./.test(local) || /[._%+-]{2,}/.test(local)) return false;
  if (FAKE_DOMAINS.includes(domain) || TYPO_DOMAINS.includes(domain)) return false;
  if (FAKE_LOCALS.includes(local.replace(/[0-9._-]+$/, ''))) return false;
  if ((local.match(/[a-z]/g) || []).length < 2) return false;                    // 12345@…, a@…
  if (/^(.)\1{3,}/.test(local) || /(.)\1{4,}/.test(local)) return false;
  if (/lihwak/.test(e) || /(.)\1{3,}/.test(domain)) return false;
  if (domain.split('.').slice(0, -1).some(p => p.length >= 6 && ((p.match(/[aeiou]/g) || []).length / p.length) < .2)) return false;        // aaaaa@, hellooooo@
  if (junkText(local.replace(/[0-9._%+-]+/g, ' ')) || domain.split('.').slice(0, -1).some(p => junkWord(p))) return false;  // keyboard mashing
  return true;
}

  const noteShort = t => { t = String(t || '').trim(); return t.length < 8 || t.split(/\s+/).filter(w => /\p{L}/u.test(w)).length < 2; };
  // notes taken down by hand (the server hides the same ones)
  const NOTE_BLOCK = ['lihwak', 'testing the functionality and and validation', 'ai slop', 'uh uh', 'this isss a aa hit'];
  const noteBlocked = n => { const t = [n.note, n.name, n.company, n.role].join(' ').toLowerCase(); return NOTE_BLOCK.some(w => t.includes(w)); };
  // one Tamil note on the wall, shown in English (the original was cut off at the 200-character limit)
  const NOTE_EN = [['படைப்பாற்றல், நேர்த்தியான', 'This portfolio is the finest expression of creativity, elegant design and meticulous craftsmanship. Its unique artistry and flawless creation are beautifully reflected in it.']];
  const noteEn = n => { const t = String(n.note || '').replace(/^["“\s]+/, ''), hit = NOTE_EN.find(([k]) => t.startsWith(k)); return hit ? { ...n, note: hit[1] } : n; };
  const noteOk = n => !noteBlocked(n) && !noteShort(n.note) && !nonsense(n.note) && !fakeName(n.name) && !(n.company && fakeName(n.company)) && !(n.role && fakeName(n.role)) && /\p{L}/u.test(String(n.name || '')) && ![n.note, n.name, n.company, n.role].some(junkText);
  function noteCard(n, k) {
    if (n.ghost) return `<button type="button" class="nw-card nw-ghost" data-open style="--r:${k % 2 ? 1.5 : -1.5}deg"><div><p>Your note could be here.</p><span>Write one ↗</span></div></button>`;
    const c = n._c || NOTE_COLORS[hashStr(n.id || n.name) % NOTE_COLORS.length];
    return `<figure class="nw-card${n.id === freshId ? ' fresh' : ''}" data-read tabindex="0" role="button" aria-label="Read the note from ${esc(n.name)}" style="--nc:${c};--r:${((hashStr(n.id || n.name) % 7) - 3) * .8}deg;margin:0"><p>${esc(n.note)}</p><figcaption class="nw-by"><span class="av">${faceHTML(n)}</span><span><b>${esc(n.name)}</b>${workHTML(n) || `<small>${n.local ? 'Saved on this device' : esc(fmtDate(n.at))}</small>`}</span></figcaption></figure>`;
  }
  function renderWall() {
    const seen = new Set(), all = [...localNotes.map(n => ({ ...n, local: true })), ...wallNotes].filter(n => { const key = n.id; if (seen.has(key)) return false; seen.add(key); return true; })
      .filter(noteOk).map(noteEn).sort((a, b) => (b.at || 0) - (a.at || 0));
    window.__wallAll = () => all; const list = all.slice(0, 40); while (list.length < 10) list.push({ ghost: true });
    const rows = [[], []]; list.forEach((n, i) => rows[i % 2].push(n));
    // there is always a blank note to write on, first in the top row and halfway along the bottom one
    if (!rows[0].some(n => n.ghost)) rows[0].unshift({ ghost: true });
    if (!rows[1].some(n => n.ghost)) rows[1].splice(Math.ceil(rows[1].length / 2), 0, { ghost: true });
    // colours: each note keeps a colour from its id, nudged so no two neighbours match (the row loops, so the last also differs from the first)
    rows.forEach(row => { const L = NOTE_COLORS.length; let prev = -1;
      row.forEach((n, i) => { if (n.ghost) { prev = -1; return; } let c = hashStr(n.id || n.name) % L; if (c === prev) c = (c + 1) % L; n._ci = c; n._c = NOTE_COLORS[c]; prev = c; });
      const ns = row.filter(n => !n.ghost), f = ns[0], l = ns[ns.length - 1];
      if (ns.length > 2 && f._ci === l._ci) { l._ci = (l._ci + 1) % L; if (l._ci === ns[ns.length - 2]._ci) l._ci = (l._ci + 1) % L; l._c = NOTE_COLORS[l._ci]; } });
    rows.forEach((r, k) => { const html = r.map((n, i) => noteCard(n, i + k)).join(''); nwRows[k].innerHTML = html + html; nwRows[k].style.setProperty('--dur', Math.max(40, r.length * 11) + 's'); });
    requestAnimationFrame(() => $$('.nw-card[data-read] > p', $('#notes')).forEach(p => p.parentNode.classList.toggle('clip', p.scrollHeight > p.clientHeight + 2)));
    $$('.nw-track > .nw-card', $('#notes')).forEach((c, i) => { if (i >= 0 && c.closest('.nw-track') && [...c.parentNode.children].indexOf(c) >= c.parentNode.children.length / 2) c.setAttribute('aria-hidden', 'true'); });
  }
  renderWall();
  // shared storage: the artifact's database when this viewer may write, otherwise this device only
  let noteDb = null, noteUid = null, noteCanWrite = false;
  // on the live site: the shared wall lives at /api/notes, so every browser and device sees the same notes
  let noteApi = false;
  const loadWall = async () => { wallNotes = [{"id":"demo-0","name":"Maya Chen","note":"The journey map makes the story so easy to follow. Love the little details.","role":"Product designer","at":1793491200000,"avatar":"Maya Chen"},{"id":"demo-1","name":"Jordan Lee","note":"The project cards are such a fun way to explore the work.","role":"Frontend developer","at":1793404800000,"avatar":"Jordan Lee"},{"id":"demo-2","name":"Sam Rivera","note":"A portfolio with a lot of personality. The toolkit is my favorite part.","role":"Creative developer","at":1793318400000,"avatar":"Sam Rivera"},{"id":"demo-3","name":"Nina Park","note":"Really enjoyed the smooth transitions between each section.","role":"UI designer","at":1793232000000,"avatar":"Nina Park"},{"id":"demo-4","name":"Riley Brooks","note":"The whole experience feels like exploring a little world.","role":"Designer","at":1793145600000,"avatar":"Riley Brooks"},{"id":"demo-5","name":"Taylor Kim","note":"Beautiful interactions and a thoughtful way to tell your story.","role":"Web developer","at":1793059200000,"avatar":"Taylor Kim"},{"id":"demo-6","name":"Charlie Davis","note":"The draggable desk is a lovely touch. So many details to discover.","role":"Art director","at":1792972800000,"avatar":"Charlie Davis"},{"id":"demo-7","name":"Avery Patel","note":"From the first screen to the last, this was a pleasure to explore.","role":"UX designer","at":1792886400000,"avatar":"Avery Patel"},{"id":"demo-8","name":"Morgan Hall","note":"A great reminder that portfolios can be playful and useful.","role":"Design student","at":1792800000000,"avatar":"Morgan Hall"},{"id":"demo-9","name":"Casey Nguyen","note":"Such a memorable way to present both design and development.","role":"Product designer","at":1792713600000,"avatar":"Casey Nguyen"}]; renderWall(); };
  if (!(window.claude && window.claude.use) && location.protocol.startsWith('http')) {
    loadWall(); setInterval(() => { if (!document.hidden) loadWall(); }, 30000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) loadWall(); });
  }
  // the form

  /* ---------- book a free call: who you are and what you need, then pick a slot ---------- */
  const BK_URL = 'booking.html';
  const BK_SVC = ['Personal branding', 'Website', 'App building', 'Automated job outreach workflow', 'UX consultation', 'UX audit'];
  let bkEl = null, bkLast = null;
  const bkClose = () => { if (!bkEl) return; bkEl.classList.remove('open'); bkEl.setAttribute('aria-hidden', 'true'); const f = $('.bk-cal', bkEl); if (f) f.remove(); if (bkLast) bkLast.focus(); };
  const bkBuild = () => {
    bkEl = document.createElement('div'); bkEl.className = 'nw-modal bk-modal'; bkEl.setAttribute('role', 'dialog'); bkEl.setAttribute('aria-modal', 'true'); bkEl.setAttribute('aria-labelledby', 'bkTitle'); bkEl.dataset.lenisPrevent = '';
    bkEl.innerHTML = `<form class="nw-sheet bk-sheet" novalidate>
      <button class="nw-x" type="button" data-bk-x aria-label="Close">&times;</button>
      <div class="bk-step1">
        <p class="nw-k">Free 30-minute call</p>
        <h3 id="bkTitle">Let’s talk about your project.</h3>
        <p class="bk-lead">This call is about <b>your website, brand or product</b>. It isn’t a mentorship or learning session.</p>
        <div class="nw-two">
          <label class="nw-f"><span>Company name</span><input name="co" maxlength="60" autocomplete="organization" required></label>
          <label class="nw-f"><span>Your designation</span><input name="role" maxlength="60" autocomplete="organization-title" required></label>
        </div>
        <div class="nw-f"><span>What are you looking for? <em>pick any</em></span><div class="bk-svc" role="group" aria-label="Services">${BK_SVC.map(t => `<button type="button" aria-pressed="false">${t}</button>`).join('')}</div></div>
        <p class="nw-err" role="alert"></p>
        <button class="nw-go" type="submit">Next: pick a time →</button>
      </div>
      <div class="bk-step2"><button type="button" class="bk-back">← Back</button><div class="bk-slot"></div><a class="bk-out" target="_blank" rel="noopener">Calendar not loading? Open it in a new tab ↗</a></div>
    </form>`;
    document.body.appendChild(bkEl);
    const f = $('form', bkEl), err = $('.nw-err', bkEl);
    bkEl.addEventListener('click', e => { if (e.target === bkEl || e.target.closest('[data-bk-x]')) bkClose(); });
    $$('.bk-svc button', bkEl).forEach(b => b.addEventListener('click', () => { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'); err.textContent = ''; }));
    $('.bk-back', bkEl).addEventListener('click', () => { bkEl.classList.remove('cal'); const fr = $('.bk-cal', bkEl); if (fr) fr.remove(); });
    f.addEventListener('submit', e => { e.preventDefault();
      const co = f.co.value.trim(), role = f.role.value.trim(), svc = $$('.bk-svc button[aria-pressed="true"]', bkEl).map(b => b.textContent);
      if (!co) { err.textContent = 'Add your company name.'; f.co.focus(); return; }
      if (!role) { err.textContent = 'Add your designation.'; f.role.focus(); return; }
      if (!svc.length) { err.textContent = 'Pick at least one service.'; return; }
      err.textContent = '';
      const brief = `${co} · ${role} · ${svc.join(', ')}`;
      if (noteDb && noteUid && noteCanWrite) { try { noteDb.collection('feedback/' + noteUid + '/items').add({ cs: 'Call request', parts: svc, text: brief, name: role, email: '', company: co, at: Date.now() }); } catch (_) {} }
      const q = new URLSearchParams({ a1: brief, hide_gdpr_banner: '1' });
      const url = `${BK_URL}?${q}`; $('.bk-out', bkEl).href = url;
      const fr = document.createElement('iframe'); fr.className = 'bk-cal'; fr.title = 'Pick a time on Calendly'; fr.src = `${url}&embed_type=Inline&embed_domain=${encodeURIComponent(location.hostname || 'jameschugh.com')}`;
      $('.bk-slot', bkEl).replaceChildren(fr); bkEl.classList.add('cal'); window.__sfx && window.__sfx('bell'); $('.nw-sheet', bkEl).scrollTop = 0; });
    addEventListener('keydown', e => { if (e.key === 'Escape' && bkEl.classList.contains('open')) bkClose(); });
  };
  document.addEventListener('click', e => { const a = e.target.closest('a[data-book]'); if (!a) return; e.preventDefault(); bkLast = a; if (!bkEl) bkBuild();
    bkEl.classList.remove('cal'); bkEl.classList.add('open'); bkEl.setAttribute('aria-hidden', 'false'); setTimeout(() => $('input[name="co"]', bkEl).focus(), 60); });

  /* ---------- featured on Wall of Portfolios: confetti, shimmer and the pop-up ---------- */
  (() => {
    const badge = $('#wopBadge'); if (!badge) return;
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // confetti: one small canvas, gone when the last piece lands
    const confetti = (x, y, n = 90) => { if (still) return;
      const cv = document.createElement('canvas'); cv.className = 'wop-cv'; const dpr = Math.min(2, devicePixelRatio || 1); cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; document.body.appendChild(cv);
      const g = cv.getContext('2d'); g.scale(dpr, dpr); const C = ['#6EA8FF', '#FF6B4A', '#2F7FD8', '#4F9E4A', '#B7A2FF', '#FFFFFF', '#C9D6E2'];
      const P = Array.from({ length: n }, () => { const a = -Math.PI / 2 + (Math.random() - .5) * 2.3, v = 5 + Math.random() * 9;
        return { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2, w: 5 + Math.random() * 6, h: 3 + Math.random() * 4, r: Math.random() * 6, vr: (Math.random() - .5) * .45, c: C[(Math.random() * C.length) | 0], round: Math.random() < .25, life: 0, max: 110 + Math.random() * 70 }; });
      const step = () => { g.clearRect(0, 0, innerWidth, innerHeight); let alive = 0;
        for (const p of P) { p.life++; if (p.life > p.max) continue; alive++; p.vy += .26; p.vx *= .985; p.vy *= .985; p.x += p.vx; p.y += p.vy; p.r += p.vr;
          g.globalAlpha = Math.min(1, (p.max - p.life) / 30); g.fillStyle = p.c; g.save(); g.translate(p.x, p.y); g.rotate(p.r);
          if (p.round) { g.beginPath(); g.arc(0, 0, p.w / 2.4, 0, 6.3); g.fill(); } else g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); g.restore(); }
        if (alive) requestAnimationFrame(step); else cv.remove(); };
      requestAnimationFrame(step); };
    // beside the visitors counter on laptops (left of it, or of the music pill / Night button when they're alone); under the Night button on phones
    const tb = $('#themeBtn'), np = $('#np'), vc = $('#vc'), GAP = 16;
    const place = () => { if (!tb) return; const c = getComputedStyle(tb), tbRight = parseFloat(c.right) || 0, tbTop = parseFloat(c.top) || 0, phone = innerWidth < 860;
      { let edge = tbRight + tb.offsetWidth; if (np && !np.hidden && np.offsetWidth) edge += GAP + np.offsetWidth; if (!phone && vc && vc.classList.contains('in') && !vc.classList.contains('away') && vc.offsetWidth) edge += GAP + vc.offsetWidth;   // the badge keeps a steady gap: left of the count while it shows, sliding right into its place once the count is gone
        badge.style.right = Math.round(edge + GAP) + 'px'; badge.style.top = Math.round(tbTop + (tb.offsetHeight - badge.offsetHeight) / 2) + 'px'; }
      if (!badge.classList.contains('ready')) badge.classList.add('ready'); };
    const away = () => { if (scrollY > 40 && badge.classList.contains('new')) badge.classList.remove('new'); };   // the "I got featured!" note belongs to the landing view only
    addEventListener('resize', () => { place(); away(); }); addEventListener('scroll', away, { passive: true }); addEventListener('themechange', () => setTimeout(place, 60)); away();
    if (document.fonts) document.fonts.ready.then(place);
    if (window.ResizeObserver) { const ro = new ResizeObserver(place); [vc, np, tb, badge].forEach(el => el && ro.observe(el)); }
    [vc, np].forEach(el => el && new MutationObserver(place).observe(el, { attributes: true, attributeFilter: ['hidden', 'class'] })); place(); setTimeout(place, 400);
    const mid = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
    // first visit: the badge gets a ring, a hint and one burst of confetti
    let seen = false; try { seen = !!localStorage.getItem('portfolio-wop-seen'); } catch (_) {}
    if (!seen) setTimeout(() => {
      const cs = $('#cs'); if (document.hidden || scrollY > 4 || (cs && cs.classList.contains('open')) || getComputedStyle(badge).visibility === 'hidden') return;
      badge.classList.add('new'); confetti(...mid(badge), 80); try { localStorage.setItem('portfolio-wop-seen', '1'); } catch (_) {}
      setTimeout(() => badge.classList.remove('new'), 14000); }, 3200);
    // the pop-up
    let m = null, last = null;
    const build = () => { m = document.createElement('div'); m.className = 'wop-modal'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-labelledby', 'wopT'); m.dataset.lenisPrevent = '';
      m.innerHTML = `<button type="button" class="wop-x" aria-label="Close">&times;</button>
        <div class="wop-card"><div class="wop-tilt"><img class="wop-pill" src="v2/wop/featured-pill.webp" alt="Silver badge: Featured on Wall of Portfolios. Welcome to the wall. Keep growing and inspiring." draggable="false"><i class="wop-glint" aria-hidden="true"></i></div></div>
        <p class="wop-cap" id="wopT">Featured on <b>Wall of Portfolios</b></p>
        <p class="wop-sub">Only 30% of the portfolios they receive make it to the Wall.</p>
        <a class="wop-link" href="#hello" target="_blank" rel="noopener">See my page on Wall of Portfolios ↗</a>`;
      document.body.appendChild(m);
      m.addEventListener('click', e => { if (e.target === m || e.target.closest('.wop-x')) close(); });
      m.addEventListener('pointermove', e => { if (e.pointerType === 'touch') return; const r = $('.wop-card', m).getBoundingClientRect(); const dx = (e.clientX - (r.left + r.width / 2)) / innerWidth, dy = (e.clientY - (r.top + r.height / 2)) / innerHeight;
        const t = $('.wop-tilt', m); t.style.setProperty('--ry', (dx * 36).toFixed(1) + 'deg'); t.style.setProperty('--rx', (-dy * 28).toFixed(1) + 'deg'); });
      m.addEventListener('pointerleave', () => { const t = $('.wop-tilt', m); t.style.setProperty('--ry', '0deg'); t.style.setProperty('--rx', '0deg'); });
      addEventListener('keydown', e => { if (e.key === 'Escape' && m.classList.contains('open')) close(); }); };
    const open = () => { if (!m) build(); last = document.activeElement; badge.classList.remove('new'); try { localStorage.setItem('portfolio-wop-seen', '1'); } catch (_) {}
      document.documentElement.style.overflow = 'hidden'; lenis && lenis.stop();
      m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); setTimeout(() => $('.wop-x', m).focus({ preventScroll: true }), 80);
      setTimeout(() => confetti(innerWidth / 2, innerHeight * .42, 110), 450); };
    const close = () => { if (!m) return; m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); document.documentElement.style.overflow = ''; lenis && lenis.start(); if (last && last.focus) last.focus({ preventScroll: true }); };
    badge.addEventListener('click', e => { e.stopPropagation(); open(); });
  })();
  const nwModal = $('#nwModal'), nwForm = $('#nwForm'), nwAv = $('#nwAv'), nwErr = $('#nwErr'), nwFine = $('#nwFine');
  document.body.appendChild(nwModal); // lifted out of the section so no stacking context can clip it
  let nwSeed = Math.random().toString(36).slice(2, 9), nwPhoto = '';
  const drawAv = () => { nwAv.innerHTML = nwPhoto ? `<img src="${nwPhoto}" alt="">` : avatarSVG(nwSeed); $('#nwClear').hidden = !nwPhoto; };
  function openNotes() { $('#nwDone').hidden = true; nwForm.classList.remove('done'); drawAv(); nwErr.textContent = ''; nwFine.textContent = noteCanWrite || noteApi ? 'Your email stays private. Your name, photo and note go up on the wall.' : 'Your email stays private. On this preview your note is saved on this device.'; nwModal.classList.add('open'); lenis && lenis.stop(); document.documentElement.style.overflow = 'hidden'; setTimeout(() => $('#nwName').focus(), 200); }
  function closeNotes() { nwModal.classList.remove('open'); lenis && lenis.start(); document.documentElement.style.overflow = ''; $('#nwOpen').focus({ preventScroll: true }); }
  $('#nwOpen').addEventListener('click', openNotes);
  $('#notes').addEventListener('click', e => { if (e.target.closest('[data-open]')) openNotes(); const c = e.target.closest('[data-read]'); if (c) readNote(c); });
  $('#notes').addEventListener('keydown', e => { const c = e.target.closest('[data-read]'); if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); readNote(c); } });
  // tap a note to read all of it: the same card, bigger and never cut off
  const nwRead = document.createElement('div'); nwRead.className = 'nw-read'; nwRead.setAttribute('role', 'dialog'); nwRead.setAttribute('aria-modal', 'true'); nwRead.setAttribute('aria-label', 'Note'); document.body.appendChild(nwRead);
  let readFrom = null;
  function readNote(c) { readFrom = c; nwRead.innerHTML = `<div class="nw-rd" style="${c.getAttribute('style').replace(/margin:0/, '')}">${c.innerHTML}<button type="button" class="nw-rd-x" aria-label="Close">&times;</button></div>`;
    nwRead.classList.add('open'); lenis && lenis.stop(); $('.nw-rd-x', nwRead).focus({ preventScroll: true }); }
  function closeRead() { if (!nwRead.classList.contains('open')) return; nwRead.classList.remove('open'); lenis && lenis.start(); readFrom && readFrom.focus({ preventScroll: true }); }
  nwRead.addEventListener('click', e => { if (e.target === nwRead || e.target.closest('.nw-rd-x')) closeRead(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeRead(); });

  // view all notes: every note at once, pinned in a grid, scrolling on as you go
  (() => {
    const btn = $('#nwView'); if (!btn) return;
    const m = document.createElement('div'); m.className = 'nw-all'; m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-labelledby', 'nwAllT'); m.setAttribute('aria-hidden', 'true'); m.dataset.lenisPrevent = '';
    m.innerHTML = '<div class="nw-all-h"><div><h3 id="nwAllT">The wall</h3><small id="nwAllN"></small></div><button type="button" class="nw-all-x" aria-label="Close">&times;</button></div><div class="nw-all-body"><div class="nw-all-grid"></div><div class="nw-all-more"></div></div>';
    document.body.appendChild(m);
    const body = $('.nw-all-body', m), grid = $('.nw-all-grid', m), more = $('.nw-all-more', m), CH = 24; let list = [], shown = 0, io = null;
    const fill = () => { const cols = Math.max(1, getComputedStyle(grid).gridTemplateColumns.split(' ').length), L = NOTE_COLORS.length;
      const part = list.slice(shown, shown + CH); grid.insertAdjacentHTML('beforeend', part.map((n, j) => { const i = shown + j; return noteCard({ ...n, _c: NOTE_COLORS[(i + Math.floor(i / cols)) % L] }, i); }).join('')); shown += part.length;
      $$('.nw-card[data-read] > p', grid).forEach(p => p.parentNode.classList.toggle('clip', p.scrollHeight > p.clientHeight + 2)); };
    let last = null;
    const open = () => { list = (window.__wallAll ? window.__wallAll() : []); grid.innerHTML = ''; shown = 0; $('#nwAllN').textContent = list.length + (list.length === 1 ? ' note' : ' notes') + ' pinned'; fill(); body.scrollTop = 0;
      last = document.activeElement; m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); lenis && lenis.stop(); document.documentElement.style.overflow = 'hidden'; setTimeout(() => $('.nw-all-x', m).focus({ preventScroll: true }), 80);
      if (window.IntersectionObserver) { io = new IntersectionObserver(es => { if (es[0].isIntersecting && shown < list.length) fill(); }, { root: body, rootMargin: '400px' }); io.observe(more); } };
    const close = () => { if (!m.classList.contains('open')) return; m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); io && io.disconnect(); lenis && lenis.start(); document.documentElement.style.overflow = ''; last && last.focus && last.focus({ preventScroll: true }); };
    btn.addEventListener('click', open);
    m.addEventListener('click', e => { if (e.target.closest('.nw-all-x')) { close(); return; } const c = e.target.closest('[data-read]'); if (c) { readNote(c); return; } if (!e.target.closest('.nw-card, .nw-all-h')) close(); });
    m.addEventListener('keydown', e => { const c = e.target.closest('[data-read]'); if (c && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); readNote(c); } });
    addEventListener('keydown', e => { if (e.key === 'Escape' && !nwRead.classList.contains('open')) close(); }, true);
  })();
  $('#nwClose').addEventListener('click', closeNotes);
  $('#nwHome').addEventListener('click', () => { closeNotes(); if (lenis) lenis.scrollTo(0, { duration: reduce ? 0 : 1.6 }); else scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
  nwModal.addEventListener('click', e => { if (e.target === nwModal) closeNotes(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && nwModal.classList.contains('open')) closeNotes(); });
  $('#nwShuffle').addEventListener('click', () => { nwPhoto = ''; nwSeed = Math.random().toString(36).slice(2, 9); drawAv(); });
  $('#nwClear').addEventListener('click', () => { nwPhoto = ''; $('#nwPhoto').value = ''; drawAv(); });
  $('#nwNote').addEventListener('input', e => { $('#nwCount').textContent = `${e.target.value.length} / 200`; });
  // where do you work: suggestions with logos, exact matches pick up the brand automatically
  const nwCo = $('#nwCo'), nwSug = $('#nwSug'), nwLg = $('#nwLg');
  let coList = null, coLoading = null, coBrand = null, sugAt = -1, sugItems = [];
  const loadCo = () => coLoading || (coLoading = fetch(`${SI}/_data/simple-icons.json`).then(r => r.json()).then(d => { coList = (d.icons || d).map(x => ({ t: x.title, s: x.slug || coSlug(x.title), h: x.hex, a: [].concat((x.aliases && x.aliases.aka) || []) })); }).catch(() => { coList = []; }));
  function setBrand(b) { coBrand = b; nwLg.innerHTML = b ? logoHTML(b.t, b, 'co').replace(/^<i class="co"/, '<i class="co"') : ''; nwLg.classList.toggle('on', !!b); nwCo.parentElement.classList.toggle('has', !!b); }
  function closeSug() { nwSug.hidden = true; nwCo.setAttribute('aria-expanded', 'false'); sugAt = -1; }
  function showSug() {
    const q = nwCo.value.trim().toLowerCase(); if (!coList || q.length < 1) { closeSug(); return; }
    const starts = [], has = [];
    for (const x of coList) { const t = x.t.toLowerCase(); if (t.startsWith(q) || x.a.some(a => a.toLowerCase().startsWith(q))) starts.push(x); else if (q.length > 2 && t.includes(q)) has.push(x); if (starts.length > 6) break; }
    sugItems = [...starts, ...has].slice(0, 6); sugAt = -1;
    if (!sugItems.length) { closeSug(); return; }
    nwSug.innerHTML = sugItems.map((x, i) => `<li role="option" id="nwSug${i}" data-i="${i}">${logoHTML(x.t, x)}<span>${esc(x.t)}</span></li>`).join('');
    nwSug.hidden = false; nwCo.setAttribute('aria-expanded', 'true');
  }
  function pickSug(i) { const x = sugItems[i]; if (!x) return; nwCo.value = x.t; setBrand(x); closeSug(); $('#nwRole').focus(); }
  nwCo.addEventListener('focus', () => { loadCo().then(() => { if (document.activeElement === nwCo) showSug(); }); });
  nwCo.addEventListener('input', () => { const v = nwCo.value.trim().toLowerCase(); const exact = coList && coList.find(x => x.t.toLowerCase() === v); setBrand(exact || null); if (coList) showSug(); else loadCo().then(showSug); });
  nwCo.addEventListener('keydown', e => { if (nwSug.hidden) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sugAt = (sugAt + (e.key === 'ArrowDown' ? 1 : -1) + sugItems.length) % sugItems.length; $$('li', nwSug).forEach((li, i) => li.classList.toggle('on', i === sugAt)); nwCo.setAttribute('aria-activedescendant', 'nwSug' + sugAt); }
    else if (e.key === 'Enter' && sugAt >= 0) { e.preventDefault(); pickSug(sugAt); }
    else if (e.key === 'Escape') { e.stopPropagation(); closeSug(); } });
  nwSug.addEventListener('mousedown', e => { const li = e.target.closest('li'); if (li) { e.preventDefault(); pickSug(+li.dataset.i); } });
  nwCo.addEventListener('blur', () => setTimeout(closeSug, 120));
  $('#nwPhoto').addEventListener('change', e => {
    const f = e.target.files && e.target.files[0]; if (!f || !/^image\//.test(f.type)) return;
    const url = URL.createObjectURL(f), im = new Image();
    im.onload = () => { const S = 160, cv = document.createElement('canvas'); cv.width = cv.height = S; const g = cv.getContext('2d'), m = Math.min(im.width, im.height);
      g.drawImage(im, (im.width - m) / 2, (im.height - m) / 2, m, m, 0, 0, S, S); nwPhoto = cv.toDataURL('image/jpeg', .82); URL.revokeObjectURL(url); drawAv(); };
    im.onerror = () => { URL.revokeObjectURL(url); nwErr.textContent = 'That image didn’t load. Try another one.'; };
    im.src = url;
  });
  nwForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = $('#nwName').value.trim(), email = $('#nwEmail').value.trim(), note = $('#nwNote').value.trim();
    if (!name) { nwErr.textContent = 'Add your name.'; $('#nwName').focus(); return; }
    if (!emailOk(email)) { nwErr.textContent = 'That doesn’t look like a real email. Use your own address.'; $('#nwEmail').focus(); return; }
    if (!note) { nwErr.textContent = 'Write a little something.'; $('#nwNote').focus(); return; }
    if (fakeName(name)) { nwErr.textContent = 'Use your real name.'; $('#nwName').focus(); return; }
    if (fakeName($('#nwCo').value) || fakeName($('#nwRole').value)) { nwErr.textContent = 'Add your real company and role, or leave them empty.'; $('#nwCo').focus(); return; }
    if (nonsense(note)) { nwErr.textContent = 'That doesn’t read like a real note. Say something specific about the work.'; $('#nwNote').focus(); return; }
    if (noteShort(note)) { nwErr.textContent = 'Write a little more, at least a couple of words.'; $('#nwNote').focus(); return; }
    if (junkText(note) || junkText(name) || junkText($('#nwCo').value) || junkText($('#nwRole').value)) { nwErr.textContent = 'That doesn’t look like real words. Try again?'; $('#nwNote').focus(); return; }
    const go = $('#nwGo'); go.disabled = true; nwErr.textContent = '';
    const company = $('#nwCo').value.trim().slice(0, 40), role = $('#nwRole').value.trim().slice(0, 40);
    // no logo picked? still try to recognise the company by name, alias or its Simple Icons slug
    if (company && !coBrand) { await loadCo(); const q = company.toLowerCase(), qs = coSlug(company);
      coBrand = (coList || []).find(x => x.t.toLowerCase() === q || x.s === qs || x.a.some(a => a.toLowerCase() === q)) || null;
      if (!coBrand) { const hit = (coList || []).filter(x => x.t.toLowerCase().startsWith(q)); if (q.length > 2 && hit.length === 1) coBrand = hit[0]; } }
    const brand = okBrand(coBrand);
    const body = { name: name.slice(0, 40), note: note.slice(0, 200), photo: nwPhoto, avatar: nwSeed, at: Date.now(), ...(company && { company }), ...(role && { role }), ...(company && brand && { brand }) };
    let saved = false;
    if (noteDb && noteCanWrite) {
      try { await noteDb.doc('notes/' + noteUid).set(body); try { await noteDb.doc('contacts/' + noteUid).set({ name: body.name, email, at: body.at }); } catch (_) {} freshId = noteUid; saved = true; }
      catch (err) { if (err && err.code === 'quota_exceeded') { nwErr.textContent = 'The wall is full right now. Try again later.'; go.disabled = false; return; } noteCanWrite = false; }
    }
    if (!saved && noteApi) {
      try {
        const r = await fetch('/api/notes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, email }) });
        if (r.status === 429) { nwErr.textContent = 'You’ve pinned a few already. Try again in an hour.'; go.disabled = false; return; }
        if (r.status === 400) { const eb = await r.json().catch(() => ({})); nwErr.textContent = eb.error === 'email' ? 'That doesn’t look like a real email. Use your own address.' : 'That doesn’t look like a real note. Try again?'; go.disabled = false; return; }
        if (r.ok) { const d = await r.json(); if (d && d.note) { wallNotes = [d.note, ...wallNotes.filter(n => n.id !== d.note.id)]; freshId = d.note.id; saved = true; } }
      } catch (_) {}
      // the live wall is there but this note didn't make it: say so, rather than pinning it only in this browser
      if (!saved) { nwErr.textContent = 'Couldn’t pin it right now. Try again in a minute.'; go.disabled = false; return; }
    }
    if (!saved) { const id = 'local-' + body.at; localNotes = [{ id, ...body }, ...localNotes].slice(0, 5); freshId = id; try { localStorage.setItem('portfolio-notes', JSON.stringify(localNotes)); } catch (_) {} }
    renderWall(); go.disabled = false; nwForm.reset(); setBrand(null); nwPhoto = ''; $('#nwCount').textContent = '0 / 200';
    window.__sfx && window.__sfx('pin'); $('#nwDoneT').textContent = 'Pinned, ' + name.split(/\s+/)[0] + '.'; nwForm.classList.add('done'); $('#nwDone').hidden = false; setTimeout(() => $('.nw-follow', nwForm).focus({ preventScroll: true }), 120);
  });





  /* ---------- sound effects (small clips from ElevenLabs, loaded after the first tap) ---------- */
  (() => {
    const NAMES = { click: 1, hover: .35, close: .6, pin: .6, bell: .55, toggle: .65 }, WAV = { click: 1, hover: 1, close: 1, toggle: 1 };
    let ctx = null, master = null, bufs = {}, loading = false, last = {}, muted = false;
    try { muted = localStorage.getItem('portfolio-sfx') === '0'; } catch (_) {}
    const btn = $('#sfxBtn');
    const paint = () => { if (!btn) return; btn.setAttribute('aria-pressed', String(!muted)); btn.setAttribute('aria-label', muted ? 'Sound effects off' : 'Sound effects on'); };
    const load = () => { if (loading) return; loading = true;
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); master = ctx.createGain(); master.gain.value = 1; master.connect(ctx.destination); } catch (_) { return; }
      Object.keys(NAMES).forEach(n => fetch(`v2/sfx/${n}.${WAV[n] ? 'wav' : 'mp3'}`).then(r => r.arrayBuffer()).then(b => new Promise((ok, no) => ctx.decodeAudioData(b, ok, no))).then(buf => { bufs[n] = buf; }).catch(() => {})); };
    const play = (n, opts = {}) => { if (muted || document.hidden || !ctx || !bufs[n]) return; const now = performance.now(), gap = n === 'hover' ? 130 : 45; if (last[n] && now - last[n] < gap) return; last[n] = now;
      if (ctx.state === 'suspended') ctx.resume();
      const src = ctx.createBufferSource(), g = ctx.createGain(); src.buffer = bufs[n]; src.playbackRate.value = n === 'click' || n === 'hover' ? .97 + Math.random() * .06 : 1; g.gain.value = (NAMES[n] || .5) * (opts.v || 1);
      src.connect(g); g.connect(master); src.start(); };
    window.__sfx = play;
    const unlock = () => { load(); if (ctx && ctx.state === 'suspended') ctx.resume(); };
    addEventListener('pointerdown', unlock, { capture: true, once: false, passive: true }); addEventListener('keydown', unlock, { capture: true, passive: true });
    if (btn) btn.addEventListener('click', e => { e.stopPropagation(); muted = !muted; try { localStorage.setItem('portfolio-sfx', muted ? '0' : '1'); } catch (_) {} paint(); if (!muted) { unlock(); setTimeout(() => play('click'), 60); } });
    paint();
    const CLOSE = '.cs-close, .nw-x, .nw-rd-x, .wop-x, .nw-all-x, #s-x, .sheet .x, .bk-x';
    const TAP = 'a, button, summary, [role="button"], label[for]';
    document.addEventListener('click', e => { const t = e.target; if (!t.closest || t.closest('#sfxBtn, [data-nosound]')) return;
      if (t.closest(CLOSE)) play('close'); else if (t.closest('.theme-btn')) play('toggle'); else if (t.closest(TAP)) play('click'); }, true);
    // hovering the portfolio: map pins and the cards in the box
    let lastEl = null;
    document.addEventListener('pointerover', e => { if (e.pointerType !== 'mouse') return; const el = e.target.closest && e.target.closest('.pin:not(.ph-pin), .wk'); if (el && el !== lastEl) play('hover'); lastEl = el || null; }, true);
  })();

  /* ---------- custom cursor (mouse only) ---------- */
  (() => {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const root = document.documentElement, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ball = document.createElement('div'); ball.className = 'cc-ball off'; ball.setAttribute('aria-hidden', 'true'); ball.appendChild(document.createElement('i')); const word = document.createElement('b'); ball.appendChild(word); document.body.appendChild(ball);
    const CLICK = 'a, button, summary, select, label, [role="button"], [data-read], [data-open], [data-case], .pin, .hot, .wk';
    const TEXT = 'input, textarea, select, [contenteditable="true"], iframe';
    // a short word on the few big targets where it isn't obvious what a click does (checked once per element, never while moving)
    const WORDS = [['.cs-close, .nw-x, .nw-rd-x, .wop-x, .nw-all-x, #s-x, .sheet .x, .bk-x', 'Close'], ['#jcNext', 'Next'], ['#jcPrev', 'Prev'], ['.nw-card[data-read]', 'Read'], ['.nw-ghost, #nwOpen', 'Write'], ['.pin, .ph-pin', 'Open'], ['[data-case], .wk, .portfolio-more, #nwView', 'View'], ['.sticky', 'Drag'], ['.theme-btn', 'Theme'], ['a[data-book]', 'Book']];
    let x = 0, y = 0, rx = 0, ry = 0, on = false, raf = 0;
    const loop = () => { rx += (x - rx) * (still ? 1 : .28); ry += (y - ry) * (still ? 1 : .28);
      ball.style.transform = `translate3d(${rx}px, ${ry}px, 0)`; raf = Math.abs(x - rx) + Math.abs(y - ry) > .2 ? requestAnimationFrame(loop) : 0; };
    const show = v => ball.classList.toggle('off', !v);
    addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; x = e.clientX; y = e.clientY;
      if (!on) { on = true; rx = x; ry = y; root.classList.add('cc'); show(true); } if (!raf) raf = requestAnimationFrame(loop); }, { passive: true });
    document.addEventListener('pointerover', e => { if (!on || e.pointerType !== 'mouse') return; const t = e.target;
      if (t.closest && t.closest(TEXT)) { show(false); return; } show(true); let hit = t.closest && WORDS.find(([q]) => t.closest(q)); let txt = hit ? hit[1] : '';
      if (!hit && t.closest) { const b = t.closest('button, a'); if (b) { const lab = (b.getAttribute('aria-label') || b.textContent || '').trim(); if (/^(next|continue)/i.test(lab)) txt = 'Next'; else if (/^(prev|back|previous)/i.test(lab)) txt = 'Prev'; } if (txt) hit = true; }
      word.textContent = txt; ball.classList.toggle('lbl', !!hit); ball.classList.toggle('link', !hit && !!(t.closest && t.closest(CLICK))); }, true);
    document.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse') ball.classList.add('down'); }, true);
    addEventListener('pointerup', () => ball.classList.remove('down'), true);
    root.addEventListener('mouseleave', () => show(false)); root.addEventListener('mouseenter', () => on && show(true));
  })();

  /* ---------- browsers without text-wrap: pretty: glue the last two words of each line of copy ---------- */
  if (!(window.CSS && CSS.supports && CSS.supports('text-wrap', 'pretty'))) {
    const glue = root => root.querySelectorAll('p, li, figcaption, blockquote, small, h1, h2, h3, h4, h5').forEach(el => {
      const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let last = null; for (let n; (n = w.nextNode());) if (n.textContent.trim()) last = n;
      if (last && /\S \S+\s*$/.test(last.textContent)) last.textContent = last.textContent.replace(/ (\S+\s*)$/, '\u00A0$1'); });
    glue(document); new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => n.nodeType === 1 && glue(n)))).observe(document.body, { childList: true, subtree: true });
  }

  /* ---------- visitors: counted once per browser ---------- */
  (() => {
    const el = document.getElementById('vc'); if (!el || !location.protocol.startsWith('http') || (window.claude && window.claude.use)) return;
    const MIN = 1; let counted = false; try { counted = !!localStorage.getItem('portfolio-counted'); } catch (_) {}
    let show = n => { if (!(n >= MIN)) return; const b = el.querySelector('b'), t0 = performance.now(), D = reduce ? 0 : 1200;
      el.classList.add('in'); const tick = now => { const k = D ? Math.min(1, (now - t0) / D) : 1, e = 1 - Math.pow(1 - k, 3); const v = Math.round(n * e); b.textContent = innerWidth < 860 && v >= 1000 ? (Math.floor(v / 100) / 10).toFixed(1).replace(/\.0$/, '') + 'k' : v.toLocaleString('en-IN'); if (k < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); };
    // sits just left of the theme button (and of the music pill while it's showing), centred on the same row
    const tb = document.getElementById('themeBtn'), np = document.getElementById('np');
    const GAP = 16;
    const place = () => { if (innerWidth < 860) { el.style.height = el.style.right = el.style.top = ''; el.classList.remove('tight'); return; }   // phones: a pill just above the nav (CSS)
      const c = getComputedStyle(tb); let edge = parseFloat(c.right) + tb.offsetWidth;  // resting layout, not mid-animation
      if (np && !np.hidden && np.offsetWidth) { np.style.right = Math.round(edge + GAP) + 'px'; edge += GAP + np.offsetWidth; }
      el.style.height = tb.offsetHeight + 'px'; el.style.right = Math.round(edge + GAP) + 'px'; el.style.top = c.top;
      // if it would run into the avatar on the left, show just the number
      const logo = document.querySelector('.bar .logo'), lr = logo && logo.offsetWidth ? logo.getBoundingClientRect().right + 8 : 0;
      el.classList.remove('tight'); if (lr && el.getBoundingClientRect().left < lr) el.classList.add('tight'); };
    addEventListener('resize', place); addEventListener('themechange', () => setTimeout(place, 50));
    // the count is for the landing view only: gone on phones at the first scroll, on laptops once the hero is behind you
    const hero = document.getElementById('top');
    const away = () => { const want = innerWidth < 860 ? scrollY > 24 : !!hero && hero.getBoundingClientRect().bottom < innerHeight * .85; if (want !== el.classList.contains('away')) el.classList.toggle('away', want); };
    addEventListener('scroll', away, { passive: true }); addEventListener('resize', away); away();
    if (np) new MutationObserver(place).observe(np, { attributes: true, attributeFilter: ['hidden', 'class'] });
    if (document.fonts) document.fonts.ready.then(place);
    const show0 = show; show = n => { place(); show0(n); };
    setTimeout(async () => { try {
      const r = new Response(JSON.stringify({ count: 6420 }), { headers: { 'Content-Type': 'application/json' } }); if (!r.ok) return; const d = await r.json();
      if (!counted) try { localStorage.setItem('portfolio-counted', '1'); } catch (_) {}
      show(d && d.count); } catch (_) {} }, 1800);
  })();

  /* ---------- birds around the heading: a loose flock that wanders, flaps and glides ---------- */
  (() => {
    const box = $('#skyBirds'), copy = $('#heroCopy'); if (!box || reduce) return;
    const B = Array.from({ length: mobile ? 1 : 2 }, (_, i) => {
      const el = document.createElement('div'); el.className = 'sb'; const sz = (mobile ? 18 : 22) + Math.random() * 14; el.style.width = sz + 'px'; el.style.setProperty('--fl', (.32 + Math.random() * .26).toFixed(2) + 's');
      el.innerHTML = '<svg viewBox="0 0 24 12"><path class="w" d="M1 7Q6 1 12 7Q18 1 23 7"/></svg>'; box.appendChild(el);
      return { el, x: Math.random() * vw * .6, y: vh * (.05 + Math.random() * .3), a: Math.random() * Math.PI * 2, v: 34 + Math.random() * 26, t: Math.random() * 10, g: 0 };
    });
    let last = performance.now();
    (function fly(now) {
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      if (Y() < vh && !box.parentElement.classList.contains('still')) {
        const r = copy.getBoundingClientRect(), L = Math.max(0, r.left - 60), R = Math.min(vw, r.right + vw * .12), T = Math.max(20, r.top - vh * .14), Bo = Math.min(vh * .62, r.bottom + vh * .06);
        const cx = B.reduce((s, b) => s + b.x, 0) / B.length, cy = B.reduce((s, b) => s + b.y, 0) / B.length;
        B.forEach(b => {
          b.t += dt; let tx = Math.cos(b.a), ty = Math.sin(b.a);
          b.a += (Math.sin(b.t * .7 + b.v) * .9 + Math.sin(b.t * 1.9) * .4) * dt;
          const want = (dx, dy) => { const da = Math.atan2(dy, dx) - b.a; b.a += Math.atan2(Math.sin(da), Math.cos(da)) * dt * 1.4; };
          if (b.x < L || b.x > R || b.y < T || b.y > Bo) want((L + R) / 2 - b.x, (T + Bo) / 2 - b.y);
          else if (Math.hypot(cx - b.x, cy - b.y) > 90) want(cx - b.x, cy - b.y);
          if (b.g > 0) b.g -= dt; else if (Math.random() < dt * .4) b.g = 1.6 + Math.random() * 2;
          const sp = b.v * (b.g > 0 ? .85 : 1); b.x += Math.cos(b.a) * sp * dt; b.y += Math.sin(b.a) * sp * dt * .55;
          b.el.classList.toggle('glide', b.g > 0);
          const flip = Math.cos(b.a) < 0 ? -1 : 1, tilt = Math.sin(b.a) * 14 * flip;
          b.el.style.transform = `translate3d(${b.x.toFixed(1)}px, ${b.y.toFixed(1)}px, 0) scaleX(${flip}) rotate(${tilt.toFixed(1)}deg)`;
        });
      }
      requestAnimationFrame(fly);
    })(last);
  })();

  /* ---------- music on the hill: soft generative lo-fi, made live in the browser ---------- */
  (() => {
    const radio = $('#radio'), pinR = $('#radioPin'), np = $('#np'), lbl = $('.rpl', pinR);
    document.body.appendChild(np); // out of the top bar's layer, so it can sit above an open case study
    if (!radio || !pinR) return;
    let played = false, ac = null, out = null, bus = null, drums = null, on = false, timer = 0, nextBeat = 0, beat = 0, stopT = 0, crackle = null, noise = null;
    const BPM = 78, SPB = 60 / BPM, SW = .6;
    const CH = [[50, 53, 57, 60, 64], [43, 53, 57, 59, 64], [48, 52, 55, 59, 62], [45, 52, 55, 60, 64]], ROOT = [38, 31, 36, 33];
    const PENT = [69, 72, 74, 76, 79, 81, 84];
    const hz = m => 440 * Math.pow(2, (m - 69) / 12);
    function build() {
      const AC = window.AudioContext || window.webkitAudioContext; try { ac = new AC({ latencyHint: 'playback' }); } catch (_) { ac = new AC(); }
      out = ac.createGain(); out.gain.value = 0;
      const tape = ac.createBiquadFilter(); tape.type = 'lowpass'; tape.frequency.value = 3400; tape.Q.value = .3;
      const verb = ac.createConvolver(), len = ac.sampleRate * 1.6, ir = ac.createBuffer(2, len, ac.sampleRate);
      for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
      verb.buffer = ir; const wet = ac.createGain(); wet.gain.value = .28;
      bus = ac.createGain(); bus.connect(tape); bus.connect(verb); verb.connect(wet); wet.connect(tape);
      drums = ac.createGain(); drums.gain.value = .9; drums.connect(tape);
      tape.connect(out); out.connect(ac.destination);
      noise = ac.createBuffer(1, ac.sampleRate, ac.sampleRate); const nd = noise.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    }
    // a soft electric piano: sine with a touch of FM and a slow warble
    function keys(m, t, dur, vol) {
      const o = ac.createOscillator(), mo = ac.createOscillator(), mg = ac.createGain(), g = ac.createGain(), trem = ac.createOscillator(), tg = ac.createGain();
      o.frequency.value = hz(m); mo.frequency.value = hz(m) * 2; mg.gain.value = hz(m) * .35; mo.connect(mg); mg.connect(o.frequency);
      trem.frequency.value = 4.2; tg.gain.value = vol * .18; trem.connect(tg); tg.connect(g.gain);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .012); g.gain.exponentialRampToValueAtTime(vol * .45, t + .9); g.gain.linearRampToValueAtTime(0, t + dur);
      o.connect(g); g.connect(bus); [o, mo, trem].forEach(x => { x.start(t); x.stop(t + dur + .05); });
    }
    function bass(m, t, dur) { const o = ac.createOscillator(), g = ac.createGain(), f = ac.createBiquadFilter(); o.type = 'triangle'; o.frequency.value = hz(m); f.type = 'lowpass'; f.frequency.value = 420;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.2, t + .02); g.gain.exponentialRampToValueAtTime(.08, t + dur * .8); g.gain.linearRampToValueAtTime(0, t + dur); o.connect(f); f.connect(g); g.connect(bus); o.start(t); o.stop(t + dur + .05); }
    function bell(m, t) { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = hz(m); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.04, t + .01); g.gain.exponentialRampToValueAtTime(.0008, t + 2.4); o.connect(g); g.connect(bus); o.start(t); o.stop(t + 2.5); }
    function kick(t) { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(42, t + .14); g.gain.setValueAtTime(.55, t); g.gain.exponentialRampToValueAtTime(.001, t + .38); o.connect(g); g.connect(drums); o.start(t); o.stop(t + .4); }
    function hit(t, { f = 1800, type = 'bandpass', q = .8, vol = .2, dec = .18 } = {}) { const n = ac.createBufferSource(), fl = ac.createBiquadFilter(), g = ac.createGain(); n.buffer = noise; fl.type = type; fl.frequency.value = f; fl.Q.value = q;
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + dec); n.connect(fl); fl.connect(g); g.connect(drums); n.start(t, Math.random() * .5); n.stop(t + dec + .02); }
    function snare(t) { hit(t, { f: 1700, q: .7, vol: .22, dec: .22 }); const o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = 185; g.gain.setValueAtTime(.08, t); g.gain.exponentialRampToValueAtTime(.001, t + .1); o.connect(g); g.connect(drums); o.start(t); o.stop(t + .12); }
    function schedule() {
      if (nextBeat < ac.currentTime + .05) nextBeat = ac.currentTime + .08;
      while (nextBeat < ac.currentTime + 2.5) {
        const t = nextBeat, bi = beat % 4, bar = Math.floor(beat / 4), c = bar % 4, ch = CH[c];
        if (bi === 0) { ch.forEach((m, i) => keys(m, t + i * .012, SPB * 3.6, .05)); bass(ROOT[c], t, SPB * 1.4); }
        if (bi === 2) { if (Math.random() < .7) ch.slice(1).forEach((m, i) => keys(m, t + SPB * SW + i * .01, SPB * 1.2, .032)); bass(ROOT[c] + 7, t + SPB * SW, SPB * .9); }
        if (bi === 0 || (bi === 2 && Math.random() < .5)) kick(t); if (bi === 1 && Math.random() < .35) kick(t + SPB * SW);
        if (bi === 1 || bi === 3) snare(t + .012);
        hit(t, { f: 7800, type: 'highpass', q: .4, vol: .07, dec: .05 }); hit(t + SPB * SW, { f: 7800, type: 'highpass', q: .4, vol: Math.random() < .5 ? .035 : .055, dec: .04 });
        if (Math.random() < .3) bell(PENT[Math.floor(Math.random() * PENT.length)], t + (Math.random() < .5 ? 0 : SPB * SW));
        nextBeat += SPB; beat++;
      }
    }
    function start() {
      if (!ac) build(); if (ac.state === 'suspended') ac.resume();
      clearTimeout(stopT); on = true; played = true; nextBeat = Math.max(nextBeat, ac.currentTime + .1);
      const now = ac.currentTime; out.gain.cancelScheduledValues(now); out.gain.setValueAtTime(out.gain.value, now); out.gain.linearRampToValueAtTime(.6, now + 2);
      schedule(); clearInterval(timer); timer = setInterval(schedule, 300);
      ui();
    }
    function stop() {
      on = false; const now = ac.currentTime; out.gain.cancelScheduledValues(now); out.gain.setValueAtTime(out.gain.value, now); out.gain.linearRampToValueAtTime(0, now + 1.4);
      stopT = setTimeout(() => { clearInterval(timer); ac.suspend(); nextBeat = 0; }, 1500);
      ui();
    }
    function ui() {
      radio.classList.toggle('on', on); pinR.classList.toggle('on', on); pinR.setAttribute('aria-pressed', on); lbl.textContent = on ? 'Now playing' : 'Play some music';
      np.hidden = false; np.classList.toggle('paused', !on); const tx = on ? 'Pause' : played ? 'Play' : 'Play music'; np.setAttribute('aria-label', on ? 'Pause music' : 'Play music'); np.title = tx; $('.np-t', np).textContent = tx;
    }
    const toggle = e => { e && e.stopPropagation(); on ? stop() : start(); };
    ui(); np.classList.add('paused');   // always there, top right, in a fixed spot (CSS)
    // its width follows its label; the case-study bar reads it so the gap beside it stays exact
    const npw = () => document.documentElement.style.setProperty('--npw', np.offsetWidth + 'px');
    if (window.ResizeObserver) new ResizeObserver(npw).observe(np); npw();
    pinR.addEventListener('click', toggle); np.addEventListener('click', toggle); radio.addEventListener('click', toggle);
  })();

  /* ---------- keycaps: they work on your keyboard too ---------- */
  const keysMat = $('#keysMat');
  addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey || /input|textarea/i.test(document.activeElement.tagName)) return;
    const r = keysMat.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
    const k = $(`.key[data-k="${e.key.toLowerCase()}"]`, keysMat); if (!k) return;
    k.classList.add('down'); setTimeout(() => { k.classList.remove('down'); k.target ? window.open(k.href, '_blank', 'noopener') : (location.href = k.href); }, 170);
  });

  /* ---------- nav ---------- */
  $$('[data-go]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); unfocus(); const id = a.dataset.go; goTo(id === 'top' ? 0 : id === 'work' ? top($('#boxTrack')) : top($('#' + id)) + (id === 'journey' ? 4 : 0)); }));

  /* ---------- loop ---------- */
  function layout() {
    vw = innerWidth; vh = innerHeight; mobile = vw < 860;
    navTops = []; navOn = undefined;
    layoutValley(); layoutStory(); layoutJourney(); layoutBrand(); layoutStack(); layoutLL(); layoutProc(); boxScale();
  }
  let last = performance.now();
  // fold a finished scene down to one screen, keeping what's on screen exactly where it is
  function fold(k, el, ref, extra) {
    if (DONE[k] || el.getBoundingClientRect().bottom > vh + 2) return;
    const y = Y(), before = top(ref);
    el.style.height = '100vh'; el.style.height = '100svh'; if (extra) extra();
    DONE[k] = 1; const delta = before - top(ref);
    if (lenis) lenis.scrollTo(y - delta, { immediate: true, force: true }); else scrollTo(0, y - delta);
    layout();
  }
  function frame(t) {
    const dt = Math.min(.05, (t - last) / 1000); last = t;
    if (lenis) lenis.raf(t);
    let y = Y();
    fold('v', valley, $('#journey'), () => { story.style.marginTop = '0px'; });
    fold('s', story, $('#journey'));
    if (!jCar) fold('j', jTrack, $('#work'));
    if (boxOpen) fold('box', boxTrack, $('#brand'));
    if (!giftTap) fold('st', stackTrack, $('#process'));
    fold('ll', llRevTrack, llRoles);
    y = Y();
    if (y < vTop + vRange + vh) frameValley(dt, DONE.v ? 0 : y);
    if (y > sTop - vh && y < sTop + sRange + vh) frameStory(DONE.s ? 1e9 : held('s', y, sTop - vh));
    if (y > jTop - vh && y < jTop + jRange + vh) frameJourney(dt, y);
    if (y > jTop + jRange - vh) frameWork(dt);
    if (y > bTop - vh && y < bTop + bRange + vh) frameBrand(dt, held('b', y, bTop - vh));
    if (y > stTop - vh && y < stTop + Math.max(stRange, vh) + vh) frameStack(DONE.st ? 1e9 : held('st', y, stTop - vh));
    if (y > llTop - vh && y < llTop + llRange + vh) frameLL(DONE.ll ? 1e9 : held('ll', y, llTop - vh));
    if (y > pTop - vh * 1.2) frameProc(held('p', y, pTop - vh * 1.2));
    frameMisc(y);
    requestAnimationFrame(frame);
  }
  let lt = 0;
  const ro = new ResizeObserver(() => { cancelAnimationFrame(lt); lt = requestAnimationFrame(layout); });
  ro.observe(document.body);
  addEventListener('load', layout);
  document.fonts && document.fonts.ready.then(layout);
  layout(); requestAnimationFrame(frame);
})();

;

/* dark mode: remembered per viewer, revealed as a soft circle of night spreading from the switch */
(() => {
  const root = document.documentElement, btn = document.getElementById('themeBtn');
  const label = () => btn.setAttribute('aria-label', root.dataset.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  const set = t => { root.dataset.theme = t; label(); try { localStorage.setItem('portfolio-theme', t); } catch (_) {} dispatchEvent(new Event('themechange')); };
  label();
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    const r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2, R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    if (reduce) { set(next); return; }
    if (!document.startViewTransition) { root.classList.add('theme-fade'); set(next); setTimeout(() => root.classList.remove('theme-fade'), 1000); return; }
    const vt = document.startViewTransition(() => set(next));
    vt.ready.then(() => root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${R}px at ${x}px ${y}px)`] }, { duration: 1500, easing: 'cubic-bezier(.65, 0, .35, 1)', pseudoElement: '::view-transition-new(root)' }));
  });
})();
// ---------- 404: room 404 doesn't exist ----------
const LOST_DOORS = [['401', 'Unauthorized', '🧹', 'Staff only. Even I don’t have the key.'],
  ['402', 'Payment required', '🍫', 'The minibar. ₹400 for a chocolate? I’ll pass.'],
  ['403', 'Forbidden', '🙈', 'My first-ever wireframes. Nobody sees these.'],
  ['405', 'Method not allowed', '🧱', 'You tried to push. It’s a pull door. Painted on a wall.']];
function lostHTML(home) {
  const door = ([n, c, e, t], i) => `<button type="button" class="lo-door" data-i="${i}" aria-label="Room ${n}, knock"><span class="lo-in"><span class="e">${e}</span><b>${n} · ${c}</b><small>${t}</small></span><span class="lo-leaf"><span class="pl">${n}</span><i class="kn"></i>${i === 2 ? '<em class="dnd">Do not<br>disturb</em>' : ''}</span></button>`;
  const lamp = '<span class="lo-lamp" aria-hidden="true"><i></i></span>';
  return `<div class="lo-top"><span class="lo-brand">Alex Morgan</span><button type="button" class="lo-lights" id="loLights" aria-pressed="false"><span>💡</span><b>Lights off</b></button></div>
  <header class="lo-hd"><p class="lo-k">Error 404 · Hotel Valley, 4th floor</p>
    <h1>Room <span class="lo-n"><i>4</i><i>0</i><i>4</i></span> doesn’t exist.</h1>
    <p class="lo-sub">You took a wrong turn somewhere in the valley. Knock on a few doors, or ring the bell at the desk for help.</p>
    <a class="lo-home" href="/">← Back to home</a></header>
  <div class="lo-hall" id="loHall">
    <div class="lo-row">${lamp}${door(LOST_DOORS[0], 0)}${lamp}${door(LOST_DOORS[1], 1)}${lamp}${door(LOST_DOORS[2], 2)}${lamp}
      <div class="lo-gap"><span class="lo-ghost" aria-hidden="true"></span><p class="lo-note">Room 404<br>checked out.<br><small>No forwarding address.</small></p></div>${lamp}${door(LOST_DOORS[3], 3)}${lamp}</div>
    <div class="lo-carpet" aria-hidden="true"></div>
    <div class="lo-dark" aria-hidden="true"></div>
  </div>
  <p class="lo-count" id="loCount">Doors knocked: 0 of 4</p>
  <div class="lo-desk">
    <div class="lo-boy" id="loBoy" aria-hidden="true"><i class="cap"></i><i class="face"></i><i class="body"></i></div>
    <p class="lo-say" id="loSay">Need a hand? Ring the bell.</p>
    <button type="button" class="lo-bell" id="loBell" aria-label="Ring the front desk bell"><i class="dome"></i><i class="lo-bb"></i><i class="base"></i></button>
  </div>
  ${home}`;
}
function initLost(root) {
  const $l = s => root.querySelector(s), $$l = s => [...root.querySelectorAll(s)];
  const hall = $l('#loHall'), say = $l('#loSay'), count = $l('#loCount'), boy = $l('#loBoy'), lights = $l('#loLights'), go = $l('.lo-go');
  const seen = new Set();
  let ac = null;
  const ding = () => { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const t = ac.currentTime;
    [[2093, .32], [3140, .12]].forEach(([f, v]) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .005); g.gain.exponentialRampToValueAtTime(.0001, t + 1.6); o.connect(g).connect(ac.destination); o.start(t); o.stop(t + 1.7); }); } catch (_) {} };
  const knock = () => { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const t0 = ac.currentTime;
    [0, .16].forEach(d => { const t = t0 + d, o = ac.createOscillator(), g = ac.createGain(); o.type = 'triangle'; o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(70, t + .08); g.gain.setValueAtTime(.5, t); g.gain.exponentialRampToValueAtTime(.001, t + .12); o.connect(g).connect(ac.destination); o.start(t); o.stop(t + .14); }); } catch (_) {} };
  $$l('.lo-door').forEach(d => d.addEventListener('click', () => {
    if (d.classList.contains('open')) { d.classList.remove('open'); return; }
    if (d.classList.contains('knock')) return;
    d.classList.add('knock'); knock();
    setTimeout(() => { d.classList.remove('knock'); d.classList.add('open'); seen.add(d.dataset.i);
      count.textContent = seen.size < 4 ? `Doors knocked: ${seen.size} of 4` : 'Every door tried. Room 404 really is gone.';
      if (seen.size === 4) { count.classList.add('all'); say.textContent = 'Told you. Ring the bell, I’ll walk you home.'; } }, 420);
  }));
  const lines = ['Ding! Coming, coming…', 'Lost? Happens to the best of us.', 'The valley is this way. Follow me →', 'Okay, okay, I heard you! 😅'];
  let rings = 0;
  $l('#loBell').addEventListener('click', e => { const b = e.currentTarget; b.classList.remove('ring'); void b.offsetWidth; b.classList.add('ring'); ding();
    say.textContent = lines[Math.min(rings, lines.length - 1)]; rings++; boy.classList.add('on'); if (rings > 1 && go) go.classList.add('glow'); });
  // the lights: on by day, off at night (with a flashlight)
  const setDark = on => { hall.classList.toggle('off', on); root.classList.toggle('lo-off', on); lights.setAttribute('aria-pressed', on); lights.querySelector('b').textContent = on ? 'Lights on' : 'Lights off'; };
  setDark(document.documentElement.dataset.theme === 'dark');
  lights.addEventListener('click', () => setDark(!hall.classList.contains('off')));
  const aim = e => { const r = hall.getBoundingClientRect(); hall.style.setProperty('--mx', (e.clientX - r.left) + 'px'); hall.style.setProperty('--my', (e.clientY - r.top) + 'px'); };
  hall.addEventListener('pointermove', aim); hall.addEventListener('pointerdown', aim);
}

(() => {
  const hide = () => { const el = document.getElementById('lost'); if (!el) return; el.classList.remove('open'); document.documentElement.style.overflow = ''; history.replaceState(null, '', location.pathname + location.search); };
  const show = () => {
    let el = document.getElementById('lost');
    if (!el) { el = document.createElement('div'); el.className = 'lost'; el.id = 'lost'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Page not found'); el.setAttribute('data-lenis-prevent', '');
      el.innerHTML = lostHTML('<button type="button" class="lo-go">Take me home →</button>'); document.body.appendChild(el); initLost(el);
      el.querySelectorAll('.lo-go, .lo-home').forEach(b => b.addEventListener('click', e => { e.preventDefault(); hide(); scrollTo(0, 0); })); }
    el.scrollTop = 0; document.documentElement.style.overflow = 'hidden'; requestAnimationFrame(() => el.classList.add('open'));
  };
  window.showLost = show;
  const check = () => { const h = decodeURIComponent(location.hash.slice(1)); if (h && (h === '404' || !document.getElementById(h))) show(); };
  check(); addEventListener('hashchange', check);
  addEventListener('keydown', e => { if (e.key === 'Escape' && document.querySelector('.lost.open')) hide(); });
})();
(() => { const r = document.documentElement; let on = null; const f = () => { const v = scrollY > 60; if (v !== on) { on = v; r.classList.toggle('scrolled', v); } }; addEventListener('scroll', f, { passive: true }); f(); })();
(() => { if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('offscreen', !e.isIntersecting)), { rootMargin: '120px 0px' });
  document.querySelectorAll('#top, #story, #journey, #work, #brand, #lastlook, #stack, #process, #life, #notes, #hello').forEach(el => io.observe(el)); })();

