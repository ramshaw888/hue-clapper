"use strict";

const chai = require('chai')
const sinon = require('sinon');
const mock = require('mock-require');
const expect = chai.expect;
let PhilipsHue = require('../PhilipsHue.js');

describe('PhilipsHue class', () => {
  let hue;
  let requestPutSpy;
  let requestGetSpy;

  beforeEach(() => {
    requestPutSpy = sinon.spy();
    requestGetSpy = sinon.spy();

    mock('request', {
      put: requestPutSpy,
      get: requestGetSpy,
    });

    PhilipsHue = mock.reRequire('../PhilipsHue.js');
    hue = new PhilipsHue('foo', 'bar');
  });

  afterEach(() => {
    mock.stop('request');
  });

  describe('construction', () => {
    it('should set the username', () => {
      expect(hue.username).to.equal('bar');
    });

    it('should set the bridgeIP', () => {
      expect(hue.bridgeIP).to.equal('foo');
    });

    it('should initialise lights array', () => {
      expect(hue.lights).to.deep.equal([]);
    });
  });

  describe('lightsList method', () => {
    beforeEach(() => {
      hue.lights = ['a', 'b', 'c'];
    });

    it('should return the list of lights', () => {
      expect(hue.lightsList()).to.deep.equal(['a', 'b', 'c']);
    });
  });

  describe('setLight method', () => {
    beforeEach(() => {
      hue.setLight('1', true);
    });

    it('should make a request to set light 1 to true', () => {
      expect(requestPutSpy.called).to.be.ok;
    });
  });

  describe('initialiseLights method', () => {
    let doneSpy;

    beforeEach(() => {
      doneSpy = sinon.spy();
      hue.initialiseLights(doneSpy);
    });

    it('should make a get request', () => {
      expect(requestGetSpy.called).to.be.ok;
    });

    describe('callback', () => {
      beforeEach(() => {
        requestGetSpy.args[0][1](null, {
          body: JSON.stringify({
            '1': 'light1',
            '2': 'light2',
            '3': 'light3',
          }),
        });
      });

      it('should call done', () => {
        expect(doneSpy.called).to.be.ok;
      });

      it('should set lights array', () => {
        expect(hue.lights).to.deep.equal(['1', '2', '3']);
      });
    });
  });
});
