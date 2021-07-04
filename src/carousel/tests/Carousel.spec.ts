import { mount } from '@vue/test-utils'
import { NCarousel } from '../index'

describe('n-carousel', () => {
  it('should work with import on demand', () => {
    mount(NCarousel)
  })
  it('should work with `dotPosition` prop', async () => {
    const wrapper = mount(NCarousel)

    const position = ['top', 'bottom', 'left', 'right']

    for (let index = 0; index < position.length; index++) {
      const element = position[index]
      await wrapper.setProps({ dotPosition: element })

      expect(wrapper.find('.n-carousel').classes()).toContain(
        `n-carousel--${element}`
      )
    }
  })
})
