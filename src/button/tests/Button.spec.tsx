import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NButton, NxButton } from '../index'

describe('n-button', () => {
  it('should work with import on demand', () => {
    mount(NButton)
  })
  it('clickable', async () => {
    const onClick = jest.fn()
    const inst = mount(NButton, {
      props: {
        onClick
      }
    })
    await inst.trigger('click')
    expect(onClick).toHaveBeenCalled()
  })
  it('disabled', async () => {
    const onClick = jest.fn()
    const inst = mount(NButton, {
      props: {
        disabled: true,
        onClick
      }
    })
    await inst.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })
  it('passed native event & attr tsx type checking', () => {
    ;<div>
      <NxButton onMousedown={() => {}} />
      <NxButton formaction="" />
    </div>
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount(NButton)

    await wrapper.setProps({ type: 'primary' })
    expect(wrapper.find('button').classes()).toContain('n-button--primary-type')

    await wrapper.setProps({ type: 'info' })
    expect(wrapper.find('button').classes()).toContain('n-button--info-type')

    await wrapper.setProps({ type: 'success' })
    expect(wrapper.find('button').classes()).toContain('n-button--success-type')

    await wrapper.setProps({ type: 'warning' })
    expect(wrapper.find('button').classes()).toContain('n-button--warning-type')

    await wrapper.setProps({ type: 'error' })
    expect(wrapper.find('button').classes()).toContain('n-button--error-type')
  })

  it('should work with `dashed` prop', async () => {
    const wrapper = mount(NButton)

    await wrapper.setProps({ dashed: true })
    expect(wrapper.find('button').classes()).toContain('n-button--dashed')
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NButton)

    await wrapper.setProps({ size: 'tiny' })
    expect(wrapper.find('button').attributes('style')).toContain(
      '--height: 22px; --font-size: 12px; --padding: 0 6px; --icon-size: 14px;'
    )

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('button').attributes('style')).toContain(
      '--height: 28px; --font-size: 14px; --padding: 0 10px; --icon-size: 18px;'
    )

    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('button').attributes('style')).toContain(
      '--height: 34px; --font-size: 14px; --padding: 0 14px; --icon-size: 18px;'
    )

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('button').attributes('style')).toContain(
      '--height: 40px; --font-size: 15px; --padding: 0 18px; --icon-size: 20px;'
    )
  })

  it('should work with `text` prop', () => {
    const wrapper = mount(NButton, {
      props: {
        text: true
      },
      slots: {
        default: () => 'test'
      }
    })
    expect(wrapper.find('button').attributes('style')).toContain(
      '--border: none; --border-hover: none; --border-pressed: none; --border-focus: none; --border-disabled: none; --width: initial; --height: initial; --font-size: 14px; --padding: initial;'
    )
    expect(wrapper.find('.n-button__content').element.textContent).toBe('test')
  })

  it('should work with `tag` prop', () => {
    const wrapper = mount(NButton, {
      props: {
        text: true,
        tag: 'a',
        href: 'https://www.naiveui.com',
        target: '_blank',
        type: 'primary'
      },
      slots: {
        default: () => 'test'
      }
    })

    expect(wrapper.find('a').attributes('style')).toContain(
      '--border: none; --border-hover: none; --border-pressed: none; --border-focus: none; --border-disabled: none; --width: initial; --height: initial; --font-size: 14px; --padding: initial;'
    )
    expect(wrapper.find('a').classes()).toContain('n-button--primary-type')
    expect(wrapper.find('a').attributes('type')).toContain('button')
    expect(wrapper.find('a').attributes('disabled')).toContain('false')
    expect(wrapper.find('a').attributes('href')).toContain(
      'https://www.naiveui.com'
    )
    expect(wrapper.find('a').attributes('target')).toContain('_blank')
    expect(wrapper.find('.n-button__content').element.textContent).toBe('test')
  })
})
