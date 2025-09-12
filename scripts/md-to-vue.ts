import { argv } from 'node:process'
import { convertFilesByComponentName } from './utils/loader'

async function translateMdToVue(): Promise<void> {
  const componentName = argv[2]
  await convertFilesByComponentName(componentName)
}

translateMdToVue()
