import { mount } from '@vue/test-utils'
import { sleep } from 'seemly'
import { defineComponent, h } from 'vue'
import { NLoadingBarProvider, useLoadingBar } from '../index'

const Provider = defineComponent({
  render() {
    return <NLoadingBarProvider>{this.$slots}</NLoadingBarProvider>
  }
})

describe('n-loading-bar', () => {
  it('should work with import on demand', () => {
    mount(NLoadingBarProvider)
  })

  it('should have start type', async () => {
    const Test = defineComponent({
      setup() {
        const loadingBar = useLoadingBar()
        loadingBar.start()
      },
      render() {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    await sleep(0)
    expect(document.querySelector('.n-loading-bar')).not.toEqual(null)
    wrapper.unmount()
  })

  it('should have finish type', async () => {
    const Test = defineComponent({
      setup() {
        const loadingBar = useLoadingBar()
        loadingBar.start()
        vi.waitFor(() => {
          loadingBar.finish()
        })
      },
      render() {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    await sleep(0)
    expect(document.querySelector('.n-loading-bar--finishing')).not.toEqual(
      null
    )
    wrapper.unmount()
  })

  it('should have error type', () => {
    const Test = defineComponent({
      setup() {
        const loadingBar = useLoadingBar()
        loadingBar.error()
      },
      render() {
        return null
      }
    })
    const wrapper = mount(() => (
      <Provider>{{ default: () => <Test /> }}</Provider>
    ))
    vi.waitFor(() => {
      expect(document.querySelector('.n-loading-bar--error')).not.toEqual(null)
      wrapper.unmount()
    })
  })

  it('should have loadingBarStyle prop', async () => {
    const Test = defineComponent({
      setup() {
        const loadingBar = useLoadingBar()
        loadingBar.error()
      },
      render() {
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
    vi.waitFor(() => {
      expect(
        document.querySelector('.n-loading-bar--error')?.getAttribute('style')
      ).toContain('height: 5px;')
    })
    wrapper.unmount()
  })
})
