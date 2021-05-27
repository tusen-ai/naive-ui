import { nextTick } from '@vue/runtime-core'
import { mount, VueWrapper } from '@vue/test-utils'
import { NCheckbox } from '../index'

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
})
