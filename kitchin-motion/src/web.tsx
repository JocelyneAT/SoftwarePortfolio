import {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player, PlayerRef} from '@remotion/player';
import {KitchinWalkthrough} from './Composition';

const Demo = () => {
  const player = useRef<PlayerRef>(null);
  const [compact, setCompact] = useState(matchMedia('(max-width: 600px)').matches);
  const [paused, setPaused] = useState(matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  useEffect(() => {
    const query = matchMedia('(max-width: 600px)');
    const resize = () => setCompact(query.matches);
    query.addEventListener('change', resize);
    return () => query.removeEventListener('change', resize);
  }, []);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => setPaused(reduced.matches);
    const visibility = () => setPageVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(document.querySelector('#walkthrough')!);
    reduced.addEventListener('change', preference);
    document.addEventListener('visibilitychange', visibility);
    return () => {observer.disconnect(); reduced.removeEventListener('change', preference); document.removeEventListener('visibilitychange', visibility);};
  }, []);
  useEffect(() => {
    if (!paused && visible && pageVisible) player.current?.play(); else player.current?.pause();
  }, [paused, visible, pageVisible]);
  return <>
    <Player ref={player} component={KitchinWalkthrough} inputProps={{assetBase: './screens', compact}} durationInFrames={378} fps={30} compositionWidth={compact ? 720 : 1440} compositionHeight={compact ? 1100 : 900} controls={false} loop clickToPlay={false} doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false} style={{width: '100%', display: 'block'}} aria-label="Automatic Kitchin recipe navigation animation"/>
    <button className="motion-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Resume animation' : 'Pause animation'}</button>
  </>;
};

const mount = document.querySelector('#walkthrough');
if (mount) createRoot(mount).render(<Demo/>);
