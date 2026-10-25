import path from 'node:path'
import { renderLlmsFile } from '..'
import { renderLlmsTxt } from '../llms-txt'
import {
  fence,
  getDescription,
  getPageEntries,
  renderDemo,
  renderPages,
  resolveLinks
} from '../pages'

const root = path.resolve(__dirname, '../../..')

describe('renderDemo', () => {
  it('gives the title, the description and the source without the markdown block', () => {
    const source = [
      '<markdown>',
      '# Basic',
      '',
      'Use <n-text code>type</n-text>.',
      '</markdown>',
      '',
      '<template>',
      '  <n-button>Go</n-button>',
      '</template>'
    ].join('\n')
    expect(renderDemo(source)).toBe(
      '### Basic\n\nUse `type`.\n\n```vue\n<template>\n  <n-button>Go</n-button>\n</template>\n```'
    )
  })

  it('makes the fence longer than any backtick run in the code', () => {
    expect(fence('a ``` b', 'md')).toBe('````md\na ``` b\n````')
  })
})

describe('resolveLinks', () => {
  it('points relative links at the Markdown version of the page', () => {
    expect(
      resolveLinks(
        'See [SSR](ssr#Caveat), [Button](../components/button) and [vfonts](https://github.com/07akioni/vfonts).',
        '/en-US/docs/nuxtjs'
      )
    ).toBe(
      'See [SSR](https://www.naiveui.com/en-US/docs/ssr.md#Caveat), [Button](https://www.naiveui.com/en-US/components/button.md) and [vfonts](https://github.com/07akioni/vfonts).'
    )
  })
})

describe('getDescription', () => {
  it('takes the first paragraph after the title', () => {
    expect(
      getDescription(
        '# Button\n\n> A note\n\nButton is used\nto trigger actions.\n\n## Demos'
      )
    ).toBe('Button is used to trigger actions.')
  })
})

describe('site pages', () => {
  it('has a Markdown source for every menu entry of both languages', async () => {
    for (const locale of ['en-US', 'zh-CN'] as const) {
      const pages = await renderPages(root, locale)
      expect(pages.length).toBe(getPageEntries(locale).length)
      for (const page of pages) {
        expect(page.markdown).toMatch(/^# /)
        expect(page.markdown).not.toMatch(/^```demo$/m)
      }
    }
  })

  it('expands the demos of a component page and leaves out debug demos', async () => {
    const markdown = await renderLlmsFile(root, '/en-US/components/button.md')
    expect(markdown).toMatch(/^### Basic$/m)
    expect(markdown).toContain('<n-button type="primary">')
    expect(markdown).toMatch(/^### Button Props$/m)
    expect(markdown).not.toContain('<markdown>')
  })

  it('serves only known paths', async () => {
    expect(await renderLlmsFile(root, '/en-US/components/nope.md')).toBe(
      undefined
    )
    expect(await renderLlmsFile(root, '/fr-FR/components/button.md')).toBe(
      undefined
    )
    expect(await renderLlmsFile(root, '/zh-CN/llms.txt')).toMatch(/^# Naive UI/)
  })
})

describe('renderLlmsTxt', () => {
  it('groups pages as in the menu, with descriptions, and puts Optional last', async () => {
    const pages = await renderPages(root, 'en-US')
    const text = renderLlmsTxt('en-US', pages)
    const sections = [...text.matchAll(/^## (.+)$/gm)].map(m => m[1])
    expect(sections[0]).toBe('Introduction')
    expect(sections).toContain('Common Components')
    expect(sections.at(-1)).toBe('Optional')
    expect(text).toContain(
      '- [Button](https://www.naiveui.com/en-US/components/button.md): Button is used to trigger some actions.'
    )
  })
})
