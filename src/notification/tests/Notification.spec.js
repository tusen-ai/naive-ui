import { mount } from '@vue/test-utils'
import create from '../../create'
import { enUS } from '../../locales'
import { notificationLight } from '../styles'
import { NNotification } from '../index'

describe('n-notification', () => {
  const naive = create({
    locales: [enUS],
    styles: [notificationLight]
  })
  it('should work with import on demand', () => {
    mount(NNotification, {
      global: {
        plugins: [naive]
      }
    })
  })
})
