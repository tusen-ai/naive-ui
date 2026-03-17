import { convertVue2Demo } from './convert-vue-to-demo'
import projectPath from './project-path'

export default async function (content: string, path: string): Promise<string> {
  const relativeUrl = path.replace(`${projectPath}/`, '')
  return convertVue2Demo({
    content,
    relativeUrl,
    resourcePath: path,
    isVue: true
  })
}
