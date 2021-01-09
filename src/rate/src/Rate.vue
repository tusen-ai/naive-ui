<template>
  <div class="n-rate" :style="cssVars" @mouseleave="handleMouseLeave(index)">
    <div
      v-for="index in count"
      :key="index"
      class="n-rate__item"
      :class="{
        'n-rate__item--active':
          hoverIndex !== null ? index <= hoverIndex : index < mergedValue
      }"
      @click="handleClick(index)"
      @mouseenter="handleMouseEnter(index)"
    >
      <n-base-icon>
        <star-icon />
      </n-base-icon>
    </div>
  </div>
</template>

<script>
import { toRef, ref, computed, defineComponent } from 'vue'
import { useMergedState } from 'vooks'
import { NBaseIcon } from '../../_base'
import { useTheme, useFormItem } from '../../_mixins'
import { call } from '../../_utils'
import { rateLight } from '../styles'
import style from './styles/index.cssr.js'
import StarIcon from './StarIcon.vue'

export default defineComponent({
  name: 'Rate',
  components: {
    NBaseIcon,
    StarIcon
  },
  props: {
    ...useTheme.props,
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
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Rate', 'Rate', style, rateLight, props)
    const controlledValueRef = toRef(props, 'value')
    const uncontrolledValueRef = ref(props.defaultValue)
    return {
      ...useFormItem(props),
      mergedValue: useMergedState(controlledValueRef, uncontrolledValueRef),
      uncontrolledValue: uncontrolledValueRef,
      hoverIndex: ref(null),
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
  methods: {
    doUpdateValue (value) {
      const {
        'onUpdate:value': onUpdateValue,
        nTriggerFormChange,
        nTriggerFormInput
      } = this
      if (onUpdateValue) {
        call(onUpdateValue, value)
      }
      this.uncontrolledValue = value
      nTriggerFormChange()
      nTriggerFormInput()
    },
    handleMouseEnter (index) {
      this.hoverIndex = index
    },
    handleMouseLeave (index) {
      this.hoverIndex = null
    },
    handleClick (index) {
      this.doUpdateValue(index + 1)
    }
  }
})
</script>
