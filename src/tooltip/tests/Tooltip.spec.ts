import { mount } from '@vue/test-utils'
import { NTooltip } from '../index'

describe('n-tooltip', () => {
  it('should work with import on demand', () => {
    mount(NTooltip, {
      slots: {
        trigger: () => '07akioni'
      }
    })
  })
})
