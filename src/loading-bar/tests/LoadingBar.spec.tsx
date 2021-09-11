import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import { NLoadingBarProvider, useLoadingBar } from '../index'

const Provider = defineComponent({
  render () {
    return <NLoadingBarProvider>{this.$slots}</NLoadingBarProvider>
  }
})

describe('n-loading-bar', () => {
  it('should work with import on demand', () => {
    mount(NLoadingBarProvider)
  })

  it('should have start type', () => {
    const Test = defineComponent({
      setup () {
        const loadingBar = useLoadingBar()
        loadingBar.start()
      },
      render () {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    void nextTick(() => {
      expect(document.querySelector('.n-loading-bar')).not.toEqual(null)
      wrapper.unmount()
    })
  })
  it('should have finish type', async () => {
    const Test = defineComponent({
      setup () {
        const loadingBar = useLoadingBar()
        loadingBar.start()
        loadingBar.finish()
      },
      render () {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    await nextTick()
    expect(document.querySelector('.n-loading-bar--finishing')).not.toEqual(
      null
    )
    wrapper.unmount()
  })

  it('should have error type', async () => {
    const Test = defineComponent({
      setup () {
        const loadingBar = useLoadingBar()
        loadingBar.error()
      },
      render () {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    await nextTick(() => {
      setTimeout(() => {
        expect(document.querySelector('.n-loading-bar--error')).not.toEqual(
          null
        )
        wrapper.unmount()
      }, 300)
    })
  })

  it('should have loadingBarStyle prop', (done) => {
    const Test = defineComponent({
      setup () {
        const loadingBar = useLoadingBar()
        loadingBar.error()
      },
      render () {
        return null
      }
    })
    const wrapper = mount(NLoadingBarProvider, {
      props: {
        loadingBarStyle: {
          error: {
            height: '5px',
            color: '#ccc'
          }
        }
      },
      slots: {
        default: () => <Test />
      }
    })
    void nextTick(() => {
      setTimeout(() => {
        expect(
          document.querySelector('.n-loading-bar--error')?.getAttribute('style')
        ).toContain('height: 5px;')
        wrapper.unmount()
        done()
      }, 300)
    })
  })
})
