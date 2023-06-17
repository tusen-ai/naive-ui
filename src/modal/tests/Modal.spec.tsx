import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { type ModalProps, NModal } from '../index'
import { NButton } from '../../button'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function mountModal ({
  modalProps,
  show
}: {
  modalProps?: ModalProps
  show?: boolean
}) {
  return mount(
    defineComponent({
      setup () {
        return {
          show: ref(!!show)
        }
      },
      render () {
        return [
          <NButton
            onClick={() => {
              this.show = true
            }}
          >
            {{ default: () => 'Show' }}
          </NButton>,
          <NModal
            show={this.show}
            onUpdateShow={(show) => {
              this.show = show
            }}
            {...modalProps}
          >
            {{
              default: () => 'test'
            }}
          </NModal>
        ]
      }
    }),
    {
      attachTo: document.body
    }
  )
}

describe('n-modal', () => {
  it('should work with import on demand', () => {
    mount(NModal)
  })

  it('should work with `display-directive` prop', async () => {
    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true })
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true })
    let wrapper = mountModal({})
    expect(document.querySelector('.n-modal-body-wrapper')).toEqual(null)
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-modal-body-wrapper')).not.toEqual(null)
    document.querySelector('.n-modal-mask')?.dispatchEvent(mousedownEvent)
    document.querySelector('.n-modal-mask')?.dispatchEvent(mouseupEvent)
    setTimeout(() => {
      expect(
        document.querySelector('.n-modal-body-wrapper')?.children.length
      ).toBe(0)
    }, 300)
    wrapper.unmount()
    wrapper = mountModal({ modalProps: { displayDirective: 'show' } })
    expect(document.querySelector('.n-modal-body-wrapper')).toEqual(null)
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-modal-body-wrapper')).not.toEqual(null)
    document.querySelector('.n-modal-mask')?.dispatchEvent(mousedownEvent)
    document.querySelector('.n-modal-mask')?.dispatchEvent(mouseupEvent)
    setTimeout(() => {
      expect(
        document.querySelector('.n-modal-body-wrapper')?.children.length
      ).not.toBe(0)
      expect(
        document.querySelector('.n-modal-body-wrapper')?.getAttribute('style')
      ).toContain('display: none')
    }, 300)
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
})
