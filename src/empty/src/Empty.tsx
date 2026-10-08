import type {
  CSSProperties,
  PropType,
  Ref,
  SlotsType,
  VNode,
  VNodeChild
} from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { EmptyTheme, EmptyThemeOverrides } from '../styles'
import { computed, defineComponent, h } from 'vue'
import { NBaseIcon } from '../../_internal/icon'
import { EmptyIcon } from '../../_internal/icons'
import { useConfig, useLocale, useTheme, useThemeClass } from '../../_mixins'
import { createKey } from '../../_utils'
import { emptyLight } from '../styles'
import style from './styles/index.cssr'

export const emptyProps = {
  ...(useTheme.props as ThemeProps<EmptyTheme, EmptyThemeOverrides>),
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
    type: String as PropType<
      'tiny' | 'small' | 'medium' | 'large' | 'huge' | undefined
    >,
    default: undefined
  },
  renderIcon: Function as PropType<() => VNodeChild>
}

export type EmptyProps = ExtractPublicPropTypes<typeof emptyProps>

export interface EmptySlots {
  default?: () => VNode[]
  extra?: () => VNode[]
  icon?: () => VNode[]
}

export default defineComponent({
  name: 'Empty',
  props: emptyProps,
  slots: Object as SlotsType<EmptySlots>,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled, mergedComponentPropsRef }
      = useConfig(props)
    const themeRef = useTheme(
      'Empty',
      '-empty',
      style,
      emptyLight,
      props,
      mergedClsPrefixRef
    )
    const { localeRef } = useLocale('Empty')
    const mergedDescriptionRef = computed(() => {
      return (
        props.description ?? mergedComponentPropsRef?.value?.Empty?.description
      )
    })
    const mergedRenderIconRef = computed(
      () =>
        mergedComponentPropsRef?.value?.Empty?.renderIcon
        || (() => <EmptyIcon />)
    )
    const mergedSizeRef = computed<
      'tiny' | 'small' | 'medium' | 'large' | 'huge'
    >(() => {
      const { size } = props
      const configSize = mergedComponentPropsRef?.value?.Empty?.size
      if (size !== undefined)
        return size
      if (configSize !== undefined)
        return configSize
      return 'medium'
    })
    const cssVarsRef = computed(() => {
      const size = mergedSizeRef.value
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
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
          'empty',
          computed(() => {
            let hash = ''
            const { value: size } = mergedSizeRef
            hash += size[0]
            return hash
          }),
          cssVarsRef,
          props
        )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedRenderIcon: mergedRenderIconRef,
      mergedSize: mergedSizeRef,
      localizedDescription: computed(() => {
        return mergedDescriptionRef.value || localeRef.value.description
      }),
      cssVars: inlineThemeDisabled
        ? undefined
        : (cssVarsRef as Ref<CSSProperties>),
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render() {
    const { $slots, mergedClsPrefix, onRender } = this
    onRender?.()
    return (
      <div
        class={[`${mergedClsPrefix}-empty`, this.themeClass]}
        style={this.cssVars as any}
      >
        {this.showIcon ? (
          <div class={`${mergedClsPrefix}-empty__icon`}>
            {$slots.icon ? (
              $slots.icon()
            ) : (
              <NBaseIcon clsPrefix={mergedClsPrefix}>
                {{ default: this.mergedRenderIcon }}
              </NBaseIcon>
            )}
          </div>
        ) : null}
        {this.showDescription ? (
          <div class={`${mergedClsPrefix}-empty__description`}>
            {$slots.default ? $slots.default() : this.localizedDescription}
          </div>
        ) : null}
        {$slots.extra ? (
          <div class={`${mergedClsPrefix}-empty__extra`}>{$slots.extra()}</div>
        ) : null}
      </div>
    )
  }
})
