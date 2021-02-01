import {
  h,
  defineComponent,
  computed,
  PropType,
  reactive,
  inject,
  provide,
  ref,
  ExtractPropTypes
} from 'vue'
import { NScrollbar } from '../../scrollbar'
import type { ScrollbarProps, ScrollbarRef } from '../../scrollbar'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { layoutLight } from '../styles'
import type { LayoutTheme } from '../styles'
import style from './styles/layout.cssr'
import { LayoutRef, positionProp } from './interface'

export interface LayoutInjection {
  hasSider: boolean
  siderWidth: number | null
  siderCollapsedWidth: number | null
  siderCollapseMode: 'width' | 'transform' | null
  siderPosition: 'absolute' | 'static' | null
  siderCollapsed: boolean | null
}

const layoutProps = {
  position: positionProp,
  nativeScrollbar: {
    type: Boolean,
    default: true
  },
  scrollbarProps: Object as PropType<Partial<ScrollbarProps>>
} as const

export type LayoutProps = ExtractPropTypes<typeof layoutProps>

export default defineComponent({
  name: 'Layout',
  alias: ['LayoutContent'],
  props: {
    ...(useTheme.props as ThemeProps<LayoutTheme>),
    ...layoutProps
  },
  setup (props) {
    const selfRef = ref<HTMLElement | null>(null)
    const scrollbarRef = ref<ScrollbarRef | null>(null)
    const themeRef = useTheme('Layout', 'Layout', style, layoutLight, props)
    const state = reactive<LayoutInjection>({
      hasSider: false,
      siderWidth: null,
      siderCollapsedWidth: null,
      siderCollapseMode: null,
      siderPosition: null,
      siderCollapsed: null
    })
    const NLayout = inject<LayoutInjection | null>('NLayout', null)
    const styleMarginLeftRef = computed(() => {
      if (NLayout?.hasSider) {
        if (
          NLayout.siderPosition === 'absolute' &&
          props.position === 'absolute'
        ) {
          if (NLayout.siderCollapsed) {
            return `${NLayout.siderCollapsedWidth as number}px`
          } else {
            return `${NLayout.siderWidth as number}px`
          }
        }
      }
      return ''
    })
    const mergedLayoutStyleRef = computed(() => {
      return {
        marginLeft: styleMarginLeftRef.value
      }
    })
    const scrollTo: LayoutRef['scrollTo'] = (
      options: ScrollToOptions | number,
      y?: number
    ): void => {
      if (scrollbarRef.value) {
        scrollbarRef.value.scrollTo(options as any, y as any)
      } else if (selfRef.value) {
        selfRef.value.scrollTo(options as any, y as any)
      }
    }
    provide<LayoutInjection>('NLayout', state)
    return {
      selfRef,
      scrollbarRef,
      state,
      mergedLayoutStyle: mergedLayoutStyleRef,
      scrollTo,
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { color, textColor }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--color': color,
          '--text-color': textColor
        }
      })
    }
  },
  render () {
    return (
      <div
        ref="selfRef"
        class={[
          'n-layout',
          `n-layout--${this.position}-positioned`,
          this.state.siderCollapseMode &&
            `n-layout--${this.state.siderCollapseMode}-collapse-mode`,
          {
            'n-layout--has-sider': this.state.hasSider
          }
        ]}
        style={[this.mergedLayoutStyle, this.cssVars] as any}
      >
        {!this.nativeScrollbar ? (
          <NScrollbar
            {...this.scrollbarProps}
            ref="scrollbarRef"
            unstableTheme={this.mergedTheme.peers.Scrollbar}
            themeOverrides={this.mergedTheme.peerOverrides.Scrollbar}
          >
            {this.$slots}
          </NScrollbar>
        ) : (
          this.$slots
        )}
      </div>
    )
  }
})
