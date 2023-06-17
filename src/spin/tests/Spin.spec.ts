import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NSpin } from '../index'
import { Reload } from '@vicons/ionicons5'
import { NIcon } from '../../icon'
import { sleep } from 'seemly'
describe('n-spin', () => {
  it('should work with import on demand', () => {
    mount(NSpin)
  })

  it('should work with `show` prop', async () => {
    const wrapper = mount(NSpin, {
      props: {
        show: true
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.n-spin-content').classes()).toContain(
      'n-spin-content--spinning'
    )
    wrapper.unmount()
  })

  it('should work with icon slot', () => {
    const wrapper = mount(NSpin, {
      slots: {
        icon: () =>
          h(NIcon, null, {
            default: () => h(Reload)
          })
      }
    })

    expect(wrapper.findComponent(NIcon).exists()).toBe(true)
    expect(wrapper.findComponent(Reload).exists()).toBe(true)
    wrapper.unmount()
  })

  it('rotate should work on icon slot', async () => {
    const wrapper = mount(NSpin, {
      slots: {
        icon: () =>
          h(NIcon, null, {
            default: () => h(Reload)
          })
      }
    })
    expect(wrapper.find('.n-spin--rotate').exists()).toBe(true)
    await wrapper.setProps({
      rotate: false
    })
    expect(wrapper.find('.n-spin--rotate').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    ;(['small', 'medium', 'large', 71] as const).forEach((item) => {
      const wrapper = mount(NSpin, {
        props: {
          size: item
        }
      })
      expect(wrapper.find('.n-spin').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with `default` slot', async () => {
    const wrapper = mount(NSpin, {
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.n-spin-container').exists()).toBe(true)
    expect(wrapper.find('.n-spin-content').text()).toBe('test')
    wrapper.unmount()
  })

  it('should work with `strokeWidth` prop', () => {
    const wrapper = mount(NSpin, {
      props: {
        strokeWidth: 40,
        size: 'medium'
      }
    })

    expect(wrapper.find('circle').attributes('stroke-width')).toEqual('40')
    wrapper.unmount()
  })

  it('should work with `delay` prop', async () => {
    const wrapper = mount(NSpin, {
      props: {
        show: true,
        delay: 1000
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.n-spin-content').classes()).not.toContain(
      'n-spin-content--spinning'
    )
    await sleep(1000)

    expect(wrapper.find('.n-spin-content').classes()).toContain(
      'n-spin-content--spinning'
    )
  })

  it('should `delay` prop not delay close spin', async () => {
    const wrapper = mount(NSpin, {
      props: {
        show: true,
        delay: 1000
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.n-spin-content').classes()).not.toContain(
      'n-spin-content--spinning'
    )
    await sleep(1000)

    expect(wrapper.find('.n-spin-content').classes()).toContain(
      'n-spin-content--spinning'
    )

    await wrapper.setProps({
      show: false
    })
    expect(wrapper.find('.n-spin-content').classes()).not.toContain(
      'n-spin-content--spinning'
    )
  })
})
