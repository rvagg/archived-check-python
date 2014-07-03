// NOTE: this makes a lot of assumptions, mainly that you're in a reasonable
// dev environment and don't have crazy versions installed in crazy places

const checkPython = require('./')
    , assert      = require('assert')
    , win         = process.platform == 'win32'

    , pathRegex   = win
          ? /^C:\\.+\.exe$/
          : /^\/usr\/.+\/python$/
    , versionRegex = /^2\.7\.\d+$/


checkPython(function (err, python, version) {
  assert.ifError(err, 'no error')
  assert(typeof python == 'string')
  assert(pathRegex.test(python), 'valid python path: ' + python)
  assert(versionRegex.test(version), 'valid python version: ' + version)
})