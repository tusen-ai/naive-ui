import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { layoutLight } from '../styles'
import { NLayout } from '../index'

describe('n-layout', () => {
  const naive = create({
    locales: [enUS],
    styles: [layoutLight]
  })
  it('should work with import on demand', () => {
    mount(NLayout, {
      global: {
        plugins: [naive]
      }
    })
  })
})
