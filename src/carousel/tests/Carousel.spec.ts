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

  it('should work with `showArrow` prop', async () => {
    const wrapper = mount(NCarousel)

    const dotToArrow = [
      {
        dot: ['top', 'bottom'],
        arrow: ['left', 'right']
      },
      {
        dot: ['left', 'right'],
        arrow: ['top', 'bottom']
      }
    ]

    for (const item of dotToArrow) {
      for (const dotItem of item.dot) {
        await wrapper.setProps({ showArrow: true, dotPlacement: dotItem })

        expect(
          wrapper.find(`.n-carousel__arrow--${item.arrow[0]}`).exists()
        ).toBe(true)
        expect(
          wrapper.find(`.n-carousel__arrow--${item.arrow[1]}`).exists()
        ).toBe(true)
      }
    }
  })
})
