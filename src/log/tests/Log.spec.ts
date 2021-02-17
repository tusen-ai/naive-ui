import { mount } from '@vue/test-utils'
import { NLog } from '../index'

describe('n-log', () => {
  it('should work with import on demand', () => {
    mount(NLog)
  })
})
