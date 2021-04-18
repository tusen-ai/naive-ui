import {
  computed,
  defineComponent,
  h,
  renderSlot,
  PropType,
  CSSProperties,
  Ref,
  provide,
  InjectionKey
} from 'vue'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { listLight } from '../styles'
import type { ListTheme } from '../styles'
import style from './styles/index.cssr'

const listProps = {
  ...(useTheme.props as ThemeProps<ListTheme>),
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  bordered: {
    type: Boolean,
    default: false
  }
}

export type ListProps = ExtractPublicPropTypes<typeof listProps>

interface ListInjection {
  mergedClsPrefixRef: Ref<string>
}

export const listInjectionKey: InjectionKey<ListInjection> = Symbol('list')

export default defineComponent({
  name: 'List',
  props: listProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'List',
      'List',
      style,
      listLight,
      props,
      mergedClsPrefix
    )
    provide(listInjectionKey, {
      mergedClsPrefixRef: mergedClsPrefix
    })
    return {
      mergedClsPrefix,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            fontSize,
            textColor,
            color,
            colorModal,
            colorPopover,
            borderColor,
            borderColorModal,
            borderColorPopover,
            borderRadius
          }
        } = themeRef.value
        return {
          '--font-size': fontSize,
          '--bezier': cubicBezierEaseInOut,
          '--text-color': textColor,
          '--color': color,
          '--border-radius': borderRadius,
          '--border-color': borderColor,
          '--border-color-modal': borderColorModal,
          '--border-color-popover': borderColorPopover,
          '--color-modal': colorModal,
          '--color-popover': colorPopover
        }
      })
    }
  },
  render () {
    const { $slots, mergedClsPrefix } = this
    return (
      <ul
        class={[
          `${mergedClsPrefix}-list`,
          this.bordered && `${mergedClsPrefix}-list--bordered`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {$slots.header ? (
          <div class={`${mergedClsPrefix}-list__header`}>
            {renderSlot($slots, 'header')}
          </div>
        ) : null}
        {renderSlot($slots, 'default')}
        {$slots.footer ? (
          <div class={`${mergedClsPrefix}-list__footer`}>
            {renderSlot($slots, 'footer')}
          </div>
        ) : null}
      </ul>
    )
  }
})
