import { naiveHtmlToMarkdown } from '../naive-html'

describe('naiveHtmlToMarkdown', () => {
  it('turns n-text code into a code span', () => {
    expect(
      naiveHtmlToMarkdown('Use <n-text code>&lt;n-input&gt;</n-text> here.')
    ).toBe('Use `<n-input>` here.')
  })

  it('turns n-alert into a quote with its title', () => {
    const source = [
      '<n-alert title="Caveat" type="warning" :bordered="false">',
      '  Close tags like <n-text code>n-input</n-text>.',
      '</n-alert>'
    ].join('\n')
    expect(naiveHtmlToMarkdown(source)).toBe(
      '> **Caveat**\n>\n> Close tags like `n-input`.'
    )
  })

  it('turns the list items of a block into a list', () => {
    const source = [
      '<n-alert title="Notice">',
      '  <n-ul align-text>',
      '    <li>',
      '      First',
      '    </li>',
      '    <li>Second</li>',
      '  </n-ul>',
      '</n-alert>'
    ].join('\n')
    expect(naiveHtmlToMarkdown(source)).toBe(
      '> **Notice**\n>\n> - First\n> - Second'
    )
  })

  it('turns elements with href or to into links and keeps images', () => {
    expect(
      naiveHtmlToMarkdown(
        'See <router-link to="grid" custom><n-a :href="href">Grid</n-a></router-link>.'
      )
    ).toBe('See [Grid](grid).')
    expect(
      naiveHtmlToMarkdown(
        '<n-card>\n<img src="a.png">\n<n-button tag="a" href="b.sketch">Sketch <Icon /></n-button>\n</n-card>'
      )
    ).toBe('![](a.png)\n[Sketch](b.sketch)')
  })

  it('keeps code blocks and code spans as they are', () => {
    const source = [
      'Write `<n-text code>x</n-text>` like this:',
      '',
      '```html',
      '<n-alert title="Kept">',
      '</n-alert>',
      '```'
    ].join('\n')
    expect(naiveHtmlToMarkdown(source)).toBe(source)
  })

  it('drops a tag left alone on its line by a code block inside its block', () => {
    const source = [
      '<n-space vertical>',
      'Text',
      '',
      '```js',
      'code()',
      '```',
      '',
      '</n-space>'
    ].join('\n')
    expect(naiveHtmlToMarkdown(source)).toBe('Text\n\n```js\ncode()\n```\n\n')
  })
})
