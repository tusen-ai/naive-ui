import {
  h,
  type PropType,
  defineComponent,
  computed,
  type CSSProperties,
  provide,
  type Ref,
  toRef
} from 'vue'
import {
  type ThemeProps,
  useConfig,
  useTheme,
  useThemeClass
} from '../../_mixins'
import {
  createInjectionKey,
  formatLength,
  type ExtractPublicPropTypes
} from '../../_utils'
import style from './styles/index.cssr'
import floatButtonGroupLight, {
  type FloatButtonGroupTheme
} from '../styles/light'

export interface ButtonGroupInjection {
  shapeRef: Ref<'circle' | 'square'>
}

export const floatButtonGroupProps = {
  ...(useTheme.props as ThemeProps<FloatButtonGroupTheme>),
  left: [Number, String] as PropType<string | number>,
  right: [Number, String] as PropType<string | number>,
  top: [Number, String] as PropType<string | number>,
  bottom: [Number, String] as PropType<string | number>,
  shape: {
    type: String as PropType<'square' | 'circle'>,
    default: 'circle'
  },
  position: {
    type: String as PropType<'relative' | 'absolute' | 'fixed'>,
    default: 'fixed'
  }
} as const

export type FloatButtonGroupProps = ExtractPublicPropTypes<
  typeof floatButtonGroupProps
>

export const floatButtonGroupInjectionKey =
  createInjectionKey<ButtonGroupInjection>('n-float-button-group')

export default defineComponent({
  name: 'FloatButtonGroup',
  props: floatButtonGroupProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'FloatButtonGroup',
      '-float-button-group',
      style,
      floatButtonGroupLight,
      props,
      mergedClsPrefixRef
    )
    const cssVarsRef = computed<Record<string, string>>(() => {
      const {
        self: { color, boxShadow, buttonBorderColor, borderRadiusSquare },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-box-shadow': boxShadow,
        '--n-color': color,
        '--n-button-border-color': buttonBorderColor,
        '--n-border-radius-square': borderRadiusSquare,
        position: props.position,
        left: formatLength(props.left) || '',
        right: formatLength(props.right) || '',
        top: formatLength(props.top) || '',
        bottom: formatLength(props.bottom) || ''
      }
    })

    provide(floatButtonGroupInjectionKey, {
      shapeRef: toRef(props, 'shape')
    })

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('float-button', undefined, cssVarsRef, props)
      : undefined

    return {
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      mergedClsPrefix: mergedClsPrefixRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedClsPrefix, cssVars, shape } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-float-button-group`,
          `${mergedClsPrefix}-float-button-group--${shape}-shape`
        ]}
        style={cssVars as CSSProperties}
        role="group"
      >
        {this.$slots}
      </div>
    )
  }
})
