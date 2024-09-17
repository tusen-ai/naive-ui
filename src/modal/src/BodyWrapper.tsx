import {
  type ComponentPublicInstance,
  type DirectiveArguments,
  type PropType,
  Transition,
  type VNode,
  type VNodeChild,
  cloneVNode,
  computed,
  defineComponent,
  h,
  inject,
  mergeProps,
  nextTick,
  provide,
  ref,
  toRef,
  vShow,
  watch,
  withDirectives
} from 'vue'
import { clickoutside } from 'vdirs'
import { VFocusTrap } from 'vueuc'
import { dialogPropKeys } from '../../dialog/src/dialogProps'
import { NDialog } from '../../dialog/src/Dialog'
import { cardBasePropKeys } from '../../card/src/Card'
import { drawerBodyInjectionKey } from '../../drawer/src/interface'
import { popoverBodyInjectionKey } from '../../popover/src/interface'
import { NScrollbar, type ScrollbarInst } from '../../_internal'
import { NCard } from '../../card'
import { getFirstSlotVNode, keep, useLockHtmlScroll, warn } from '../../_utils'
import { modalBodyInjectionKey, modalInjectionKey } from './interface'
import { presetProps } from './presetProps'

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
    trapFocus: {
      type: Boolean,
      default: true
    },
    autoFocus: {
      type: Boolean,
      default: true
    },
    blockScroll: Boolean,
    ...presetProps,
    renderMask: Function as PropType<() => VNodeChild>,
    // events
    onClickoutside: Function as PropType<(e: MouseEvent) => void>,
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
    },
    onAfterEnter: Function as PropType<() => void>,
    onEsc: Function as PropType<(e: KeyboardEvent) => void>
  },
  setup(props) {
    const bodyRef = ref<HTMLElement | ComponentPublicInstance | null>(null)
    const scrollbarRef = ref<ScrollbarInst | null>(null)
    const displayedRef = ref(props.show)
    const transformOriginXRef = ref<number | null>(null)
    const transformOriginYRef = ref<number | null>(null)
    watch(toRef(props, 'show'), (value) => {
      if (value)
        displayedRef.value = true
    })
    useLockHtmlScroll(computed(() => props.blockScroll && displayedRef.value))
    const NModal = inject(modalInjectionKey)!
    function styleTransformOrigin(): string {
      if (NModal.transformOriginRef.value === 'center') {
        return ''
      }
      const { value: transformOriginX } = transformOriginXRef
      const { value: transformOriginY } = transformOriginYRef
      if (transformOriginX === null || transformOriginY === null) {
        return ''
      }
      else if (scrollbarRef.value) {
        const scrollTop = scrollbarRef.value.containerScrollTop
        return `${transformOriginX}px ${transformOriginY + scrollTop}px`
      }
      return ''
    }
    function syncTransformOrigin(el: HTMLElement): void {
      if (NModal.transformOriginRef.value === 'center') {
        return
      }
      const mousePosition = NModal.getMousePosition()
      if (!mousePosition) {
        return
      }
      if (!scrollbarRef.value)
        return
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
    function handleEnter(el: HTMLElement): void {
      void nextTick(() => {
        syncTransformOrigin(el)
      })
    }
    function handleBeforeLeave(el: HTMLElement): void {
      el.style.transformOrigin = styleTransformOrigin()
      props.onBeforeLeave()
    }
    function handleAfterLeave(): void {
      displayedRef.value = false
      transformOriginXRef.value = null
      transformOriginYRef.value = null
      props.onAfterLeave()
    }
    function handleCloseClick(): void {
      const { onClose } = props
      if (onClose) {
        onClose()
      }
    }
    function handleNegativeClick(): void {
      props.onNegativeClick()
    }
    function handlePositiveClick(): void {
      props.onPositiveClick()
    }
    const childNodeRef = ref<VNode | null>(null)
    watch(childNodeRef, (node) => {
      if (node) {
        void nextTick(() => {
          const el = node.el as HTMLElement | null
          if (el && bodyRef.value !== el) {
            bodyRef.value = el
          }
        })
      }
    })
    provide(modalBodyInjectionKey, bodyRef)
    provide(drawerBodyInjectionKey, null)
    provide(popoverBodyInjectionKey, null)
    return {
      mergedTheme: NModal.mergedThemeRef,
      appear: NModal.appearRef,
      isMounted: NModal.isMountedRef,
      mergedClsPrefix: NModal.mergedClsPrefixRef,
      bodyRef,
      scrollbarRef,
      displayed: displayedRef,
      childNodeRef,
      handlePositiveClick,
      handleNegativeClick,
      handleCloseClick,
      handleAfterLeave,
      handleBeforeLeave,
      handleEnter
    }
  },
  render() {
    const {
      $slots,
      $attrs,
      handleEnter,
      handleAfterLeave,
      handleBeforeLeave,
      preset,
      mergedClsPrefix
    } = this
    let childNode: VNode | null = null
    if (!preset) {
      childNode = getFirstSlotVNode($slots)
      if (!childNode) {
        warn('modal', 'default slot is empty')
        return
      }
      childNode = cloneVNode(childNode)
      childNode.props = mergeProps(
        {
          class: `${mergedClsPrefix}-modal`
        },
        $attrs,
        childNode.props || {}
      )
    }
    return this.displayDirective === 'show' || this.displayed || this.show
      ? withDirectives(
        <div role="none" class={`${mergedClsPrefix}-modal-body-wrapper`}>
          <NScrollbar
            ref="scrollbarRef"
            theme={this.mergedTheme.peers.Scrollbar}
            themeOverrides={this.mergedTheme.peerOverrides.Scrollbar}
            contentClass={`${mergedClsPrefix}-modal-scroll-content`}
          >
            {{
              default: () => [
                this.renderMask?.(),
                <VFocusTrap
                  disabled={!this.trapFocus}
                  active={this.show}
                  onEsc={this.onEsc}
                  autoFocus={this.autoFocus}
                >
                  {{
                    default: () => (
                      <Transition
                        name="fade-in-scale-up-transition"
                        appear={this.appear ?? this.isMounted}
                        onEnter={handleEnter as any}
                        onAfterEnter={this.onAfterEnter}
                        onAfterLeave={handleAfterLeave}
                        onBeforeLeave={handleBeforeLeave as any}
                      >
                        {{
                          default: () => {
                            const dirs: DirectiveArguments = [
                              [vShow, this.show]
                            ]
                            const { onClickoutside } = this
                            if (onClickoutside) {
                              dirs.push([
                                clickoutside,
                                this.onClickoutside,
                                undefined as unknown as string,
                                { capture: true }
                              ])
                            }
                            return withDirectives(
                              (this.preset === 'confirm'
                                || this.preset === 'dialog' ? (
                                    <NDialog
                                      {...this.$attrs}
                                      class={[
                                        `${mergedClsPrefix}-modal`,
                                        this.$attrs.class
                                      ]}
                                      ref="bodyRef"
                                      theme={this.mergedTheme.peers.Dialog}
                                      themeOverrides={
                                        this.mergedTheme.peerOverrides.Dialog
                                      }
                                      {...keep(this.$props, dialogPropKeys)}
                                      aria-modal="true"
                                    >
                                      {$slots}
                                    </NDialog>
                                  ) : this.preset === 'card' ? (
                                    <NCard
                                      {...this.$attrs}
                                      ref="bodyRef"
                                      class={[
                                        `${mergedClsPrefix}-modal`,
                                        this.$attrs.class
                                      ]}
                                      theme={this.mergedTheme.peers.Card}
                                      themeOverrides={
                                        this.mergedTheme.peerOverrides.Card
                                      }
                                      {...keep(this.$props, cardBasePropKeys)}
                                      aria-modal="true"
                                      role="dialog"
                                    >
                                      {$slots}
                                    </NCard>
                                  ) : (
                                    (this.childNodeRef = childNode)
                                  )) as any,
                              dirs
                            )
                          }
                        }}
                      </Transition>
                    )
                  }}
                </VFocusTrap>
              ]
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
