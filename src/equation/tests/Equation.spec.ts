import { mount } from '@vue/test-utils'
import { h, provide, ref } from 'vue'
import { NConfigProvider, configProviderInjectionKey } from '../../config-provider'
import { NEquation } from '../index'

// Mock katex
const mockKatex = {
  renderToString: (content: string, options?: any) => {
    return `<span class="katex"><span class="katex-html">${content}</span></span>`
  }
}

describe('n-equation', () => {
  it('should work with import on demand', () => {
    mount(NConfigProvider, {
      slots: {
        default: () => h(NEquation)
      }
    })
  })

  it('should work with `value` prop', () => {
    const wrapper = mount(NConfigProvider, {
      props: {
        katex: mockKatex
      },
      slots: {
        default: () => h(NEquation, {
          value: 'E = mc^2'
        })
      }
    })
    expect(wrapper.find('.katex').exists()).toBe(true)
    expect(wrapper.find('.katex-html').text()).toBe('E = mc^2')
    wrapper.unmount()
  })

  it('should work without katex', () => {
    const wrapper = mount(NEquation, {
      props: {
        value: 'E = mc^2'
      }
    })
    expect(wrapper.text()).toContain('no katex provided')
    wrapper.unmount()
  })

  it('should work with `katex` prop directly', () => {
    const wrapper = mount(NEquation, {
      props: {
        value: 'E = mc^2',
        katex: mockKatex
      }
    })
    expect(wrapper.find('.katex').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `katexOptions` prop', () => {
    const renderSpy = vi.spyOn(mockKatex, 'renderToString')
    const wrapper = mount(NEquation, {
      props: {
        value: 'E = mc^2',
        katex: mockKatex,
        katexOptions: {
          throwOnError: true,
          displayMode: true
        }
      }
    })
    expect(renderSpy).toHaveBeenCalledWith(
      'E = mc^2',
      expect.objectContaining({
        throwOnError: true,
        displayMode: true
      })
    )
    renderSpy.mockRestore()
    wrapper.unmount()
  })

  it('should work with empty value', () => {
    const wrapper = mount(NEquation, {
      props: {
        value: '',
        katex: mockKatex
      }
    })
    expect(wrapper.find('.katex').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with undefined value', () => {
    const wrapper = mount(NEquation, {
      props: {
        value: undefined,
        katex: mockKatex
      }
    })
    expect(wrapper.find('.katex').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with config provider injection', () => {
    const wrapper = mount(NConfigProvider, {
      props: {
        katex: mockKatex
      },
      slots: {
        default: () => h(NEquation, {
          value: 'E = mc^2'
        })
      }
    })
    expect(wrapper.find('.katex').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should render correctly with complex equation', () => {
    const complexEquation = '\\frac{\\partial u}{\\partial t} = \\alpha \\nabla^2 u'
    const wrapper = mount(NEquation, {
      props: {
        value: complexEquation,
        katex: mockKatex
      }
    })
    expect(wrapper.find('.katex').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should handle katex options correctly', () => {
    const renderSpy = vi.spyOn(mockKatex, 'renderToString')
    const wrapper = mount(NEquation, {
      props: {
        value: 'E = mc^2',
        katex: mockKatex,
        katexOptions: {
          displayMode: false,
          throwOnError: false,
          strict: 'warn'
        }
      }
    })
    expect(renderSpy).toHaveBeenCalledWith(
      'E = mc^2',
      expect.objectContaining({
        displayMode: false,
        throwOnError: false,
        strict: 'warn'
      })
    )
    renderSpy.mockRestore()
    wrapper.unmount()
  })
})
