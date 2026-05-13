import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

export function createBaseProcessor() {
  return unified().use(remarkParse).use(remarkGfm)
}
