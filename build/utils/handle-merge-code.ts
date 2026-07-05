import { tsToJs } from './tsToJs'

interface Parts {
  api?: 'composition' | 'options'
  language?: 'ts' | 'js'
  template?: string
  script?: string
  style?: string
}

interface MergedParts {
  tsCode: string
  jsCode: string
}

interface MergeCodeOptions {
  parts: Parts
  mergedParts: MergedParts
  isVue: boolean
}

export function handleMergeCode(options: MergeCodeOptions): void {
  const { parts, mergedParts, isVue } = options
  const isCompositionApi = parts.api === 'composition'
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
      mergedParts.tsCode += `<script${
        isCompositionApi ? ' setup' : ''
      } lang="ts">
${parts.script}
</script>`
      mergedParts.jsCode += `<script${isCompositionApi ? ' setup' : ''}>
${tsToJs(parts.script)}
</script>`
    }
    if (parts.style) {
      if (parts.template || parts.script) {
        mergedParts.tsCode += '\n\n'
        mergedParts.jsCode += '\n\n'
      }
      const style = `<style scoped>${parts.style}</style>`
      mergedParts.tsCode += style
      mergedParts.jsCode += style
    }
  }
  else {
    // only js when md or vue file
    if (parts.template) {
      mergedParts.jsCode += isVue
        ? `<template>${parts.template}</template>`
        : `<template>\n${parts.template
          .split('\n')
          .map((line: string) => (line.length ? `  ${line}` : line))
          .join('\n')}\n</template>`
    }
    if (parts.script) {
      if (parts.template) {
        mergedParts.jsCode += '\n\n'
      }
      mergedParts.jsCode += `<script${isCompositionApi ? ' setup' : ''}>\n${parts.script}\n</script>`
    }
    if (parts.style) {
      if (parts.template || parts.script) {
        mergedParts.jsCode += '\n\n'
      }
      const style = isVue
        ? `<style scoped>${parts.style}</style>`
        : `<style scoped>\n${parts.style}\n</style>`
      mergedParts.jsCode += style
    }
  }
}
