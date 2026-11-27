import { mount } from '@vue/test-utils'
import { NScrollbar } from '../index'

describe('n-scrollbar', () => {
  it('should work with import on demand', () => {
    mount(NScrollbar)
  })

  it('should allow root style to override theme css vars', () => {
    const wrapper = mount(NScrollbar, {
      attrs: {
        style: {
          '--n-scrollbar-color': 'rgb(1, 2, 3)'
        }
      }
    })
    const el = wrapper.find('.n-scrollbar').element as HTMLElement
    expect(el.style.getPropertyValue('--n-scrollbar-color')).toEqual(
      'rgb(1, 2, 3)'
    )
    wrapper.unmount()
  })
})
