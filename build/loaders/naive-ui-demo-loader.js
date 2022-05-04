const { convertMd2Demo } = require('./convert-md-to-demo')
const convertVue2Demo = require('./convert-vue-to-demo')
const projectPath = require('./project-path')

module.exports = function (content, path, type) {
  const relativeUrl = path.replace(projectPath + '/', '')
  if (type === 'vue') {
    return convertVue2Demo(content, {
      relativeUrl,
      resourcePath: path,
      isVue: true
    })
  }
  return convertMd2Demo(content, {
    relativeUrl,
    resourcePath: path,
    isVue: false
  })
}
