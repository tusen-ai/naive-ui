const convertMd2Demo = require('./convertMd2Demo')
const projectPath = require('./project-path')

module.exports = function (content, path) {
  const relativeUrl = path.replace(projectPath + '/', '')
  return convertMd2Demo(content, {
    relativeUrl,
    resourcePath: path
  })
}
