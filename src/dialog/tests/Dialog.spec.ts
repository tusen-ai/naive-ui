import { mount } from '@vue/test-utils'
import { NDialogProvider } from '../index'

describe('n-dialog', () => {
  it('should work with import on demand', () => {
    mount(NDialogProvider)
  })
})
