import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { backTopLight } from '../styles'
import { NBackTop } from '../index'

describe('n-back-top', () => {
  const naive = create({
    locales: [enUS],
    styles: [backTopLight]
  })
  it('should work with import on demand', () => {
    mount(NBackTop, {
      global: {
        plugins: [naive]
      }
    })
  })
})
