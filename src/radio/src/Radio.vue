<template>
  <div
    class="n-radio"
    :class="{
      'n-radio--disabled': mergedDisabled,
      'n-radio--checked': renderSafeChecked,
      'n-radio--focus': focus
    }"
    :style="cssVars"
    @keyup.enter="handleKeyUpEnter"
    @click="handleClick"
    @mousedown="handleMouseDown"
  >
    <input
      ref="inputRef"
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
    <div v-if="$slots.default" ref="labelRef" class="n-radio__label">
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
import { createKey } from '../../_utils'

export default defineComponent({
  name: 'Radio',
  props: {
    ...useTheme.props,
    ...useRadio.props
  },
  setup (props) {
    const themeRef = useTheme('Radio', 'Radio', style, radioLight, props)
    const radio = useRadio(props)
    return Object.assign(radio, {
      cssVars: computed(() => {
        const {
          mergedSize: { value: size }
        } = radio
        const {
          common: { cubicBezierEaseInOut },
          self: {
            boxShadow,
            boxShadowActive,
            boxShadowDisabled,
            boxShadowFocus,
            boxShadowHover,
            color,
            colorDisabled,
            textColor,
            textColorDisabled,
            dotColorActive,
            dotColorDisabled,
            [createKey('fontSize', size)]: fontSize,
            [createKey('radioSize', size)]: radioSize
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--box-shadow': boxShadow,
          '--box-shadow-active': boxShadowActive,
          '--box-shadow-disabled': boxShadowDisabled,
          '--box-shadow-focus': boxShadowFocus,
          '--box-shadow-hover': boxShadowHover,
          '--color': color,
          '--color-disabled': colorDisabled,
          '--dot-color-active': dotColorActive,
          '--dot-color-disabled': dotColorDisabled,
          '--font-size': fontSize,
          '--radio-size': radioSize,
          '--text-color': textColor,
          '--text-color-disabled': textColorDisabled
        }
      })
    })
  }
})
</script>
