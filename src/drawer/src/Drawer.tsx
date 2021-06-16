import {
  h,
  PropType,
  defineComponent,
  computed,
  provide,
  CSSProperties,
  withDirectives,
  Transition
} from 'vue'
import { VLazyTeleport } from 'vueuc'
import { zindexable } from 'vdirs'
import { useIsMounted } from 'vooks'
import { useTheme, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, formatLength, call } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { ScrollbarProps } from '../../scrollbar'
import { drawerLight, DrawerTheme } from '../styles'
import NDrawerBodyWrapper from './DrawerBodyWrapper'
import type { Placement } from './DrawerBodyWrapper'
import { drawerInjectionKey } from './interface'
import style from './styles/index.cssr'

const drawerProps = {
  ...(useTheme.props as ThemeProps<DrawerTheme>),
  show: {
    type: Boolean,
    default: false
  },
  width: {
    type: [Number, String] as PropType<string | number>,
    default: 251
  },
  height: {
    type: [Number, String] as PropType<string | number>,
    default: 251
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'right'
  },
  maskClosable: {
    type: Boolean,
    default: true
  },
  to: [String, Object] as PropType<string | HTMLElement>,
  displayDirective: {
    type: String as PropType<'if' | 'show'>,
    default: 'if'
  },
  nativeScrollbar: {
    type: Boolean,
    default: true
  },
  scrollbarProps: Object as PropType<ScrollbarProps>,
  contentStyle: [Object, String] as PropType<string | CSSProperties>,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:show': [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  onUpdateShow: [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  /** @deprecated */
  drawerStyle: {
    type: [Object, String] as PropType<CSSProperties | string | undefined>,
    validator: __DEV__
      ? () => {
          warn(
            'drawer',
            '`drawer-style` is deprecated, please use `style` instead.'
          )
          return true
        }
      : undefined,
    default: undefined
  },
  /** @deprecated */
  drawerClass: {
    type: String as PropType<string | undefined>,
    validator: __DEV__
      ? () => {
          warn(
            'drawer',
            '`drawer-class` is deprecated, please use `class` instead.'
          )
          return true
        }
      : undefined,
    default: undefined
  },
  target: {
    validator: __DEV__
      ? () => {
          warn('drawer', '`target` is deprecated, please use `to` instead.')
          return true
        }
      : undefined,
    default: undefined
  },
  onShow: {
    type: [Function, Array] as PropType<
    MaybeArray<(value: boolean) => void> | undefined
    >,
    validator: () => {
      warn(
        'drawer',
        '`on-show` is deprecated, please use `on-update:show` instead.'
      )
      return true
    },
    default: undefined
  },
  onHide: {
    type: [Function, Array] as PropType<
    MaybeArray<(value: false) => void> | undefined
    >,
    validator: () => {
      warn(
        'drawer',
        '`on-hide` is deprecated, please use `on-update:show` instead.'
      )
      return true
    },
    default: undefined
  }
} as const

export type DrawerProps = ExtractPublicPropTypes<typeof drawerProps>

export default defineComponent({
  name: 'Drawer',
  inheritAttrs: false,
  props: drawerProps,
  setup (props) {
    const { mergedClsPrefixRef, namespaceRef } = useConfig(props)
    const isMountedRef = useIsMounted()
    const themeRef = useTheme(
      'Drawer',
      'Drawer',
      style,
      drawerLight,
      props,
      mergedClsPrefixRef
    )
    const styleWidthRef = computed(() => {
      const { placement } = props
      if (placement === 'top' || placement === 'bottom') return ''
      const { width } = props
      return formatLength(width)
    })
    const styleHeightRef = computed(() => {
      const { placement } = props
      if (placement === 'left' || placement === 'right') return ''
      const { height } = props
      return formatLength(height)
    })
    const mergedBodyStyleRef = computed(() => {
      return [
        {
          width: styleWidthRef.value,
          height: styleHeightRef.value
        },
        props.drawerStyle
      ]
    })
    function handleMaskClick (): void {
      if (props.maskClosable) {
        doUpdateShow(false)
      }
    }
    function doUpdateShow (show: boolean): void {
      const { onHide, onUpdateShow, 'onUpdate:show': _onUpdateShow } = props
      if (onUpdateShow) call(onUpdateShow, show)
      if (_onUpdateShow) call(_onUpdateShow, show)
      // deprecated
      if (onHide && !show) call(onHide, show)
    }
    provide(drawerInjectionKey, {
      isMountedRef: isMountedRef,
      mergedThemeRef: themeRef,
      mergedClsPrefixRef,
      doUpdateShow
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      namespace: namespaceRef,
      mergedBodyStyle: mergedBodyStyleRef,
      handleMaskClick,
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const {
          common: {
            cubicBezierEaseInOut,
            cubicBezierEaseIn,
            cubicBezierEaseOut
          },
          self: {
            color,
            textColor,
            boxShadow,
            lineHeight,
            headerPadding,
            footerPadding,
            bodyPadding,
            titleFontSize,
            titleTextColor,
            titleFontWeight,
            headerBorderBottom,
            footerBorderTop,
            closeColor,
            closeColorHover,
            closeColorPressed,
            closeSize
          }
        } = themeRef.value
        return {
          '--line-height': lineHeight,
          '--color': color,
          '--text-color': textColor,
          '--box-shadow': boxShadow,
          '--bezier': cubicBezierEaseInOut,
          '--bezier-out': cubicBezierEaseOut,
          '--bezier-in': cubicBezierEaseIn,
          '--header-padding': headerPadding,
          '--body-padding': bodyPadding,
          '--footer-padding': footerPadding,
          '--title-text-color': titleTextColor,
          '--title-font-size': titleFontSize,
          '--title-font-weight': titleFontWeight,
          '--header-border-bottom': headerBorderBottom,
          '--footer-border-top': footerBorderTop,
          '--close-color': closeColor,
          '--close-color-hover': closeColorHover,
          '--close-color-pressed': closeColorPressed,
          '--close-size': closeSize
        }
      }),
      isMounted: isMountedRef
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <VLazyTeleport to={this.to} show={this.show}>
        {{
          default: () => {
            return withDirectives(
              <div
                class={[`${mergedClsPrefix}-drawer-container`, this.namespace]}
                style={this.cssVars as CSSProperties}
              >
                <Transition name="fade-in-transition" appear={this.isMounted}>
                  {{
                    default: () =>
                      this.show ? (
                        <div
                          class={`${mergedClsPrefix}-drawer-mask`}
                          onClick={this.handleMaskClick}
                        />
                      ) : null
                  }}
                </Transition>
                <NDrawerBodyWrapper
                  {...this.$attrs}
                  class={[this.drawerClass, this.$attrs.class]}
                  style={[this.mergedBodyStyle, this.$attrs.style]}
                  contentStyle={this.contentStyle}
                  placement={this.placement}
                  scrollbarProps={this.scrollbarProps}
                  show={this.show}
                  displayDirective={this.displayDirective}
                  nativeScrollbar={this.nativeScrollbar}
                >
                  {this.$slots}
                </NDrawerBodyWrapper>
              </div>,
              [[zindexable, { enabled: this.show }]]
            )
          }
        }}
      </VLazyTeleport>
    )
  }
})
