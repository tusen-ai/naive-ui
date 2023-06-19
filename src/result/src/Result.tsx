import {
  h,
  defineComponent,
  computed,
  type PropType,
  type CSSProperties
} from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import {
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon
} from '../../_internal/icons'
import { NBaseIcon } from '../../_internal'
import { resultLight } from '../styles'
import type { ResultTheme } from '../styles'
import image404 from './404'
import image500 from './500'
import image418 from './418'
import image403 from './403'
import style from './styles/index.cssr'

const iconMap = {
  403: image403,
  404: image404,
  418: image418,
  500: image500,
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />
}

export const resultProps = {
  ...(useTheme.props as ThemeProps<ResultTheme>),
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
    default: 'medium'
  },
  status: {
    type: String as PropType<
    'info' | 'success' | 'warning' | 'error' | '404' | '403' | '500' | '418'
    >,
    default: 'info'
  },
  title: String,
  description: String
}

export type ResultProps = ExtractPublicPropTypes<typeof resultProps>

export default defineComponent({
  name: 'Result',
  props: resultProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Result',
      '-result',
      style,
      resultLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed(() => {
      const { size, status } = props
      const {
        common: { cubicBezierEaseInOut },
        self: {
          textColor,
          lineHeight,
          titleTextColor,
          titleFontWeight,
          [createKey('iconColor', status)]: iconColor,
          [createKey('fontSize', size)]: fontSize,
          [createKey('titleFontSize', size)]: titleFontSize,
          [createKey('iconSize', size)]: iconSize
        }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': fontSize,
        '--n-icon-size': iconSize,
        '--n-line-height': lineHeight,
        '--n-text-color': textColor,
        '--n-title-font-size': titleFontSize,
        '--n-title-font-weight': titleFontWeight,
        '--n-title-text-color': titleTextColor,
        '--n-icon-color': iconColor || ''
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'result',
        computed(() => {
          const { size, status } = props
          let hash = ''
          if (size) {
            hash += size[0]
          }
          if (status) {
            hash += status[0]
          }
          return hash
        }),
        cssVarsRef,
        props
      )
      : undefined

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { status, $slots, mergedClsPrefix, onRender } = this
    onRender?.()
    return (
      <div
        class={[`${mergedClsPrefix}-result`, this.themeClass]}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-result-icon`}>
          {$slots.icon?.() || (
            <NBaseIcon clsPrefix={mergedClsPrefix}>
              {{ default: () => iconMap[status] }}
            </NBaseIcon>
          )}
        </div>
        <div class={`${mergedClsPrefix}-result-header`}>
          {this.title ? (
            <div class={`${mergedClsPrefix}-result-header__title`}>
              {this.title}
            </div>
          ) : null}
          {this.description ? (
            <div class={`${mergedClsPrefix}-result-header__description`}>
              {this.description}
            </div>
          ) : null}
        </div>
        {$slots.default && (
          <div class={`${mergedClsPrefix}-result-content`}>{$slots}</div>
        )}
        {$slots.footer && (
          <div class={`${mergedClsPrefix}-result-footer`}>
            {$slots.footer()}
          </div>
        )}
      </div>
    )
  }
})
