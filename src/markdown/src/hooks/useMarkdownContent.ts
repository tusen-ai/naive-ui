import { ref } from 'vue'
import { isLastFormulaRenderable, preprocessLaTeX } from './latex'
import { fixMarkdownBold } from './utils'

export function useMarkdownContent(content: string, options): string | undefined {
  const { enableLatex, animated } = options
  const validContent = ref('')
  const prevProcessedContent = ref({
    current: ''
  })

  // Process LaTeX expressions
  if (enableLatex) {
    content = preprocessLaTeX(content)
    console.log(content)
  }

  let processedContent = fixMarkdownBold(content)

  // Special handling for LaTeX content when animated
  if (animated && enableLatex) {
    const isRenderable = isLastFormulaRenderable(processedContent);
    if (!isRenderable && validContent) {
      processedContent = validContent.value;
    }
  }

  // Only update state if content changed (prevents unnecessary re-renders)
    if (processedContent !== prevProcessedContent.value.current) {
      validContent.value = processedContent;
      prevProcessedContent.value.current = processedContent;
    }

  return processedContent
}
