const clapDetector = require('clap-detector');
const request = require('request');
const config = require('config.json')('./config.json');

const userConfig = {
  user: config.username,
  api: config.bridge + '/api'
};

const clapConfig = {
  AUDIO_SOURCE: config.audioSource,
  CLAP_AMPLITUDE_THRESHOLD: config.threshold
};

let state = false;
let ids = {};

request.get({
  url: userConfig.api + userConfig.user + '/lights'
}, (error, response) => {
  const lights = JSON.parse(response.body);
  ids = Object.keys(lights);
  console.log('Initialisation complete');
  beginClap();
});


function beginClap() {
  clapDetector.start(clapConfig);
  clapDetector.onClap(toggleLights.bind(this));
}

function toggleLights() {
  setLights(ids, state);
  state = !state;
}

function setLights(ids, on) {
  setTimeout(() => {
    if (on) {
      console.log('Turning on lights ' + ids);
    } else {
      console.log('Turning off lights ' + ids);
    }
    for (const i of ids) {
      const onCommand = {
        'on': on 
      };
      request.put({
        url: userConfig.api + userConfig.user + '/lights/' + i + '/state',
        json: onCommand
      }, (error, response) => {
        if (error) {
          console.log('Failed to set light ' + i);
        }
      });
    }
  });
}
