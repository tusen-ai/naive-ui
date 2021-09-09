import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NAffix } from '../index'
import { sleep } from 'seemly'

const makeScroll = async (
  dom: Element,
  name: 'scrollTop' | 'scrollLeft',
  offset: number
): Promise<any> => {
  const eventTarget = dom === document.documentElement ? window : dom
  dom[name] = offset
  const evt = new CustomEvent('scroll', {
    detail: {
      target: {
        [name]: offset
      }
    }
  })
  eventTarget.dispatchEvent(evt)
  return await sleep(300)
}

describe('n-affix', () => {
  it('should work with import on demand', () => {
    mount(NAffix)
  })

  it('should work with `top` prop', async () => {
    const value: number = 120

    const wrapper = mount(NAffix, {
      attachTo: document.body,
      props: {
        top: value
      },
      slots: {
        default: () => {
          return h('div', {}, `${value}px`)
        }
      }
    })

    expect(wrapper.find('.n-affix--fixed').exists()).toBe(false)
    await makeScroll(document.documentElement, 'scrollTop', 200)
    expect(wrapper.attributes('style')).toContain('top: 120px;')
  })
})
