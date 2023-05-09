import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { NAffix } from '../index'
import { sleep } from 'seemly'

const makeScroll = async (
  dom: Element,
  name: 'scrollTop',
  offset: number
): Promise<any> => {
  const eventTarget = dom === document.documentElement ? window : dom
  dom[name] = offset
  eventTarget.dispatchEvent(
    new CustomEvent('scroll', {
      detail: {
        target: {
          [name]: offset
        }
      }
    })
  )

  await sleep(100)
}

describe('n-affix', () => {
  it('should work with import on demand', () => {
    mount(NAffix)
  })

  it('should work with `top` prop', async () => {
    const wrapper = mount(NAffix, {
      attachTo: document.body,
      props: {
        top: 120
      },
      slots: {
        default: () => {
          return h('div', {}, 'content')
        }
      }
    })

    expect(wrapper.find('.n-affix--fixed').exists()).toBe(false)
    await makeScroll(document.documentElement, 'scrollTop', 200)
    expect(wrapper.attributes('style')).toContain('top: 120px;')
    wrapper.unmount()
  })

  it('should work with `position` prop', async () => {
    const wrapper = mount(NAffix, {
      props: {
        position: 'absolute'
      },
      slots: {
        default: () => {
          return h('div', {}, 'content')
        }
      }
    })

    expect(wrapper.find('.n-affix--absolute-positioned').exists()).not.toBe(
      null
    )
    wrapper.unmount()
  })
})
