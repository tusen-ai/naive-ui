import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { checkboxLight } from '../styles'
import { NCheckbox } from '../index'

describe('n-checkbox', () => {
  const naive = create({
    locales: [enUS],
    styles: [checkboxLight]
  })
  it('should work with import on demand', () => {
    mount(NCheckbox, {
      global: {
        plugins: [naive]
      }
    })
  })
})
