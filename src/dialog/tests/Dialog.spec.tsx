import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
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
    const dialogProvider = mount(() => <Provider>{{ default: () => <Test /> }}</Provider>)
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
    expect(document.querySelector('.n-dialog__content')?.textContent).toEqual('success')
    dialog.unmount()
  })

  it('async', async () => {
    const Test = defineComponent({
      setup () {
        const dialog = useDialog()
        dialog.success({
          title: 'Async',
          content: 'Content',
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
})
