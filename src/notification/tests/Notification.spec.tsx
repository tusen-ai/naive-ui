import { mount } from '@vue/test-utils'
import { defineComponent, h, ref, Ref, nextTick, onMounted } from 'vue'
import {
  NNotificationProvider,
  useNotification,
  NotificationReactive
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

  it('can change content', (done) => {
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
    void nextTick(() => {
      expect(
        document.querySelector('.n-notification-main__content')?.textContent
      ).toEqual('info')
      setTimeout(() => {
        expect(changeContent).toHaveBeenCalled()
        expect(
          document.querySelector('.n-notification-main__content')?.textContent
        ).toEqual('change info')
        wrapper.unmount()
        done()
      }, 1000)
    })
  })

  it('should work with duration', (done) => {
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
    void nextTick(() => {
      setTimeout(() => {
        expect(document.querySelector('.n-notification')).not.toEqual(null)
      }, 500)
      setTimeout(() => {
        expect(document.querySelector('.n-notification')).toBe(null)
        wrapper.unmount()
        done()
      }, 1200)
    })
  })
})
describe('notification-provider', () => {
  it('props.max', (done) => {
    const Test = defineComponent({
      setup () {
        const notification = useNotification()
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
    void nextTick(() => {
      expect(document.querySelectorAll('.n-notification').length).toBe(2)
      wrapper.unmount()
      done()
    })
  })
  it('should work with `placement` prop', () => {
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
    process.nextTick(async () => {
      expect(wrapper.find('.notification-container').classes()).toContain(
        'notification-container--top-right'
      )
      await wrapper.setProps({ placement: 'top-left' })
      expect(wrapper.find('.notification-container').classes()).toContain(
        'notification-container--top-right'
      )
      await wrapper.setProps({ placement: 'bottom-right' })
      expect(wrapper.find('.notification-container').classes()).toContain(
        'notification-container--bottom-right'
      )
      await wrapper.setProps({ placement: 'bottom-left' })
      expect(wrapper.find('.notification-container').classes()).toContain(
        'notification-container--bottom-left'
      )
    })
  })
  it('should work with `destroyAll` method', () => {
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
          setTimeout(() => {
            notification.destroyAll()
          })
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
    process.nextTick(async () => {
      expect(wrapper.find('.notification-container').exists()).toBe(false)
    })
  })
})
