import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NCollapse, NCollapseItem } from '../index'

describe('n-collapse', () => {
  it('should work with import on demand', () => {
    mount(NCollapse)
  })
  it('can customize icon', () => {
    const wrapper = mount(() => {
      return (
        <NCollapse>
          {{
            arrow: () => <div class="my-icon"></div>,
            default: () => <NCollapseItem name="1"></NCollapseItem>
          }}
        </NCollapse>
      )
    })
    expect(wrapper.find('.my-icon').exists()).toEqual(true)
  })
})
