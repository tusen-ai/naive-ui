import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NIcon } from '../index'

describe('n-icon', () => {
  it('should work with import on demand', () => {
    mount(NIcon)
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NIcon, { props: { size: 40 } })
    expect(wrapper.find('[role="img"]').classes()).toContain('n-icon')
    expect(wrapper.find('[role="img"]').attributes('style')).toContain(
      'font-size: 40px;'
    )

    await wrapper.setProps({ size: 80 })
    expect(wrapper.find('[role="img"]').attributes('style')).toContain(
      'font-size: 80px;'
    )
    wrapper.unmount()
  })

  it('should work with `color` prop', async () => {
    const wrapper = mount(NIcon, { props: { color: 'rgb(14, 122, 13)' } })
    expect(wrapper.find('[role="img"]').attributes('style')).toContain(
      'color: rgb(14, 122, 13);'
    )
    wrapper.unmount()
  })

  it('should work with `depth` prop', async () => {
    const wrapper = mount(NIcon, { props: { depth: 5 } })
    expect(wrapper.find('[role="img"]').classes()).toContain('n-icon--depth')
    expect(wrapper.find('[role="img"]').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with customize icon', async () => {
    const customize = h(
      'svg',
      { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 512 512' },
      {
        default: () =>
          h('path', {
            d: 'M368.5 240H272v-96.5c0-8.8-7.2-16-16-16s-16 7.2-16 16V240h-96.5c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7H240v96.5c0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7 8.8 0 16-7.2 16-16V272h96.5c8.8 0 16-7.2 16-16s-7.2-16-16-16z'
          })
      }
    )
    const wrapper = mount(NIcon, { slots: { default: () => customize } })
    expect(wrapper.find('svg').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `component` prop', async () => {
    const wrapper = mount(NIcon, {
      props: {
        component: h(
          'div',
          { class: 'test-component' },
          { default: () => 'test-component' }
        )
      }
    })
    expect(wrapper.find('.test-component').exists()).toBe(true)
    wrapper.unmount()
  })
})
