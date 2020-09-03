const convertMd2Demo = require('./convertMd2Demo')

module.exports = function (content) {
  return convertMd2Demo(content, this.resourcePath)
}
