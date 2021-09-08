import { mount } from '@vue/test-utils'
import { NTime } from '../index'

describe('n-time', () => {
  const date = new Date('1970-01-01 08:00:00').getTime()

  it('should work with import on demand', () => {
    mount(NTime)
  })

  it('should work with `unix` prop', async () => {
    const wrapper = mount(NTime, { props: { time: 0, unix: true } })
    expect(wrapper.find('time').text()).toContain('1970-01-01 12:00:00')
    await wrapper.setProps({ time: date })
    expect(wrapper.find('time').text()).toContain('1970-11-30 08:00:00')
  })

  it('should work with `format` prop', () => {
    const wrapper = mount(NTime, {
      props: { time: date, format: 'yyyy/MM/dd hh:mm:ss' }
    })
    expect(wrapper.find('time').text()).toContain('1970/01/01 08:00:00')
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount(NTime, { props: { time: date, type: 'date' } })
    expect(wrapper.find('time').text()).toContain('1970-01-01')
    await wrapper.setProps({ time: date, type: 'datetime' })
    expect(wrapper.find('time').text()).toContain('1970-01-01 08:00:00')
    await wrapper.setProps({ time: date, type: 'relative' })
    expect(wrapper.find('time').text()).toContain('over 51 years ago')
    await wrapper.setProps({ time: 0, type: 'relative', unix: true })
    expect(wrapper.find('time').text()).toContain('about 51687 years ago')
  })

  it('should work with `text` prop', () => {
    const wrapper = mount(NTime, { props: { time: date, text: true } })
    expect(wrapper.text()).toContain('1970-01-01 08:00:00')
  })
})
