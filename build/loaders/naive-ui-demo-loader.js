import { convertMd2Demo } from './convert-md-to-demo'
import { convertVue2Demo } from './convert-vue-to-demo'
import { projectPath } from './project-path'

export function demoLoader (content, path, type) {
  const relativeUrl = path.replace(projectPath + '/', '')
  if (type === 'vue') {
    return convertVue2Demo(content, {
      relativeUrl,
      resourcePath: path,
      isVue: true
    })
  }
  return convertMd2Demo(content, {
    relativeUrl,
    resourcePath: path,
    isVue: false
  })
}
