import { mount } from '@vue/test-utils'
import { NLoadingBarProvider } from '../index'

describe('n-loading-bar', () => {
  it('should work with import on demand', () => {
    mount(NLoadingBarProvider)
  })
})
