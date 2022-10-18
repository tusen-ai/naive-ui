import { mount } from '@vue/test-utils'
import { NAvatarGroup } from '../index'

describe('n-avatar-group', () => {
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
        options,
        max: 2
      }
    })
    expect(wrapper.findAll('.n-avatar').length).toBe(2)

    await wrapper.setProps({ vertical: true })
    expect(wrapper.find('[role="group"]').classes()).toContain(
      'n-avatar-group--vertical'
    )

    await wrapper.setProps({ max: 4 })
    expect(wrapper.find('.n-avatar__text').exists()).toBe(false)

    await wrapper.setProps({ options: [] })
    expect(wrapper.findAll('.n-avatar').length).toBe(0)
    wrapper.unmount()
  })
})
