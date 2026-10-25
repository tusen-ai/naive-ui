import { templateToMarkdown } from '../template-to-markdown'

describe('templateToMarkdown', () => {
  it('turns n-text code into a code span', () => {
    expect(templateToMarkdown('<n-text code>&lt;n-input&gt;</n-text>')).toBe(
      '`<n-input>`'
    )
  })

  it('turns n-alert into a quote that starts with its title', () => {
    const html = [
      '<n-alert title="Caveat" type="warning" :bordered="false">',
      '  Close tags like <n-text code>n-input</n-text>.',
      '</n-alert>'
    ].join('\n')
    expect(templateToMarkdown(html)).toBe(
      '> **Caveat**\n>\n> Close tags like `n-input`.'
    )
  })

  it('keeps the items of a list together', () => {
    const html = [
      '<n-alert title="Notice">',
      '  <n-ul align-text>',
      '    <li>',
      '      First',
      '    </li>',
      '    <li>Second</li>',
      '  </n-ul>',
      '</n-alert>'
    ].join('\n')
    expect(templateToMarkdown(html)).toBe(
      '> **Notice**\n>\n> - First\n> - Second'
    )
  })

  it('turns an element with a static href or to into a link', () => {
    expect(
      templateToMarkdown(
        'See <router-link to="grid" custom><n-a :href="href">Grid</n-a></router-link>.'
      )
    ).toBe('See [Grid](grid).')
  })

  it('keeps images and drops other elements, keeping their content', () => {
    const html = [
      '<n-card size="small">',
      '  <template #cover><img src="a.png"></template>',
      '  <n-button tag="a" href="b.sketch">Sketch <Icon /></n-button>',
      '</n-card>'
    ].join('\n')
    expect(templateToMarkdown(html)).toBe('![](a.png)\n\n[Sketch](b.sketch)')
  })

  it('renders what it can of a block a code block cut in two', () => {
    expect(templateToMarkdown('<n-space vertical>\nText')).toBe('Text')
    expect(templateToMarkdown('</n-space>')).toBe('')
  })
})
