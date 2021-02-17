import { mount } from '@vue/test-utils'
import { NConfigProvider } from '../index'

describe('n-config-provider', () => {
  it('should work with import on demand', () => {
    mount(NConfigProvider)
  })
})
