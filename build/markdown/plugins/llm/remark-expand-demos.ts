import type { Code, Root, RootContent } from 'mdast'
import type { Transformer } from 'unified'
import fs from 'node:fs'
import path from 'node:path'
import { parseDemoVue } from '../../demo/parse-demo-vue'

interface Replacement {
  index: number
  nodes: RootContent[]
}

/**
 * Remark plugin that expands ```demo code blocks into the content of the
 * referenced .demo.vue files.
 */
export function remarkExpandDemos(): Transformer<Root, Root> {
  return async (tree, file) => {
    const sourceFilePath = (file.data.sourceFilePath as string) || ''
    const sourceDir = path.dirname(sourceFilePath)
    const children = tree.children

    const replacements: Replacement[] = []

    for (let i = children.length - 1; i >= 0; i--) {
      const node = children[i]
      if (node.type !== 'code' || (node as Code).lang !== 'demo') {
        continue
      }

      const rawFilenames = (node as Code).value.split('\n')
      const filenames: string[] = []
      for (const filename of rawFilenames) {
        const trimmed = filename.trim()
        if (trimmed) {
          filenames.push(trimmed)
        }
      }

      const expandedNodes: RootContent[] = []

      for (const filename of filenames) {
        if (filename.includes('debug')) {
          continue
        }

        const demoFileName = filename.replace(/\.vue$/, '.demo.vue')
        const demoFilePath = path.join(sourceDir, demoFileName)

        if (!fs.existsSync(demoFilePath)) {
          console.warn(
            `[remark-expand-demos] Demo file not found: ${demoFilePath}`
          )
          continue
        }

        const content = fs.readFileSync(demoFilePath, 'utf-8')
        expandedNodes.push(...parseDemoVue(content))
      }

      replacements.push({ index: i, nodes: expandedNodes })
    }

    for (const { index, nodes } of replacements) {
      children.splice(index, 1, ...nodes)
    }
  }
}
