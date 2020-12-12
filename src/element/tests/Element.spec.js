import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { elementLight } from '../styles'
import { NElement } from '../index'

describe('n-element', () => {
  const naive = create({
    locales: [enUS],
    styles: [elementLight]
  })
  it('should work with import on demand', () => {
    mount(NElement, {
      global: {
        plugins: [naive]
      }
    })
  })
})
