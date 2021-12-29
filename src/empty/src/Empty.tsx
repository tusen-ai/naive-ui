import {
  h,
  defineComponent,
  computed,
  PropType,
  CSSProperties,
  renderSlot,
  inject,
  VNodeChild
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
  description: String,
  showDescription: {
    type: Boolean,
    default: true
  },
  showIcon: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
    default: 'medium'
  },
  renderIcon: Function as PropType<() => VNodeChild>
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
    const mergedRenderIconRef = computed(
      () =>
        NConfigProvider?.mergedComponentPropsRef.value?.Empty?.renderIcon ||
        (() => <EmptyIcon />)
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedRenderIcon: mergedRenderIconRef,
      localizedDescription: computed(() => {
        return mergedDescriptionRef.value || localeRef.value.description
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
          '--n-icon-size': iconSize,
          '--n-font-size': fontSize,
          '--n-bezier': cubicBezierEaseInOut,
          '--n-text-color': textColor,
          '--n-icon-color': iconColor,
          '--n-extra-text-color': extraTextColor
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
        {this.showIcon ? (
          <div class={`${mergedClsPrefix}-empty__icon`}>
            {renderSlot($slots, 'icon', undefined, () => [
              <NBaseIcon clsPrefix={mergedClsPrefix}>
                {{ default: this.mergedRenderIcon }}
              </NBaseIcon>
            ])}
          </div>
        ) : null}
        {this.showDescription ? (
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
