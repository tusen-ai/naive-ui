import { mount } from '@vue/test-utils'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { NMarkdown } from '../index'

const markdown = unified().use(remarkParse)

function mountMarkdown(props: Record<string, unknown>) {
  return mount(NMarkdown, {
    props: {
      markdown,
      ...props
    }
  })
}

describe('n-markdown', () => {
  it('should work with import on demand', () => {
    mount(NMarkdown)
  })

  it('should render raw source when markdown processor is not set', () => {
    const wrapper = mount(NMarkdown, {
      props: {
        source: '# Title'
      }
    })
    expect(wrapper.text()).toContain('# Title')
    wrapper.unmount()
  })

  it('should render basic markdown tokens', () => {
    const wrapper = mountMarkdown({
      source: '# Title\n\nText with **bold** and `code`.'
    })
    expect(wrapper.find('.n-markdown').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe('Title')
    expect(wrapper.find('.n-text--strong').text()).toBe('bold')
    expect(wrapper.find('.n-text--code').text()).toBe('code')
    wrapper.unmount()
  })

  it('should sanitize unsafe links', () => {
    const wrapper = mountMarkdown({
      source: '[x](javascript:alert(1)) and [y](https://example.com)'
    })
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(1)
    expect(links[0].attributes('href')).toBe('https://example.com')
    wrapper.unmount()
  })

  it('should allow unsafe links when sanitize is false', () => {
    const wrapper = mountMarkdown({
      sanitize: false,
      source: '[x](javascript:alert(1))'
    })
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(1)
    expect(links[0].attributes('href')).toBe('javascript:alert(1)')
    wrapper.unmount()
  })

  it('should escape raw html when sanitize is true', () => {
    const wrapper = mountMarkdown({
      source: '<b>hi</b>'
    })
    expect(wrapper.find('b').exists()).toBe(false)
    expect(wrapper.text()).toContain('<b>hi</b>')
    wrapper.unmount()
  })

  it('should render raw html when sanitize is false', () => {
    const wrapper = mountMarkdown({
      sanitize: false,
      source: '<b>hi</b>'
    })
    expect(wrapper.find('b').exists()).toBe(true)
    expect(wrapper.find('b').text()).toBe('hi')
    wrapper.unmount()
  })

  it('should render sanitized raw html when sanitizeHtml provided', () => {
    const sanitizeHtml = vi.fn((html: string) => html)
    const wrapper = mountMarkdown({
      source: '<b>hi</b>',
      sanitizeHtml
    })
    expect(sanitizeHtml).toHaveBeenCalledWith('<b>hi</b>')
    expect(wrapper.find('b').exists()).toBe(true)
    expect(wrapper.find('b').text()).toBe('hi')
    wrapper.unmount()
  })

  it('should highlight code blocks when hljs provided', () => {
    const wrapper = mountMarkdown({
      source: '```js\nconst a = 1\n```',
      hljs: {
        getLanguage: () => true,
        highlight: () => ({
          value: '<span class="hljs-keyword">const</span> a = 1'
        })
      }
    })
    expect(wrapper.find('.hljs-keyword').exists()).toBe(true)
    wrapper.unmount()
  })
})
