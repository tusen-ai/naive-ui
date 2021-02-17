import { mount } from '@vue/test-utils'
import { NMessageProvider } from '../index'

describe('n-message', () => {
  it('should work with import on demand', () => {
    mount(NMessageProvider)
  })
})
