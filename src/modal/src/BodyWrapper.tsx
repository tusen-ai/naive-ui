import {
  h,
  nextTick,
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
  ComponentPublicInstance,
  mergeProps
} from 'vue'
import { clickoutside } from 'vdirs'
import { NScrollbar, ScrollbarRef } from '../../scrollbar'
import { NDialog, dialogPropKeys } from '../../dialog'
import { NCard, cardPropKeys } from '../../card'
import { getFirstSlotVNode, keep, warn } from '../../_utils'
import { presetProps } from './presetProps'
import type { ModalInjection } from './Modal'
import { drawerBodyInjectionKey } from '../../drawer/src/interface'
import { popoverBodyInjectionKey } from '../../popover/src/interface'
import { modalBodyInjectionKey } from './interface'

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
    const bodyRef = ref<HTMLElement | ComponentPublicInstance | null>(null)
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
      const mousePosition = NModal.getMousePosition()
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
    provide(modalBodyInjectionKey, bodyRef)
    provide(drawerBodyInjectionKey, null)
    provide(popoverBodyInjectionKey, null)
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
      $slots,
      $attrs,
      handleEnter,
      handleAfterLeave,
      handleBeforeLeave,
      handleClickOutside,
      preset
    } = this
    let childNode: VNode | null = null
    if (!preset) {
      childNode = getFirstSlotVNode($slots)
      if (!childNode) {
        warn('modal', 'default slot is empty')
        return
      }
      childNode.props = mergeProps(
        {
          class: 'n-modal'
        },
        $attrs,
        childNode.props || {}
      )
    }
    return this.displayDirective === 'show' || this.displayed || this.show
      ? withDirectives(
        <div class="n-modal-body-wrapper">
          <NScrollbar
            ref="scrollbarRef"
            theme={NModal.mergedTheme.peers.Scrollbar}
            themeOverrides={NModal.mergedTheme.peerOverrides.Scrollbar}
            contentClass="n-modal-scroll-content"
          >
            {{
              default: () => (
                <Transition
                  name="n-fade-in-scale-up-transition"
                  appear={NModal.appear ?? NModal.isMounted}
                  onEnter={handleEnter as any}
                  onAfterLeave={handleAfterLeave}
                  onBeforeLeave={handleBeforeLeave as any}
                >
                  {{
                    default: () =>
                      withDirectives(
                        (this.preset === 'confirm' ||
                          this.preset === 'dialog' ? (
                            <NDialog
                              {...this.$attrs}
                              class="n-modal"
                              ref="bodyRef"
                              theme={NModal.mergedTheme.peers.Dialog}
                              themeOverrides={
                                NModal.mergedTheme.peerOverrides.Dialog
                              }
                              {...keep(this.$props, dialogPropKeys)}
                            >
                              {$slots}
                            </NDialog>
                          ) : this.preset === 'card' ? (
                            <NCard
                              {...this.$attrs}
                              ref="bodyRef"
                              class="n-modal"
                              theme={NModal.mergedTheme.peers.Card}
                              themeOverrides={
                                NModal.mergedTheme.peerOverrides.Card
                              }
                              {...keep(this.$props, cardPropKeys)}
                            >
                              {$slots}
                            </NCard>
                          ) : (
                            childNode
                          )) as any,
                        [
                          [vShow, this.show],
                          [clickoutside, handleClickOutside]
                        ]
                      )
                  }}
                </Transition>
              )
            }}
          </NScrollbar>
        </div>,
        [
          [
            vShow,
            this.displayDirective === 'if' || this.displayed || this.show
          ]
        ]
      )
      : null
  }
})
