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
            file: file,
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

async function transformMdToVueAndUpdateEntryFile (files) {
  for (const file of files) {
    const fileString = await loadFile(file.path)
    const tokens = marked.lexer(fileString)
    const parts = getPartsOfMdDemo(tokens)
    let vueDemo = ''
    if (parts.title || parts.content) {
      vueDemo += `<markdown>
# ${parts.title}
${parts.content ? `\n${parts.content}` : ''}
</markdown>\n`
    }
    if (parts.template) {
      vueDemo += `<template>
${parts.template}
</template>\n`
    }
    if (parts.script) {
      vueDemo += `<script lang="ts">
${parts.script}
</script>\n`
    }
    if (parts.style) {
      vueDemo += `<style>
${parts.style}
</style>\n`
    }
    await fs.remove(file.path)
    await fs.ensureDir(file.dir)
    await fs.writeFileSync(
      path.resolve(file.dir, `./${file.name}.vue`),
      vueDemo
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
