import {
  h,
  defineComponent,
  computed,
  PropType,
  ref,
  CSSProperties,
  toRef,
  inject,
  provide
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { formatLength, call, warn } from '../../_utils'
import type { MaybeArray, ExtractPublicPropTypes } from '../../_utils'
import { NScrollbar } from '../../scrollbar'
import type { ScrollbarProps, ScrollbarInst } from '../../scrollbar'
import { layoutLight } from '../styles'
import type { LayoutTheme } from '../styles'
import style from './styles/layout-aside.cssr'
import ToggleButton from './ToggleButton'
import ToggleBar from './ToggleBar'
import {
  layoutAsideInjectionKey,
  LayoutAsideInst,
  positionProp
} from './interface'
import { useMergedState } from 'vooks'
import { layoutInjectionKey } from './Layout'

const layoutAsideProps = {
  position: positionProp,
  bordered: Boolean,
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
  duration: {
    type: Number,
    default: 300
  },
  inverted: Boolean,
  scrollbarProps: Object as PropType<
  Partial<ScrollbarProps> & { style: CSSProperties }
  >,
  triggerStyle: [String, Object] as PropType<string | CSSProperties>,
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

export type LayoutAsideProps = ExtractPublicPropTypes<typeof layoutAsideProps>

export default defineComponent({
  name: 'LayoutAside',
  props: {
    ...(useTheme.props as ThemeProps<LayoutTheme>),
    ...layoutAsideProps
  },
  setup (props) {
    if (__DEV__) {
      const layoutProps = inject(layoutInjectionKey)
      if (!layoutProps) {
        warn(
          'layout-aside',
          'Layout aside is not allowed to be put outside layout.'
        )
      } else {
        if (!layoutProps.hasAside) {
          warn(
            'layout-aside',
            "You are putting `n-layout-aside` in a `n-layout` but haven't set `has-aside` on the `n-layout`."
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
    provide(layoutAsideInjectionKey, {
      collapsedRef: mergedCollapsedRef,
      collapseModeRef: toRef(props, 'collapseMode')
    })
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Layout',
      'LayoutAside',
      style,
      layoutLight,
      props,
      mergedClsPrefixRef
    )

    const exposedMethods: LayoutAsideInst = {
      scrollTo
    }
    return {
      scrollableElRef,
      scrollbarInstRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      styleMaxWidth: styleMaxWidthRef,
      mergedCollapsed: mergedCollapsedRef,
      scrollContainerStyle: scrollContainerStyleRef,
      handleTriggerClick,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self
        } = themeRef.value
        const {
          asideToggleButtonColor,
          asideToggleBarColor,
          asideToggleBarColorHover
        } = self
        const vars: any = {
          '--bezier': cubicBezierEaseInOut,
          '--toggle-button-color': asideToggleButtonColor,
          '--toggle-bar-color': asideToggleBarColor,
          '--toggle-bar-color-hover': asideToggleBarColorHover
        }
        if (props.inverted) {
          vars['--color'] = self.asideColorInverted
          vars['--text-color'] = self.textColorInverted
          vars['--border-color'] = self.asideBorderColorInverted
          vars.__invertScrollbar = self.__invertScrollbar
        } else {
          vars['--color'] = self.asideColor
          vars['--text-color'] = self.textColor
          vars['--border-color'] = self.asideBorderColor
        }
        return vars
      }),
      ...exposedMethods
    }
  },
  render () {
    const { mergedClsPrefix, mergedCollapsed, showTrigger } = this
    return (
      <aside
        class={[
          `${mergedClsPrefix}-layout-aside`,
          `${mergedClsPrefix}-layout-aside--${this.position}-positioned`,
          this.bordered && `${mergedClsPrefix}-layout-aside--bordered`,
          mergedCollapsed && `${mergedClsPrefix}-layout-aside--collapsed`,
          (!mergedCollapsed || this.showCollapsedContent) &&
            `${mergedClsPrefix}-layout-aside--show-content`
        ]}
        style={[
          this.cssVars,
          {
            maxWidth: this.styleMaxWidth,
            width: formatLength(this.width)
          }
        ]}
      >
        {!this.nativeScrollbar ? (
          <NScrollbar
            {...this.scrollbarProps}
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
            class={`${mergedClsPrefix}-layout-aside-scroll-container`}
            style={[
              this.scrollContainerStyle,
              this.contentStyle,
              {
                overflow: 'auto'
              }
            ]}
            ref="scrollableElRef"
          >
            {this.$slots}
          </div>
        )}
        {showTrigger ? (
          showTrigger === 'arrow-circle' ? (
            <ToggleButton
              clsPrefix={mergedClsPrefix}
              style={this.triggerStyle}
              onClick={this.handleTriggerClick}
            />
          ) : (
            <ToggleBar
              clsPrefix={mergedClsPrefix}
              collapsed={mergedCollapsed}
              style={this.triggerStyle}
              onClick={this.handleTriggerClick}
            />
          )
        ) : null}
      </aside>
    )
  }
})
