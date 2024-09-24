import {
  type CSSProperties,
  type DirectiveArguments,
  type PropType,
  Transition,
  computed,
  defineComponent,
  h,
  inject,
  mergeProps,
  onBeforeUnmount,
  provide,
  ref,
  vShow,
  watch,
  watchEffect,
  withDirectives
} from 'vue'
import { VFocusTrap } from 'vueuc'
import { clickoutside } from 'vdirs'
import { useConfig, useRtl } from '../../_mixins'
import { popoverBodyInjectionKey } from '../../popover/src/interface'
import { modalBodyInjectionKey } from '../../modal/src/interface'
import { NScrollbar } from '../../_internal'
import type { ScrollbarProps } from '../../_internal'
import { useLockHtmlScroll } from '../../_utils'
import { drawerBodyInjectionKey, drawerInjectionKey } from './interface'

export type Placement = 'left' | 'right' | 'top' | 'bottom'

export default defineComponent({
  name: 'NDrawerContent',
  inheritAttrs: false,
  props: {
    blockScroll: Boolean,
    show: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined
    },
    displayDirective: {
      type: String as PropType<'if' | 'show'>,
      required: true
    },
    placement: {
      type: String as PropType<Placement>,
      required: true
    },
    contentClass: String,
    contentStyle: [Object, String] as PropType<string | CSSProperties>,
    nativeScrollbar: {
      type: Boolean,
      required: true
    },
    scrollbarProps: Object as PropType<ScrollbarProps>,
    trapFocus: {
      type: Boolean,
      default: true
    },
    autoFocus: {
      type: Boolean,
      default: true
    },
    showMask: {
      type: [Boolean, String] as PropType<boolean | 'transparent'>,
      required: true
    },
    maxWidth: Number,
    maxHeight: Number,
    minWidth: Number,
    minHeight: Number,
    resizable: Boolean,
    onClickoutside: Function as PropType<(e: MouseEvent) => void>,
    onAfterLeave: Function as PropType<() => void>,
    onAfterEnter: Function as PropType<() => void>,
    onEsc: Function as PropType<(e: KeyboardEvent) => void>
  },
  setup(props) {
    const displayedRef = ref(!!props.show)
    const bodyRef = ref<HTMLElement | null>(null) // used for detached content
    const NDrawer = inject(drawerInjectionKey)!

    let startPosition = 0
    let memoizedBodyStyleCursor = ''
    let hoverTimerId: number | null = null
    const isHoverOnResizeTriggerRef = ref(false)
    const isDraggingRef = ref(false)

    const isVertical = computed<boolean>(() => {
      return props.placement === 'top' || props.placement === 'bottom'
    })
    const { mergedClsPrefixRef, mergedRtlRef } = useConfig(props)

    const rtlEnabledRef = useRtl('Drawer', mergedRtlRef, mergedClsPrefixRef)

    const handleBodyMouseleave = handleBodyMouseup

    const handleMousedownResizeTrigger = (e: MouseEvent): void => {
      isDraggingRef.value = true
      startPosition = isVertical.value ? e.clientY : e.clientX
      memoizedBodyStyleCursor = document.body.style.cursor
      document.body.style.cursor = isVertical.value ? 'ns-resize' : 'ew-resize'
      document.body.addEventListener('mousemove', handleBodyMousemove)
      document.body.addEventListener('mouseleave', handleBodyMouseleave)
      document.body.addEventListener('mouseup', handleBodyMouseup)
    }

    const handleMouseenterResizeTrigger = (): void => {
      if (hoverTimerId !== null) {
        window.clearTimeout(hoverTimerId)
        hoverTimerId = null
      }
      if (isDraggingRef.value) {
        isHoverOnResizeTriggerRef.value = true
      }
      else {
        hoverTimerId = window.setTimeout(() => {
          isHoverOnResizeTriggerRef.value = true
        }, 300)
      }
    }

    const handleMouseleaveResizeTrigger = (): void => {
      if (hoverTimerId !== null) {
        window.clearTimeout(hoverTimerId)
        hoverTimerId = null
      }
      isHoverOnResizeTriggerRef.value = false
    }

    const { doUpdateHeight, doUpdateWidth } = NDrawer

    const regulateWidth = (size: number): number => {
      const { maxWidth } = props
      if (maxWidth && size > maxWidth)
        return maxWidth
      const { minWidth } = props
      if (minWidth && size < minWidth)
        return minWidth
      return size
    }

    const regulateHeight = (size: number): number => {
      const { maxHeight } = props
      if (maxHeight && size > maxHeight)
        return maxHeight
      const { minHeight } = props
      if (minHeight && size < minHeight)
        return minHeight
      return size
    }

    function handleBodyMousemove(e: MouseEvent): void {
      if (isDraggingRef.value) {
        if (isVertical.value) {
          let height = bodyRef.value?.offsetHeight || 0
          const increment = startPosition - e.clientY
          height += props.placement === 'bottom' ? increment : -increment
          height = regulateHeight(height)
          doUpdateHeight(height)
          startPosition = e.clientY
        }
        else {
          let width = bodyRef.value?.offsetWidth || 0
          const increment = startPosition - e.clientX
          width += props.placement === 'right' ? increment : -increment
          width = regulateWidth(width)
          doUpdateWidth(width)
          startPosition = e.clientX
        }
      }
    }

    function handleBodyMouseup(): void {
      if (isDraggingRef.value) {
        startPosition = 0
        isDraggingRef.value = false
        document.body.style.cursor = memoizedBodyStyleCursor
        document.body.removeEventListener('mousemove', handleBodyMousemove)
        document.body.removeEventListener('mouseup', handleBodyMouseup)
        document.body.removeEventListener('mouseleave', handleBodyMouseleave)
      }
    }

    watchEffect(() => {
      if (props.show)
        displayedRef.value = true
    })
    watch(
      () => props.show,
      (value) => {
        if (!value) {
          handleBodyMouseup()
        }
      }
    )
    onBeforeUnmount(() => {
      handleBodyMouseup()
    })
    const bodyDirectivesRef = computed<DirectiveArguments>(() => {
      const { show } = props
      const directives: DirectiveArguments = [[vShow, show]]
      if (!props.showMask) {
        directives.push([
          clickoutside,
          props.onClickoutside,
          undefined as unknown as string,
          { capture: true }
        ])
      }
      return directives
    })
    function handleAfterLeave(): void {
      displayedRef.value = false
      props.onAfterLeave?.()
    }
    useLockHtmlScroll(computed(() => props.blockScroll && displayedRef.value))
    provide(drawerBodyInjectionKey, bodyRef)
    provide(popoverBodyInjectionKey, null)
    provide(modalBodyInjectionKey, null)
    return {
      bodyRef,
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: NDrawer.mergedClsPrefixRef,
      isMounted: NDrawer.isMountedRef,
      mergedTheme: NDrawer.mergedThemeRef,
      displayed: displayedRef,
      transitionName: computed(() => {
        return {
          right: 'slide-in-from-right-transition',
          left: 'slide-in-from-left-transition',
          top: 'slide-in-from-top-transition',
          bottom: 'slide-in-from-bottom-transition'
        }[props.placement]
      }),
      handleAfterLeave,
      bodyDirectives: bodyDirectivesRef,
      handleMousedownResizeTrigger,
      handleMouseenterResizeTrigger,
      handleMouseleaveResizeTrigger,
      isDragging: isDraggingRef,
      isHoverOnResizeTrigger: isHoverOnResizeTriggerRef
    }
  },
  render() {
    const { $slots, mergedClsPrefix } = this
    return this.displayDirective === 'show' || this.displayed || this.show
      ? withDirectives(
        /* Keep the wrapper dom. Make sure the drawer has a host.
          Nor the detached content will disappear without transition */
        <div role="none">
          <VFocusTrap
            disabled={!this.showMask || !this.trapFocus}
            active={this.show}
            autoFocus={this.autoFocus}
            onEsc={this.onEsc}
          >
            {{
              default: () => (
                <Transition
                  name={this.transitionName}
                  appear={this.isMounted}
                  onAfterEnter={this.onAfterEnter}
                  onAfterLeave={this.handleAfterLeave}
                >
                  {{
                    default: () =>
                      withDirectives(
                        h(
                          'div',
                          mergeProps(this.$attrs, {
                            role: 'dialog',
                            ref: 'bodyRef',
                            'aria-modal': 'true',
                            class: [
                              `${mergedClsPrefix}-drawer`,
                              this.rtlEnabled
                              && `${mergedClsPrefix}-drawer--rtl`,
                              `${mergedClsPrefix}-drawer--${this.placement}-placement`,
                              /**
                               * When the mouse is pressed to resize the drawer,
                               * disable text selection
                               */
                              this.isDragging
                              && `${mergedClsPrefix}-drawer--unselectable`,
                              this.nativeScrollbar
                              && `${mergedClsPrefix}-drawer--native-scrollbar`
                            ]
                          }),
                          [
                            this.resizable ? (
                              <div
                                class={[
                                  `${mergedClsPrefix}-drawer__resize-trigger`,
                                  (this.isDragging
                                    || this.isHoverOnResizeTrigger)
                                    && `${mergedClsPrefix}-drawer__resize-trigger--hover`
                                ]}
                                onMouseenter={
                                  this.handleMouseenterResizeTrigger
                                }
                                onMouseleave={
                                  this.handleMouseleaveResizeTrigger
                                }
                                onMousedown={
                                  this.handleMousedownResizeTrigger
                                }
                              />
                            ) : null,
                            this.nativeScrollbar ? (
                              <div
                                class={[
                                  `${mergedClsPrefix}-drawer-content-wrapper`,
                                  this.contentClass
                                ]}
                                style={this.contentStyle}
                                role="none"
                              >
                                {$slots}
                              </div>
                            ) : (
                              <NScrollbar
                                {...this.scrollbarProps}
                                contentStyle={this.contentStyle}
                                contentClass={[
                                  `${mergedClsPrefix}-drawer-content-wrapper`,
                                  this.contentClass
                                ]}
                                theme={this.mergedTheme.peers.Scrollbar}
                                themeOverrides={
                                  this.mergedTheme.peerOverrides.Scrollbar
                                }
                              >
                                {$slots}
                              </NScrollbar>
                            )
                          ]
                        ),
                        this.bodyDirectives
                      )
                  }}
                </Transition>
              )
            }}
          </VFocusTrap>
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
