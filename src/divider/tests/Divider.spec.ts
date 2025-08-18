import { mount } from '@vue/test-utils'
import { NDivider } from '../index'

describe('n-divider', () => {
  it('should work with import on demand', () => {
    mount(NDivider)
  })

  it('default slot', () => {
    const str = 'star kirby'
    const wrapper = mount(NDivider, {
      slots: {
        default: () => str
      }
    })
    wrapper.text().includes(str)
    wrapper.unmount()
  })

  it('should work with `title-placement` prop', async () => {
    const wrapper = mount(NDivider, {
      props: { titlePlacement: 'before' },
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.n-divider').classes()).toContain(
      'n-divider--title-position-before'
    )

    await wrapper.setProps({ titlePlacement: 'after' })
    expect(wrapper.find('.n-divider').classes()).toContain(
      'n-divider--title-position-after'
    )
    wrapper.unmount()
  })

  it('should work with `type` prop', async () => {
    const wrapper = mount(NDivider)

    await wrapper.setProps({ type: 'dashed' })
    expect(wrapper.find('.n-divider').classes()).toContain('n-divider--dashed')
    wrapper.unmount()
  })

  it('should work with `vertical` prop', async () => {
    const wrapper = mount(NDivider, {
      props: { vertical: true }
    })

    expect(wrapper.find('.n-divider').classes()).toContain(
      'n-divider--vertical'
    )
    wrapper.unmount()
  })

  it('should work with `offset` prop', async () => {
    const wrapper = mount(NDivider, {
      props: { titlePlacement: 'before' }
    })

    expect(wrapper.find('.n-divider').attributes('style')).toContain(
      '--n-offset: 28px'
    )
    await wrapper.setProps({ offset: 50 })
    expect(wrapper.find('.n-divider').attributes('style')).toContain(
      '--n-offset: 50px'
    )
    wrapper.unmount()
  })

  it('should work with `titleClass` prop', async () => {
    const wrapper = mount(NDivider, {
      props: { titleClass: 'title-class' },
      slots: { default: () => 'test' }
    })

    expect(
      wrapper.find('.n-divider').find('.n-divider__title').classes()
    ).toContain('title-class')
    wrapper.unmount()
  })

  it('should work with `titleStyle` prop', async () => {
    const wrapper = mount(NDivider, {
      props: { titleStyle: 'color: red;' },
      slots: { default: () => 'test' }
    })

    expect(
      wrapper.find('.n-divider').find('.n-divider__title').attributes('style')
    ).toContain('color: red;')
  })
})
