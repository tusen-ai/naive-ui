const parser = require('@babel/parser')
const { default: traverse } = require('@babel/traverse')
const { default: generate } = require('@babel/generator')

module.exports = function terseCssr (code) {
  const pattern = /[\n\t\s]+/g

  const ast = parser.parse(code, {
    sourceType: 'module'
  })

  traverse(ast, {
    TemplateElement (path) {
      ;['raw', 'cooked'].forEach((type) => {
        path.node.value[type] = path.node.value[type]
          .replace(pattern, ' ')
          .trim()
      })
    }
  })

  return generate(ast).code
}
