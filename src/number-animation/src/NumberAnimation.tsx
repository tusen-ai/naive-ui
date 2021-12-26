import { defineComponent, computed, onMounted, watch, ref } from 'vue'
import { round } from 'lodash'
import type { ExtractPublicPropTypes } from '../../_utils'
import { tween } from './utils'

const numberAnimationProps = {
  value: {
    type: Number,
    default: 0
  },
  precision: Number,
  showSeprator: Boolean,
  valueFrom: Number,
  start: {
    type: Boolean,
    default: true
  },
  animation: Boolean,
  animationDuration: {
    type: Number,
    default: 3000
  }
}

export type NumberAnimationProps = ExtractPublicPropTypes<
  typeof numberAnimationProps
>

export default defineComponent({
  name: 'NumberAnimation',
  props: numberAnimationProps,
  setup (props) {
    const { animationDuration } = props
    const valueRef = ref(props.valueFrom ?? props.value)
    const hastweenRef = ref(false)
    const onUpdate = (currentValue: number): void => {
      valueRef.value = currentValue
    }
    const onFinish = (): void => {
      valueRef.value = props.value
    }
    const animation = (
      from: number = props.valueFrom ?? 0,
      to: number = Number(props.value)
    ): void => {
      if (from !== to) {
        tween({
          from,
          to,
          duration: animationDuration,
          onUpdate,
          onFinish
        })
        hastweenRef.value = true
      }
    }
    const formatValue = computed(() => {
      let innerValue: string
      if (props.precision) {
        innerValue = round(valueRef.value, props.precision).toFixed(
          props.precision
        )
      } else {
        innerValue = `${valueRef.value}`
      }
      const splitValue = innerValue.toString().split('.')
      const integer = props.showSeprator
        ? Number(splitValue[0]).toLocaleString('en-US')
        : splitValue[0]
      const decimal = splitValue[1]
      return {
        integer,
        decimal
      }
    })

    onMounted(() => {
      if (props.animation && props.start) animation()
    })
    watch(
      () => props.start,
      (value) => {
        if (value && !hastweenRef.value) animation()
      }
    )
    return {
      formatValue
    }
  },
  render () {
    const { formatValue } = this
    return [
      formatValue.integer ? `${formatValue.integer}` : '',
      formatValue.decimal ? `.${formatValue.decimal}` : ''
    ]
  }
})
