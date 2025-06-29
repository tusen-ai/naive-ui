const convertVue2Demo = require('./convert-vue-to-demo')
const projectPath = require('./project-path')

module.exports = function (content, path) {
  const relativeUrl = path.replace(`${projectPath}/`, '')
  return convertVue2Demo(content, {
    relativeUrl,
    resourcePath: path,
    isVue: true
  })
}
