const path = require('path')
const fs = require('fs-extra')
const { marked } = require('marked')

const fileRegex = /\.demo\.md$/

function getPartsOfMdDemo (tokens) {
  let template = null
  let script = null
  let style = null
  let title = null
  let content = null
  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 1) {
      title = token.text
    } else if (
      token.type === 'code' &&
      (token.lang === 'template' || token.lang === 'html')
    ) {
      template = token.text
    } else if (
      token.type === 'code' &&
      (token.lang === 'script' || token.lang === 'js' || token.lang === 'ts')
    ) {
      script = token.text
    } else if (
      token.type === 'code' &&
      (token.lang === 'style' || token.lang === 'css')
    ) {
      style = token.text
    } else if (token.type === 'paragraph') {
      content = token.text
    }
  }
  return {
    template,
    script,
    style,
    title,
    content
  }
}

function createBlockTemplate (tag, content, attrs) {
  const attrsStr = attrs
    ? Object.keys(attrs).reduce((attrsStr, key) => {
      return attrsStr + ` ${key}="${attrs[key]}"`
    }, '')
    : ''
  return `<${tag}${attrsStr}>
${content}
</${tag}>`
}

async function loadFile (filepath) {
  if (fs.existsSync(filepath)) {
    return await fs.readFile(filepath, 'utf-8')
  }
  return undefined
}

async function loadAllMdFile (filePathArr) {
  const filesArr = []
  for (let i = 0; i < filePathArr.length; i++) {
    const filePath = filePathArr[i]
    if (fs.existsSync(filePath)) {
      const files = await fs.readdir(filePath)
      const filesObjArr = files
        .filter((file) => fileRegex.test(file))
        .map((file) => {
          const index = file.lastIndexOf('.')
          return {
            path: `${filePath}/${file}`,
            dir: filePath,
            file,
            name: file.slice(0, index)
          }
        })
      filesArr.push(...filesObjArr)
    }
  }
  return filesArr
}

async function updateIndexEntryDemo (file) {
  let indexFileContent = await loadFile(
    path.resolve(file.dir, './index.demo-entry.md')
  )
  const index = file.name.indexOf('.')
  const name = file.name.slice(0, index)
  indexFileContent = indexFileContent.replace(name, `${name}.vue`)
  await fs.writeFileSync(
    path.resolve(file.dir, './index.demo-entry.md'),
    indexFileContent
  )
}

const LINE_SPACE = '\n\n'
async function transformMdToVueAndUpdateEntryFile (files) {
  for (const file of files) {
    const fileString = await loadFile(file.path)
    const tokens = marked.lexer(fileString)
    const parts = getPartsOfMdDemo(tokens)
    const vueDemoBlocks = []
    if (parts.title || parts.content) {
      vueDemoBlocks.push(
        createBlockTemplate(
          'markdown',
          `# ${parts.title}${
            parts.content ? `${LINE_SPACE}${parts.content}` : ''
          }`
        )
      )
    }
    if (parts.template) {
      vueDemoBlocks.push(createBlockTemplate('template', parts.template))
    }
    if (parts.script) {
      vueDemoBlocks.push(
        createBlockTemplate('script', parts.script, {
          lang: 'ts'
        })
      )
    }
    if (parts.style) {
      vueDemoBlocks.push(createBlockTemplate('style', parts.style))
    }
    await fs.remove(file.path)
    await fs.ensureDir(file.dir)
    await fs.writeFileSync(
      path.resolve(file.dir, `./${file.name}.vue`),
      `${vueDemoBlocks.join(LINE_SPACE)}\n`
    )
    // should be able to be modified together
    await updateIndexEntryDemo(file)
  }
}

const COMPONENT_ROOT = path.resolve(__dirname, '../../src')

async function convertFilesByComponentName (componentName) {
  const folders = ['zhCN', 'enUS'].map((item) =>
    path.resolve(COMPONENT_ROOT, `${componentName}/demos/${item}`)
  )
  if (folders.length) {
    const files = await loadAllMdFile(folders)
    transformMdToVueAndUpdateEntryFile(files)
  }
}

module.exports = {
  convertFilesByComponentName
}
