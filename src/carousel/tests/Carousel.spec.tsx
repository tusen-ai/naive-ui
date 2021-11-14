import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NCarousel } from '../index'
import { sleep } from 'seemly'

describe('n-carousel', () => {
  it('should work with import on demand', () => {
    mount(NCarousel)
  })

  it('should work with `autoplay` and `interval` prop', async () => {
    const wrapper = mount(NCarousel, {
      slots: {
        default: () => {
          return [...Array(3).keys()].map((i) => {
            return h('div', {}, i.toString())
          })
        }
      }
    })

    await wrapper.setProps({ autoplay: true, interval: 50 })

    await sleep(25)
    ;([0, 1, 2, 3, 4] as const).forEach((i) => {
      if (i === 1) {
        expect(
          wrapper.find(`[data-index="${i}"]`).attributes('aria-hidden')
        ).toBe('false')
      } else {
        expect(
          wrapper.find(`[data-index="${i}"]`).attributes('aria-hidden')
        ).toBe('true')
      }
    })

    await sleep(75)
    ;([0, 1, 2, 3, 4] as const).forEach((i) => {
      if (i === 2) {
        expect(
          wrapper.find(`[data-index="${i}"]`).attributes('aria-hidden')
        ).toBe('false')
      } else {
        expect(
          wrapper.find(`[data-index="${i}"]`).attributes('aria-hidden')
        ).toBe('true')
      }
    })
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

  it('should work with `interval` prop', async () => {
    const wrapper = mount(NCarousel, {
      props: {
        interval: 100,
        autoplay: true
      },
      slots: {
        default: () => {
          return [...Array(3).keys()].map((i) => {
            return h('div', {}, i.toString())
          })
        }
      }
    })

    await sleep(100)
    expect(
      wrapper
        .find('.n-carousel__slides')
        .find('[data-index="2"]')
        .attributes('aria-hidden')
    ).toBe('false')
    expect(
      wrapper
        .find('.n-carousel__dots')
        .findAll('.n-carousel__dot')[1]
        .attributes('aria-selected')
    ).toBe('true')
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

  it('arrow button should work', async () => {
    const wrapper = mount(NCarousel, {
      slots: {
        default: () => {
          return [
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg'
            })
          ]
        }
      }
    })

    await wrapper.setProps({
      showArrow: true
    })

    const slidesDOMArray = wrapper.find('.n-carousel__slides').findAll('div')

    expect(slidesDOMArray[1].attributes('aria-hidden')).toBe('false')

    await wrapper.find('.n-carousel__arrow--right').trigger('click')

    expect(slidesDOMArray[2].attributes('aria-hidden')).toBe('false')

    // FIXME: has error in node 16, not quite sure what happened

    // await sleep(1000)
    // void wrapper
    //   .find('.n-carousel__arrow--left')
    //   .trigger('click')
    //   .then(() => {
    //     expect(slidesDOMArray[1].attributes('aria-hidden')).toBe('false')
    //   })
  })
})
