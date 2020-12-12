import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { loadingBarLight } from '../styles'
import { NLoadingBar } from '../index'

describe('n-loading-bar', () => {
  const naive = create({
    locales: [enUS],
    styles: [loadingBarLight]
  })
  it('should work with import on demand', () => {
    mount(NLoadingBar, {
      global: {
        plugins: [naive]
      }
    })
  })
})
