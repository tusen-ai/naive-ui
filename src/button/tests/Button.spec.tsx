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
})
