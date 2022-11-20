import { h } from 'vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { NCheckbox, NCheckboxGroup } from '../index'
import { NForm, NFormItem } from '../../form'

function expectChecked (wrapper: VueWrapper<any>, value: boolean): void {
  expect(wrapper.classes().some((c) => c.includes('checked'))).toEqual(value)
  expect(wrapper.find('.n-checkbox').attributes('aria-checked')).toBe(
    value.toString()
  )
}

describe('n-checkbox', () => {
  it('should work with import on demand', () => {
    mount(NCheckbox)
  })

  describe('uncontrolled mode', () => {
    it('works', async () => {
      const wrapper = mount(NCheckbox)
      expectChecked(wrapper, false)
      await wrapper.trigger('click')
      expectChecked(wrapper, true)
      await wrapper.trigger('click')
      expectChecked(wrapper, false)
      wrapper.unmount()
    })
    it('props.defaultChecked', () => {
      const wrapper = mount(NCheckbox, {
        props: {
          defaultChecked: true
        }
      })
      expectChecked(wrapper, true)
      wrapper.unmount()
    })
  })

  it('should work with `checked-value` prop', async () => {
    const onUpdateChecked = jest.fn()
    const wrapper = mount(NCheckbox, {
      props: {
        checkedValue: 'fooo',
        uncheckedValue: 'barr',
        onUpdateChecked
      }
    })
    await wrapper.trigger('click')
    expect(onUpdateChecked.mock.calls[0][0]).toEqual('fooo')
    await wrapper.trigger('click')
    expect(onUpdateChecked.mock.calls[1][0]).toEqual('barr')
    await wrapper.trigger('click')
    expect(onUpdateChecked.mock.calls[2][0]).toEqual('fooo')
    wrapper.unmount()
  })

  it('should work with `checked-value` prop in type layer', () => {
    const onUpdateChecked1: (value: string) => void = () => {}
    const onUpdateChecked2: (value: number) => void = () => {}
    const onUpdateChecked3: (value: boolean) => void = () => {}
    let _ = (
      <NCheckbox
        onUpdateChecked={onUpdateChecked1}
        checked={'123'}
        defaultChecked={'123'}
      />
    )
    _ = (
      <NCheckbox
        onUpdateChecked={onUpdateChecked2}
        checked={123}
        defaultChecked={123}
      />
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ = (
      <NCheckbox
        onUpdateChecked={onUpdateChecked3}
        checked={true}
        defaultChecked={false}
      />
    )
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
    expect(wrapper.find('.n-checkbox').attributes('aria-checked')).toBe('mixed')
    wrapper.unmount()
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
    wrapper.unmount()
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
    wrapper.unmount()
  })

  it('should work with `label` prop', async () => {
    const wrapper = mount(NCheckbox, {
      props: {
        label: 'test'
      }
    })
    expect(wrapper.find('.n-checkbox__label').text()).toContain('test')
    wrapper.unmount()
  })

  it('should work with `on-update:checked` & `onUpdateChecked` prop', async () => {
    const onClick = jest.fn()
    const wrapper = mount(NCheckbox, {
      props: {
        'onUpdate:checked': onClick,
        onUpdateChecked: onClick
      },
      slots: {
        default: () => 'test'
      }
    })

    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(2)
    wrapper.unmount()
  })

  it('should work with default slots', async () => {
    const wrapper = mount(NCheckbox, {
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('.n-checkbox__label').text()).toContain('test')
    wrapper.unmount()
  })

  it('should work with `size` prop', () => {
    ;(['small', 'medium', 'large'] as const).forEach((i) => {
      const wrapper = mount(NCheckbox, { props: { size: i } })
      expect(wrapper.find('.n-checkbox').attributes('style')).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should show correct style with `NForm` component', () => {
    const wrapper = mount(() => (
      <NForm size="medium">
        {{
          default: () => {
            return (
              <NFormItem>
                {{
                  default: () => <NCheckbox />
                }}
              </NFormItem>
            )
          }
        }}
      </NForm>
    ))

    expect(wrapper.find('.n-checkbox').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  describe('accessibility', () => {
    it('should have a role of "checkbox"', () => {
      const wrapper = mount(NCheckbox)
      expect(wrapper.find('.n-checkbox').attributes('role')).toBe('checkbox')
      wrapper.unmount()
    })

    it('should set a default aria-labelledby', () => {
      const labelId = 'custom-id'
      const wrapper = mount(() => <NCheckbox aria-labelledby={labelId} />)
      expect(wrapper.find('.n-checkbox').attributes('aria-labelledby')).toMatch(
        labelId
      )
      wrapper.unmount()
    })

    it('should allow to set aria-labelledby from outside', () => {
      const wrapper = mount(NCheckbox)
      const labelId = wrapper.find('.n-checkbox__label').attributes('id')
      expect(wrapper.find('.n-checkbox').attributes('aria-labelledby')).toBe(
        labelId
      )
      wrapper.unmount()
    })
  })
})

describe('n-checkbox-group', () => {
  it('should work with import on demand', () => {
    mount(NCheckboxGroup)
  })

  it('should have a role of "group"', () => {
    const wrapper = mount(NCheckboxGroup)
    expect(wrapper.find('.n-checkbox-group').attributes('role')).toBe('group')
    wrapper.unmount()
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
    wrapper.unmount()
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
    wrapper.unmount()
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
    wrapper.unmount()
  })

  it('should work with `min` prop', async () => {
    const wrapper = mount(NCheckboxGroup, {
      props: {
        min: 1,
        value: ['Shanghai']
      },
      slots: {
        default: () => [
          h(NCheckbox, { value: 'Shanghai' }, { default: () => 'Shanghai' }),
          h(NCheckbox, { value: 'Beijing' }, { default: () => 'Beijing' }),
          h(NCheckbox, { value: 'Shenzhen' }, { default: () => 'Shenzhen' })
        ]
      }
    })
    expect(wrapper.findAll('.n-checkbox').length).toBe(3)

    expect(wrapper.findAll('.n-checkbox')[0].classes()).toContain(
      'n-checkbox--disabled'
    )
    expect(wrapper.findAll('.n-checkbox')[0].classes()).toContain(
      'n-checkbox--checked'
    )
    expect(wrapper.findAll('.n-checkbox')[1].classes()).not.toContain(
      'n-checkbox--checked'
    )
    expect(wrapper.findAll('.n-checkbox')[1].classes()).not.toContain(
      'n-checkbox--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `max` prop', async () => {
    const wrapper = mount(NCheckboxGroup, {
      props: {
        max: 2,
        value: ['Shanghai', 'Beijing']
      },
      slots: {
        default: () => [
          h(NCheckbox, { value: 'Shanghai' }, { default: () => 'Shanghai' }),
          h(NCheckbox, { value: 'Beijing' }, { default: () => 'Beijing' }),
          h(NCheckbox, { value: 'Shenzhen' }, { default: () => 'Shenzhen' })
        ]
      }
    })
    expect(wrapper.findAll('.n-checkbox').length).toBe(3)

    expect(wrapper.findAll('.n-checkbox')[0].classes()).not.toContain(
      'n-checkbox--disabled'
    )
    expect(wrapper.findAll('.n-checkbox')[0].classes()).toContain(
      'n-checkbox--checked'
    )
    expect(wrapper.findAll('.n-checkbox')[1].classes()).toContain(
      'n-checkbox--checked'
    )
    expect(wrapper.findAll('.n-checkbox')[1].classes()).not.toContain(
      'n-checkbox--disabled'
    )
    expect(wrapper.findAll('.n-checkbox')[2].classes()).not.toContain(
      'n-checkbox--checked'
    )
    expect(wrapper.findAll('.n-checkbox')[2].classes()).toContain(
      'n-checkbox--disabled'
    )
    wrapper.unmount()
  })

  it('should work with `max` and `min` prop', async () => {
    const wrapper = mount(NCheckboxGroup, {
      props: {
        max: 2,
        min: 1
      },
      slots: {
        default: () => [
          h(NCheckbox, { value: 'Shanghai' }, { default: () => 'Shanghai' }),
          h(NCheckbox, { value: 'Beijing' }, { default: () => 'Beijing' }),
          h(NCheckbox, { value: 'Shenzhen' }, { default: () => 'Shenzhen' })
        ]
      }
    })

    await wrapper.setProps({
      value: ['Shanghai']
    })
    expect(wrapper.findAll('.n-checkbox').length).toBe(3)

    expect(wrapper.findAll('.n-checkbox')[0].classes()).toContain(
      'n-checkbox--disabled'
    )
    expect(wrapper.findAll('.n-checkbox')[0].classes()).toContain(
      'n-checkbox--checked'
    )
    expect(wrapper.findAll('.n-checkbox')[1].classes()).not.toContain(
      'n-checkbox--checked'
    )
    expect(wrapper.findAll('.n-checkbox')[1].classes()).not.toContain(
      'n-checkbox--disabled'
    )
    expect(wrapper.findAll('.n-checkbox')[2].classes()).not.toContain(
      'n-checkbox--checked'
    )
    expect(wrapper.findAll('.n-checkbox')[2].classes()).not.toContain(
      'n-checkbox--disabled'
    )
    await wrapper.setProps({
      value: ['Shanghai', 'Beijing']
    })

    expect(wrapper.findAll('.n-checkbox')[0].classes()).not.toContain(
      'n-checkbox--disabled'
    )
    expect(wrapper.findAll('.n-checkbox')[0].classes()).toContain(
      'n-checkbox--checked'
    )
    expect(wrapper.findAll('.n-checkbox')[1].classes()).toContain(
      'n-checkbox--checked'
    )
    expect(wrapper.findAll('.n-checkbox')[1].classes()).not.toContain(
      'n-checkbox--disabled'
    )
    expect(wrapper.findAll('.n-checkbox')[2].classes()).not.toContain(
      'n-checkbox--checked'
    )
    expect(wrapper.findAll('.n-checkbox')[2].classes()).toContain(
      'n-checkbox--disabled'
    )
    wrapper.unmount()
  })
})
