const convertMd2Demo = require('./convertMd2Demo')
const projectPath = require('./project-path')

module.exports = function (content) {
  const relativeUrl = this.resourcePath.replace(projectPath + '/', '')
  return convertMd2Demo(content, {
    relativeUrl,
    resourcePath: this.resourcePath
  })
}
