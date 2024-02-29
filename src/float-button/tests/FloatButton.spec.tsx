import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NFloatButton } from '../index'

describe('n-flex', () => {
  it('should work with import on demand', () => {
    mount(NFloatButton)
  })

  it('render empty children', () => {
    const wrapper = mount({
      render () {
        return <NFloatButton />
      }
    })
    expect(wrapper.find('.n-flex')).not.toBe(null)
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.unmount()
  })
})
