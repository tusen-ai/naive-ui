import { mount } from '@vue/test-utils'
import { NPopover } from '../index'

describe('n-popover', () => {
  it('should work with import on demand', () => {
    mount(NPopover, {
      slots: {
        trigger: () => 'star kirby'
      }
    })
  })
})
