import { defineComponent, h, Fragment } from 'vue'
import { mount } from '@vue/test-utils'
import { NPopover } from '../index'

async function sleep (): Promise<void> {
  return await new Promise((resolve) => {
    setTimeout(resolve, 300)
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
    ;['text', 'div', 'Fragment', TriggerComponent1].forEach((type) => {
      const classNameHash: string =
        trigger + '-' + (typeof type === 'string' ? type : type.name)
      it(`trigger ${classNameHash}`, async () => {
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
            trigger
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
        await sleep()
        expect(
          document.querySelector(`.star-kirby-${classNameHash}-content`)
        ).not.toEqual(null)

        await triggerNodeWrapper.trigger(hideTriggerEvent)
        await sleep()
        expect(
          document.querySelector(`.star-kirby-${classNameHash}-content`)
        ).toEqual(null)
        wrapper.unmount()
      })
    })
  })
})
