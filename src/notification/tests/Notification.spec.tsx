import { mount } from '@vue/test-utils'
import { defineComponent, h, ref, Ref, nextTick } from 'vue'
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
