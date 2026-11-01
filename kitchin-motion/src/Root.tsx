import {Composition, staticFile} from 'remotion';
import {KitchinWalkthrough} from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="KitchinWalkthrough" component={KitchinWalkthrough} durationInFrames={720} fps={30} width={1440} height={900} defaultProps={{assetBase: staticFile('screens'), compact: false}}/>
      <Composition id="KitchinMobile" component={KitchinWalkthrough} durationInFrames={720} fps={30} width={720} height={1100} defaultProps={{assetBase: staticFile('screens'), compact: true}}/>
    </>
  );
};
