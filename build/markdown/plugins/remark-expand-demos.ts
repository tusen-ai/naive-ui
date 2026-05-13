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
    const pending: Promise<{ index: number, replacement: RootContent[] }>[] = []

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
            const demoContent = await fs.promises.readFile(
              demoFilePath,
              'utf-8'
            )

            const mdPart = demoContent.match(/<markdown>([\s\S]*?)<\/markdown>/)
            if (mdPart) {
              const mdTree = mdParser.parse(mdPart[1].trim())
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
        return { index: i, replacement }
      }
      pending.push(task())
    }

    const results = await Promise.all(pending)
    results
      .sort((a, b) => b.index - a.index)
      .forEach((r) => {
        children.splice(r.index, 1, ...r.replacement)
      })
  }
}
