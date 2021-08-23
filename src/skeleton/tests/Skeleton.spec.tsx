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
  })

  it('should work with box', async () => {
    const wrapper = mount(NSkeleton)
    expect(wrapper.find('.n-skeleton').attributes('style')).toMatchSnapshot()
  })

  it('should work with `sharp` prop', async () => {
    const wrapper = mount(NSkeleton, {
      props: {
        sharp: false
      }
    })
    expect(wrapper.find('.n-skeleton').attributes('style')).toMatchSnapshot()
  })

  it('should work with `round` prop', async () => {
    const wrapper = mount(NSkeleton, {
      props: {
        round: true
      }
    })
    expect(wrapper.find('.n-skeleton').attributes('style')).toMatchSnapshot()
  })

  it('should work with `circle` prop', async () => {
    const wrapper = mount(NSkeleton, {
      props: {
        circle: true
      }
    })
    expect(wrapper.find('.n-skeleton').attributes('style')).toMatchSnapshot()
  })

  it('should work with `repeat` prop', async () => {
    const wrapper = mount(NSkeleton, {
      props: {
        repeat: 2
      }
    })
    expect(wrapper.findAll('.n-skeleton').length).toBe(2)
  })
})
