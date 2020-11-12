const convertMd2Demo = require('./convert-md-to-demo')
const projectPath = require('./project-path')

module.exports = function (content, path) {
  const relativeUrl = path.replace(projectPath + '/', '')
  return convertMd2Demo(content, {
    relativeUrl,
    resourcePath: path
  })
}
