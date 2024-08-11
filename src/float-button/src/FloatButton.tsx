import {
  type CSSProperties,
  type PropType,
  computed,
  defineComponent,
  h,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  toRef
} from 'vue'
import { useMergedState } from 'vooks'
import { off, on } from 'evtd'
import { floatButtonGroupInjectionKey } from '../../float-button-group/src/FloatButtonGroup'
import {
  type ExtractPublicPropTypes,
  type MaybeArray,
  call,
  formatLength,
  resolveSlot,
  resolveWrappedSlot
} from '../../_utils'
import useConfig from '../../_mixins/use-config'
import { type ThemeProps, useTheme, useThemeClass } from '../../_mixins'
import { type FloatButtonTheme, floatButtonLight } from '../styles'
import { NBaseIcon } from '../../_internal'
import { CloseIcon } from '../../_internal/icons'
import style from './styles/index.cssr'

export const floatButtonProps = {
  ...(useTheme.props as ThemeProps<FloatButtonTheme>),
  width: { type: [Number, String] as PropType<string | number>, default: 40 },
  height: { type: [Number, String] as PropType<string | number>, default: 40 },
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
  },
  type: {
    type: String as PropType<'default' | 'primary'>,
    default: 'default'
  },
  menuTrigger: String as PropType<'hover' | 'click'>,
  showMenu: {
    type: Boolean,
    default: undefined
  },
  onUpdateShowMenu: {
    type: [Function, Array] as PropType<MaybeArray<(value: boolean) => void>>,
    default: undefined
  },
  'onUpdate:showMenu': {
    type: [Function, Array] as PropType<MaybeArray<(value: boolean) => void>>,
    default: undefined
  }
} as const

export type FloatButtonProps = ExtractPublicPropTypes<typeof floatButtonProps>

export default defineComponent({
  name: 'FloatButton',
  props: floatButtonProps,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)

    const selfElRef = ref<HTMLDivElement | null>(null)

    const themeRef = useTheme(
      'FloatButton',
      '-float-button',
      style,
      floatButtonLight,
      props,
      mergedClsPrefixRef
    )

    const floatButtonGroupInjection = inject(floatButtonGroupInjectionKey, null)

    const uncontrolledShowMenuRef = ref(false)
    const controlledShoeMenuRef = toRef(props, 'showMenu')
    const mergedShowMenuRef = useMergedState(
      controlledShoeMenuRef,
      uncontrolledShowMenuRef
    )

    function doUpdateShowMenu(value: boolean): void {
      const { onUpdateShowMenu, 'onUpdate:showMenu': _onUpdateShowMenu } = props
      uncontrolledShowMenuRef.value = value
      if (onUpdateShowMenu) {
        call(onUpdateShowMenu, value)
      }
      if (_onUpdateShowMenu) {
        call(_onUpdateShowMenu, value)
      }
    }

    const cssVarsRef = computed<Record<string, string>>(() => {
      const {
        self: {
          color,
          textColor,
          boxShadow,
          boxShadowHover,
          boxShadowPressed,
          colorHover,
          colorPrimary,
          colorPrimaryHover,
          textColorPrimary,
          borderRadiusSquare,
          colorPressed,
          colorPrimaryPressed
        },
        common: { cubicBezierEaseInOut }
      } = themeRef.value
      const { type } = props
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-box-shadow': boxShadow,
        '--n-box-shadow-hover': boxShadowHover,
        '--n-box-shadow-pressed': boxShadowPressed,
        '--n-color': type === 'primary' ? colorPrimary : color,
        '--n-text-color': type === 'primary' ? textColorPrimary : textColor,
        '--n-color-hover': type === 'primary' ? colorPrimaryHover : colorHover,
        '--n-color-pressed':
          type === 'primary' ? colorPrimaryPressed : colorPressed,
        '--n-border-radius-square': borderRadiusSquare
      }
    })
    const inlineStyle = computed<CSSProperties>(() => {
      const { width, height } = props
      return {
        position: floatButtonGroupInjection ? undefined : props.position,
        width: formatLength(width),
        minHeight: formatLength(height),
        ...(floatButtonGroupInjection
          ? null
          : {
              left: formatLength(props.left),
              right: formatLength(props.right),
              top: formatLength(props.top),
              bottom: formatLength(props.bottom)
            })
      }
    })

    const mergedShapeRef = computed(() => {
      return floatButtonGroupInjection
        ? floatButtonGroupInjection.shapeRef.value
        : props.shape
    })

    const Mouseenter = (): void => {
      if (props.menuTrigger === 'hover') {
        doUpdateShowMenu(true)
      }
    }

    const handleMouseleave = (): void => {
      if (props.menuTrigger === 'hover' && mergedShowMenuRef.value) {
        doUpdateShowMenu(false)
      }
    }

    const handleClick = (): void => {
      if (props.menuTrigger === 'click') {
        doUpdateShowMenu(!mergedShowMenuRef.value)
      }
    }

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'float-button',
        computed(() => props.type[0]),
        cssVarsRef,
        props
      )
      : undefined

    onMounted(() => {
      const selfEl = selfElRef.value
      if (selfEl) {
        on('mousemoveoutside', selfEl, handleMouseleave)
      }
    })

    onBeforeUnmount(() => {
      const selfEl = selfElRef.value
      if (selfEl) {
        off('mousemoveoutside', selfEl, handleMouseleave)
      }
    })

    return {
      inlineStyle,
      selfElRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedShape: mergedShapeRef,
      mergedShowMenu: mergedShowMenuRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      Mouseenter,
      handleMouseleave,
      handleClick
    }
  },

  render() {
    const {
      mergedClsPrefix,
      cssVars,
      mergedShape,
      type,
      menuTrigger,
      mergedShowMenu,
      themeClass,
      $slots,
      inlineStyle,
      onRender
    } = this
    onRender?.()
    return (
      <div
        ref="selfElRef"
        class={[
          `${mergedClsPrefix}-float-button`,
          `${mergedClsPrefix}-float-button--${mergedShape}-shape`,
          `${mergedClsPrefix}-float-button--${type}-type`,
          mergedShowMenu && `${mergedClsPrefix}-float-button--show-menu`,
          themeClass
        ]}
        style={[cssVars as CSSProperties, inlineStyle]}
        onMouseenter={this.Mouseenter}
        onMouseleave={this.handleMouseleave}
        onClick={this.handleClick}
        role="button"
      >
        <div class={`${mergedClsPrefix}-float-button__fill`} aria-hidden></div>
        <div class={`${mergedClsPrefix}-float-button__body`}>
          {$slots.default?.()}
          {resolveWrappedSlot($slots.description, (children) => {
            if (children) {
              return (
                <div class={`${mergedClsPrefix}-float-button__description`}>
                  {children}
                </div>
              )
            }
            return null
          })}
        </div>
        {menuTrigger ? (
          <div class={`${mergedClsPrefix}-float-button__close`}>
            <NBaseIcon clsPrefix={mergedClsPrefix}>
              {{ default: () => <CloseIcon /> }}
            </NBaseIcon>
          </div>
        ) : null}
        {menuTrigger ? (
          <div
            onClick={(e) => {
              e.stopPropagation()
            }}
            data-float-button-menu
            class={`${mergedClsPrefix}-float-button__menu`}
          >
            {resolveSlot($slots.menu, () => [])}
          </div>
        ) : null}
      </div>
    )
  }
})
