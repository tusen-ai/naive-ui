import remarkStringify from 'remark-stringify'
import { describe, expect, it } from 'vitest'
import { createBaseProcessor } from '../../../parser'
import { remarkExpandDemos } from '../remark-expand-demos'

function createProcessor() {
  return createBaseProcessor().use(remarkExpandDemos).use(remarkStringify)
}

describe('remarkExpandDemos', () => {
  it('expands demo code block into markdown and vue code block', async () => {
    const markdown = '```demo\nbasic.vue\n```'
    const result = await createProcessor().process({
      value: markdown,
      data: { sourceFilePath: 'src/list/demos/enUS/index.demo-entry.md' }
    })
    const output = String(result)
    expect(output).toContain('# Basic')
    expect(output).toContain('```vue')
    expect(output).not.toContain('```demo')
  })
})
