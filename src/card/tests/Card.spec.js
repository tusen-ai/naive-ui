import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { cardLight } from '../styles'
import { NCard } from '../index'

describe('n-card', () => {
  const naive = create({
    locales: [enUS],
    styles: [cardLight]
  })
  it('should work with import on demand', () => {
    mount(NCard, {
      global: {
        plugins: [naive]
      }
    })
  })
})
