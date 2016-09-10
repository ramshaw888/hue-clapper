var clapDetector = require('clap-detector');
var request = require('request');
var config = require('config.json')('./config.json');

const userConfig = {
  user: config.username,
  api: config.bridge + '/api'
};

const clapConfig = {
  AUDIO_SOURCE: config.audioSource,
  CLAP_AMPLITUDE_THRESHOLD: config.threshold
};

var state = false;
var ids = {};

request.get({
  url: userConfig.api + userConfig.user + '/lights'
}, (error, response) => {
  const lights = JSON.parse(response.body);
  ids = Object.keys(lights);
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
    for (var i of ids) {
      const onCommand = {
        'on': on 
      };
      request.put({
        url: userConfig.api + userConfig.user + '/lights/' + i + '/state',
        json: onCommand
      }, (error, response) => {
        console.log(response.body);
      });
      console.log(i);
    }
  });
}
