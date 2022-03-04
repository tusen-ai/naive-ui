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
