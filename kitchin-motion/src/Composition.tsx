import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export type WalkthroughProps = {assetBase: string; compact?: boolean};
export const chapters = [
  {at: 0, screen: 'home', title: 'Start with what\nyou need.', caption: 'Open Recipes from the home screen.', target: [255, 145]},
  {at: 2.4, screen: 'recipes', title: 'Find something\nto cook.', caption: 'Browse cuisines, difficulty and recipe recommendations.', target: [205, 770]},
  {at: 5.4, screen: 'ingredients', title: 'Check what’s\nalready there.', caption: 'See available ingredients and what is missing.', target: [295, 555]},
  {at: 8.6, screen: 'instructions', title: 'A little help,\nstep by step.', caption: 'Switch to Instructions and follow the cooking steps.', target: [295, 555]},
];

// Original screen artwork is presentation media, not a rebuilt version of the app.
const Phone: React.FC<WalkthroughProps> = ({assetBase}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;
  const current = chapters.reduce((index, chapter, i) => seconds >= chapter.at ? i : index, 0);
  const chapter = chapters[current];
  const previous = chapters[Math.max(0, current - 1)];
  const since = seconds - chapter.at;
  const progress = interpolate(since, [0, .22], [0, 1], {extrapolateRight: 'clamp', easing: Easing.bezier(.16, 1, .3, 1)});
  const nextAt = chapters[current + 1]?.at ?? 12.6;
  const move = interpolate(seconds, [nextAt - .8, nextAt - .25], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const x = 350 + (chapter.target[0] - 350) * move;
  const y = 820 + (chapter.target[1] - 820) * move;
  const tapAge = seconds - (nextAt - .2);
  return <div style={{position: 'relative', width: 436, height: 941, background: '#232723', borderRadius: 53, padding: 12, boxShadow: '0 24px 65px #20352925, inset 0 0 0 3px #727b72'}}>
    <div style={{position: 'relative', width: 412, height: 917, borderRadius: 42, overflow: 'hidden', background: '#f8f9fa'}}>
      {current > 0 && since < .3 && <Img src={`${assetBase}/${previous.screen}.png`} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}}/>}
      <Img src={`${assetBase}/${chapter.screen}.png`} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', translate: current > 0 && current < 3 ? `${(1 - progress) * 412}px 0` : '0 0', opacity: current === 3 ? progress : 1}}/>
      {seconds > .4 && seconds < 8.6 && <>
        {tapAge > 0 && tapAge < .45 && <div style={{position: 'absolute', left: x - 27, top: y - 27, width: 54, height: 54, border: '3px solid #eb91a8', borderRadius: '50%', scale: 1 + tapAge * 3, opacity: 1 - tapAge / .45}}/>}
        <svg width="38" height="44" viewBox="0 0 38 44" style={{position: 'absolute', left: x, top: y, filter: 'drop-shadow(0 2px 3px #0005)', scale: tapAge > 0 && tapAge < .2 ? .88 : 1}}><path d="M3 2L5 34L14 26L21 41L28 37L20 23L33 22Z" fill="#fff" stroke="#233728" strokeWidth="2.5" strokeLinejoin="round"/></svg>
      </>}
    </div>
  </div>;
};

const Story: React.FC<{compact: boolean}> = ({compact}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const current = chapters.reduce((index, chapter, i) => frame / fps >= chapter.at ? i : index, 0);
  const chapter = chapters[current];
  return <>
    <div style={{position: 'absolute', left: compact ? 48 : 90, top: compact ? 48 : 100, fontSize: 30, color: '#346245'}}>Kitchin / App walkthrough</div>
    <div style={{position: 'absolute', left: compact ? 48 : 90, top: compact ? 820 : 245, width: compact ? 624 : 610}}>
      <div style={{fontFamily: '"Instrument Serif", Georgia, serif', fontSize: compact ? 56 : 80, lineHeight: 1.04, letterSpacing: '-.045em', whiteSpace: 'pre-line'}}>{compact ? chapter.title.replace('\n', ' ') : chapter.title}</div>
      <div style={{fontSize: compact ? 25 : 28, lineHeight: 1.5, marginTop: 28, maxWidth: 475, color: '#45604d'}}>{chapter.caption}</div>
    </div>
  </>;
};

const FloatingPhone: React.FC<WalkthroughProps> = ({assetBase, compact}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <div style={{position: 'absolute', left: compact ? 207 : 860, top: compact ? 118 : 70, scale: compact ? '.70' : '.81', translate: `0 ${Math.sin(frame / fps * .8) * 7}px`, rotate: `${Math.sin(frame / fps * .55) * .7}deg`, transformOrigin: 'top left'}}><Phone assetBase={assetBase}/></div>;
};

export const KitchinWalkthrough: React.FC<WalkthroughProps> = ({assetBase, compact = false}) => <AbsoluteFill style={{background: '#eaf0e5', color: '#223b29', fontFamily: 'Geist, Arial, sans-serif'}}>
  <Story compact={compact}/>
  <FloatingPhone assetBase={assetBase} compact={compact}/>
</AbsoluteFill>;
