import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { dynamicInputLight } from '../styles'
import { NDynamicInput } from '../index'

describe('n-dynamic-input', () => {
  const naive = create({
    locales: [enUS],
    styles: [dynamicInputLight]
  })
  it('should work with import on demand', () => {
    mount(NDynamicInput, {
      global: {
        plugins: [naive]
      }
    })
  })
})
