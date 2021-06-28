import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NCollapse, NCollapseItem } from '../index'

describe('n-collapse', () => {
  it('should work with import on demand', () => {
    mount(NCollapse)
  })

  it('can customize icon', () => {
    const wrapper = mount(() => {
      return (
        <NCollapse>
          {{
            arrow: () => <div class="my-icon"></div>,
            default: () => <NCollapseItem name="1"></NCollapseItem>
          }}
        </NCollapse>
      )
    })
    expect(wrapper.find('.my-icon').exists()).toEqual(true)
  })

  it('should work with `arrow-placement` prop', async () => {
    const wrapper = mount(NCollapse, {
      slots: {
        default: () => <NCollapseItem name="1"></NCollapseItem>
      }
    })
    expect(wrapper.find('.n-collapse-item').classes()).toContain(
      'n-collapse-item--left-arrow-placement'
    )

    await wrapper.setProps({ arrowPlacement: 'right' })
    expect(wrapper.find('.n-collapse-item').classes()).toContain(
      'n-collapse-item--right-arrow-placement'
    )
  })

  it('should work with nested structure', async () => {
    mount(NCollapse, {
      slots: {
        default: () =>
          h(
            NCollapseItem,
            { name: '1', title: 'test1' },
            {
              default: () =>
                h(NCollapse, null, {
                  default: () => h(NCollapseItem, { name: '2', title: 'test2' })
                })
            }
          )
      }
    })

    // todo: test display-directive
    // I wanted to test this function, but I was bothered by the <transition-stub>
  })

  it('should work with `display-directive` prop', async () => {
    mount(NCollapse, {
      props: {
        displayDirective: 'show'
      },
      slots: {
        default: () =>
          h(
            NCollapseItem,
            { name: '1', title: 'test' },
            { default: () => h('div', null, { default: () => 'test' }) }
          )
      }
      // todo: test display-directive
      // I wanted to test this function, but I was bothered by the <transition-stub>
    })
  })

  it('should work with `on-item-header-click` prop', async () => {
    const onClick = jest.fn()
    const wrapper = mount(NCollapse, {
      props: {
        onItemHeaderClick: onClick
      },
      slots: {
        default: () => <NCollapseItem name="1"></NCollapseItem>
      }
    })
    const triggerNodeWrapper = wrapper.find('.n-collapse-item__header')
    await triggerNodeWrapper.trigger('click')
    expect(onClick).toHaveBeenCalled()
  })
})
