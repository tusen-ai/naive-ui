import {
  h,
  defineComponent,
  computed,
  type PropType,
  ref,
  type CSSProperties,
  toRef,
  inject,
  provide
} from 'vue'
import { useMergedState } from 'vooks'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { formatLength, call, warn, useReactivated } from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { NScrollbar } from '../../_internal'
import type { ScrollbarProps, ScrollbarInst } from '../../_internal'
import { layoutLight } from '../styles'
import type { LayoutTheme } from '../styles'
import style from './styles/layout-sider.cssr'
import ToggleButton from './ToggleButton'
import ToggleBar from './ToggleBar'
import {
  layoutSiderInjectionKey,
  type LayoutSiderInst,
  positionProp
} from './interface'
import { layoutInjectionKey } from './Layout'

export const layoutSiderProps = {
  position: positionProp,
  bordered: Boolean,
  collapsedWidth: {
    type: Number,
    default: 48
  },
  width: {
    type: [Number, String] as PropType<string | number>,
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
  defaultCollapsed: Boolean,
  showCollapsedContent: {
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
  inverted: Boolean,
  scrollbarProps: Object as PropType<
  Partial<ScrollbarProps> & { style: CSSProperties }
  >,
  triggerStyle: [String, Object] as PropType<string | CSSProperties>,
  collapsedTriggerStyle: [String, Object] as PropType<string | CSSProperties>,
  'onUpdate:collapsed': [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onUpdateCollapsed: [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onAfterEnter: Function as PropType<() => void>,
  onAfterLeave: Function as PropType<() => void>,
  // deprecated
  onExpand: [Function, Array] as PropType<MaybeArray<() => void>>,
  onCollapse: [Function, Array] as PropType<MaybeArray<() => void>>,
  onScroll: Function as PropType<(e: Event) => void>
} as const

export type LayoutSiderProps = ExtractPublicPropTypes<typeof layoutSiderProps>

export default defineComponent({
  name: 'LayoutSider',
  props: {
    ...(useTheme.props as ThemeProps<LayoutTheme>),
    ...layoutSiderProps
  },
  setup (props) {
    const layoutProps = inject(layoutInjectionKey)
    if (__DEV__) {
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
    const scrollableElRef = ref<HTMLElement | null>(null)
    const scrollbarInstRef = ref<ScrollbarInst | null>(null)
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
    const siderPlacementRef = computed(() => {
      return layoutProps ? layoutProps.siderPlacement : 'left'
    })
    const uncontrolledCollapsedRef = ref(props.defaultCollapsed)
    const mergedCollapsedRef = useMergedState(
      toRef(props, 'collapsed'),
      uncontrolledCollapsedRef
    )
    function scrollTo (options: ScrollToOptions): void
    function scrollTo (x: number, y: number): void
    function scrollTo (options: ScrollToOptions | number, y?: number): void {
      if (props.nativeScrollbar) {
        const { value: scrollableEl } = scrollableElRef
        if (scrollableEl) {
          if (y === undefined) {
            scrollableEl.scrollTo(options as any)
          } else {
            scrollableEl.scrollTo(options as any, y as any)
          }
        }
      } else {
        const { value: scrollbarInst } = scrollbarInstRef
        if (scrollbarInst) {
          scrollbarInst.scrollTo(options as any, y as any)
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
    let scrollX = 0
    let scrollY = 0
    const handleNativeElScroll = (e: Event): void => {
      const target = e.target as HTMLElement
      scrollX = target.scrollLeft
      scrollY = target.scrollTop
      props.onScroll?.(e)
    }
    useReactivated(() => {
      if (props.nativeScrollbar) {
        const el = scrollableElRef.value
        if (el) {
          el.scrollTop = scrollY
          el.scrollLeft = scrollX
        }
      }
    })
    provide(layoutSiderInjectionKey, {
      collapsedRef: mergedCollapsedRef,
      collapseModeRef: toRef(props, 'collapseMode')
    })
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Layout',
      '-layout-sider',
      style,
      layoutLight,
      props,
      mergedClsPrefixRef
    )

    function handleTransitionend (e: TransitionEvent): void {
      if (e.propertyName === 'max-width') {
        if (mergedCollapsedRef.value) {
          props.onAfterLeave?.()
        } else {
          props.onAfterEnter?.()
        }
      }
    }

    const exposedMethods: LayoutSiderInst = {
      scrollTo
    }

    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self
      } = themeRef.value
      const {
        siderToggleButtonColor,
        siderToggleButtonBorder,
        siderToggleBarColor,
        siderToggleBarColorHover
      } = self
      const vars: any = {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-toggle-button-color': siderToggleButtonColor,
        '--n-toggle-button-border': siderToggleButtonBorder,
        '--n-toggle-bar-color': siderToggleBarColor,
        '--n-toggle-bar-color-hover': siderToggleBarColorHover
      }
      if (props.inverted) {
        vars['--n-color'] = self.siderColorInverted
        vars['--n-text-color'] = self.textColorInverted
        vars['--n-border-color'] = self.siderBorderColorInverted
        vars['--n-toggle-button-icon-color'] =
          self.siderToggleButtonIconColorInverted
        vars.__invertScrollbar = self.__invertScrollbar
      } else {
        vars['--n-color'] = self.siderColor
        vars['--n-text-color'] = self.textColor
        vars['--n-border-color'] = self.siderBorderColor
        vars['--n-toggle-button-icon-color'] = self.siderToggleButtonIconColor
      }
      return vars
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'layout-sider',
        computed(() => (props.inverted ? 'a' : 'b')),
        cssVarsRef,
        props
      )
      : undefined
    return {
      scrollableElRef,
      scrollbarInstRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      styleMaxWidth: styleMaxWidthRef,
      mergedCollapsed: mergedCollapsedRef,
      scrollContainerStyle: scrollContainerStyleRef,
      siderPlacement: siderPlacementRef,
      handleNativeElScroll,
      handleTransitionend,
      handleTriggerClick,
      inlineThemeDisabled,
      cssVars: cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      ...exposedMethods
    }
  },
  render () {
    const { mergedClsPrefix, mergedCollapsed, showTrigger } = this
    this.onRender?.()
    return (
      <aside
        class={[
          `${mergedClsPrefix}-layout-sider`,
          this.themeClass,
          `${mergedClsPrefix}-layout-sider--${this.position}-positioned`,
          `${mergedClsPrefix}-layout-sider--${this.siderPlacement}-placement`,
          this.bordered && `${mergedClsPrefix}-layout-sider--bordered`,
          mergedCollapsed && `${mergedClsPrefix}-layout-sider--collapsed`,
          (!mergedCollapsed || this.showCollapsedContent) &&
            `${mergedClsPrefix}-layout-sider--show-content`
        ]}
        onTransitionend={this.handleTransitionend}
        style={[
          this.inlineThemeDisabled ? undefined : this.cssVars,
          {
            maxWidth: this.styleMaxWidth,
            width: formatLength(this.width)
          }
        ]}
      >
        {!this.nativeScrollbar ? (
          <NScrollbar
            {...this.scrollbarProps}
            onScroll={this.onScroll}
            ref="scrollbarInstRef"
            style={this.scrollContainerStyle}
            contentStyle={this.contentStyle}
            theme={this.mergedTheme.peers.Scrollbar}
            themeOverrides={this.mergedTheme.peerOverrides.Scrollbar}
            // here is a hack, since in light theme the scrollbar color is dark,
            // we need to invert it in light color...
            builtinThemeOverrides={
              this.inverted && this.cssVars.__invertScrollbar === 'true'
                ? {
                    colorHover: 'rgba(255, 255, 255, .4)',
                    color: 'rgba(255, 255, 255, .3)'
                  }
                : undefined
            }
          >
            {this.$slots}
          </NScrollbar>
        ) : (
          <div
            class={`${mergedClsPrefix}-layout-sider-scroll-container`}
            onScroll={this.handleNativeElScroll}
            style={[
              this.scrollContainerStyle,
              {
                overflow: 'auto'
              },
              this.contentStyle
            ]}
            ref="scrollableElRef"
          >
            {this.$slots}
          </div>
        )}
        {showTrigger ? (
          showTrigger === 'bar' ? (
            <ToggleBar
              clsPrefix={mergedClsPrefix}
              style={
                mergedCollapsed ? this.collapsedTriggerStyle : this.triggerStyle
              }
              onClick={this.handleTriggerClick}
            />
          ) : (
            <ToggleButton
              clsPrefix={mergedClsPrefix}
              style={
                mergedCollapsed ? this.collapsedTriggerStyle : this.triggerStyle
              }
              onClick={this.handleTriggerClick}
            />
          )
        ) : null}
        {this.bordered ? (
          <div class={`${mergedClsPrefix}-layout-sider__border`} />
        ) : null}
      </aside>
    )
  }
})
