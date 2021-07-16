import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NCalendar } from '../index'
import { isYesterday } from 'date-fns'

describe('n-calendar', () => {
  const now = Date.now()

  it('should work with import on demand', () => {
    mount(NCalendar)
  })
  it('props.onUpdate has correct type', () => {
    ;<NCalendar
      onUpdateValue={(
        value: number,
        time: {
          date: number
          month: number
          year: number
        }
      ) => {}}
    />
  })

  it('should work with `default-value` prop', async () => {
    const wrapper = mount(NCalendar, { props: { defaultValue: now } })
    expect(wrapper.find('.n-calendar-cell--selected').exists()).toBe(true)
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(NCalendar, { props: { value: now } })
    expect(wrapper.find('.n-calendar-cell--selected').exists()).toBe(true)
  })

  it('should work with `is-date-disabled` prop', async () => {
    function disableFunction (timestamp: number): boolean {
      if (isYesterday(timestamp)) {
        return true
      }
      return false
    }
    const wrapper = mount(NCalendar, {
      props: { 'is-date-disabled': disableFunction }
    })
    expect(wrapper.find('.n-calendar-cell--disabled').exists()).toBe(true)
  })

  it('should work with `on-update:value` prop', async () => {
    const onUpdate = jest.fn()
    const wrapper = mount(NCalendar, { props: { 'on-update:value': onUpdate } })

    await wrapper.findAll('.n-calendar-date')[1].trigger('click')
    expect(onUpdate).toHaveBeenCalled()
  })
})
