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
import { useTheme, useFormItem, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, createKey } from '../../_utils'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import { rateLight } from '../styles'
import type { RateTheme } from '../styles'
import style from './styles/index.cssr'
import StarIcon from './StarIcon'

const rateProps = {
  ...(useTheme.props as ThemeProps<RateTheme>),
  allowHalf: Boolean,
  disabled: Boolean,
  count: {
    type: Number,
    default: 5
  },
  value: Number,
  defaultValue: {
    type: Number,
    default: 0
  },
  size: {
    type: [String, Number] as PropType<number | 'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  color: String,
  // eslint-disable-next-line vue/prop-name-casing
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
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Rate',
      'Rate',
      style,
      rateLight,
      props,
      mergedClsPrefixRef
    )
    const controlledValueRef = toRef(props, 'value')
    const uncontrolledValueRef = ref(props.defaultValue)
    const hoverIndexRef = ref<number | null>(null)
    const formItem = useFormItem(props)
    function doUpdateValue (value: number): void {
      const { 'onUpdate:value': _onUpdateValue, onUpdateValue } = props
      const { nTriggerFormChange, nTriggerFormInput } = formItem
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
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: useMergedState(controlledValueRef, uncontrolledValueRef),
      hoverIndex: hoverIndexRef,
      handleMouseMove,
      handleClick,
      handleMouseLeave,
      cssVars: computed(() => {
        const { size } = props
        const {
          common: { cubicBezierEaseInOut },
          self
        } = themeRef.value
        const { itemColor, itemColorActive } = self
        let mergedSize: string
        if (typeof size === 'number') {
          mergedSize = `${size}px`
        } else {
          mergedSize = self[createKey('size', size)]
        }
        return {
          '--bezier': cubicBezierEaseInOut,
          '--item-color': itemColor,
          '--item-color-active': props.color || itemColorActive,
          '--item-size': mergedSize
        }
      })
    }
  },
  render () {
    const {
      disabled,
      hoverIndex,
      mergedValue,
      mergedClsPrefix,
      $slots: { default: defaultSlot }
    } = this
    return (
      <div
        class={`${mergedClsPrefix}-rate`}
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
          return (
            <div
              key={index}
              class={[
                `${mergedClsPrefix}-rate__item`,
                {
                  [`${mergedClsPrefix}-rate__item--active`]:
                    hoverIndex !== null
                      ? index + 1 <= hoverIndex
                      : index + 1 <= mergedValue,
                  [`${mergedClsPrefix}-rate__item--disabled`]: disabled
                }
              ]}
              onClick={(e) => {
                !disabled && this.handleClick(index, e)
              }}
              onMousemove={(e) => {
                !disabled && this.handleMouseMove(index, e)
              }}
            >
              {icon}
              {this.allowHalf ? (
                <div
                  class={[
                    `${mergedClsPrefix}-rate__half`,
                    {
                      [`${mergedClsPrefix}-rate__half--active`]:
                        hoverIndex !== null
                          ? index + 0.5 <= hoverIndex
                          : index + 0.5 <= mergedValue,
                      [`${mergedClsPrefix}-rate__half--disabled`]: disabled
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
