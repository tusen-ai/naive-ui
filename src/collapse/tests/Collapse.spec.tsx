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
    const triggerNodeWrapper = wrapper.find('.n-collapse-item__header-main')
    await triggerNodeWrapper.trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('should work with `slots` ', async () => {
    const wrapper = mount(NCollapse, {
      slots: {
        header: () => 'header',
        'header-extra': () => 'header-extra',
        default: () => <NCollapseItem name="1"></NCollapseItem>,
        arrow: () => 'arrow'
      }
    })
    expect(wrapper.find('.n-collapse-item__header-main').exists()).toBe(true)
    expect(wrapper.find('.n-collapse-item__header-main').text()).toBe('arrow')

    expect(wrapper.find('.n-collapse-item__header-extra').exists()).toBe(true)
    expect(wrapper.find('.n-collapse-item__header-extra').text()).toBe(
      'header-extra'
    )

    expect(wrapper.find('.n-collapse-item-arrow').exists()).toBe(true)
    expect(wrapper.find('.n-collapse-item-arrow').text()).toBe('arrow')
  })

  it('props.defaultExpandedNames', async () => {
    let wrapper = mount(NCollapse, {
      props: {
        defaultExpandedNames: ['1']
      },
      slots: {
        default: () => [
          <NCollapseItem name="1">
            {{ default: () => <div class="ci1"></div> }}
          </NCollapseItem>,
          <NCollapseItem name="2">
            {{ default: () => <div class="ci2"></div> }}
          </NCollapseItem>
        ]
      }
    })
    expect(wrapper.find('.ci1').isVisible()).toEqual(true)
    expect(wrapper.find('.ci2').exists()).toEqual(false)
    wrapper = mount(NCollapse, {
      props: {
        accordion: true,
        defaultExpandedNames: '1'
      },
      slots: {
        default: () => [
          <NCollapseItem name="1">
            {{ default: () => <div class="ci1"></div> }}
          </NCollapseItem>,
          <NCollapseItem name="2">
            {{ default: () => <div class="ci2"></div> }}
          </NCollapseItem>
        ]
      }
    })
    expect(wrapper.find('.ci1').isVisible()).toEqual(true)
    expect(wrapper.find('.ci2').exists()).toEqual(false)
  })
})
