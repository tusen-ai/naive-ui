import { describe, expect, it } from 'vitest'
import { findRoute, getRouteManifest } from './routes'

describe('llms routes', () => {
  it('resolves markdown imported by vue documentation routes', async () => {
    const { routes } = await getRouteManifest(process.cwd())

    expect(findRoute(routes, 'en-US', 'docs', 'changelog')?.filePath).toMatch(
      /CHANGELOG\.en-US\.md$/
    )
  })
})
