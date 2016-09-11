const request = require('request');

class PhilipsHue {
  constructor(bridgeIP, username) {
    this.bridgeIP = bridgeIP;
    this.username = username;
    this.lights = [];
  }

  initialiseLights(done) {
    const getLightsURL = `${this.bridgeIP}/api${this.username}/lights`;

    request.get({
      url: getLightsURL,
    }, (error, response) => {
      const lights = JSON.parse(response.body);
      this.lights = Object.keys(lights);
      console.log('Initialisation complete');
      done();
    });
  }

  lightsList() {
    return this.lights;
  }

  setLights(id, value) {
    const setLightsURL = `${this.bridgeIP}/api${this.username}/lights/${id}/state`;
    const command  = {
      'on': value
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
}

module.exports = PhilipsHue;
