import { mount } from '@vue/test-utils'
import { NProgress } from '../index'

describe('n-progress', () => {
  it('should work with import on demand', () => {
    mount(NProgress)
  })

  it('should work with `type` prop', async () => {
    ;(['line', 'circle', 'multiple-circle'] as const).forEach((item) => {
      const wrapper = mount(NProgress, { props: { type: item } })
      expect(wrapper.find('.n-progress').classes()).toContain(
        `n-progress--${item}`
      )
    })
  })

  it('should work with `color`, `rail-color`, `indicator-text-color` prop', async () => {
    const wrapper = mount(NProgress, {
      props: {
        color: 'rgb(51, 51, 51)',
        'rail-color': 'rgb(68, 68, 68)',
        'indicator-text-color': 'rgb(85, 85, 85)'
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(
      wrapper.find('.n-progress-graph-line-fill').attributes('style')
    ).toContain('background-color: rgb(51, 51, 51);')
    expect(
      wrapper.find('.n-progress-graph-line-rail').attributes('style')
    ).toContain('background-color: rgb(68, 68, 68);')
    expect(
      wrapper.find('.n-progress-custom-content').attributes('style')
    ).toContain('color: rgb(85, 85, 85);')
  })

  it('should work with `border-radius`, `fill-border-radius` prop', async () => {
    const wrapper = mount(NProgress, {
      props: {
        'border-radius': '12px',
        'fill-border-radius': '13px'
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(
      wrapper.find('.n-progress-graph-line-rail').attributes('style')
    ).toContain('border-radius: 12px')
    expect(
      wrapper.find('.n-progress-graph-line-fill').attributes('style')
    ).toContain('border-radius: 13px')
  })

  it('should work with `height` prop', async () => {
    const wrapper = mount(NProgress, {
      props: {
        height: 24
      }
    })
    expect(
      wrapper.find('.n-progress-graph-line-rail').attributes('style')
    ).toContain('height: 24')
  })

  it('should work with `processing` prop', async () => {
    const wrapper = mount(NProgress, {
      props: {
        processing: true
      }
    })
    expect(wrapper.find('.n-progress-graph-line-fill').classes()).toContain(
      'n-progress-graph-line-fill--processing'
    )
  })

  it('should work with slot', async () => {
    const wrapper = mount(NProgress, {
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.n-progress-custom-content').exists()).toBe(true)
    expect(wrapper.find('.n-progress-custom-content').text()).toBe('test')
  })
})
