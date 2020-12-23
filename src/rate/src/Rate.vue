<template>
  <div
    class="n-rate"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
    @mouseleave="handleMouseLeave(index)"
  >
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
      <n-icon>
        <star-icon />
      </n-icon>
    </div>
  </div>
</template>

<script>
import { configurable, themeable, withCssr, useFormItem } from '../../_mixins'
import { toRef, ref } from 'vue'
import { useMergedState } from 'vooks'
import { call } from '../../_utils'
import styles from './styles'
import StarIcon from './StarIcon.vue'
import { NIcon } from '../../icon'

export default {
  name: 'Rate',
  components: {
    NIcon,
    StarIcon
  },
  mixins: [configurable, themeable, withCssr(styles)],
  props: {
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
    const controlledValueRef = toRef(props, 'value')
    const uncontrolledValueRef = ref(props.defaultValue)
    return {
      mergedValue: useMergedState(controlledValueRef, uncontrolledValueRef),
      uncontrolledValue: uncontrolledValueRef,
      hoverIndex: ref(null),
      ...useFormItem(props)
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
}
</script>
