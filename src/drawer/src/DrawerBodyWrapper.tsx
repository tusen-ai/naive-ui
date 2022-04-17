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
  Ref
} from 'vue'
import { VFocusTrap } from 'vueuc'
import { NScrollbar } from '../../_internal'
import type { ScrollbarProps } from '../../_internal'
import { popoverBodyInjectionKey } from '../../popover/src/interface'
import { modalBodyInjectionKey } from '../../modal/src/interface'
import { drawerBodyInjectionKey, drawerInjectionKey } from './interface'

export type Placement = 'left' | 'right' | 'top' | 'bottom'

export default defineComponent({
  name: 'NDrawerContent',
  inheritAttrs: false,
  props: {
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
    onAfterLeave: Function as PropType<() => void>,
    onAfterEnter: Function as PropType<() => void>,
    onEsc: Function as PropType<() => void>
  },
  setup (props) {
    const displayedRef = ref(props.show)
    const bodyRef: Ref<HTMLElement | null> | null = ref(null) // used for detached content
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NDrawer = inject(drawerInjectionKey)!
    watchEffect(() => {
      if (props.show) displayedRef.value = true
    })
    function handleAfterLeave (): void {
      displayedRef.value = false
      props.onAfterLeave?.()
    }
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
      handleAfterLeave
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
              disabled={!this.trapFocus}
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
                                this.nativeScrollbar &&
                                  `${mergedClsPrefix}-drawer--native-scrollbar`
                              ]
                            }),
                            [
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
                          [[vShow, this.show]]
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
