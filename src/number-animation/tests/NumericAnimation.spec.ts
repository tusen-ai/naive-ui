import { mount } from '@vue/test-utils'
import { sleep } from 'seemly'
import { NNumberAnimation } from '../index'

describe('n-number-animation', () => {
  it.each([0, 10])('should play after equal endpoints at %s', async (from) => {
    const onFinish = vi.fn()
    const wrapper = mount(NNumberAnimation, {
      props: { from, to: from, active: false, duration: 20, onFinish }
    })
    try {
      wrapper.vm.play()
      await sleep(100)
      expect(wrapper.text()).toBe(String(from))
      expect(onFinish).not.toHaveBeenCalled()

      await wrapper.setProps({ to: from + 10 })
      wrapper.vm.play()
      await sleep(100)
      expect(wrapper.text()).toBe(String(from + 10))
      expect(onFinish).toHaveBeenCalledTimes(1)
    }
    finally {
      wrapper.unmount()
    }
  })

  it('should replay after returning to equal endpoints', async () => {
    const onFinish = vi.fn()
    const wrapper = mount(NNumberAnimation, {
      props: { from: 0, to: 10, active: false, duration: 20, onFinish }
    })
    try {
      wrapper.vm.play()
      wrapper.vm.play()
      await sleep(100)
      expect(wrapper.text()).toBe('10')
      expect(onFinish).toHaveBeenCalledTimes(1)

      await wrapper.setProps({ to: 0 })
      wrapper.vm.play()
      await sleep(100)
      expect(wrapper.text()).toBe('0')
      expect(onFinish).toHaveBeenCalledTimes(1)

      await wrapper.setProps({ to: 10 })
      wrapper.vm.play()
      await sleep(100)
      expect(wrapper.text()).toBe('10')
      expect(onFinish).toHaveBeenCalledTimes(2)
    }
    finally {
      wrapper.unmount()
    }
  })

  it('should work with import on demand', () => {
    mount(NNumberAnimation)
  })

  it('should work with `to` prop', async () => {
    const wrapper = mount(NNumberAnimation, {
      props: { to: 110, from: 110 }
    })

    expect(wrapper.text()).toBe('110')
    wrapper.unmount()
  })

  it('should work with `from` prop', async () => {
    const wrapper = mount(NNumberAnimation, {
      props: { to: 110, from: 10, active: false }
    })

    expect(wrapper.text()).toBe('10')
    wrapper.unmount()
  })

  it('should work with `active` prop', async () => {
    let wrapper = mount(NNumberAnimation, {
      props: { to: 110, from: 10 }
    })

    await sleep(25)
    expect(wrapper.text()).not.toBe('10')
    wrapper.unmount()

    wrapper = mount(NNumberAnimation, {
      props: { to: 110, from: 10, active: false }
    })

    await sleep(25)
    expect(wrapper.text()).toBe('10')
    wrapper.unmount()
  })

  it('should work with `duration` prop', async () => {
    const wrapper = mount(NNumberAnimation, {
      props: { to: 110, from: 10, duration: 20 }
    })
    expect(wrapper.text()).not.toBe('110')

    await sleep(100)
    expect(wrapper.text()).toBe('110')
    wrapper.unmount()
  })

  it('should work with `precision` prop', async () => {
    const wrapper = mount(NNumberAnimation, {
      props: { to: 10, from: 10, active: false }
    })
    expect(wrapper.text()).toBe('10')

    await wrapper.setProps({ precision: 2 })
    expect(wrapper.text()).toBe('10.00')
    wrapper.unmount()
  })

  it('should work with `show-separator` prop', async () => {
    const wrapper = mount(NNumberAnimation, {
      props: { to: 1000000, from: 1000000, active: false }
    })
    expect(wrapper.text()).toBe('1000000')

    await wrapper.setProps({ showSeparator: true })
    expect(wrapper.text()).toBe('1,000,000')
    wrapper.unmount()
  })
})
