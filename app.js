var clapDetector = require('clap-detector');
var request = require('request');

const user = 'NceTzVAJIG5dkG-Hypk177k8cRFldoiAJxa3Tc8P';
const bridge = 'http://192.168.0.13/api';

const clapConfig = {
  AUDIO_SOURCE: 'coreaudio default', // OS X default
  CLAP_AMPLITUDE_THRESHOLD: 0.4,
};

var state = false;
var ids = {};

console.log('Welcome to Hue Clapper')

request.get({
  url: bridge + user + '/lights'
}, (error, response) => {
  const lights = JSON.parse(response.body);
  ids = Object.keys(lights);
  beginClap();
});


function beginClap() {
  console.log('begin');
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
        url: bridge + user + '/lights/' + i + '/state',
        json: onCommand
      }, (error, response) => {
        console.log(response.body);
      });
      console.log(i);
    }
  });
}
