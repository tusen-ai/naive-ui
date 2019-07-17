// const { getOptions } = require('loader-utils')
// const validateOptions = require('schema-utils')
const prettier = require('prettier')

module.exports = function (content) {
  const exampleReg = /<!--EXAMPLE_START-->([\s\S]*)?<!--EXAMPLE_END-->/
  const scriptReg = /<script>([\s\S]*)?<\/script>/
  const sourceReg = /<!--SOURCE-->/
  const example = prettier.format(content.match(exampleReg)[1], {
    parser: 'html',
    printWidth: 80
  })
  const script = content.match(scriptReg)[0]
  const source = example + '\n' + script
  return content.replace(sourceReg, `<textarea v-pre>${source}</textarea>`)
}
