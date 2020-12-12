import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { buttonGroupLight } from '../styles'
import { NButtonGroup } from '../index'

describe('n-button-group', () => {
  const naive = create({
    locales: [enUS],
    styles: [buttonGroupLight]
  })
  it('should work with import on demand', () => {
    mount(NButtonGroup, {
      global: {
        plugins: [naive]
      }
    })
  })
})
