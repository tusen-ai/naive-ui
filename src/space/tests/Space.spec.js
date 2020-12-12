import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { spaceLight } from '../styles'
import { NSpace } from '../index'

describe('n-space', () => {
  const naive = create({
    locales: [enUS],
    styles: [spaceLight]
  })
  it('should work with import on demand', () => {
    mount(NSpace, {
      global: {
        plugins: [naive]
      }
    })
  })
})
