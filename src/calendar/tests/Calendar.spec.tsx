import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NCalendar } from '../index'

describe('n-button', () => {
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
})
