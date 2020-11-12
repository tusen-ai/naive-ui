const path = require('path')
const fs = require('fs')
const template = fs.readFileSync(path.join(__dirname, 'ComponentDocumentationEntryTemplate.vue')).toString()

// user may use different index for a locale
// for example
// enUS/index.md
// zhCN/index.md
//
// enUS/index.demo-entry.md
// zhCN/index.demo-entry.md
//
// enUS/index.vue
// zhCN/index.vue

module.exports = (entryPath) => {
  let resultTemplate = template
  const replaceReg = /index/g
  try {
    const isOnlyMD = fs.existsSync(path.join(entryPath, '../zhCN/index.md'))
    const isOnlyVue = fs.existsSync(path.join(entryPath, '../zhCN/index.vue'))
    if (isOnlyMD) {
      resultTemplate = template.replace(replaceReg, 'index.md')
    } else if (isOnlyVue) {
      resultTemplate = template.replace(replaceReg, 'index.vue')
    } else {
      resultTemplate = template.replace(replaceReg, 'index.demo-entry.md')
    }
  } catch (error) {
    resultTemplate = template.replace(replaceReg, 'index.demo-entry.md')
  }
  return resultTemplate
}
