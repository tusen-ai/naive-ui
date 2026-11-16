import type { TabsInst, TabsProps } from '../index'
import { page } from 'vitest/browser'
import { createApp, defineComponent, h, nextTick, onMounted, ref } from 'vue'
import { NConfigProvider } from '../../config-provider'
import { NTabPane, NTabs } from '../index'
import { tabsRtl } from '../styles'

describe('n-tabs scroll to current tab (browser)', () => {
  it.each(['top', 'bottom', 'left', 'right'] as const)(
    'keeps the initial active tab visible after scroll buttons appear (%s)',
    async (placement) => {
      await checkInitialTab(placement, false, true)
    }
  )

  it('keeps the initial active tab visible in RTL', async () => {
    await checkInitialTab('top', true, true)
  })

  it('keeps scrolling without buttons working', async () => {
    await checkInitialTab('top', false, false)
  })

  it.each(['card', 'bar'] as const)('keeps %s tabs visible', async (type) => {
    await checkInitialTab('top', false, true, type)
  })

  it('centers the active tab in the available space', async () => {
    await checkInitialTab('top', false, true, 'line', true)
  })
})

async function checkInitialTab(
  placement: TabsProps['placement'],
  rtl: boolean,
  showScrollButton: boolean,
  type: TabsProps['type'] = 'line',
  centerActiveTab = false
) {
  await page.viewport(800, 600)
  const host = document.createElement('div')
  host.style.width = '320px'
  host.dir = rtl ? 'rtl' : 'ltr'
  document.body.append(host)
  const showButtons = ref(showScrollButton)
  const activeName = centerActiveTab ? 10 : 19
  const tabsRef = ref<TabsInst | null>(null)
  const app = createApp(
    defineComponent({
      setup() {
        onMounted(() => tabsRef.value?.scrollToCurrentTab())
        return () => (
          <NConfigProvider rtl={rtl ? [tabsRtl] : undefined}>
            {{
              default: () => (
                <NTabs
                  ref={tabsRef}
                  placement={placement}
                  type={type}
                  defaultValue={activeName}
                  showScrollButton={showButtons.value}
                  centerActiveTab={centerActiveTab}
                  style="height: 240px"
                >
                  {{
                    default: () =>
                      Array.from({ length: 20 }, (_, index) => (
                        <NTabPane
                          name={index}
                          tab={`Long tab label ${index}`}
                        />
                      ))
                  }}
                </NTabs>
              )
            }}
          </NConfigProvider>
        )
      }
    })
  )
  app.mount(host)
  try {
    await nextTick()
    if (showScrollButton) {
      await expect
        .poll(() => host.querySelectorAll('.n-tabs-scroll-button').length)
        .toBe(2)
    }
    const horizontal = placement === 'top' || placement === 'bottom'
    async function expectVisible() {
      await expect
        .poll(() => {
          const viewport = host
            .querySelector('.n-tabs-nav-scroll-wrapper')!
            .getBoundingClientRect()
          const active = host
            .querySelector(`[data-name="${activeName}"]`)!
            .getBoundingClientRect()
          if (centerActiveTab) {
            return -Math.abs(
              (active.left + active.right - viewport.left - viewport.right) / 2
            )
          }
          return horizontal
            ? Math.min(
                active.left - viewport.left,
                viewport.right - active.right
              )
            : Math.min(
                active.top - viewport.top,
                viewport.bottom - active.bottom
              )
        })
        .toBeGreaterThanOrEqual(-1)
    }
    await expectVisible()
    showButtons.value = !showButtons.value
    await nextTick()
    await expectVisible()
  }
  finally {
    app.unmount()
    host.remove()
  }
}
