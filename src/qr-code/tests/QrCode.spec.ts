import { mount } from '@vue/test-utils'
import { NQrCode } from '../index'

describe('n-qr-code', () => {
  it('should work with import on demand', () => {
    mount(NQrCode)
  })

  it('should render with default props', () => {
    const wrapper = mount(NQrCode)
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `value` prop', () => {
    const wrapper = mount(NQrCode, {
      props: { value: 'https://www.naiveui.com' }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `size` prop', () => {
    const wrapper = mount(NQrCode, {
      props: { size: 200 }
    })
    const qrCode = wrapper.find('.n-qr-code')
    expect(qrCode.exists()).toBe(true)
    expect(qrCode.attributes('style')).toContain('width: 200px')
    expect(qrCode.attributes('style')).toContain('height: 200px')
    wrapper.unmount()
  })

  it('should work with `color` prop', () => {
    const wrapper = mount(NQrCode, {
      props: { color: '#1890ff' }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `backgroundColor` prop', () => {
    const wrapper = mount(NQrCode, {
      props: { backgroundColor: '#f5f5f5' }
    })
    const qrCode = wrapper.find('.n-qr-code')
    expect(qrCode.exists()).toBe(true)
    expect(qrCode.attributes('style')).toContain('background-color')
    wrapper.unmount()
  })

  it('should work with `padding` prop as number', () => {
    const wrapper = mount(NQrCode, {
      props: { padding: 20 }
    })
    const qrCode = wrapper.find('.n-qr-code')
    expect(qrCode.exists()).toBe(true)
    expect(qrCode.attributes('style')).toContain('padding: 20px')
    wrapper.unmount()
  })

  it('should work with `padding` prop as string', () => {
    const wrapper = mount(NQrCode, {
      props: { padding: '30px' }
    })
    const qrCode = wrapper.find('.n-qr-code')
    expect(qrCode.exists()).toBe(true)
    expect(qrCode.attributes('style')).toContain('padding: 30px')
    wrapper.unmount()
  })

  it('should work with `errorCorrectionLevel` prop', () => {
    const levels = ['L', 'M', 'Q', 'H'] as const
    for (const level of levels) {
      const wrapper = mount(NQrCode, {
        props: { errorCorrectionLevel: level }
      })
      expect(wrapper.find('.n-qr-code').exists()).toBe(true)
      wrapper.unmount()
    }
  })

  it('should work with `type` prop as canvas', () => {
    const wrapper = mount(NQrCode, {
      props: { type: 'canvas' }
    })
    expect(wrapper.find('canvas').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `type` prop as svg', () => {
    const wrapper = mount(NQrCode, {
      props: { type: 'svg' }
    })
    expect(wrapper.find('svg').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should render svg with correct attributes', () => {
    const wrapper = mount(NQrCode, {
      props: {
        type: 'svg',
        size: 150,
        value: 'test'
      }
    })
    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
    expect(svg.attributes('role')).toBe('img')
    wrapper.unmount()
  })

  it('should work with `iconSize` prop', () => {
    const wrapper = mount(NQrCode, {
      props: { iconSize: 60 }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `iconBorderRadius` prop', () => {
    const wrapper = mount(NQrCode, {
      props: { iconBorderRadius: 8 }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `iconBackgroundColor` prop', () => {
    const wrapper = mount(NQrCode, {
      props: { iconBackgroundColor: '#fff' }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should handle empty value', () => {
    const wrapper = mount(NQrCode, {
      props: { value: '' }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })
})
