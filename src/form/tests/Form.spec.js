import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { formLight } from '../styles'
import { NForm } from '../index'

describe('n-form', () => {
  const naive = create({
    locales: [enUS],
    styles: [formLight]
  })
  it('should work with import on demand', () => {
    mount(NForm, {
      global: {
        plugins: [naive]
      }
    })
  })
})
