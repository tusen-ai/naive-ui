import { mount } from '@vue/test-utils'
import { sleep } from 'seemly'
import { CountdownProps, NCountdown } from '../index'

describe('n-countdown', () => {
  it('should work with import on demand', () => {
    mount(NCountdown)
  })
  it('should work with `duration` prop', async () => {
    const wrapper = mount(NCountdown, {
      props: {
        duration: 2 * 3600 * 1000
      }
    })
    expect(wrapper.text()).toBe('02:00:00')
    wrapper.unmount()
  })
  it('should work with `precision`&`active` prop`', async () => {
    const wrapper = mount(NCountdown, {
      props: {
        duration: 2 * 3600 * 1000,
        active: false
      }
    })
    expect(wrapper.text()).toBe('02:00:00')
    await wrapper.setProps({ precision: 1 })
    expect(wrapper.text()).toBe('02:00:00.0')
    await wrapper.setProps({ precision: 2 })
    expect(wrapper.text()).toBe('02:00:00.00')
    await wrapper.setProps({ precision: 3 })
    expect(wrapper.text()).toBe('02:00:00.000')
    await wrapper.setProps({ active: true })
    expect(wrapper.text()).not.toBe('02:00:00.000')
    wrapper.unmount()
  })
  it('should work with `render` prop', () => {
    const render: CountdownProps['render'] = ({
      hours = 1,
      minutes = 1,
      seconds = 1,
      milliseconds = 1
    }) => {
      return `${hours}:${minutes}:${seconds}:${milliseconds}`
    }
    const wrapper = mount(NCountdown, {
      props: {
        render
      }
    })
    expect(wrapper.text()).not.toBe('1:1:1:1')
    wrapper.unmount()
  })
  it('should work with `on-finish` prop', async () => {
    const onFinish = jest.fn()
    const wrapper = mount(NCountdown, {
      props: {
        duration: 1,
        onFinish
      }
    })
    await sleep(100)
    expect(onFinish).toHaveBeenCalled()
    wrapper.unmount()
  })
})
