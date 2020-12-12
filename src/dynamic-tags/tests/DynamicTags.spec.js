import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { dynamicTagsLight } from '../styles'
import { NDynamicTags } from '../index'

describe('n-dynamic-tags', () => {
  const naive = create({
    locales: [enUS],
    styles: [dynamicTagsLight]
  })
  it('should work with import on demand', () => {
    mount(NDynamicTags, {
      global: {
        plugins: [naive]
      }
    })
  })
})
