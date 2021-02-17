import { mount } from '@vue/test-utils'
import { NButton } from '../index'

describe('n-button', () => {
  it('should work with import on demand', () => {
    mount(NButton)
  })
  it('clickable', () => {
    const onClick = jest.fn()
    const inst = mount(NButton, {
      props: {
        onClick
      }
    })
    inst.trigger('click')
    expect(onClick).toHaveBeenCalled()
  })
  it('disabled', () => {
    const onClick = jest.fn()
    const inst = mount(NButton, {
      props: {
        disabled: true,
        onClick
      }
    })
    inst.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })
})
