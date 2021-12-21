import { mount } from '@vue/test-utils'
import { NAvatar, NAvatarGroup } from '../index'
import { h, nextTick } from 'vue'
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { NIcon } from '../../icon'

// Please note that resize observer doesn't work in JSDOM, so text transfrom
// can't be tested.
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
    expect(wrapper.attributes('style')).toContain('--n-merged-size')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('size is number', () => {
    const wrapper = mount(NAvatar, { props: { size: 50 } })
    expect(wrapper.attributes('style')).toContain(
      '--n-merged-size: var(--n-avatar-size-override, 50px);'
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('round avatar', () => {
    const wrapper = mount(NAvatar, { props: { round: true } })
    expect(wrapper.attributes('style')).toContain('--n-border-radius: 50%;')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('bordered avatar', () => {
    const wrapper = mount(NAvatar, { props: { bordered: true } })
    expect(wrapper.attributes('style')).toContain('--n-border: 2px solid #fff;')
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
        return <NAvatar size="medium">{{ default: () => text }}</NAvatar>
      }
    }
    const wrapper = mount(AdjustAvatar)
    const textNode = wrapper.find('.n-avatar__text')
    await wrapper.setData({ text: 'adjust text' })
    await nextTick()
    expect(textNode.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('image avatar error handle when load failed', async () => {
    const onError = jest.fn()
    const wrapper = mount(NAvatar, {
      props: {
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        onError
      }
    })
    await wrapper.find('img').trigger('error')
    expect(onError).toHaveBeenCalled()
  })

  it('should work with `objectFit` prop', () => {
    const wrapper = mount(NAvatar, {
      props: {
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        objectFit: 'contain'
      }
    })
    expect(wrapper.find('img').attributes('style')).toContain(
      'object-fit: contain;'
    )
  })

  it('should work with `options` prop in `avatar group`', async () => {
    const options = [
      {
        name: 'test1',
        src: 'https://www.naiveui.com/assets/naivelogo.93278402.svg'
      },
      {
        name: 'test2',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      {
        name: 'test3',
        src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
      },
      {
        name: 'test4',
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      }
    ]
    const wrapper = mount(NAvatarGroup, {
      props: {
        options: options,
        max: 2
      }
    })
    expect(wrapper.findAll('.n-avatar').length).toBe(2)

    await wrapper.setProps({ vertical: true })
    expect(wrapper.find('[role="group"]').classes()).toContain(
      'n-avatar-group--vertical'
    )
  })
})
