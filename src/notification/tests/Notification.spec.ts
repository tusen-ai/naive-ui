import { mount } from '@vue/test-utils'
import { NNotificationProvider } from '../index'

describe('n-notification', () => {
  it('should work with import on demand', () => {
    mount(NNotificationProvider)
  })
})
