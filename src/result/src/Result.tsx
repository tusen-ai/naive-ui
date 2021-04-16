import {
  h,
  defineComponent,
  computed,
  PropType,
  renderSlot,
  CSSProperties
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
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

const imgMap = {
  403: image403,
  404: image404,
  418: image418,
  500: image500
}

const iconMap = {
  info: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />
}

const resultProps = {
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
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Result',
      'Result',
      style,
      resultLight,
      props,
      mergedClsPrefix
    )
    return {
      cPrefix: mergedClsPrefix,
      cssVars: computed(() => {
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
          '--bezier': cubicBezierEaseInOut,
          '--font-size': fontSize,
          '--icon-size': iconSize,
          '--line-height': lineHeight,
          '--text-color': textColor,
          '--title-font-size': titleFontSize,
          '--title-font-weight': titleFontWeight,
          '--title-text-color': titleTextColor,
          '--icon-color': iconColor
        }
      })
    }
  },
  render () {
    const { status, $slots, cPrefix } = this
    return (
      <div class={`${cPrefix}-result`} style={this.cssVars as CSSProperties}>
        <div class={`${cPrefix}-result-icon`}>
          {status in imgMap ? (
            imgMap[(status as unknown) as keyof typeof imgMap]
          ) : (
            <NBaseIcon clsPrefix={cPrefix}>
              {{ default: () => iconMap[status as keyof typeof iconMap] }}
            </NBaseIcon>
          )}
        </div>
        <div class={`${cPrefix}-result-header`}>
          <div class={`${cPrefix}-result-header__title`}>{this.title}</div>
          <div class={`${cPrefix}-result-header__description`}>
            {this.description}
          </div>
        </div>
        {$slots.default ? (
          <div class={`${cPrefix}-result-content`}>{$slots}</div>
        ) : null}
        <div class={`${cPrefix}-result-footer`}>
          {renderSlot($slots, 'footer')}
        </div>
      </div>
    )
  }
})
