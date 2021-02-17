import { mount } from '@vue/test-utils'
import { NPopconfirm } from '../index'

describe('n-popconfirm', () => {
  it('should work with import on demand', () => {
    mount(NPopconfirm, {
      slots: {
        trigger: () => 'star kirby'
      }
    })
  })
})
