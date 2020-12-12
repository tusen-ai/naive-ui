import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { alertLight } from '../styles'
import { NAlert } from '../index'

describe('n-alert', () => {
  const naive = create({
    locales: [enUS],
    styles: [alertLight]
  })
  it('should work with import on demand', () => {
    mount(NAlert, {
      props: {
        type: 'error'
      },
      global: {
        plugins: [naive]
      }
    })
  })
})
