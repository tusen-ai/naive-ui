import { mount } from '@vue/test-utils'
import { NCarousel } from '../index'

describe('n-carousel', () => {
  it('should work with import on demand', () => {
    mount(NCarousel)
  })
  it('should work with `dotPlacement` prop', async () => {
    const wrapper = mount(NCarousel)

    for (const placement of ['top', 'bottom', 'left', 'right'] as const) {
      await wrapper.setProps({ dotPlacement: placement })
      expect(wrapper.find('.n-carousel').classes()).toContain(
        `n-carousel--${placement}`
      )
    }
  })
})
