import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import { NDialogProvider, useDialog, NDialog } from '../index'

const Provider = defineComponent({
  render () {
    return <NDialogProvider>{this.$slots}</NDialogProvider>
  }
})

describe('n-dialog', () => {
  it('should work with import on demand', () => {
    mount(NDialogProvider)
  })

  it('should have correct type', () => {
    const Test = defineComponent({
      setup () {
        const dialog = useDialog()
        dialog.success({
          title: 'Test success',
          content: 'Content'
        })
      },
      render () {
        return null
      }
    })
    const dialogProvider = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    dialogProvider.unmount()
  })

  it('can be a component', () => {
    const dialog = mount(NDialog, {
      attachTo: document.body,
      props: {
        title: 'Test success',
        content: 'success'
      }
    })
    expect(document.querySelector('.n-dialog__content')?.textContent).toEqual(
      'success'
    )
    dialog.unmount()
  })

  it("shouldn't display button if no text is set", () => {
    const wrapper = mount(NDialog)
    expect(wrapper.find('button').exists()).toEqual(false)
  })

  it('loading', async () => {
    const Test = defineComponent({
      setup () {
        const dialog = useDialog()
        dialog.success({
          title: 'Loading',
          content: 'Content',
          positiveText: '确认',
          loading: true
        })
      },
      render () {
        return null
      }
    })
    await mount(() => <Provider>{{ default: () => <Test /> }}</Provider>)
    expect(document.querySelector('.n-button__icon')).not.toEqual(null)
  })

  it('maskClosable', async () => {
    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true })
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true })
    const Test = defineComponent({
      setup () {
        const dialog = useDialog()
        dialog.success({
          title: 'Close by mask',
          content: 'Content',
          maskClosable: false
        })
      },
      render () {
        return null
      }
    })
    mount(() => <Provider>{{ default: () => <Test /> }}</Provider>)
    document.body.dispatchEvent(mousedownEvent)
    document.body.dispatchEvent(mouseupEvent)
    await nextTick(() => {
      expect(document.querySelector('.n-dialog')).not.toBeNull()
    })
  })

  it('onMaskClick', async () => {
    const onMaskClick = jest.fn()
    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true })
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true })
    const Test = defineComponent({
      setup () {
        const dialog = useDialog()
        dialog.success({
          title: 'Close by mask',
          content: 'Content',
          onMaskClick
        })
      },
      render () {
        return null
      }
    })
    await mount(() => <Provider>{{ default: () => <Test /> }}</Provider>)
    document.body.dispatchEvent(mousedownEvent)
    document.body.dispatchEvent(mouseupEvent)
    expect(onMaskClick).toHaveBeenCalled()
  })
})
