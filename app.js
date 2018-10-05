"use strict";

const clapDetector = require('clap-detector');
const config = require('config.json')('./config.json');
const PhilipsHue = require('./PhilipsHue.js');

const clapConfig = {
  AUDIO_SOURCE: config.audioSource,
  CLAP_AMPLITUDE_THRESHOLD: config.threshold,
};

const state = {
  lightsOn: false,
};

PhilipsHue.initialiseLights(config)
  .then((lights) => {
    clapDetector.start(clapConfig);
    clapDetector.onClap(PhilipsHue.toggleLights(config, lights, state));
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
