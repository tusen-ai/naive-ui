import { NAlert } from '../index'
import { mount } from '@vue/test-utils'

describe('n-alert', () => {
  it('should work with import on demand', () => {
    mount(NAlert)
  })

  it('shouldnt have default title', () => {
    const wrapper = mount(NAlert)
    expect(wrapper.find('.n-alert-body__title').exists()).toBe(false)
  })

  it('should have designated title', () => {
    const title = 'sometimes naïve'
    const wrapper = mount(NAlert, {
      props: { title }
    })
    expect(wrapper.find('.n-alert-body__title').text()).toBe(title)
  })

  it('shouldnt be closable by default', () => {
    const wrapper = mount(NAlert)
    expect(wrapper.find('.n-base-close.n-alert__close').exists()).toBe(false)
  })

  it('should be closable when designated', () => {
    const wrapper = mount(NAlert, { props: { closable: true } })
    expect(wrapper.find('.n-base-close.n-alert__close').exists()).toBe(true)
  })

  it('should show icon by default', () => {
    const wrapper = mount(NAlert)
    expect(wrapper.find('.n-alert__icon').exists()).toBe(true)
  })

  it('should hide icon when designated', () => {
    const wrapper = mount(NAlert, { props: { showIcon: false } })
    expect(wrapper.find('.n-alert__icon').exists()).toBe(false)
  })

  it('should trigger callback when closed', async () => {
    const handleCloseClick = jest.fn()
    const wrapper = mount(NAlert, {
      props: { closable: true, onClose: handleCloseClick }
    })
    const closeBtn = wrapper.find('.n-base-close.n-alert__close')
    expect(closeBtn.exists()).toBe(true)

    await closeBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')

    expect(handleCloseClick).toHaveBeenCalled()
  })
})
