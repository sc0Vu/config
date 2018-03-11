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
    const loadOptions = Object.assign({}, defaultOptions, options)
    let raw = ''

    try {
      if (/^https?\:\/\/(?:[a-zA-Z0-9.\/\-]+)$/.test(fileName)) {
        raw = await request({
          method: 'GET',
          uri: fileName
        })
      } else {
        raw = await fs.readFile(fileName, loadOptions.encoding)
      }
      config.data = yaml.safeLoad(raw, loadOptions)

      return config.data
    } catch (err) {
      throw err
    }
  }

  config.save = async (fileName, options) => {
    const saveOptions = Object.assign({}, defaultOptions, options)

    try {
      const serializedData = yaml.safeDump(config.data, saveOptions)

      return await fs.writeFile(fileName, serializedData, saveOptions.encoding)
    } catch (err) {
      throw err
    }
  }

  return config
}

module.exports = simpleConfig