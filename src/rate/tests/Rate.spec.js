import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { rateLight } from '../styles'
import { NRate } from '../index'

describe('n-rate', () => {
  const naive = create({
    locales: [enUS],
    styles: [rateLight]
  })
  it('should work with import on demand', () => {
    mount(NRate, {
      global: {
        plugins: [naive]
      }
    })
  })
})
