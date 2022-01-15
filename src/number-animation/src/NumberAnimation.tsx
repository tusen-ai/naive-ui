import { defineComponent, computed, onMounted, ref, watchEffect } from 'vue'
import { round } from 'lodash-es'
import type { ExtractPublicPropTypes } from '../../_utils'
import { tween } from './utils'

const numberAnimationProps = {
  to: {
    type: Number,
    default: 0
  },
  precision: {
    type: Number,
    default: 0
  },
  showSeparator: Boolean,
  locale: { type: String, default: 'en-US' },
  from: { type: Number, default: 0 },
  active: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 2000
  }
}

export type NumberAnimationProps = ExtractPublicPropTypes<
  typeof numberAnimationProps
>

export interface NumberAnimationInst {
  play: () => void
}

export default defineComponent({
  name: 'NumberAnimation',
  props: numberAnimationProps,
  setup (props) {
    const { duration } = props
    const displayedValueRef = ref(props.from)
    let animating = false
    const onUpdate = (currentValue: number): void => {
      displayedValueRef.value = currentValue
    }
    const onFinish = (): void => {
      displayedValueRef.value = props.to
      animating = false
    }
    const animate = (
      from: number = props.from,
      to: number = props.to
    ): void => {
      animating = true
      displayedValueRef.value = props.from
      if (from !== to) {
        tween({
          from,
          to,
          duration: duration,
          onUpdate,
          onFinish
        })
      }
    }
    const formattedValueRef = computed(() => {
      const formatted: string = round(
        displayedValueRef.value,
        props.precision
      ).toFixed(props.precision)
      const splitValue = formatted.split('.')
      const numberFormat = new Intl.NumberFormat(props.locale)
      const decimalSeparator = numberFormat
        .formatToParts(0.01)
        .find((part) => part.type === 'decimal')?.value
      const integer = props.showSeparator
        ? numberFormat.format(Number(splitValue[0]))
        : splitValue[0]
      const decimal = splitValue[1]
      return {
        integer,
        decimal,
        decimalSeparator
      }
    })
    function play (): void {
      if (animating) return
      animate()
    }
    onMounted(() => {
      watchEffect(() => {
        if (props.active) animate()
      })
    })
    const exposedMethods: NumberAnimationInst = { play }
    return {
      formattedValue: formattedValueRef,
      ...exposedMethods
    }
  },
  render () {
    const {
      formattedValue: { integer, decimal, decimalSeparator }
    } = this
    return [integer, decimal ? decimalSeparator : null, decimal]
  }
})
