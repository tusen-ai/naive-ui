import fs from 'fs-extra'
import { demoLoader } from '../loaders/naive-ui-demo-loader'
import { docLoader } from '../loaders/naive-ui-doc-loader'

export async function getTransformedVueSrc (path) {
  if (path.endsWith('.demo.md') || path.endsWith('.demo.vue')) {
    const code = await fs.readFile(path, 'utf-8')
    const type = path.endsWith('.vue') ? 'vue' : 'md'
    return demoLoader(code, path, type)
  } else if (path.endsWith('.md')) {
    const code = await fs.readFile(path, 'utf-8')
    return docLoader(code, path)
  }
}
