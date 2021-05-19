import {
  h,
  defineComponent,
  computed,
  PropType,
  ref,
  CSSProperties,
  toRef,
  inject
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { formatLength, call, warn } from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { NScrollbar } from '../../scrollbar'
import type { ScrollbarProps, ScrollbarInst } from '../../scrollbar'
import { layoutLight } from '../styles'
import type { LayoutTheme } from '../styles'
import style from './styles/layout-sider.cssr'
import ToggleButton from './ToggleButton'
import ToggleBar from './ToggleBar'
import { positionProp } from './interface'
import { useMergedState } from 'vooks'
import { layoutInjectionKey } from './Layout'

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
  contentStyle: {
    type: [String, Object] as PropType<string | CSSProperties>,
    default: ''
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
  'onUpdate:collapsed': [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onUpdateCollapsed: [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  // deprecated
  onExpand: [Function, Array] as PropType<MaybeArray<() => void>>,
  onCollapse: [Function, Array] as PropType<MaybeArray<() => void>>
} as const

export type LayoutSiderProps = ExtractPublicPropTypes<typeof layoutSiderProps>

export default defineComponent({
  name: 'LayoutSider',
  props: {
    ...(useTheme.props as ThemeProps<LayoutTheme>),
    ...layoutSiderProps
  },
  setup (props) {
    if (__DEV__) {
      const layoutProps = inject(layoutInjectionKey)
      if (!layoutProps) {
        warn(
          'layout-sider',
          'Layout sider is not allowed to be put outside layout.'
        )
      } else {
        if (!layoutProps.hasSider) {
          warn(
            'layout-sider',
            "You are putting `n-layout-sider` in a `n-layout` but haven't set `has-sider` on the `n-layout`."
          )
        }
      }
    }
    const selfRef = ref<HTMLElement | null>(null)
    const scrollbarRef = ref<ScrollbarInst | null>(null)
    const styleMaxWidthRef = computed(() => {
      return formatLength(
        mergedCollapsedRef.value ? props.collapsedWidth : props.width
      )
    })
    const scrollContainerStyleRef = computed<CSSProperties>(() => {
      if (props.collapseMode !== 'transform') return {}
      return {
        minWidth: formatLength(props.width)
      }
    })
    const scrollableDivStyleRef = computed(() => {
      return [
        props.contentStyle,
        scrollContainerStyleRef.value,
        {
          width: '100%',
          height: '100%',
          overflow: 'auto'
        }
      ]
    })
    const uncontrolledCollapsedRef = ref(props.defaultCollapsed)
    const mergedCollapsedRef = useMergedState(
      toRef(props, 'collapsed'),
      uncontrolledCollapsedRef
    )
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
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Layout',
      'LayoutSider',
      style,
      layoutLight,
      props,
      mergedClsPrefixRef
    )
    return {
      selfRef,
      scrollbarRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      styleMaxWidth: styleMaxWidthRef,
      mergedCollapsed: mergedCollapsedRef,
      scrollContainerStyle: scrollContainerStyleRef,
      scrollableDivStyle: scrollableDivStyleRef,
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
    const { mergedClsPrefix } = this
    return (
      <aside
        ref="selfRef"
        class={[
          `${mergedClsPrefix}-layout-sider`,
          `${mergedClsPrefix}-layout-sider--${this.position}-positioned`,
          {
            [`${mergedClsPrefix}-layout-sider--bordered`]: this.bordered,
            [`${mergedClsPrefix}-layout-sider--collapsed`]: this
              .mergedCollapsed,
            [`${mergedClsPrefix}-layout-sider--show-content`]: this.showContent
          }
        ]}
        style={[
          this.cssVars as any,
          {
            maxWidth: this.styleMaxWidth,
            width: formatLength(this.width)
          }
        ]}
      >
        {!this.nativeScrollbar ? (
          <NScrollbar
            {...this.scrollbarProps}
            ref="scrollbarRef"
            class={`${mergedClsPrefix}-layout-sider__content`}
            style={this.scrollContainerStyle}
            contentStyle={this.contentStyle}
            theme={this.mergedTheme.peers.Scrollbar}
            themeOverrides={this.mergedTheme.peerOverrides.Scrollbar}
          >
            {this.$slots}
          </NScrollbar>
        ) : (
          <div
            class={`${mergedClsPrefix}-layout-sider__content`}
            style={this.scrollableDivStyle}
          >
            {this.$slots}
          </div>
        )}
        {this.bordered ? (
          <div class={`${mergedClsPrefix}-layout-sider__border`} />
        ) : null}
        {this.showTrigger ? (
          this.showTrigger === 'arrow-circle' ? (
            <ToggleButton
              clsPrefix={mergedClsPrefix}
              style={this.triggerStyle}
              onClick={this.handleTriggerClick}
            />
          ) : (
            <ToggleBar
              clsPrefix={mergedClsPrefix}
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
