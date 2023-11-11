import {
  nextTick,
  Transition,
  h,
  defineComponent,
  type PropType,
  ref,
  onMounted,
  type ExtractPropTypes,
  inject
} from 'vue'
import { keep } from '../../_utils'
import { notificationProviderInjectionKey } from './context'
import {
  Notification,
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
  /** @deprecated */
  onHide: Function as PropType<() => void>,
  /** @deprecated */
  onAfterShow: Function as PropType<() => void>,
  /** @deprecated */
  onAfterHide: Function as PropType<() => void>
} as const

export type NotificationOptions = Partial<
ExtractPropTypes<typeof notificationEnvOptions>
>

export const NotificationEnvironment = defineComponent({
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
    const {
      wipTransitionCountRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(notificationProviderInjectionKey)!
    const showRef = ref(true)
    let timerId: number | null = null
    function hide (): void {
      showRef.value = false
      if (timerId) {
        window.clearTimeout(timerId)
      }
    }
    function handleBeforeEnter (el: HTMLElement): void {
      wipTransitionCountRef.value++
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
      wipTransitionCountRef.value--
      el.style.height = ''
      el.style.maxHeight = ''
      const { onAfterEnter, onAfterShow } = props
      if (onAfterEnter) onAfterEnter()
      // deprecated
      if (onAfterShow) onAfterShow()
    }
    function handleBeforeLeave (el: HTMLElement): void {
      wipTransitionCountRef.value++
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
      wipTransitionCountRef.value--
      const { onAfterLeave, onInternalAfterLeave, onAfterHide, internalKey } =
        props
      if (onAfterLeave) onAfterLeave()
      onInternalAfterLeave(internalKey)
      // deprecated
      if (onAfterHide) onAfterHide()
    }
    function setHideTimeout (): void {
      const { duration } = props
      if (duration) {
        timerId = window.setTimeout(hide, duration)
      }
    }
    function handleMouseenter (e: MouseEvent): void {
      if (e.currentTarget !== e.target) return
      if (timerId !== null) {
        window.clearTimeout(timerId)
        timerId = null
      }
    }
    function handleMouseleave (e: MouseEvent): void {
      if (e.currentTarget !== e.target) return
      setHideTimeout()
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
      handleBeforeEnter,
      handleMouseenter,
      handleMouseleave
    }
  },
  render () {
    return (
      <Transition
        name="notification-transition"
        appear={true}
        // convert to any since Element is not compatible with HTMLElement
        onBeforeEnter={this.handleBeforeEnter as any}
        onAfterEnter={this.handleAfterEnter as any}
        onBeforeLeave={this.handleBeforeLeave as any}
        onLeave={this.handleLeave as any}
        onAfterLeave={this.handleAfterLeave as any}
      >
        {{
          default: () => {
            return this.show ? (
              <Notification
                {...keep(this.$props, notificationPropKeys)}
                onClose={this.handleClose}
                onMouseenter={
                  this.duration && this.keepAliveOnHover
                    ? this.handleMouseenter
                    : undefined
                }
                onMouseleave={
                  this.duration && this.keepAliveOnHover
                    ? this.handleMouseleave
                    : undefined
                }
              />
            ) : null
          }
        }}
      </Transition>
    )
  }
})
