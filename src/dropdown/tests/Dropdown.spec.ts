import { mount } from '@vue/test-utils'
import { NDropdown } from '../index'

describe('n-dropdown', () => {
  it('should work with import on demand', () => {
    mount(NDropdown, {
      slots: {
        default: () => 'star kirby'
      }
    })
  })
})
