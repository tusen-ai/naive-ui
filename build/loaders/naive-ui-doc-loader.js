import { projectPath } from './project-path'
import { convertMd2ComponentDocumentation as convertMd2Doc } from './convert-md-to-doc'

export async function docLoader (content, path) {
  const env = process.env.NODE_ENV
  const relativeUrl = path.replace(projectPath + '/', '')
  return convertMd2Doc(content, relativeUrl, env)
}
