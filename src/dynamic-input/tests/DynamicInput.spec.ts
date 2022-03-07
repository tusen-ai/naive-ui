import { mount } from '@vue/test-utils'
import { NDynamicInput } from '../index'

describe('n-dynamic-input', () => {
  it('should work with import on demand', () => {
    mount(NDynamicInput)
  })

  it('should work with `value`', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: ['aaa']
      }
    })

    const inputEl = await wrapper.find('input')
    expect(inputEl.element.value).toEqual('aaa')
    expect(wrapper.html()).toContain('data-key="0"')
  })

  it('should work with `create-button-props` props', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: [],
        createButtonProps: {
          dashed: true
        }
      }
    })

    expect(wrapper.find('.n-button').classes()).toContain('n-button--dashed')
  })

  it('should work with `preset` props', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: ['aaa']
      }
    })
    expect(wrapper.find('.n-dynamic-input-preset-input').exists()).toBe(true)
    expect(wrapper.find('.n-dynamic-input-preset-pair').exists()).toBe(false)

    await wrapper.setProps({
      preset: 'pair',
      value: [
        {
          key: 'key',
          value: 'value'
        }
      ]
    })
    expect(wrapper.find('.n-dynamic-input-preset-input').exists()).toBe(false)
    expect(wrapper.find('.n-dynamic-input-preset-pair').exists()).toBe(true)
  })

  it('should work with `show-sort-button` props', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: ['aaa'],
        showSortButton: true
      }
    })

    expect(wrapper.findAll('button').length).toBe(4)
  })

  it('should work with `item-style` prop', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: ['aaa'],
        itemStyle: { color: 'green' }
      }
    })

    expect(
      wrapper.findAll('.n-dynamic-input-item')[0].attributes('style')
    ).toBe('color: green;')
  })

  it('should work with `min` `max` prop', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: ['', '', ''],
        min: 2,
        max: 4
      }
    })
    expect(wrapper.find('.n-button--disabled').exists()).toBe(false)

    await wrapper.setProps({ value: ['', ''] })
    expect(wrapper.findAll('button')[0].classes()).toContain(
      'n-button--disabled'
    )

    await wrapper.setProps({ value: ['', '', '', ''] })
    expect(wrapper.findAll('button')[1].classes()).toContain(
      'n-button--disabled'
    )
  })

  it('should work with `placeholder` prop', async () => {
    const wrapper = mount(NDynamicInput, {
      props: {
        value: [''],
        placeholder: 'test'
      }
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('test')
  })
})
