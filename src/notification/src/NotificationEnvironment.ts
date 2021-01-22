import {
  nextTick,
  Transition,
  h,
  defineComponent,
  PropType,
  ref,
  onMounted
} from 'vue'
import { keep } from '../../_utils'
import NNotification, {
  notificationProps,
  notificationPropKeys
} from './Notification'

export const notificationEnvOptions = {
  ...notificationProps,
  duration: Number,
  onClose: Function as PropType<() => Promise<boolean> | boolean | any>,
  onLeave: Function as PropType<() => void>,
  onAfterEnter: Function as PropType<() => void>,
  onAfterLeave: Function as PropType<() => void>,
  // deprecated
  onHide: Function as PropType<() => void>,
  onAfterShow: Function as PropType<() => void>,
  onAfterHide: Function as PropType<() => void>
} as const

export default defineComponent({
  name: 'NotificationEnvironment',
  props: {
    ...notificationEnvOptions,
    // private
    internalKey: {
      type: String,
      required: true
    },
    onInternalAfterLeave: {
      type: Function as PropType<(key: string) => void>,
      required: true
    }
  },
  setup (props) {
    const showRef = ref(true)
    let timerId: number | null = null
    function hide (): void {
      showRef.value = false
      if (timerId) {
        window.clearTimeout(timerId)
      }
    }
    function handleBeforeEnter (el: HTMLElement): void {
      void nextTick(() => {
        el.style.height = `${el.offsetHeight}px`
        el.style.maxHeight = '0'
        el.style.transition = 'none'
        void el.offsetHeight
        el.style.transition = ''
        el.style.maxHeight = el.style.height
      })
    }
    function handleAfterEnter (el: HTMLElement): void {
      el.style.height = ''
      el.style.maxHeight = ''
      const { onAfterEnter, onAfterShow } = props
      if (onAfterEnter) onAfterEnter()
      // deprecated
      if (onAfterShow) onAfterShow()
    }
    function handleBeforeLeave (el: HTMLElement): void {
      el.style.maxHeight = `${el.offsetHeight}px`
      el.style.height = `${el.offsetHeight}px`
      void el.offsetHeight
    }
    function handleLeave (el: HTMLElement): void {
      const { onHide } = props
      if (onHide) onHide()
      el.style.maxHeight = '0'
      void el.offsetHeight
    }
    function handleAfterLeave (): void {
      const {
        onAfterLeave,
        onInternalAfterLeave,
        onAfterHide,
        internalKey
      } = props
      if (onAfterLeave) onAfterLeave()
      onInternalAfterLeave(internalKey)
      // deprecated
      if (onAfterHide) onAfterHide()
    }
    function handleClose (): void {
      const { onClose } = props
      if (onClose) {
        void Promise.resolve(onClose()).then((feedback) => {
          if (feedback === false) return
          hide()
        })
      } else {
        hide()
      }
    }
    onMounted(() => {
      if (props.duration) {
        timerId = window.setTimeout(hide, props.duration)
      }
    })
    return {
      show: showRef,
      hide,
      handleClose,
      handleAfterLeave,
      handleLeave,
      handleBeforeLeave,
      handleAfterEnter,
      handleBeforeEnter
    }
  },
  render () {
    return h(
      Transition,
      {
        name: 'n-notification-transition',
        appear: true,
        // convert to any since Element is not compitable with HTMLElement
        onBeforeEnter: this.handleBeforeEnter as any,
        onAfterEnter: this.handleAfterEnter as any,
        onBeforeLeave: this.handleBeforeLeave as any,
        onLeave: this.handleLeave as any,
        onAfterLeave: this.handleAfterLeave as any
      },
      {
        default: () => {
          const props = keep(this.$props, notificationPropKeys)
          return this.show
            ? h(NNotification, {
              ...props,
              onClose: this.handleClose
            })
            : null
        }
      }
    )
  }
})
