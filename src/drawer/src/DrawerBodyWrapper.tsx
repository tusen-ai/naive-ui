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
  renderSlot,
  mergeProps
} from 'vue'
import { NScrollbar } from '../../scrollbar'
import type { ScrollbarProps } from '../../scrollbar'
import { popoverBodyInjectionKey } from '../../popover/src/interface'
import { modalBodyInjectionKey } from '../../modal/src/interface'
import { drawerBodyInjectionKey, drawerInjectionKey } from './interface'

export type Placement = 'left' | 'right' | 'top' | 'bottom'

export default defineComponent({
  name: 'NDrawerContent',
  inheritAttrs: false,
  props: {
    show: {
      type: Boolean,
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
    nativeScrollbar: {
      type: Boolean,
      required: true
    },
    scrollbarProps: Object as PropType<ScrollbarProps>
  },
  setup (props) {
    const displayedRef = ref(props.show)
    const bodyRef = ref<HTMLElement | null>(null) // used for detached content
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NDrawer = inject(drawerInjectionKey)!
    watchEffect(() => {
      if (props.show) displayedRef.value = true
    })
    function handleAfterLeave (): void {
      displayedRef.value = false
    }
    provide(drawerBodyInjectionKey, bodyRef)
    provide(popoverBodyInjectionKey, null)
    provide(modalBodyInjectionKey, null)
    return {
      cPrefix: NDrawer.cPrefixRef,
      isMounted: NDrawer.isMountedRef,
      mergedTheme: NDrawer.mergedThemeRef,
      displayed: displayedRef,
      transitionName: computed(() => {
        return {
          right: 'n-slide-in-from-right-transition',
          left: 'n-slide-in-from-left-transition',
          top: 'n-slide-in-from-top-transition',
          bottom: 'n-slide-in-from-bottom-transition'
        }[props.placement]
      }),
      handleAfterLeave
    }
  },
  render () {
    const { $slots, cPrefix } = this
    return this.displayDirective === 'show' || this.displayed || this.show
      ? withDirectives(
        <div>
          {/* Keep the wrapper dom. Make sure the drawer has a host.
            Nor the detached content will disappear without transition */}
          <Transition
            name={this.transitionName}
            appear={this.isMounted}
            onAfterLeave={this.handleAfterLeave}
          >
            {{
              default: () =>
                withDirectives(
                  h(
                    'div',
                    mergeProps(this.$attrs, {
                      ref: 'bodyRef',
                      class: [
                          `${cPrefix}-drawer`,
                          `${cPrefix}-drawer--${this.placement}-placement`,
                          {
                            [`${cPrefix}-drawer--native-scrollbar`]: this
                              .nativeScrollbar
                          }
                      ]
                    }),
                    [
                      this.nativeScrollbar ? (
                        renderSlot($slots, 'default')
                      ) : (
                        <NScrollbar
                          {...this.scrollbarProps}
                          contentClass={`${cPrefix}-drawer-scroll-content`}
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
