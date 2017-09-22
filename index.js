module.exports = exports = function (fileName, options) {
  var yaml = require('js-yaml')
  var fs = require('fs-extra')
  var request = require('request-promise')
  var config = {}
  var defaultOptions = {
    encoding: 'utf8'
  }

  config.fileName = fileName
  config.raw = ''
  config.data = {}
  config.options = Object.assign({}, defaultOptions, options)

  config.load = async () => {
    if (/^https?\:\/\/(?:[a-zA-Z0-9.\/\-]+)$/.test(fileName)) {
      try {
        config.raw = await request({
          method: 'GET',
          uri: fileName
        })
        config.data = yaml.safeLoad(config.raw, config.options.encoding)
        return true
      } catch (err) {
        console.warn(`${err.name} message: ${err.message}`)
        return false
      }
    } else {
      try {
        config.raw = await fs.readFile(fileName, config.options.encoding)
        config.data = yaml.safeLoad(config.raw, config.options.encoding)
        return true
      } catch (err) {
        console.warn(`${err.name} message: ${err.message}`)
        return false
      }
    }
  }

  return config
}