// const { getOptions } = require('loader-utils')
// const validateOptions = require('schema-utils')
// const prettier = require('prettier')

module.exports = function (content) {
  const exampleReg = /<!--EXAMPLE_START-->([\s\S]*)?<!--EXAMPLE_END-->/
  const styleExampleReg = /<!--STYLE_EXAMPLE_START-->([\s\S]*)?<!--STYLE_EXAMPLE_END-->/
  const scriptReg = /<script>([\s\S]*)?<\/script>/
  const sourceReg = /<!--SOURCE-->/
  let sourceExample = content.match(exampleReg)
  sourceExample = sourceExample === null ? '' : sourceExample[1]
  let styleExample = content.match(styleExampleReg)
  const script = content.match(scriptReg)[0]
  // console.log(styleExample)
  styleExample = styleExample === null ? '' : styleExample[1]
  // const example = prettier.format((sourceExample + '\n' + script + '\n' + styleExample), {
  //   parser: 'html',
  //   printWidth: 80
  // }).trim()
  return content.replace(sourceReg, `<textarea v-pre>${(sourceExample + '\n' + script + '\n' + styleExample)}</textarea>`)
}
