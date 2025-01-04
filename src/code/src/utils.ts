import { useConfig } from '../../_mixins'
export default (): any => {
  const { mergedClsPrefixRef } = useConfig()
  return {
    'after:highlight': (result: any) => {
      const htmlLines = result.value.split('\n')
      let spanStack: string[] = []
      result.value = htmlLines
        .map((content: string, index: number) => {
          let startSpanIndex, endSpanIndex
          let needle = 0
          content = spanStack.join('') + content
          spanStack = []
          while (true) {
            const remainingContent = content.slice(needle)
            startSpanIndex = remainingContent.indexOf('<span')
            endSpanIndex = remainingContent.indexOf('</span')
            if (startSpanIndex === -1 && endSpanIndex === -1) {
              break
            }
            if (
              endSpanIndex === -1 ||
              (startSpanIndex !== -1 && startSpanIndex < endSpanIndex)
            ) {
              const nextSpan = /<span .+?>/.exec(remainingContent)
              if (nextSpan === null) {
                // never: but ensure no exception is raised if it happens some day.
                break
              }
              spanStack.push(nextSpan[0])
              needle += startSpanIndex + nextSpan[0].length
            } else {
              spanStack.pop()
              needle += endSpanIndex + 1
            }
          }
          if (spanStack.length > 0) {
            content += Array(spanStack.length).fill('</span>').join('')
          }
          let retString = '<div '
          retString += `class="${mergedClsPrefixRef.value}-code-line"`
          retString += `>${content}</div>`
          return retString
        })
        .join('')
    }
  }
}
