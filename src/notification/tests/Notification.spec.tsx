import { mount } from '@vue/test-utils'
import { sleep } from 'seemly'
import { defineComponent, h, ref, type Ref, nextTick, onMounted } from 'vue'
import {
  NNotificationProvider,
  useNotification,
  type NotificationReactive
} from '../index'

const Provider = defineComponent({
  render () {
    return <NNotificationProvider>{this.$slots}</NNotificationProvider>
  }
})

describe('n-notification', () => {
  it('should work with import on demand', () => {
    mount(NNotificationProvider)
  })
  it('should have correct type', () => {
    const Test = defineComponent({
      setup () {
        const notification = useNotification()
        notification.info({
          title: 'info'
        })
        const notificationReactive = notification.success({
          title: 'success'
        })
        notificationReactive.title = 'cool'
      },
      render () {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    wrapper.unmount()
  })

  it('can change content', async () => {
    const changeContent = jest.fn((nRef: Ref) => {
      nRef.value.content = 'change info'
    })
    const Test = defineComponent({
      setup () {
        const nRef = ref<NotificationReactive | null>(null)
        const notification = useNotification()
        nRef.value = notification.info({
          title: 'info',
          content: 'info'
        })
        setTimeout(() => {
          nRef.value && changeContent(nRef)
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
      document.querySelector('.n-notification-main__content')?.textContent
    ).toEqual('info')
    await sleep(1000)
    expect(changeContent).toHaveBeenCalled()
    expect(
      document.querySelector('.n-notification-main__content')?.textContent
    ).toEqual('change info')
    wrapper.unmount()
  })

  it('should work with duration', async () => {
    const Test = defineComponent({
      setup () {
        const notification = useNotification()
        notification.info({
          title: 'info',
          content: 'info',
          duration: 1000
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
    await sleep(500)
    expect(document.querySelector('.n-notification')).not.toEqual(null)
    await sleep(1200)
    expect(document.querySelector('.n-notification')).toBe(null)
    wrapper.unmount()
  })
})

describe('notification-provider', () => {
  it('props.max', async () => {
    const Test = defineComponent({
      setup () {
        const notification = useNotification()
        onMounted(() => {
          notification.info({
            title: 'info',
            content: 'info'
          })
          notification.info({
            title: 'info',
            content: 'info'
          })
          notification.info({
            title: 'info',
            content: 'info'
          })
        })
      },
      render () {
        return null
      }
    })
    const wrapper = mount(NNotificationProvider, {
      props: {
        max: 2
      },
      slots: {
        default: () => <Test />
      }
    })
    await nextTick()
    expect(document.querySelectorAll('.n-notification').length).toBe(2)
    wrapper.unmount()
  })
  it('should work with `placement` prop', async () => {
    const Test = defineComponent({
      setup () {
        const notification = useNotification()
        notification.info({
          title: 'info',
          content: 'info'
        })
      },
      render () {
        return null
      }
    })
    const wrapper = mount(NNotificationProvider, {
      slots: {
        default: () => <Test />
      }
    })
    await nextTick()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const container = document.querySelector('.n-notification-container')!
    expect(container).not.toBeFalsy()
    expect(
      container.classList.contains('n-notification-container--top-right')
    ).toEqual(true)
    await wrapper.setProps({ placement: 'top-left' })
    expect(
      container.classList.contains('n-notification-container--top-left')
    ).toEqual(true)
    await wrapper.setProps({ placement: 'bottom-right' })
    expect(
      container.classList.contains('n-notification-container--bottom-right')
    ).toEqual(true)
    await wrapper.setProps({ placement: 'bottom-left' })
    expect(
      container.classList.contains('n-notification-container--bottom-left')
    ).toEqual(true)
    wrapper.unmount()
  })
  it('should work with `destroyAll` method', async () => {
    const Test = defineComponent({
      setup () {
        const notification = useNotification()
        onMounted(() => {
          notification.info({
            title: 'info',
            content: 'info'
          })
          notification.info({
            title: 'info',
            content: 'info'
          })
          notification.destroyAll()
        })
      },
      render () {
        return null
      }
    })
    const wrapper = mount(NNotificationProvider, {
      slots: {
        default: () => <Test />
      }
    })
    await nextTick()
    expect(wrapper.find('.notification-container').exists()).toBe(false)
    wrapper.unmount()
  })
})
