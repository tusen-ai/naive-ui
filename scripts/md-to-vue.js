const { convertFilesByComponentName } = require('./utils/loader')
async function translateMdToVue () {
  const componentName = process.argv[2]
  await convertFilesByComponentName(componentName)
}

translateMdToVue()
