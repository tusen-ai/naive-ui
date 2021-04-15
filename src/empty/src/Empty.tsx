import {
  h,
  defineComponent,
  computed,
  PropType,
  CSSProperties,
  renderSlot
} from 'vue'
import { EmptyIcon } from '../../_internal/icons'
import { useConfig, useLocale, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, ExtractPublicPropTypes } from '../../_utils'
import { NBaseIcon } from '../../_internal'
import { emptyLight } from '../styles'
import type { EmptyTheme } from '../styles'
import style from './styles/index.cssr'

const emptyProps = {
  ...(useTheme.props as ThemeProps<EmptyTheme>),
  description: {
    type: String,
    default: undefined
  },
  showDescription: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
    default: 'medium'
  }
}

export type EmptyProps = ExtractPublicPropTypes<typeof emptyProps>

export default defineComponent({
  name: 'Empty',
  props: emptyProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Empty',
      'Empty',
      style,
      emptyLight,
      props,
      mergedClsPrefix
    )
    const { locale } = useLocale('Empty')
    return {
      cPrefix: mergedClsPrefix,
      localizedDescription: computed(() => {
        return props.description || locale.value.description
      }),
      cssVars: computed(() => {
        const { size } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            [createKey('iconSize', size)]: iconSize,
            [createKey('fontSize', size)]: fontSize,
            textColor,
            iconColor,
            extraTextColor
          }
        } = themeRef.value
        return {
          '--icon-size': iconSize,
          '--font-size': fontSize,
          '--bezier': cubicBezierEaseInOut,
          '--text-color': textColor,
          '--icon-color': iconColor,
          '--extra-text-color': extraTextColor
        }
      })
    }
  },
  render () {
    const { $slots, cPrefix } = this
    return (
      <div class={`${cPrefix}-empty`} style={this.cssVars as CSSProperties}>
        <div class={`${cPrefix}-empty__icon`}>
          {renderSlot($slots, 'icon', undefined, () => [
            <NBaseIcon clsPrefix={cPrefix}>
              {{ default: () => <EmptyIcon /> }}
            </NBaseIcon>
          ])}
        </div>
        {this.showDescription ? (
          <div class={`${cPrefix}-empty__description`}>
            {renderSlot($slots, 'default', undefined, () => [
              this.localizedDescription
            ])}
          </div>
        ) : null}
        {$slots.extra ? (
          <div class={`${cPrefix}-empty__extra`}>
            {renderSlot($slots, 'extra')}
          </div>
        ) : null}
      </div>
    )
  }
})
