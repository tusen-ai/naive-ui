import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { autoCompleteLight } from '../styles'
import { NAutoComplete } from '../index'

describe('n-auto-complete', () => {
  const naive = create({
    locales: [enUS],
    styles: [autoCompleteLight]
  })
  it('should work with import on demand', () => {
    mount(NAutoComplete, {
      global: {
        plugins: [naive]
      }
    })
  })
})
