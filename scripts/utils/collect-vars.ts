const pattern = /var\(([^)]+)\)/g
const patternDetail = /var\(([^)]+)\)/
const commentPattern = /^( *)(\*|(\S\S)|(\S\*))/g

export function collectVars(code: string): string[] {
  const vars = new Set<string>()
  const lines = code.split('\n')
  lines.forEach((line) => {
    if (line.match(commentPattern)) {
      return
    }
    const result = line.match(pattern)
    if (result) {
      result.forEach((varExpr) => {
        const match = varExpr.match(patternDetail)
        if (match)
          vars.add(match[1])
      })
    }
  })
  return Array.from(vars).sort()
}

export function genDts(vars: string[]): string {
  console.log(vars)
  return `interface CssVars {
${vars.map(v => `  '${v}': string`).join('\n')}
}`
}
