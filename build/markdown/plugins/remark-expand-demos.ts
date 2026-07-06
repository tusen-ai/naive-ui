import type { Code, Heading, Root, RootContent } from 'mdast'
import type { Transformer } from 'unified'
import fs from 'node:fs'
import path from 'node:path'
import { visit } from 'unist-util-visit'
import { createBaseProcessor } from '../parser'

const mdParser = createBaseProcessor()

export interface RemarkExpandDemosOptions {
  onWarn?: (message: string, error?: unknown) => void
  strict?: boolean
}

function resolveDemoFileName(filename: string): string {
  if (filename.endsWith('.demo.vue'))
    return filename
  if (filename.endsWith('.vue'))
    return filename.replace(/\.vue$/, '.demo.vue')
  return `${filename}.demo.vue`
}

function shiftHeadings(tree: Root, depthOffset: number): void {
  visit(tree, 'heading', (node: Heading) => {
    node.depth = Math.min(6, node.depth + depthOffset) as Heading['depth']
  })
}

export function remarkExpandDemos(
  options: RemarkExpandDemosOptions = {}
): Transformer<Root, Root> {
  const { onWarn, strict = false } = options

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

          const demoFileName = resolveDemoFileName(filename)
          const demoFilePath = path.join(sourceDir, demoFileName)

          try {
            const demoContent = await fs.promises.readFile(
              demoFilePath,
              'utf-8'
            )

            const mdPart = demoContent.match(/<markdown>([\s\S]*?)<\/markdown>/)
            if (mdPart) {
              const mdTree = mdParser.parse(mdPart[1].trim())
              shiftHeadings(mdTree, 2)
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
            const message = `[remark-expand-demos] Failed to read ${demoFilePath}`
            if (strict)
              throw new Error(message, { cause: e })
            onWarn?.(message, e)
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
