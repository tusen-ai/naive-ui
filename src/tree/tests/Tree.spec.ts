import type { DOMWrapper, VueWrapper } from '@vue/test-utils'
import type { TreeOption } from '../index'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { NTree } from '../index'

function getTreeNodes(wrapper: VueWrapper) {
  return wrapper.findAll('.n-tree-node')
}

function isChecked(node: DOMWrapper<Element>): boolean {
  return node
    .findAll('.n-checkbox')
    .some(cb => cb.classes().includes('n-checkbox--checked'))
}

function isIndeterminate(node: DOMWrapper<Element>): boolean {
  return node
    .findAll('.n-checkbox')
    .some(cb => cb.classes().includes('n-checkbox--indeterminate'))
}

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
            type: 'group',
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
            type: 'group',
            label: 'test2',
            key: '2',
            children: [
              {
                type: 'group',
                label: 'test2-1',
                key: '2-1'
              }
            ]
          }
        ]
      }
    })
    expect(getTreeNodes(wrapper).length).toBe(3)
    const switcher = getTreeNodes(wrapper)[2].find('.n-tree-node-switcher')

    await switcher.trigger('click')

    expect(getTreeNodes(wrapper).length).toBe(4)
    const lastNodeText = getTreeNodes(wrapper)[3].text()
    expect(lastNodeText).toContain('test2-1')
  })

  it('should work with `default-expand-all`', async () => {
    const wrapper = mount(NTree, {
      props: {
        defaultExpandAll: true
      }
    })
    await wrapper.setProps({
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
    })
    expect(getTreeNodes(wrapper).length).toBe(4)
    const texts = getTreeNodes(wrapper).map(n => n.text())
    expect(texts.some(t => t.includes('test1-1'))).toBe(true)
    expect(texts.some(t => t.includes('test2-1'))).toBe(true)
  })

  it('should work with `checkable` and `defaultCheckedKeys`', () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ],
        checkable: true,
        defaultCheckedKeys: ['1231']
      }
    })

    expect(wrapper.html()).toContain('n-tree-node--checkable')
  })

  it('should work with `draggable`', () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ],
        draggable: true
      }
    })

    expect(wrapper.find('.n-tree-node-content').html()).toContain(
      'draggable="true"'
    )
  })

  it('should work with `blockNode`', () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ],
        blockNode: true
      }
    })

    expect(wrapper.find('.n-tree--block-node').exists()).toBe(true)
  })

  it('should work with `blockLine`', () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ],
        blockLine: true
      }
    })

    expect(wrapper.find('.n-tree--block-line').exists()).toBe(true)
  })

  it('should work witch `selectable`', async () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ]
      }
    })
    expect(getTreeNodes(wrapper)[0].classes()).toContain(
      'n-tree-node--selectable'
    )
    let node = getTreeNodes(wrapper)[0]
    await node.find('.n-tree-node-content').trigger('click')
    expect(node.classes()).toContain('n-tree-node--selected')

    await wrapper.setProps({ selectable: false })
    await vi.waitFor(() => {
      expect(getTreeNodes(wrapper)[0].classes()).not.toContain(
        'n-tree-node--selectable'
      )
    })
    node = getTreeNodes(wrapper)[0]
    await node.find('.n-tree-node-content').trigger('click')
    expect(node.classes()).toContain('n-tree-node--selected')
    expect(node.classes()).not.toContain('n-tree-node--selectable')
  })

  it('should work witch `cancelable`', async () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ]
      }
    })

    const nodeEl = getTreeNodes(wrapper)[0]
    await nodeEl.find('.n-tree-node-content').trigger('click')
    expect(nodeEl.classes()).toContain('n-tree-node--selected')
    await nodeEl.find('.n-tree-node-content').trigger('click')
    expect(nodeEl.classes()).not.toContain('n-tree-node--selected')

    await wrapper.setProps({ cancelable: false })
    await nodeEl.find('.n-tree-node-content').trigger('click')
    expect(nodeEl.classes()).toContain('n-tree-node--selected')
    await nodeEl.find('.n-tree-node-content').trigger('click')
    expect(nodeEl.classes()).toContain('n-tree-node--selected')
  })

  it('should work with `disabled`', () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            disabled: true,
            children: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ]
      }
    })

    expect(wrapper.find('.n-tree-node--disabled').exists()).toBe(true)
  })

  it('should work with `children-field`', () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: 'test',
            key: '123',
            disabled: true,
            nodes: [
              {
                label: '1231',
                key: '1231'
              }
            ]
          }
        ],
        childrenField: 'nodes',
        defaultExpandAll: true
      }
    })

    expect(getTreeNodes(wrapper).length).toBe(2)
    expect(getTreeNodes(wrapper)[1].text()).toContain('1231')
  })

  it('should work with `onLoad`', async () => {
    const data = [
      {
        label: 'Parent 1',
        key: 1,
        isLeaf: false
      },
      {
        label: 'Parent 2',
        key: 2,
        isLeaf: false
      }
    ]

    const onLoad = vi.fn().mockImplementation((node) => {
      return Promise.resolve().then(() => {
        if (node.key === 1) {
          node.children = [{ label: 'Child 1', key: 11 }]
        }
        else if (node.key === 2) {
          node.children = [{ label: 'Child 2', key: 22 }]
        }
        return true
      })
    })

    const wrapper = mount(NTree, {
      props: {
        data,
        expandedKeys: [1],
        onLoad
      }
    })

    expect(onLoad).toHaveBeenCalledTimes(1)
    expect(onLoad).toHaveBeenCalledWith(data[0])

    await wrapper.setProps({ expandedKeys: [1, 2] })
    expect(onLoad).toHaveBeenCalledTimes(2)
    expect(onLoad).toHaveBeenCalledWith(data[1])
  })

  it('should work with `multiple`', async () => {
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: '1',
            key: '1'
          },
          {
            label: '2',
            key: '2'
          },
          {
            label: '3',
            key: '3'
          }
        ]
      }
    })

    let nodes = getTreeNodes(wrapper)
    await nodes[0].find('.n-tree-node-content').trigger('click')
    await nextTick()
    expect(getTreeNodes(wrapper)[0].classes()).toContain(
      'n-tree-node--selected'
    )
    expect(getTreeNodes(wrapper)[1].classes()).not.toContain(
      'n-tree-node--selected'
    )

    await nodes[1].find('.n-tree-node-content').trigger('click')
    await nextTick()
    expect(getTreeNodes(wrapper)[0].classes()).not.toContain(
      'n-tree-node--selected'
    )
    expect(getTreeNodes(wrapper)[1].classes()).toContain(
      'n-tree-node--selected'
    )

    await wrapper.setProps({ multiple: true })
    nodes = getTreeNodes(wrapper)
    await nodes[0].find('.n-tree-node-content').trigger('click')
    expect(getTreeNodes(wrapper)[0].classes()).toContain(
      'n-tree-node--selected'
    )
    expect(getTreeNodes(wrapper)[1].classes()).toContain(
      'n-tree-node--selected'
    )
  })

  it('should work with `click line to checked`', async () => {
    const wrapper = mount(NTree, {
      props: {
        cascade: true,
        checkable: true,
        checkOnClick: true,
        data: [
          {
            label: '1',
            key: '1'
          },
          {
            label: '2',
            key: '2'
          },
          {
            label: '3',
            key: '3'
          }
        ]
      }
    })
    const nodes = getTreeNodes(wrapper)
    await nodes[0].find('.n-tree-node-content').trigger('click')
    expect(isChecked(nodes[0])).toBe(true)
    await nodes[0].find('.n-tree-node-content').trigger('click')
    expect(isChecked(nodes[0])).toBe(false)
    await nodes[0].find('.n-tree-node-content').trigger('click')
    await nodes[1].find('.n-tree-node-content').trigger('click')
    expect(isChecked(nodes[0])).toBe(true)
    expect(isChecked(nodes[1])).toBe(true)

    await wrapper.setProps({ checkOnClick: false })
    await nodes[0].find('.n-tree-node-content').trigger('click')
    expect(isChecked(nodes[0])).toBe(true)
    await nodes[1].find('.n-tree-node-content').trigger('click')
    expect(isChecked(nodes[1])).toBe(true)
  })

  it('should work with `click line to checked when checkOnClick is function`', async () => {
    function checkOnClick(node: TreeOption): boolean {
      return node.label === '1-1'
    }

    const wrapper = mount(NTree, {
      props: {
        expandOnClick: true,
        checkOnClick,
        cascade: true,
        checkable: true,
        data: [
          {
            label: '1',
            key: '1',
            children: [
              {
                label: '1-1',
                key: '1-1'
              },
              {
                label: '1-2',
                key: '1-2'
              }
            ]
          },
          {
            label: '2',
            key: '2',
            children: [
              {
                label: '2-1',
                key: '2-1'
              },
              {
                label: '2-2',
                key: '2-2'
              }
            ]
          },
          {
            label: '3',
            key: '3'
          }
        ]
      }
    })
    await getTreeNodes(wrapper)[0].find('.n-tree-node-content').trigger('click')
    expect(isChecked(getTreeNodes(wrapper)[0])).toBe(false)
    await getTreeNodes(wrapper)[1].find('.n-tree-node-content').trigger('click')
    expect(isChecked(getTreeNodes(wrapper)[1])).toBe(true)
    expect(isIndeterminate(getTreeNodes(wrapper)[0])).toBe(true)
    await getTreeNodes(wrapper)[2].find('.n-tree-node-content').trigger('click')
    expect(isChecked(getTreeNodes(wrapper)[1])).toBe(true)
    expect(isIndeterminate(getTreeNodes(wrapper)[0])).toBe(true)
  })

  it('should work with `node-props` prop', async () => {
    const testClass = 'menu-test'
    const wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: '1',
            key: '1'
          },
          {
            label: '2',
            key: '2'
          },
          {
            label: '3',
            key: '3'
          }
        ],
        nodeProps: () => ({ class: testClass })
      }
    })
    expect(wrapper.find('.n-tree-node').classes()).toContain(testClass)
  })

  it('should work with `checkbox-placement` prop', async () => {
    let wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: '1',
            key: '1'
          },
          {
            label: '2',
            key: '2'
          },
          {
            label: '3',
            key: '3'
          }
        ],
        checkable: true
      }
    })
    expect(wrapper.find('.n-tree-node-checkbox--right').exists()).toBe(false)

    wrapper = mount(NTree, {
      props: {
        data: [
          {
            label: '1',
            key: '1'
          },
          {
            label: '2',
            key: '2'
          },
          {
            label: '3',
            key: '3'
          }
        ],
        checkable: true,
        checkboxPlacement: 'right'
      }
    })
    expect(wrapper.find('.n-tree-node-checkbox--right').exists()).toBe(true)

    wrapper.unmount()
  })
})
