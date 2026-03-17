import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { format } from 'prettier'
import { ModuleKind, ScriptTarget, transpileModule } from 'typescript'

const prettierOptions = JSON.parse(
  readFileSync(resolve(__dirname, '../../.prettierrc'), 'utf-8')
)

export async function tsToJs(content: string): Promise<string> {
  const beforeTransformContent = content.replace(
    /\n(\s)*\n/g,
    '\n__blankline\n'
  )
  const result = transpileModule(beforeTransformContent, {
    compilerOptions: {
      module: ModuleKind.ESNext,
      target: ScriptTarget.ESNext,
      // Ensures the import is not removed or changed
      verbatimModuleSyntax: true
    }
  })
  const formatted = await format(result.outputText, {
    ...prettierOptions,
    parser: 'babel'
  })

  return formatted.trim().replace(/(__blankline(\n)?)+/g, '\n')
}
