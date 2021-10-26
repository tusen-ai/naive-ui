import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NTabPane, NTabs } from '../index'
import { AddIcon } from '../../_internal/icons'

describe('n-tabs', () => {
  it('should work with import on demand', () => {
    mount(NTabs)
  })
  it('should work with callback types', () => {
    function onUpdateValue1 (name: number): void {}
    function onUpdateValue2 (name: string): void {}
    function onUpdateValue3 (name: number | string): void {}
    mount(NTabs, {
      props: {
        onUpdateValue: onUpdateValue1
      }
    })
    mount(NTabs, {
      props: {
        onUpdateValue: onUpdateValue2
      }
    })
    mount(NTabs, {
      props: {
        onUpdateValue: onUpdateValue3
      }
    })
  })
  it('should work with empty tab-pane', () => {
    mount(NTabs, {
      props: {
        defaultValue: 'a'
      },
      slots: {
        default: () =>
          h(NTabPane, {
            tab: 'a',
            name: 'a'
          })
      }
    })
  })

  it('should show AddIcon with `addable` prop', () => {
    const wrapper = mount(NTabs, {
      props: {
        type: 'card',
        addable: true
      }
    })

    expect(wrapper.findComponent(AddIcon).exists()).toBe(true)
  })

  it('should work with `justify-content` prop', async () => {
    const wrapper = mount(NTabs)

    await wrapper.setProps({ justifyContent: 'space-between' })
    expect(wrapper.find('.n-tabs-wrapper').attributes('style')).toContain(
      'justify-content: space-between;'
    )

    await wrapper.setProps({ justifyContent: 'space-around' })
    expect(wrapper.find('.n-tabs-wrapper').attributes('style')).toContain(
      'justify-content: space-around;'
    )

    await wrapper.setProps({ justifyContent: 'space-evenly' })
    expect(wrapper.find('.n-tabs-wrapper').attributes('style')).toContain(
      'justify-content: space-evenly;'
    )
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NTabs)

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.n-tabs').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('.n-tabs').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.n-tabs').attributes('style')).toMatchSnapshot()
  })

  it('should work with `tabs-padding` prop', async () => {
    const wrapper = mount(NTabs)

    expect(
      wrapper.find('.n-tabs-scroll-padding').attributes('style')
    ).toContain('width: 0px;')

    await wrapper.setProps({ tabsPadding: 100 })
    expect(
      wrapper.find('.n-tabs-scroll-padding').attributes('style')
    ).toContain('width: 100px;')
  })

  it('should work with `display-directive` prop', async () => {
    const displayDirectives: Array<'show' | 'if' | 'lazyload'> = [
      'show',
      'if',
      'lazyload'
    ]
    const wrapper = mount(NTabs, {
      props: { value: 'show' },
      slots: {
        default: () =>
          displayDirectives.map((directive) => (
            <NTabPane
              displayDirective={directive}
              tab={directive}
              name={directive}
            >
              {{ default: () => <span class={`test-${directive}`} /> }}
            </NTabPane>
          ))
      }
    })
    await wrapper.setProps({ value: 'if' })
    expect(wrapper.find('.test-show').exists()).toEqual(true)
    expect(wrapper.find('.test-if').exists()).toEqual(true)
    expect(wrapper.find('.test-lazyload').exists()).toEqual(false)
    await wrapper.setProps({ value: 'lazyload' })
    expect(wrapper.find('.test-show').exists()).toEqual(true)
    expect(wrapper.find('.test-if').exists()).toEqual(false)
    expect(wrapper.find('.test-lazyload').exists()).toEqual(true)
    await wrapper.setProps({ value: 'show' })
    expect(wrapper.find('.test-show').exists()).toEqual(true)
    expect(wrapper.find('.test-if').exists()).toEqual(false)
    expect(wrapper.find('.test-lazyload').exists()).toEqual(true)
  })
})
