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
      props: { titlePlacement: 'left' },
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.n-divider').classes()).toContain(
      'n-divider--title-position-left'
    )

    await wrapper.setProps({ titlePlacement: 'right' })
    expect(wrapper.find('.n-divider').classes()).toContain(
      'n-divider--title-position-right'
    )
    wrapper.unmount()
  })

  it('should work with `dashed` prop', async () => {
    const wrapper = mount(NDivider)

    await wrapper.setProps({ dashed: true })
    expect(wrapper.find('.n-divider').classes()).toContain('n-divider--dashed')
    expect(wrapper.find('.n-divider').classes()).toContain(
      'n-divider--no-title'
    )
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
})
