import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { NDialogProvider, useDialog } from '../index'

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
    mount(() => <Provider>{{ default: () => <Test /> }}</Provider>)
  })
})
