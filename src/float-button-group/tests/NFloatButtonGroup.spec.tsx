import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NFloatButtonGroup } from '../index'

describe('n-flex', () => {
  it('should work with import on demand', () => {
    mount(NFloatButtonGroup)
  })

  it('render empty children', () => {
    const wrapper = mount({
      render () {
        return <NFloatButtonGroup />
      }
    })
    expect(wrapper.find('.n-flex')).not.toBe(null)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})
