import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { NMessageProvider, useMessage } from '../index'

const Provider = defineComponent({
  render () {
    return <NMessageProvider>{this.$slots}</NMessageProvider>
  }
})

describe('n-message', () => {
  it('should work with import on demand', () => {
    mount(NMessageProvider)
  })
  it('should has correct type', () => {
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
    mount(() => <Provider>{{ default: () => <Test /> }}</Provider>)
  })
})
