import type { Ref } from 'vue'
import type { NotificationReactive } from '../index'
import { mount } from '@vue/test-utils'
import { sleep } from 'seemly'
import { defineComponent, h, nextTick, onMounted, ref } from 'vue'
import { NNotificationProvider, useNotification } from '../index'

const Provider = defineComponent({
  render() {
    return <NNotificationProvider>{this.$slots}</NNotificationProvider>
  }
})

describe('n-notification', () => {
  it('should work with import on demand', () => {
    mount(NNotificationProvider)
  })
  it('should have correct type', () => {
    const Test = defineComponent({
      setup() {
        const notification = useNotification()
        notification.info({
          title: 'info'
        })
        const notificationReactive = notification.success({
          title: 'success'
        })
        notificationReactive.title = 'cool'
      },
      render() {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    wrapper.unmount()
  })

  it('can change content', async () => {
    const changeContent = vi.fn((nRef: Ref) => {
      nRef.value.content = 'change info'
    })
    const Test = defineComponent({
      setup() {
        const nRef = ref<NotificationReactive | null>(null)
        const notification = useNotification()
        nRef.value = notification.info({
          title: 'info',
          content: 'info'
        })
        setTimeout(() => {
          if (nRef.value) {
            changeContent(nRef)
          }
        })
      },
      render() {
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
      setup() {
        const notification = useNotification()
        notification.info({
          title: 'info',
          content: 'info',
          duration: 1000
        })
      },
      render() {
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
      setup() {
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
      render() {
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
      setup() {
        const notification = useNotification()
        notification.info({
          title: 'info',
          content: 'info'
        })
      },
      render() {
        return null
      }
    })
    const wrapper = mount(NNotificationProvider, {
      slots: {
        default: () => <Test />
      }
    })
    await nextTick()
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
  it('should allow each notification to override `placement`', async () => {
    const Test = defineComponent({
      setup() {
        const notification = useNotification()
        notification.info({
          title: 'top left',
          placement: 'top-left'
        })
        notification.success({
          title: 'bottom right',
          placement: 'bottom-right'
        })
      },
      render() {
        return null
      }
    })
    const wrapper = mount(NNotificationProvider, {
      slots: {
        default: () => <Test />
      }
    })
    await nextTick()
    const topLeftContainer = document.querySelector(
      '.n-notification-container--top-left'
    )
    const bottomRightContainer = document.querySelector(
      '.n-notification-container--bottom-right'
    )
    expect(topLeftContainer?.textContent).toContain('top left')
    expect(bottomRightContainer?.textContent).toContain('bottom right')
    wrapper.unmount()
  })
  it('should work with `destroyAll` method', async () => {
    const Test = defineComponent({
      setup() {
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
      render() {
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
