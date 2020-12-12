import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { tabsLight } from '../styles'
import { NTabs } from '../index'

describe('n-tabs', () => {
  const naive = create({
    locales: [enUS],
    styles: [tabsLight]
  })
  it('should work with import on demand', () => {
    mount(NTabs, {
      global: {
        plugins: [naive]
      }
    })
  })
})
