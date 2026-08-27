import type { ModalOptions, ModalProps } from '../index'
import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import { defineComponent, h, nextTick, ref, unref } from 'vue'
import { NButton } from '../../button'
import { NModal, NModalProvider, useModal } from '../index'

function dispatchOutsideClick(el: Element | null): void {
  el?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
  el?.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
}

function mountModal({
  modalProps,
  show
}: {
  modalProps?: ModalProps
  show?: boolean
}) {
  return mount(
    defineComponent({
      setup() {
        const showRef = ref(!!show)
        const handleUpdateShow = (value: boolean) => {
          showRef.value = value
        }
        return () => [
          <NButton
            onClick={() => {
              showRef.value = true
            }}
          >
            {{ default: () => 'Show' }}
          </NButton>,
          <NModal
            show={unref(showRef)}
            onUpdateShow={handleUpdateShow}
            {...modalProps}
          >
            {{
              default: () => <div>test</div>
            }}
          </NModal>
        ]
      }
    }),
    {
      attachTo: document.body,
      global: {
        stubs: {
          teleport: false,
          transition: false
        }
      }
    }
  )
}

describe('n-modal', () => {
  it('should work with import on demand', () => {
    mount(NModal)
  })

  it('should work with `display-directive` prop', async () => {
    let wrapper = mountModal({})
    expect(document.querySelector('.n-modal-body-wrapper')).toEqual(null)
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-modal-body-wrapper')).not.toEqual(null)
    using _rafSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback): number => {
        cb(0)
        return 0
      })

    dispatchOutsideClick(document.querySelector('.n-modal-scroll-content'))
    await nextTick()
    expect(document.querySelector('.n-modal-body-wrapper')).toEqual(null)
    wrapper.unmount()
    wrapper = mountModal({ modalProps: { displayDirective: 'show' } })
    expect(document.querySelector('.n-modal-body-wrapper')).toEqual(null)
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-modal-body-wrapper')).not.toEqual(null)

    dispatchOutsideClick(document.querySelector('.n-modal-scroll-content'))
    await nextTick()
    expect(
      document.querySelector('.n-modal-body-wrapper')?.children.length
    ).not.toBe(0)
    expect(
      document.querySelector('.n-modal-body-wrapper')?.getAttribute('style')
    ).toContain('display: none')

    wrapper.unmount()
  })

  it('should close when clicking the mask area', async () => {
    const onMaskClick = vi.fn()
    const wrapper = mountModal({
      show: true,
      modalProps: { onMaskClick }
    })
    await nextTick()
    expect(document.querySelector('.n-modal-body-wrapper')).not.toEqual(null)

    using _rafSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((cb: FrameRequestCallback): number => {
        cb(0)
        return 0
      })
    dispatchOutsideClick(document.querySelector('.n-modal-scroll-content'))
    await nextTick()
    expect(onMaskClick).toHaveBeenCalledTimes(1)
    expect(document.querySelector('.n-modal-body-wrapper')).toEqual(null)
    wrapper.unmount()
  })

  it('should not close when clicking modal content', async () => {
    const wrapper = mountModal({ show: true })
    await nextTick()
    dispatchOutsideClick(document.querySelector('.n-modal'))
    await nextTick()
    expect(document.querySelector('.n-modal-body-wrapper')).not.toEqual(null)
    wrapper.unmount()
  })

  it('should not close when clicking the mask area if `mask-closable` is false', async () => {
    const wrapper = mountModal({
      show: true,
      modalProps: { maskClosable: false }
    })
    await nextTick()
    dispatchOutsideClick(document.querySelector('.n-modal-scroll-content'))
    await nextTick()
    expect(document.querySelector('.n-modal-body-wrapper')).not.toEqual(null)
    wrapper.unmount()
  })

  it('should work with `preset` prop', async () => {
    let wrapper = mountModal({ modalProps: { preset: 'card' } })
    expect(document.querySelector('.n-modal-body-wrapper')).toEqual(null)
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-modal-body-wrapper')).not.toEqual(null)
    expect(document.querySelector('.n-card')).not.toEqual(null)
    wrapper.unmount()

    wrapper = mountModal({ modalProps: { preset: 'dialog' } })
    expect(document.querySelector('.n-modal-body-wrapper')).toEqual(null)
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-modal-body-wrapper')).not.toEqual(null)
    expect(document.querySelector('.n-dialog')).not.toEqual(null)
    wrapper.unmount()
  })

  it('should work with `positive-click` prop on dialog preset', async () => {
    const onPositiveClick = vi.fn()
    const wrapper = mountModal({
      modalProps: {
        preset: 'dialog',
        positiveText: 'confirm',
        onPositiveClick
      }
    })
    await wrapper.find('button').trigger('click')
    document
      .querySelector('.n-dialog__action button')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(onPositiveClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('should work with `negative-click` prop on dialog preset', async () => {
    const onNegativeClick = vi.fn()
    const wrapper = mountModal({
      modalProps: {
        preset: 'dialog',
        negativeText: 'cancel',
        onNegativeClick
      }
    })
    await wrapper.find('button').trigger('click')
    document
      .querySelector('.n-dialog__action button')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(onNegativeClick).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('should work with confirm preset action callbacks', async () => {
    const onPositiveClick = vi.fn()
    const positiveWrapper = mountModal({
      show: true,
      modalProps: {
        preset: 'confirm',
        title: 'test',
        positiveText: 'ok',
        onPositiveClick
      }
    })
    await nextTick()
    document
      .querySelector('.n-dialog__action button')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(onPositiveClick).toHaveBeenCalledTimes(1)
    positiveWrapper.unmount()

    const onNegativeClick = vi.fn()
    const negativeWrapper = mountModal({
      show: true,
      modalProps: {
        preset: 'confirm',
        title: 'test',
        negativeText: 'cancel',
        onNegativeClick
      }
    })
    await nextTick()
    document
      .querySelector('.n-dialog__action button')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(onNegativeClick).toHaveBeenCalledTimes(1)
    negativeWrapper.unmount()

    const onClose = vi.fn()
    const closeWrapper = mountModal({
      show: true,
      modalProps: {
        preset: 'confirm',
        title: 'test',
        onClose
      }
    })
    await nextTick()
    document.querySelector<HTMLElement>('.n-dialog .n-base-close')?.click()
    await nextTick()
    expect(onClose).toHaveBeenCalledTimes(1)
    closeWrapper.unmount()
  })

  it('should work with `close` prop on card preset only once', async () => {
    const onClose = vi.fn()
    const wrapper = mountModal({
      show: true,
      modalProps: {
        preset: 'card',
        closable: true,
        onClose
      }
    })
    await nextTick()
    document.querySelector<HTMLElement>('.n-card .n-base-close')?.click()
    await nextTick()
    expect(onClose).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('should work with `content-scrollable` prop on card preset', async () => {
    const wrapper = mountModal({
      modalProps: {
        preset: 'card',
        contentScrollable: true
      }
    })
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-card--content-scrollable')).not.toEqual(
      null
    )
    expect(document.querySelector('.n-card__content-scrollbar')).not.toEqual(
      null
    )
    wrapper.unmount()
  })

  it('should work with dialog preset action callbacks', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    function hasArrayPropWarning(propName: string): boolean {
      return warnSpy.mock.calls.some(args =>
        String(args[0]).includes(
          `Invalid prop: type check failed for prop "${propName}". Expected Function, got Array`
        )
      )
    }

    const onPositiveClick = vi.fn()
    const positiveWrapper = mountModal({
      show: true,
      modalProps: {
        preset: 'dialog',
        title: 'test',
        positiveText: 'ok',
        onPositiveClick
      }
    })
    await nextTick()
    expect(hasArrayPropWarning('onPositiveClick')).toBe(false)
    document.querySelector<HTMLElement>('.n-dialog .n-button')?.click()
    await nextTick()
    expect(onPositiveClick).toHaveBeenCalledTimes(1)
    positiveWrapper.unmount()

    const onNegativeClick = vi.fn()
    const negativeWrapper = mountModal({
      show: true,
      modalProps: {
        preset: 'dialog',
        title: 'test',
        negativeText: 'cancel',
        onNegativeClick
      }
    })
    await nextTick()
    expect(hasArrayPropWarning('onNegativeClick')).toBe(false)
    document.querySelector<HTMLElement>('.n-dialog .n-button')?.click()
    await nextTick()
    expect(onNegativeClick).toHaveBeenCalledTimes(1)
    negativeWrapper.unmount()

    const onClose = vi.fn()
    const closeWrapper = mountModal({
      show: true,
      modalProps: {
        preset: 'dialog',
        title: 'test',
        onClose
      }
    })
    await nextTick()
    expect(hasArrayPropWarning('onClose')).toBe(false)
    document.querySelector<HTMLElement>('.n-dialog .n-base-close')?.click()
    await nextTick()
    expect(onClose).toHaveBeenCalledTimes(1)
    closeWrapper.unmount()

    warnSpy.mockRestore()
  })

  it('should work with useModal action callbacks', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    function hasArrayPropWarning(propName: string): boolean {
      return warnSpy.mock.calls.some(args =>
        String(args[0]).includes(
          `Invalid prop: type check failed for prop "${propName}". Expected Function, got Array`
        )
      )
    }

    async function mountUseModal(modalOptions: ModalOptions) {
      const Test = defineComponent({
        setup() {
          const modal = useModal()
          modal.create(modalOptions)
        },
        render() {
          return null
        }
      })
      const wrapper = mount(
        () => <NModalProvider>{{ default: () => <Test /> }}</NModalProvider>,
        {
          attachTo: document.body,
          global: {
            stubs: {
              teleport: false,
              transition: false
            }
          }
        }
      )
      await nextTick()
      return wrapper
    }

    const onPositiveClick = vi.fn()
    const positiveWrapper = await mountUseModal({
      preset: 'dialog',
      title: 'test',
      positiveText: 'ok',
      onPositiveClick
    })
    expect(hasArrayPropWarning('onPositiveClick')).toBe(false)
    document.querySelector<HTMLElement>('.n-dialog .n-button')?.click()
    await nextTick()
    expect(onPositiveClick).toHaveBeenCalledTimes(1)
    positiveWrapper.unmount()

    const onNegativeClick = vi.fn()
    const negativeWrapper = await mountUseModal({
      preset: 'dialog',
      title: 'test',
      negativeText: 'cancel',
      onNegativeClick
    })
    expect(hasArrayPropWarning('onNegativeClick')).toBe(false)
    document.querySelector<HTMLElement>('.n-dialog .n-button')?.click()
    await nextTick()
    expect(onNegativeClick).toHaveBeenCalledTimes(1)
    negativeWrapper.unmount()

    const onClose = vi.fn()
    const closeWrapper = await mountUseModal({
      preset: 'dialog',
      title: 'test',
      onClose
    })
    expect(hasArrayPropWarning('onClose')).toBe(false)
    document.querySelector<HTMLElement>('.n-dialog .n-base-close')?.click()
    await nextTick()
    expect(onClose).toHaveBeenCalledTimes(1)
    closeWrapper.unmount()

    warnSpy.mockRestore()
  })
})
