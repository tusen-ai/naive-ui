import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { datePickerLight } from '../styles'
import { NDatePicker } from '../index'

describe('n-date-picker', () => {
  const naive = create({
    locales: [enUS],
    styles: [datePickerLight]
  })
  it('should work with import on demand', () => {
    mount(NDatePicker, {
      global: {
        plugins: [naive]
      }
    })
  })
})
