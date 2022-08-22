import {
  h,
  toRef,
  ref,
  computed,
  defineComponent,
  renderList,
  PropType,
  CSSProperties
} from 'vue'
import { useMergedState } from 'vooks'
import { NBaseIcon } from '../../_internal'
import { useTheme, useFormItem, useConfig, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, color2Class, createKey } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { rateLight } from '../styles'
import type { RateTheme } from '../styles'
import style from './styles/index.cssr'
import StarIcon from './StarIcon'

export const rateProps = {
  ...(useTheme.props as ThemeProps<RateTheme>),
  allowHalf: Boolean,
  count: {
    type: Number,
    default: 5
  },
  value: Number,
  defaultValue: {
    type: Number,
    default: 0
  },
  readonly: Boolean,
  size: {
    type: [String, Number] as PropType<number | 'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  clearable: Boolean,
  color: String,
  'onUpdate:value': [Function, Array] as PropType<
  MaybeArray<(value: number) => void>
  >,
  onUpdateValue: [Function, Array] as PropType<
  MaybeArray<(value: number) => void>
  >
} as const

export type RateProps = ExtractPublicPropTypes<typeof rateProps>

export default defineComponent({
  name: 'Rate',
  props: rateProps,
  setup (props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Rate',
      '-rate',
      style,
      rateLight,
      props,
      mergedClsPrefixRef
    )
    const controlledValueRef = toRef(props, 'value')
    const uncontrolledValueRef = ref(props.defaultValue)
    const hoverIndexRef = ref<number | null>(null)
    const formItem = useFormItem(props)
    const mergedValue = useMergedState(controlledValueRef, uncontrolledValueRef)
    function doUpdateValue (value: number): void {
      const {
        'onUpdate:value': _onUpdateValue,
        onUpdateValue,
        clearable
      } = props
      const { nTriggerFormChange, nTriggerFormInput } = formItem

      if (clearable && value === mergedValue.value) {
        value = 0
      }

      if (_onUpdateValue) {
        call(_onUpdateValue, value)
      }
      if (onUpdateValue) {
        call(onUpdateValue, value)
      }
      uncontrolledValueRef.value = value
      nTriggerFormChange()
      nTriggerFormInput()
    }
    function getDerivedValue (index: number, e: MouseEvent): number {
      if (props.allowHalf) {
        if (
          e.offsetX >=
          Math.floor((e.currentTarget as HTMLDivElement).offsetWidth / 2)
        ) {
          return index + 1
        } else {
          return index + 0.5
        }
      } else {
        return index + 1
      }
    }
    function handleMouseMove (index: number, e: MouseEvent): void {
      hoverIndexRef.value = getDerivedValue(index, e)
    }
    function handleMouseLeave (): void {
      hoverIndexRef.value = null
    }
    function handleClick (index: number, e: MouseEvent): void {
      doUpdateValue(getDerivedValue(index, e))
    }

    const mergedSizeRef = computed(() => {
      const { size } = props
      const { self } = themeRef.value
      if (typeof size === 'number') {
        return `${size}px`
      } else {
        return self[createKey('size', size)]
      }
    })
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self
      } = themeRef.value
      const { itemColor, itemColorActive } = self
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-item-color': itemColor,
        '--n-item-color-active': props.color || itemColorActive,
        '--n-item-size': mergedSizeRef.value
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'rate',
        computed(() => {
          const size = mergedSizeRef.value
          const { color } = props
          let hash = ''
          if (size) {
            hash += size[0]
          }
          if (color) {
            hash += color2Class(color)
          }
          return hash
        }),
        cssVarsRef,
        props
      )
      : undefined

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue,
      hoverIndex: hoverIndexRef,
      handleMouseMove,
      handleClick,
      handleMouseLeave,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      readonly,
      hoverIndex,
      mergedValue,
      mergedClsPrefix,
      onRender,
      $slots: { default: defaultSlot }
    } = this
    onRender?.()
    return (
      <div
        class={[
          `${mergedClsPrefix}-rate`,
          {
            [`${mergedClsPrefix}-rate--readonly`]: readonly
          },
          this.themeClass
        ]}
        style={this.cssVars as CSSProperties}
        onMouseleave={this.handleMouseLeave}
      >
        {renderList(this.count, (_, index) => {
          const icon = defaultSlot ? (
            defaultSlot()
          ) : (
            <NBaseIcon clsPrefix={mergedClsPrefix}>
              {{ default: () => StarIcon }}
            </NBaseIcon>
          )
          const fullStarActive =
            hoverIndex !== null
              ? index + 1 <= hoverIndex
              : index + 1 <= mergedValue
          return (
            <div
              key={index}
              class={[
                `${mergedClsPrefix}-rate__item`,
                fullStarActive && `${mergedClsPrefix}-rate__item--active`
              ]}
              onClick={
                readonly
                  ? undefined
                  : (e) => {
                      this.handleClick(index, e)
                    }
              }
              onMousemove={
                readonly
                  ? undefined
                  : (e) => {
                      this.handleMouseMove(index, e)
                    }
              }
            >
              {icon}
              {this.allowHalf ? (
                <div
                  class={[
                    `${mergedClsPrefix}-rate__half`,
                    {
                      [`${mergedClsPrefix}-rate__half--active`]:
                        !fullStarActive && hoverIndex !== null
                          ? index + 0.5 <= hoverIndex
                          : index + 0.5 <= mergedValue
                    }
                  ]}
                >
                  {icon}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    )
  }
})
