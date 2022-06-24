import {
  h,
  Transition,
  defineComponent,
  ref,
  computed,
  watchEffect,
  provide,
  inject,
  PropType,
  withDirectives,
  vShow,
  mergeProps,
  CSSProperties,
  DirectiveArguments
} from 'vue'
import { VFocusTrap } from 'vueuc'
import { clickoutside } from 'vdirs'
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
      type: Boolean as PropType<boolean | 'transparent'>,
      required: true
    },
    adjustable: {
      type: Boolean,
      default: true
    },
    onClickoutside: Function as PropType<(e: MouseEvent) => void>,
    onAfterLeave: Function as PropType<() => void>,
    onAfterEnter: Function as PropType<() => void>,
    onEsc: Function as PropType<(e: KeyboardEvent) => void>
  },
  setup (props) {
    const displayedRef = ref(!!props.show)
    const bodyRef = ref<HTMLElement | null>(null) // used for detached content
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NDrawer = inject(drawerInjectionKey)!

    let startPos = 0
    let cacheCusor = ''
    let hoverTimer: ReturnType<typeof setTimeout>
    const isMousedown = ref(false)
    const isHover = ref(false)

    const isVertical = computed<boolean>(() => {
      return props.placement === 'top' || props.placement === 'bottom'
    })

    const removePx = (str: string): number => Number(str.replace('px', ''))

    const mousedownHandler = (e: MouseEvent): void => {
      isMousedown.value = true
      startPos = isVertical.value ? e.clientY : e.clientX
      cacheCusor = document.body.style.cursor
      document.body.style.cursor = isVertical.value ? 'ns-resize' : 'ew-resize'
      document.body.addEventListener('mousemove', mousemoveHandler)
      document.body.addEventListener('mouseup', mouseupHandler)
    }

    const mouseenterHandler = (e: MouseEvent): void => {
      if (isMousedown.value) return
      hoverTimer = setTimeout(() => {
        isHover.value = true
      }, 300)
    }

    const mouseleaveHandler = (e: MouseEvent): void => {
      if (hoverTimer) {
        clearTimeout(hoverTimer)
      }
      isHover.value = false
    }

    const mousemoveHandler = (e: MouseEvent): void => {
      if (isMousedown.value) {
        if (isVertical.value) {
          let height = removePx(NDrawer.height.value)
          const increment = startPos - e.clientY
          height += props.placement === 'bottom' ? increment : -increment
          NDrawer.height.value = `${height}px`
          startPos = e.clientY
        } else {
          let width = removePx(NDrawer.width.value)
          const increment = startPos - e.clientX
          width += props.placement === 'right' ? increment : -increment
          NDrawer.width.value = `${width}px`
          startPos = e.clientX
        }
      }
    }

    const mouseupHandler = (): void => {
      startPos = 0
      isMousedown.value = false
      document.body.style.cursor = cacheCusor
      document.body.removeEventListener('mousemove', mousemoveHandler)
      document.body.removeEventListener('mouseup', mouseupHandler)
    }

    watchEffect(() => {
      if (props.show) displayedRef.value = true
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
    function handleAfterLeave (): void {
      displayedRef.value = false
      props.onAfterLeave?.()
    }
    useLockHtmlScroll(computed(() => props.blockScroll && displayedRef.value))
    provide(drawerBodyInjectionKey, bodyRef)
    provide(popoverBodyInjectionKey, null)
    provide(modalBodyInjectionKey, null)
    return {
      bodyRef,
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
      mousedownHandler,
      mouseenterHandler,
      mouseleaveHandler,
      isMousedown,
      isHover
    }
  },
  render () {
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
                                `${mergedClsPrefix}-drawer--${this.placement}-placement`,
                                /**
                                 * When the mouse is pressed down to adjust the width/height,
                                 * it is forbidden to select text to avoid bugs
                                 */
                                this.isMousedown &&
                                  `${mergedClsPrefix}-no-select`,
                                this.nativeScrollbar &&
                                  `${mergedClsPrefix}-drawer--native-scrollbar`
                              ]
                            }),
                            [
                              this.adjustable ? (
                                <div
                                  class={[
                                    `${mergedClsPrefix}-drawer__adjustable-line`,
                                    `${mergedClsPrefix}-drawer__adjustable-line--${this.placement}`,
                                    this.isMousedown || this.isHover
                                      ? `${mergedClsPrefix}-drawer__adjustable-line--hover`
                                      : ''
                                  ]}
                                  onMouseenter={this.mouseenterHandler}
                                  onMouseleave={this.mouseleaveHandler}
                                  onMousedown={this.mousedownHandler}
                                ></div>
                              ) : null,
                              this.nativeScrollbar ? (
                                <div
                                  class={`${mergedClsPrefix}-drawer-content-wrapper`}
                                  style={this.contentStyle}
                                  role="none"
                                >
                                  {$slots}
                                </div>
                              ) : (
                                <NScrollbar
                                  {...this.scrollbarProps}
                                  contentStyle={this.contentStyle}
                                  contentClass={`${mergedClsPrefix}-drawer-content-wrapper`}
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
