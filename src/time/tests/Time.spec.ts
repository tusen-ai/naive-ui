import { mount } from '@vue/test-utils'
import { NTime } from '../index'

describe('n-time', () => {
  const date = new Date('1970-01-01 08:00:00').getTime()

  it('should work with import on demand', () => {
    mount(NTime)
  })

  it('unix is true', () => {
    const wrapper = mount(NTime, { props: { time: 0, unix: true } })
    expect(wrapper.find('time').text()).toContain('1970-01-01 08:00:00')
  })

  it('unix is false', () => {
    const wrapper = mount(NTime, { props: { time: date } })
    expect(wrapper.find('time').text()).toContain('1970-01-01 08:00:00')
  })

  it('format is string', () => {
    const wrapper = mount(NTime, {
      props: { time: date, format: 'yyyy/MM/dd hh:mm:ss' }
    })
    expect(wrapper.find('time').text()).toContain('1970/01/01 08:00:00')
  })

  it('type value is relative and unix is true', () => {
    const wrapper = mount(NTime, {
      props: { time: 0, type: 'relative', unix: true }
    })
    expect(wrapper.find('time').text()).toContain('about 51687 years ago')
  })

  it('type value is relative and unix is false', () => {
    const wrapper = mount(NTime, { props: { time: date, type: 'relative' } })
    expect(wrapper.find('time').text()).toContain('over 51 years ago')
  })

  it('type value is date', () => {
    const wrapper = mount(NTime, { props: { time: date, type: 'date' } })
    expect(wrapper.find('time').text()).toContain('1970-01-01')
  })

  it('type value is datetime', () => {
    const wrapper = mount(NTime, { props: { time: date, type: 'datetime' } })
    expect(wrapper.find('time').text()).toContain('1970-01-01 08:00:00')
  })

  it('text is true', () => {
    const wrapper = mount(NTime, { props: { time: date, text: true } })
    expect(wrapper.text()).toContain('1970-01-01 08:00:00')
  })
})
