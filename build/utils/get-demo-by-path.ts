import fs from 'fs-extra'
import demoLoader from '../loaders/naive-ui-demo-loader'
import docLoader from '../loaders/naive-ui-doc-loader'

export async function getTransformedVueSrc(
  path: string
): Promise<string | undefined> {
  if (path.endsWith('.demo.vue')) {
    const code = await fs.readFile(path, 'utf-8')
    return demoLoader(code, path)
  }
  else if (path.endsWith('.md')) {
    const code = await fs.readFile(path, 'utf-8')
    return await docLoader(code, path)
  }
}
