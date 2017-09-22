# config
[![Build Status](https://travis-ci.org/sc0Vu/config.svg?branch=master)](https://travis-ci.org/sc0Vu/config)

Nodejs config.

# Usage
```
var config = require('./config')('config resource uri or file path')

config.load().then((loaded) => {
  // start
})
```

# Test
```
npm test
```

# License
MIT
