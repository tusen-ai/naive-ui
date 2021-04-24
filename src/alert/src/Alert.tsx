import {
  h,
  ref,
  computed,
  defineComponent,
  PropType,
  mergeProps,
  renderSlot
} from 'vue'
import { getMargin } from 'seemly'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_internal/icons'
import { NFadeInExpandTransition, NBaseClose, NBaseIcon } from '../../_internal'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, createKey } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { alertLight } from '../styles'
import type { AlertTheme } from '../styles'
import style from './styles/index.cssr'

const alertProps = {
  ...(useTheme.props as ThemeProps<AlertTheme>),
  title: {
    type: String,
    default: undefined
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  type: {
    type: String as PropType<
    'info' | 'warning' | 'error' | 'success' | 'default'
    >,
    default: 'default'
  },
  closable: {
    type: Boolean,
    default: false
  },
  onClose: Function,
  onAfterLeave: {
    type: Function,
    default: undefined
  },
  onAfterHide: {
    type: Function,
    validator: () => {
      if (__DEV__) {
        warn(
          'alert',
          '`on-after-hide` is deprecated, please use `on-after-leave` instead.'
        )
      }
      return true
    },
    default: undefined
  }
}

export type AlertProps = ExtractPublicPropTypes<typeof alertProps>

export default defineComponent({
  name: 'Alert',
  inheritAttrs: false,
  props: alertProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Alert',
      'Alert',
      style,
      alertLight,
      props,
      mergedClsPrefixRef
    )
    const cssVars = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self
      } = themeRef.value
      const {
        fontSize,
        borderRadius,
        titleFontWeight,
        lineHeight,
        contentTextColor,
        titleTextColor,
        iconSize,
        iconMargin,
        closeSize,
        closeMargin,
        padding
      } = self
      const { type } = props
      const { left, right } = getMargin(iconMargin)
      return {
        '--bezier': cubicBezierEaseInOut,
        '--color': self[createKey('color', type)],
        '--close-color': self[createKey('closeColor', type)],
        '--close-color-hover': self[createKey('closeColorHover', type)],
        '--close-color-pressed': self[createKey('closeColorPressed', type)],
        '--icon-color': self[createKey('iconColor', type)],
        '--border': self[createKey('border', type)],
        '--title-text-color': titleTextColor,
        '--content-text-color': contentTextColor,
        '--line-height': lineHeight,
        '--border-radius': borderRadius,
        '--font-size': fontSize,
        '--title-font-weight': titleFontWeight,
        '--icon-size': iconSize,
        '--icon-margin': iconMargin,
        '--close-size': closeSize,
        '--close-margin': closeMargin,
        '--padding': padding,
        '--icon-margin-left': left,
        '--icon-margin-right': right
      }
    })
    const visibleRef = ref(true)
    const doAfterLeave = (): void => {
      const {
        onAfterLeave,
        onAfterHide // deprecated
      } = props
      if (onAfterLeave) onAfterLeave()
      if (onAfterHide) onAfterHide()
    }
    const handleCloseClick = (): void => {
      void Promise.resolve(props.onClose?.()).then((result) => {
        if (result === false) return
        visibleRef.value = false
      })
    }
    const handleAfterLeave = (): void => {
      doAfterLeave()
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      visible: visibleRef,
      handleCloseClick,
      handleAfterLeave,
      mergedTheme: themeRef,
      cssVars
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <NFadeInExpandTransition onAfterLeave={this.handleAfterLeave}>
        {{
          default: () =>
            this.visible
              ? h(
                'div',
                mergeProps(this.$attrs, {
                  class: [
                      `${mergedClsPrefix}-alert`,
                      {
                        [`${mergedClsPrefix}-alert--show-icon`]: this.showIcon
                      }
                  ],
                  style: this.cssVars
                }),
                [
                  this.closable ? (
                    <NBaseClose
                      clsPrefix={mergedClsPrefix}
                      class={`${mergedClsPrefix}-alert__close`}
                      onClick={this.handleCloseClick}
                    />
                  ) : null,
                  this.showIcon ? (
                    <div class={`${mergedClsPrefix}-alert__icon`}>
                      {this.$slots.icon ? (
                        renderSlot(this.$slots, 'icon')
                      ) : (
                        <NBaseIcon clsPrefix={mergedClsPrefix}>
                          {{
                            default: () => {
                              switch (this.type) {
                                case 'success':
                                  return <SuccessIcon />
                                case 'info':
                                  return <InfoIcon />
                                case 'warning':
                                  return <WarningIcon />
                                case 'error':
                                  return <ErrorIcon />
                                default:
                                  return null
                              }
                            }
                          }}
                        </NBaseIcon>
                      )}
                    </div>
                  ) : null,
                  <div class={`${mergedClsPrefix}-alert-body`}>
                    {this.title !== undefined ? (
                      <div class={`${mergedClsPrefix}-alert-body__title`}>
                        {renderSlot(this.$slots, 'header', undefined, () => [
                          this.title
                        ])}
                      </div>
                    ) : null}
                    {this.$slots.default ? (
                      <div class={`${mergedClsPrefix}-alert-body__content`}>
                        {this.$slots}
                      </div>
                    ) : null}
                  </div>
                ] as any
              )
              : null
        }}
      </NFadeInExpandTransition>
    )
  }
})
