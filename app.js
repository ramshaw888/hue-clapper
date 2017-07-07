"use strict";

const clapDetector = require('clap-detector');
const config = require('config.json')('./config.json');
const PhilipsHue = require('./PhilipsHue.js');

const clapConfig = {
	AUDIO_SOURCE: config.audioSource,
	CLAP_AMPLITUDE_THRESHOLD: config.threshold,
};

let isCurrentlyOn = false;

const philipsHue = new PhilipsHue(config.bridge, config.username);
philipsHue.initialiseLights(beginClap);

function beginClap() {
	clapDetector.start(clapConfig);
	clapDetector.onClap(toggleLights.bind(this));
}

function toggleLights() {
	if (isCurrentlyOn){
		philipsHue.turnOffLights();
		isCurrentlyOn = false;
	} else {
		philipsHue.turnOnLights();
		isCurrentlyOn = true;
	}
}
