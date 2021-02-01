import {
  h,
  defineComponent,
  computed,
  PropType,
  CSSProperties,
  renderSlot,
  VNode
} from 'vue'
import { EmptyIcon } from '../../_internal/icons'
import { useLocale, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils'
import { NBaseIcon } from '../../_internal'
import { emptyLight } from '../styles'
import type { EmptyTheme } from '../styles'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Empty',
  props: {
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
  },
  setup (props) {
    const themeRef = useTheme('Empty', 'Empty', style, emptyLight, props)
    const { locale } = useLocale('Empty')
    return {
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
    const { $slots } = this
    return (
      <div class="n-empty" style={this.cssVars as CSSProperties}>
        <div class="n-empty__icon">
          {renderSlot($slots, 'icon', undefined, () => [
            (<NBaseIcon>{{ default: () => <EmptyIcon /> }}</NBaseIcon>) as VNode
          ])}
        </div>
        {this.showDescription ? (
          <div class="n-empty__description">
            {renderSlot($slots, 'default', undefined, () => [
              this.localizedDescription
            ])}
          </div>
        ) : null}
        {$slots.extra ? (
          <div class="n-empty__extra">{renderSlot($slots, 'extra')}</div>
        ) : null}
      </div>
    )
  }
})
