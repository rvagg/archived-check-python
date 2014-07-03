const fs       = require('fs')
    , path     = require('path')
    , which    = require('which')
    , xtend    = require('xtend')
    , semver   = require('semver')
    , execFile = require('child_process').execFile
    , win      = process.platform == 'win32'


function checkPython (python, callback) {
  if (typeof python == 'function') {
    callback = python
    python = null
  }

  if (!python)
    python = process.env.PYTHON || 'python'

  _checkPython(python, callback)
}


// Check if Python is in the $PATH
function _checkPython (python, callback) {
  which(python, function (err, execPath) {
    if (err)
      return win ? guessPython(python, callback) : failNoPython(callback)

    checkPythonVersion(execPath, callback)
  })
}


// Called on Windows when "python" isn't available in the current $PATH.
// We're gonna check if "%SystemDrive%\python27\python.exe" exists.
function guessPython (python, callback) {
  var rootDir = process.env.SystemDrive || 'C:\\'
    , pythonPath

  if (rootDir[rootDir.length - 1] !== '\\')
    rootDir += '\\'

  pythonPath = path.resolve(rootDir, 'Python27', 'python.exe')

  fs.stat(pythonPath, function (err) {
    if (err)
      return err.code == 'ENOENT' ? failNoPython(callback) : callback(err)

    checkPythonVersion(pythonPath, callback)
  })
}


function checkPythonVersion (python, callback) {
  var env = xtend({}, process.env);
  env.TERM = 'dumb';

  execFile(python, ['-c', 'import platform; print(platform.python_version());'], { env: env }, function (err, stdout) {
    if (err)
      return callback(err)

    var version
      , range

    version = stdout.trim()
    if (version.indexOf('+') > -1)
      version = version.replace(/\+/g, '')

    if (version.indexOf('rc') > -1)
      version = version.replace(/rc(.*)$/ig, '')

    range = semver.Range('>=2.5.0 <3.0.0')
    if (!range.test(version))
      return failPythonVersion(python, version, callback)

    callback(null, python, version)
  })
}


function failNoPython (python, callback) {
  callback(new Error('Can\'t find Python executable "' + python +
        '", you can set the PYTHON env variable.'))
}


function failPythonVersion (python, badVersion, callback) {
  callback(new Error('Python executable "' + python +
        '" is v' + badVersion + ', which is not supported by gyp.\n' +
        'You can pass the --python switch to point to Python >= v2.5.0 & < 3.0.0.'))
}


module.exports = checkPython


if (require.main === module) {
  checkPython(function (err, python, version) {
    if (err)
      throw err

    console.log('Python: %s\nPython version: %s', python, version)
  })
}
