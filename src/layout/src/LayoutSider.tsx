import {
  h,
  defineComponent,
  computed,
  nextTick,
  PropType,
  ref,
  watch,
  CSSProperties,
  toRef,
  inject,
  onBeforeUnmount,
  ExtractPropTypes
} from 'vue'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { MaybeArray } from '../../_utils'
import { call } from '../../_utils'
import { NScrollbar } from '../../scrollbar'
import type { ScrollbarProps, ScrollbarRef } from '../../scrollbar'
import { layoutLight } from '../styles'
import type { LayoutTheme } from '../styles'
import style from './styles/layout-sider.cssr'
import type { LayoutInjection } from './Layout'
import ToggleButton from './ToggleButton'
import ToggleBar from './ToggleBar'
import { positionProp } from './interface'
import { useMergedState } from 'vooks'

const layoutSiderProps = {
  position: positionProp,
  bordered: {
    type: Boolean,
    default: false
  },
  collapsedWidth: {
    type: Number,
    default: 48
  },
  width: {
    type: Number,
    default: 272
  },
  collapseMode: {
    type: String as PropType<'width' | 'transform'>,
    default: 'transform'
  },
  collapsed: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  defaultCollapsed: {
    type: Boolean,
    default: false
  },
  showContent: {
    type: Boolean,
    default: true
  },
  showTrigger: {
    type: [Boolean, String] as PropType<boolean | 'arrow-circle' | 'bar'>,
    default: false
  },
  nativeScrollbar: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 300
  },
  scrollbarProps: Object as PropType<
  Partial<ScrollbarProps> & { style: CSSProperties }
  >,
  triggerStyle: Object as PropType<CSSProperties>,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:collapsed': Function as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onUpdateCollapsed: Function as PropType<MaybeArray<(value: boolean) => void>>,
  // deprecated
  onExpand: Function as PropType<MaybeArray<() => void>>,
  onCollapse: Function as PropType<MaybeArray<() => void>>
} as const

export type LayoutSiderProps = ExtractPropTypes<typeof layoutSiderProps>

