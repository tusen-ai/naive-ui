import { mount } from '@vue/test-utils'
import { NTree } from '../index'

describe('n-tree', () => {
  it('should work with import on demand', () => {
    mount(NTree)
  })

  it('should accept proper options', () => {
    mount(NTree, {
      props: {
        options: [
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
        options: [
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
        options: [
          {
            label: 'test',
            key: '123',
            prefix: 'prefix',
            suffix: 'suffix',
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
    async function doTest (): Promise<void> {
      expect(wrapper.find('.n-tree-node-content__prefix').exists()).toBe(true)
      expect(wrapper.find('.n-tree-node-content__prefix').text()).toBe('prefix')
      expect(wrapper.find('.n-tree-node-content__text').exists()).toBe(true)
      expect(wrapper.find('.n-tree-node-content__text').text()).toBe('test')
      expect(wrapper.find('.n-tree-node-content__suffix').exists()).toBe(true)
      expect(wrapper.find('.n-tree-node-content__suffix').text()).toBe('suffix')

      const treeNodeContentWrapper = wrapper.findComponent(
        '.n-tree-node-content'
      )

      await treeNodeContentWrapper.trigger('click')
      expect(treeNodeContentWrapper.emitted()).toHaveProperty('click')

      await treeNodeContentWrapper.trigger('dragstart')
      expect(treeNodeContentWrapper.emitted()).not.toHaveProperty('dragstart')
    }

    setTimeout(() => {
      doTest()
    }, 100)
  })
})
