import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { popconfirmLight } from '../styles'
import { NPopconfirm } from '../index'

describe('n-popconfirm', () => {
  const naive = create({
    locales: [enUS],
    styles: [popconfirmLight]
  })
  it('should work with import on demand', () => {
    mount(NPopconfirm, {
      global: {
        plugins: [naive]
      }
    })
  })
})
