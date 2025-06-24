export function fixMarkdownBold(text: string): string {
  let asteriskCount = 0
  let boldMarkerCount = 0
  let result = ''
  let inCodeBlock = false
  let inInlineCode = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]

    // Handle code blocks
    if (text.slice(i, i + 3) === '```') {
      inCodeBlock = !inCodeBlock
      result += '```'
      i += 2
      continue
    }

    // Handle inline code
    if (char === '`') {
      inInlineCode = !inInlineCode
      result += '`'
      continue
    }

    // Process asterisks only if not in code
    if (char === '*' && !inInlineCode && !inCodeBlock) {
      asteriskCount++

      if (asteriskCount === 2) {
        boldMarkerCount++
      }

      if (asteriskCount > 2) {
        result += char
        continue
      }

      // Add space before opening bold marker if needed
      if (asteriskCount === 2 && boldMarkerCount % 2 === 1) {
        const nextChar = i + 1 < text.length ? text[i + 1] : ''
        const isNextCharSymbol = /[\p{P}\p{S}]/u.test(nextChar)
        if (isNextCharSymbol) {
          // 已经向 result 写入了第一个 '*'，先删掉它，然后输出 ' **'
          result = `${result.slice(0, -1)} **`
          continue
        }
      }

      // Add space after closing bold marker if needed
      if (asteriskCount === 2 && boldMarkerCount % 2 === 0) {
        const prevChar = i > 0 ? text[i - 2] : ''
        const isPrevCharSymbol = /[\p{P}\p{S}]/u.test(prevChar)

        result += i + 1 < text.length && text[i + 1] !== ' ' && isPrevCharSymbol ? '* ' : '*'
      }
      else {
        result += '*'
      }
    }
    else {
      result += char
      asteriskCount = 0
    }
  }
  return result
}
