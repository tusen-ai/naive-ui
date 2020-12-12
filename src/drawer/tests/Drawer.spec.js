import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { drawerLight } from '../styles'
import { NDrawer } from '../index'

describe('n-drawer', () => {
  const naive = create({
    locales: [enUS],
    styles: [drawerLight]
  })
  it('should work with import on demand', () => {
    mount(NDrawer, {
      global: {
        plugins: [naive]
      }
    })
  })
})
