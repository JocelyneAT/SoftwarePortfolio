import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';

const root = fileURLToPath(new URL('../', import.meta.url));
const result = await build({stdin: {contents: "export {bestRateSteps, BESTRATE_SECONDS, demoQuote} from './src/BestRate';", resolveDir: root}, bundle: true, format: 'cjs', platform: 'node', packages: 'external', write: false, logLevel: 'silent'});
const module = {exports: {}};
new Function('module', 'exports', 'require', result.outputFiles[0].text)(module, module.exports, createRequire(import.meta.url));
const {bestRateSteps, BESTRATE_SECONDS, demoQuote} = module.exports;
assert.equal(bestRateSteps[0].at, 0, 'The loop opens without a blank interval');
assert.deepEqual(bestRateSteps.map(step => step.page), ['login', 'home', 'details', 'alerts', 'create', 'saved', 'profile', 'finish']);
bestRateSteps.forEach((step, i) => {
  assert.ok(step.at < BESTRATE_SECONDS && (!i || step.at > bestRateSteps[i - 1].at));
  assert.ok(step.target[0] >= 0 && step.target[0] < 412 && step.target[1] >= 0 && step.target[1] < 917, 'Pointer stays inside the phone');
});
assert.equal(((demoQuote.send - demoQuote.fee) * demoQuote.rate).toFixed(2), '1337.85', 'Quote shows the amount after fees');
console.log('PASS complete navigation, ordered timing, pointer bounds and consistent demo quote');
