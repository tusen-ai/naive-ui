<template>
  <div
    class="n-radio"
    :class="{
      'n-radio--disabled': mergedDisabled,
      'n-radio--checked': renderSafeChecked,
      'n-radio--focus': focus,
      [`n-radio--${mergedSize}-size`]: true
    }"
    @keyup.enter="handleKeyUpEnter"
    @click="handleClick"
    @mousedown="handleMouseDown"
  >
    <input
      ref="input"
      type="radio"
      class="n-radio__radio-input"
      :value="value"
      :name="mergedName"
      :checked="renderSafeChecked"
      :disabled="mergedDisabled"
      @change="handleRadioInputChange"
      @focus="handleRadioInputFocus"
      @blur="handleRadioInputBlur"
    >
    <div
      class="n-radio__dot"
      :class="{
        'n-radio__dot--checked': renderSafeChecked
      }"
    />
    <div v-if="$slots.default" class="n-radio__label">
      <slot />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useTheme } from '../../_mixins'
import { radioLight } from '../styles'
import useRadio from './use-radio'
import style from './styles/radio.cssr.js'

export default defineComponent({
  name: 'Radio',
  props: useRadio.props,
  setup (props) {
    useTheme('Radio', 'Radio', style, radioLight, props)
    return {
      cssVars: computed(() => {})
    }
  }
})
</script>
