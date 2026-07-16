import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'
import { describe, expect, it } from 'vitest'
import { remarkNaiveToMarkdown } from '../remark-naive-to-markdown'

function createProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkNaiveToMarkdown)
    .use(remarkStringify)
}

describe('remarkNaiveToMarkdown', () => {
  it('removes HTML comments', async () => {
    const processor = createProcessor()
    const result = await processor.process('<!--anchor:on-->\n\n# Title')
    expect(String(result)).toContain('# Title')
    expect(String(result)).not.toContain('anchor')
  })

  it('removes component code blocks', async () => {
    const processor = createProcessor()
    const result = await processor.process(
      '# Title\n\n```component\nFoo: import Foo from "foo"\n```\n\nSome text.'
    )
    expect(String(result)).not.toContain('```component')
    expect(String(result)).not.toContain('import Foo')
    expect(String(result)).toContain('Some text.')
  })

  it('converts n-alert to blockquote', async () => {
    const processor = createProcessor()
    const result = await processor.process(
      '<n-alert type="warning" title="Caveats">The feature is <n-text strong>unstable</n-text>.</n-alert>'
    )
    expect(String(result)).toContain('> **Warning: Caveats**')
    expect(String(result)).toContain('> The feature is **unstable**.')
  })

  it('converts n-text code to inline code', async () => {
    const processor = createProcessor()
    const result = await processor.process(
      'Use <n-text code>n-button</n-text>.'
    )
    expect(String(result)).toContain('Use `n-button`.')
  })

  it('converts n-a to markdown link', async () => {
    const processor = createProcessor()
    const result = await processor.process(
      '<n-a href="https://example.com" target="_blank">Example</n-a>'
    )
    expect(String(result)).toContain('[Example](https://example.com)')
  })

  it('converts router-link to markdown link', async () => {
    const processor = createProcessor()
    const result = await processor.process(
      '<router-link to="/components/button">Button</router-link>'
    )
    expect(String(result)).toContain('[Button](/components/button)')
  })

  it('converts n-ul and li to markdown list', async () => {
    const processor = createProcessor()
    const result = await processor.process(
      '<n-alert title="Note"><n-ul align-text><li>First</li><li>Second</li></n-ul></n-alert>'
    )
    expect(String(result)).toContain('* First')
    expect(String(result)).toContain('* Second')
  })

  it('converts br to line break', async () => {
    const processor = createProcessor()
    const result = await processor.process('Line one<br>Line two')
    expect(String(result)).toContain('Line one\\\nLine two')
  })

  it('preserves image and link inside n-card template slots', async () => {
    const processor = createProcessor()
    const result = await processor.process(`<n-card>
  <template #cover>
    <img src="https://example.com/image.png" alt="Design">
  </template>
  <template #footer>
    <n-button tag="a" href="https://example.com/file.sketch">Download</n-button>
  </template>
</n-card>`)
    expect(String(result)).toContain('![Design](https://example.com/image.png)')
    expect(String(result)).toContain(
      '[Download](https://example.com/file.sketch)'
    )
  })

  it('drops unknown custom icon elements', async () => {
    const processor = createProcessor()
    const result = await processor.process(
      '<n-button>Download <n-icon><ArrowDownload16Regular /></n-icon></n-button>'
    )
    expect(String(result)).toContain('Download')
    expect(String(result)).not.toContain('ArrowDownload16Regular')
  })

  it('unwraps n-a with dynamic href bindings', async () => {
    const processor = createProcessor()
    const result = await processor.process(
      '<router-link to="grid" #="{ navigate, href }" custom><n-a :href="href" @click="navigate">Grid</n-a></router-link>'
    )
    expect(String(result)).toContain('[Grid](grid)')
    expect(String(result)).not.toContain('[Grid](#)')
    expect(String(result)).not.toContain('[[')
  })

  it('unwraps router-link with dynamic to bindings', async () => {
    const processor = createProcessor()
    const result = await processor.process(
      '<router-link :to="route">Link</router-link>'
    )
    expect(String(result)).toContain('Link')
    expect(String(result)).not.toContain('[')
  })

  it('preserves text inside unknown custom elements', async () => {
    const processor = createProcessor()
    const result = await processor.process(
      '<n-config-provider>Some note.</n-config-provider>'
    )
    expect(String(result)).toContain('Some note.')
    expect(String(result)).not.toContain('n-config-provider')
  })

  it('drops self-closing unknown custom elements', async () => {
    const processor = createProcessor()
    const result = await processor.process('Before <my-app /> after.')
    expect(String(result)).toContain('Before')
    expect(String(result)).toContain('after.')
    expect(String(result)).not.toContain('my-app')
  })

  it('unwraps n-button without a static href', async () => {
    const processor = createProcessor()
    const result = await processor.process('<n-button>Click me</n-button>')
    expect(String(result)).toContain('Click me')
    expect(String(result)).not.toContain('n-button')
  })

  it('keeps standard HTML code blocks untouched', async () => {
    const processor = createProcessor()
    const result = await processor.process('```html\n<div>Hello</div>\n```')
    expect(String(result)).toContain('```html')
    expect(String(result)).toContain('<div>Hello</div>')
  })

  it('strips brackets from self-closing component tags in inline code', async () => {
    const processor = createProcessor()
    const result = await processor.process(
      'Use `src-list` of `<n-image-group />` to preview images without `<n-image />`.'
    )
    expect(String(result)).toContain('Use `src-list` of `n-image-group`')
    expect(String(result)).toContain('without `n-image`.')
    expect(String(result)).not.toContain('<n-image-group')
    expect(String(result)).not.toContain('<n-image')
  })

  it('preserves generic type syntax in inline code', async () => {
    const processor = createProcessor()
    const result = await processor.process(
      '`\n<T extends AvatarGroupOption = AvatarGroupOption>\n`'
    )
    expect(String(result)).toContain('<T extends AvatarGroupOption')
  })

  it('preserves content between an unclosed wrapper and its close tag', async () => {
    const processor = createProcessor()
    const result = await processor.process(`<n-space vertical>
<n-alert title="Prerequisite" type="warning">Wrap in <n-text code>n-loading-bar-provider</n-text>.</n-alert>
For example:

\`\`\`html
<n-loading-bar-provider>
  <content />
</n-loading-bar-provider>
\`\`\`

</n-space>`)
    const output = String(result)
    expect(output).toContain('> **Warning: Prerequisite**')
    expect(output).toContain('For example:')
    expect(output).toContain('```html')
    expect(output).toContain('<n-loading-bar-provider>')
  })
})
