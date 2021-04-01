import {
  h,
  PropType,
  defineComponent,
  computed,
  provide,
  CSSProperties,
  reactive,
  withDirectives,
  Transition
} from 'vue'
import { VLazyTeleport } from 'vueuc'
import { zindexable } from 'vdirs'
import { useIsMounted } from 'vooks'
import { useTheme, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, formatLength, call } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { drawerLight, DrawerTheme } from '../styles'
import NDrawerBodyWrapper from './DrawerBodyWrapper'
import type { DrawerInjection, Placement } from './DrawerBodyWrapper'
import style from './styles/index.cssr'
import { ScrollbarProps } from '../../scrollbar'

export default defineComponent({
  name: 'Drawer',
  inheritAttrs: false,
  props: {
    ...(useTheme.props as ThemeProps<DrawerTheme>),
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 251
    },
    height: {
      type: [Number, String],
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
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:show': [Function, Array] as PropType<
    MaybeArray<(value: boolean) => void>
    >,
    onUpdateShow: [Function, Array] as PropType<
    MaybeArray<(value: boolean) => void>
    >,
    // deprecated
    drawerStyle: {
      type: [Object, String] as PropType<CSSProperties | string | undefined>,
      validator: () => {
        warn(
          'drawer',
          '`drawer-style` is deprecated, please use `style` instead.'
        )
        return true
      },
      default: undefined
    },
    drawerClass: {
      type: String as PropType<string | undefined>,
      validator: () => {
        warn(
          'drawer',
          '`drawer-class` is deprecated, please use `class` instead.'
        )
        return true
      },
      default: undefined
    },
    target: {
      validator: () => {
        warn('drawer', '`target` is deprecated, please use `to` instead.')
        return true
      },
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
  },
  setup (props) {
    const isMountedRef = useIsMounted()
    const themeRef = useTheme('Drawer', 'Drawer', style, drawerLight, props)
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
        const { onHide, onUpdateShow, 'onUpdate:show': _onUpdateShow } = props
        if (onUpdateShow) call(onUpdateShow, false)
        if (_onUpdateShow) call(_onUpdateShow, false)
        // deprecated
        if (onHide) call(onHide, false)
      }
    }
    provide<DrawerInjection>(
      'NDrawer',
      reactive({
        isMounted: isMountedRef,
        mergedTheme: themeRef
      })
    )
    provide('NModal', null)
    return {
      ...useConfig(props),
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
          self: { color, textColor, boxShadow, lineHeight, padding }
        } = themeRef.value
        return {
          '--line-height': lineHeight,
          '--color': color,
          '--text-color': textColor,
          '--box-shadow': boxShadow,
          '--bezier': cubicBezierEaseInOut,
          '--bezier-out': cubicBezierEaseOut,
          '--bezier-in': cubicBezierEaseIn,
          '--padding': padding
        }
      }),
      isMounted: isMountedRef
    }
  },
  render () {
    return (
      <VLazyTeleport to={this.to} show={this.show}>
        {{
          default: () => {
            return withDirectives(
              <div
                class={['n-drawer-container', this.namespace]}
                style={this.cssVars as CSSProperties}
              >
                <Transition name="n-fade-in-transition" appear={this.isMounted}>
                  {{
                    default: () =>
                      this.show ? (
                        <div
                          class="n-drawer-mask"
                          onClick={this.handleMaskClick}
                        />
                      ) : null
                  }}
                </Transition>
                <NDrawerBodyWrapper
                  {...this.$attrs}
                  class={[this.drawerClass, this.$attrs.class]}
                  style={this.mergedBodyStyle as any}
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
