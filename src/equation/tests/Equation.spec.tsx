import { mount } from '@vue/test-utils'
import { h, provide, ref } from 'vue'
import { configProviderInjectionKey } from '../../config-provider/src/context'
import { NEquation } from '../index'

describe('n-equation', () => {
  it('should work with import on demand', () => {
    mount(NEquation)
  })

  it('should work with `value` prop', async () => {
    const wrapper = mount(NEquation, {
      props: { value: 'E = mc^2' }
    })
    expect(
      wrapper.find('.katex').exists() || wrapper.text().includes('no katex')
    ).toBe(true)
    wrapper.unmount()
  })

  it('should work with `katex` prop', async () => {
    const mockKatex = {
      renderToString: (value: string) => `<span class="katex">${value}</span>`
    }
    const wrapper = mount(NEquation, {
      props: {
        value: 'x^2 + y^2 = z^2',
        katex: mockKatex as any
      }
    })
    expect(wrapper.find('.katex').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `katexOptions` prop', async () => {
    const mockKatex = {
      renderToString: (value: string, options: any) => {
        expect(options.throwOnError).toBe(false)
        expect(options.displayMode).toBe(true)
        return `<span class="katex">${value}</span>`
      }
    }
    const wrapper = mount(NEquation, {
      props: {
        value: '\\sum_{i=1}^n x_i',
        katex: mockKatex as any,
        katexOptions: { displayMode: true }
      }
    })
    expect(wrapper.find('.katex').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should handle empty value', () => {
    const mockKatex = {
      renderToString: (value: string) => `<span class="katex">${value}</span>`
    }
    const wrapper = mount(NEquation, {
      props: {
        value: '',
        katex: mockKatex as any
      }
    })
    expect(wrapper.find('.katex').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should render "no katex provided" when katex is not available', () => {
    const wrapper = mount(NEquation, {
      props: { value: 'x = 1' }
    })
    expect(wrapper.text()).toContain('no katex')
    wrapper.unmount()
  })

  it('should use katex from config provider', () => {
    const mockKatex = {
      renderToString: (value: string) =>
        `<span class="katex-config">${value}</span>`
    }

    const wrapper = mount({
      setup() {
        provide(configProviderInjectionKey, {
          mergedKatexRef: ref(mockKatex)
        } as any)
        return () => h(NEquation, { value: 'y = mx + b' })
      }
    })

    expect(wrapper.find('.katex-config').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should handle complex LaTeX expressions', () => {
    const mockKatex = {
      renderToString: (value: string) => `<span class="katex">${value}</span>`
    }
    const complexExpressions = [
      '\\frac{a}{b}',
      '\\sqrt{x^2 + y^2}',
      '\\int_{a}^{b} f(x) dx',
      '\\sum_{i=1}^{n} i^2',
      '\\begin{matrix} a & b \\\\ c & d \\end{matrix}'
    ]

    for (const expr of complexExpressions) {
      const wrapper = mount(NEquation, {
        props: {
          value: expr,
          katex: mockKatex as any
        }
      })
      expect(wrapper.find('.katex').exists()).toBe(true)
      wrapper.unmount()
    }
  })

  it('should handle special characters in math expressions', () => {
    const mockKatex = {
      renderToString: (value: string) => `<span class="katex">${value}</span>`
    }
    const wrapper = mount(NEquation, {
      props: {
        value: '\\alpha \\beta \\gamma \\neq \\infty',
        katex: mockKatex as any
      }
    })
    expect(wrapper.find('.katex').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should extract correct wrapper tag and class from katex output', () => {
    const mockKatex = {
      renderToString: () => '<div class="katex-display">content</div>'
    }
    const wrapper = mount(NEquation, {
      props: {
        value: 'test',
        katex: mockKatex as any
      }
    })
    expect(wrapper.find('div.katex-display').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should handle inline math expressions', () => {
    const mockKatex = {
      renderToString: () => '<span class="katex">inline</span>'
    }
    const wrapper = mount(NEquation, {
      props: {
        value: '$x = 1$',
        katex: mockKatex as any
      }
    })
    expect(wrapper.find('span.katex').exists()).toBe(true)
    wrapper.unmount()
  })
})
