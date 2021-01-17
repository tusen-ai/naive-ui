import { h, Transition, TransitionGroup, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FadeInExpandTransition',
  props: {
    appear: {
      type: Boolean,
      default: false
    },
    group: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String as PropType<'in-out' | 'out-in' | 'default' | undefined>,
      default: undefined
    },
    onAfterLeave: {
      type: Function,
      default: undefined
    },
    width: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { slots }) {
    function handleBeforeLeave (el: HTMLElement): void {
      if (props.width) {
        el.style.maxWidth = `${el.offsetWidth}px`
      } else {
        el.style.maxHeight = `${el.offsetHeight}px`
      }
      void el.offsetWidth
    }
    function handleLeave (el: HTMLElement): void {
      if (props.width) {
        el.style.maxWidth = '0'
      } else {
        el.style.maxHeight = '0'
      }
      void el.offsetWidth
    }
    function handleAfterLeave (el: HTMLElement): void {
      if (props.width) {
        el.style.maxWidth = ''
      } else {
        el.style.maxHeight = ''
      }
      const { onAfterLeave } = props
      if (onAfterLeave) onAfterLeave()
    }
    function handleEnter (el: HTMLElement): void {
      el.style.transition = 'none'
      if (props.width) {
        const memorizedWidth = el.offsetWidth
        el.style.maxWidth = '0'
        void el.offsetWidth
        el.style.transition = ''
        el.style.maxWidth = `${memorizedWidth}px`
      } else {
        const memorizedHeight = el.offsetHeight
        el.style.maxHeight = '0'
        void el.offsetWidth
        el.style.transition = ''
        el.style.maxHeight = `${memorizedHeight}px`
      }
      void el.offsetWidth
    }
    function handleAfterEnter (el: HTMLElement): void {
      if (props.width) {
        el.style.maxWidth = ''
      } else {
        el.style.maxHeight = ''
      }
    }
    return () => {
      const type = props.group ? TransitionGroup : Transition
      return h(
        type as any,
        {
          name: props.width
            ? 'n-fade-in-width-expand-transition'
            : 'n-fade-in-height-expand-transition',
          mode: props.mode,
          appear: props.appear,
          onEnter: handleEnter,
          onAfterEnter: handleAfterEnter,
          onBeforeLeave: handleBeforeLeave,
          onLeave: handleLeave,
          onAfterLeave: handleAfterLeave
        },
        slots
      )
    }
  }
})
