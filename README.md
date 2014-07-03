# check-python

**Check for Python on the current system and return the value**

Extracted from **[node-gyp](https://github.com/TooTallNate/node-gyp)**.

[![NPM](https://nodei.co/npm/check-python.png?downloads=true&stars=true)](https://nodei.co/npm/check-python/) [![NPM](https://nodei.co/npm-dl/check-python.png?months=3)](https://nodei.co/npm/check-python/)

```js
checkPython(function (err, python, version) {
  console.log('Python: %s\nPython version: %s', python, version)
})
```

*Should* work on Windows but there are many assumptions about install location and since this is not guaranteed you may have trouble.


## License

**goingnative** is Copyright (c) 2014 Rod Vagg [@rvagg](https://twitter.com/rvagg) and contributors licensed under the MIT License. All rights not explicitly granted in the MIT License are reserved. See the included [LICENSE.md](./LICENSE.md) file for more details.
