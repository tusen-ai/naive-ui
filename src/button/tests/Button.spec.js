import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { buttonLight } from '../styles'
import { NButton } from '../index'

describe('n-button', () => {
  const naive = create({
    locales: [enUS],
    styles: [buttonLight]
  })
  it('should work with import on demand', () => {
    mount(NButton, {
      global: {
        plugins: [naive]
      }
    })
  })
})
