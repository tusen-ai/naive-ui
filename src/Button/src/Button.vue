<template>
  <!--
    color related class need to be refined, especially for it conflict with type
    related class. Although it works for now, refinement is still in need. Maybe
    rename type class to sth like **-info-colored is a solution in semantics.
  -->
  <button
    class="n-button"
    :class="{
      'n-button--round': round,
      'n-button--circle': circle,
      'n-button--disabled': disabled,
      'n-button--loading': loading,
      'n-button--block': block,
      'n-button--rippling': rippling,
      'n-button--enter-pressed': enterPressed,
      'n-button--ghost': ghost,
      'n-button--text': text,
      [`n-button--${type}-type`]: true,
      [`n-button--${colorHash || type}-colored`]: true,
      [`n-button--${syntheticSize}-size`]: true,
      [`n-button--${iconPlacement}-icon`]: iconPlacement && !noTextContent,
      [`n-button--${iconDepth}-icon-depth`]: type === 'default',
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
    }"
    :tabindex="syntheticFocusable ? 0 : -1"
    :type="attrType"
    @click="handleClick"
    @blur="handleBlur"
    @mousedown="handleMouseDown"
    @keyup.enter="handleKeyUpEnter"
    @keydown.enter="handleKeyDownEnter"
  >
    <div
      v-if="!circle && $scopedSlots.default && iconOnRight"
      class="n-button__content"
      :style="{
        transition: hollowOutColorTransitionDisabled ? 'none' : null,
        color: hollowText ? ascendantBackgroundColor : null
      }"
    >
      <slot />
    </div>
    <n-fade-in-height-expand-transition width>
      <div
        v-if="(hasIcon || loading)"
        class="n-button__icon"
        :class="{ 'n-button__icon--slot': $scopedSlots.icon }"
      >
        <n-icon-switch-transition>
          <n-base-loading
            v-if="loading"
            key="loading"
            class="n-icon-slot"
            :theme="syntheticTheme"
            :style="{
              transition: hollowOutColorTransitionDisabled ? 'none' : null
            }"
            :stroke="hollowText ? ascendantBackgroundColor : null"
            :stroke-width="24"
          />
          <n-icon
            v-else
            key="icon"
            :style="{
              transition: hollowOutColorTransitionDisabled ? 'none' : null,
              fill: hollowText ? ascendantBackgroundColor : null,
              stroke: hollowText ? ascendantBackgroundColor : null
            }"
            class="n-icon-slot"
          >
            <slot
              name="icon"
            />
          </n-icon>
        </n-icon-switch-transition>
      </div>
    </n-fade-in-height-expand-transition>
    <div
      v-if="!circle && $scopedSlots.default && !iconOnRight"
      class="n-button__content"
      :style="{
        transition: hollowOutColorTransitionDisabled ? 'none' : null,
        color: hollowText ? ascendantBackgroundColor : null
      }"
    >
      <slot />
    </div>
    <div class="n-button__border-mask" />
  </button>
</template>

<script>
import NBaseLoading from '../../_base/Loading'
import NFadeInHeightExpandTransition from '../../_transition/FadeInHeightExpandTransition'
import hollowoutable from '../../_mixins/hollowoutable'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import NIcon from '../../Icon'
import NIconSwitchTransition from '../../_transition/IconSwitchTransition'
import { read, hash, createHoverColor, createActiveColor } from '../../_utils/color'
import { createColorStyle } from './styles/Button.cssr.js'
import { createThemedStyle } from '../../_utils/cssr'
import createTheme from './styles/theme'

const colorStyle = createColorStyle()
let typeStyle

function mountTypeStyle (type) {
  typeStyle.mount({
    target: 'n-button-' + type + '-style',
    props: {
      type
    }
  })
}

function mountColorStyle (color, colorHash) {
  const textColor = null
  const rgb = read(color)
  const digest = hash(rgb)
  const hoverColor = createHoverColor(rgb)
  const activeColor = createActiveColor(rgb)
  const focusColor = hoverColor
  colorStyle.mount({
    target: 'n-button-' + digest,
    props: {
      digest,
      pallete: {
        color,
        hoverColor,
        activeColor,
        focusColor,
        textColor
      }
    }
  })
}

function unmountColorStyle (colorHash) {
  colorStyle.unmount({
    target: 'n-button-' + colorHash,
    delay: 3000
  })
}

