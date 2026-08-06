import { mount } from '@vue/test-utils'
import { h, nextTick, ref } from 'vue'
import { NImage, NImageGroup } from '../index'
import NImagePreview from '../src/ImagePreview'

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
    wrapper.unmount()
  })

  it('should work with `width` prop', async () => {
    const wrapper = mount(NImage)

    await wrapper.setProps({ width: '200' })

    expect(wrapper.find('img').attributes('width')).toBe('200')

    await wrapper.setProps({ width: 200 })

    expect(wrapper.find('img').attributes('width')).toBe('200')
    wrapper.unmount()
  })

  it('should work with `height` prop', async () => {
    const wrapper = mount(NImage)

    await wrapper.setProps({ height: '300' })

    expect(wrapper.find('img').attributes('height')).toBe('300')

    await wrapper.setProps({ height: 300 })

    expect(wrapper.find('img').attributes('height')).toBe('300')
    wrapper.unmount()
  })

  it('should work with `src` prop', async () => {
    const wrapper = mount(NImage)

    await wrapper.setProps({
      src: 'https://www.naiveui.com/assets/naivelogo.93278402.svg'
    })

    expect(wrapper.find('img').attributes('src')).toBe(
      'https://www.naiveui.com/assets/naivelogo.93278402.svg'
    )
    wrapper.unmount()
  })

  it('should work with `previewSrc` prop', async () => {
    const wrapper = mount(NImage)

    await wrapper.setProps({
      previewSrc: 'https://www.naiveui.com/assets/naivelogo.93278402.svg'
    })

    expect(wrapper.find('img').attributes('data-preview-src')).toBe(
      'https://www.naiveui.com/assets/naivelogo.93278402.svg'
    )
    wrapper.unmount()
  })

  it('should work with `showToolbar` prop', async () => {
    const wrapper = mount(NImage)

    await wrapper.setProps({
      showToolbar: true
    })

    await wrapper.find('img').trigger('click')

    expect(document.querySelector('.n-image-preview-toolbar')).not.toEqual(null)
    wrapper.unmount()
  })

  it('should work with `image group` prop', async () => {
    const wrapper = mount(NImageGroup, {
      slots: {
        default: () => [
          h(NImage, null, {
            default: () =>
              'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
          }),
          h(NImage, null, {
            default: () =>
              'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
          })
        ]
      }
    })

    expect(wrapper.findAll('img').length).toBe(2)

    await wrapper.findAll('img')[0].trigger('click')
    expect(wrapper.findComponent(NImagePreview).exists()).toBe(true)
    wrapper.unmount()
  })

  it('should not preview removed images in `image group`', async () => {
    const srcList = ref(['image-1.png', 'image-2.png'])
    const wrapper = mount(() =>
      h(NImageGroup, null, {
        default: () => srcList.value.map(src => h(NImage, { key: src, src }))
      })
    )

    srcList.value = ['image-1.png']
    await nextTick()

    await wrapper.find('img').trigger('click')
    wrapper.findComponent(NImageGroup).vm.next()
    await nextTick()

    expect(wrapper.findComponent(NImagePreview).props('src')).toBe(
      'image-1.png'
    )
    wrapper.unmount()
  })

  it('should keep image order in `image group` when `src` changes', async () => {
    const srcList = ref(['image-1.png', 'image-2.png', 'image-3.png'])
    const wrapper = mount(() =>
      h(NImageGroup, null, {
        default: () =>
          srcList.value.map((src, index) => h(NImage, { key: index, src }))
      })
    )

    srcList.value = ['image-1.png', 'image-2-updated.png', 'image-3.png']
    await nextTick()

    await wrapper.findAll('img')[0].trigger('click')
    wrapper.findComponent(NImageGroup).vm.next()
    await nextTick()

    expect(wrapper.findComponent(NImagePreview).props('src')).toBe(
      'image-2-updated.png'
    )
    wrapper.unmount()
  })

  it('should inherit attrs', () => {
    const wrapper = mount(NImage, {
      attrs: {
        'data-cool': true
      }
    })
    expect(wrapper.find('[data-cool]').exists()).toEqual(true)
    wrapper.unmount()
  })

  it('should work with `onError` prop', async () => {
    const onError = vi.fn()
    const wrapper = mount(NImage, {
      props: {
        src: 'https:// 07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        onError
      }
    })
    await wrapper.find('img').trigger('error')
    expect(onError).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should show error slot when native lazy image fails to load', async () => {
    const wrapper = mount(NImage, {
      props: {
        lazy: true,
        src: 'https:// 07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      slots: {
        error: () => 'Load failed'
      }
    })

    await wrapper.find('img').trigger('error')

    expect(wrapper.text()).toContain('Load failed')
    expect(wrapper.find('img').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should not show placeholder slot when image fails to load', async () => {
    const wrapper = mount(NImage, {
      props: {
        src: 'https:// 07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      },
      slots: {
        error: () => 'Load failed',
        placeholder: () => 'Placeholder'
      }
    })

    await wrapper.find('img').trigger('error')

    expect(wrapper.text()).toContain('Load failed')
    expect(wrapper.text()).not.toContain('Placeholder')
    wrapper.unmount()
  })

  it('should show fallback src when native lazy image fails to load', async () => {
    const fallbackSrc = 'https://www.naiveui.com/assets/naivelogo.93278402.svg'
    const wrapper = mount(NImage, {
      props: {
        lazy: true,
        src: 'https:// 07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        fallbackSrc
      }
    })

    await wrapper.find('img').trigger('error')

    expect(wrapper.find('img').attributes('src')).toBe(fallbackSrc)
    expect(wrapper.find('img').attributes('data-error')).toBe('true')
    wrapper.unmount()
  })

  it('should work with `objectFit` prop', () => {
    const wrapper = mount(NImage, {
      props: {
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        objectFit: 'contain'
      }
    })
    expect(wrapper.find('img').attributes('style')).toContain(
      'object-fit: contain;'
    )
    wrapper.unmount()
  })
  it('should work with `showToolbar close` prop', async () => {
    const wrapper = mount(NImage, {
      props: {
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
      }
    })
    await wrapper.find('img').trigger('click')
    expect(document.querySelector('.n-image-preview-toolbar')).not.toEqual(null)
    expect(wrapper.findComponent(NImagePreview).exists()).toBe(true)
    const toolbars = document.querySelector('.n-image-preview-toolbar')
    toolbars?.children[toolbars?.children.length - 1].dispatchEvent(
      new MouseEvent('click')
    )
    await nextTick()
    expect(document.querySelector('.n-image-preview-toolbar')).toEqual(null)
    wrapper.unmount()
  })

  it('should work with `onLoad` prop', async () => {
    const onLoad = vi.fn()
    const wrapper = mount(NImage, {
      props: {
        src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
        onLoad
      }
    })
    await wrapper.find('img').trigger('load')
    expect(onLoad).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `canPreview` prop', async () => {
    const wrapper = mount(NImage, {
      props: {
        previewDisabled: true
      }
    })

    await wrapper.find('img').trigger('click')
    expect(document.querySelector('.n-image-preview-overlay')).toEqual(null)
    wrapper.unmount()
  })
})
