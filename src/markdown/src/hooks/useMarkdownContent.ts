import { preprocessLaTeX } from './latex'
import { fixMarkdownBold } from './utils'

export function useMarkdownContent(content: string, options): string | undefined {
  const { enableLatex } = options
  // console.log(content)

  if (enableLatex) {
    content = preprocessLaTeX(content)
  }

  return fixMarkdownBold(content)
}
