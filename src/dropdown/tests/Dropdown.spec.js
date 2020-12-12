import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { dropdownLight } from '../styles'
import { NDropdown } from '../index'

describe('n-dropdown', () => {
  const naive = create({
    locales: [enUS],
    styles: [dropdownLight]
  })
  it('should work with import on demand', () => {
    mount(NDropdown, {
      global: {
        plugins: [naive]
      }
    })
  })
})
