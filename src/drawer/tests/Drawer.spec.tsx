/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { NButton } from '../../button'
import {
  type DrawerContentProps,
  type DrawerProps,
  NDrawer,
  NDrawerContent
} from '../index'

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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function mountDrawer ({
  drawerProps,
  drawerContentProps,
  hasOnUpdateShow,
  show
}: {
  drawerProps?: DrawerProps
  drawerContentProps?: DrawerContentProps
  hasOnUpdateShow?: boolean
  show?: boolean
}) {
  return mount(
    defineComponent({
      setup () {
        return {
          show: ref(!!show)
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
            onUpdateShow={
              hasOnUpdateShow
                ? drawerProps?.onUpdateShow
                : (show) => {
                    this.show = show
                  }
            }
            {...drawerProps}
          >
            {{
              default: () => (
                <NDrawerContent {...drawerContentProps}></NDrawerContent>
              )
            }}
          </NDrawer>
        ]
      }
    }),
    {
      attachTo: document.body
    }
  )
}

describe('n-drawer', () => {
  it('should work with import on demand', () => {
    mount(NDrawer)
  })

  it('closable', async () => {
    const wrapper = mountDrawer({ drawerContentProps: { closable: true } })
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

  it('should work with `placement` prop', async () => {
    let wrapper = mountDrawer({ drawerProps: { placement: 'top' } })
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-drawer')?.className).toContain(
      'n-drawer--top-placement'
    )
    expectDrawerExists()
    wrapper.unmount()

    wrapper = mountDrawer({ drawerProps: { placement: 'right' } })
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-drawer')?.className).toContain(
      'n-drawer--right-placement'
    )
    expectDrawerExists()
    wrapper.unmount()

    wrapper = mountDrawer({ drawerProps: { placement: 'bottom' } })
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-drawer')?.className).toContain(
      'n-drawer--bottom-placement'
    )
    expectDrawerExists()
    wrapper.unmount()

    wrapper = mountDrawer({ drawerProps: { placement: 'left' } })
    await wrapper.find('button').trigger('click')
    expect(document.querySelector('.n-drawer')?.className).toContain(
      'n-drawer--left-placement'
    )
    expectDrawerExists()
    wrapper.unmount()
  })

  it('should work with `show` prop', async () => {
    const wrapper1 = mountDrawer({
      show: false
    })
    expect(document.querySelector('.n-drawer')).toEqual(null)
    wrapper1.unmount()
    const wrapper2 = mountDrawer({
      show: true
    })
    expect(document.querySelector('.n-drawer')).not.toEqual(null)
    wrapper2.unmount()
  })

  it('should work with `on-update:show` prop', async () => {
    const onUpdate = jest.fn()
    const wrapper = mountDrawer({
      hasOnUpdateShow: true,
      drawerProps: { onUpdateShow: onUpdate },
      drawerContentProps: { closable: true }
    })
    await wrapper.find('button').trigger('click')
    setTimeout(() => {
      expect(onUpdate).toHaveBeenCalled()
    }, 300)
    wrapper.unmount()
  })

  it('should work with `mask-closable` prop', async () => {
    const onUpdate = jest.fn()
    const mousedownEvent = new MouseEvent('mousedown', { bubbles: true })
    const mouseupEvent = new MouseEvent('mouseup', { bubbles: true })
    const wrapper = mountDrawer({
      show: true,
      hasOnUpdateShow: true,
      drawerProps: { onUpdateShow: onUpdate },
      drawerContentProps: { closable: true }
    })
    document.querySelector('.n-drawer-mask')?.dispatchEvent(mousedownEvent)
    document.querySelector('.n-drawer-mask')?.dispatchEvent(mouseupEvent)
    setTimeout(() => {
      expect(onUpdate).toHaveBeenCalled()
    }, 300)
    wrapper.unmount()
  })

  it('should work with `header-style` prop', async () => {
    const wrapper = mountDrawer({
      drawerContentProps: {
        title: 'test',
        headerStyle: { backgroundColor: 'red' }
      },
      show: true
    })

    expect(
      (document.querySelector('.n-drawer-header') as HTMLElement).style
        .backgroundColor
    ).toEqual('red')

    wrapper.unmount()
  })

  it('should work with `body-style` prop', async () => {
    const wrapper = mountDrawer({
      drawerContentProps: {
        title: 'test',
        bodyStyle: { backgroundColor: 'red' }
      },
      show: true
    })

    expect(
      (document.querySelector('.n-drawer-body') as HTMLElement).style
        .backgroundColor
    ).toEqual('red')

    wrapper.unmount()
  })

  it('should work with `resizable` prop', async () => {
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'offsetHeight'
    )
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'offsetWidth'
    )

    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 251
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 251
    })
    // placement top
    let wrapper = mountDrawer({
      show: true,
      drawerProps: { placement: 'top', resizable: true, defaultHeight: 251 }
    })
    expect(document.querySelector('.n-drawer')?.className).toContain(
      'n-drawer--top-placement'
    )
    expect(document.querySelector('.n-drawer__resize-trigger')).not.toEqual(
      null
    )

    let mousedownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      clientX: 0,
      clientY: 251
    })
    let mousemoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      clientX: 0,
      clientY: 600
    })
    let mouseupEvent = new MouseEvent('mouseup', { bubbles: true })

    document
      .querySelector('.n-drawer__resize-trigger')
      ?.dispatchEvent(mousedownEvent)
    document.body.dispatchEvent(mousemoveEvent)
    document.body.dispatchEvent(mouseupEvent)

    await nextTick()
    expect(document.querySelector('.n-drawer')?.getAttribute('style')).toBe(
      'height: 600px;'
    )

    wrapper.unmount()

    // placement bottom
    wrapper = mountDrawer({
      show: true,
      drawerProps: { placement: 'bottom', resizable: true, defaultHeight: 251 }
    })
    expect(document.querySelector('.n-drawer')?.className).toContain(
      'n-drawer--bottom-placement'
    )
    expect(document.querySelector('.n-drawer__resize-trigger')).not.toEqual(
      null
    )

    mousedownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      clientX: 0,
      clientY: 600
    })
    mousemoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      clientX: 0,
      clientY: 251
    })
    mouseupEvent = new MouseEvent('mouseup', { bubbles: true })

    document
      .querySelector('.n-drawer__resize-trigger')
      ?.dispatchEvent(mousedownEvent)
    document.body.dispatchEvent(mousemoveEvent)
    document.body.dispatchEvent(mouseupEvent)

    await nextTick()
    expect(document.querySelector('.n-drawer')?.getAttribute('style')).toBe(
      'height: 600px;'
    )

    wrapper.unmount()

    // placement left
    wrapper = mountDrawer({
      show: true,
      drawerProps: { placement: 'left', resizable: true, defaultWidth: 251 }
    })
    expect(document.querySelector('.n-drawer')?.className).toContain(
      'n-drawer--left-placement'
    )
    expect(document.querySelector('.n-drawer__resize-trigger')).not.toEqual(
      null
    )

    mousedownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      clientX: 251,
      clientY: 0
    })
    mousemoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      clientX: 600,
      clientY: 0
    })
    mouseupEvent = new MouseEvent('mouseup', { bubbles: true })

    document
      .querySelector('.n-drawer__resize-trigger')
      ?.dispatchEvent(mousedownEvent)
    document.body.dispatchEvent(mousemoveEvent)
    document.body.dispatchEvent(mouseupEvent)

    await nextTick()
    expect(document.querySelector('.n-drawer')?.getAttribute('style')).toBe(
      'width: 600px;'
    )

    wrapper.unmount()

    // placement right
    wrapper = mountDrawer({
      show: true,
      drawerProps: { placement: 'right', resizable: true, defaultWidth: 251 }
    })
    expect(document.querySelector('.n-drawer')?.className).toContain(
      'n-drawer--right-placement'
    )
    expect(document.querySelector('.n-drawer__resize-trigger')).not.toEqual(
      null
    )

    mousedownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      clientX: 600,
      clientY: 0
    })
    mousemoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      clientX: 251,
      clientY: 0
    })
    mouseupEvent = new MouseEvent('mouseup', { bubbles: true })

    document
      .querySelector('.n-drawer__resize-trigger')
      ?.dispatchEvent(mousedownEvent)
    document.body.dispatchEvent(mousemoveEvent)
    document.body.dispatchEvent(mouseupEvent)

    await nextTick()
    expect(document.querySelector('.n-drawer')?.getAttribute('style')).toBe(
      'width: 600px;'
    )

    wrapper.unmount()

    Object.defineProperty(
      HTMLElement.prototype,
      'offsetHeight',
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      originalOffsetHeight!
    )
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetWidth',
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      originalOffsetWidth!
    )
  })
})
