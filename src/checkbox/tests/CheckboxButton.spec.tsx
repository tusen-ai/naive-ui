import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NForm, NFormItem } from '../../form'
import { NCheckboxButton, NCheckboxGroup } from '../index'

function expectChecked(
  wrapper: { classes: () => string[] },
  value: boolean
): void {
  expect(wrapper.classes().some(c => c.includes('checked'))).toEqual(value)
}

describe('n-checkbox-button', () => {
  it('should work with import on demand', () => {
    mount(NCheckboxButton)
  })

  describe('uncontrolled mode', () => {
    it('works', async () => {
      const wrapper = mount(NCheckboxButton)
      expectChecked(wrapper, false)
      await wrapper.trigger('click')
      expectChecked(wrapper, true)
      await wrapper.trigger('click')
      expectChecked(wrapper, false)
      wrapper.unmount()
    })
    it('props.defaultChecked', () => {
      const wrapper = mount(NCheckboxButton, {
        props: {
          defaultChecked: true
        }
      })
      expectChecked(wrapper, true)
      wrapper.unmount()
    })
  })

  it('should work with `checked-value` prop', async () => {
    const onUpdateChecked = vi.fn()
    const wrapper = mount(NCheckboxButton, {
      props: {
        checkedValue: 'checked',
        uncheckedValue: 'unchecked',
        onUpdateChecked
      }
    })
    await wrapper.trigger('click')
    expect(onUpdateChecked.mock.calls[0][0]).toEqual('checked')
    await wrapper.trigger('click')
    expect(onUpdateChecked.mock.calls[1][0]).toEqual('unchecked')
    await wrapper.trigger('click')
    expect(onUpdateChecked.mock.calls[2][0]).toEqual('checked')
    wrapper.unmount()
  })

  it('should work with `label` prop', () => {
    const wrapper = mount(NCheckboxButton, {
      props: {
        label: 'test'
      }
    })
    expect(wrapper.find('.n-checkbox-button__label').text()).toContain('test')
    wrapper.unmount()
  })

  it('should work with `disabled` prop', async () => {
    const onClick = vi.fn()
    const wrapper = mount(NCheckboxButton, {
      props: {
        disabled: true,
        onUpdateChecked: onClick
      }
    })
    expect(wrapper.find('.n-checkbox-button').classes()).toContain(
      'n-checkbox-button--disabled'
    )
    await wrapper.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `on-update:checked` & `onUpdateChecked` prop', async () => {
    const onClick = vi.fn()
    const wrapper = mount(NCheckboxButton, {
      props: {
        'onUpdate:checked': onClick,
        onUpdateChecked: onClick
      }
    })
    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(2)
    wrapper.unmount()
  })

  it('should work with default slots', () => {
    const wrapper = mount(NCheckboxButton, {
      slots: {
        default: () => 'slot content'
      }
    })
    expect(wrapper.find('.n-checkbox-button__label').text()).toContain(
      'slot content'
    )
    wrapper.unmount()
  })

  it('should work with `size` prop', () => {
    ;(['small', 'medium', 'large'] as const).forEach((size) => {
      const wrapper = mount(NCheckboxButton, { props: { size } })
      expect(
        wrapper.find('.n-checkbox-button').attributes('style')
      ).toMatchSnapshot()
      wrapper.unmount()
    })
  })

  it('should work with v-model:checked', async () => {
    const wrapper = mount(NCheckboxButton, {
      props: {
        checked: false,
        'onUpdate:checked': (v: boolean) => {
          wrapper.setProps({ checked: v })
        }
      }
    })
    expectChecked(wrapper, false)
    await wrapper.trigger('click')
    expectChecked(wrapper, true)
    wrapper.unmount()
  })

  it('should show correct style with `NForm` component', () => {
    const wrapper = mount(() => (
      <NForm size="medium">
        {{
          default: () => {
            return (
              <NFormItem>
                {{
                  default: () => <NCheckboxButton label="in-form" />
                }}
              </NFormItem>
            )
          }
        }}
      </NForm>
    ))
    expect(
      wrapper.find('.n-checkbox-button').attributes('style')
    ).toMatchSnapshot()
    wrapper.unmount()
  })
})

