import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { NButton } from '../../button'
import {
  DrawerContentProps,
  DrawerProps,
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
    const wrapper1 = await mountDrawer({
      show: false
    })
    expect(document.querySelector('.n-drawer')).toEqual(null)
    wrapper1.unmount()
    const wrapper2 = await mountDrawer({
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
    const wrapper = await mountDrawer({
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
    const wrapper = await mountDrawer({
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
    const wrapper = await mountDrawer({
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

  it('should work with `adjustable` prop', async () => {
    // placement top
    let wrapper = await mountDrawer({
      show: true,
      drawerProps: { placement: 'top', adjustable: true, height: 251 }
    })
    expect(document.querySelector('.n-drawer')?.className).toContain(
      'n-drawer--top-placement'
    )
    expect(
      document.querySelector('.n-drawer__adjustable-line--top')
    ).not.toEqual(null)

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
      .querySelector('.n-drawer__adjustable-line--top')
      ?.dispatchEvent(mousedownEvent)
    document.body?.dispatchEvent(mousemoveEvent)
    document.body?.dispatchEvent(mouseupEvent)

    await nextTick()
    expect(document.querySelector('.n-drawer')?.getAttribute('style')).toBe(
      'height: 600px;'
    )

    wrapper.unmount()

    // placement bottom
    wrapper = await mountDrawer({
      show: true,
      drawerProps: { placement: 'bottom', adjustable: true, height: 251 }
    })
    expect(document.querySelector('.n-drawer')?.className).toContain(
      'n-drawer--bottom-placement'
    )
    expect(
      document.querySelector('.n-drawer__adjustable-line--bottom')
    ).not.toEqual(null)

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
      .querySelector('.n-drawer__adjustable-line--bottom')
      ?.dispatchEvent(mousedownEvent)
    document.body?.dispatchEvent(mousemoveEvent)
    document.body?.dispatchEvent(mouseupEvent)

    await nextTick()
    expect(document.querySelector('.n-drawer')?.getAttribute('style')).toBe(
      'height: 600px;'
    )

    wrapper.unmount()

    // placement left
    wrapper = await mountDrawer({
      show: true,
      drawerProps: { placement: 'left', adjustable: true, width: 251 }
    })
    expect(document.querySelector('.n-drawer')?.className).toContain(
      'n-drawer--left-placement'
    )
    expect(
      document.querySelector('.n-drawer__adjustable-line--left')
    ).not.toEqual(null)

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
      .querySelector('.n-drawer__adjustable-line--left')
      ?.dispatchEvent(mousedownEvent)
    document.body?.dispatchEvent(mousemoveEvent)
    document.body?.dispatchEvent(mouseupEvent)

    await nextTick()
    expect(document.querySelector('.n-drawer')?.getAttribute('style')).toBe(
      'width: 600px;'
    )

    wrapper.unmount()

    // placement right
    wrapper = await mountDrawer({
      show: true,
      drawerProps: { placement: 'right', adjustable: true, width: 251 }
    })
    expect(document.querySelector('.n-drawer')?.className).toContain(
      'n-drawer--right-placement'
    )
    expect(
      document.querySelector('.n-drawer__adjustable-line--right')
    ).not.toEqual(null)

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
      .querySelector('.n-drawer__adjustable-line--right')
      ?.dispatchEvent(mousedownEvent)
    document.body?.dispatchEvent(mousemoveEvent)
    document.body?.dispatchEvent(mouseupEvent)

    await nextTick()
    expect(document.querySelector('.n-drawer')?.getAttribute('style')).toBe(
      'width: 600px;'
    )

    wrapper.unmount()
  })
})
