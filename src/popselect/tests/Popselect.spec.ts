import { mount } from '@vue/test-utils'
import { NPopselect } from '../index'

describe('n-popselect', () => {
  it('should work with import on demand', () => {
    mount(NPopselect, {
      slots: {
        default: () => 'star kirby'
      }
    })
  })
})