describe('n-checkbox-button in n-checkbox-group (button group mode)', () => {
  it('should work with import on demand', () => {
    mount(() => (
      <NCheckboxGroup>
        {{
          default: () => <NCheckboxButton value="a" label="A" />
        }}
      </NCheckboxGroup>
    ))
  })

  it('should have button-group class on container', () => {
    const wrapper = mount(NCheckboxGroup, {
      slots: {
        default: () => <NCheckboxButton value="a" label="A" />
      }
    })
    expect(wrapper.find('.n-checkbox-group').classes()).toContain(
      'n-checkbox-group--button-group'
    )
    wrapper.unmount()
  })

  it('should toggle checked state on click', async () => {
    const wrapper = mount(NCheckboxGroup, {
      slots: {
        default: () => [
          <NCheckboxButton value="a" label="A" />,
          <NCheckboxButton value="b" label="B" />
        ]
      }
    })
    const buttons = wrapper.findAll('.n-checkbox-button')
    expect(buttons.length).toBe(2)
    expectChecked(buttons[0], false)
    expectChecked(buttons[1], false)

    await buttons[0].trigger('click')
    expectChecked(buttons[0], true)
    expectChecked(buttons[1], false)

    await buttons[1].trigger('click')
    expectChecked(buttons[0], true)
    expectChecked(buttons[1], true)

    await buttons[0].trigger('click')
    expectChecked(buttons[0], false)
    expectChecked(buttons[1], true)
    wrapper.unmount()
  })

  it('should work with `on-update:value` & `onUpdateValue` prop', async () => {
    const onUpdate = vi.fn()
    const wrapper = mount(NCheckboxGroup, {
      props: {
        'onUpdate:value': onUpdate,
        onUpdateValue: onUpdate
      },
      slots: {
        default: () => <NCheckboxButton value="a" label="A" />
      }
    })
    await wrapper.findComponent(NCheckboxButton).trigger('click')
    expect(onUpdate).toHaveBeenCalledTimes(2)
    expect(onUpdate.mock.calls[0][0]).toEqual(['a'])
    wrapper.unmount()
  })

  it('should work with v-model:value', async () => {
    const wrapper = mount(NCheckboxGroup, {
      props: {
        value: [],
        'onUpdate:value': (v: (string | number)[]) => {
          wrapper.setProps({ value: v })
        }
      },
      slots: {
        default: () => [
          <NCheckboxButton value="a" label="A" />,
          <NCheckboxButton value="b" label="B" />
        ]
      }
    })
    const buttons = wrapper.findAll('.n-checkbox-button')
    expectChecked(buttons[0], false)
    expectChecked(buttons[1], false)

    await buttons[0].trigger('click')
    expectChecked(buttons[0], true)
    expectChecked(buttons[1], false)

    await buttons[1].trigger('click')
    expectChecked(buttons[0], true)
    expectChecked(buttons[1], true)
    wrapper.unmount()
  })

  it('should insert splitor between buttons', () => {
    const wrapper = mount(NCheckboxGroup, {
      slots: {
        default: () => [
          <NCheckboxButton value="a" label="A" />,
          <NCheckboxButton value="b" label="B" />,
          <NCheckboxButton value="c" label="C" />
        ]
      }
    })
    const splitors = wrapper.findAll('.n-checkbox-group__splitor')
    expect(splitors.length).toBe(2)
    wrapper.unmount()
  })

  it('should work with `disabled` prop from group', () => {
    const wrapper = mount(NCheckboxGroup, {
      props: {
        disabled: true
      },
      slots: {
        default: () => <NCheckboxButton value="a" label="A" />
      }
    })
    expect(wrapper.find('.n-checkbox-button').classes()).toContain(
      'n-checkbox-button--disabled'
    )
    wrapper.unmount()
  })

  it('should inherit `size` from group', () => {
    const wrapper = mount(NCheckboxGroup, {
      props: {
        size: 'small'
      },
      slots: {
        default: () => <NCheckboxButton value="a" label="A" />
      }
    })
    expect(
      wrapper.find('.n-checkbox-button').attributes('style')
    ).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with number type value', async () => {
    const onUpdate = vi.fn()
    const wrapper = mount(NCheckboxGroup, {
      props: {
        'onUpdate:value': onUpdate
      },
      slots: {
        default: () => [
          <NCheckboxButton value={1} label="A" />,
          <NCheckboxButton value={2} label="B" />
        ]
      }
    })
    const buttons = wrapper.findAll('.n-checkbox-button')
    await buttons[0].trigger('click')
    expect(onUpdate).toHaveBeenCalledTimes(1)
    expect(onUpdate.mock.calls[0][0]).toEqual([1])
    await buttons[1].trigger('click')
    expect(onUpdate).toHaveBeenCalledTimes(2)
    expect(onUpdate.mock.calls[1][0]).toEqual([1, 2])
    wrapper.unmount()
  })

  it('should work with `min` prop', async () => {
    const wrapper = mount(NCheckboxGroup, {
      props: {
        min: 1,
        value: ['a']
      },
      slots: {
        default: () => [
          <NCheckboxButton value="a" label="A" />,
          <NCheckboxButton value="b" label="B" />,
          <NCheckboxButton value="c" label="C" />
        ]
      }
    })
    const buttons = wrapper.findAll('.n-checkbox-button')
    expect(buttons.length).toBe(3)

    expect(buttons[0].classes()).toContain('n-checkbox-button--checked')
    expect(buttons[0].classes()).toContain('n-checkbox-button--disabled')
    expect(buttons[1].classes()).not.toContain('n-checkbox-button--checked')
    expect(buttons[1].classes()).not.toContain('n-checkbox-button--disabled')
    expect(buttons[2].classes()).not.toContain('n-checkbox-button--checked')
    expect(buttons[2].classes()).not.toContain('n-checkbox-button--disabled')
    wrapper.unmount()
  })

  it('should work with `max` prop', async () => {
    const wrapper = mount(NCheckboxGroup, {
      props: {
        max: 2,
        value: ['a', 'b']
      },
      slots: {
        default: () => [
          <NCheckboxButton value="a" label="A" />,
          <NCheckboxButton value="b" label="B" />,
          <NCheckboxButton value="c" label="C" />
        ]
      }
    })
    const buttons = wrapper.findAll('.n-checkbox-button')
    expect(buttons.length).toBe(3)

    expect(buttons[0].classes()).toContain('n-checkbox-button--checked')
    expect(buttons[0].classes()).not.toContain('n-checkbox-button--disabled')
    expect(buttons[1].classes()).toContain('n-checkbox-button--checked')
    expect(buttons[1].classes()).not.toContain('n-checkbox-button--disabled')
    expect(buttons[2].classes()).not.toContain('n-checkbox-button--checked')
    expect(buttons[2].classes()).toContain('n-checkbox-button--disabled')
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
          <NCheckboxButton value="a" label="A" />,
          <NCheckboxButton value="b" label="B" />,
          <NCheckboxButton value="c" label="C" />
        ]
      }
    })

    await wrapper.setProps({ value: ['a'] })
    const buttons1 = wrapper.findAll('.n-checkbox-button')
    expect(buttons1.length).toBe(3)
    expect(buttons1[0].classes()).toContain('n-checkbox-button--checked')
    expect(buttons1[0].classes()).toContain('n-checkbox-button--disabled')
    expect(buttons1[1].classes()).not.toContain('n-checkbox-button--checked')
    expect(buttons1[1].classes()).not.toContain('n-checkbox-button--disabled')
    expect(buttons1[2].classes()).not.toContain('n-checkbox-button--checked')
    expect(buttons1[2].classes()).not.toContain('n-checkbox-button--disabled')

    await wrapper.setProps({ value: ['a', 'b'] })
    const buttons2 = wrapper.findAll('.n-checkbox-button')
    expect(buttons2[0].classes()).not.toContain('n-checkbox-button--disabled')
    expect(buttons2[0].classes()).toContain('n-checkbox-button--checked')
    expect(buttons2[1].classes()).not.toContain('n-checkbox-button--disabled')
    expect(buttons2[1].classes()).toContain('n-checkbox-button--checked')
    expect(buttons2[2].classes()).toContain('n-checkbox-button--disabled')
    expect(buttons2[2].classes()).not.toContain('n-checkbox-button--checked')
    wrapper.unmount()
  })
})
