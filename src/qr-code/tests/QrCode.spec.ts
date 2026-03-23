import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { NQrCode } from '../index'

describe('n-qr-code', () => {
  it('should work with import on demand', () => {
    mount(NQrCode)
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'https://www.naive-ui.com'
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    expect(wrapper.find('canvas').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `color` prop', () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        color: '#ff0000'
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `backgroundColor` prop', () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        backgroundColor: '#f0f0f0'
      }
    })
    expect(wrapper.find('.n-qr-code').attributes('style')).toContain('background-color:')
    wrapper.unmount()
  })

  it('should work with `size` prop', () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        size: 200
      }
    })
    expect(wrapper.find('.n-qr-code').attributes('style')).toContain('width: 200px')
    expect(wrapper.find('.n-qr-code').attributes('style')).toContain('height: 200px')
    expect(wrapper.find('canvas').attributes('style')).toContain('width: 200px')
    expect(wrapper.find('canvas').attributes('style')).toContain('height: 200px')
    wrapper.unmount()
  })

  it('should work with `padding` prop', () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        padding: 20
      }
    })
    expect(wrapper.find('.n-qr-code').attributes('style')).toContain('padding: 20px')
    wrapper.unmount()
  })

  it('should work with string `padding` prop', () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        padding: '1rem'
      }
    })
    expect(wrapper.find('.n-qr-code').attributes('style')).toContain('padding: 1rem')
    wrapper.unmount()
  })

  it('should work with `type` prop as canvas', () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        type: 'canvas'
      }
    })
    expect(wrapper.find('canvas').exists()).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `type` prop as svg', async () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        type: 'svg'
      }
    })
    await nextTick()
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('canvas').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `errorCorrectionLevel` prop', () => {
    const levels = ['L', 'M', 'Q', 'H'] as const
    levels.forEach((level) => {
      const wrapper = mount(NQrCode, {
        props: {
          value: 'test',
          errorCorrectionLevel: level
        }
      })
      expect(wrapper.find('.n-qr-code').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  it('should work with `iconSrc` prop', () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        iconSrc: 'https://www.naive-ui.com/favicon.ico'
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `iconSize` prop', () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        iconSrc: 'https://www.naive-ui.com/favicon.ico',
        iconSize: 50
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `iconBackgroundColor` prop', () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        iconSrc: 'https://www.naive-ui.com/favicon.ico',
        iconBackgroundColor: '#ffffff'
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `iconBorderRadius` prop', () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        iconSrc: 'https://www.naive-ui.com/favicon.ico',
        iconBorderRadius: 8
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should render svg with correct attributes', async () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        type: 'svg',
        size: 150
      }
    })
    await nextTick()
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('width')).toBe('150')
    expect(svg.attributes('height')).toBe('150')
    expect(svg.attributes('viewBox')).toBeDefined()
    wrapper.unmount()
  })

  it('should handle empty value', () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: ''
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should handle undefined value', () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: undefined
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })
})
