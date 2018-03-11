const yaml = require('js-yaml')
const fs = require('fs-extra')
const request = require('request-promise')

const simpleConfig = function (data, options) {
  const defaultOptions = {
    encoding: 'utf8'
  }
  const config = {}

  config.data = (data !== undefined) ? data : {};
  config.options = Object.assign({}, config.options, options)

  config.load = async (fileName, options) => {
    loadOptions = Object.assign({}, defaultOptions, options)

    if (/^https?\:\/\/(?:[a-zA-Z0-9.\/\-]+)$/.test(fileName)) {
      try {
        raw = await request({
          method: 'GET',
          uri: fileName
        })
      } catch (err) {
        throw err
      }
    } else {
      try {
        raw = await fs.readFile(fileName, config.options.encoding)
      } catch (err) {
        throw err
      }
    }
    config.data = yaml.safeLoad(raw, loadOptions)
    return config.data
  }

  return config
}

module.exports = simpleConfig