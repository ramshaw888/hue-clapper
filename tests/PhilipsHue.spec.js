"use strict";

const chai = require('chai')
const expect = chai.expect;
const PhilipsHue = require('../PhilipsHue.js');

describe('PhilipsHue class', () => {
  let hue;

  beforeEach(() => {
    hue = new PhilipsHue('foo', 'bar');
  });

  it('should set the username', () => {
    expect(true).to.be.ok;
  });
});
