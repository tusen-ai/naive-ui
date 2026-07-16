import { describe, expect, it } from 'vitest'
import { parseDemoVue, splitDemoVue } from './parse-demo-vue'

describe('splitDemoVue', () => {
  it('extracts markdown block and vue code', () => {
    const source = `<markdown>
# Basic

Use <n-text code>n-button</n-text>.
</markdown>

<template>
  <n-button>hi</n-button>
</template>

<script setup>
import { NButton } from 'naive-ui'
</script>`

    const result = splitDemoVue(source)
    expect(result.markdown).toContain('# Basic')
    expect(result.markdown).toContain('<n-text code>n-button</n-text>')
    expect(result.vueCode).toContain('<template>')
    expect(result.vueCode).toContain('<script setup>')
    expect(result.vueCode).not.toContain('<markdown>')
  })

  it('treats entire file as vue code when no markdown block', () => {
    const source = `<template>
  <n-button>hi</n-button>
</template>`

    const result = splitDemoVue(source)
    expect(result.markdown).toBe('')
    expect(result.vueCode).toBe(source.trim())
  })

  it('handles empty markdown block', () => {
    const source = `<markdown></markdown>
<template>
  <n-button>hi</n-button>
</template>`

    const result = splitDemoVue(source)
    expect(result.markdown).toBe('')
    expect(result.vueCode).toContain('<template>')
  })
})

describe('parseDemoVue', () => {
  it('returns parsed markdown nodes and vue code block', () => {
    const source = `<markdown>
# Basic

Hello.
</markdown>

<template>
  <n-button>hi</n-button>
</template>`

    const nodes = parseDemoVue(source)
    expect(nodes).toHaveLength(3)
    expect(nodes[0].type).toBe('heading')
    expect(nodes[1].type).toBe('paragraph')
    expect(nodes[2].type).toBe('code')
    expect((nodes[2] as any).lang).toBe('vue')
    expect((nodes[2] as any).value).toContain('<template>')
  })

  it('returns only vue code block when no markdown', () => {
    const source = `<template>
  <n-button>hi</n-button>
</template>`

    const nodes = parseDemoVue(source)
    expect(nodes).toHaveLength(1)
    expect(nodes[0].type).toBe('code')
    expect((nodes[0] as any).lang).toBe('vue')
  })
})
