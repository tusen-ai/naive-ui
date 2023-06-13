import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import { NDialogProvider, useDialog, NDialog, type DialogProps } from '../index'

const Provider = defineComponent({
  render () {
    return <NDialogProvider>{this.$slots}</NDialogProvider>
  }
})

const createTestComponent = (
  type: 'create' | 'error' | 'info' | 'success' | 'warning',
  dialogProps?: DialogProps
): any => {
  return defineComponent({
    setup () {
      const dialog = useDialog()
      dialog[type]({
        title: 'test dialog type',
        ...dialogProps
      })
    },
    render () {
      return null
    }
  })
}

describe('n-dialog', () => {
  it('should work with import on demand', () => {
    mount(NDialogProvider)
  })

  it('should have correct type', () => {
    const Test = defineComponent({
      setup () {
        const dialog = useDialog()
        const dialogReactive = dialog.success({
          title: 'Test success',
          content: 'Content'
        })
        dialogReactive.style = 'color: red;'
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

  it("shouldn't useDialog display button if no text is set", () => {
    const wrapper = mount(NDialog)
    expect(wrapper.find('.n-button').exists()).toEqual(false)
    wrapper.unmount()
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
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    await nextTick()
    expect(document.querySelector('.n-button__icon')).not.toEqual(null)
    wrapper.unmount()
  })

  it('maskClosable', async () => {
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
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    document
      .querySelector('.n-modal-mask')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
    expect(document.querySelector('.n-dialog')).not.toBeNull()
    wrapper.unmount()
  })

  it('onMaskClick', async () => {
    const onMaskClick = jest.fn()
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
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    await nextTick()
    document
      .querySelector('.n-modal-mask')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onMaskClick).toHaveBeenCalled()
    wrapper.unmount()
  })

  it('should work with `style` option', async () => {
    const Test = defineComponent({
      setup () {
        const dialog = useDialog()
        dialog.warning({
          title: 'Custom style',
          content: 'Content',
          style: {
            color: 'rgb(79, 178, 51)'
          }
        })
      },
      render () {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    await nextTick()
    expect(
      document.querySelector('.n-dialog')?.getAttribute('style')
    ).toContain('color: rgb(79, 178, 51);')
    wrapper.unmount()
  })

  it('dialog type', async () => {
    const TestCreate = createTestComponent('create')
    const TestError = createTestComponent('error')
    const TestInfo = createTestComponent('info')
    const TestSuccess = createTestComponent('success')
    const TestWarning = createTestComponent('warning')

    const wrapperCreate = mount(() => (
      <Provider>{{ default: () => <TestCreate /> }}</Provider>
    ))
    await nextTick()
    expect(
      document.querySelector('.n-dialog')?.getAttribute('style')
    ).toContain('--n-icon-color: #18a058;')
    wrapperCreate.unmount()

    const wrapperError = mount(() => (
      <Provider>{{ default: () => <TestError /> }}</Provider>
    ))
    await nextTick()
    expect(
      document.querySelector('.n-dialog')?.getAttribute('style')
    ).toContain('--n-icon-color: #d03050;')
    wrapperError.unmount()

    const wrapperInfo = mount(() => (
      <Provider>{{ default: () => <TestInfo /> }}</Provider>
    ))
    await nextTick()
    expect(
      document.querySelector('.n-dialog')?.getAttribute('style')
    ).toContain('--n-icon-color: #2080f0;')
    wrapperInfo.unmount()

    const wrapperSuccess = mount(() => (
      <Provider>{{ default: () => <TestSuccess /> }}</Provider>
    ))
    await nextTick()
    expect(
      document.querySelector('.n-dialog')?.getAttribute('style')
    ).toContain('--n-icon-color: #18a058;')
    wrapperSuccess.unmount()

    const wrapperWarning = mount(() => (
      <Provider>{{ default: () => <TestWarning /> }}</Provider>
    ))
    await nextTick()
    expect(
      document.querySelector('.n-dialog')?.getAttribute('style')
    ).toContain('--n-icon-color: #f0a020;')
    wrapperWarning.unmount()
  })

  it('should work with `bordered` option', async () => {
    const Test = createTestComponent('info', { bordered: true })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    await nextTick()
    expect(document.querySelector('.n-dialog--bordered')).not.toEqual(null)
    wrapper.unmount()
  })

  it('should work with `closable` option', async () => {
    const Test = createTestComponent('info', { closable: false })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    await nextTick()
    expect(document.querySelector('.n-base-icon')).not.toEqual(null)
    wrapper.unmount()
  })

  it('should work with `icon-placement` option', async () => {
    const TestLeft = createTestComponent('info', { iconPlacement: 'left' })
    const TestTop = createTestComponent('info', { iconPlacement: 'top' })

    const wrapperLeft = mount(() => (
      <Provider>{{ default: () => <TestLeft /> }}</Provider>
    ))
    const wrapperTop = mount(() => (
      <Provider>{{ default: () => <TestTop /> }}</Provider>
    ))
    await nextTick()
    expect(document.querySelector('.n-dialog--icon-left')).not.toEqual(null)
    wrapperLeft.unmount()
    expect(document.querySelector('.n-dialog--icon-top')).not.toEqual(null)
    wrapperTop.unmount()
  })

  it('should work with `negative-text` option', async () => {
    const Test = createTestComponent('info', { negativeText: 'test1' })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    await nextTick()
    expect(document.querySelector('.n-button__content')?.textContent).toBe(
      'test1'
    )
    wrapper.unmount()
  })

  it('should work with `positive-text` option', async () => {
    const Test = createTestComponent('info', { positiveText: 'test2' })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    await nextTick()
    expect(document.querySelector('.n-button__content')?.textContent).toBe(
      'test2'
    )
    wrapper.unmount()
  })
})
