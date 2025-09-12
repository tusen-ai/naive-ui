export function splitAndMarkByRegex(
  str: string,
  regex: RegExp
): Array<{
    text: string
    isMatch: boolean
  }> {
  if (!regex.global) {
    throw new Error(
      'splitAndMarkByRegex requires a global regex (with "g" flag)'
    )
  }

  const result = []
  let lastIndex = 0
  for (const match of str.matchAll(regex)) {
    const { index } = match
    if (index > lastIndex) {
      result.push({ text: str.slice(lastIndex, index), isMatch: false })
    }

    result.push({ text: match[0], isMatch: true })

    lastIndex = index + match[0].length
  }

  if (lastIndex < str.length) {
    result.push({ text: str.slice(lastIndex), isMatch: false })
  }

  return result
}
