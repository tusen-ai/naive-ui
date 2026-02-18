import type { Code, Root, RootContent } from 'mdast'
import type { Transformer } from 'unified'
import fs from 'node:fs'
import path from 'node:path'
import { createBaseProcessor } from '../parser'

const mdParser = createBaseProcessor()

export function remarkExpandDemos(): Transformer<Root, Root> {
  return async (tree, file) => {
    const sourceFilePath = (file.data.sourceFilePath as string) || ''
    const sourceDir = path.dirname(sourceFilePath)
    const children = tree.children
    const tasks: Promise<void>[] = []

    for (let i = children.length - 1; i >= 0; i--) {
      const node = children[i]
      if (node.type !== 'code' || (node as Code).lang !== 'demo')
        continue

      const filenames = (node as Code).value.split('\n').map(f => f.trim()).filter(Boolean)

      const task = async () => {
        const replacement: RootContent[] = []

        for (const filename of filenames) {
          if (filename.includes('debug'))
            continue

          const demoFileName = filename.replace(/\.vue$/, '.demo.vue')
          const demoFilePath = path.join(sourceDir, demoFileName)

          try {
            await fs.promises.access(demoFilePath)
            const demoContent = await fs.promises.readFile(
              demoFilePath,
              'utf-8'
            )

            const mdMatch = demoContent.match(
              /<markdown>([\s\S]*?)<\/markdown>/
            )
            if (mdMatch) {
              const mdTree = mdParser.parse(mdMatch[1].trim())
              replacement.push(...mdTree.children)
            }

            const codePart = demoContent
              .replace(/<markdown>[\s\S]*?<\/markdown>\n?/, '')
              .trim()

            if (codePart) {
              replacement.push({
                type: 'code',
                lang: 'vue',
                value: codePart
              })
            }
          }
          catch (e) {
            console.warn(
              `[remark-expand-demos] Failed to read ${demoFilePath}`,
              e
            )
          }
        }
        children.splice(i, 1, ...replacement)
      }
      tasks.push(task())
    }
    await Promise.all(tasks)
  }
}
