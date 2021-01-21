import {
  h,
  nextTick,
  reactive,
  toRef,
  watch,
  ref,
  inject,
  defineComponent,
  PropType,
  provide,
  withDirectives,
  vShow,
  Transition,
  VNode,
  renderSlot
} from 'vue'
import { clickoutside } from 'vdirs'
import { NScrollbar, ScrollbarRef } from '../../scrollbar'
import { NDialog, dialogPropKeys } from '../../dialog'
import { NCard, cardPropKeys } from '../../card'
import { keep } from '../../_utils'
import { presetProps } from './presetProps'
import type { ModalInjection } from './Modal'

interface ModalBodyInjection {
  bodyRef: HTMLElement | null
}

export default defineComponent({
  name: 'ModalBody',
  inheritAttrs: false,
  props: {
    show: {
      type: Boolean,
      required: true
    },
    preset: String as PropType<'confirm' | 'dialog' | 'card'>,
    displayDirective: {
      type: String as PropType<'if' | 'show'>,
      required: true
    },
    ...presetProps,
    // events
    onClickoutside: {
      type: Function,
      required: true
    },
    onBeforeLeave: {
      type: Function,
      required: true
    },
    onAfterLeave: {
      type: Function,
      required: true
    },
    onPositiveClick: {
      type: Function,
      required: true
    },
    onNegativeClick: {
      type: Function,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const bodyRef = ref<HTMLElement | null>(null)
    const scrollbarRef = ref<ScrollbarRef | null>(null)
    const displayedRef = ref(props.show)
    const transformOriginXRef = ref<number | null>(null)
    const transformOriginYRef = ref<number | null>(null)
    watch(toRef(props, 'show'), (value) => {
      if (value) displayedRef.value = true
    })
    const NModal = inject<ModalInjection>('NModal') as ModalInjection
    function styleTransformOrigin (): string {
      const { value: transformOriginX } = transformOriginXRef
      const { value: transformOriginY } = transformOriginYRef
      if (transformOriginX === null || transformOriginY === null) {
        return ''
      } else if (scrollbarRef.value) {
        const scrollTop = scrollbarRef.value.containerScrollTop
        return `${transformOriginX}px ${transformOriginY + scrollTop}px`
      }
      return ''
    }
    function syncTransformOrigin (el: HTMLElement): void {
      const { mousePosition } = NModal
      if (!mousePosition) {
        return
      }
      if (!scrollbarRef.value) return
      const scrollTop = scrollbarRef.value.containerScrollTop
      const { offsetLeft, offsetTop } = el
      if (mousePosition) {
        const top = mousePosition.y
        const left = mousePosition.x
        transformOriginXRef.value = -(offsetLeft - left)
        transformOriginYRef.value = -(offsetTop - top - scrollTop)
      }
      el.style.transformOrigin = styleTransformOrigin()
    }
    function handleEnter (el: HTMLElement): void {
      void nextTick(() => {
        syncTransformOrigin(el)
      })
    }
    function handleBeforeLeave (el: HTMLElement): void {
      el.style.transformOrigin = styleTransformOrigin()
      props.onBeforeLeave()
    }
    function handleAfterLeave (): void {
      displayedRef.value = false
      transformOriginXRef.value = null
      transformOriginYRef.value = null
      props.onAfterLeave()
    }
    function handleCloseClick (): void {
      const { onClose } = props
      if (onClose) {
        onClose()
      }
    }
    function handleNegativeClick (): void {
      props.onNegativeClick()
    }
    function handlePositiveClick (): void {
      props.onPositiveClick()
    }
    function handleClickOutside (e: MouseEvent): void {
      props.onClickoutside(e)
    }
    provide<ModalBodyInjection>(
      'NModalBody',
      reactive({
        bodyRef
      })
    )
    provide('NDrawerBody', null)
    return {
      NModal,
      bodyRef,
      scrollbarRef,
      displayed: displayedRef,
      handleClickOutside,
      handlePositiveClick,
      handleNegativeClick,
      handleCloseClick,
      handleAfterLeave,
      handleBeforeLeave,
      handleEnter
    }
  },
  render () {
    const {
      NModal,
      displayed,
      displayDirective,
      show,
      handleEnter,
      handleAfterLeave,
      handleBeforeLeave,
      handleClickOutside,
      preset,
      $slots
    } = this
    return displayDirective === 'show' || displayed || show
      ? withDirectives(
        (
          <div class="n-modal-body-wrapper">
            <NScrollbar
              ref="scrollbarRef"
              unstableTheme={NModal.mergedTheme.peers.Scrollbar}
              unstableThemeOverrides={NModal.mergedTheme.overrides.Scrollbar}
              content-class="n-modal-scroll-content"
            >
              {{
                default: () => (
                  <Transition
                    name="n-fade-in-scale-up-transition"
                    appear={NModal.isMounted}
                    onEnter={handleEnter as any}
                    onAfterLeave={handleAfterLeave}
                    onBeforeLeave={handleBeforeLeave as any}
                  >
                    {{
                      default: () =>
                        withDirectives(
                          (
                            <div ref="bodyRef" class="n-modal">
                              {preset === 'confirm' || preset === 'dialog' ? (
                                <NDialog
                                  {...this.$attrs}
                                  unstableTheme={
                                    NModal.mergedTheme.peers.Dialog
                                  }
                                  unstableThemeOverrides={
                                    NModal.mergedTheme.overrides.Dialog
                                  }
                                  {...keep(this.$props, dialogPropKeys)}
                                >
                                  {$slots}
                                </NDialog>
                              ) : preset === 'card' ? (
                                <NCard
                                  {...this.$attrs}
                                  unstableTheme={
                                    NModal.mergedTheme.peers.Card
                                  }
                                  unstableThemeOverrides={
                                    NModal.mergedTheme.overrides.Card
                                  }
                                  {...keep(this.$props, cardPropKeys)}
                                >
                                  {$slots}
                                </NCard>
                              ) : (
                                renderSlot($slots, 'default')
                              )}
                            </div>
                          ) as any,
                          [
                            [vShow, show],
                            [clickoutside, handleClickOutside]
                          ]
                        )
                    }}
                  </Transition>
                )
              }}
            </NScrollbar>
          </div>
        ) as VNode,
        [[vShow, displayDirective === 'if' || displayed || show]]
      )
      : null
  }
})
