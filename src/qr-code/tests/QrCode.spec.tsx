import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { NQrCode } from '../index'

describe('n-qr-code', () => {
  it('should work with import on demand', () => {
    mount(NQrCode)
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(NQrCode, {
      props: { value: 'https://example.com' }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        size: 200
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `color` prop', async () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        color: '#ff0000'
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `backgroundColor` prop', async () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        backgroundColor: '#ffff00'
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `padding` prop', async () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        padding: 20
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `errorCorrectionLevel` prop', async () => {
    const levels = ['L', 'M', 'Q', 'H'] as const
    for (const level of levels) {
      const wrapper = mount(NQrCode, {
        props: {
          value: 'test',
          errorCorrectionLevel: level
        }
      })
      expect(wrapper.find('.n-qr-code').exists()).toBe(true)
      wrapper.unmount()
    }
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        type: 'svg'
      }
    })
    await nextTick()
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `iconSrc` prop', async () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        iconSrc: 'https://example.com/icon.png'
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `iconSize` prop', async () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        iconSrc: 'https://example.com/icon.png',
        iconSize: 50
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `iconBackgroundColor` prop', async () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        iconSrc: 'https://example.com/icon.png',
        iconBackgroundColor: '#ffffff'
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `iconBorderRadius` prop', async () => {
    const wrapper = mount(NQrCode, {
      props: {
        value: 'test',
        iconSrc: 'https://example.com/icon.png',
        iconBorderRadius: 8
      }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should handle empty value gracefully', () => {
    const wrapper = mount(NQrCode, {
      props: { value: '' }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should handle long value', () => {
    const longValue = 'a'.repeat(1000)
    const wrapper = mount(NQrCode, {
      props: { value: longValue }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should handle special characters in value', () => {
    const specialValue = 'https://example.com?foo=bar&baz=qux#hash'
    const wrapper = mount(NQrCode, {
      props: { value: specialValue }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should handle unicode characters in value', () => {
    const unicodeValue = '你好世界 🌍 ñáéíóú'
    const wrapper = mount(NQrCode, {
      props: { value: unicodeValue }
    })
    expect(wrapper.find('.n-qr-code').exists()).toBe(true)
    wrapper.unmount()
  })
})
