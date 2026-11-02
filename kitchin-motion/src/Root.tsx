import {Composition, staticFile} from 'remotion';
import {KitchinWalkthrough} from './Composition';
import {BestRateWalkthrough} from './BestRate';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="KitchinWalkthrough" component={KitchinWalkthrough} durationInFrames={378} fps={30} width={1440} height={900} defaultProps={{assetBase: staticFile('screens'), compact: false}}/>
      <Composition id="KitchinMobile" component={KitchinWalkthrough} durationInFrames={378} fps={30} width={720} height={1100} defaultProps={{assetBase: staticFile('screens'), compact: true}}/>
      <Composition id="BestRate" component={BestRateWalkthrough} durationInFrames={870} fps={30} width={1440} height={900} defaultProps={{compact: false}}/>
      <Composition id="BestRateMobile" component={BestRateWalkthrough} durationInFrames={870} fps={30} width={720} height={1500} defaultProps={{compact: true}}/>
    </>
  );
};
