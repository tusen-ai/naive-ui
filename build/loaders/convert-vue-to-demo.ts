import type { SFCScriptBlock } from '@vue/compiler-sfc'
import type { Token } from 'marked'
import type {
  DemoParts,
  DemoPartsWithBuildOptions,
  MergedParts,
  ScriptLanguage,
  VueApiStyle
} from '../types/vue-to-demo'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { parse } from '@vue/compiler-sfc'
import { marked } from 'marked'
import { handleMergeCode } from '../utils/handle-merge-code'
import { createRenderer } from './md-renderer'

interface ConvertVue2DemoOptions {
  content: string
  resourcePath: string
  relativeUrl: string
  isVue?: boolean
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mdRenderer = createRenderer()

const __HTTP__ = process.env.NODE_ENV !== 'production' ? 'http' : 'https'

const demoBlock = fs
  .readFileSync(path.resolve(__dirname, 'ComponentDemoTemplate.vue'))
  .toString()

function mergeParts({ parts, isVue }: DemoPartsWithBuildOptions): MergedParts {
  const mergedParts = {
    ...parts,
    title: parts.title,
    content: parts.content,
    tsCode: '',
    jsCode: ''
  }
  handleMergeCode({ parts, mergedParts, isVue })
  mergedParts.tsCode = encodeURIComponent(mergedParts.tsCode)
  mergedParts.jsCode = encodeURIComponent(mergedParts.jsCode)
  return mergedParts
}

const cssRuleRegex = /([^{}]*)(\{[^}]*\})/g

// simulate scss style
// to remove dep of sass
// xxx {
//   mystyle
// }
function genStyle(sourceStyle: string): string | null {
  let match
  let matched = false
  const rules: string[] = []

  let matchResult = cssRuleRegex.exec(sourceStyle)
  while (matchResult !== null) {
    match = matchResult
    matchResult = cssRuleRegex.exec(sourceStyle)
    matched = true
    const selector = match[1]
    const body = match[2]
    rules.push(
      selector
        .split(',')
        .map(part => `.demo-card__view ${part}, .naive-ui-doc ${part}`)
        .join(',') + body
    )
  }
  if (!matched)
    return null
  return `<style scoped>\n${rules.join('\n')}</style>`
}

function genVueComponent(
  parts: MergedParts,
  fileName: string,
  relativeUrl: string
): string {
  const demoFileNameReg = /<!-- DEMO_FILE_NAME -->/g
  const relativeUrlReg = /<!-- URL -->/g
  const titleReg = /<!-- TITLE_SLOT -->/g
  const contentReg = /<!-- CONTENT_SLOT -->/
  const tsCodeReg = /<!-- TS_CODE_SLOT -->/
  const jsCodeReg = /<!-- JS_CODE_SLOT -->/
  const scriptReg = /<!-- SCRIPT_SLOT -->/
  const styleReg = /<!-- STYLE_SLOT -->/
  const demoReg = /<!-- DEMO_SLOT -->/
  const languageTypeReg = /<!-- LANGUAGE_TYPE_SLOT -->/
  let src = demoBlock
  src = src.replace(demoFileNameReg, fileName)
  src = src.replace(relativeUrlReg, relativeUrl)
  if (parts.content) {
    src = src.replace(contentReg, parts.content)
  }
  if (parts.title) {
    src = src.replace(titleReg, parts.title)
  }
  if (parts.tsCode) {
    src = src.replace(tsCodeReg, parts.tsCode)
  }
  if (parts.jsCode) {
    src = src.replace(jsCodeReg, parts.jsCode)
  }
  if (parts.script) {
    const attributes = `${parts.api === 'composition' ? ' setup' : ''}${
      parts.language === 'ts' ? ' lang="ts"' : ''
    }`
    const startScriptTag = `<script${attributes}>\n`
    src = src.replace(scriptReg, `${startScriptTag + parts.script}\n</script>`)
  }
  if (parts.language) {
    src = src.replace(languageTypeReg, parts.language)
  }
  if (parts.style) {
    const style = genStyle(parts.style)
    if (style !== null) {
      src = src.replace(styleReg, style)
    }
  }
  if (parts.template) {
    src = src.replace(demoReg, parts.template)
  }
  if (/__HTTP__/.test(src)) {
    src = src.replace(/__HTTP__/g, __HTTP__)
  }
  return src.trim()
}

function getFileName(resourcePath: string): [string, string] {
  const dirs = resourcePath.split('/')
  const fileNameWithExtension = dirs[dirs.length - 1]
  return [fileNameWithExtension.split('.')[0], fileNameWithExtension]
}

function getPartsOfDemo(source: string, resourcePath: string): DemoParts {
  const { descriptor, errors } = parse(source, {
    filename: resourcePath
  })
  if (errors.length) {
    const [error] = errors
    if (error instanceof Error)
      throw error
    throw new Error(String(error))
  }
  if (!descriptor.template)
    throw new Error('No <template> block found in demo component')

  const template = descriptor.template.content
  const scriptBlock = descriptor.scriptSetup ?? descriptor.script ?? null
  const markdownText
    = descriptor.customBlocks.find(block => block.type === 'markdown')
      ?.content ?? ''
  const { title, content } = resolveMarkdown(markdownText)
  return {
    template,
    script: scriptBlock?.content?.trim(),
    style: mergeStyles(descriptor.styles) || '',
    title,
    content,
    language: resolveLanguage(scriptBlock),
    api: resolveApiType(descriptor.scriptSetup, descriptor.script)
  }
}

function resolveMarkdown(
  markdownText: string
): Pick<DemoParts, 'title' | 'content'> {
  const trimmed = markdownText.trim()
  if (!trimmed)
    return { title: '', content: '' }
  const tokens = marked.lexer(trimmed)
  const contentTokens: Token[] = []
  let title = ''
  for (const token of tokens) {
    if (!title && token.type === 'heading' && token.depth === 1) {
      title = token.text
      continue
    }
    contentTokens.push(token)
  }
  return {
    title,
    content: marked.parser(contentTokens, {
      renderer: mdRenderer
    })
  }
}

function resolveLanguage(scriptBlock: SFCScriptBlock | null): ScriptLanguage {
  return scriptBlock?.lang?.includes('ts') ? 'ts' : 'js'
}

function resolveApiType(
  scriptSetupBlock: SFCScriptBlock | null,
  scriptBlock: SFCScriptBlock | null
): VueApiStyle {
  if (scriptSetupBlock || scriptBlock?.setup)
    return 'composition'
  return 'options'
}

function mergeStyles(
  styleBlocks: Array<{ content: string }>
): string | undefined {
  if (!styleBlocks.length)
    return undefined
  const css = styleBlocks
    .map(block => block.content.trim())
    .filter(Boolean)
    .join('\n\n')
  return css || undefined
}

export function convertVue2Demo(options: ConvertVue2DemoOptions): string {
  const { content, resourcePath, relativeUrl, isVue = true } = options
  const parts = getPartsOfDemo(content, resourcePath)
  const mergedParts = mergeParts({ parts, isVue })
  const [fileName] = getFileName(resourcePath)
  const vueComponent = genVueComponent(
    mergedParts,
    `${fileName}.vue`,
    relativeUrl
  )
  return vueComponent
}
