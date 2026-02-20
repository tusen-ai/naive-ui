import { transformSync } from 'oxc-transform'

export function tsToJs(content: string | null): string {
  if (!content) {
    return ''
  }
  const { code, errors } = transformSync('file.ts', content, {
    typescript: {
      onlyRemoveTypeImports: true
    }
  })
  if (errors.length > 0) {
    console.error('oxc-transform errors:', errors)
  }
  return code.trim()
}
