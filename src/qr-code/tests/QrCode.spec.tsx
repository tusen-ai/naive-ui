import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NQrCode } from '../index'

describe('n-qr-code', () => {
  it('should work with import on demand', () => {
    mount(NQrCode)
  })

  it('should render canvas element by default', () => {
    const wrapper = mount(NQrCode, {
      props: { value: 'https://naive-ui.com' }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    expect(wrapper.find('canvas').exists()).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should render svg element when type is svg', () => {
    const wrapper = mount(NQrCode, {
      props: { value: 'https://naive-ui.com', type: 'svg' }
    })
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('canvas').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NQrCode, {
      props: { size: 200 }
    })
    const style = wrapper.find('.n-qr-code').attributes('style')
    expect(style).toContain('width: 200px')
    expect(style).toContain('height: 200px')

    await wrapper.setProps({ size: 300 })
    const updatedStyle = wrapper.find('.n-qr-code').attributes('style')
    expect(updatedStyle).toContain('width: 300px')
    expect(updatedStyle).toContain('height: 300px')
    wrapper.unmount()
  })

  it('should work with `padding` prop as number', () => {
    const wrapper = mount(NQrCode, {
      props: { padding: 20 }
    })
    const style = wrapper.find('.n-qr-code').attributes('style')
    expect(style).toContain('padding: 20px')
    wrapper.unmount()
  })

  it('should work with `padding` prop as string', () => {
    const wrapper = mount(NQrCode, {
      props: { padding: '8px 16px' }
    })
    const style = wrapper.find('.n-qr-code').attributes('style')
    expect(style).toContain('padding: 8px 16px')
    wrapper.unmount()
  })

  it('should work with `backgroundColor` prop', async () => {
    const wrapper = mount(NQrCode, {
      props: { backgroundColor: '#ff0000' }
    })
    const style = wrapper.find('.n-qr-code').attributes('style')
    expect(style).toContain('background-color: rgb(255, 0, 0)')
    wrapper.unmount()
  })

  it('should render svg with correct color in fill attribute', () => {
    const wrapper = mount(NQrCode, {
      props: { value: 'test', type: 'svg', color: '#ff0000' }
    })
    const svgHtml = wrapper.find('svg').html()
    expect(svgHtml).toContain('fill="#ff0000"')
    wrapper.unmount()
  })

  it('should render svg with icon when iconSrc is provided', () => {
    const wrapper = mount(NQrCode, {
      props: { value: 'test', type: 'svg', iconSrc: 'icon.png' }
    })
    const svgHtml = wrapper.find('svg').html()
    expect(svgHtml).toContain('icon.png')
    wrapper.unmount()
  })

  it('should apply correct canvas size styles', () => {
    const wrapper = mount(NQrCode, {
      props: { size: 150 }
    })
    const canvasStyle = wrapper.find('canvas').attributes('style')
    expect(canvasStyle).toContain('width: 150px')
    expect(canvasStyle).toContain('height: 150px')
    wrapper.unmount()
  })

  it('should use default values when no props are provided', () => {
    const wrapper = mount(NQrCode)
    const style = wrapper.find('.n-qr-code').attributes('style')
    expect(style).toContain('width: 100px')
    expect(style).toContain('height: 100px')
    expect(style).toContain('padding: 12px')
    wrapper.unmount()
  })

  it('should render svg with correct viewBox based on qr size', () => {
    const wrapper = mount(NQrCode, {
      props: { value: 'hello', type: 'svg', size: 100 }
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('viewBox')).toMatch(/^0 0 \d+ \d+$/)
    expect(svg.attributes('height')).toBe('100')
    expect(svg.attributes('width')).toBe('100')
    wrapper.unmount()
  })

  it('should work with `errorCorrectionLevel` prop', () => {
    ;(['L', 'M', 'Q', 'H'] as const).forEach((level) => {
      const wrapper = mount(NQrCode, {
        props: { value: 'test', type: 'svg', errorCorrectionLevel: level }
      })
      expect(wrapper.find('.n-qr-code').exists()).toBe(true)
      wrapper.unmount()
    })
  })
})
