import { mount } from '@vue/test-utils'
import { NProgress } from '../index'
import { SuccessIcon } from '../../_internal/icons'

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
      wrapper.unmount()
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
    wrapper.unmount()
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
    wrapper.unmount()
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
    wrapper.unmount()
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
    wrapper.unmount()
  })

  it('should work with slot', async () => {
    const wrapper = mount(NProgress, {
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.n-progress-custom-content').exists()).toBe(true)
    expect(wrapper.find('.n-progress-custom-content').text()).toBe('test')

    await wrapper.setProps({ showIndicator: false, type: 'circle' })
    expect(wrapper.find('.n-progress-custom-content').exists()).toBe(false)

    await wrapper.setProps({ showIndicator: true })
    expect(wrapper.find('.n-progress-custom-content').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should show icon with `circle` type', () => {
    const wrapper = mount(NProgress, {
      props: {
        type: 'circle',
        showIndicator: true,
        status: 'success'
      }
    })

    expect(wrapper.findComponent(SuccessIcon).exists()).toBe(true)
    wrapper.unmount()
  })

  it('should show icon with `line` type', () => {
    const wrapper = mount(NProgress, {
      props: {
        type: 'line',
        showIndicator: true,
        indicatorPlacement: 'outside',
        status: 'success'
      }
    })

    expect(wrapper.findComponent(SuccessIcon).exists()).toBe(true)
    wrapper.unmount()
  })

  it('should show correct style with `line` type', async () => {
    const wrapper = mount(NProgress, {
      props: {
        type: 'line',
        percentage: 50,
        borderRadius: 50
      }
    })

    expect(
      wrapper.find('.n-progress-graph-line-rail').attributes('style')
    ).toContain('border-radius: 50px;')

    await wrapper.setProps({ indicatorPlacement: 'inside' })
    expect(wrapper.find('.n-progress-graph-line-indicator').exists()).toBe(true)
    expect(wrapper.find('.n-progress-graph-line-indicator').text()).toBe('50%')
    wrapper.unmount()
  })

  it('should show correct style with `multiple-circle` type', async () => {
    const wrapper = mount(NProgress, {
      props: {
        type: 'multiple-circle'
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('.n-progress-text').exists()).toBe(true)
    wrapper.unmount()
  })
})
