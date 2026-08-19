import type { ModalOptions, ModalProps } from '../index'
import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import { defineComponent, h, nextTick, ref, unref } from 'vue'
import { NButton } from '../../button'
import { NModal, NModalProvider, useModal } from '../index'

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

    document
      .querySelector('.n-modal-mask')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(document.querySelector('.n-modal-body-wrapper')).toEqual(null)
    wrapper.unmount()
    wrapper = mountModal({ modalProps: { displayDirective: 'show' } })
    expect(document.querySelector('.n-modal-body-wrapper')).toEqual(null)
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-modal-body-wrapper')).not.toEqual(null)

    document
      .querySelector('.n-modal-mask')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(
      document.querySelector('.n-modal-body-wrapper')?.children.length
    ).not.toBe(0)
    expect(
      document.querySelector('.n-modal-body-wrapper')?.getAttribute('style')
    ).toContain('display: none')

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
