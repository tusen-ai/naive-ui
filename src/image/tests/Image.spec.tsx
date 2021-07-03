import { mount } from '@vue/test-utils'
import { NImage } from '../index'

describe('n-image', () => {
  it('should work with import on demand', () => {
    mount(NImage)
  })

  it('should work with `alt` prop', async () => {
    const wrapper = mount(NImage)

    await wrapper.setProps({ alt: 'This is just a picture' })

    expect(wrapper.find('img').attributes('alt')).toBe('This is just a picture')
    expect(wrapper.find('img').attributes('aria-label')).toBe(
      'This is just a picture'
    )
  })

  it('should work with `width` prop', async () => {
    const wrapper = mount(NImage)

    await wrapper.setProps({ width: '200' })

    expect(wrapper.find('img').attributes('width')).toBe('200')

    await wrapper.setProps({ width: 200 })

    expect(wrapper.find('img').attributes('width')).toBe('200')
  })

  it('should work with `height` prop', async () => {
    const wrapper = mount(NImage)

    await wrapper.setProps({ height: '300' })

    expect(wrapper.find('img').attributes('height')).toBe('300')

    await wrapper.setProps({ height: 300 })

    expect(wrapper.find('img').attributes('height')).toBe('300')
  })

  it('should work with `src` prop', async () => {
    const wrapper = mount(NImage)

    await wrapper.setProps({
      src: 'https://www.naiveui.com/assets/naivelogo.93278402.svg'
    })

    expect(wrapper.find('img').attributes('src')).toBe(
      'https://www.naiveui.com/assets/naivelogo.93278402.svg'
    )
  })

  it('should work with `showToolbar` prop', async () => {
    const wrapper = mount(NImage)

    await wrapper.setProps({
      showToolbar: true
    })

    await wrapper.find('img').trigger('click')

    expect(document.querySelector('.n-image-preview-toolbar')).not.toEqual(null)
  })
})
