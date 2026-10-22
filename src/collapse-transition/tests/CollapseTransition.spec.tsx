import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import { NCollapseTransition } from '../index'

describe('n-collapse', () => {
  it('should work with import on demand', () => {
    mount(NCollapseTransition)
  })

  it('should work with `show` prop', async () => {
    const wrapper = mount(NCollapseTransition)
    expect(wrapper.find('.n-collapse-transition').exists()).toBe(true)

    await wrapper.setProps({ show: false })
    expect(wrapper.find('.n-collapse-transition').exists()).toBe(false)
    wrapper.unmount()
  })

  it('should work with `default` slot', async () => {
    const wrapper = mount(NCollapseTransition, {
      slots: { default: () => 'test' }
    })
    expect(wrapper.find('.n-collapse-transition').exists()).toBe(true)
    expect(wrapper.find('.n-collapse-transition').text()).toBe('test')
    wrapper.unmount()
  })

  describe.each(['if', 'show'] as const)('display-directive="%s"', (displayDirective) => {
    it.each([false, true])('should update slot content (lazy: %s)', async (lazy) => {
      const value = ref('')
      const wrapper = mount(defineComponent({
        render() {
          const content = h('span', value.value)
          return h(NCollapseTransition, { displayDirective }, {
            default: lazy ? () => h('span', value.value) : () => content
          })
        }
      }))

      try {
        for (const text of ['loaded', 'replaced', '', 'reloaded']) {
          value.value = text
          await nextTick()
          expect(wrapper.find('span').text()).toBe(text)
        }
      }
      finally {
        wrapper.unmount()
      }
    })

    it('should preserve child state during slot updates and respect display-directive on reopen', async () => {
      const value = ref('initial')
      const show = ref(true)
      const Child = defineComponent({
        props: { text: String },
        setup(props) {
          const draft = ref('')
          return () => h('div', [
            h('span', props.text),
            h('input', {
              value: draft.value,
              onInput: (event: Event) => {
                draft.value = (event.target as HTMLInputElement).value
              }
            })
          ])
        }
      })
      const wrapper = mount(defineComponent({
        render() {
          const content = h(Child, { text: value.value })
          return h(NCollapseTransition, { show: show.value, displayDirective }, {
            default: () => content
          })
        }
      }))

      try {
        await wrapper.find('input').setValue('draft')
        value.value = 'updated'
        await nextTick()
        expect(wrapper.find('span').text()).toBe('updated')
        expect(wrapper.find('input').element.value).toBe('draft')

        show.value = false
        await nextTick()
        expect(wrapper.find('.n-collapse-transition').exists()).toBe(displayDirective === 'show')
        value.value = 'updated while hidden'
        await nextTick()
        show.value = true
        await nextTick()
        expect(wrapper.find('span').text()).toBe('updated while hidden')
        expect(wrapper.find('input').element.value).toBe(displayDirective === 'show' ? 'draft' : '')
      }
      finally {
        wrapper.unmount()
      }
    })
  })
})
