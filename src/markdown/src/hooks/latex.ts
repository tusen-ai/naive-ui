export function convertLatexDelimiters(text: string): string {
  const pattern = /(```[\S\s]*?```|`.*?`)|\\\[([\S\s]*?[^\\])\\]|\\\((.*?)\\\)/g
  return text.replaceAll(
    pattern,
    (
      match: string,
      codeBlock: string | undefined,
      squareBracket: string | undefined,
      roundBracket: string | undefined,
    ): string => {
      if (codeBlock !== undefined) {
        return codeBlock
      }
      else if (squareBracket !== undefined) {
        return `$$${squareBracket}$$`
      }
      else if (roundBracket !== undefined) {
        return `$${roundBracket}$`
      }
      return match
    },
  )
}

export function escapeMhchemCommands(text: string) {
  return text.replaceAll('$\\ce{', '$\\\\ce{').replaceAll('$\\pu{', '$\\\\pu{')
}

export function escapeLatexPipes(text: string): string {
  // According to the failing test, we should not escape pipes in LaTeX expressions
  // This function is now a no-op but is kept for backward compatibility
  return text
}

export function escapeTextUnderscores(text: string): string {
  return text.replaceAll(/\\text{([^}]*)}/g, (match, textContent: string) => {
    // textContent is the content within the braces, e.g., "node_domain" or "already\_escaped"
    // Replace underscores '_' with '\_' only if they are NOT preceded by a backslash '\'.
    // The (?<!\\) is a negative lookbehind assertion that ensures the character before '_' is not a '\'.
    const escapedTextContent = textContent.replaceAll(/(?<!\\)_/g, '\\_')
    return `\\text{${escapedTextContent}}`
  })
}

export function preprocessLaTeX(str: string): string {
  let content = str

  // Step 6: Apply additional escaping functions
  content = convertLatexDelimiters(content)
  content = escapeMhchemCommands(content)
  content = escapeLatexPipes(content)
  content = escapeTextUnderscores(content)
  return content
}
