import { promises as fs } from 'node:fs'
import { walk } from '.'

export async function replaceDefine(
  dirs: string[],
  defines: Record<string, string>
): Promise<void> {
  const defineKeys = Object.keys(defines)
  const patterns: Record<string, RegExp> = {}
  defineKeys.forEach((key) => {
    patterns[key] = new RegExp(key, 'g')
  })
  for (const dir of dirs) {
    for await (const p of walk(dir)) {
      if (p.endsWith('.vue'))
        continue
      let code = await fs.readFile(p, 'utf-8')
      for (const key of defineKeys) {
        const pattern = patterns[key]
        if (pattern.test(code)) {
          code = code.replace(pattern, defines[key])
        }
      }
      await fs.writeFile(p, code)
    }
  }
}
