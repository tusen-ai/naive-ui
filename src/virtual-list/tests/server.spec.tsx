import { setup } from '@css-render/vue3-ssr'
import { renderToString } from '@vue/server-renderer'
/**
 * @vitest-environment node
 */
import { createSSRApp, h } from 'vue'
import { NVirtualList } from '../..'

describe('server side rendering', () => {
  it('works', async () => {
    const items = Array.from({ length: 100 }, (_, i) => ({
      key: i,
      value: `Item ${i}`
    }))
    const app = createSSRApp(() => (
      <NVirtualList items={items} itemSize={50}>
        {{
          default: ({ item }: any) => <div>{item.value}</div>
        }}
      </NVirtualList>
    ))
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with empty items', async () => {
    const app = createSSRApp(() => (
      <NVirtualList items={[]} itemSize={50} />
    ))
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with custom keyField', async () => {
    const items = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      value: `Item ${i}`
    }))
    const app = createSSRApp(() => (
      <NVirtualList items={items} itemSize={50} keyField="id">
        {{
          default: ({ item }: any) => <div>{item.value}</div>
        }}
      </NVirtualList>
    ))
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with padding props', async () => {
    const items = Array.from({ length: 10 }, (_, i) => ({
      key: i,
      value: `Item ${i}`
    }))
    const app = createSSRApp(() => (
      <NVirtualList
        items={items}
        itemSize={50}
        paddingTop={20}
        paddingBottom={20}
      >
        {{
          default: ({ item }: any) => <div>{item.value}</div>
        }}
      </NVirtualList>
    ))
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })

  it('works with scrollbarProps', async () => {
    const items = Array.from({ length: 10 }, (_, i) => ({
      key: i,
      value: `Item ${i}`
    }))
    const app = createSSRApp(() => (
      <NVirtualList
        items={items}
        itemSize={50}
        scrollbarProps={{ style: { height: '300px' } }}
      >
        {{
          default: ({ item }: any) => <div>{item.value}</div>
        }}
      </NVirtualList>
    ))
    setup(app)
    try {
      await renderToString(app)
    }
    catch (e) {
      expect(e).not.toBeTruthy()
    }
  })
})
