"use strict";

const request = require('request');

class PhilipsHue {
  constructor(bridgeIP, username) {
    this.bridgeIP = bridgeIP;
    this.username = username;
    this.lights = [];
  }

  function Light(id) {
    this.id = id;
    const url = `${this.bridgeIP}/api${this.username}/lights/${this.id}/state`;

    function changeStateRequest(requestBody) {
      request.put({
        url: url,
        json: requestBody,
      }, 
      (error, response) => {
        if (error) {
          console.log('Failed to set light ' + this.id);
        }
      });
    }

    this.turnOn() {
      const requestBody = {
        'on': true,
      };

      changeStateRequest(requestBody);
    }

    this.turnOff() {
      const requestBody = {
        'on' : false,
      };

      changeStateRequest(requestBody);
    }

  }

  initialiseLights(done) {
    const getLightsURL = `${this.bridgeIP}/api${this.username}/lights`;

    request.get({
      url: getLightsURL,
    }, (error, response) => {
      const lights = JSON.parse(response.body);
      for(const id of Object.keys(lights)){
        this.lights.push(new Light(id));
      }
      console.log('Initialisation complete');
      done();
    });
  }

  turnOnLights() {
    console.log('Turning on lights ' + this.lights);
    this.lights.forEach((light) => { light.turnOn();});
  }

  turnOffLights() {
    console.log('Turning off lights ' + this.lights);
    this.lights.forEach((light) => { light.turnOff();});
  }

}

module.exports = PhilipsHue;
