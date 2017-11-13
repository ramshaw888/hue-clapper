"use strict";

const fetch = require('node-fetch');

const initialiseLights = (config) => {
  const getLightsURL = `${config.bridge}/api${config.username}/lights`;
  return fetch(getLightsURL)
    .then((response) => {
      if (response.status !== 200) {
        return Promise.reject('Failed to initialise Hue lights');
      }
      return response.json().then((body) => {
        return Promise.resolve(Object.keys(body));
      });
    })
    .catch((error) => {
      console.error(`Error on initialisation: ${error}`);
    });
};

const toggleLight = (config, lightID, on) => fetch(
  `${config.bridge}/api${config.username}/lights/${lightID}/state`,
  {
    method: 'PUT',
    body: JSON.stringify({ on }),
  })
  .then((response) => {
    if (response.status !== 200) {
      return Promise.reject('Failed to set Hue lights');
    }
    return Promise.resolve();
  })
  .catch((error) => {
    console.error(`Error on setting lights: ${error}`);
  });

const toggleLights = (config, lights, state) => {
  return () => {
    const lightsResponse = lights.map((lightID) => toggleLight(config, lightID, state.lightsOn));
    Promise.all(lightsResponse).then((response) => {
      state.lightsOn = !state.lightsOn;
    });
  }
}

module.exports = {
  initialiseLights,
  toggleLights,
};
