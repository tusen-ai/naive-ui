import { transformSync } from 'esbuild'

export const tsToJs = (content) => {
  if (!content) {
    return ''
  }
  // esbuild will remove blank line
  const beforeTransformContent = content.replace(
    /\n(\s)*\n/g,
    '\n__blankline\n'
  )
  const { code } = transformSync(beforeTransformContent, {
    loader: 'ts',
    minify: false,
    minifyWhitespace: false,
    charset: 'utf8'
  })
  return code.trim().replace(/__blankline;/g, '')
}
