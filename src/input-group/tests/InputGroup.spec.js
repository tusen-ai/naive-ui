import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { inputGroupLight } from '../styles'
import { NInputGroup } from '../index'

describe('n-input-group', () => {
  const naive = create({
    locales: [enUS],
    styles: [inputGroupLight]
  })
  it('should work with import on demand', () => {
    mount(NInputGroup, {
      global: {
        plugins: [naive]
      }
    })
  })
})
