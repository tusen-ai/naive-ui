import { h, nextTick } from 'vue'
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

    await sleep(10)
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

    await sleep(60)
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
              src: 'https://s.anw.red/news/1623152423.jpg!/both/800x450/quality/78/progressive/true/ignore-error/true'
            }),
            h('img', {
              style: 'width: 100%; height: 240px; object-fit: cover;',
              src: 'https://s.anw.red/news/1623152423.jpg!/both/800x450/quality/78/progressive/true/ignore-error/true'
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

    wrapper
      .find('.n-carousel__arrow--right')
      .trigger('click')
      .then(async () => {
        expect(slidesDOMArray[2].attributes('aria-hidden')).toBe('false')
        await sleep(1000)
        nextTick(() => {
          wrapper
            .find('.n-carousel__arrow--left')
            .trigger('click')
            .then(() => {
              expect(slidesDOMArray[1].attributes('aria-hidden')).toBe('false')
            })
        })
      })
  })
})
