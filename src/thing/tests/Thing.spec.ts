import { mount } from '@vue/test-utils'
import { NThing } from '../index'

describe('n-thing', () => {
  it('should work with import on demand', () => {
    mount(NThing)
  })
})
