import { h } from 'vue'
import { mount } from '@vue/test-utils'
import {
  NA,
  NP,
  NText,
  NH1,
  NH2,
  NH6,
  NH5,
  NH4,
  NH3,
  NUl,
  NOl,
  NLi,
  NBlockquote
} from '../index'

describe('n-a', () => {
  it('should work with import on demand', () => {
    mount(NA)
  })

  it('should work with normal', () => {
    const wrapper = mount(NA, { props: { href: '/test' } })

    expect(wrapper.find('a').classes()).toContain('n-a')
    expect(wrapper.find('a').attributes('href')).toBe('/test')
  })
})

describe('n-text', () => {
  it('should work with import on demand', () => {
    mount(NText)
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount(NText, { slots: { default: () => 'test' } })

    expect(wrapper.find('.n-text').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ type: 'info' })
    expect(wrapper.find('.n-text').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ type: 'success' })
    expect(wrapper.find('.n-text').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ type: 'warning' })
    expect(wrapper.find('.n-text').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ type: 'error' })
    expect(wrapper.find('.n-text').attributes('style')).toMatchSnapshot()
  })

  it('should work with Font style', () => {
    let wrapper

    wrapper = mount(NText, {
      props: { strong: true },
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.n-text').classes()).toContain('n-text--strong')

    wrapper = mount(NText, {
      props: { italic: true },
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.n-text').classes()).toContain('n-text--italic')

    wrapper = mount(NText, {
      props: { underline: true },
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.n-text').classes()).toContain('n-text--underline')

    wrapper = mount(NText, {
      props: { delete: true },
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.n-text').classes()).toContain('n-text--delete')

    wrapper = mount(NText, {
      props: { code: true },
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.n-text').classes()).toContain('n-text--code')
  })

  it('should work with `depth` prop', async () => {
    const wrapper = mount(NText, { slots: { default: () => 'test' } })

    expect(wrapper.find('.n-text').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ depth: '1' })
    expect(wrapper.find('.n-text').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ depth: '2' })
    expect(wrapper.find('.n-text').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ depth: '3' })
    expect(wrapper.find('.n-text').attributes('style')).toMatchSnapshot()
  })

  it('should work with `tag` prop', async () => {
    const wrapper = mount(NText, {
      props: { tag: 'div' },
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.n-text').html()).toContain('test</div>')
  })
})

describe('n-p', () => {
  it('should work with import on demand', () => {
    mount(NP)
  })

  it('should work with `depth` prop', async () => {
    const wrapper = mount(NP, { slots: { default: () => 'test' } })

    expect(wrapper.find('p').classes()).toContain('n-p')

    await wrapper.setProps({ depth: '1' })
    expect(wrapper.find('.n-p').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ depth: '2' })
    expect(wrapper.find('.n-p').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ depth: '3' })
    expect(wrapper.find('.n-p').attributes('style')).toMatchSnapshot()
  })
})

describe('n-h1 n-h2 n-h3 n-h4 n-h5 n-h6', () => {
  it('should work with import on demand', () => {
    mount(NH1)
    mount(NH2)
    mount(NH3)
    mount(NH4)
    mount(NH5)
    mount(NH6)
  })

  it('should work with normal', async () => {
    let wrapper: any

    wrapper = mount(NH1, {
      props: { prefix: 'bar', alignText: true },
      slots: { default: () => 'test' }
    })
    ;(['n-h1', 'n-h--prefix-bar', 'n-h--align-text'] as const).forEach(
      (item) => {
        expect(wrapper.find('.n-h').classes()).toContain(item)
      }
    )
    expect(wrapper.find('.n-h').attributes('style')).toMatchSnapshot()

    wrapper = mount(NH2, {
      props: { prefix: 'bar', alignText: true, type: 'default' },
      slots: { default: () => 'test' }
    })
    ;(['n-h2', 'n-h--prefix-bar', 'n-h--align-text'] as const).forEach(
      (item) => {
        expect(wrapper.find('.n-h').classes()).toContain(item)
      }
    )
    expect(wrapper.find('.n-h').attributes('style')).toMatchSnapshot()

    wrapper = mount(NH3, {
      props: { prefix: 'bar', alignText: true, type: 'success' },
      slots: { default: () => 'test' }
    })
    ;(['n-h3', 'n-h--prefix-bar', 'n-h--align-text'] as const).forEach(
      (item) => {
        expect(wrapper.find('.n-h').classes()).toContain(item)
      }
    )
    expect(wrapper.find('.n-h').attributes('style')).toMatchSnapshot()

    wrapper = mount(NH4, {
      props: { prefix: 'bar', alignText: true, type: 'info' },
      slots: { default: () => 'test' }
    })
    ;(['n-h4', 'n-h--prefix-bar', 'n-h--align-text'] as const).forEach(
      (item) => {
        expect(wrapper.find('.n-h').classes()).toContain(item)
      }
    )
    expect(wrapper.find('.n-h').attributes('style')).toMatchSnapshot()

    wrapper = mount(NH5, {
      props: { prefix: 'bar', alignText: true, type: 'warning' },
      slots: { default: () => 'test' }
    })
    ;(['n-h5', 'n-h--prefix-bar', 'n-h--align-text'] as const).forEach(
      (item) => {
        expect(wrapper.find('.n-h').classes()).toContain(item)
      }
    )
    expect(wrapper.find('.n-h').attributes('style')).toMatchSnapshot()

    wrapper = mount(NH6, {
      props: { prefix: 'bar', alignText: true, type: 'error' },
      slots: { default: () => 'test' }
    })
    ;(['n-h6', 'n-h--prefix-bar', 'n-h--align-text'] as const).forEach(
      (item) => {
        expect(wrapper.find('.n-h').classes()).toContain(item)
      }
    )
    expect(wrapper.find('.n-h').attributes('style')).toMatchSnapshot()
  })
})

describe('n-ul n-ol n-li', () => {
  it('should work with import on demand', () => {
    mount(NUl)
    mount(NOl)
    mount(NLi)
  })

  it('should work with normal', () => {
    let wrapper = mount(NUl, {
      props: { alignText: true },
      slots: {
        default: () =>
          h(NLi, null, {
            default: () => 'test'
          })
      }
    })
    ;(['n-ul', 'n-ul--align-text'] as const).forEach((item) => {
      expect(wrapper.find('ul').classes()).toContain(item)
    })
    expect(wrapper.find('li').text()).toBe('test')
    expect(wrapper.find('ul').attributes('style')).toMatchSnapshot()

    wrapper = mount(NOl, {
      props: { alignText: true },
      slots: {
        default: () =>
          h(NLi, null, {
            default: () => 'test'
          })
      }
    })
    ;(['n-ol', 'n-ol--align-text'] as const).forEach((item) => {
      expect(wrapper.find('ol').classes()).toContain(item)
    })
    expect(wrapper.find('li').text()).toBe('test')
    expect(wrapper.find('ol').attributes('style')).toMatchSnapshot()
  })
})

describe('n-blockquote', () => {
  it('should work with import on demand', () => {
    mount(NBlockquote)
  })

  it('should work with normal', () => {
    const wrapper = mount(NBlockquote, {
      props: { alignText: true },
      slots: { default: () => 'test' }
    })

    ;(['n-blockquote', 'n-blockquote--align-text'] as const).forEach((item) => {
      expect(wrapper.find('blockquote').classes()).toContain(item)
    })
    expect(wrapper.find('blockquote').attributes('style')).toMatchSnapshot()
  })
})
