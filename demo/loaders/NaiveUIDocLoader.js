const convertMd2Doc = require('./convertMd2Doc')
const projectPath = require('./project-path')

module.exports = function (content) {
  const env = process.env.NODE_ENV
  const relativeURL = this.resourcePath.replace(projectPath + '/', '')
  return convertMd2Doc(content, env, relativeURL)
}
