import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { NGi, NGrid, NGridItem } from '../index'

const renderNGi = new Array(6).fill(1).map((v, i) => {
  return h(NGi, null, { default: () => i })
})

describe('n-grid', () => {
  it('should work with import on demand', () => {
    mount(
      defineComponent({
        render () {
          return (
            <NGrid>
              {{
                default: () => [<NGridItem />]
              }}
            </NGrid>
          )
        }
      })
    )
  })

  it('should work with import on demand', () => {
    mount(
      defineComponent({
        render () {
          return (
            <NGrid>
              {{
                default: () => [<NGi />]
              }}
            </NGrid>
          )
        }
      })
    )
  })

  it('should work with `gap` prop', async () => {
    const wrapper = mount(NGrid, {
      props: {
        'x-gap': 10,
        'y-gap': 20
      },
      slots: {
        default: () => [
          h(NGi, null, { default: () => 'test1' }),
          h(NGridItem, null, { default: () => 'test2' })
        ]
      }
    })
    expect(wrapper.find('.n-grid').attributes('style')).toContain(
      'column-gap: 10px; row-gap: 20px;'
    )
    wrapper.unmount()
  })

  it('should work with `offset` prop', async () => {
    const wrapper = mount(NGrid, {
      slots: {
        default: () => [
          h(NGi, { offset: 2 }, { default: () => 'test1' }),
          h(NGridItem, { offset: 1 }, { default: () => 'test2' })
        ]
      }
    })
    expect(
      wrapper.find('.n-grid').element.children[0].getAttribute('style')
    ).toContain('grid-column: span 3 / span 3;')
    expect(
      wrapper.find('.n-grid').element.children[1].getAttribute('style')
    ).toContain('grid-column: span 2 / span 2;')
    wrapper.unmount()
  })

  it('should work with `collapsed` prop', async () => {
    const wrapper = mount(NGrid, {
      slots: {
        default: () => renderNGi
      },
      props: {
        cols: 4,
        collapsed: false
      }
    })
    const children = wrapper.find('.n-grid').element.children
    let len = 0
    for (let i = 0; i < children.length; i++) {
      if (
        children[i]
          .getAttribute('style')
          ?.includes('grid-column: span 1 / span 1;')
      ) {
        len++
      }
    }
    expect(len).toBe(6)
    await wrapper.setProps({ collapsed: true })
    let len1 = 0
    for (let i = 0; i < children.length; i++) {
      if (
        children[i]
          .getAttribute('style')
          ?.includes('grid-column: span 1 / span 1; display: none;')
      ) {
        len1++
      }
    }
    expect(len1).toBe(2)
    wrapper.unmount()
  })

  it('should work with `suffix` prop', async () => {
    const wrapper = mount(NGrid, {
      slots: {
        default: () => [
          renderNGi,
          h(NGi, { suffix: true }, { default: () => 'suffix' })
        ]
      },
      props: {
        cols: 4,
        collapsed: false
      }
    })
    const children = wrapper.find('.n-grid').element.children
    let len = 0
    for (let i = 0; i < children.length; i++) {
      if (
        children[i]
          .getAttribute('style')
          ?.includes('grid-column: span 1 / span 1;')
      ) {
        len++
      }
    }
    expect(len).toBe(6)
    await wrapper.setProps({ collapsed: true })
    let len1 = 0
    for (let i = 0; i < children.length; i++) {
      if (
        children[i]
          .getAttribute('style')
          ?.includes('grid-column: span 1 / span 1; display: none;')
      ) {
        len1++
      }
    }
    expect(len1).toBe(3)
    wrapper.unmount()
  })

  it('should work with `item-responsive` prop', async () => {
    const wrapper = mount(NGrid, {
      slots: {
        default: () => [
          <NGi class="n-gi-1" span="0 400:2 600:3 800:4">
            {{
              default: () => <div>1</div>
            }}
          </NGi>,
          <NGi class="n-gi-2">
            {{
              default: () => <div>2</div>
            }}
          </NGi>
        ]
      },
      props: {
        cols: 4,
        responsive: 'self',
        itemResponsive: true
      }
    })

    expect(wrapper.find('.n-gi-1').exists()).toBeFalsy()

    const instance = wrapper.getCurrentComponent().proxy
    ;(instance as any).handleResize({ contentRect: { width: 500 } })

    await new Promise((resolve) => requestAnimationFrame(resolve))

    expect(wrapper.find('.n-gi-1').element.getAttribute('style')).toContain(
      'grid-column: span 2 / span 2;'
    )
    wrapper.unmount()
  })
})
