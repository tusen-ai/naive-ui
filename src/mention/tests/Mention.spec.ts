import { mount } from '@vue/test-utils'
import { sleep } from 'seemly'
import { h } from 'vue'
import { NIcon } from '../../icon'
import { NMention } from '../index'

describe('n-mention', () => {
  const options = [
    {
      label: '07akioni',
      value: '07akioni'
    },
    {
      label: 'star-kirby',
      value: 'star-kirby'
    },
    {
      label: '广东路',
      value: '广东路'
    },
    {
      label: (option: any) =>
        h('span', null, [
          h(NIcon, { style: 'margin-right: 5px' }, { default: () => 'test' }),
          option.value
        ]),
      value: '颐和园路5号'
    }
  ]
  it('should work with import on demand', () => {
    mount(NMention)
  })

  it('should work with `options` prop', async () => {
    const wrapper = mount(NMention, {
      attachTo: document.body,
      props: { options }
    })

    wrapper.find('input').trigger('focus')
    wrapper.find('input').setValue('@')
    await sleep(150)
    vi.waitFor(async () => {
      expect(document.querySelector('.n-mention-menu')).not.toEqual(null)
      expect(document.querySelectorAll('.n-base-select-option').length).toBe(4)
    })
    wrapper.unmount()
  })

  it('should work with `autosize` prop', async () => {
    const wrapper = mount(NMention, {
      attachTo: document.body,
      props: { options, autosize: true }
    })

    expect(wrapper.find('.n-input').classes()).toContain('n-input--autosize')
    wrapper.unmount()
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount(NMention, {
      attachTo: document.body,
      props: { options }
    })

    expect(wrapper.find('.n-input').classes()).not.toContain(
      'n-input--textarea'
    )
    expect(wrapper.find('input').exists()).toBe(true)

    await wrapper.setProps({ type: 'text' })
    expect(wrapper.find('input').exists()).toBe(true)

    await wrapper.setProps({ type: 'textarea' })
    expect(wrapper.find('.n-input').classes()).toContain('n-input--textarea')
    expect(wrapper.find('textarea').exists()).toBe(true)
    wrapper.unmount()
  })

  it('should work with `bordered` prop', async () => {
    const wrapper = mount(NMention, {
      attachTo: document.body,
      props: { options }
    })

    expect(wrapper.find('.n-input__border').exists()).toBe(true)
    expect(wrapper.find('.n-input__state-border').exists()).toBe(true)

    await wrapper.setProps({ bordered: false })
    expect(wrapper.find('.n-input__border').exists()).not.toBe(true)
    expect(wrapper.find('.n-input__state-border').exists()).not.toBe(true)
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const wrapper = mount(NMention, {
      attachTo: document.body,
      props: { options }
    })

    expect(wrapper.find('.n-input').classes()).not.toContain(
      'n-input--disabled'
    )

    await wrapper.setProps({ disabled: true })
    expect(wrapper.find('.n-input').classes()).toContain('n-input--disabled')
    wrapper.unmount()
  })

  it('should work with `loading` prop', async () => {
    const wrapper = mount(NMention, {
      attachTo: document.body,
      props: { options, loading: true }
    })

    wrapper.find('input').element.focus()
    await wrapper.find('input').setValue('@')
    await sleep(150)
    expect(document.querySelector('.n-base-select-menu__loading')).not.toEqual(
      null
    )
    wrapper.unmount()
  })

  it('should work with `loading` prop 2', async () => {
    const wrapper = mount(NMention, {
      attachTo: document.body,
      props: { options, loading: true }
    })

    wrapper.find('input').element.focus()
    await wrapper.find('input').setValue('@')
    await sleep(150)
    expect(document.querySelector('.n-base-select-menu__loading')).not.toEqual(
      null
    )
    wrapper.unmount()
  })

  it('should work with `prefix` prop', async () => {
    const wrapper = mount(NMention, {
      attachTo: document.body,
      props: { options, prefix: '#' }
    })

    wrapper.find('input').trigger('focus')
    wrapper.find('input').setValue('#')
    await sleep(150)
    vi.waitFor(() => {
      expect(document.querySelector('.n-mention-menu')).not.toEqual(null)
      expect(document.querySelectorAll('.n-base-select-option').length).toBe(4)
    })
    wrapper.unmount()
  })

  it('should work with `on-update:value` prop', async () => {
    const onUpdate = vi.fn()
    const wrapper = mount(NMention, {
      attachTo: document.body,
      props: { options, 'on-update:value': onUpdate }
    })

    wrapper.find('input').trigger('focus')
    wrapper.find('input').setValue('@')
    await sleep(150)
    vi.waitFor(() => {
      expect(onUpdate).toHaveBeenCalled()
    })
    wrapper.unmount()
  })

  it('should work with `on-focus` prop', async () => {
    const onFocus = vi.fn()
    const wrapper = mount(NMention, {
      attachTo: document.body,
      props: { options, 'on-focus': onFocus }
    })

    wrapper.find('input').trigger('focus')
    await sleep(150)
    vi.waitFor(() => {
      expect(onFocus).toHaveBeenCalled()
    })
    wrapper.unmount()
  })

  // Test with problems
  // it('should work with `on-search` prop', async () => {
  //   const onSearch = vi.fn()
  //   const wrapper = mount(NMention, {
  //     attachTo: document.body,
  //     props: { options, 'on-search': onSearch, type: 'text' }
  //   })

  //   wrapper.find('input').element.focus()
  //   await wrapper.find('input').setValue('@')
  //   await sleep(150)
  //   expect(onSearch).toHaveBeenCalled()
  // })

  it('should work with `on-blur` prop', async () => {
    const onBlur = vi.fn()
    const wrapper = mount(NMention, {
      attachTo: document.body,
      props: { options, 'on-blur': onBlur }
    })
    wrapper.find('.n-input').trigger('focus')
    wrapper.find('.n-input').trigger('blur')
    vi.waitFor(() => {
      expect(onBlur).toHaveBeenCalled()
    })
    wrapper.unmount()
  })

  it('should work with `focus` method', async () => {
    const wrapper = mount(NMention, {
      attachTo: document.body,
      props: { options }
    })
    wrapper.find('.n-input').trigger('focus')
    vi.waitFor(() => {
      expect(wrapper.find('.n-input').classes()).toContain('n-input--focus')
    })
    wrapper.unmount()
  })

  it('should work with `blur` method', async () => {
    const wrapper = mount(NMention, {
      attachTo: document.body,
      props: { options }
    })

    wrapper.find('.n-input').trigger('focus')
    wrapper.find('.n-input').trigger('blur')
    vi.waitFor(() => {
      expect(wrapper.find('.n-input').classes()).not.toContain('n-input--focus')
    })
    wrapper.unmount()
  })
})
