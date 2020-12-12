import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { timeLight } from '../styles'
import { NTime } from '../index'

describe('n-time', () => {
  const naive = create({
    locales: [enUS],
    styles: [timeLight]
  })
  it('should work with import on demand', () => {
    mount(NTime, {
      global: {
        plugins: [naive]
      }
    })
  })
})
