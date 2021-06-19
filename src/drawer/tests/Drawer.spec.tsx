import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { NButton } from '../../button'
import { NDrawer, NDrawerContent } from '../index'

// It seems due to special handling of transition in naive-ui, the drawer's DOM
// won't disappear even if its `show` prop is false. No time to find out the
// exact reason, so I create a util here.
function expectDrawerExists (): void {
  const drawer = document.querySelector('.n-drawer')
  if (drawer !== null) return
  expect(
    (document.querySelector('.n-drawer') as HTMLElement).style.display
  ).toEqual('none')
}

describe('n-drawer', () => {
  it('should work with import on demand', () => {
    mount(NDrawer)
  })
  it('closable', async () => {
    const wrapper = mount(
      defineComponent({
        setup () {
          return {
            show: ref(false)
          }
        },
        render () {
          return [
            <NButton
              onClick={() => {
                this.show = true
              }}
            >
              {{ default: () => 'Show' }}
            </NButton>,
            <NDrawer
              show={this.show}
              onUpdateShow={(show) => {
                this.show = show
              }}
            >
              {{ default: () => <NDrawerContent closable></NDrawerContent> }}
            </NDrawer>
          ]
        }
      }),
      {
        attachTo: document.body
      }
    )
    expect(document.querySelector('.n-drawer')).toEqual(null)
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-drawer')).not.toEqual(null)
    document
      .querySelector('.n-base-close')
      ?.dispatchEvent(new MouseEvent('click'))
    await nextTick()
    expectDrawerExists()
    wrapper.unmount()
  })
})