export default defineComponent({
  name: 'LayoutSider',
  props: {
    ...(useTheme.props as ThemeProps<LayoutTheme>),
    ...layoutSiderProps
  },
  setup (props) {
    const selfRef = ref<HTMLElement | null>(null)
    const scrollbarRef = ref<ScrollbarRef | null>(null)
    let collapseTimerId: number | null = null
    const styleWidthRef = ref<string | null>(null)
    const styleMaxWidthRef = ref<string | null>(null)
    const NLayout = inject<LayoutInjection | null>('NLayout', null)
    const uncontrolledCollapsedRef = ref(props.defaultCollapsed)
    const mergedCollapsedRef = useMergedState(
      toRef(props, 'collapsed'),
      uncontrolledCollapsedRef
    )
    const styleTransformRef = computed(() => {
      if (props.collapseMode === 'transform') {
        if (!mergedCollapsedRef.value) return 'translateX(0)'
        else return `translateX(-${props.width - props.collapsedWidth}px)`
      }
      return ''
    })
    function scrollTo (options: ScrollToOptions): void
    function scrollTo (x: number, y: number): void
    function scrollTo (options: ScrollToOptions | number, y?: number): void {
      if (scrollbarRef.value) {
        scrollbarRef.value.scrollTo(options as any, y as any)
      } else if (selfRef.value) {
        if (y === undefined) {
          selfRef.value.scrollTo(options as any)
        } else {
          selfRef.value.scrollTo(options as any, y as any)
        }
      }
    }
    function handleTriggerClick (): void {
      const {
        'onUpdate:collapsed': _onUpdateCollapsed,
        onUpdateCollapsed,
        // deprecated
        onExpand,
        onCollapse
      } = props
      const { value: collapsed } = mergedCollapsedRef
      if (onUpdateCollapsed) {
        call(onUpdateCollapsed, !collapsed)
      }
      if (_onUpdateCollapsed) {
        call(_onUpdateCollapsed, !collapsed)
      }
      uncontrolledCollapsedRef.value = !collapsed
      if (collapsed) {
        if (onExpand) call(onExpand)
      } else {
        if (onCollapse) call(onCollapse)
      }
    }
    watch(toRef(props, 'width'), (value) => {
      if (NLayout) {
        NLayout.siderWidth = value
      }
    })
    watch(toRef(props, 'collapsedWidth'), (value) => {
      if (NLayout) {
        NLayout.siderCollapsedWidth = value
      }
    })
    watch(toRef(props, 'collapseMode'), (value) => {
      if (NLayout) {
        NLayout.siderCollapseMode = value
      }
    })
    watch(toRef(props, 'position'), (value) => {
      if (NLayout) {
        NLayout.siderPosition = value
      }
    })
    watch(mergedCollapsedRef, (value) => {
      if (props.collapseMode === 'width') {
        if (collapseTimerId) {
          window.clearTimeout(collapseTimerId)
        }
        if (value) {
          styleMaxWidthRef.value = `${props.width}px`
          void nextTick(() => {
            void selfRef.value?.offsetWidth
            styleMaxWidthRef.value = `${props.collapsedWidth}px`
          })
          collapseTimerId = window.setTimeout(() => {
            styleWidthRef.value = `${props.collapsedWidth}px`
            styleMaxWidthRef.value = null
          }, props.duration)
        } else {
          styleMaxWidthRef.value = `${props.collapsedWidth}px`
          styleWidthRef.value = `${props.width}px`
          void nextTick(() => {
            void selfRef.value?.offsetWidth
            styleMaxWidthRef.value = `${props.width}px`
          })
          collapseTimerId = window.setTimeout(() => {
            styleMaxWidthRef.value = null
          }, props.duration)
        }
      }
      if (NLayout) {
        NLayout.siderCollapsed = value
      }
    })
    // onCreated, init
    if (props.collapseMode === 'width') {
      if (mergedCollapsedRef.value) {
        styleWidthRef.value = `${props.collapsedWidth}px`
      } else {
        styleWidthRef.value = `${props.width}px`
      }
    } else {
      styleWidthRef.value = `${props.width}px`
    }
    if (NLayout) {
      NLayout.hasSider = true
      NLayout.siderWidth = props.width
      NLayout.siderCollapsedWidth = props.collapsedWidth
      NLayout.siderCollapseMode = props.collapseMode
      NLayout.siderPosition = props.position
      NLayout.siderCollapsed = mergedCollapsedRef.value
    }
    onBeforeUnmount(() => {
      if (NLayout) {
        NLayout.hasSider = false
        NLayout.siderWidth = null
        NLayout.siderCollapsedWidth = null
        NLayout.siderCollapseMode = null
        NLayout.siderPosition = null
        NLayout.siderCollapsed = null
      }
    })
    const themeRef = useTheme(
      'Layout',
      'LayoutSider',
      style,
      layoutLight,
      props
    )
    return {
      selfRef,
      scrollbarRef,
      mergedTheme: themeRef,
      styleTransform: styleTransformRef,
      styleMaxWidth: styleMaxWidthRef,
      styleWidth: styleWidthRef,
      mergedCollapsed: mergedCollapsedRef,
      scrollTo,
      handleTriggerClick,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            siderColor,
            siderToggleButtonColor,
            siderBorderColor,
            siderToggleBarColor,
            siderToggleBarColorHover
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--sider-color': siderColor,
          '--sider-border-color': siderBorderColor,
          '--sider-toggle-button-color': siderToggleButtonColor,
          '--sider-toggle-bar-color': siderToggleBarColor,
          '--sider-toggle-bar-color-hover': siderToggleBarColorHover
        }
      })
    }
  },
  render () {
    return (
      <aside
        ref="selfRef"
        class={[
          'n-layout-sider',
          this.position && [`n-layout-sider--${this.position}-positioned`],
          {
            'n-layout-sider--bordered': this.bordered,
            'n-layout-sider--collapsed': this.mergedCollapsed,
            'n-layout-sider--show-content': this.showContent
          }
        ]}
        style={
          [
            this.cssVars,
            {
              transform: this.styleTransform,
              maxWidth: this.styleMaxWidth,
              width: this.styleWidth
            }
          ] as any
        }
      >
        {!this.nativeScrollbar ? (
          <NScrollbar
            ref="scrollbarRef"
            class="n-layout-sider__content"
            {...this.scrollbarProps}
            theme={this.mergedTheme.peers.Scrollbar}
            themeOverrides={this.mergedTheme.peerOverrides.Scrollbar}
          >
            {this.$slots}
          </NScrollbar>
        ) : (
          <div class="n-layout-sider__content">{this.$slots}</div>
        )}

        {this.bordered ? <div class="n-layout-sider__border" /> : null}
        {this.showTrigger ? (
          this.showTrigger === 'arrow-circle' ? (
            <ToggleButton
              style={this.triggerStyle}
              onClick={this.handleTriggerClick}
            />
          ) : (
            <ToggleBar
              collapsed={this.mergedCollapsed}
              style={this.triggerStyle}
              onClick={this.handleTriggerClick}
            />
          )
        ) : null}
      </aside>
    )
  }
})
