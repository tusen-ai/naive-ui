import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { timePickerLight } from '../styles'
import { NTimePicker } from '../index'

describe('n-time-picker', () => {
  const naive = create({
    locales: [enUS],
    styles: [timePickerLight]
  })
  it('should work with import on demand', () => {
    mount(NTimePicker, {
      global: {
        plugins: [naive]
      }
    })
  })
})
