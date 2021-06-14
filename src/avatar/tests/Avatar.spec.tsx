import { mount } from '@vue/test-utils'
import { NAvatar } from '../index'
import { h, nextTick } from 'vue'
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { NIcon } from '../../icon'

describe('n-avatar', () => {
  // mock offsetHeight offsetWidth
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight'
  )
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetWidth'
  )

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get () {
        if (this.className === 'n-avatar__text') {
          return 80
        }
        return 100
      }
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      get () {
        if (this.className === 'n-avatar__text') {
          return 80
        }
        return 100
      }
    })
  })

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get: () => originalOffsetHeight
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      get: () => originalOffsetWidth
    })
  })

  it('should work with import on demand', () => {
    mount(NAvatar)
  })

  it('size is string', () => {
    const wrapper = mount(NAvatar, { props: { size: 'medium' } })
    expect(wrapper.attributes('style')).toContain('--size')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('size is number', () => {
    const wrapper = mount(NAvatar, { props: { size: 50 } })
    expect(wrapper.attributes('style')).toContain('--size: 50px;')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('round avatar', () => {
    const wrapper = mount(NAvatar, { props: { round: true } })
    expect(wrapper.attributes('style')).toContain('--border-radius: 50%;')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('custom style', () => {
    const wrapper = mount(NAvatar, {
      props: { style: { backgroundColor: 'red' } }
    })
    expect(wrapper.attributes('style')).toContain('background-color: red;')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('image avatar', () => {
    const wrapper = mount(NAvatar, {
      props: {
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      }
    })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('icon avatar', () => {
    const wrapper = mount(NAvatar, {
      slots: {
        default: () =>
          h(NIcon, null, {
            default: () => h(CashIcon)
          })
      }
    })
    expect(wrapper.find('i').classes()).toContain('n-icon')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('avatar adjust text', async () => {
    const AdjustAvatar = {
      data () {
        return {
          text: ''
        }
      },
      render () {
        const { text } = this as any
        return <NAvatar size="medium">{text}</NAvatar>
      }
    }
    const wrapper = mount(AdjustAvatar)
    const textNode = wrapper.find('.n-avatar__text')
    await wrapper.setData({ text: 'adjust text' })
    await nextTick()
    expect(textNode.exists()).toBe(true)
    expect(textNode.attributes('style')).toContain(
      'transform: translateX(-50%) translateY(-50%) scale(1);'
    )
    expect(wrapper.html()).toMatchSnapshot()
  })
})
