import { mount } from '@vue/test-utils'
import { NEquation } from '../index'

const mockKatex = {
  renderToString: (value: string) => {
    return `<span class="katex"><span class="katex-mathml"><math><semantics><mrow><mi>${value}</mi></mrow></semantics></math></span></span>`
  }
}

describe('n-equation', () => {
  it('should work with import on demand', () => {
    mount(NEquation)
  })

  it('should render with default props', () => {
    const wrapper = mount(NEquation)
    expect(wrapper.html()).toContain('no katex provided')
    wrapper.unmount()
  })

  it('should work with `value` prop', () => {
    const wrapper = mount(NEquation, {
      props: {
        value: 'E = mc^2',
        katex: mockKatex
      }
    })
    expect(wrapper.html()).toContain('E = mc^2')
    wrapper.unmount()
  })

  it('should work with `katex` prop', () => {
    const wrapper = mount(NEquation, {
      props: {
        value: 'x^2',
        katex: mockKatex
      }
    })
    expect(wrapper.find('.katex').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `katexOptions` prop', () => {
    const wrapper = mount(NEquation, {
      props: {
        value: '\\frac{a}{b}',
        katex: mockKatex,
        katexOptions: {
          displayMode: true
        }
      }
    })
    expect(wrapper.html()).toContain('\\frac{a}{b}')
    wrapper.unmount()
  })

  it('should handle empty value', () => {
    const wrapper = mount(NEquation, {
      props: {
        value: '',
        katex: mockKatex
      }
    })
    expect(wrapper.html()).toBeTruthy()
    wrapper.unmount()
  })

  it('should work without katex', () => {
    const wrapper = mount(NEquation, {
      props: {
        value: 'E = mc^2'
      }
    })
    expect(wrapper.html()).toContain('no katex provided')
    wrapper.unmount()
  })

  it('should render complex equation', () => {
    const complexKatex = {
      renderToString: (value: string) => {
        return `<span class="katex"><span class="katex-html">${value}</span></span>`
      }
    }
    const wrapper = mount(NEquation, {
      props: {
        value: '\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}',
        katex: complexKatex
      }
    })
    expect(wrapper.html()).toContain('katex')
    wrapper.unmount()
  })
})
