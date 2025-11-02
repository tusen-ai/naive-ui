import { mount } from '@vue/test-utils'
import { NSkeleton } from '../index'

describe('n-skeleton', () => {
  it('should work with import on demand', () => {
    mount(NSkeleton)
  })

  it('should work with `text` prop', async () => {
    const wrapper = mount(NSkeleton, {
      props: {
        text: true
      }
    })
    expect(wrapper.find('.n-skeleton').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with box', async () => {
    const wrapper = mount(NSkeleton)
    expect(wrapper.find('.n-skeleton').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `sharp` prop', async () => {
    const wrapper = mount(NSkeleton, {
      props: {
        sharp: false
      }
    })
    expect(wrapper.find('.n-skeleton').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `round` prop', async () => {
    const wrapper = mount(NSkeleton, {
      props: {
        round: true
      }
    })
    expect(wrapper.find('.n-skeleton').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `circle` prop', async () => {
    const wrapper = mount(NSkeleton, {
      props: {
        circle: true
      }
    })
    expect(wrapper.find('.n-skeleton').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should work with `repeat` prop', async () => {
    const wrapper = mount(NSkeleton, {
      props: {
        repeat: 2
      }
    })
    expect(wrapper.findAll('.n-skeleton').length).toBe(2)
    wrapper.unmount()
  })

  it('should work with `size` prop', async () => {
    const wrapper = mount(NSkeleton)

    await wrapper.setProps({ size: 'small' })
    expect(wrapper.find('.n-skeleton').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'medium' })
    expect(wrapper.find('.n-skeleton').attributes('style')).toMatchSnapshot()

    await wrapper.setProps({ size: 'large' })
    expect(wrapper.find('.n-skeleton').attributes('style')).toMatchSnapshot()
    wrapper.unmount()
  })

  it('should show correct width', () => {
    const wrapper = mount(NSkeleton, {
      props: {
        circle: false,
        width: 100
      }
    })

    expect(wrapper.find('.n-skeleton').attributes('style')).toContain(
      'width: 100px;'
    )
    wrapper.unmount()
  })

  it('should show correct height', () => {
    const wrapper = mount(NSkeleton, {
      props: {
        circle: false,
        height: 100
      }
    })

    expect(wrapper.find('.n-skeleton').attributes('style')).toContain(
      'height: 100px;'
    )
    wrapper.unmount()
  })

  it('should show correct animation', () => {
    const wrapper = mount(NSkeleton, {
      props: {
        animated: false
      }
    })

    expect(wrapper.find('.n-skeleton').attributes('style')).toContain(
      'animation: none;'
    )
    wrapper.unmount()
  })
})
