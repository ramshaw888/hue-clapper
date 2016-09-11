const clapDetector = require('clap-detector');
const config = require('config.json')('./config.json');
const PhilipsHue = require('./PhilipsHue.js');

const clapConfig = {
  AUDIO_SOURCE: config.audioSource,
  CLAP_AMPLITUDE_THRESHOLD: config.threshold,
};

let state = false;

const philipsHue = new PhilipsHue(config.bridge, config.username);
philipsHue.initialiseLights(beginClap);

function beginClap() {
  clapDetector.start(clapConfig);
  clapDetector.onClap(toggleLights.bind(this));
}

function toggleLights() {
  philipsHue.setAllLights(state);
  state = !state;
}
