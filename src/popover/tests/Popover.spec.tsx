import { defineComponent, h, Fragment } from 'vue'
import { mount } from '@vue/test-utils'
import { NPopover } from '../index'
import { createId } from 'seemly'

async function sleep (ms: number): Promise<void> {
  return await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

describe('n-popover', () => {
  it('should work with import on demand', () => {
    mount(NPopover, {
      slots: {
        trigger: () => 'star kirby',
        default: () => <div>star kirby</div>
      }
    })
  })

  const TriggerComponent1 = defineComponent({
    name: 'TriggerComponent1',
    render () {
      return <div>GoGoGo</div>
    }
  })

  ;(['hover', 'click'] as const).forEach((trigger) => {
    // test trigger node
    ;['text', 'div', 'Fragment', TriggerComponent1].forEach((type) => {
      const classNameHash: string =
        trigger + '-' + (typeof type === 'string' ? type : type.name)
      it(`trigger node ${classNameHash}`, async () => {
        // hover trigger, click trigger
        const triggerEvent = trigger === 'hover' ? 'mouseenter' : 'click'
        const hideTriggerEvent = trigger === 'hover' ? 'mouseleave' : 'click'
        // text node, element node
        const triggerNode =
          type === 'text' ? (
            'star kirby'
          ) : type === 'Fragment' ? (
            <>
              {h(
                type as any,
                { class: `star-kirby-${classNameHash}-trigger` },
                {}
              )}
            </>
          ) : (
            h(type as any, { class: `star-kirby-${classNameHash}-trigger` }, {})
          )
        const wrapper = mount(NPopover, {
          attachTo: document.body,
          props: {
            trigger,
            delay: 0,
            duration: 0
          },
          slots: {
            trigger: () => triggerNode,
            default: () => (
              <div class={`star-kirby-${classNameHash}-content`}></div>
            )
          }
        })
        const triggerNodeWrapper =
          type === 'text'
            ? wrapper.find('span')
            : wrapper.find(`.star-kirby-${classNameHash}-trigger`)

        await triggerNodeWrapper.trigger(triggerEvent)
        expect(
          document.querySelector(`.star-kirby-${classNameHash}-content`)
        ).not.toEqual(null)

        await triggerNodeWrapper.trigger(hideTriggerEvent)
        expect(
          document.querySelector(`.star-kirby-${classNameHash}-content`)
        ).toEqual(null)
        wrapper.unmount()
      })
    })
  })

  it('delay & duration', async () => {
    const id = createId()
    const triggerClass = `trigger-${id}`
    const contentClass = `content-${id}`
    const wrapper = mount(NPopover, {
      attachTo: document.body,
      props: {
        trigger: 'hover',
        delay: 100,
        duration: 100
      },
      slots: {
        trigger: () => <div class={triggerClass}></div>,
        default: () => <div class={contentClass}></div>
      }
    })
    await wrapper.find(`.${triggerClass}`).trigger('mouseenter')
    expect(document.querySelector(`.${contentClass}`)).toEqual(null)
    await sleep(150)
    expect(document.querySelector(`.${contentClass}`)).not.toEqual(null)
    await wrapper.find(`.${triggerClass}`).trigger('mouseleave')
    expect(document.querySelector(`.${contentClass}`)).not.toEqual(null)
    await sleep(150)
    expect(document.querySelector(`.${contentClass}`)).toEqual(null)
    wrapper.unmount()
  })
})