export default {
  name: 'NButton',
  components: {
    NBaseLoading,
    NIcon,
    NIconSwitchTransition,
    NFadeInHeightExpandTransition
  },
  inject: {
    NButtonGroup: {
      default: null
    },
    NFormItem: {
      default: null
    }
  },
  mixins: [withapp, themeable, hollowoutable],
  props: {
    color: {
      type: String,
      default: null
    },
    text: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return ['tiny', 'small', 'medium', 'large'].includes(value)
      },
      default: 'medium'
    },
    ghost: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    focusable: {
      type: Boolean,
      default: true
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    type: {
      // TODO: warning message
      validator (value) {
        return [
          'default',
          'primary',
          'info',
          'success',
          'warning',
          'error'
        ].includes(value)
      },
      default: 'default'
    },
    icon: {
      type: String,
      default: null
    },
    iconPlacement: {
      default: 'left',
      validator (value) {
        return ['left', 'right'].includes(value)
      }
    },
    iconDepth: {
      default: 'secondary',
      validator (value) {
        return ['secondary', 'tertiary'].includes(value)
      }
    },
    attrType: {
      default: 'button',
      validator (value) {
        return ['button', 'submit', 'reset'].includes(value)
      }
    }
  },
  data () {
    return {
      enterPressed: false,
      rippling: false,
      rippleTimer: null
    }
  },
  computed: {
    colorRgb () {
      if (!this.color) return null
      return read(this.color)
    },
    colorHash () {
      if (!this.colorRgb) return null
      return hash(this.colorRgb)
    },
    syntheticSize () {
      const NButtonGroup = this.NButtonGroup
      if (NButtonGroup && NButtonGroup.size) {
        return NButtonGroup.size
      }
      const NFormItem = this.NFormItem
      if (
        NFormItem &&
        NFormItem !== '__FORM_ITEM_INNER__' &&
        NFormItem.syntheticSize
      ) {
        return NFormItem.syntheticSize
      }
      return this.size
    },
    noTextContent () {
      return this.circle || !this.$scopedSlots.default
    },
    avoidHollowOut () {
      return (
        this.text ||
        this.ghost ||
        (this.type === 'default' && !this.color)
      )
    },
    hollowText () {
      return !this.avoidHollowOut
    },
    syntheticFocusable () {
      return this.focusable && !this.disabled
    },
    hasIcon () {
      return this.icon || this.$scopedSlots.icon
    },
    iconOnRight () {
      return this.iconPlacement === 'right'
    }
  },
  watch: {
    colorHash (value, oldValue) {
      unmountColorStyle(oldValue)
    },
    color (value) {
      mountColorStyle(value)
    },
    type (value) {
      mountTypeStyle(value)
    }
  },
  created () {
    const color = this.color
    if (color) {
      mountColorStyle(color)
    }
    if (!typeStyle) {
      typeStyle = createThemedStyle(colorStyle, createTheme(
        this.$naive.styleSchemes,
        this.$naive.fallbackTheme
      ))
    }
    mountTypeStyle(this.type)
  },
  beforeDestroy () {
    const colorHash = this.colorHash
    if (colorHash) {
      unmountColorStyle(colorHash)
    }
    const rippleTimer = this.rippleTimer
    if (rippleTimer !== null) {
      window.clearTimeout(rippleTimer)
    }
  },
  methods: {
    handleMouseDown (e) {
      e.preventDefault()
      if (this.disabled) {
        return
      }
      if (this.syntheticFocusable) {
        this.$el.focus()
      }
    },
    handleClick (e) {
      if (!this.disabled) {
        this.$emit('click', e)
        if (!this.text) {
          window.clearTimeout(this.rippleTimer)
          this.rippleTimer = null
          this.rippling = false
          this.$nextTick().then(() => {
            void this.$el.offsetHeight
            this.rippling = true
            this.rippleTimer = window.setTimeout(() => {
              this.rippling = false
              this.rippleTimer = null
            }, 600)
          })
        }
      }
    },
    handleKeyUpEnter (e) {
      if (!this.keyboard) {
        e.preventDefault()
        return
      }
      this.enterPressed = false
      this.$nextTick().then(() => {
        if (!this.disabled) {
          this.$el.click()
        }
      })
    },
    handleKeyDownEnter (e) {
      e.preventDefault()
      if (!this.keyboard) return
      this.enterPressed = true
    },
    handleBlur (e) {
      this.enterPressed = false
    }
  }
}
</script>
