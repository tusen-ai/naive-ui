const convertMd2Doc = require('./convert-md-to-doc')
const projectPath = require('./project-path')

module.exports = async function (content, path) {
  const env = require('node:process').env.NODE_ENV
  const relativeUrl = path.replace(`${projectPath}/`, '')
  return convertMd2Doc(content, relativeUrl, env)
}
