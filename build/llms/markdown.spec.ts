import type { RouteEntry } from './types'
import fs from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { cleanMarkdown } from './markdown'

const routes: RouteEntry[] = [
  {
    locale: 'en-US',
    category: 'docs',
    routePath: 'installation',
    filePath: '/virtual/docs/installation.md'
  },
  {
    locale: 'en-US',
    category: 'components',
    routePath: 'button',
    filePath: '/virtual/components/button.md'
  },
  {
    locale: 'zh-CN',
    category: 'components',
    routePath: 'button',
    filePath: '/virtual/components/button.zh-CN.md'
  }
]

describe('cleanMarkdown', () => {
  it('preserves semantic text from Naive UI html blocks', async () => {
    const output = await cleanMarkdown(
      `# Page

<n-alert title="Warning" type="warning">
  Pass a unique <n-text code>key</n-text>, then see <n-a href="#details">details</n-a>.
</n-alert>`,
      {
        route: routes[0],
        routes
      }
    )

    expect(output).toContain('**Warning**')
    expect(output).toContain('unique `key`')
    expect(output).toContain('[details](#details)')
  })

  it('normalizes relative documentation links to emitted markdown routes', async () => {
    const output = await cleanMarkdown(
      '# Page\n\nSee [Button](../components/button#Button-Props).',
      {
        route: routes[0],
        routes
      }
    )

    expect(output).toContain(
      '[Button](/en-US/components/button.md#Button-Props)'
    )
  })

  it('keeps router-link targets instead of dynamic href bindings', async () => {
    const output = await cleanMarkdown(
      '# Page\n\nUse <router-link to="button" custom><n-a :href="href">Button</n-a></router-link>.',
      {
        route: routes[1],
        routes
      }
    )

    expect(output).toContain('[Button](/en-US/components/button.md)')
    expect(output).not.toContain('(href)')
  })

  it('keeps explicit locales when normalizing themed site links', async () => {
    const output = await cleanMarkdown(
      '# Page\n\nSee [按钮](/zh-CN/os-theme/components/button#Button-Props).',
      {
        route: routes[0],
        routes
      }
    )

    expect(output).toContain('[按钮](/zh-CN/components/button.md#Button-Props)')
  })

  it('expands demo markdown under the page heading hierarchy', async () => {
    const filePath = path.resolve(
      process.cwd(),
      'src/button/demos/enUS/index.demo-entry.md'
    )
    const content = await fs.readFile(filePath, 'utf-8')
    const route: RouteEntry = {
      locale: 'en-US',
      category: 'components',
      routePath: 'button',
      filePath
    }
    const output = await cleanMarkdown(content, {
      route,
      routes: [route]
    })

    expect(output).toContain('## Demos')
    expect(output).toContain('### Basic')
    expect(output).not.toContain('\n# Basic')
  })
})
