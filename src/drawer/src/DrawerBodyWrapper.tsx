import {
  h,
  Transition,
  defineComponent,
  ref,
  computed,
  watchEffect,
  provide,
  inject,
  reactive,
  PropType,
  withDirectives,
  vShow,
  VNode,
  renderSlot,
  mergeProps
} from 'vue'
import { NScrollbar } from '../../scrollbar'
import type { ScrollbarProps } from '../../scrollbar'
import type { MergedTheme } from '../../_mixins'
import type { DrawerTheme } from '../styles'

export type Placement = 'left' | 'right' | 'top' | 'bottom'

export interface DrawerInjection {
  isMounted: boolean
  mergedTheme: MergedTheme<DrawerTheme>
}

export interface DrawerBodyInjection {
  bodyRef: HTMLElement | null
}

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
    const NDrawer = inject<DrawerInjection>('NDrawer') as DrawerInjection
    watchEffect(() => {
      if (props.show) displayedRef.value = true
    })
    function handleAfterLeave (): void {
      displayedRef.value = false
    }
    provide<DrawerBodyInjection>(
      'NDrawerBody',
      reactive({
        bodyRef
      })
    )
    provide('NModalBody', null)
    return {
      NDrawer,
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
    const { NDrawer, $slots } = this
    return this.displayDirective === 'show' || this.displayed || this.show
      ? withDirectives(
        (
          <div>
            {/* Keep the wrapper dom. Make sure the drawer has a host.
            Nor the detached content will disappear without transition */}
            <Transition
              name={this.transitionName}
              appear={this.NDrawer.isMounted}
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
                          'n-drawer',
                            `n-drawer--${this.placement}-placement`,
                            {
                              'n-drawer--native-scrollbar': this.nativeScrollbar
                            }
                        ]
                      }),
                      [
                        this.nativeScrollbar ? (
                          renderSlot($slots, 'default')
                        ) : (
                          <NScrollbar
                            {...this.scrollbarProps}
                            contentClass="n-drawer-scroll-content"
                            unstableTheme={
                              NDrawer.mergedTheme.peers.Scrollbar
                            }
                            themeOverrides={
                              NDrawer.mergedTheme.peerOverrides.Scrollbar
                            }
                          >
                            {$slots}
                          </NScrollbar>
                        )
                      ] as VNode[]
                    ),
                    [[vShow, this.show]]
                  )
              }}
            </Transition>
          </div>
        ) as VNode,
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
