const clapDetector = require('clap-detector');
const config = require('config.json')('./config.json');
const PhilipsHue = require('./PhilipsHue.js');

const philipsHue = new PhilipsHue(config.bridge, config.username);
philipsHue.initialiseLights(beginClap);

const clapConfig = {
  AUDIO_SOURCE: config.audioSource,
  CLAP_AMPLITUDE_THRESHOLD: config.threshold
};

let state = false;

function beginClap() {
  clapDetector.start(clapConfig);
  clapDetector.onClap(toggleLights.bind(this));
}

function toggleLights() {
  const ids = philipsHue.lightsList();

  if (state) {
    console.log('Turning on lights ' + ids);
  } else {
    console.log('Turning off lights ' + ids);
  }

  for (const i of ids) {
    philipsHue.setLights(i, state);
  }

  state = !state;
}
