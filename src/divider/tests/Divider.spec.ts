import { mount } from '@vue/test-utils'
import { NDivider } from '../index'

describe('n-divider', () => {
  it('should work with import on demand', () => {
    mount(NDivider)
  })
  it('default slot', () => {
    const str = 'star kirby'
    const wrapper = mount(NDivider, {
      slots: {
        default: () => str
      }
    })
    wrapper.text().includes(str)
  })
})
