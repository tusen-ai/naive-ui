import {
  h,
  defineComponent,
  computed,
  PropType,
  CSSProperties,
  renderSlot,
  inject
} from 'vue'
import { EmptyIcon } from '../../_internal/icons'
import { useConfig, useLocale, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey, ExtractPublicPropTypes } from '../../_utils'
import { NBaseIcon } from '../../_internal'
import { emptyLight } from '../styles'
import type { EmptyTheme } from '../styles'
import style from './styles/index.cssr'
import { configProviderInjectionKey } from '../../config-provider/src/ConfigProvider'

const emptyProps = {
  ...(useTheme.props as ThemeProps<EmptyTheme>),
  description: {
    type: String,
    default: undefined
  },
  showDescription: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge' | undefined>,
    default: undefined
  }
}

export type EmptyProps = ExtractPublicPropTypes<typeof emptyProps>

export default defineComponent({
  name: 'Empty',
  props: emptyProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Empty',
      'Empty',
      style,
      emptyLight,
      props,
      mergedClsPrefixRef
    )
    const { localeRef } = useLocale('Empty')
    const NConfigProvider = inject(configProviderInjectionKey, null)
    const mergedDescriptionRef = computed(() => {
      return (
        props.description ??
        NConfigProvider?.mergedComponentPropsRef.value?.Empty?.description
      )
    })
    const mergedShowDescriptionRef = computed(() => {
      return (
        props.showDescription ??
        NConfigProvider?.mergedComponentPropsRef.value?.Empty
          ?.showDescription ??
        true
      )
    })
    const mergedSizeRef = computed(() => {
      return (
        props.size ??
        NConfigProvider?.mergedComponentPropsRef.value?.Empty?.size ??
        'medium'
      )
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedShowDescription: mergedShowDescriptionRef,
      localizedDescription: computed(() => {
        return mergedDescriptionRef.value || localeRef.value.description
      }),
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            [createKey('iconSize', mergedSizeRef.value)]: iconSize,
            [createKey('fontSize', mergedSizeRef.value)]: fontSize,
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
    const { $slots, mergedClsPrefix } = this
    return (
      <div
        class={`${mergedClsPrefix}-empty`}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-empty__icon`}>
          {renderSlot($slots, 'icon', undefined, () => [
            <NBaseIcon clsPrefix={mergedClsPrefix}>
              {{ default: () => <EmptyIcon /> }}
            </NBaseIcon>
          ])}
        </div>
        {this.mergedShowDescription ? (
          <div class={`${mergedClsPrefix}-empty__description`}>
            {renderSlot($slots, 'default', undefined, () => [
              this.localizedDescription
            ])}
          </div>
        ) : null}
        {$slots.extra ? (
          <div class={`${mergedClsPrefix}-empty__extra`}>
            {renderSlot($slots, 'extra')}
          </div>
        ) : null}
      </div>
    )
  }
})
