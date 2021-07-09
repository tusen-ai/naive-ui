import { h, nextTick } from 'vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { NCheckbox, NCheckboxGroup } from '../index'

function expectChecked (wrapper: VueWrapper<any>, value: boolean): void {
  expect(wrapper.classes().some((c) => c.includes('checked'))).toEqual(value)
}

describe('n-checkbox', () => {
  it('should work with import on demand', () => {
    mount(NCheckbox)
  })

  describe('uncontrolled mode', () => {
    it('works', async () => {
      const wrapper = mount(NCheckbox)
      expectChecked(wrapper, false)
      wrapper.trigger('click')
      await nextTick()
      expectChecked(wrapper, true)
      wrapper.trigger('click')
      await nextTick()
      expectChecked(wrapper, false)
    })
    it('props.defaultChecked', () => {
      const wrapper = mount(NCheckbox, {
        props: {
          defaultChecked: true
        }
      })
      expectChecked(wrapper, true)
    })
  })

  it('should work with `indeterminate` prop', () => {
    const wrapper = mount(NCheckbox, {
      props: {
        indeterminate: true
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.n-checkbox').classes()).toContain(
      'n-checkbox--indeterminate'
    )
  })

  it('should work with `disabled` prop', () => {
    const wrapper = mount(NCheckbox, {
      props: {
        disabled: true
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.n-checkbox').classes()).toContain(
      'n-checkbox--disabled'
    )
  })

  it('should work with `focusable` prop', async () => {
    const wrapper = mount(NCheckbox, {
      props: {
        focusable: false
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('[tabindex]').exists()).not.toBe(true)

    await wrapper.setProps({ focusable: true })
    expect(wrapper.find('[tabindex]').exists()).toBe(true)
    expect(wrapper.find('.n-checkbox').attributes('tabindex')).toContain('0')
  })

  it('should work with `label` prop', async () => {
    const wrapper = mount(NCheckbox, {
      props: {
        label: 'test'
      }
    })
    expect(wrapper.find('.n-checkbox__label').text()).toContain('test')
  })

  it('should work with `on-update:checked` prop', async () => {
    const onClick = jest.fn()
    const wrapper = mount(NCheckbox, {
      props: {
        'onUpdate:checked': onClick
      },
      slots: {
        default: () => 'test'
      }
    })

    wrapper.trigger('click')
    expect(onClick).toBeCalled()
  })

  it('should work with default slots', async () => {
    const wrapper = mount(NCheckbox, {
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('.n-checkbox__label').text()).toContain('test')
  })
})

describe('n-checkbox-group', () => {
  it('should work with import on demand', () => {
    mount(NCheckboxGroup)
  })

  it('should work with `disabled` prop', () => {
    const wrapper = mount(NCheckboxGroup, {
      props: {
        disabled: true
      },
      slots: {
        default: () => h(NCheckbox, null, { default: () => 'test' })
      }
    })
    expect(wrapper.find('.n-checkbox--disabled').exists()).toBe(true)
  })

  it('should work with `on-update:value` prop', async () => {
    const onClick = jest.fn()
    const wrapper = mount(NCheckboxGroup, {
      props: {
        'on-update:value': onClick
      },
      slots: {
        default: () => h(NCheckbox, { value: 'test' })
      }
    })
    await wrapper.findComponent(NCheckbox).trigger('click')
    expect(onClick).toBeCalled()
  })

  it('should work with default slots', async () => {
    const wrapper = mount(NCheckboxGroup, {
      props: {
        disabled: true
      },
      slots: {
        default: () => h(NCheckbox, null, { default: () => 'test' })
      }
    })
    expect(wrapper.find('.n-checkbox__label').text()).toContain('test')
  })
})
