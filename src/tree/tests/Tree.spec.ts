import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { NTree } from '../index'

describe('n-tree', () => {
  it('should work with import on demand', () => {
    mount(NTree)
  })

  it('should accept proper options', () => {
    mount(NTree, {
      props: {
        data: [
          {
            label: '123',
            key: '123',
            children: [
              {
                label: '123',
                key: '123'
              }
            ]
          }
        ]
      }
    })
    mount(NTree, {
      props: {
        data: [
          {
            label: '123',
            key: '123',
            unknown: 'unknown'
          }
        ]
      }
    })
  })

  it('should work with `prefix` and `suffix`', async () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            prefix: () => 'prefix',
            suffix: () => 'suffix',
            children: [
              {
                label: '123',
                key: '123'
              }
            ]
          }
        ]
      }
    })

    expect(wrapper.find('.n-tree-node-content__prefix').exists()).toBe(true)
    expect(wrapper.find('.n-tree-node-content__prefix').text()).toBe('prefix')
    expect(wrapper.find('.n-tree-node-content__text').exists()).toBe(true)
    expect(wrapper.find('.n-tree-node-content__text').text()).toBe('test')
    expect(wrapper.find('.n-tree-node-content__suffix').exists()).toBe(true)
    expect(wrapper.find('.n-tree-node-content__suffix').text()).toBe('suffix')
  })

  it('should work with `render-label`, `render-prefix` and `render-suffix`', async () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '123',
                key: '123'
              }
            ]
          }
        ],
        renderPrefix: () => 'prefix',
        renderLabel: () => 'label',
        renderSuffix: () => 'suffix'
      }
    })

    expect(wrapper.find('.n-tree-node-content__prefix').exists()).toBe(true)
    expect(wrapper.find('.n-tree-node-content__prefix').text()).toBe('prefix')
    expect(wrapper.find('.n-tree-node-content__text').exists()).toBe(true)
    expect(wrapper.find('.n-tree-node-content__text').text()).toBe('label')
    expect(wrapper.find('.n-tree-node-content__suffix').exists()).toBe(true)
    expect(wrapper.find('.n-tree-node-content__suffix').text()).toBe('suffix')
  })

  it('should work with `expand`', async () => {
    const wrapper = mount(NTree, {
      props: {
        defaultExpandedKeys: ['1'],
        data: [
          {
            label: 'test1',
            key: '1',
            children: [
              {
                label: 'test1-1',
                key: '1-1'
              }
            ]
          },
          {
            label: 'test2',
            key: '2',
            children: [
              {
                label: 'test2-1',
                key: '2-1'
              }
            ]
          }
        ]
      }
    })
    const expandNode = async (nodeText: string): Promise<void> => {
      const node = wrapper
        .findAll('.n-tree-node')
        .find((el) => el.text() === nodeText)
      if (node) {
        const switcher = node.find('.n-base-icon')
        if (switcher) {
          await switcher.trigger('click')
        }
      }
      await nextTick()
    }
    const test1Child = wrapper
      .findAll('.n-tree-node')
      .find((el) => el.text() === 'test1-1')
    let test2Child = wrapper
      .findAll('.n-tree-node')
      .find((el) => el.text() === 'test2-1')

    expect(test1Child).toBeDefined()
    expect(test2Child).not.toBeDefined()

    await expandNode('test2')
    test2Child = wrapper
      .findAll('.n-tree-node')
      .find((el) => el.text() === 'test2-1')
    expect(test2Child).toBeDefined()
  })
})
