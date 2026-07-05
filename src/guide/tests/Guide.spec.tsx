import type { GuideInst, GuideStep } from '../index'
import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import { defineComponent, h, nextTick, ref, unref } from 'vue'
import { NGuide } from '../index'

function mockTargetRect(el: HTMLElement, rect: Partial<DOMRect> = {}): void {
  vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
    x: 20,
    y: 30,
    top: 30,
    left: 20,
    bottom: 70,
    right: 120,
    width: 100,
    height: 40,
    toJSON: () => '',
    ...rect
  } as DOMRect)
}

function mountGuide({
  steps,
  show = true
}: {
  steps: GuideStep[]
  show?: boolean
}) {
  return mount(NGuide, {
    props: {
      show,
      steps,
      scrollIntoView: false
    },
    attachTo: document.body,
    global: {
      stubs: {
        teleport: false,
        transition: false
      }
    }
  })
}

function clickLastGuideButton(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(
    '.n-guide-panel button'
  )
  buttons[buttons.length - 1].dispatchEvent(
    new MouseEvent('click', { bubbles: true })
  )
}

describe('n-guide', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should work with import on demand', () => {
    mount(NGuide)
  })

  it('should render mask, panel and highlighted target', async () => {
    const target = document.createElement('button')
    target.id = 'guide-target'
    document.body.appendChild(target)
    mockTargetRect(target)

    const wrapper = mountGuide({
      steps: [
        {
          title: 'Target title',
          content: 'Target content',
          target: '#guide-target'
        }
      ]
    })
    await nextTick()

    expect(document.querySelector('.n-guide-mask')).not.toEqual(null)
    expect(document.querySelector('.n-guide-panel')?.textContent).toContain(
      'Target title'
    )
    expect(document.querySelector('.n-guide-panel')?.textContent).toContain(
      'Target content'
    )
    expect(document.querySelector('.n-guide-mask rect[x="20"]')).not.toEqual(
      null
    )
    wrapper.unmount()
  })

  it('should support uncontrolled current and actions', async () => {
    const onNext = vi.fn()
    const onFinish = vi.fn()
    const wrapper = mount(NGuide, {
      props: {
        defaultShow: true,
        scrollIntoView: false,
        steps: [{ title: 'Step 1' }, { title: 'Step 2' }],
        onNext,
        onFinish
      },
      attachTo: document.body,
      global: {
        stubs: {
          teleport: false,
          transition: false
        }
      }
    })

    await nextTick()
    expect(document.querySelector('.n-guide-panel')?.textContent).toContain(
      'Step 1'
    )
    clickLastGuideButton()
    await nextTick()
    expect(onNext).toHaveBeenCalledWith(2)
    expect(document.querySelector('.n-guide-panel')?.textContent).toContain(
      'Step 2'
    )
    clickLastGuideButton()
    await nextTick()
    expect(onFinish).toHaveBeenCalledWith(2)
    expect(document.querySelector('.n-guide-panel')).toEqual(null)
    wrapper.unmount()
  })

  it('should support controlled show and current', async () => {
    const onUpdateShow = vi.fn()
    const onUpdateCurrent = vi.fn()
    const wrapper = mount(
      defineComponent({
        setup() {
          const showRef = ref(true)
          const currentRef = ref(1)
          return () => (
            <NGuide
              show={unref(showRef)}
              current={unref(currentRef)}
              steps={[{ title: 'A' }, { title: 'B' }]}
              scrollIntoView={false}
              onUpdateShow={(value) => {
                showRef.value = value
                onUpdateShow(value)
              }}
              onUpdateCurrent={(value) => {
                currentRef.value = value
                onUpdateCurrent(value)
              }}
            />
          )
        }
      }),
      {
        attachTo: document.body,
        global: {
          stubs: {
            teleport: false,
            transition: false
          }
        }
      }
    )

    await nextTick()
    clickLastGuideButton()
    expect(onUpdateCurrent).toHaveBeenCalledWith(2)
    document
      .querySelector('.n-guide-mask')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(onUpdateShow).toHaveBeenCalledWith(false)
    wrapper.unmount()
  })

  it('should expose methods and sync position', async () => {
    const target = document.createElement('button')
    document.body.appendChild(target)
    mockTargetRect(target, { left: 60, top: 80, width: 30, height: 20 })
    const guideRef = ref<GuideInst | null>(null)
    const wrapper = mount(
      defineComponent({
        setup() {
          return () => (
            <NGuide
              ref={guideRef}
              defaultShow
              scrollIntoView={false}
              steps={[{ title: 'A', target }]}
            />
          )
        }
      }),
      {
        attachTo: document.body,
        global: {
          stubs: {
            teleport: false,
            transition: false
          }
        }
      }
    )
    await nextTick()
    guideRef.value?.syncPosition()
    await nextTick()
    expect(document.querySelector('.n-guide-mask rect[x="60"]')).not.toEqual(
      null
    )
    guideRef.value?.close()
    await nextTick()
    expect(document.querySelector('.n-guide-panel')).toEqual(null)
    wrapper.unmount()
  })

  it('should support custom slots and no mask', async () => {
    const wrapper = mount(NGuide, {
      props: {
        defaultShow: true,
        showMask: false,
        steps: [{ title: 'A' }]
      },
      slots: {
        default: ({ current, total }) => `${current} of ${total}`,
        actions: () => 'custom actions'
      },
      attachTo: document.body,
      global: {
        stubs: {
          teleport: false,
          transition: false
        }
      }
    })
    await nextTick()
    expect(document.querySelector('.n-guide-mask')).toEqual(null)
    expect(document.querySelector('.n-guide-panel')?.textContent).toContain(
      '1 of 1'
    )
    expect(document.querySelector('.n-guide-panel')?.textContent).toContain(
      'custom actions'
    )
    wrapper.unmount()
  })

  it('should support custom target gap', async () => {
    const target = document.createElement('button')
    document.body.appendChild(target)
    mockTargetRect(target, { left: 20, width: 80 })
    const wrapper = mount(NGuide, {
      props: {
        show: true,
        scrollIntoView: false,
        targetGap: 12,
        steps: [{ title: 'Gap', target }]
      },
      attachTo: document.body,
      global: {
        stubs: {
          teleport: false,
          transition: false
        }
      }
    })
    await nextTick()
    expect(document.querySelector('.n-guide-mask rect[x="8"]')).not.toEqual(
      null
    )
    wrapper.unmount()
  })
})
