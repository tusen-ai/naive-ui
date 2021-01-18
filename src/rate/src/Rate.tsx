import {
  h,
  toRef,
  ref,
  computed,
  defineComponent,
  renderList,
  VNode,
  PropType,
  CSSProperties
} from 'vue'
import { useMergedState } from 'vooks'
import { NBaseIcon } from '../../_base'
import { useTheme, useFormItem } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { rateLight } from '../styles'
import type { RateTheme } from '../styles'
import style from './styles/index.cssr'
import StarIcon from './StarIcon'

export default defineComponent({
  name: 'Rate',
  components: {
    NBaseIcon,
    StarIcon
  },
  props: {
    ...(useTheme.props as ThemeProps<RateTheme>),
    count: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: undefined
    },
    defaultValue: {
      type: Number,
      default: 0
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium'
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array] as PropType<MaybeArray<(value: number) => void>>,
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Rate', 'Rate', style, rateLight, props)
    const controlledValueRef = toRef(props, 'value')
    const uncontrolledValueRef = ref(props.defaultValue)
    const hoverIndexRef = ref<number | null>(null)
    const formItem = useFormItem(props)
    function doUpdateValue (value: number): void {
      const { 'onUpdate:value': onUpdateValue } = props
      const { nTriggerFormChange, nTriggerFormInput } = formItem
      if (onUpdateValue) {
        call(onUpdateValue, value)
      }
      uncontrolledValueRef.value = value
      nTriggerFormChange()
      nTriggerFormInput()
    }
    function handleMouseEnter (index: number): void {
      hoverIndexRef.value = index
    }
    function handleMouseLeave (): void {
      hoverIndexRef.value = null
    }
    function handleClick (index: number): void {
      doUpdateValue(index + 1)
    }
    return {
      mergedValue: useMergedState(controlledValueRef, uncontrolledValueRef),
      hoverIndex: hoverIndexRef,
      handleMouseEnter,
      handleClick,
      handleMouseLeave,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: { itemColor, itemColorActive, itemSize }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--item-color': itemColor,
          '--item-color-active': itemColorActive,
          '--item-size': itemSize
        }
      })
    }
  },
  render () {
    const { hoverIndex, mergedValue } = this
    return (
      <div
        class="n-rate"
        style={this.cssVars as CSSProperties}
        onMouseleave={this.handleMouseLeave}
      >
        {renderList(
          this.count,
          (_, index) =>
            (
              <div
                key={index}
                class={[
                  'n-rate__item',
                  {
                    'n-rate__item--active':
                      hoverIndex !== null
                        ? index <= hoverIndex
                        : index < mergedValue
                  }
                ]}
                onClick={() => this.handleClick(index)}
                onMouseenter={() => this.handleMouseEnter(index)}
              >
                <NBaseIcon>{{ default: () => StarIcon }}</NBaseIcon>
              </div>
            ) as VNode
        )}
      </div>
    )
  }
})
