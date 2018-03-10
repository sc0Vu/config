const tape = require('tape')
const config = require('../index')('https://raw.githubusercontent.com/sc0Vu/ethdock/master/docker-compose.yml')
const path = require('path')

tape('Test config', (t) => {
  t.test('config basic properties', (st) => {
    st.deepEquals(config.data, {}, 'Data must be empty when initialize.')
    st.equals(config.fileName, 'https://raw.githubusercontent.com/sc0Vu/ethdock/master/docker-compose.yml', 'Filename must be equal when initialize.')
    st.equals(config.raw, '', 'Raw data must be empty when initialize.')
    st.end()
  })

  t.test('config load method', (st) => {
    config.load().then((loaded) => {
      st.equals(loaded, true, 'Config must be loaded.')
    }).then(() => {
      let config = require('../index')(path.join(__dirname, 'test.yml'))

      st.deepEquals(config.data, {}, 'Data must be empty when initialize.')
      st.equals(config.fileName, path.join(__dirname, 'test.yml'), 'Filename must be equal when initialize.')
      st.equals(config.raw, '', 'Raw data must be empty when initialize.')

      config.load().then((loaded) => {
        st.equals(loaded, true, 'Config must be loaded.')
        st.end()
      })
    })
  })
})
