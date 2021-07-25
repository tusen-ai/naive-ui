import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import { NMessageProvider, useMessage } from '../index'

const Provider = defineComponent({
  render () {
    return <NMessageProvider maxVisible={1}>{this.$slots}</NMessageProvider>
  }
})

describe('n-message', () => {
  it('should work with import on demand', () => {
    mount(NMessageProvider)
  })
  it('should have correct type', () => {
    const Test = defineComponent({
      setup () {
        const message = useMessage()
        message.info('string')
        message.info(() => 'string')
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
  it('maxVisible work on messageProvider', () => {
    const Test = defineComponent({
      setup () {
        const message = useMessage()
        message.info('string')
        message.info('string1')
        message.info('string2')
        message.info('string3')
      },
      render () {
        return null
      }
    })
    const wrapper = mount(NMessageProvider, {
      props: {
        maxVisible: 2
      },
      slots: {
        default: () => <Test />
      }
    })
    void nextTick(() => {
      expect(document.querySelectorAll('.n-message').length).toBe(2)
      wrapper.unmount()
    })
  })
  it('duration work on messageProvider', () => {
    const Test = defineComponent({
      setup () {
        const message = useMessage()
        message.info('string')
      },
      render () {
        return null
      }
    })
    const wrapper = mount(NMessageProvider, {
      props: {
        duration: 1000
      },
      slots: {
        default: () => <Test />
      }
    })
    void nextTick(() => {
      setTimeout(() => {
        expect(document.querySelector('.n-message')).toBe(true)
      }, 500)
      setTimeout(() => {
        expect(document.querySelector('.n-message')).toBe(false)
      }, 1200)
      wrapper.unmount()
    })
  })
})
