const pattern = /var\(([^)]+)\)/g
const patternDetail = /var\(([^)]+)\)/
const commentPattern = /^( *)(\*|(\/\/)|(\/\*))/g

/**
 * Collect css vars
 * @param {string} code
 */
export function collectVars (code) {
  const vars = new Set()
  const lines = code.split('\n')
  lines.forEach((line) => {
    if (line.match(commentPattern)) return
    const result = line.match(pattern)
    if (result) {
      result.forEach((varExpr) => {
        vars.add(varExpr.match(patternDetail)[1])
      })
    }
  })
  return Array.from(vars).sort()
}

/**
 * @param {string[]} vars
 */
export function genDts (vars) {
  console.log(vars)
  return `interface CssVars {
${vars.map((v) => "  '" + v + "': string").join('\n')}
}\n`
}
