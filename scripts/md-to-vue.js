
import { convertFilesByComponentName } from './utils/loader'
export async function translateMdToVue () {
  const componentName = process.argv[2]
  await convertFilesByComponentName(componentName)
}

translateMdToVue()
