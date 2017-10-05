"use strict";

const request = require('request');

class PhilipsHue {
  constructor(bridgeIP, username) {
    this.bridgeIP = bridgeIP;
    this.username = username;
    this.lights = [];
  }

  initialiseLights(done) {
    const getLightsURL = `${this.bridgeIP}/api${this.username}/lights`;
    fetch(getLightsURL).then((response) => {
      response.json().then((lights) => {
        this.lights = Object.keys(lights);
        console.log('Initialisation complete');
        done();
      });
    });
  }

  lightsList() {
    return this.lights;
  }

  setLight(id, state) {
    const setLightsURL = `${this.bridgeIP}/api${this.username}/lights/${id}/state`;
    const command  = {
      'on': state,
    };
    request.put({
      url: setLightsURL,
      json: command,
    }, (error, response) => {
      if (error) {
        console.log('Failed to set light ' + id);
      }
    });
  }

  setAllLights(state) {
    if (state) {
      console.log('Turning on lights ' + this.lights);
    } else {
      console.log('Turning off lights ' + this.lights);
    }

    for (const light of this.lights) {
      this.setLight(light, state);
    }
  }
}

module.exports = PhilipsHue;
