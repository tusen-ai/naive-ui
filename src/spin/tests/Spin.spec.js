import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { spinLight } from '../styles'
import { NSpin } from '../index'

describe('n-spin', () => {
  const naive = create({
    locales: [enUS],
    styles: [spinLight]
  })
  it('should work with import on demand', () => {
    mount(NSpin, {
      global: {
        plugins: [naive]
      }
    })
  })
})
