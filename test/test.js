const path = require('path')
const tape = require('tape')
const Config = require('../index')
const config = new Config()
const testFile = {
  online: 'https://raw.githubusercontent.com/sc0Vu/ethdock/master/docker-compose.yml',
  local: path.join(__dirname, 'test.yml'),
  notExisted: path.join(__dirname, 'testqq.yml'),
}

tape('Test config', (t) => {
  t.test('config basic properties', (st) => {
    st.deepEquals(config.data, {}, 'Data must be empty when initialize.')
    st.end()
  })

  t.test('config load http file', (st) => {
    config.load(testFile.online).then((data) => {
      st.deepEquals(config.data, data)
      st.end()
    })
  })

  t.test('config load local file', (st) => {
    config.load(testFile.local).then((data) => {
      st.deepEquals(config.data, data)
      st.end()
    })
  })

  t.test('config load not existed file', (st) => {
    config.load(testFile.notExisted).then((data) => {
      st.deepEquals(data, {})
      st.end()
    }).catch((err) => {
      st.equals(err.message.length > 0, true)
      st.end()
      t.end()
    })
  })
})
