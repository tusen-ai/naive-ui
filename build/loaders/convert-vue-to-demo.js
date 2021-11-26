const { genVueComponent, getFileName, mergeParts } = require('./convert-md-to-demo')

function getPartsOfDemo (text) {
  const template = text.match(/<template(([\s\S])*?)<\/template>/)[0]
  const script = text.match(/<script.*?>([\s\S]+?)<\/script>/)[1]
  const style = text.match(/<style(([\s\S])*?)<\/style>/)?.[0]
  const title = text.match(/<title(.*)?>(.*)<\/title>(.*)/)[2]
  const content = text.match(/<content(.*)?>(.*)<\/content>(.*)/)[2]
  const languageArr = text.match(/<script .*?lang="(.+?)"/)
  let languageType
  if (!languageArr || !languageArr.length) languageType = 'JS'
  else languageType = languageArr[1]
  return {
    template: template,
    script: script,
    style: style,
    title: title,
    content: content,
    language: languageType
  }
}

function convertVue2Demo (content, { resourcePath, relativeUrl }) {
  const noRunning = /<!--no-running-->/.test(content)
  const parts = getPartsOfDemo(content)
  console.log('parts', parts)
  const mergedParts = mergeParts(parts)
  const [fileName] = getFileName(resourcePath)
  const vueComponent = genVueComponent(
    mergedParts,
    fileName,
    relativeUrl,
    noRunning
  )
  return vueComponent
}

module.exports = convertVue2Demo
