import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { NEllipsis } from '../index'

describe('n-ellipsis', () => {
  it('should work with import on demand', () => {
    mount(NEllipsis)
  })

  it('should work with base', async () => {
    const wrapper = mount(NEllipsis, {
      props: { style: 'max-width: 10px;' },
      slots: { default: () => 'test n-ellipsis' }
    })

    expect(wrapper.find('.n-ellipsis').exists()).toBe(true)
    expect(wrapper.find('.n-ellipsis').attributes('style')).toContain(
      'text-overflow: ellipsis;'
    )
    wrapper.unmount()
  })

  it('should work with `line-clamp` prop', async () => {
    const wrapper = mount(NEllipsis, {
      props: { lineClamp: 2 },
      slots: {
        default: () => (
          <div>
            电灯熄灭 物换星移 泥牛入海
            <br />
            黑暗好像 一颗巨石 按在胸口
            <br />
            独脚大盗 百万富翁 摸爬滚打
          </div>
        )
      }
    })

    expect(wrapper.find('.n-ellipsis').classes()).toContain(
      'n-ellipsis--line-clamp'
    )
    wrapper.unmount()
  })

  it('should work with `expand-trigger` prop', async () => {
    const wrapper = mount(NEllipsis, {
      props: {
        expandTrigger: 'click',
        tooltip: false
      },
      slots: { default: () => 'test n-ellipsis' }
    })

    await wrapper.trigger('click')
    expect(wrapper.find('.n-ellipsis').attributes('style')).not.toContain(
      'text-overflow: ellipsis;'
    )

    await wrapper.trigger('click')
    expect(wrapper.find('.n-ellipsis').attributes('style')).toContain(
      'text-overflow: ellipsis;'
    )
    wrapper.unmount()
  })
})
