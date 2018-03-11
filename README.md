# Simple yaml config
[![Build Status](https://travis-ci.org/sc0Vu/config.svg?branch=master)](https://travis-ci.org/sc0Vu/config)
[![codecov](https://codecov.io/gh/sc0Vu/config/branch/master/graph/badge.svg)](https://codecov.io/gh/sc0Vu/config)

Nodejs Simple yaml config.

# Install
```
npm install simple-yaml-config
```

# Usage
1. load config
```
const Config = require('simple-yaml-config')
let config = new Config()

config.load('resource uri', options).then((loadedData) => {
  // do something after config was loaded
}).catch((err) => {
  // do something when error was occured
})
```

2. save config
```
const Config = require('simple-yaml-config')
let config = new Config({
  version: 1
})

config.save('file name', options).then(() => {
  // do something after config was saved
}).catch((err) => {
  // do something when error was occured
})
```

# Test
```
npm test
```

# License
MIT
