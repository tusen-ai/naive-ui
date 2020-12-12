import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { descriptionsLight } from '../styles'
import { NDescriptions } from '../index'

describe('n-descriptions', () => {
  const naive = create({
    locales: [enUS],
    styles: [descriptionsLight]
  })
  it('should work with import on demand', () => {
    mount(NDescriptions, {
      global: {
        plugins: [naive]
      }
    })
  })
})
