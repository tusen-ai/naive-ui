const convertMd2Doc = require('./convertMd2Doc')
const path = require('path')

module.exports = function (content) {
  const env = process.env.NODE_ENV
  const projectPath = path.resolve(__dirname, '..', '..')
  const relativeURL = this.resourcePath.replace(projectPath + '/', '')
  return convertMd2Doc(content, env, relativeURL)
}
