import type { Heading, Nodes, Root } from 'mdast'
import GithubSlugger from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { parse as parseYaml } from 'yaml'

// The docs Markdown as a syntax tree (mdast), shared by the site pages and
// the Markdown served to LLMs

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkFrontmatter)

/** Settings of a docs page, from its YAML frontmatter. */
export interface PageConfig {
  /** Show the anchor list on a page without demos */
  anchor?: boolean
  /** Columns the demos are laid out in, 2 by default */
  demoColumns?: number
}

export function parseMarkdown(text: string): Root {
  return processor.parse(text)
}

export function getPageConfig(tree: Root): PageConfig {
  const frontmatter = tree.children.find(node => node.type === 'yaml')
  return frontmatter ? (parseYaml(frontmatter.value) ?? {}) : {}
}

/**
 * Gives each heading an id from its text, the way GitHub does (`API` ->
 * `api`). Anchor links read it back with `getHeadingId`.
 */
export function slugHeadings(tree: Root): void {
  const slugger = new GithubSlugger()
  visit(tree, 'heading', (node) => {
    const id = slugger.slug(toString(node))
    node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } }
  })
}

export function getHeadingId(heading: Heading): string {
  return String(heading.data?.hProperties?.id)
}

export function isHeading(node: Nodes, depth: number): node is Heading {
  return node.type === 'heading' && node.depth === depth
}

/** The Markdown source a node was parsed from. */
export function getSource(node: Nodes, text: string): string {
  return text.slice(node.position!.start.offset, node.position!.end.offset)
}

export { toString as getText }
