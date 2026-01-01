import process from 'node:process'
import { convertMd2ComponentDocumentation } from './convert-md-to-doc'
import projectPath from './project-path'

export default async function (content: string, path: string): Promise<string> {
  const env = process.env.NODE_ENV
  const relativeUrl = path.replace(`${projectPath}/`, '')
  return await convertMd2ComponentDocumentation(content, relativeUrl, env)
}
