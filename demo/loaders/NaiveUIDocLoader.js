const convertMd2Doc = require('./convertMd2Doc')
const projectPath = require('./project-path')

module.exports = function (content, path) {
  const env = process.env.NODE_ENV
  const relativeUrl = path.replace(projectPath + '/', '')
  return convertMd2Doc(content, env, relativeUrl)
}
