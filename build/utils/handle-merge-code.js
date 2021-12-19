const tsToJs = require('./tsToJs')
module.exports = function handleMergeCode ({ parts, mergedParts, isVue }) {
  if (isVue && parts.language === 'ts') {
    // ts and js
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
      mergedParts.jsCode += `<script>
${tsToJs(parts.script)}
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
    // only js when md or vue file
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
