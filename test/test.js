var assert = require('assert')
var config = require('../index')('https://raw.githubusercontent.com/sc0Vu/ethdock/master/docker-compose.yml')
var path = require('path')

assert.deepEqual(config.data, {}, 'Data must be empty when initialize.')
assert.equal(config.fileName, 'https://raw.githubusercontent.com/sc0Vu/ethdock/master/docker-compose.yml', 'Filename must be equal when initialize.')
assert.equal(config.raw, '', 'Raw data must be empty when initialize.')

config.load().then((loaded) => {
  assert.equal(loaded, true, 'Config must be loaded.')
}).then(() => {
  var config = require('../index')(path.join(__dirname, 'test.yml'))

  assert.deepEqual(config.data, {}, 'Data must be empty when initialize.')
  assert.equal(config.fileName, path.join(__dirname, 'test.yml'), 'Filename must be equal when initialize.')
  assert.equal(config.raw, '', 'Raw data must be empty when initialize.')

  config.load().then((loaded) => {
    assert.equal(loaded, true, 'Config must be loaded.')
  })
})
