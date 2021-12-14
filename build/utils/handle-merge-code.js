const tsToJs = require('./tsToJs')
module.exports = function handleMergeCode ({ parts, mergedParts, isVue }) {
  if (isVue) {
    // ts处理
    let jsCode = ''
    if (parts.template) {
      mergedParts.tsCode += `<template>${parts.template}</template>`
      mergedParts.jsCode += `<template>${parts.template}</template>`
    }
    if (parts.script) {
      if (parts.template) {
        mergedParts.tsCode += '\n\n'
        mergedParts.jsCode += '\n\n'
      }
      mergedParts.tsCode += `<script lang="ts">
${parts.script}
</script>`
      jsCode = tsToJs(parts.script)
      mergedParts.jsCode += `<script>
${jsCode}
</script>`
    }
    if (parts.style) {
      if (parts.template || parts.script) {
        mergedParts.tsCode += '\n\n'
        mergedParts.jsCode += '\n\n'
      }
      const style = `<style>${parts.style}</style>`
      mergedParts.tsCode += style
      mergedParts.jsCode += style
    }
  } else {
    // md文档的js处理，不需要ts代码
    if (parts.template) {
      mergedParts.jsCode += `<template>\n${parts.template
        .split('\n')
        .map((line) => (line.length ? '  ' + line : line))
        .join('\n')}\n</template>`
    }
    if (parts.script) {
      if (parts.template) {
        mergedParts.jsCode += '\n\n'
      }
      mergedParts.jsCode += `<script>
${parts.script}
</script>`
    }
    if (parts.style) {
      if (parts.template || parts.script) {
        mergedParts.jsCode += '\n\n'
      }
      const style = `<style>
${parts.style}
</style>`
      mergedParts.jsCode += style
    }
  }
}
