import path from 'node:path'
import { renderLlmsFile } from '..'
import { renderLlmsTxt } from '../llms-txt'
import {
  fence,
  renderDemo,
  renderPage,
  renderPages,
  resolveHref
} from '../page-markdown'
import { getPageEntries } from '../site'

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
    expect(renderDemo(source, '/en-US/components/button')).toBe(
      '### Basic\n\nUse `type`.\n\n```vue\n<template>\n  <n-button>Go</n-button>\n</template>\n```'
    )
  })

  it('makes the fence longer than any backtick run in the code', () => {
    expect(fence('a ``` b', 'md')).toBe('````md\na ``` b\n````')
  })
})

describe('resolveHref', () => {
  it('points a relative link at the Markdown version of the page', () => {
    const route = '/en-US/docs/nuxtjs'
    expect(resolveHref('ssr#Caveat', route)).toBe(
      'https://www.naiveui.com/en-US/docs/ssr.md#Caveat'
    )
    expect(resolveHref('../components/button', route)).toBe(
      'https://www.naiveui.com/en-US/components/button.md'
    )
    expect(resolveHref('/llms.txt', route)).toBe(
      'https://www.naiveui.com/llms.txt'
    )
    expect(resolveHref('https://github.com/07akioni/vfonts', route)).toBe(
      'https://github.com/07akioni/vfonts'
    )
    expect(resolveHref('#usage', route)).toBe('#usage')
  })
})

describe('renderPage', () => {
  it('takes the title and the first paragraph, and resolves links in prose and in components', async () => {
    const [entry] = getPageEntries('en-US').filter(
      entry => entry.slug === 'legacy-grid'
    )
    const page = await renderPage(root, entry)
    expect(page.title).toBe('Legacy Grid')
    expect(page.markdown).toContain(
      '[Grid](https://www.naiveui.com/en-US/components/grid.md)'
    )
    // The demos' code keeps its components; the prose has none left
    expect(page.markdown).not.toContain('<n-alert')
    expect(page.markdown).not.toContain('<router-link')
  })
})

// These render every page of the site (the changelog alone is 200 KB of
// Markdown), which takes longer than a unit test's default 5 s on a busy runner
const SITE_TIMEOUT = 30_000

describe('site pages', { timeout: SITE_TIMEOUT }, () => {
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

describe('renderLlmsTxt', { timeout: SITE_TIMEOUT }, () => {
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
