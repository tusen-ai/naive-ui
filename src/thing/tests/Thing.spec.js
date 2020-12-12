import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { thingLight } from '../styles'
import { NThing } from '../index'

describe('n-thing', () => {
  const naive = create({
    locales: [enUS],
    styles: [thingLight]
  })
  it('should work with import on demand', () => {
    mount(NThing, {
      global: {
        plugins: [naive]
      }
    })
  })
})
