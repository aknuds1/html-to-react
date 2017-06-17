'use strict';

var assert = require('assert');
var utils = require('../lib/utils');
var createStyleJsonFromString = utils.createStyleJsonFromString;

describe('utils: createStyleJsonFromString', function() {
  it('works', function () {
    var input = 'display:block; margin:0; padding:0;';
    var output = createStyleJsonFromString(input);

    assert.deepEqual(output, {
      display: 'block',
      margin: '0',
      padding: '0',
    });
  });

  it('works for colons', function() {
    var input = 'background: url(\'data:image/png;base64,abcdef=/+\') no-repeat';
    var output = createStyleJsonFromString(input);

    assert.deepEqual(output, {
      background: ' url(\'data:image/png;base64,abcdef=/+\') no-repeat',
    });
  });
});
