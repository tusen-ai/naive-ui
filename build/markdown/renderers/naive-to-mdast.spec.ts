import remarkGfm from 'remark-gfm'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'
import { describe, expect, it } from 'vitest'
import {
  cleanInlineCodeValue,
  hastToMdast,
  parseHtmlFragment
} from './naive-to-mdast'

function toMarkdown(html: string, document = true): string {
  const mdast = hastToMdast(parseHtmlFragment(html), { document })
  return unified().use(remarkGfm).use(remarkStringify).stringify(mdast).trim()
}

describe('hastToMdast', () => {
  it('renders n-alert as blockquote with prefix', () => {
    expect(
      toMarkdown(
        '<n-alert type="warning" title="Caveats">The feature is unstable.</n-alert>'
      )
    ).toBe('> **Warning: Caveats**\n> The feature is unstable.')
  })

  it('renders n-text code as inline code', () => {
    expect(toMarkdown('<n-text code>n-button</n-text>')).toBe('`n-button`')
  })

  it('cleans component tags inside n-text code', () => {
    expect(
      toMarkdown('<n-text code>&lt;n-input&gt;&lt;/n-input&gt;</n-text>')
    ).toBe('`n-input`')
  })

  it('renders n-text strong as strong', () => {
    expect(toMarkdown('<n-text strong>bold</n-text>')).toBe('**bold**')
  })

  it('renders n-a as markdown link', () => {
    expect(toMarkdown('<n-a href="https://example.com">Example</n-a>')).toBe(
      '[Example](https://example.com)'
    )
  })

  it('unwraps n-a with dynamic href', () => {
    expect(toMarkdown('<n-a :href="href">Grid</n-a>')).toBe('Grid')
  })

  it('renders router-link with static to as link', () => {
    expect(
      toMarkdown('<router-link to="/components/button">Button</router-link>')
    ).toBe('[Button](/components/button)')
  })

  it('unwraps router-link with dynamic to', () => {
    expect(toMarkdown('<router-link :to="route">Link</router-link>')).toBe(
      'Link'
    )
  })

  it('renders n-button with static href as link', () => {
    expect(
      toMarkdown(
        '<n-button tag="a" href="https://example.com">Download</n-button>'
      )
    ).toBe('[Download](https://example.com)')
  })

  it('unwraps n-button without href', () => {
    expect(toMarkdown('<n-button>Click me</n-button>')).toBe('Click me')
  })

  it('renders br as hard break', () => {
    expect(toMarkdown('Line one<br>Line two', false)).toBe(
      'Line one\\\nLine two'
    )
  })

  it('renders img as markdown image', () => {
    expect(toMarkdown('<img src="x.png" alt="Design">', false)).toBe(
      '![Design](x.png)'
    )
  })

  it('unwraps unknown custom elements preserving text', () => {
    expect(
      toMarkdown('<n-config-provider>Some note.</n-config-provider>')
    ).toBe('Some note.')
  })

  it('drops self-closing unknown custom elements', () => {
    expect(toMarkdown('Before <my-app /> after.', false)).toBe('Before after.')
  })

  it('renders em as italic', () => {
    expect(toMarkdown('<em>italic</em>', false)).toBe('*italic*')
  })

  it('renders table as markdown table', () => {
    expect(
      toMarkdown(
        '<table><thead><tr><th>A</th><th>B</th></tr></thead>'
        + '<tbody><tr><td>1</td><td>2</td></tr></tbody></table>'
      )
    ).toBe('| A | B |\n| - | - |\n| 1 | 2 |')
  })

  it('unwraps n-card and template slots to their content', () => {
    expect(
      toMarkdown(
        '<n-card><template #cover><img src="x.png" alt="Design"></template></n-card>'
      )
    ).toBe('![Design](x.png)')
  })

  it('renders n-ul as unordered list', () => {
    expect(toMarkdown('<n-ul><li>First</li><li>Second</li></n-ul>')).toBe(
      '* First\n* Second'
    )
  })

  it('renders n-alert with list content', () => {
    expect(
      toMarkdown(
        '<n-alert title="Note"><n-ul><li>First</li><li>Second</li></n-ul></n-alert>'
      )
    ).toBe('> **Note**\n>\n> * First\n> * Second')
  })
})

describe('cleanInlineCodeValue', () => {
  it('strips brackets from self-closing component tags', () => {
    expect(cleanInlineCodeValue('<n-image-group />')).toBe('n-image-group')
    expect(cleanInlineCodeValue('<n-image />')).toBe('n-image')
  })

  it('strips brackets from paired component tags', () => {
    expect(cleanInlineCodeValue('<n-input></n-input>')).toBe('n-input')
  })

  it('preserves generic type syntax', () => {
    expect(
      cleanInlineCodeValue('<T extends AvatarGroupOption = AvatarGroupOption>')
    ).toBe('<T extends AvatarGroupOption = AvatarGroupOption>')
  })

  it('preserves non-tag inline code', () => {
    expect(cleanInlineCodeValue('src-list')).toBe('src-list')
  })
})
